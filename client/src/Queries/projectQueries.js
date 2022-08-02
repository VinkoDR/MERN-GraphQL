import { gql } from '@apollo/client'

//this is a a query like we put in graphiQL
const GET_PROJECTS = gql`
query getProjects {
  projects {
    id
    name
    description
    status
  }
}
`

export { GET_PROJECTS };