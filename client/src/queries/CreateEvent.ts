import {gql} from '@apollo/client';

const CREATE_EVENT = gql`
  mutation Mutation($eventInput: EventInput) {
  createEvent(eventInput: $eventInput) {
    _id
    title
    description
    price
    date
  }
}
`;
export default CREATE_EVENT;