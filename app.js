const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// In-memory to store data
let notes = [];
let nextId = 1;

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.stack });
};

// Create a new note
app.post('/notes', (req, res) => {
    try {
        const { title, content, tags } = req.body;
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }
        const newNote = { id: nextId++, title, content, tags: tags || [] };
        notes.push(newNote);
        res.status(201).json(newNote);
    } catch (err) {
        next(err);
    }
});

// Retrieve all notes
app.get('/notes', (req, res, next) => {
    try {
        res.json(notes);
    } catch (err) {
        next(err);
    }
});


// Retrieve a single note by its ID
app.get('/notes/:id', (req, res, next) => {
    try {
        const note = notes.find(n => n.id === parseInt(req.params.id));
        if (note) {
            res.json(note);
        } else {
            res.status(404).json({ error: 'Note not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Update a note by its ID
app.put('/notes/:id', (req, res, next) => {
    try {
        const note = notes.find(n => n.id === parseInt(req.params.id));
        if (note) {
            const { title, content, tags } = req.body;
            note.title = title || note.title;
            note.content = content || note.content;
            note.tags = tags || note.tags;
            res.json(note);
        } else {
            res.status(404).json({ error: 'Note not found' });
        }
    } catch (err) {
        next(err);
    }
});


// Delete a note by its ID
app.delete('/notes/:id', (req, res, next) => {
    try {
        const noteIndex = notes.findIndex(n => n.id === parseInt(req.params.id));
        if (noteIndex !== -1) {
            notes.splice(noteIndex, 1);
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Note not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Add tags to a note
app.put('/notes/:id/tags', (req, res, next) => {
    try {
        const note = notes.find(n => n.id === parseInt(req.params.id));
        if (note) {
            const { tags } = req.body;
            if (!tags || !Array.isArray(tags)) {
                return res.status(400).json({ error: 'Tags should be an array of strings' });
            }
            note.tags = [...new Set([...note.tags, ...tags])];
            res.json(note);
        } else {
            res.status(404).json({ error: 'Note not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Remove tags from a note
app.delete('/notes/:id/tags', (req, res, next) => {
    try {
        const note = notes.find(n => n.id === parseInt(req.params.id));
        if (note) {
            const { tags } = req.body;
            if (!tags || !Array.isArray(tags)) {
                return res.status(400).json({ error: 'Tags should be an array of strings' });
            }
            note.tags = note.tags.filter(tag => !tags.includes(tag));
            res.json(note);
        } else {
            res.status(404).json({ error: 'Note not found' });
        }
    } catch (err) {
        next(err);
    }
});

// Retrieve notes based on a logical tag query
app.get('/notes/query', (req, res, next) => {
    try {
        const { tags, condition } = req.query;
        if (!tags || !condition) {
            return res.status(400).json({ error: 'Tags and condition are required' });
        }

        const queryTags = tags.split(',');
        let filteredNotes = notes;

        if (condition === 'AND') {
            filteredNotes = notes.filter(note => queryTags.every(tag => note.tags.includes(tag)));
        } else if (condition === 'OR') {
            filteredNotes = notes.filter(note => queryTags.some(tag => note.tags.includes(tag)));
        } else if (condition === 'NOT') {
            filteredNotes = notes.filter(note => queryTags.every(tag => !note.tags.includes(tag)));
        } else {
            return res.status(400).json({ error: 'Invalid condition' });
        }

        res.json(filteredNotes);
    } catch (err) {
        next(err);
    }
});

// error handling middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
