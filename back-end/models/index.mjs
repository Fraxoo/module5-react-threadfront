import { User } from "./userModel.mjs";
import { Comment } from "./commentModel.mjs";


// ici on définit les relations 

User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
})

Comment.belongsTo(User, {
    foreignKey: "user_id"
})




export { User, Comment };