import 'dotenv/config';
import axios from 'axios';
import Card, { CardModel } from './CardModel';
import connect, { disconnect } from './mongoConnector';

const access_token = process.env.BLIZZARD_TOKEN;

const url = `https://us.api.blizzard.com/hearthstone/cards?locale=en_US&page=1&pageSize=5000&access_token=${access_token}`;

async function fillDatabase(cards: Array<CardModel>) {
  console.log('Started to store the cards in the database 🐉');
  for (const card of cards) { //eslint-disable-line
    await Card.create(card);
  }

  console.log('Ended creating cards in the database ✨');
  disconnect();
}

async function run() {
  try {
    connect();
    const response = await axios.get(url);

    const cards: Array<CardModel> = [];
    response.data.cards.forEach((card) => {
      cards.push(card);
    });

    if (response.data.pageCount > 1) {
      for (let i = 2; i <= response.data.pageCount; i++) {
        const page = await axios.get(
          `https://us.api.blizzard.com/hearthstone/cards?locale=en_US&page=${i}&pageSize=5000&access_token=USoaSSvtUBLvkE3hG60WkSxaE1GT5YQcHx`
        );
        page.data.cards.forEach((card) => {
          cards.push(card);
        });
      }
    }

    try {
      fillDatabase(cards);
    } catch (e) {
      console.log('Something wrong happened!', e);
    }
  } catch (e) {
    console.error(e); //eslint-disable-line
  }
}

run();
