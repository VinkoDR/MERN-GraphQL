import Header from "./Components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import Clients from "./Components/Clients";
import AddClientModal from "./Components/AddClientModal";
import Projects from "./Components/Projects";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client =  new ApolloClient({
  uri: 'http://localhost:9000/graphql',
  cache
})


function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <AddClientModal />
          <Projects />
          <Clients />
        </div>
      </ApolloProvider>

    </>
  );
}

export default App;