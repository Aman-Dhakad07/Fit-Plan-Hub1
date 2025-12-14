const Subscription = require('../models/Subscription');
const Plan = require('../models/Plan');

          // get subscription to  the plans
exports.subscribeToPlan = async (req, res) => {    try{
        const {planId} = req.params;

        //check if plan exists
        const plan  = await Plan.findById(planId);
        if(!plan) {
            return res.status(404).json({
                error: "Plan not found",
            })
           
            //check if already subscibed
            const existingSubscription  =await Subscription.findOne({
                userId:req.userId,
                planId,
                status:'active'
            });

            if(existingSubscription) {
                return res.status(400).json({
                    error:"Already subscribed to this plan"
                });
            }

            //create subscription
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + plan.duration);

            const subscription = new Subscription({
                userId: req.userId,
                planId,
                endDate,
                paymentAmount: plan.price,
                status:'active'
            });

            await subscription.save();
            await subscription.populate('planId');

            res.status(201).json({
                message:"Subscription Successful",
                subscription
            });
        }
    }catch(error){
        console.log("Subcribe error",error);
        res.status(500).json({
            error:'Server error during subsciption'
        });
    }
}




// get the user subscription 

exports.getUserSubscriptions = async (req, res) => {    try{
        const subscriptions  =  await Subscription.find({
            userId:req.userId,
            status:'active'
        }).populate({
            path:'planId',
            populate:{
                path:'trainerId',
                select:'name email specialization'
            }
        }).sort({createdAt:-1});

        res.json(subscriptions);

    }catch(error){
        return res.status(500).json({
            error:"Server error while fetching subscriptions"
        })
    }
}




exports.cancelSubscription = async (req, res) => {
       try{
        const {subscriptionId}  = req.params;

        const subscription =await Subscription.findOne({
            _id:subscriptionId,
            userId: req.userId
        });

        if(!subscription) {
            return res.status(404).json({
                error:"No Subscription Found"
            });
    
        }
             subscription.status =  'cancelled';
            await subscription.save();
            
            res.json({
                message:"Subscription cancelled successfully"
            });

       }catch(error){
               console.log("Calcel subscription error", error);
           return  res.status(500).json({
            error:"Server error while cancelling the subscription"
        })
       }
}