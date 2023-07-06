const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"

mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: 'Lemon Tiramisu',
      level: 'Easy Peasy',
      ingredients: ['Ladyfingers', 'lemons', 'mascarpone', 'sugar', 'limoncello'],
      cuisine: 'Italian',
      dishType: 'dessert',
      image: 'https://flouringkitchen.com/wp-content/uploads/2022/08/BW1A5918.jpg',
      duration: 30,
      creator: 'Flouring Kitchen'      
    })
  })

  .then((createdRecipe) => {
    console.log('Recipe created:', createdRecipe.title);
  })
  
  .then(() => {
    // Inserting multiple recipes using insertMany
    return Recipe.insertMany(data);
  })

  .then((dataRecipes) => {
    dataRecipes.forEach((recipe) => {
      console.log('Recipe inserted:', recipe.title);
    });
  })

  .then(() => {
    // Update the duration of the "Rigatoni alla Genovese" recipe
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true }
    );
  })

  .then((updatedRecipe) => {
    console.log('Recipe updated:', updatedRecipe.title);
  })

  .then(() => {
    // Remove the "Carrot Cake" recipe from the database
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  
  .then((deletedRecipe) => {
    console.log('Recipe removed:', 'Carrot Cake');
  })

  .then(() => {
    // Close the database connection
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('Database connection closed.');
  })
  
  .catch(error => {
    console.error('Error:', error);
  });
