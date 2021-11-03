require("dotenv").config();

const http = require("http");

const server = http.createServer();

const port = process.env.SERVER_PORT_MAIN || 5000;

server.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
});

server.on("request", (request, response) => {
  const urlToCheck = `http://localhost:4500/${request.url}`;

  const value1 = 6;
  const value2 = 3;

  // const urlSearchParams = url.searchParams;

  const show = `<h1>Calculadora WebService</h1>
<h2>Resultados</h2>
<div>${value1} + ${value2} = ${value1 + value2}<div/>
<div>${value1} - ${value2} = ${value1 - value2}<div/>
<div>${value1} * ${value2} = ${value1 * value2}<div/>
<div>${value1} / ${value2} = ${value1 / value2}<div/>`;

  response.setHeader("Content-Type", "text/html");
  response.write(show);
  response.end();
});
