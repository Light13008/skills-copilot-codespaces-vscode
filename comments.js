// create a web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Define the path for comments.json
const commentsPath = path.join(__dirname, 'comments.json');

// Check if comments.json exists, if not create it
if (!fs.existsSync(commentsPath)) {
    fs.writeFileSync(commentsPath, JSON.stringify([])); // Initialize with an empty array
}

let comments = require(commentsPath); // Load the comments

const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Get comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Post a new comment
app.post('/comments', (req, res) => {
    const newComment = req.body;

    // Basic validation (you can expand this as needed)
    if (!newComment || !newComment.text) {
        return res.status(400).send('Comment text is required');
    }

    comments.push(newComment);
    fs.writeFile(commentsPath, JSON.stringify(comments, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Error saving comment');
        } else {
            return res.status(201).send('Comment saved');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
