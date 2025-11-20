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

// -------------------- App Configuration {PART 1} --------------------

const app = express();
const port = process.env.PORT || 4000;

// -------------------- Connect Services {PART 2} --------------------

connectDB();
connectCloudinary();

// -------------------- Middleware Setup {PART 3} --------------------

// Enable Express to automatically parse incoming JSON payloads
app.use(express.json());

// Configure CORS to allow requests from your frontend
const allowedOrigins = [
  'https://ecommerce-frontend-git-main-ager001s-projects.vercel.app'
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

// -------------------- API Endpoints {PART 4} --------------------

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Root route
app.get('/', (req, res) => {
  res.send("API working....");
});

// -------------------- Start the Server --------------------

app.listen(port, () => console.log('Server started on PORT: ' + port));