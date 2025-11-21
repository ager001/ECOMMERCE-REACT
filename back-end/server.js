// Import the Express framework to build the web server
import express from 'express';

// Import CORS middleware to allow cross-origin requests (e.g., frontend on a different domain)
import cors from 'cors';

// Load environment variables from a .env file into process.env
import 'dotenv/config';

// Connects the database
import connectDB from './configs/mongodb.js';

// Connects Cloudinary
import connectCloudinary from './configs/cloudinary.js';

// Import route handlers
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/OrderRoute.js';

// -------------------- App Configuration --------------------

const app = express();
const port = process.env.PORT || 4000;

// -------------------- Connect Services --------------------

connectDB();
connectCloudinary();

// -------------------- Middleware Setup --------------------

// Parse incoming JSON
app.use(express.json());

// CORS: Allow frontend origin and credentials
const allowedOrigins = [
   // optional: for local dev
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Handle preflight requests
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Serve static files (e.g., CSS, JS, images) from frontend build
app.use(express.static('dist')); // or 'public' or your actual folder

// Force correct MIME type for .css files (Render sometimes mislabels them)
app.get('*.css', (req, res, next) => {
  res.type('text/css');
  next();
});

// -------------------- API Routes --------------------

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// -------------------- Root Route --------------------

app.get('/', (req, res) => {
  res.send('API working....');
});

// -------------------- Start Server --------------------

app.listen(port, () => {
  console.log(`✅ Server started on PORT: ${port}`);
});