const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type Author {
    name: String
  }

  type Query {
    Books: [Book]
    Authors: [Author]
  }

  type Mutation {
    addBook(title: String, author: String): Book
  }
`;

var books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

var authors = [
   {
      name: 'Kate Chopin'
   },
   {
      name: 'Paul Auster'
   }
]

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
   Query: {
      Books: () => books,
      Authors: () => authors,
   },
   Mutation: {
      addBook: (_, {title, author}) => {
         titles = books.map(book => book.title)
         names = authors.map(author => author.name)
         if (!titles.includes(title)) {
            books = [...books, {title: title, author: author}]
            if (!names.includes(author)) {
               authors = [...authors, {name: author}]
            }
            return {
               title,
               author
            }
         }
      }
   }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

