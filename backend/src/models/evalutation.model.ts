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
import { Decision } from "./decision.model";
import { EvaluationAttributes } from "../types/evaluation.types";

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
  @Column(DataType.NUMBER)
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
