import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";

@Table({
  tableName: "users", //uta gui ma dekhiney table ko name
  modelName: "User", // project ma vitra mati ko table lai access garney name
  timestamps: true,
})
class User extends Model {
  //class name will be same as modelName and it will inherit the Modek Class
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id?: string;
  @Column({
    type: DataType.STRING,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare email: string;
  @Column({
    type: DataType.ENUM("super-admin", "institute", "teacher", "student"),
    defaultValue: "student",
  })
  declare role: string;
  @Column({
    type: DataType.STRING
  })
  declare currentInstituteNumber : string;

}
  
export default User;
