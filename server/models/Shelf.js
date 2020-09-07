const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shelfSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    default: 'https://dwgyu36up6iuz.cloudfront.net/heru80fdn/image/upload/c_fill,d_placeholder_thescene.jpg,fl_progressive,g_face,h_450,q_80,w_800/v1590006383/thenewyorker_the-oddest-terms-used-for-antique-books-explained.jpg'
  },
  books: [{
    type: Schema.Types.ObjectId,
    ref: 'Book',
  }]
});

const Shelf = mongoose.model('Shelf', shelfSchema);

module.exports = Shelf;
