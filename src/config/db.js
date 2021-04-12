const mongoose = require("mongoose");

const conexionDB = async () => {
  try {
    await mongoose.connect("mongodb://database/crmbackend", {
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("DB conectada");
  } catch (e) {
    console.log("hubo un error");
    console.log(e);
    process.exit(1);
  }
};

module.exports = conexionDB;
