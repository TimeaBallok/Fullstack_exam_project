import gql from 'graphql-tag';
import { DateTimeResolver, DateTimeTypeDefinition } from 'graphql-scalars';

const typeDefs = gql`
  ${DateTimeTypeDefinition}
 
  type Event {
    _id: ID!
    title: String!
    description: String!
    price: String!
    date: DateTime!
    creator: User!
    }
  
  input EventInput {
    title: String!
    description: String!
    price: String!
    date: String!
    creator: String!
    }
   
  type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event!]
    }
    
  input UserInput {
    email: String!
    password: String!
    }
    
    type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
    }
    
  type Booking {
    _id: ID!
    event: Event!
    user: User!
    }
   
   input BookingInput {
    event: String!
    user: String!
    }
    
    
  type Query {
    events: [Event!]!
    bookings: [Booking!]!
    }

  type Mutation {
    createEvent(eventInput: EventInput): Event
    deleteEvent(eventId: ID!): Event
    updateEvent(eventId: ID!, eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    login(email: String!, password: String!): AuthData!
    bookEvent(bookingInput: BookingInput): Booking
    cancelBooking(bookingId: ID!): Event!
    }
`;

export default typeDefs;