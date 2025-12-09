import { Post } from "./postModel.mjs";
import { User } from "./userModel.mjs";

User.hasMany(Post, { foreignKey: "user_id" });
Post.belongsTo(User, { foreignKey: "user_id" });

export{User,Post};