const mongoose = require("mongoose")

const Schema = mongoose.Schema

const exoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    intensity: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Exo", exoSchema)
