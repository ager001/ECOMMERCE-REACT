// Import the mongoose library, which provides tools to connect and interact with MongoDB
import mongoose from 'mongoose';

// Define an asynchronous function called connectDB to handle the database connection
const connectDB = async () => {

    // Set up an event listener on the mongoose connection object
    // This will run when the connection to MongoDB is successfully established
    mongoose.connection.on('connected', () => {
        // Log a friendly message to the console when the database is connected
        // "Tuko ndani bro" is Swahili slang meaning "We're inside" — a fun way to confirm success
        console.log("DB Connected Tuko ndani bro");
    });

    // Attempt to connect to the MongoDB database using the URI from environment variables
    // The URI should look like: mongodb://localhost:27017
    // Appending '/Projects' connects specifically to the 'Projects' database
    await mongoose.connect(`${process.env.MONGODB_URI}/Ecommerce`);
};

// Export the connectDB function so it can be imported and used in other parts of the app
export default connectDB;