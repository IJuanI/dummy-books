import fastify from 'fastify';
import utils from './plugins/utils.js';
import config from './plugins/config.js';
import routes from './routes/index.js';
import crud from './plugins/crud.js';

const server = fastify();

await server.register(config);
await server.register(utils);
await server.register(crud);
await server.register(routes);
await server.ready();

export default server;

if (process.env.NODE_ENV !== 'test') {
  process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
  });
  const port = +server.config.PORT;
  await server.listen({ port });

  for (const signal of ['SIGINT', 'SIGTERM']) {
    process.on(signal, () =>
      server.close().then((err) => {
        console.log(`close application on ${signal}`);
        process.exit(err ? 1 : 0);
      }),
    );
  }
}
