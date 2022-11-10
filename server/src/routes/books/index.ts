import { FastifyPluginAsync } from 'fastify';
import BookHandlers from './handlers.js';

const handlers = new BookHandlers();

const routes: FastifyPluginAsync = async (server) => {
  server.crud(handlers);
}

export default routes;
