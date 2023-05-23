import {gql} from '@apollo/client';

const BOOK_EVENT = gql`
  mutation Mutation($bookingInput: BookingInput) {
  bookEvent(bookingInput: $bookingInput) {
    _id
  }
}
`;
export default BOOK_EVENT;