import { sequelize } from "../config/database.mjs";
import { DataTypes } from "sequelize";


// ici on definis les tables 

export const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Nom d'utilisateur requis." },
            len: { args: [2, 50], msg: "2 a 50 caractères." }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Email Requis" },
            len: { args: [2, 50], msg: "2 a 50 caractères." }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
            notEmpty: {msg: "Mot de passe requis"}
        }
    },
},{
    tableName: "users",
    timestamps: true
})    