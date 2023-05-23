import { gql } from '@apollo/client';

const GET_ALL_EVENTS = gql`
query Query {
  events {
    _id
    title
    date
    description
    price
    creator {
      _id
    }
  }
}
`;
export default GET_ALL_EVENTS;