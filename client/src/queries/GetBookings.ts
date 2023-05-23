import { gql } from '@apollo/client';

const GET_BOOKINGS = gql`
query Query {
  bookings {
    _id
    event {
      _id
      title
      description
      date
      price
    }
    user {
      _id
    }
  }
}
`;
export default GET_BOOKINGS;