const User = require('../models/User');
const Plan = require('../models/Plan');
const Follow = require('../models/Follow');
const Subscription = require('../models/Subscription');

   //to get all the trainers
exports.getAllTrainers = async (req, res) => {
    try{
        const trainers =  await User.find({role:'trainer'}).select('-password');

        const trainersWithDetails = await Promise.all(
            trainers.map(async (trainer)=> {
                const planCount = await Plan.countDocuments({trainerId: trainer._id, isActive:true});
                const followerCount = await Follow.countDocuments({trainerId:trainer._id});

                return {
                    ...trainer.toObject(),
                    planCount,
                    followerCount
                };
            })
        );
        res.json(trainersWithDetails);
    }catch(error){
        console.log("Error in fetching all the trainers",error);
        return res.status(500).json({
            error:'Server error while fetching trainers'
        });
    }
}



// to get the Trainer Profile

exports.getTrainerProfile = async (req, res) => {
    try{
        const {trainerId} = req.params;
        
        const trainer  = await User.finfOne({_id:trainer._id, role:'trainer'}).select('-password');

        if(!trainer){
            return res.status(404).json({
                error:"Traiiner not found"
            });

            const plans = await Plan.find({trainerId, isActive:true});
            const followerCount = await Follow.countDocuments({trainerId});
            const isFolowing =  req.userId ? 
                                await Follow.exists({userId:req.userId, trainerId}) : false;


     const plansWithSubscribers = await Promise.all(
      plans.map(async (plan) => {
        const subscriberCount = await Subscription.countDocuments({
          planId: plan._id,
          status: 'active'
        })
        return {
            ...plan.toObject(),
            subscriberCount

        };
        })
    )
}
}catch(error){
    console.error('Get trainer profile error:', error);
    res.status(500).json({ error: 'Server error while fetching trainer profile' });
}
};




        // to follow trainer

exports.followTrainer = async (req, res) => {
            try{
                const {trainerId} = req.params;

                //check if trainer exists
                const trainer = await User.findOne({_id:trainerId, role:'trainer'});
                if(!trainer){
                    return res.status(404).json({
                        error:"Trainer not found"
                    });
                }


                //check if already following that trainer
                const existingFollow =  await Follow.findOne({
                    userId:req.userId,
                    trainerId
                });

                if(existingFollow){
                    return res.json({
                        message:"Unfollowed successfully", isFolowing:false
                    });
                }else{
                    //follow the trainer if not followed
                    const follow = new Follow({
                        userId: req.userId,
                        trainerId
                    });
                    await follow.save();
                    return res.json({
                        message:"FOllowed SUccessfully", isFolowing:true
                    });
                }
            }catch(error){
                console.log("Error in folowing a trainer ",error);
                return res.status(500).json({
                    error:"Server error in Following a trainer"
                })
            }
        }


        //to get the list of followed trainers


exports.getFollowedTrainers = async (req, res) => {
           try{
            const follows  = await Follow.find({userId: req.userId})
            .populate('trainerId', 'name email specialization bio');

            const trainers = follows.map(f => f.trainerId);

            res.json(trainers);
            
           }catch(error){
           console.error('Get followed trainers error:', error);
           res.status(500).json({ error: 'Server error while fetching followed trainers' });
           }
   };




exports.getPersonalizedFeed = async (req, res) => {
  try {
    // Get followed trainers 
    const follows = await Follow.find({ userId: req.userId });
    const trainerIds = follows.map(f => f.trainerId);

    // Get plans from followed trainers
    const plans = await Plan.find({
      trainerId: { $in: trainerIds },
      isActive: true
    })
      .populate('trainerId', 'name email specialization')
      .sort({ createdAt: -1 });

    // Add subscription information 
    const plansWithDetails = await Promise.all(
      plans.map(async (plan) => {
        const subscriberCount = await Subscription.countDocuments({
          planId: plan._id,
          status: 'active'
        });

        const isSubscribed = await Subscription.exists({
          planId: plan._id,
          userId: req.userId,
          status: 'active'
        });

        return {
          ...plan.toObject(),
          subscriberCount,
          isSubscribed: !!isSubscribed,
          hasAccess: !!isSubscribed
        };
      })
    );

    res.json(plansWithDetails);
  } catch (error) {
    console.error('Get feed error:', error);
    res.status(500).json({ error: 'Server error while fetching feed' });
  }
};