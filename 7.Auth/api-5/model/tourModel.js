const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Tour must have a name"],
    trim: true,
    //VALIDATORS STRING
    maxlength: [40, "name must have max length of 40"],
    minlength: [5, "name must have min length of 5"]
  },
  duration: {
    type: Number,
    required: [true, "duration is required"]
  },
  maxGroupSize: {
    type: Number,
    required: [true, "group size is required"]
  },
  difficulty: {
    type: String,
    required: [true, "difficulty is required"],
    enum: {
      values: ["easy", "difficult", "medium"],
      message: "difficulty canno't be that"
    }
  },
  ratingsAverage: {
    type: Number,
    //VALIDATORS NUM
    min: [1, "rating cannot be less than 1"],
    max: [5, "rating cannot be greater than 5"]
  },
  ratingsQuantity: {
    type: Number
  },
  price: {
    type: Number,
    required: [true, "price is required"]
  },
  priceDiscount: {
    type: Number,
    //CUSTOM VALIDATOR
    validate: {
      validator: function(val) {
        return val < this.price;
      },
      message: "discount must be less than price"
    }
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "summary is required"]
  },
  description: {
    type: String,
    required: [true, "description is required"]
  },
  imageCover: {
    type: String,
    required: [true, "cover image is required"]
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  startDates: [Date],
  slug: String,
  secretTour: {
    type: Boolean,
    default: false
  },
  locations:[{
    type:{
      type:String,
      default:'Point',
      enum:['Point']
    },
    coordinates:[Array],
    address:String,
    description:String,
    day:Number
  }],
  // guides:Array,
  guides:[
    {
      type:mongoose.Schema.ObjectId,
      ref:"Users"
    }
  ]

});

//query middelware
tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

//embedding data
tourSchema.pre('save', async function(next){
  const guidesPromise = this.guides.map(id => await User.findById(id))
  this.guides = await Promise.all(guidesPromise);
})

//parent referencing
tourSchema.pre(/^find/, async function(next){


  next();
})



















//MODEL
const Tour = mongoose.model("Tours", tourSchema);
module.exports = Tour;
