const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://admin:sashita@cluster0-9hjn6.mongodb.net/control-labs?retryWrites=true&w=majority', {
  useCreateIndex: true,
  useNewUrlParser: true, 
    useUnifiedTopology:true
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));
