import mongoose from 'mongoose';

let isConnected = false;
const uri = "mongodb://localhost:27017/FOOTMEDIA";

export const connectDB = async () => {
    if (isConnected) return{
       uri
    }
    try {
        await mongoose.connect(uri)
        isConnected = true;
        console.log('Base de donnée MongoDB connectée');
    } catch (err) {
        console.log('Erreur de connexion à MongoDB', err.message);
        process.exit(1);
    }
}