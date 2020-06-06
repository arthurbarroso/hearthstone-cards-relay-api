import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLObjectTypeConfig,
  GraphQLInt,
} from 'graphql';
import { globalIdField } from 'graphql-relay';

import GraphQLContext from '../definitions/GraphQLContext';
import { nodeInterface } from '../definitions/nodeInterface';
import { connectionDefinitions } from '../definitions/ConnectionType';
import { CardModel } from './cards/CardModel';

export const AuthType = new GraphQLObjectType({
  name: 'AuthType',
  fields: {
    token: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
});

type CardConfigType = GraphQLObjectTypeConfig<CardModel, GraphQLContext>;

const CardTypeConfig: CardConfigType = {
  name: 'Card',
  description: 'Represents the card model',
  fields: () => ({
    id: globalIdField('Card'),
    collectible: {
      type: GraphQLNonNull(GraphQLInt),
      resolve: (card) => card.collectible,
    },
    slug: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (card) => card.slug,
    },
    classId: {
      type: GraphQLNonNull(GraphQLInt),
      resolve: (card) => card.classId,
    },
    multiClassIds: {
      type: GraphQLList(GraphQLString),
      resolve: (card) => card.multiClassIds,
    },
    cardTypeId: {
      type: GraphQLNonNull(GraphQLInt),
      resolve: (card) => card.cardTypeId,
    },
    rarityId: {
      type: GraphQLNonNull(GraphQLInt),
      resolve: (card) => card.rarityId,
    },
    artistName: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (card) => card.artistName,
    },
    manaCost: {
      type: GraphQLInt,
      resolve: (card) => card.manaCost,
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (card) => card.name,
    },
    text: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (card) => card.text,
    },
    image: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (card) => card.image,
    },
    imageGold: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (card) => card.imageGold,
    },
    flavorText: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (card) => card.flavorText,
    },
    cropImage: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (card) => card.cropImage,
    },
    childIds: {
      type: GraphQLList(GraphQLString),
      resolve: (card) => card.childIds,
    },
  }),
  interfaces: () => [nodeInterface],
};

export const CardType = new GraphQLObjectType(CardTypeConfig);

export const CardConnection = connectionDefinitions({
  name: 'Card',
  nodeType: CardType,
});
