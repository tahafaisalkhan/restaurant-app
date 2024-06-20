import { Server } from "socket.io";
import http from "http";
import { app } from "./app.js";
import { config } from "dotenv";
import mongoose from 'mongoose';

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

config({
  path: "./config.env",
});

export const connect = async () => {
    try
    {
        console.log("Connecting to MongoDB");
        const data = await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected Successfully!!")
    }
    catch (error)
    {
        console.log("Error connecting to MongoDB")
    }
}
connect();

io.on("connection", (socket) => {
  console.log("USER CONNECTED:", socket.id);
  
  socket.on('on-order', (orderId) => {
    socket.join(orderId);
    console.log(`Socket ${socket.id} joined order room ${orderId}`);
  });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
  });
  
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});

 