import http from "http";
import app from "./app";
import keys from "./config";

const { port } = keys;

const server = http.createServer(app);

server.listen(port, () => {
  console.log("===========================");
  console.log(`Listening on Port: ${port}`);
  console.log("===========================");
});
