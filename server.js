const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
const { validateSignup, validateLogin } = require('./middleware/validateUser');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS middleware (allowing cross-origin access for your frontend)
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const applicationRoutes = require('./routes/application');
const clubRoutes = require('./routes/club');
const educationRoutes = require('./routes/education');
const eventRoutes = require('./routes/event');
const gigRoutes = require('./routes/gig');
const hostRoutes = require('./routes/host');
const messageRoutes = require('./routes/message');
const networkRoutes = require('./routes/network');
const pageRoutes = require('./routes/pages');
const portfolioRoutes = require('./routes/portfolio');
const profileRoutes = require('./routes/profile');
const recruiterRoutes = require('./routes/recruiter');
const skillsRoutes = require('./routes/skills');
const testimonialRoutes = require('./routes/testimonial');
const workExperienceRoutes = require('./routes/work-experience');
const companyWorkedRoutes = require('./routes/companyWorked');

// Apply validation middleware for user routes
app.use('/api/users', userRoutes); // Mount the user routes at '/api/users'


// Protected routes (authMiddleware applied)
app.use('/api/posts', authMiddleware, postRoutes);
app.use('/api/comments', authMiddleware, commentRoutes);
app.use('/api/applications', authMiddleware, applicationRoutes);
app.use('/api/clubs', authMiddleware, clubRoutes);
app.use('/api/educations', authMiddleware, educationRoutes);
app.use('/api/events', authMiddleware, eventRoutes);
app.use('/api/gigs', authMiddleware, gigRoutes);
app.use('/api/hosts', authMiddleware, hostRoutes);
app.use('/api/messages', authMiddleware, messageRoutes);
app.use('/api/networks', authMiddleware, networkRoutes);
app.use('/api/pages', authMiddleware, pageRoutes);
app.use('/api/portfolios', authMiddleware, portfolioRoutes);
app.use('/api/profiles', authMiddleware, profileRoutes);
app.use('/api/recruiters', authMiddleware, recruiterRoutes);
app.use('/api/skills', authMiddleware, skillsRoutes);
app.use('/api/testimonials', authMiddleware, testimonialRoutes);
app.use('/api/work-experience', authMiddleware, workExperienceRoutes);
app.use('/api/company-worked', authMiddleware, companyWorkedRoutes);

// Default route for handling undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use(errorMiddleware);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
