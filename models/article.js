var mongoose = require( 'mongoose' );

mongoose.model('Article', {
  title: String,
  description: String,
  date: Date
});