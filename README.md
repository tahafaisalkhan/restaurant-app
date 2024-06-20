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
<img width="1440" alt="331537187-f1fb5797-7365-4c8d-b363-e283635ffceb" src="https://github.com/tahafaisalkhan/web-dev/assets/157153519/21247148-57f5-4711-9436-1c5eb6d77180">


#### Sign Up
- Only accessible to Customers.
- Customers can sign up with their full name, username, password, and a role field defaulting to "Customer".
- Unique username validation.

#### Login
- Accessible to both Customers and Employees.
- Users can log in using their username and password.
<img width="1440" alt="331537281-de7b0cb5-30aa-4f0b-8ac2-793775d15c15" src="https://github.com/tahafaisalkhan/web-dev/assets/157153519/22be2729-fbd2-4da3-9b37-0fc5f97c5af8">


#### Menu
- Displays a list of menu items fetched from the database.
- Customers can add or remove items from the shopping cart using plus and minus buttons.
- Shopping cart is managed using Redux.
<img width="1440" alt="331537524-b530b9c7-b806-4431-96d9-168af21f94cc" src="https://github.com/tahafaisalkhan/web-dev/assets/157153519/ba34a944-bfc2-418d-ba22-820e526bee38">


#### Profile
- Displays user details: Name, Username, and Role for both Customers and Employees.
- Customers can view a list of all their past and present orders.
<img width="1440" alt="331537405-29eb1ebb-2ef0-4ae0-a742-a5546d888bbb" src="https://github.com/tahafaisalkhan/web-dev/assets/157153519/9e0154c6-45d3-4ac7-ae5a-3b68a4dc425f">


#### Orders
- Accessible only to Employees.
- Displays a list of all currently pending orders (Processing, Preparing, Ready).
- Employees can update the status of an order in real-time using sockets.
<img width="1440" alt="331537447-985857b7-dbc5-49c3-b159-96a5190861c7" src="https://github.com/tahafaisalkhan/web-dev/assets/157153519/0583c21e-58a4-475b-817f-d18415ddadf5">


#### My Order
- Accessible only to Customers.
- Displays the complete details of an order when clicked from the Profile page.
- Uses sockets to check for real-time updates in the order status.
<img width="1440" alt="331537340-39b270ba-cdcc-4bec-96c5-ee17ebfa3f8a" src="https://github.com/tahafaisalkhan/web-dev/assets/157153519/27a0ea0f-4739-4845-bde3-468724c455f9">


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
