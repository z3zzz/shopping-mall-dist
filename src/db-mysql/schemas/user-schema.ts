import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../connect';

export type Role = 'basic-user' | 'admin';

export interface UserAddress {
  postalCode: string;
  address1: string;
  address2: string;
}

export interface UserInfo {
  email: string;
  fullName: string;
  password: string;
  profileImage?: string;
  phoneNumber?: string;
  address?: UserAddress;
  role?: Role;
}

export interface UserAttributes {
  id: number;
  _id: string;
  email: string;
  fullName: string;
  password: string;
  role: Role;
  profileImage?: string;
  phoneNumber?: string;
  poastalCode?: string;
  address1?: string;
  address2?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserData {
  id: number;
  _id: string;
  email: string;
  fullName: string;
  password: string;
  role: Role;
  profileImage?: string;
  phoneNumber?: string;
  address?: UserAddress;
  createdAt?: Date;
  updatedAt?: Date;
}

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
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
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address2: {
    type: DataTypes.STRING,
    allowNull: true,
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
});

export { User };
