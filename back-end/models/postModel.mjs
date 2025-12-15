import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.mjs";


export const Post = sequelize.define("Post", {
    user_id : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {msg: "Contenu requis"},
            len: { args: [1,400], msg: "2 a 400 caractères."}
        }
    },
    parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }

},{
    tableName: "posts",
    timestamps: true
})