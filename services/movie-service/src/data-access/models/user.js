const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    userName: String,
    userRole: {
      type: String,
      required: true,
    },
    diaryEntries: [{
      type: Schema.Types.ObjectId,
      ref: 'Movie',
    }],
    serviceUsage: {
      isLimited: Boolean,
      limit: Number,
      counter: Number,
    },
  },
  { timestamps: true },
);

userSchema.statics.resetCounter = () => this.serviceUsage.counter = 0;

module.exports = mongoose.model('User', userSchema);