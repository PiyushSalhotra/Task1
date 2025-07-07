const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Temporary server-side storage
let submissions = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET route for form
app.get('/', (req, res) => {
    res.render('index');
});

// POST route for form submission
app.post('/submit', (req, res) => {
    const { name, email, age } = req.body;

    // Server-side validation
    if (!name || !email || !age) {
        return res.render('result', { message: '❌ Error: All fields are required.' });
    }

    if (!email.includes('@') || !email.includes('.')) {
        return res.render('result', { message: '❌ Error: Invalid email format.' });
    }

    if (parseInt(age) < 18) {
        return res.render('result', { message: '❌ Error: Age must be at least 18.' });
    }

    // If validation passed, store data
    submissions.push({ name, email, age });

    res.render('result', { message: `✅ Success! Thank you, ${name}. Total submissions: ${submissions.length}` });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
