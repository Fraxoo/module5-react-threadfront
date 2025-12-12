import { sequelize } from "../config/database.mjs";
import { DataTypes } from "sequelize";

export const Comment = sequelize.define("Comment", {
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
            notEmpty: { msg: "Veuillez remplir ce champ" },
            len: { args: [1, 400], msg: "1 a 400 caractères" }
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: "comments",
    timestamps: true
})