import { MongoClient } from "mongodb";

import dotenv from "dotenv";
dotenv.config();

const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_USER = process.env.DB_USER;
const DB_ADDRESS = process.env.DB_ADDRESS;

const connectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_ADDRESS}`;
let client; // Define client in the global scope

async function connectToMongoDB() {
  client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db("foodBasket"); // Return the database instance
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

//Update and Delete documents

async function updateDocument(db) {
  const cannedanddrycollection = db.collection("cannedanddrydepartments");
  const bakerycollection = db.collection("bakerydepartments");
  const refrigeratedfoodsections = db.collection("refrigeratedfoodsections");
  const producedepartmens = db.collection("producedepartments");
  const meatdepartments = db.collection("meatdepartments");
  const frozenfooddepartment = db.collection("frozenfooddepartments");

  //CANNED AND DRY DEPARTMENT
  try {
    const wholeGrain = await cannedanddrycollection.updateMany(
      { title: "Quick 100% Whole Grain Oats" },
      { $set: { title: "Whole Grain Oats" } }
    );
    const vegetableOil = await cannedanddrycollection.updateMany(
      { title: "100% Pure Vegetable Oil" },
      { $set: { title: "Vegetable Oil" } }
    );

    const crackers = await cannedanddrycollection.updateMany(
      { title: {
          $in: [
          "Toppables Crackers",
          "Toppables Crackers, Eat on its own or topped, Buttery tasting, flaky, melt in your mouth crackers",
          ],
        } 
      },
      { $set: { title: "Crackers" } }
    );

    const salmon = await cannedanddrycollection.updateMany(
      { title: "Sustainably Sourced Wild Pacific Pink Salmon" },
      { $set: { title: "Salmon (canned)" } }
    );

    const granola = await cannedanddrycollection.updateMany(
      { title: "Harvest Crunch Original Granola Cereal" },
      { $set: { title: "Granola" } }
    );

    const peachSlices = await cannedanddrycollection.updateMany(
      { title: "Clingstone Peach Slices in Juice from Concentrate" },
      { $set: { title: "Peach Slices" } }
    );

    const appleJuice = await cannedanddrycollection.updateMany(
      { title: "Apple Juice from Concentrate" },
      { $set: { title: "Apple Juice" } }
    );

    const tomatoCocktail = await cannedanddrycollection.updateMany(
      { title: "Original Tomato Clam Cocktail" },
      { $set: { title: "Tomato Cocktail" } }
    );
    
    const peanuts = await cannedanddrycollection.updateMany(
      { title: "Salted Blanched Peanuts Club Size" },
      { $set: { title: "Peanuts" } }
    );
    
    const peanutButter = await cannedanddrycollection.updateMany(
      { title: "Smooth Peanut Butter, Club Size" },
      { $set: { title: "Peanut Butter" } }
    );

    const spaghetti = await cannedanddrycollection.updateMany(
      { title: "Spaghetti Pasta" },
      { $set: { title: "Spaghetti" } }
    );

    const raisins = await cannedanddrycollection.updateMany(
      { title: "Sultana Raisins" },
      { $set: { title: "Raisins" } }
    );

    // const query = { title: "Toppables Crackers" };
    // const result = await cannedanddrycollection.deleteMany(query);

    if (`${wholeGrain.matchedCount}` > 0) {
      console.log(`Matched ${wholeGrain.matchedCount} document(s) from CANNED AND DRY collection
      and modified ${wholeGrain.modifiedCount} document(s)`);
    } else if (`${vegetableOil.matchedCount}` > 0) {
      console.log(`Matched ${vegetableOil.matchedCount} document(s) from CANNED AND DRY collection
      and modified ${vegetableOil.modifiedCount} document(s)`);
    } else if (`${crackers.matchedCount}` > 0) {
      console.log(`Matched ${crackers.matchedCount} document(s) from CANNED AND DRY collection
        and modified ${crackers.modifiedCount} document(s)`);
    } else if (`${salmon.matchedCount}` > 0) {
      console.log(`Matched ${salmon.matchedCount} document(s) from CANNED AND DRY collection
      and modified ${salmon.modifiedCount} document(s)`);
    } else if (`${granola.matchedCount}` > 0) {
      console.log(`Matched ${granola.matchedCount} document(s) from CANNED AND DRY collection
        and modified ${granola.modifiedCount} document(s)`);
    } else if (`${peachSlices.matchedCount}` > 0) {
      console.log(`Matched ${peachSlices.matchedCount} document(s) from CANNED AND DRY collection
        and modified ${peachSlices.modifiedCount} document(s)`);
    } else if (`${appleJuice.matchedCount}` > 0) {
      console.log(`Matched ${appleJuice.matchedCount} document(s) from CANNED AND DRY collection
        and modified ${appleJuice.modifiedCount} document(s)`);    
    } else if (`${tomatoCocktail.matchedCount}` > 0) {
      console.log(`Matched ${tomatoCocktail.matchedCount} document(s) from CANNED AND DRY collection
        and modified ${tomatoCocktail.modifiedCount} document(s)`);   
    } else if (`${peanuts.matchedCount}` > 0) {
      console.log(`Matched ${peanuts.matchedCount} document(s) from CANNED AND DRY collection
        and modified ${peanuts.modifiedCount} document(s)`);   
    } else if (`${peanutButter.matchedCount}` > 0) {
      console.log(`Matched ${peanutButter.matchedCount} document(s) from CANNED AND DRY collection
        and modified ${peanutButter.modifiedCount} document(s)`);   
    } else if (`${spaghetti.matchedCount}` > 0) {
      console.log(`Matched ${spaghetti.matchedCount} document(s) from CANNED AND DRY collection
        and modified ${spaghetti.modifiedCount} document(s)`);   
    } else if (`${raisins.matchedCount}` > 0) {
      console.log(`Matched ${raisins.matchedCount} document(s) from CANNED AND DRY collection
        and modified ${raisins.modifiedCount} document(s)`);   
    } else {
      console.log("No documents from Canned and Dry department were updated");
    }
  } catch (error) {
    console.error("Error updating document:", error);
  }

  // BAKERY FOOD SECTION
  try {
    const bread = await bakerycollection.updateMany(
      { title: "100% Whole Wheat Bread" },
      { $set: { title: "Whole Wheat Bread" } }
    );

    const tortillas = await bakerycollection.updateMany(
      { title: {
          $in: [
          "Wrap Me White Flour Tortillas Large",
          "Wrap Me White Flour Tortillas Large ",
          "White Large Wraps 10pk",
          ],
        } 
      },
      { $set: { title: "Tortillas" } }
    );

    if (`${bread.matchedCount}` > 0) {
      console.log(`Matched ${bread.matchedCount} document(s) from BAKERY collection
      and modified ${bread.modifiedCount} document(s)`);
    } else if (`${tortillas.matchedCount}` > 0) {
      console.log(`Matched ${tortillas.matchedCount} document(s) from BAKERY collection
      and modified ${tortillas.modifiedCount} document(s)`);
    } else {
      console.log("No documents from Bakery were updated.");
    }
  } catch (error) {
    console.error("Error updating document:", error);
  }

  //REGRIGERATED FOOD SECTION
  try {
    const yogurt = await refrigeratedfoodsections.updateMany(
      {
        title: {
          $in: [
            "Vanilla, Blueberry, Strawberry & Raspberry 0% M.F. Stirred Yogurt",
            "Vanilla, Blueberry, Strawberry e Raspberry Yogurt",
          ],
        },
      },
      { $set: { title: "Yogurt" } }
    );

    const mozzarellaCheese = await refrigeratedfoodsections.updateMany(
      { title: "Pizza Mozzarella Cheese with 28% M.F." },
      { $set: { title: "Mozzarella Cheese" } }
    );

    const eggs = await refrigeratedfoodsections.updateMany(
      { title: { $in: ["Large Grade A Eggs", "Free Range Large Brown Eggs"] } },
      { $set: { title: "Eggs" } }
    );

    const margarine = await refrigeratedfoodsections.updateMany(
      { title: "Non-Hydrogenated Margarine" },
      { $set: { title: "Margarine" } }
    );

    const cheddarCheese = await refrigeratedfoodsections.updateMany(
      {
        title: {
          $in: [
            "Non-Hydrogenated Cheddar Flavour Processed Cheese Product Slices",
            "Medium Cheddar Cheese Slices",
            "Cheddar Flavour Processed Cheese Product Slices",
          ],
        },
      },
      { $set: { title: "Cheddar Cheese" } }
    );

    if (`${yogurt.matchedCount}` > 0) {
      console.log(`Matched ${yogurt.matchedCount} document(s) from REFRIGERATED collection
     and modified ${yogurt.modifiedCount} document(s)`);
    } else if (`${mozzarellaCheese.matchedCount}` > 0) {
      console.log(`Matched ${mozzarellaCheese.matchedCount} document(s) from REFRIGERATED collection
    and modified ${mozzarellaCheese.modifiedCount} document(s)`);
    } else if (`${eggs.matchedCount}` > 0) {
      console.log(`Matched ${eggs.matchedCount} document(s) from REFRIGERATED collection
    and modified ${eggs.modifiedCount} document(s)`);
    } else if (`${margarine.matchedCount}` > 0) {
      console.log(`Matched ${margarine.matchedCount} document(s) from REGRIGERATED collection
    and modified ${margarine.modifiedCount} document(s)`);
    } else if (`${cheddarCheese.matchedCount}` > 0) {
      console.log(`Matched ${cheddarCheese.matchedCount} document(s) from REGRIGERATED collection
    and modified ${cheddarCheese.modifiedCount} document(s)`);
    } else {
      console.log("No documents were from Regrigerated department updated");
    }
  } catch (error) {
    console.error("Error updating document:", error);
  }

  //PRODUCE DEPARTMENT
  try {
    const grapes = await producedepartmens.updateMany(
      {
        title: {
          $in: [
            "PC Extra Large Red Seedless Grapes",
            "Extra Large Red Seedless Grapes",
          ],
        },
      },
      { $set: { title: "Grapes" } }
    );

    const apple = await producedepartmens.updateMany(
      { title: { $in: ["Fuji Apples", "Honeycrisp Apples"] } },
      { $set: { title: "Apple" } }
    );

    const orange = await producedepartmens.updateMany(
      { title: { $in: ["Navel Orange", "Navel Orange, Medium"] } },
      { $set: { title: "Orange" } }
    );

    const sweetPotato = await producedepartmens.updateMany(
      { title: { $in: ["Sweet Potatoes", "Sweet Potatoes, 5 lb bag"] } },
      { $set: { title: "Sweet Potato" } }
    );

    const pears = await producedepartmens.updateMany(
      { title: "Yellow Asian Pears" },
      { $set: { title: "Pear" } }
    );

    const cucumber = await producedepartmens.updateMany(
      { title: "Field Cucumbers" },
      { $set: { title: "Cucumbers" } }
    );

    const sweetGreenPeppers = await producedepartmens.updateMany(
      { title: "Sweet Green Peppers" },
      { $set: { title: "Green Peppers, Sweet" } }
    );

    if (`${grapes.matchedCount}` > 0) {
      console.log(`Matched ${grapes.matchedCount} document(s) from PRODUCE collection
     and modified ${grapes.modifiedCount} document(s)`);
    } else if (`${apple.matchedCount}` > 0) {
      console.log(`Matched ${apple.matchedCount} document(s) from PRODUCE collection
     and modified ${apple.modifiedCount} document(s)`);
    } else if (`${orange.matchedCount}` > 0) {
      console.log(`Matched ${orange.matchedCount} document(s) from PRODUCE collection
     and modified ${orange.modifiedCount} document(s)`);
    } else if (`${sweetPotato.matchedCount}` > 0) {
      console.log(`Matched ${sweetPotato.matchedCount} document(s) from PRODUCE collection
     and modified ${sweetPotato.modifiedCount} document(s)`);
    } else if (`${pears.matchedCount}` > 0) {
      console.log(`Matched ${pears.matchedCount} document(s) from PRODUCE collection
     and modified ${pears.modifiedCount} document(s)`);
    } else if (`${cucumber.matchedCount}` > 0) {
      console.log(`Matched ${cucumber.matchedCount} document(s) from PRODUCE collection
     and modified ${cucumber.modifiedCount} document(s)`);
    } else if (`${sweetGreenPeppers.matchedCount}` > 0) {
      console.log(`Matched ${sweetGreenPeppers.matchedCount} document(s) from PRODUCE collection
     and modified ${sweetGreenPeppers.modifiedCount} document(s)`);
    } else {
      console.log("No documents were from Produce department updated");
    }
  } catch (error) {
    console.error("Error updating document:", error);
  }

  // MEAT DEPARTMENT
  try {
    const blackForestHam = await meatdepartments.updateMany(
      { title: "Smoked Black Forest Ham Slices" },
      { $set: { title: "Ham (Black Forest)" } }
    );
    if (`${blackForestHam.matchedCount}` > 0) {
      console.log(`Matched ${blackForestHam.matchedCount} document(s) from PRODUCE collection
     and modified ${blackForestHam.modifiedCount} document(s)`);
    } else {
      console.log("No documents were from Produce department updated");
    }
  } catch (error) {
    console.error("Error updating document:", error);
  }

  // FROZEN FOOD DEPARTMENT
  try {
    const greenBeans = await frozenfooddepartment.updateMany(
      { title: "Cut Green Beans" },
      { $set: { title: "Green Beans" } }
    );

    if (`${greenBeans.matchedCount}` > 0) {
      console.log(`Matched ${greenBeans.matchedCount} document(s) from CANNED AND DRY collection
      and modified ${greenBeans.modifiedCount} document(s)`);
    } else {
      console.log("No documents from Canned and Dry department were updated");
    }
  } catch (error) {
    console.error("Error updating document:", error);
  }
}

async function updateTitles() {
  try {
    const db = await connectToMongoDB();
    await updateDocument(db);
  } finally {
    // Close the MongoDB connection when done
    if (client) {
      await client.close();
    }
  }
}

// main();

export { updateTitles };
