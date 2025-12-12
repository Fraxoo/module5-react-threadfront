import { sequelize } from "../config/database.mjs"
import { DataTypes } from "sequelize"

export const Post = sequelize.define("Post", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Contenu requis" },
            len: { args: [1, 400], msg: "Entre 1 et 400 caractères" }
        }
    },

}, {
    tableName: "posts",
    timestamps: true
})