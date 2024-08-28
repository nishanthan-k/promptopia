const { Schema, models, model } = require("mongoose");

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'UserId is missing!'],
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is missing!'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is missing!'],
  }
})

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;
