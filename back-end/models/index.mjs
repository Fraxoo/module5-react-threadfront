import { Post } from "./postModel.mjs";
import { User } from "./userModel.mjs";
import { Comment } from "./commentModel.mjs";





User.hasMany(Post, { foreignKey: "user_id" });
Post.belongsTo(User, { foreignKey: "user_id" });

Post.hasMany(Comment, { foreignKey: "post_id" });
Comment.belongsTo(Post, { foreignKey: "post_id" });



// ici on defini les relations 

User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
})

Comment.belongsTo(User, {
    foreignKey: "user_id"
})




export { User, Comment };
