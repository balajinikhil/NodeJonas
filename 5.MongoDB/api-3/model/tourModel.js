const mongoose = require("mongoose");
const slugify = require("slugify");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Tour must have a name"],
      trim: true,
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
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//virtual properties
tourSchema.virtual("durationWeek").get(function() {
  return this.duration / 7;
});

//document middleware works on create() and save() not on insertOne() or insertmany()
tourSchema.pre("save", function(next) {
  //this points to document being created
  this.slug = slugify(this.name, {
    lower: true
  });

  next();
});

/*
//after creating the doc , this method is not available in post
tourSchema.post("save", function(doc, next) {
  console.log(doc);
  next();
});
*/

//QUERRY MIDDLEWARE
/*
It occurrs before querry with pre and after query with post

*/

tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });

  next();
});

tourSchema.post(/^find/, function(doc, next) {
  console.log(doc);
  next();
});

//AGGREGATION MIDDELWARE
/*this - points to aggregation object

*/
tourSchema.pre("aggregate", function(next) {
  // console.log(this.pipeline());
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

  next();
});

const Tour = mongoose.model("tours", tourSchema);

module.exports = Tour;
