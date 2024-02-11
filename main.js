// Configuratiion
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 4000;

// enabling CORS
app.use(cors());

// allowing all traffic
app.options('*', cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

//initilalize sequelize
const db = require("./models");
db.sequelize.sync({alter: true});

// Including Components
var login = require('./controllers/users');
var blogs = require('./controllers/blogs');
var fileUploads = require('./controllers/fileUploads');

/**
*
*  ROUTES
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

// File Uploads
app.post('/uploads/create', login.verifyUserToken, fileUploads.uploadFiles);

// Start Server
app.listen(port, () => {
    console.log('server started');
});
