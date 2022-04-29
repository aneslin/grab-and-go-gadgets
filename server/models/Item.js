const { Schema, model } = require('mongoose');

const itemSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    description: {
      type: String
    },
    dueDate: {
      type: String
    },
    itemStatus: {
      type: String,
      default: 'AVAILABLE'
    }
  }
);

const Item = model('Item', itemSchema);

module.exports = Item;