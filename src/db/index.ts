import { Connection, connect, disconnect, connection } from 'mongoose';
import Product from '../entity/Product'

let database: Connection;

export const Connect = () => {
  const uri =
    'mongodb://localhost:27017/NodeJsChallenge20201030';

  if (database) {
    return;
  }

  connect(uri, {});

  database = connection;
  database.once('open', async () => {
    console.log('Connected to database successfully');
  });

  database.on('error', () => {
    console.log(`Error connecting to database. Check Whether mongoDB
		installed or you can try to give opensource Mongo Atlas database`);
  });

  return {
    Product
  };
};

export const Disconnect = () => {
  if (!database) {
    return;
  }

  disconnect();
};
