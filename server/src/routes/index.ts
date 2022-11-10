import { FastifyPluginAsync } from 'fastify';

const routerPlugin: FastifyPluginAsync = async (server) => {

  await server.utils.registerSubdirs(import.meta.url);
};

export default routerPlugin;
