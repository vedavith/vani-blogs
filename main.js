// Configuratiion
const express = require('express');
var session = require('express-session');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 4000;

// enabling CORS
app.use(cors({credentials: true, origin: true, exposedHeaders: '*'}));

// allowing all traffic
app.options('*', cors({credentials: true, origin: true, exposedHeaders: '*'}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(session({
    secret: 'sessionKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));

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
app.get('user/health', login.health)

// Blogs
app.get('/blogs/all', blogs.getBlogs);
app.get('/blogs/user/:userId/all', blogs.getAllBlogsOnUserId);
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
