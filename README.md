# Restaurant Management System

This project is a Restaurant Management System built using the MERN stack. It serves as a platform for restaurant employees to manage orders and for customers to place orders. The system consists of two user groups: Customers and Employees, each with their respective page routes and functionalities.

## Technologies Used
- **MongoDB**: Database to store user data, menu items, and orders.
- **Express.js**: Backend framework for building the server and handling API requests.
- **React.js**: Frontend framework for building user interfaces.
- **Node.js**: JavaScript runtime for the backend.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **Redux**: State management for the shopping cart and user profile information.
- **Socket.io**: Real-time communication for order status updates.
- **Vite**: Frontend tooling for faster development.
- **CSS**: Styling the application.

## Functionality

### Pages

#### Home
- The landing page for both logged-in and logged-out users.
<img width="1440" alt="Screenshot 2024-06-20 at 11 40 16 PM" src="https://github.com/tahafaisalkhan/restaurant-management/assets/157153519/ea776129-0205-4c0b-a1f2-8ab9def27f29">


#### Sign Up
- Only accessible to Customers.
- Customers can sign up with their full name, username, password, and a role field defaulting to "Customer".
- Unique username validation.
<img width="1439" alt="Screenshot 2024-06-20 at 11 40 22 PM" src="https://github.com/tahafaisalkhan/restaurant-management/assets/157153519/5401b279-7032-4920-8914-eb0ce5caa8c3">
<img width="1440" alt="Screenshot 2024-06-20 at 11 44 30 PM" src="https://github.com/tahafaisalkhan/restaurant-management/assets/157153519/9325e1d6-27e1-4c40-87e9-86c66cba824e">


#### Login
- Accessible to both Customers and Employees.
- Users can log in using their username and password.
<img width="1439" alt="Screenshot 2024-06-20 at 11 40 29 PM" src="https://github.com/tahafaisalkhan/restaurant-management/assets/157153519/45d7240a-7085-4cf6-82e4-a15386dbe96d">



#### Menu
- Displays a list of menu items fetched from the database.
- Customers can add or remove items from the shopping cart using plus and minus buttons.
- Shopping cart is managed using Redux.
<img width="1440" alt="Screenshot 2024-06-20 at 11 44 40 PM" src="https://github.com/tahafaisalkhan/restaurant-management/assets/157153519/778cdfc8-2de2-4be3-b367-0cd58beec980">



#### Profile
- Displays user details: Name, Username, and Role for both Customers and Employees.
- Customers can view a list of all their past and present orders.
<img width="1440" alt="Screenshot 2024-06-20 at 11 45 41 PM" src="https://github.com/tahafaisalkhan/restaurant-management/assets/157153519/99d225a2-55c9-4317-bccf-aec13115d914">


#### Orders
- Accessible only to Employees.
- Displays a list of all currently pending orders (Processing, Preparing, Ready).
- Employees can update the status of an order in real-time using sockets.
<img width="1440" alt="Screenshot 2024-06-20 at 11 44 54 PM" src="https://github.com/tahafaisalkhan/restaurant-management/assets/157153519/a82e3884-894c-4b17-bb5a-27aa0ac22b5e">



#### My Order
- Accessible only to Customers.
- Displays the complete details of an order when clicked from the Profile page.
- Uses sockets to check for real-time updates in the order status.
<img width="1439" alt="Screenshot 2024-06-20 at 11 45 14 PM" src="https://github.com/tahafaisalkhan/restaurant-management/assets/157153519/f1cf857f-67fa-47be-b13b-346c2292dcd2">



## Data Storage in MongoDB

### User
- Name
- Username
- Password
- Role

### Menu
- Item Name
- Description
- Price

### Order
- All Menu Items and their quantities
- Status (Processing, Preparing, Ready, Delivered)
- Total Price
- Ordered By (Reference to User)

## Redux
- Maintains the shopping cart for Customers.
- Stores profile information (excluding Password) for all users.

## Real-time Functionality
- Orders and My Order pages use Socket.io for real-time updates.

## Route Protection
- Route protection to ensure that only the relevant pages are accessible to the respective user groups.

## Project Setup

### Backend
1. Clone the repository.
2. Navigate to the backend directory.
3. Install dependencies: `npm install`
4. Start the server: `npm start`

### Frontend
1. Navigate to the frontend directory.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Notes
- The Navbar displays relevant options based on the user's login status.
- Customers and Employees see different sets of pages based on their roles.
- The provided design guide should be used to split pages into components.
- Custom styling can be added as needed.
