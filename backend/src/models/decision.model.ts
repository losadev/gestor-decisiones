import {
  Table,
  Column,
  Model,
  PrimaryKey,
  IsUUID,
  Default,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
  HasMany,
  HasOne,
} from "sequelize-typescript";
import { Category } from "./category.model";
import { ProCon } from "./proCon.model";
import { Evaluation } from "./evalutation.model";
import { User } from "./user.model";

@Table
export class Decision extends Model<Decision> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare title: string;

  @ForeignKey(() => Category)
  @Column(DataType.UUID)
  declare categoryId: string;

  @BelongsTo(() => Category)
  category!: Category;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  declare userId: User;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => ProCon)
  proCons!: ProCon[];

  @HasOne(() => Evaluation)
  evaluation!: Evaluation;
}
