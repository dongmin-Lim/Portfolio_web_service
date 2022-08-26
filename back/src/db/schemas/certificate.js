import { Schema, model } from "mongoose";
const user = require("./user")

const CertificateSchema = new Schema(
  {
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
      },
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    when_date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CertificateModel = model("certificate", CertificateSchema);

export { CertificateModel };
