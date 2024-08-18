const db = require("../models");
const {Sequelize} = require("sequelize");
const blogs = db.blog;
const users = db.users;
const fileUploads = db.fileUpload;

// Create new blog
exports.createBlog = async (req, res) => {
    res.contentType('json');
    try {
        const blogData = req.body;

        if (blogData.title === '' || typeof blogData.title == 'undefined') {
            throw new Error("Title is required");
        }

        if (blogData.content === '' || typeof blogData.content == 'undefined') {
            throw new Error('Blog Content is Required');
        }
        // todo: upload to S3 bucket

        // Create blog
        blogData.userId = req.session.user.id;
        const blogsData = await blogs.create(blogData);
        if (!blogsData) {
            throw new Error('Error occured, Cannot create Blog');
        }

        res.status(200).send({message: "Blog Created."});
    } catch (Error) {
        res.status(400).send({error: Error.message});
    }
}

// Update blog
exports.updateBlog = async (req, res) => {
    res.contentType('json');
    try {
        let blogId = req.params.id;
        const blogData = req.body;

        if (blogId === '' || typeof blogId == 'undefined') {
            throw new Error("Invalid Blog ID");
        }

        if (blogData.title === '' || typeof blogData.title == 'undefined') {
            throw new Error("Title is required");
        }

        if (blogData.content === '' || typeof blogData.content == 'undefined') {
            throw new Error('Blog Content is Required');
        }

        // Update blog
        const updateBlog = await blogs.update(blogData,{ where: { id: blogId }});

        if (!updateBlog) {
            throw new Error("Could not update blog");
        }

        res.send("Blog Updated");

    } catch (Error) {
        res.status(204).send({message: Error.message});
    }
}

// Delete Blog
exports.deleteBlog = async (req, res) => {
    res.contentType('json');
    try {
        let blogId = req.params.id;
        if (blogId === '' || typeof blogId == 'undefined') {
            throw new Error("Invalid Blog ID");
        }

        // delete blog
        const deleteBlog = await blogs.destroy({ where: { id: blogId }});
        if (!deleteBlog) {
            throw new Error("Could not delete blog")
        }

        res.status(200).send({message: "Blog Deleted"});

    } catch (Error) {
        res.send({message: Error.message});
    }
}

// Get All Blogs
exports.getBlogs = async (req, res) => {
    res.contentType('json');
    try {
        // Get all blogs
        const allBlogs = await blogs.findAll({
            include: [
                {
                    model: fileUploads,
                    //as: 'fileUpload',
                    attributes: [
                        ['id', 'fileId'],
                        ['fileLocation', 'fileLocation']
                    ],
                    where: {isDeleted: false},
                    required: false,
                },
                {
                    model: users,
                    //as: 'user',
                    attributes: [
                       // ['id', 'userId'],
                        'email',
                        [Sequelize.fn('CONCAT',  Sequelize.col('first_name'), ' ', Sequelize.col('last_name')), 'name']
                    ],
                    required: false,
                }
            ]
        });
        if (!allBlogs) {
            throw new Error("No Blogs Found");
        }
        console.log("This is from blogs", req.session);
        // Return All Blogs
        res.status(200).send({blogs: allBlogs});
    } catch (Error) {
        res.send({message: Error.message});
    }
}

//Get Blogs on ID
exports.getBlogOnId = async (req, res) => {
    res.contentType('json');

    try {
        const blogId = req.params.id;
        // Query blog on ID
        const blogData = await blogs.findOne({
            where: {
                id: blogId
            },
            include: [
                {
                    model: fileUploads,
                    attributes: [
                        ['id', 'fileId'],
                        ['fileLocation', 'fileLocation']
                    ],
                    where: {isDeleted: false},
                    required: false,
                },
                {
                    model: users,
                    attributes: [
                        ['id', 'userId'],
                        'email',
                        [Sequelize.fn('CONCAT',  Sequelize.col('first_name'), ' ', Sequelize.col('last_name')), 'name']
                    ],
                    required: false,
                }
            ]
        })
        if (!blogData) {
            throw new Error("No Blogs Found");
        }

        res.status(200).send({blog: blogData});
    } catch (Error) {
        res.send({message: Error.message});
    }
}

// Get all Blogs on the user ID
exports.getAllBlogsOnUserId = async (req, res) => {
    res.contentType('json');
    try {
        const userId = req.params.userId;
        // Query blog on ID
        const blogData = await blogs.findAll({
            where: {
                userId: userId
            },
            include: [
                {
                    model: fileUploads,
                    attributes: [
                        ['id', 'fileId'],
                        ['fileLocation', 'fileLocation']
                    ],
                   // where: {isDeleted: false},
                    required: false,
                },
                {
                    model: users,
                    attributes: [
                        ['id', 'userId'],
                        'email',
                        [Sequelize.fn('CONCAT',  Sequelize.col('first_name'), ' ', Sequelize.col('last_name')), 'name']
                    ],
                    required: false,
                }
            ]
        })
        if (!blogData) {
            throw new Error("No Blogs Found");
        }

        res.status(200).send({blog: blogData});
    } catch (Error) {
        res.send({message: Error.message});
    }
}