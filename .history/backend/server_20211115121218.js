const app = require('./app');

const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const connectDatabase = require('./config/database');

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shuting down the server due to Uncaught Exception`);
    
    server.close(() => {
        process.exit(1);
    });
});

//Config

dotenv.config({path:"backend/config/config.env"})

//Connecting to database

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
});

const server = app.listen(process.env.PORT, () =>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})


// Unhandled Promise Rejection
process.on("unhandledRejection",(err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shuting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});