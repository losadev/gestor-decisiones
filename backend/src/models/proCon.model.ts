import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  IsUUID,
  Length,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { ProConAttributes, ProConType } from "../types/proCon.type";
import { Decision } from "./decision.model";

@Table
export class ProCon extends Model<ProConAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Length({ min: 5, max: 255 })
  @Column(DataType.TEXT)
  description!: string;

  @AllowNull(false)
  @Column(DataType.ENUM("PRO", "CONTRA"))
  type!: ProConType;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  weight!: number;

  @ForeignKey(() => Decision)
  @Column(DataType.UUID)
  declare decisionId: string;

  @BelongsTo(() => Decision)
  decision!: Decision;
}
