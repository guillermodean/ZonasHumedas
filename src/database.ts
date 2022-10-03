import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/ZHumedas", {
    useCreateIndex: true,
  })
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.error(err));


