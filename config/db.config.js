module.exports = {
    HOST: "db-vani-blogs.cejetezsp1f9.us-west-2.rds.amazonaws.com",
    USER: "admin",
    PASSWORD: "garPa6-burzyq-wowcir",
    DB: "blogs",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };