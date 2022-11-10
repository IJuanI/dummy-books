import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { Client } from 'pg';


const dbPlugin: FastifyPluginAsync = async (server) => {
  const pgClient = new Client('postgres://postgres:postgres@localhost:5432/books');
  pgClient.connect();

  server.decorate('db', pgClient);
};

declare module 'fastify' {
  interface FastifyInstance {
    db: Client;
  }
}

export default fp(dbPlugin);
