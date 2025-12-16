import { User } from "./userModel.mjs";
import { Post } from "./postModel.mjs";

// Relations User <-> Post
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

// ✅ Self relation Post <-> Post (commentaires = replies)
Post.hasMany(Post, {
  as: "replies",
  foreignKey: "parent_id",
  onDelete: "CASCADE",
});

Post.belongsTo(Post, {
  as: "parent",
  foreignKey: "parent_id",
});

export { User, Post };
