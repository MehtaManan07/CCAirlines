const fs = require("fs");
const mongoose = require("mongoose");
require("colors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const City = require("../models/CityModel")
const User = require("../models/UserModel")

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
},() => console.log(`db connected`));

// Read json file
const cities = JSON.parse(
  fs.readFileSync(`${__dirname}/cities.json`, "utf-8")
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/users.json`, "utf-8")
);
// import to db
const importData = async () => {
  try {
    await City.create(cities);
    await User.create(users);
    console.log("Data imported".bgGreen);
    process.exit(0)
  } catch (error) {
    console.error("Error:\n", error);
    process.exit(1)
  }
};

// delete from db
const deleteData = async () => {
  try {
    await City.deleteMany();
    await User.deleteMany();
    console.log("Data deleted".bgRed);
    process.exit(0)
  } catch (error) {
    console.error("Error:\n", error);
    process.exit(1)
  }
};

if(process.argv[2] === "-i") {
    importData()
} else if(process.argv[2] === "-d") {
    deleteData()
}