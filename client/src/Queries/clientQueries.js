import { gql } from '@apollo/client'

//this is a a query like we put in graphiQL
 const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`

export { GET_CLIENTS };