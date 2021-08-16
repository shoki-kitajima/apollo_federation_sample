const { ApolloServer, gql } = require('apollo-server');
const { buildSubgraphSchema } = require("@apollo/federation")

const reviews = [
  { id: "1", book_id: "1", score: '4', comment: "かなり面白い" },
  { id: "2", book_id: "2", score: '5', comment: "すごく面白い" },
  { id: "3", book_id: "3", score: '3', comment: "面白い" },
  { id: "4", book_id: "1", score: '5', comment: "すごく面白い"}
];

const typeDefs = gql`
  extend type Query {
    reviews: [Review]
  }

  type Review @key(fields: "book_id") {
    id: ID!
    book_id: ID!
    score: Int!
    comment: String
    book: Book
  }

  extend type Book @key(fields: "id") {
    id: ID! @external
    reviews: [Review]
  }
`;

const resolvers = {
  Query: {
    reviews() {
      return reviews;
    },
  },
  Review: {
    book(review) {
      return { __typename: "Book", id: review.book_id };
    }
  },
  Book: {
    reviews(book) {
      return reviews.filter(review => review.book_id === book.id)
    }
  }
}

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }])
});

server.listen(4003).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
