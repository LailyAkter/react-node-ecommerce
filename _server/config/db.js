const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongodbURI');

const connectDB = async () => {
  try{
    await mongoose.connect(db,{
      useNewUrlParser: true,
     useCreateIndex: true,
     useUnifiedTopology: true,
     useFindAndModify: false
    });
    console.log('Mongodb Connect');
  }catch(err){
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
