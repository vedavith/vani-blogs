module.exports = {
    HOST: "localhost",
    USER: "blog_user",
    PASSWORD: "Veda@1996",
    DB: "blogs",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };