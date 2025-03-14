import mongoose, { connections } from "mongoose";



const connection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(connection.connection.host, "mogodb connedted");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connection;
