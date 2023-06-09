import {gql} from '@apollo/client';

const LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    userId
    token
    tokenExpiration
  }
}
`;
export default LOGIN;