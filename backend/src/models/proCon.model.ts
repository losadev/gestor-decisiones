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
import { ProConAttributes, ProConType } from "../@types/proCon.type";
import { Decision } from "./decision.model";

@Table
export class ProCon extends Model<ProConAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Length({ min: 5, max: 255 })
  @Column(DataType.TEXT)
  description!: string;

  @AllowNull(false)
  @Column(DataType.ENUM("Pro", "Contra"))
  type!: ProConType;

  @Column(DataType.FLOAT)
  weight!: number;

  @ForeignKey(() => Decision)
  @Column(DataType.UUID)
  decisionId!: string;

  @BelongsTo(() => Decision, { onDelete: "CASCADE" })
  decision!: Decision;
}
