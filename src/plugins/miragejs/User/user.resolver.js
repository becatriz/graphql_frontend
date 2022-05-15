const userResolver = {
  resolvers: {
    Mutation: {
      registerUser: (_obj, { data }, context) => {
        return context.mirageSchema.users.create(data);
      }
    }
  }
};

export { userResolver };
