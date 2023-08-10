import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../util/expense';

interface ExpenseAttributes {
    id: number;
    Itemname: string;
    price: number;
    date: string;
    category: string;
}

class Expense extends Model<ExpenseAttributes> implements ExpenseAttributes {
    public id!: number;
    public Itemname!: string;
    public price!: number;
    public date!: string;
    public category!: string;

    // Add any additional methods or static properties here

}

Expense.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        Itemname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'expenses'
        // Other options as needed
    }
);

export default Expense;
