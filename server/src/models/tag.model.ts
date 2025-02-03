import mongoose, { Schema, Document } from "mongoose"
import mongooseEncryption from "mongoose-encryption"
import config from "../config"

type TagDocument = Document & {
  title: string
}

const tagSchema = new Schema(
  {
    title: { type: String, required: true },
    color: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

tagSchema.set("toJSON", {
  transform: (_doc: any, ret: any) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

tagSchema.plugin(mongooseEncryption, {
  secret: config.MONGO.ENCRYPTION_KEY,
  excludeFromEncryption: ["createdAt"]
})

export const Tag = mongoose.model<TagDocument>("Tag", tagSchema)
