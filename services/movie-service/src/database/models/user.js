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
    },
    diaryEntries: [
      {
        movie: {
          type: Schema.Types.ObjectId,
          ref: 'Movie',
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      },
    ],
  },
  { timestamps: true }
);

// userSchema.statics.resetCounter = () => (this.serviceUsage.counter = 0);

module.exports = mongoose.model('User', userSchema);
