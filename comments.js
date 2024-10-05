// Create web server 

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Create web server
const app = express();
const port = 3000;

// Use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Get comments
app.get('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.send(data);
        }
    });
});

// Post comments
app.post('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            const comments = JSON.parse(data);
            comments.push(req.body);
            fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
                if (err) {
                    res.status(500).send('Internal Server Error');
                } else {
                    res.send('Success');
                }
            });
        }
    });
});

// Start web server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
// In this snippet, we have created a web server using Express. We have added two routes: GET /comments and POST /comments. The GET route reads comments from a file called comments.json and sends them as a response. The POST route reads comments from the file, adds the new comment from the request body, and writes the updated comments back to the file.

// This is a simple example of how to create a web server that handles comments. You can extend this example to add more features like editing comments, deleting comments, etc. You can also add authentication and authorization to secure the comments API.



