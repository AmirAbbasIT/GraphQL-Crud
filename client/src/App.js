import './App.css';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost'
import BookList from './Components/BookList';
import AddBook from './Components/AddBook';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
})
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <AddBook />
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
