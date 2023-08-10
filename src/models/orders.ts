import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../util/expense';

interface OrderAttributes {
    id: number;
    paymentid: string;
    orderid: string;
    status: string;
}

class Order extends Model<OrderAttributes> implements OrderAttributes {
    public id!: number;
    public paymentid!: string;
    public orderid!: string;
    public status!: string;

    // Add any additional methods or static properties here

}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        paymentid: DataTypes.STRING,
        orderid: DataTypes.STRING,
        status: DataTypes.STRING
    },
    {
        sequelize,
        tableName: 'orders'
        // Other options as needed
    }
);

export default Order;
