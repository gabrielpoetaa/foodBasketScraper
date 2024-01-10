// yourfile.mjs

import { MongoClient } from 'mongodb';

const connectionString = 'mongodb+srv://gugapoeta:Renatoquerido88!@cluster0.mkxwkvb.mongodb.net/';
let client; // Define client in the global scope

async function connectToMongoDB() {
  client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('foodBasket'); // Return the database instance
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

async function updateDocument(db) {
  const cannedanddrycollection = db.collection('cannedanddrydepartments');
  const bakerycollection = db.collection('bakerydepartments');
  const refrigeratedfoodsections = db.collection('refrigeratedfoodsections')

  try {
    const wholeGrain = await cannedanddrycollection.updateMany(
      { title: "Quick 100% Whole Grain Oats" },
      { $set: { title: "Whole Grain Oats" } }
    );
    const vegetableOil = await cannedanddrycollection.updateMany(
      { title: "100% Pure Vegetable Oil" },
      { $set: { title: "Vegetable Oil" } }
    );
    console.log(`Matched ${wholeGrain.matchedCount} 'Whole Grain' document(s) from CANNED AND DRY collection
    and modified ${wholeGrain.modifiedCount} document(s)`);
    console.log(`Matched ${vegetableOil.matchedCount} 'Vegetable Oil' document(s) from CANNED AND DRY collection
    and modified ${vegetableOil.modifiedCount} document(s)`);
  } catch (error) {
    console.error('Error updating document:', error);
  }
  try {
    const result = await bakerycollection.updateMany(
      { title: "100% Whole Wheat Bread" },
      { $set: { title: "Whole Wheat Bread" } }
    );
    console.log(`Matched ${result.matchedCount} document(s) from BAKERY collection
     and modified ${result.modifiedCount} document(s)`);
  } catch (error) {
    console.error('Error updating document:', error);
  }
  try {
    const refrigeratedFoodsections = await refrigeratedfoodsections.updateMany(
      { title: "Vanilla, Blueberry, Strawberry & Raspberry 0% M.F. Stirred Yogurt" },
      { $set: { title: "Vanilla, Blueberry, Strawberry e Raspberry Yogurt" } }
    );
    console.log(`Matched ${refrigeratedFoodsections.matchedCount} document(s) from REFRIGERATED collection
     and modified ${refrigeratedFoodsections.modifiedCount} document(s)`);
  } catch (error) {
    console.error('Error updating document:', error);
  }
}

async function main() {
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

main();
