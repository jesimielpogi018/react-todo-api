require("dotenv").config();
import {
  MongoClient,
  type MongoClientOptions,
  ServerApiVersion,
} from "mongodb";

// env
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PWD = process.env.MONGO_PWD;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;

// mongo url
const MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PWD}@${MONGO_HOST}:${MONGO_PORT}`;

const options: MongoClientOptions = {
  appName: "Todo List API",
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

const conn: MongoClient = new MongoClient(MONGO_URL, options);
