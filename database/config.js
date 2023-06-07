 const mongoose = require('mongoose');

 const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_ATLAS_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        })
        console.log('DB online');
    } catch (error) {
        console.log(error)
        throw new Error('No esta conectao a la base de datos');
    }
 }

 module.exports = {
    dbConnection
 }