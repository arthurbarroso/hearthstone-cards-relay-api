import { mongooseLoader, connectionFromMongoCursor } from "@entria/graphql-mongoose-loader"; //eslint-disable-line
import DataLoader from 'dataloader';
import { ConnectionArguments, toGlobalId } from 'graphql-relay';
import Card, { CardModel } from './CardModel';
import GraphQLContext from '../../definitions/GraphQLContext';

export default class CardIn {
  _id: String;

  collectible: Number;

  slug: String;

  classId: Number;

  multiClassIds: Array<String>;

  cardTypeId: Number;

  rarityId: Number;

  artistName: String;

  manaCost: Number;

  name: String;

  text: String;

  image: String;

  imageGold: String;

  flavorText: String;

  cropImage: String;

  childIds: Array<String>;

  constructor(data: CardModel) {
    this._id = data._id;
    this.collectible = data.collectible;
    this.slug = data.slug;
    this.classId = data.classId;
    this.multiClassIds = data.multiClassIds;
    this.cardTypeId = data.cardTypeId;
    this.rarityId = data.rarityId;
    this.artistName = data.artistName;
    this.manaCost = data.manaCost;
    this.name = data.name;
    this.text = data.text;
    this.image = data.image;
    this.imageGold = data.imageGold;
    this.flavorText = data.flavorText;
    this.cropImage = data.cropImage;
    this.childIds = data.childIds;
  }
}

export const getLoader = () =>
  new DataLoader((ids) => mongooseLoader(Card, ids as any));

export const load = async (context, id): Promise<CardModel> => {
  if (!id) return null;

  try {
    const data = Card.findOne({ _id: id });

    if (!data) return null;

    return data;
  } catch (err) {
    return null;
  }
};

export const loadCards = async (
  context?: GraphQLContext,
  args?: ConnectionArguments
) => {
  const where = args.search
    ? {
    // eslint-disable-line
    name: { // eslint-disable-line
      $regex: new RegExp(`^${args.search}`, 'ig'), // eslint-disable-line
    }, // eslint-disable-line
  } // eslint-disable-line
    : {};

  const cards = Card.find(where, { _id: 1 }).sort({
    createdAt: -1,
  });
  const res = await connectionFromMongoCursor({
    cursor: cards,
    context,
    args,
    loader: load,
  });

  return res;
};
