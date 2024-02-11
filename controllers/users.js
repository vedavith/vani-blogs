const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const jwtSecret = 'e1f6eafbc26cff860b1e563a9ecd50bec02dc09fb3263c2947872f908fa6965e';
const jwtOptions = { expiresIn: '1h' };

const db = require('../models');

const users = db.users;
const authData = db.auth;

exports.userLogin = async (req, res) => {
    res.contentType('json');
    let loginUser;
    try {
        // Verify User
        if (req.body.username === '' || req.body.password === '') {
            throw new Error("Authentication Failed");
        }

        loginUser = {email: req.body.username};
        const user = await users.findOne({
            where: loginUser
        });

        // Find user
        if (user == null || typeof user == 'undefined') {
            throw new Error("User NotFound");
        }

        // Validate user
        let isValid = bcrypt.compareSync(req.body.password, user.password);
        if (!isValid) {
            throw new Error("Validation Failed");
        }

        // Generate JWT Token and update the token on each login
        let userDetails = {id: user.id, email: user.email, name: user.first_name + " " + user.last_name};
        let token = jwt.sign(userDetails, jwtSecret, jwtOptions);

        if (!token) {
            throw new Error("Access token not generation Failed");
        }

        let userAuth = authData.update({token: token}, {
            where: {
                userId: user.id
            }
        });

        if (!userAuth) {
            throw new Error("Access token not generation Failed - 2");
        }

        res.setHeader('authorization', token);
        res.send({user: userDetails});

    } catch (Error) {
        res.send({Message: Error.message});
    }
};

exports.userRegistration = async (req, res) => {
    res.contentType('json');
    let auth;
    try {
        // user data validations
        var userData = req.body;

        if (userData.email === '' || typeof userData.email == 'undefined') {
            throw new Error("Email is required");
        }

        if (userData.password === '' || typeof userData.password == 'undefined') {
            throw new Error("Password is required");
        }

        // Encrypt Password
        userData.password = bcrypt.hashSync(userData.password, 10);

        // Create user insert to userAuth
        const user = await users.create(userData);

        if (user) {
            let userAuth = {
                userId: user.id,
            }
            auth = await authData.create(userAuth);
            if (!auth) {
                throw new Error("Insert Failed");
            }
            res.send({message: "User created"});
        }
    } catch (Error) {
        res.send({message: Error.message});
    }
}

exports.verifyUserToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!this.isValidJwt(authHeader)) {
            throw new Error("JWT verification failed");
        }
        next();
    } catch (Error) {
        res.status(401).send({ message: Error.message });
    }
};

exports.isValidJwt = (authHeader) => {

    let token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return false;
    }

    let isValidToken = jwt.verify(token, jwtSecret);
    if (!isValidToken) {
        return false;
    }

    if (((isValidToken.exp - isValidToken.iss) > 0)) {
        return false;
    }
    return true;
}