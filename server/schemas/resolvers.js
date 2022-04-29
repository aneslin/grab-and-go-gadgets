const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
const { Items, Users} = require('../models')
const resolvers = {
  Query: {
    //find all users - context.user is required for security
    users: async (parent, args, context) => {
      if (context.user.userType === "Admin") {
        userData = await Users.find().populate("Item", [
          "_id",
          "name",
          "description",
          "dueDate",
        ]);
        return userData;
      }
      console.log(
        `${context.user.name} does not have permission to see all users`
      );
      return;
    },

    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await Users.findOne({ _id: context.user._id }).populate(
          "Item",
          ["_id", "name", "description", "dueDate"]
        );
        return userData;
      }
      throw new AuthenticationError("not logged in");
    },

    user: async (parent, { username }, context) => {
      if (context.user.userType === "Admin") {
        userData = await Users.findOne({ username }).populate("Item", [
          "_id",
          "name",
          "description",
          "dueDate",
        ]);
      }
      console.log(
        `${context.user.name} does not have permission to see all users`
      );
      return;
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      const user = await Users.create(args);
      const token = signToken(user);
      return {user, token};
    },

    login: async (parent, { email, password }) => {
      const user = await Users.findOne({ email });
      if (!user) {
        throw new AuthenticationError("invalid user"); }
        //requires a iscorrectPassword function from models
        const correctPw = await user.isCorrectPassword(password);
     
        if (!correctPw) {
          throw new AuthenticationError("invalid user");
        }
        const token = signToken(user);
        return { user, token };
      }
    },

    

  }
;

module.exports = resolvers