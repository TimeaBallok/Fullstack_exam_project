import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import typeDefs  from "./graphqlSchemas";
import resolvers from "./resolvers/resolvers";
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import isAuth from './middleware/is-auth';

const DB = process.env.DATABASE_DEV!.replace(
    '<PASSWORD>', process.env.DATABASE_PASSWORD!
);

mongoose.connect(DB).then(() => console.log('DB connection successful!'))
    .catch((err) => console.log("DB connection failed!"));

interface MyContext {
    token?: string;
}

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(isAuth)

app.use('/',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {context: async ({ req }) => ({ token: req.headers.token }),
    }),
);

// Modified server startup
await new Promise<void>((resolve) => httpServer.listen({ port: 5000 }, resolve));
console.log(`🚀 Server ready at http://localhost:5000/`);