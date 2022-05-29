import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '../connect';

export type Role = 'basic-user' | 'admin';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare email: string;
  declare fullName: string;
  declare password: string;
  declare _id: CreationOptional<string>;
  declare role: CreationOptional<Role>;
  declare isOAuth: CreationOptional<boolean>;
  declare profileImage: CreationOptional<string>;
  declare phoneNumber: CreationOptional<string>;
  declare postalCode: CreationOptional<string>;
  declare address1: CreationOptional<string>;
  declare address2: CreationOptional<string>;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

User.init(
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    address1: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    address2: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'basic-user',
    },
    isOAuth: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export { User };
