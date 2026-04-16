const prisma = require("../../prisma/client");

const userResolver = {
  Query: {
    users: async () => {
      return await prisma.users.findMany();
    },

    user: async (_, { id }) => {
      return await prisma.users.findUnique({
        where: { id }
      });
    }
  }
};

module.exports = userResolver;