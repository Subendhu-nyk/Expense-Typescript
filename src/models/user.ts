import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../util/expense';

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    phone: string;
    password: string;
    ispremiumuser: boolean;
    totalExpense: number;
}

class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public phone!: string;
    public password!: string;
    public ispremiumuser!: boolean;
    public totalExpense!: number;

    

}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ispremiumuser: DataTypes.BOOLEAN,
        totalExpense: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        sequelize,
        tableName: 'user'
       
    }
);

export default User;
