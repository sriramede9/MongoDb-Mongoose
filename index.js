const mongoose = require("mongoose");

mongoose

  .connect("mongodb://localhost/mongo-exercies")

  .then(() => console.log("db is connected!!"))

  .catch(err => console.log("error couldn't connect to mongodb.." + err));

const courseSchema = new mongoose.Schema({
  name: String,

  author: String,

  tags: [String],

  date: { type: Date, default: Date.now },

  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model("Course", courseSchema);

//

async function qone() {
  try {
    const result = await Course.find({ isPublished: true, tags: "backend" })

      .sort({ name: 1 })
      .select({ name: 1, author: 1 });
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
}

//qone();

async function two() {
  try {
    const result = await Course.find({
      isPublished: true,
      tags: { $in: ["frontend", "backend"] }
    })
      .sort({ price: -1 })
      .select({ name: 1, author: 1 });
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
}

async function three() {
  try {
    const result = await Course.find({
      isPublished: true
    }).or([{ price: { $gte: 15 } }, { name: /.*by.*/i }]);
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
}

//two();

three();
