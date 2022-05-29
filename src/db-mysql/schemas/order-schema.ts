import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '../connect';
import { User } from './user-schema';

class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  declare userId: string;
  declare summaryTitle: string;
  declare totalPrice: number;
  declare postalCode: string;
  declare address1: string;
  declare address2: string;
  declare receiverName: string;
  declare receiverPhoneNumber: string;
  declare request: string;
  declare status: CreationOptional<string>;
  declare id: CreationOptional<number>;
  declare _id: CreationOptional<string>;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summaryTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    request: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '상품 준비중',
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'orders',
  }
);

Order.hasOne(User, {
  foreignKey: '_id',
});

export { Order };
