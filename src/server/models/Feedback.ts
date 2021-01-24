import mongoose from 'mongoose'

const FeedbackSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  feedback: {
    type: String,
    required: true
  }
})

const Feedback = mongoose.model('Feedback', FeedbackSchema)

export { Feedback }
