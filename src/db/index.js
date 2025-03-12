import mongoose, { connections } from "mongoose";

const connection = async () => {
  try {
    const connection = await mongoose.connect(
      `mongodb://localhost:27017/stock`
    );
    console.log(connection.connection.host, "mogodb connedted");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connection;
