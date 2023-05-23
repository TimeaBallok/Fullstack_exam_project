import {gql} from '@apollo/client';

const UPDATE_EVENT = gql`
  mutation Mutation($eventId: ID!, $eventInput: EventInput) {
  updateEvent(eventId: $eventId, eventInput: $eventInput) {
    _id
    title
  }
}
`;
export default UPDATE_EVENT;