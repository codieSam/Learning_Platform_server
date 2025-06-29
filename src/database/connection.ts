import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config";
const sequelize = new Sequelize({
  database: envConfig.dbName,
  username: envConfig.dbUsername,
  password: envConfig.dbPassword,
  host: envConfig.dbHost,
  dialect: "mysql", // which database are you using in this project
  port: Number(envConfig.dbPort),
  models: [__dirname + "/models"], // current locations + '/models'
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Authenticated, Connected");
  })
  .catch((e) => {
    console.log(e);
  });

//migration/push

sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("Migrated sucessfully");
  })
  .catch((e) => console.log("The error is" + e));

export default sequelize;
