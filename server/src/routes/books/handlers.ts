import { RouteHandlerMethod } from 'fastify';
import { CrudHandlers } from '../../plugins/crud.js';

export default class BookHandlers
  extends CrudHandlers {

  summary: RouteHandlerMethod
    = async (request, reply) => {
      console.log('BookHandlers.summary');

      const books = await request.server.db.query('SELECT * FROM books');

      reply.send(books.rows);
    }

  create: RouteHandlerMethod
    = async (request, reply) => {
      console.log('BookHandlers.create');
      reply.send({ message: 'Hello World!' });
    }

  read: RouteHandlerMethod
    = async (request, reply) => {
      console.log('BookHandlers.read');
      reply.send({ message: 'Hello World!' });
    }

  update: RouteHandlerMethod
    = async (request, reply) => {
      console.log('BookHandlers.update');
      reply.send({ message: 'Hello World!' });
    }

  delete: RouteHandlerMethod
    = async (request, reply) => {
      console.log('BookHandlers.delete');
      reply.send({ message: 'Hello World!' });
    }

}
