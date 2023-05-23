import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
const typeDefs = `#graphql
 type Query {
    hello: String
    users: [User]
    user(id: ID!): User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }
  
  
`;
const users = [
    {
        id: '1',
        name: 'John Doe',
        email: '',
        age: 25,
    },
    {
        id: '2',
        name: 'Jane Doe',
        email: '',
        age: 30,
    },
    {
        id: '3',
        name: 'John Smith',
        email: '',
        age: 35,
    },
];
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        users: () => users,
        user: (parent, args, context, info) => {
            return users.find((user) => user.id === args.id);
        },
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
