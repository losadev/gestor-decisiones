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
import { ProCon } from "./proCon.model";
import { Evaluation } from "./evalutation.model";
import { User } from "./user.model";
import { CategoryType, DecisionAttributes } from "../types/decision.types";

@Table
export class Decision extends Model<DecisionAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare title: string;

  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(CategoryType)))
  categoryType!: CategoryType;

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
