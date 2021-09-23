const { MongoClient } = require('mongodb');

require('dotenv').config();

(async () => {
  console.log('Start');
  const mongoClient = new MongoClient(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  const databaseName   = 'my-database';
  const collectionName = 'my-collection';
  
  try {
    // Connect
    await mongoClient.connect();
    
    // List All Databases
    const adminDb = mongoClient.db().admin();
    const databases = await adminDb.listDatabases();
    console.log('Databases :', databases);
    
    // Use This Database
    const db = mongoClient.db(databaseName);
    
    // List All Collections In The Database
    const collections = await db.listCollections().toArray();
    console.log('Collections :', collections);
    
    // Use This Collection
    const collection = db.collection(collectionName);  // Like Table
    
    // Delete Documents (Like Row)
    const deleteResult = await collection.deleteMany({});
    console.log('Deleted Documents :', deleteResult);
    
    // Insert Documents
    const insertResult = await collection.insertMany([{ name: 'User 1' }, { name: 'User 2' }, { name: 'User 3' }]);
    console.log('Inserted Documents :', insertResult);
    
    // Find Documents
    const findResult = await collection.find({}).toArray();
    console.log('Found Documents :', findResult);
  }
  catch(error) {
    console.error('Error :');
    console.error(error);
    console.error('Error -----');
  }
  finally {
    mongoClient.close();
    console.log('Finished');
  }
})();
