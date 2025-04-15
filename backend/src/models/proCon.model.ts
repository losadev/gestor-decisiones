import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasOne,
  IsUUID,
  Length,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { ProConType } from "../types/proCon.type";
import { Decision } from "./decision.model";
import { Category } from "./category.model";

@Table
export class ProCon extends Model<ProCon> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Length({ min: 5, max: 255 })
  @Column(DataType.TEXT)
  text!: string;

  @AllowNull(false)
  @Column(DataType.ENUM("PRO", "CONTRA"))
  declare type: ProConType;

  @Column(DataType.FLOAT)
  weight!: number;

  @ForeignKey(() => Decision)
  @Column(DataType.UUID)
  declare decisionId: string;

  @BelongsTo(() => Decision)
  decision!: Decision;
}
