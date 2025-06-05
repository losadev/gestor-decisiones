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
import { Evaluation } from "./evaluation.model";
import { User } from "./user.model";
import { CategoryType, DecisionAttributes } from "../@types/decision.types";
import { Recommendation } from "./recommendation.model";

@Table
export class Decision extends Model<DecisionAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string;

  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(CategoryType)))
  category!: CategoryType;

  @AllowNull(false)
  @Default("progress")
  @Column(DataType.ENUM("progress", "evaluated"))
  status!: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId!: string;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => ProCon)
  proCons!: ProCon[];

  @HasOne(() => Evaluation)
  evaluation!: Evaluation;

  @HasOne(() => Recommendation)
  recommendation!: Recommendation;
}
