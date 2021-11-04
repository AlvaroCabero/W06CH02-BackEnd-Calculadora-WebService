const { program } = require("commander");
require("dotenv").config();

// const url = require("url");

program.version("0.0.1");
program.option("-p, --port <type>", "port number");

program.parse(process.argv);

const options = program.opts();

const http = require("http");

const server = http.createServer();

const port = options.port || process.env.SERVER_PORT_MAIN || 5000;

server.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
});

server.on("request", (request, response) => {
  const urlToCheck = `http://localhost${request.url}`;
  let value1 = "";
  let value2 = "";
  let show = "";

  let isOk = true;
  const urlSearchParams = new URL(urlToCheck).searchParams;

  console.log(urlSearchParams);

  if (request.url.includes("calculator")) {
    value1 = +urlSearchParams.get("a");
    value2 = +urlSearchParams.get("b");
    // console.log(value1);
    // console.log(value2);
    if (
      !value1 ||
      !value2 ||
      Number.isNaN(value1) ||
      Number.isNaN(value2)
      // value1.length === 0 ||
      // value2.length === 0
    ) {
      console.log("error");
      show = `<h1>Calculadora WebService</h1>
<h2>ERROR 404</h2>
<div>Please, set valid input  values<div/>
`;
      // response.statusCode = 404;
      // response.end();
      isOk = false;
    } else {
      show = `<h1>Calculadora WebService</h1>
<h2>Resultados</h2>
<div>${value1} + ${value2} = ${value1 + value2}<div/>
<div>${value1} - ${value2} = ${value1 - value2}<div/>
<div>${value1} * ${value2} = ${value1 * value2}<div/>
<div>${value1} / ${value2} = ${(value1 / value2).toFixed(2)}<div/>`;
      response.statusCode = 200;
      isOk = true;
      console.log(isOk);
    }
  } else {
    console.log("error");
    show = `<h1>Calculadora WebService</h1>
<h2>ERROR 404</h2>
<div>Please, set valid input  values<div/>
`;
    // response.statusCode = 404;
    // response.end();
    isOk = false;
  }

  response.setHeader("Content-Type", "text/html");
  response.write(show);
  response.end();
});
