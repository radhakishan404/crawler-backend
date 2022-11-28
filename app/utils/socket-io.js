import { Server } from "socket.io";
import { getAllUser, removeUser, addUser } from "./socketUsers.js";

export let socketIo;

let socketUsers = 0;

export const socketConnectionConfig = (server) => {
  socketIo = new Server(server, {
    pingTimeout: 1000,
    cors: {
      credentials: true,
    },
  });

  socketIo.on("connection", async (socket) => {
    socketUsers += 1;
    await addUser(socket.id);
    console.log("Total clients connected: ", socketUsers);
    console.log("Total users: ", getAllUser());
    socket.on("disconnect", () => {
      socketUsers -= 1;
      removeUser(socket.id);
      console.log("1 client disconnected: " + socket.id);
      console.log("After disconnect Total users: ", getAllUser());
    });
  });
};

export const sendSocketMsg = (key, data) => {
  let socketId = getAllUser();

  if (socketId && socketId.length > 0) {
    socketId.map(function (id) {
      try {
        console.log("SENDING_SOCKET_DATA: ", id, key, data);
        socketIo.to(id).emit(key, data);
      } catch (error) {
        console.log("== Error while sending data via socket: ", e.message);
      }
    });
  }
};
