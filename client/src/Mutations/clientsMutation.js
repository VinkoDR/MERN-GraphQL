import { gql } from "@apollo/client";

//this is a a mutation like we put in graphiQL
const DELETE_CLIENT = gql`
mutation deleteClient ($id: ID!){
    deleteClient (id: $id) {
    id
    name
    email
    phone
  }
}
`
export { DELETE_CLIENT }
