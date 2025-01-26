// Import Express
require('dotenv').config
const express = require('express');

const app = express();
const PORT = 3001;

const mongoose = require('mongoose');
const uri = process.env.MONGO_KEY;
const clientOptions = { 
    serverApi: { version: '1', strict: true, deprecationErrors: true }
};
const Recipe = require('../models/Recipe');
// Initialize an Express application
mongoose.connect(uri, clientOptions).then(() => {
    console.log("Connected to MongoDB");
    

    // Define a basic route (GET request to '/')
    app.get('/', (req, res) => {
        res.send('Hello, World!'); // Respond with 'Hello, World!'
    });

    app.post('/create', async (req, res) => {
        try {
            console.log(req.body);
            const {name, url, review, tags} = req.body;
            // Create a new message
            const newRecipe = new Recipe({ name, url, review, tags });
    
            // Save the message to the database
            await newRecipe.save();
            console.log(newRecipe);
            // Respond with the created message
            response.status(201).json({message: "New recipe created"} );
        } catch (error) {
            console.error('Error creating recipe', error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.post('/edit', async (req, res) => {
        try {
            const id = req.params.id
            const updatedname = req.params.name;
            const updatedUrl = req.body.url; 
            const updatedReview = req.body.review;
            const updatedTags = req.body.tags;
            
            // Update the message in the database
            const result = await Recipe.findByIdAndUpdate(messageId, { name: updatedname, url: updatedUrl, review:updatedReview, tags:updatedTags }, { new: true });
            
            // Check if the message was updated successfully
            if (!result) {
                return res.status(404).json({ error: 'Recipe not found' });
            }
            
            //send message
            res.status(200).json({ message: 'Recipe updated successfully' });
    
        } catch (error) {
    
            console.error('Error updating recipe:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    // Start the server
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});