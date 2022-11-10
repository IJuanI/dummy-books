import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import Utils from '../utils/index.js';

const utilsPlugin: FastifyPluginAsync = async (server) => {
  server.decorate('utils', new Utils(server));
};

declare module 'fastify' {
  interface FastifyInstance {
    utils: Utils;
  }
}

export default fp(utilsPlugin);
