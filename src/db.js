const { Sequelize } = require('sequelize');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // Path to the SQLite database file
});

// Export the Sequelize instance
module.exports = sequelize;
