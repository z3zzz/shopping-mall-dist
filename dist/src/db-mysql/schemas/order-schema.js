"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const sequelize_1 = require("sequelize");
const connect_1 = require("../connect");
class Order extends sequelize_1.Model {
}
exports.Order = Order;
Order.init({
    _id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    summaryTitle: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    totalPrice: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    postalCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address1: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address2: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    receiverName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    receiverPhoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    request: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: '상품 준비중',
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: connect_1.sequelize,
    tableName: 'orders',
});
