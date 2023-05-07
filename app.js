const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes')
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

// express app
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// register view engine
app.set('view engine', 'ejs');

//connect to mongodb server
const dbURL = 'mongodb+srv://bolaji2020:Nigeria222@cluster0.2qrio.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURL)
    .then(() =>app.listen(3003))
    .then(console.log('app listening on port 3003'))
    .catch(err => console.error(err))


//mongoose and mongo sandbox routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));

app.get('/',  requireAuth, (req, res) => {
  res.redirect('/books');
});

// app.get('/about', (req, res) => {
//   res.render('about', { title: 'About' });
// });

app.use(authRoutes);
//book routes
app.use('/books', bookRoutes);

// routes
// app.get('*', checkUser);
// app.get('/', (req, res) => res.render('home'));
// app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
// app.use(authRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

