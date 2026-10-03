# Restaurant Admin Dashboard Documentation

## 1. Project Overview

The Restaurant Admin Dashboard is a responsive React application used to manage restaurant data such as users, products, and orders.

The project includes:
- Dashboard statistics
- Users management UI
- Products management UI
- Orders management UI
- Search
- Pagination
- Responsive design
- Bar chart
- React Router navigation

---

## 2. Technologies Used

- React.js
- JavaScript
- Bootstrap
- React Router
- Recharts
- CSS
- Vite

---

## 3. Components

### Sidebar

**Purpose:**  
Displays navigation links for Dashboard, Users, Products, and Orders.

**Props:**  
None.

**State:**  
None.

**Used in:**  
`App.jsx`

---

### TopNavbar

**Purpose:**  
Displays the dashboard title, admin user, and logout button.

**Props:**  
None.

**State:**  
None.

**Used in:**  
`App.jsx`

---

### OrdersChart

**Purpose:**  
Displays weekly order statistics using a bar chart.

**Library:**  
Recharts.

**Props:**  
None.

**State:**  
None.

**Used in:**  
`Dashboard.jsx`

---

## 4. Pages

### Dashboard

**Purpose:**  
Displays general restaurant statistics.

**Features:**
- Total Users
- Total Products
- Total Orders
- Weekly Orders Chart

**Route:**  
`/dashboard`

---

### Users Page

**Purpose:**  
Displays users in a table.

**Features:**
- Search users by name
- Pagination
- Edit button
- Delete button

**State:**
- `searchTerm`
- `currentPage`

**Route:**  
`/users`

---

### Products Page

**Purpose:**  
Displays restaurant products.

**Features:**
- Search products by name
- Pagination
- Edit button
- Delete button

**State:**
- `searchTerm`
- `currentPage`

**Route:**  
`/products`

---

### Orders Page

**Purpose:**  
Displays restaurant orders.

**Features:**
- Search orders by user
- Pagination
- Edit button
- Delete button

**State:**
- `searchTerm`
- `currentPage`

**Route:**  
`/orders`

---

## 5. React Hooks

### useState

Used to store and update changing values such as:

- Search text
- Current page number

Example:

```jsx
const [searchTerm, setSearchTerm] = useState("");