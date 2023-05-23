import {gql} from '@apollo/client';

const CREATE_USER = gql`
  mutation Mutation($userInput: UserInput) {
  createUser(userInput: $userInput) {
    _id
    email
  }
}
`;
export default CREATE_USER;