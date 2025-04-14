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

@Table
export class Evaluation extends Model<Evaluation> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  result!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  score!: string;

  @AllowNull(false)
  @Column(DataType.DATEONLY)
  date!: string;

  @ForeignKey(() => Decision)
  @Column(DataType.UUID)
  declare decisionId: string;

  @BelongsTo(() => Decision)
  decision!: Decision;
}
