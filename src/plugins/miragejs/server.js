/* eslint-disable */
import { createServer } from 'miragejs';
import { createGraphQLHandler } from '@miragejs/graphql';
import { PASSTHROUGH_QUERIES } from './passthrough.routes';
import { graphQLSchema } from './schemas';
import { userResolver } from './User/user.resolver';

export function makeServer() {
  return createServer({
    routes() {
      const graphQLHandler = createGraphQLHandler(graphQLSchema, this.schema, {
        ...userResolver
      });

      this.post('http://localhost:4000/', (_, request) => {
        if (PASSTHROUGH_QUERIES.some((value) => request.requestBody.includes(value))) {
          return graphQLHandler(_, request);
        }
        console.info('Passthrough');
        request.passthrough();
      });
    }
  });
}
