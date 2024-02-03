// Configuratiion
var express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 4000;

// enabling CORS
app.use(cors());
app.options('*', cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//initilalize sequelize
const db = require("./models");
db.sequelize.sync({alter: true});

// Including Components
var login = require('./controllers/users');
var blogs = require('./controllers/blogs');

/**
 * ROUTES
 */

// User registration and Authentication
app.post('/login/auth', login.userLogin);
app.post('/token/verify', login.verifyUserToken);
app.post('/user/register', login.userRegistration);

// Blogs
app.get('/blogs/all', blogs.getBlogs);
app.get('/blog/:id/get', blogs.getBlogOnId);
app.post('/blog/create', login.verifyUserToken, blogs.createBlog);
app.put('/blog/:id/update', login.verifyUserToken, blogs.updateBlog);
app.delete('blog/:id/delete', login.verifyUserToken, blogs.deleteBlog);

// Start Server
app.listen(port, () => {
    console.log('server started');
});
