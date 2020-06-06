const mongoose = require('mongoose');

export type CardModel = Document & {
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
};

const CardSchema = new mongoose.Schema(
  {
    collectible: {
      type: Number,
    },
    slug: {
      type: String,
    },
    classId: {
      type: Number,
    },
    multiClassIds: {
      type: [String],
    },
    cardTypeId: {
      type: Number,
    },
    rarityId: {
      type: Number,
    },
    artistName: {
      type: String,
    },
    manaCost: {
      type: Number,
    },
    name: {
      type: String,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    imageGold: {
      type: String,
    },
    flavorText: {
      type: String,
    },
    cropImage: {
      type: String,
    },
    childIds: {
      type: ['Mixed'],
    },
  },
  {
    timestamps: true,
  }
);
// @ts-ignore
export default mongoose.model<CardModel>('Card', CardSchema);
