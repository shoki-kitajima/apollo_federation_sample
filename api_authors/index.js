const { ApolloServer, gql } = require('apollo-server');
const { buildSubgraphSchema } = require("@apollo/federation")

const authors = [
  { id: "1", name: '宮沢賢治', birthday: '1896-08-27' },
  { id: "2", name: '坂口安吾', birthday: '1906-10-20' },
  { id: "3", name: '芥川龍之介', birthday: '1892-03-01' },
]

const typeDefs = gql`
  type Query {
    authors: [Author]
  }

  type Author @key(fields: "id") {
    id: ID!
    name: String!
    birthday: String
  }

  extend type Book @key(fields: "author_id") {
    author_id: ID! @external
    author: Author
  }
`;

const resolvers = {
  Query: {
    authors(parent, args, context, info) {
      return authors
    },
  },
  Author: {
    __resolveReference(reference) {
      return authors.find(author => author.id === reference.id);
    },
  },
  Book: {
    author(book) {
      return authors.find(author => author.id === book.author_id)
    }
  }
}

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }])
});

server.listen(4001).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
