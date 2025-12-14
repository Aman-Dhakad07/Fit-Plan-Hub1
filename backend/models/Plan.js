const mongoose = require('mongoose');


const  planSchema  = new mongoose.Schema({
    trainerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    tutle:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0,
    },
    duration:{
        type:Number,
        required:true,
        min:1,
    },
    coverImage:{
    type:String,
    default:' ',
    },
features:[{
    type:String
}],
category:{
    type:String,
    enum:['Weight Loss','Muscle Gain', 'Flexibility', 'Cardio','Strength','General Fitness',],
    default:'General Fitness',
},

level:{
    type:String,
    enum: ['Beginner', 'Intermediate', 'Advanced' ],
    default:'Beginner',
},
isActive:{
    type:Boolean,
    default:true,
},

},
{
    timestamps: true

});

planSchema.index({trainerId:1, isActive:1});
planSchema.index({price:1});

module.exports = mongoose.model('Plan', planSchema);
