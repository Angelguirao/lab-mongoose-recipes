const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
async function playRecipes() {
  try {
    const connection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${connection.connection.name}"`);

    await Recipe.deleteMany();

    const createdRecipe = await Recipe.create({
      title: 'Lemon Tiramisu',
      level: 'Easy Peasy',
      ingredients: ['Ladyfingers', 'lemons', 'mascarpone', 'sugar', 'limoncello'],
      cuisine: 'Italian',
      dishType: 'dessert',
      image: 'https://flouringkitchen.com/wp-content/uploads/2022/08/BW1A5918.jpg',
      duration: 30,
      creator: 'Flouring Kitchen'
    });

    console.log('Recipe created:', createdRecipe.title);

    await Recipe.insertMany(data);

    data.forEach((recipe) => {
      console.log('Recipe inserted:', recipe.title);
    });

    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true }
    );

    console.log('Recipe updated:', updatedRecipe.title);

    await Recipe.deleteOne({ title: 'Carrot Cake' });

    console.log('Recipe removed: Carrot Cake');

    await mongoose.connection.close();

    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error:', error);
  }
}

playRecipes();
