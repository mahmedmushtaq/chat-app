import { useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { fetchChats } from "../../store/actions/chat";
import { useEffect } from "react";
import FriendList from "./components/FriendList/FriendList";
import Messenger from "./components/Messenger/Messenger";
import socketConnection from "./hooks/socketConnection";
import "./Chat.scss";

const Chat = () => {
  const user = useSelector((store) => store.authReducer.user);

  const dispatch = useDispatch();

  socketConnection(user, dispatch);

  return (
    <div id="chat-container">
      <Navbar />
      <div id="chat-wrap">
        <FriendList />
        <Messenger />
        {/* <Messenger /> */}
      </div>
    </div>
  );
};

export default Chat;
