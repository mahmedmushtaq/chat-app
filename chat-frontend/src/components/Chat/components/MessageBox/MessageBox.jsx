import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "../Message/Message";
import { paginateMessages } from "../../../../store/actions/chat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MessageBox.scss";

const MessageBox = ({ chat }) => {
  const user = useSelector((store) => store.authReducer.user);
  return (
    <div id="msg-box">
      {chat.Messages.map((message, index) => {
        return (
          <Message
            user={user}
            chat={chat}
            message={message}
            index={index}
            key={message.id}
          />
        );
      })}
    </div>
  );
};

export default MessageBox;
