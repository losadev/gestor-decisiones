import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasMany,
  IsUUID,
  Length,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table
export class Category extends Model<Category> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Length({ min: 2, max: 255 })
  @Column(DataType.STRING)
  name!: string;

  /*@HasMany(() => ProCon)
  proCon!: ProCon[];*/
}
