import mongoose from 'mongoose'

const SnippetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  language: { type: String, required: true },
  isPublic: { type: Boolean, default: false },
  userId: { type: String, required: true },
}, { timestamps: true })

export default mongoose.models.Snippet || mongoose.model('Snippet', SnippetSchema)