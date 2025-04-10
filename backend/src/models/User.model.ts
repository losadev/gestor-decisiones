import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";
import {
  AllowNull,
  Column,
  DataType,
  Default,
  IsEmail,
  IsUUID,
  Length,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";

@Table
export class User extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Length({ min: 2, max: 255 })
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Length({ min: 2, max: 255 })
  @Column(DataType.STRING)
  lastName!: string;

  @AllowNull(false)
  @IsEmail
  @Unique
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @AllowNull(false)
  @Column(DataType.DATEONLY)
  birthDate!: Date;

  @AllowNull(true)
  @Column(DataType.STRING)
  avatar?: string;
}
