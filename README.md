# React Admin Panel

A simple React-based admin panel with features including user authentication, product management, warehouse management, transactions, and more.

## Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** (>= 14.x)
- **npm** (comes with Node.js) or **yarn**
- **Backend API** (e.g., Laravel) running at `http://localhost:8000`

---

### Steps to Install

1. **Clone the repository**:
   ```bash
   git clone https://github.com/elseptiawan/nci-fe
   cd nci-fe
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```
     REACT_APP_API_URL=http://localhost:8000/api
     ```
   - Replace `http://localhost:8000/api` with your backend API URL if different.

4. **Start the development server**:
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

5. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`.

---

