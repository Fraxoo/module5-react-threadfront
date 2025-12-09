import { sequelize } from "../config/database.mjs";
import { DataTypes } from "sequelize";

export const Comment = sequelize.define("Comment", {
    user_id: {
        type: DataTypes.NUMBER,
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
        type: DataTypes.NUMBER,
        allowNull: false,
    }
},{
    tableName: "comments",
    timestamps: true
})