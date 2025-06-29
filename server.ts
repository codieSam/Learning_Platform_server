import app from "./src/app";
import { envConfig } from "./src/config/config";

// database connection ko file lai compulsorily import garnuparxa

import "./src/database/connection";

function startServer() {
  const port = envConfig.portNumber;
  app.listen(port, function () {
    console.log(`Server is started at port ${port}`);
  });
}

startServer();
