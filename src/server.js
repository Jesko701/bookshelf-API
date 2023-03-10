const Hapi = require("@hapi/hapi");
const routes = require('./routes')
require("dotenv").config();

const initiation = async () => {
  try {
    const server = Hapi.server({
      port: process.env.PORT,
      host: process.env.HOST,
      routes: {
        cors: {
          origin: ["*"],
        },
      },
    });
    server.route(routes);
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
  } catch (error) {
    console.log(error);
  }
};

initiation();
