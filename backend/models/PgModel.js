// models/PgModel.js

import mongoose from "mongoose";

const pgSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // The PG is linked to a specific user (PG owner)
      required: true,
    },
    totalRooms: {
      type: Number,
      required: true,
    },
    availableRooms: {
      type: Number,
      required: true,
      default: function() { return this.totalRooms; } // Initially set available rooms to total rooms
    },
    totalBeds: {
      type: Number,
      required: true,
    },
    availableBeds: {
      type: Number,
      required: true,
      default: function() { return this.totalBeds; } // Initially set available beds to total beds
    },
    // Optional: store details about the students as an array (not mandatory for the count)
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const PgModel = mongoose.model("PG", pgSchema);
export default PgModel;
