const Plan = require('../models/Plan');
const Subscription = require('../models/Subscription');


exports.createPlan = async (req, res) => {
  try {
    const { title, description, price, duration, features, category, level } = req.body;

    // Validation
    if (!title || !description || !price || !duration) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    const plan = new Plan({
      trainerId: req.userId,
      title,
      description,
      price,
      duration,
      features: features || [],
      category,
      level
    });

    await plan.save();
    await plan.populate('trainerId', 'name email specialization');

    res.status(201).json(plan);
  } catch (error) {
    console.error('Create plan error:', error);
    res.status(500).json({ error: 'Server error while creating plan' });
  }
}

exports.updatePlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const updates = req.body;

    const plan = await findOne({ _id: planId, trainerId: req.userId });
    
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found or unauthorized' });
    }

    Object.assign(plan, updates);
    await plan.save();
    await plan.populate('trainerId', 'name email specialization');

    res.json(plan);
  } catch (error) {
    console.error('Update plan error:', error);
    res.status(500).json({ error: 'Server error while updating plan' });
  }
}

exports.deletePlan = async (req, res) => {
  try {
    const { planId } = req.params;

    const plan = await findOneAndDelete({ _id: planId, trainerId: req.userId });
    
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found or unauthorized' });
    }

    res.json({ message: 'Plan deleted successfully' });
  } catch (error) {
    console.error('Delete plan error:', error);
    res.status(500).json({ error: 'Server error while deleting plan' });
  }
}

exports.getAllPlans = async (req, res) => {
  try {
    const plans = await find({ isActive: true })
      .populate('trainerId', 'name email specialization')
      .sort({ createdAt: -1 });

    // Get subscription counts
    const plansWithDetails = await Promise.all(
      plans.map(async (plan) => {
        const subscriberCount = await countDocuments({
          planId: plan._id,
          status: 'active'
        });

        const isSubscribed = req.userId
          ? await exists({
              planId: plan._id,
              userId: req.userId,
              status: 'active'
            })
          : false;

        return {
          ...plan.toObject(),
          subscriberCount,
          isSubscribed: !!isSubscribed,
          hasAccess: !!isSubscribed || plan.trainerId._id.toString() === req.userId?.toString()
        };
      })
    );

    res.json(plansWithDetails);
  } catch (error) {
    console.error('Get plans error:', error);
    res.status(500).json({ error: 'Server error while fetching plans' });
  }
}

exports.getPlan = async (req, res) => {
  try {
    const { planId } = req.params;

    const plan = await findById(planId).populate('trainerId', 'name email specialization bio');
    
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    const subscriberCount = await countDocuments({
      planId: plan._id,
      status: 'active'
    });

    const isSubscribed = req.userId
      ? await exists({
          planId: plan._id,
          userId: req.userId,
          status: 'active'
        })
      : false;

    const hasAccess = !!isSubscribed || plan.trainerId._id.toString() === req.userId?.toString();

    // Return limited info if no access
    if (!hasAccess) {
      return res.json({
        id: plan._id,
        title: plan.title,
        price: plan.price,
        duration: plan.duration,
        category: plan.category,
        level: plan.level,
        trainer: plan.trainerId,
        subscriberCount,
        hasAccess: false,
        preview: true
      });
    }

    res.json({
      ...plan.toObject(),
      subscriberCount,
      isSubscribed: !!isSubscribed,
      hasAccess: true
    });
  } catch (error) {
    console.error('Get plan error:', error);
    res.status(500).json({ error: 'Server error while fetching plan' });
  }
}

exports.getTrainerPlans = async (req, res) => {
  try {
    const plans = await find({ trainerId: req.userId })
      .sort({ createdAt: -1 });

    const plansWithDetails = await Promise.all(
      plans.map(async (plan) => {
        const subscriberCount = await countDocuments({
          planId: plan._id,
          status: 'active'
        });

        return {
          ...plan.toObject(),
          subscriberCount
        };
      })
    );

    res.json(plansWithDetails);
  } catch (error) {
    console.error('Get trainer plans error:', error);
    res.status(500).json({ error: 'Server error while fetching plans' });
  }
}