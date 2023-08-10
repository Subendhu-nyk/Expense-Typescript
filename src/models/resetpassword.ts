import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../util/expense';

interface ForgotpassAttributes {
    id: string;
    active: boolean;
    expiresby: Date;
}

class Forgotpass extends Model<ForgotpassAttributes> implements ForgotpassAttributes {
    public id!: string;
    public active!: boolean;
    public expiresby!: Date;

    

}

Forgotpass.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
        },
        expiresby: {
            type: DataTypes.DATE,
        },
    },
    {
        sequelize,
        tableName: 'forgotpass'
       
    }
);

export default Forgotpass;
