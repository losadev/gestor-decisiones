import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasOne,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Decision } from "./decision.model";
import { EvaluationAttributes } from "../types/evaluation.types";
import { Recommendation } from "./recommendation.model";

@Table
export class Evaluation extends Model<EvaluationAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  result!: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  score!: number;

  @AllowNull(false)
  @Column(DataType.DATEONLY)
  date!: Date;

  @ForeignKey(() => Decision)
  @Column(DataType.UUID)
  decisionId!: string;

  @BelongsTo(() => Decision)
  decision!: Decision;
}
