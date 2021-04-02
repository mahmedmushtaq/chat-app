import { useEffect } from "react";
import socketIOClient from "socket.io-client";
import {
  addUserToGroup,
  createChat,
  deleteChat,
  fetchChats,
  leaveCurrentChat,
  offlineFriend,
  onlineFriend,
  onlineFriends,
  receivedMessage,
  senderTyping,
  setSocket,
} from "../../../store/actions/chat";
const ENDPOINT = "http://localhost:4000";

const useSocket = (user, dispatch) => {
  useEffect(() => {
    (async () => {
      try {
        const res = await dispatch(fetchChats());
        console.log(" === load all chats ======= ", res);
        const socket = socketIOClient(ENDPOINT);
        dispatch(setSocket(socket));

        socket.emit("join", user);
        socket.on("typing", (user) => {
          console.log(" ====== typing ", user);
        });

        socket.on("friends", (friends) => {
          console.log("friends is = ", friends);
          dispatch(onlineFriends(friends));
        });

        socket.on("typing", (sender) => {
          dispatch(senderTyping(sender));
        });

        socket.on("online", (user) => {
          dispatch(onlineFriend(user));
          console.log("online user is = ", user);
        });
        socket.on("offline", (user) => {
          dispatch(offlineFriend(user));
          console.log("offline user is= ", user);
        });

        socket.on("received", (message) => {
          dispatch(receivedMessage(message, user.id));
          console.log("received message ", message);
        });

        socket.on("new-chat", (chat) => {
          dispatch(createChat(chat));
        });

        socket.on("added-user-to-group", (group) => {
          dispatch(addUserToGroup(group));
        });

        socket.on("remove-user-from-chat", (data) => {
          dispatch(leaveCurrentChat(data));
        });

        socket.on("delete-chat", (chatId) => {
          dispatch(deleteChat(chatId));
        });
      } catch (err) {}
    })();
  }, [dispatch, user]);
};

export default useSocket;
