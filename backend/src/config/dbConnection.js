const mongoose = require("mongoose")

const dbConnect = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Database connected succeessfully: ${connect.connection.host}, ${connect.connection.name}`)
    }
    catch(error){
        console.error('Error conecting MongoDB', error)
        process.exit(1)
    };
}

module.exports = dbConnect;