# The Aussie Outfit Review Service

A comprehensive review and rating service for Australian fashion and apparel products in our e-commerce platform.

## Overview

The Aussie Outfit Review Service is a backend service that manages customer reviews, ratings, and feedback for clothing and fashion items. It provides a robust API for submitting, retrieving, and managing reviews and ratings with integrated aggregation and quality metrics.

## Features

- **Submit Reviews**: Customers can submit detailed reviews with title, comments, and images
- **Rate Products**: Customers can provide star ratings (1-5 stars) for products
- **Retrieve Reviews**: Fetch reviews by product ID with aggregated ratings
- **Review Management**: Edit and delete reviews with proper authorization
- **Rating Aggregation**: Calculate average ratings and review statistics
- **Quality Metrics**: Track helpful votes (likes/dislikes) and review status
- **Verified Purchases**: Mark reviews as verified purchases
- **Active Status**: Manage review and rating visibility with active/inactive states

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js (v5.2.1)
- **Database**: MongoDB with Mongoose ODM (v9.6.1)
- **REST API**: RESTful architecture
- **Middleware**: CORS, Body Parser
- **File Uploads**: Multer for image handling
- **Testing**: Vitest
- **Environment**: dotenv for configuration

## Installation

```bash
# Clone the repository
git clone https://github.com/pradyumna106-ship-it/the-aussie-outfit-review-service.git

# Navigate to project directory
cd the-aussie-outfit-review-service

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start the server
npm start

# For development with auto-reload
npm run dev
```

## Configuration

Create a `.env` file with the following variables:

```env
PORT=3000
DATABASE_URL=your_mongodb_connection_string
NODE_ENV=development
```

## Project Structure

```
src/
├── index.js              # Server entry point
├── app.js               # Express app configuration
├── config/
│   └── database.js      # MongoDB connection
├── models/
│   ├── review.js        # Review schema
│   └── rating.js        # Rating schema
├── controller/
│   ├── review.js        # Review handlers
│   └── rating.js        # Rating handlers
└── route/
    ├── review.js        # Review routes
    └── rating.js        # Rating routes
```

## API Endpoints

### Reviews

- `POST /` - Create a new review
  - Body: `{ productId, userId, title, comment }`
- `GET /` - Get all reviews with ratings
- `GET /product/:productId` - Get reviews for a specific product
- `PUT /:reviewId` - Update a review
- `DELETE /:reviewId` - Delete a review

### Ratings

- `POST /ratings` - Create or update a rating
  - Body: `{ productId, userId, rating (1-5), reviewId }`
- `GET /ratings/product/:productId` - Get all ratings for a product with average
- `DELETE /ratings/:reviewId` - Delete a rating

## Data Models

### Review Schema
```javascript
{
  productId: ObjectId (required, indexed),
  userId: ObjectId (required, indexed),
  title: String,
  comment: String (required),
  images: [String],
  likes: Number (default: 0),
  dislikes: Number (default: 0),
  isVerifiedPurchase: Boolean (default: false),
  isApproved: Boolean (default: true),
  isActive: Boolean (default: true),
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Rating Schema
```javascript
{
  productId: ObjectId (required, indexed),
  userId: ObjectId (required, indexed),
  rating: Number (required, 1-5),
  reviewId: ObjectId,
  isActive: Boolean (default: true),
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```
**Note**: Unique index on (productId, userId) - one user can rate one product only once.

## Usage

### Example: Submit a Review
```bash
POST /
Content-Type: application/json

{
  "productId": "507f1f77bcf86cd799439011",
  "userId": "507f1f77bcf86cd799439012",
  "title": "Great quality!",
  "comment": "Very comfortable and durable"
}
```

### Example: Submit a Rating
```bash
POST /ratings
Content-Type: application/json

{
  "productId": "507f1f77bcf86cd799439011",
  "userId": "507f1f77bcf86cd799439012",
  "rating": 4,
  "reviewId": "507f1f77bcf86cd799439013"
}
```

### Example: Get Product Reviews with Ratings
```bash
GET /product/507f1f77bcf86cd799439011
```

Response includes aggregated ratings from the ratings collection.

### Example: Get Product Ratings Statistics
```bash
GET /ratings/product/507f1f77bcf86cd799439011
```

Response includes:
- `totalRatings`: Number of ratings
- `averageRating`: Average rating (rounded to 1 decimal)
- `data`: Array of individual ratings

## Development

```bash
# Run tests
npm test

# Run tests in watch mode
npm test:watch
```

## CORS Configuration

The service allows cross-origin requests from all origins with the following allowed methods:
- GET, POST, PUT, DELETE, PATCH, OPTIONS

Requests must include `Content-Type` header.

## File Uploads

The service supports file uploads via Multer. Uploaded files are served from the `/uploads` directory.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Support

For issues and questions, please open an issue on the [GitHub repository](https://github.com/pradyumna106-ship-it/the-aussie-outfit-review-service/issues).
