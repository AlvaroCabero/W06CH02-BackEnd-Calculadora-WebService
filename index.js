require("dotenv").config();

const http = require("http");

const server = http.createServer();


const port = process.env.SERVER_PORT_SERVER || 5000;


server.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
});

server.on("request", (request, response) => {
  console.log("Uhl·la, ha llegado una request");
  response.setHeader("Content-Type", "application/json");
  response.write(JSON.stringify({ name: "Luis", age: 30 }));
  response.end();
});
