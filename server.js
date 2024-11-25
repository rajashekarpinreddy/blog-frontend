const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./src/db');
const authRoutes = require('./src/routes/auth');

dotenv.config();

const app = express();
app.use(express.json());

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Enable cookies and credentials
}));

// Use authentication routes
app.use('/api/auth', authRoutes);

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Error syncing database:', err);
});
