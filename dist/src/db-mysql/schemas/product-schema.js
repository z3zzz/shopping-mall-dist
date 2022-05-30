"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const connect_1 = require("../connect");
class Product extends sequelize_1.Model {
}
exports.Product = Product;
Product.init({
    _id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    sellerId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    categoryId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    manufacturer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    shortDescription: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    detailDescription: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    imageKey: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    inventory: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    searchKeywords: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    isRecommended: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    discountPercent: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    sku: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: connect_1.sequelize,
    tableName: 'products',
});
