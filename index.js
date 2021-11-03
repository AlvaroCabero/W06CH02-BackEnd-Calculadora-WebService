require("dotenv").config();
// const url = require("url");

const http = require("http");

const server = http.createServer();

const port = process.env.SERVER_PORT_MAIN || 5000;

server.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
});

server.on("request", (request, response) => {
  const urlToCheck = `http://localhost:4500${request.url}`;
  let value1 = 0;
  let value2 = 0;
  let show = "";
  const urlSearchParams = new URL(urlToCheck).searchParams;

  console.log(urlSearchParams);

  if (request.url.includes("calculator")) {
    value1 = +urlSearchParams.get("a");
    value2 = +urlSearchParams.get("b");
    console.log(value1);
    console.log(value2);
    if (Number.isNaN(value1) || Number.isNaN(value2)) {
      show = `<h1>Calculadora WebService</h1>
<h2>Resultados</h2>
<div>${value1} + ${value2} = ${value1 + value2}<div/>
<div>${value1} - ${value2} = ${value1 - value2}<div/>
<div>${value1} * ${value2} = ${value1 * value2}<div/>
<div>${value1} / ${value2} = ${value1 / value2}<div/>`;
      response.statusCode = 200;
    }
  } else {
    console.log("error");
    show = `<h1>Calculadora WebService</h1>
<h2>ERROR</h2>
<div>Los valores deben ser de tipo numérico<div/>
`;
    response.statusCode = 404;
    response.end();
  }

  response.setHeader("Content-Type", "text/html");
  response.write(show);
  response.end();
});
