# Data Visualization Project

This project is a full-stack data visualization app with a backend API built using Node.js and Express, and a frontend developed with React and D3.js. It connects to a MongoDB database, allowing users to visualize and filter data.

## Prerequisites

- **Node.js**: Download and install from [nodejs.org](https://nodejs.org/).
- **MongoDB**: Install MongoDB and MongoDB Compass. MongoDB Compass can be downloaded [here](https://www.mongodb.com/products/compass).

## Getting Started

### 1. Clone the Repository

Clone this repository to your local machine and navigate to the project folder:

```bash
git clone <repository-url>
cd <repository-folder>

```

### 2. Set Up the Backend

```bash
cd DataVisualization-Server
npm install

```

### 3. Set up MongoDB Database

Open MongoDB Compass.
Connect to localhost:27017.
Create a new database and name it`bash visualization.`

### 4. Create a .env File

```bash
MONGODB_URI=mongodb://localhost:27017/visualization
PORT=5000

```

### 5. Run the Backend Server

```bash
npm run dev

```

### 6. Set up the Frontend

1. Navigate to the Frontend Folder:

```bash
cd ../DataVisualization-Client

```

2. Then run these commands

```bash
npm install
npm run dev

```

### Summary:-

```bash
git clone <repository-url>
cd <repository-folder>
```

# Backend setup

```bash
cd DataVisualization-Server
npm install
npm run dev

```

# Frontend setup

```bash
cd ../DataVisualization-Client
npm install
npm run dev

```
