import {gql} from '@apollo/client';

const CANCEL_BOOKING = gql`
  mutation Mutation($bookingId: ID!) {
  cancelBooking(bookingId: $bookingId) {
    _id
    title
  }
}
`;
export default CANCEL_BOOKING;