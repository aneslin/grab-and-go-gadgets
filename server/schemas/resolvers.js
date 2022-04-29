const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
const { Items, User} = require('../models')
const resolvers = {
  Query: {
    //find all users - context.user is required for security
    users: async (parent, args, context) => {
      console.log(context.user)
      if (context.user.userType === "ADMIN") {
        userData = await User.find().populate("Item", [
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
        const userData = await User.findOne({ _id: context.user._id }).populate(
          "Item",
          ["_id", "name", "description", "dueDate"]
        );
        return userData;
      }
      throw new AuthenticationError("not logged in");
    },

    user: async (parent, { username }, context) => {
      console.log(username)
     if (context.user.userType === "ADMIN"){
       
      return User.findOne({ username }).populate("Item");
     }
     console.log("no access")
     return
    },

    items: async () => {
     const items = await Items.find()
     return items
    },

    item: async(parent, { _id }) => {
        return Items.findOne({ _id})
    }
  },

  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return {user, token};
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("invalid user"); }
        //requires a iscorrectPassword function from models
        const correctPw = await user.isCorrectPassword(password);
     
        if (!correctPw) {
          throw new AuthenticationError("invalid user");
        }
        const token = signToken(user);
        console.log(user)
        return { user, token };
      },

      createItem: async ( parent, args, context) => {
        if (context.user.userType==='ADMIN'){
          console.log(args)
          const item = await Items.create(args)
          return {item}

        }
        throw new AuthenticationError("invalid permissions")
      }
    },

    

  }
;

module.exports = resolvers