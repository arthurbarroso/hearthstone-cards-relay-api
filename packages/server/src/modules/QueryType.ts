import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';
import { connectionArgs, globalIdField, fromGlobalId } from 'graphql-relay';
import { nodeField } from '../definitions/nodeInterface';
import GraphQLContext from '../definitions/GraphQLContext';
import { CardType, CardConnection } from './rootType';
import { load, loadCards } from './cards/CardLoader';

/*

*/

export default new GraphQLObjectType<any, GraphQLContext, any>({
  name: 'Query',
  description: 'Main query',
  fields: () => ({
    id: globalIdField('id'),
    node: nodeField,

    card: {
      type: CardType,
      args: {
        ...connectionArgs,
        id: {
          type: GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { id }, context) => load(context, fromGlobalId(id).id),
    },

    cards: {
      type: GraphQLNonNull(CardConnection.connectionType),
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args, context) => loadCards(context, args),
    },
  }),
});
