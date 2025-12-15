import { User } from "./userModel.mjs";
import { Post } from "./postModel.mjs";

// ici on defini les relations 

User.hasMany(Post, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
})

Post.belongsTo(User, {
    foreignKey: "user_id"
})




export { User, Post };