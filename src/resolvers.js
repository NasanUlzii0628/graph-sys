const userResolver = require("./resolvers/userResolver");
const orderResolver = require("./resolvers/orderResolver");

const resolvers = {
  Query: {
    ...userResolver.Query
  },
  Mutation: {
    ...orderResolver.Mutation
  }
};

module.exports = resolvers;