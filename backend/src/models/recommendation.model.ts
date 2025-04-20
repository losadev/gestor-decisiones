import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { RecommendationAttributes } from "../types/recommendation.types";
import { User } from "./user.model";
import { Decision } from "./decision.model";
import { Evaluation } from "./evaluation.model";

@Table
export class Recommendation extends Model<RecommendationAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  content!: string;

  @AllowNull(false)
  @ForeignKey(() => Decision)
  @Column(DataType.UUID)
  decisionId!: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  @ForeignKey(() => Evaluation)
  evaluationId!: string;

  @BelongsTo(() => Decision)
  decision!: Decision;

  @BelongsTo(() => Evaluation)
  evaluation!: Evaluation;

  @BelongsTo(() => User)
  user!: User;
}
