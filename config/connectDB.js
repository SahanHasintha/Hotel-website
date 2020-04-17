const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://sahanhasintha:sahan@cluster0-rkwqf.mongodb.net/test?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify:false
        });
        console.log('Database connect');
    } catch (err) {
        console.log(err.messsage);
        process.exit(1)
    }
}

module.exports = connect