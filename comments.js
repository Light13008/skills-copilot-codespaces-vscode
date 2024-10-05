//create a web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const commentsPath = path.join(__dirname, 'comments.json');
const comments = require(commentsPath);
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/comments', (req, res) => {
    res.json(comments);
    }
);

app.post('/comments', (req, res) => {
    const newComment = req.body;
    comments.push(newComment);
    fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
        if (err) {
            res.status(500).send('Error saving comment');
        } else {
            res.status(201).send('Comment saved');
        }
    });
}
);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
}
);
