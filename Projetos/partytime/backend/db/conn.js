const mongoose = require("mongoose");

async function main() {
  try {
    mongoose.set('strictQuery', true)

    await mongoose.connect(
      "mongodb+srv://nicollyengenheira:31IySnk5JZJLnEeP@partytime-bd.ix20p.mongodb.net/?retryWrites=true&w=majority&appName=partyTime-BD"
    );
  } catch (error) {
    console.log(`Erro: ${error}`);
  }
}

module.exports = main;
