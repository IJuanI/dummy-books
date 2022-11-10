import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from 'fastify';

export abstract class CrudHandlers {

  summary?: RouteHandlerMethod = undefined;

  abstract create: RouteHandlerMethod;

  abstract read: RouteHandlerMethod;

  abstract update: RouteHandlerMethod;

  abstract delete: RouteHandlerMethod;

}

type CrudFunction = (handlers: CrudHandlers) => void;

const crudRegister: (server: FastifyInstance, handlers: CrudHandlers) => void
  = (server, handlers) => {

    if (handlers.summary) {
      server.get('/', handlers.summary);
    }

    server.post('/', handlers.create);
    server.get('/:id', handlers.read);
    server.put('/:id', handlers.update);
    server.delete('/:id', handlers.delete);

  }

const crudPlugin: FastifyPluginAsync = async (server) => {
  server.decorate('crud', function (this: FastifyInstance, handlers: CrudHandlers) {
    crudRegister(this, handlers);
  });
};

declare module 'fastify' {
  interface FastifyInstance {
    crud: CrudFunction;
  }
}

export default fp(crudPlugin);
