import {gql} from '@apollo/client';

const DELETE_EVENT = gql`
  mutation Mutation($eventId: ID!) {
  deleteEvent(eventId: $eventId) {
    _id
    title
  }
}
`;
export default DELETE_EVENT;