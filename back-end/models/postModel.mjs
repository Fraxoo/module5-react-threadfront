import { sequelize } from "../config/database.mjs"
import { DataTypes } from "sequelize"
export const Post = sequelize.define("Post", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Contenu requis" },
            len: { args: [1, 255], msg: "Entre 1 et 400 caractères" }
        }
    },

}, {
    tableName: "posts",
    timeStamp: true
})