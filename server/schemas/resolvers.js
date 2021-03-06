const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
const { Item, User } = require("../models");
const resolvers = {
  Query: {
    //find all users - context.user is required for security
    users: async (parent, args, context) => {
      console.log(context.user);
      if (context.user.userType === "ADMIN") {
        userData = await User.find().populate("reservedItems");
        return userData;
      }
      console.log(
        `${context.user.name} does not have permission to see all users`
      );
      return;
    },
    //get currently logged in user
    me: async (parent, args, context) => {
      if (context.user) {
        console.log("calling me");
        const userData = await User.findOne({ _id: context.user._id }).populate(
          "reservedItems"
        );
        return userData;
      }
      throw new AuthenticationError("not logged in");
    },
    //get one user
    user: async (parent, { username }, context) => {
      console.log(username);
      if (context.user.userType === "ADMIN") {
        return User.findOne({ username }).populate("reservedItems");
      }
      console.log("no access");
      return;
    },
    //get all items
    items: async () => {
      const items = await Item.find();
      return items;
    },
    //get one item by id
    item: async (parent, { _id }) => {
      return Item.findOne({ _id });
    },
  },

  Mutation: {
    alterUser: async (parent, { username, userType }) => {
      
        const updatedUser = await User.findOneAndUpdate(
          { username: username },
          { userType: userType },
          { new: true }
        );
        return updatedUser;
    
      
    },

    cleanUser: async (parent, { username }) => {
      const updatedUser = await User.findOneAndUpdate(
        { username: username },
        { $unset: { reservedItems: "" } },
        { new: true }
      );
    },

    //create a new user
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { user, token };
    },
    //log in to user account
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("invalid user");
      }
      //requires a iscorrectPassword function from models
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("invalid user");
      }
      const token = signToken(user);
      console.log(user);
      return { user, token };
    },
    //create a new item
    createItem: async (parent, { name, image, description }, context) => {
      console.log(context.user);

      return (item = Item.create({
        name: name,
        image: image,
        description: description,
      }));
    },
  //Delete a new item
  deleteItem: async (parent, { itemId }) => {
    const item = await Item.findOneAndDelete({ _id: itemId });
    return item;
  },
    
    //set and item due, date, change status and add to item array FOR SELF
    reserveItem: async (parent, { itemId, itemStatus, dueDate }, context) => {
      if (context.user) {
        item = await Item.findOneAndUpdate(
          { _id: itemId },
          { itemStatus: "RESERVED", dueDate: dueDate },
          { new: true }
        );
        console.log(item);
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { reservedItems: item._id } }
        );

        return item;
      }
      throw new AuthenticationError("you need to be logged in");
    },
    //set and item due, date, change status and add to item array FOR OTHER
    reserveOtherItem: async (
      parent,
      { itemId, userId, itemStatus, dueDate },
      context
    ) => {
      if (context.user.userType === "ADMIN") {
        const item = await Item.findOneAndUpdate(
          { _id: itemId },
          { itemStatus: itemStatus, dueDate: dueDate },
          { new: true }
        );
        console.log(item);
        return User.findByIdAndUpdate(
          { _id: userId },
          { $addToSet: { reservedItems: item._id } },
          { new: true }
        ).populate("reservedItems");
      }
      throw new AuthenticationError("you need to be logged in");
    },
    returnItem: async (parent, { username, itemId }, context) => {
      if (context.user.userType === "ADMIN") {
        const item = await Item.findOneAndUpdate(
          { _id: itemId },
          { itemStatus: "AVAILABLE", dueDate: null }
        );
        return User.findOneAndUpdate(
          { username: username },
          { $pull: { reservedItems: item._id } },
          { new: true }
        ).populate("reservedItems");
      }
    },
  },
};
module.exports = resolvers;
