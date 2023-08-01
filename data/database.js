import mongoose from "mongoose";

export const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "backendapi"
    })
    .then(() => {
      console.log("Database Connected");
    })
    .catch(err => {
      console.error(err);
    });
};
