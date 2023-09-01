import petSchema from './schemas/pet.js'; // Import the schema
import {createClient} from '@sanity/client'

// Initialize the Sanity client
const client = createClient({
  projectId: '5ep8duxi',
  dataset: 'production',
  token: 'skAEmk1iHHe8wfk67Z41pqEgL6VEFt7uDjLTOnqMH5cKeVja0yWqrmeEPPrxXCgn6MAhIUcgWVVeI5GmUo2LKTZibg2dJWbduHaMWaxfu1uhNHAqA8OZTFg4BjZWtP5ieSwu7JmyYlBp4oOZ8WLkxSaRSb7AfMYsBMyhmIL0TVOpDipVLks4',
  apiVersion: '2021-10-21', // use a UTC date string

  useCdn: false // Set this to true if you want to use the CDN, false for API
});

// Create an array of 1000 rows (sample data)
const petNames = Array.from({ length: 100 }, (_, index) => ({
  _id: `pet${index + 1}`, // Add _id field for each document
  _type: 'pet', // Use the schema type '_type'
  name: `Pet ${index + 1}`
}));


// Function to insert rows into Sanity using a transaction
async function insertRows() {
  try {
    const txn = client.transaction(); // Initialize a transaction

    petNames.forEach(pet => {
      txn.createIfNotExists(pet); // Add create operations to the transaction
    });

    await txn.commit(); // Commit the transaction
    console.log(`${petNames.length} rows inserted successfully.`);
  } catch (error) {
    console.error('Error inserting rows:', error.message);
  }
}

// Call the insertRows function
insertRows();