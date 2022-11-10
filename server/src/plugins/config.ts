import 'dotenv/config';
import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';

export interface Config {
  NODE_ENV: 'development' | 'test' | 'production';
  PORT: string;
}

const configPlugin: FastifyPluginAsync = async (server) => {
  server.decorate('config', process.env);
};

declare module 'fastify' {
  interface FastifyInstance {
    config: Config;
  }
}

export default fp(configPlugin);
