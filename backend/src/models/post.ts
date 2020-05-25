import mongoose from "mongoose";

const { Schema } = mongoose;

const RecommentSchema = new Schema({
  id: {
    type: Number,
    default: 1,
  },
  text: String,
  isEdited: {
    type: Boolean,
    default: false,
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
});

const CommentSchema = new Schema({
  id: {
    type: Number,
    default: 1,
  },
  text: String,
  isEdited: {
    type: Boolean,
    default: false,
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  recomments: [RecommentSchema],
});

const PostSchema = new Schema({
  id: {
    type: Number,
    default: 1,
  },
  title: String,
  files: [String],
  body: String,
  tags: [String],
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  likeUsers: [mongoose.Types.ObjectId],
  likes: {
    default: 0,
    type: Number,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  },
  comments: {
    type: [CommentSchema],
    default: {
      recomments: [],
    },
  },
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
