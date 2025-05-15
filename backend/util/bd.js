import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    process.exit(1);
  }

  if (isConnected) return;

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log(" Base de donnée MongoDB connectée");
  } catch (err) {
    console.error(" Erreur de connexion à MongoDB:", err.message);
    process.exit(1);
  }
};
