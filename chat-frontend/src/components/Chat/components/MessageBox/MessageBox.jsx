import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "../Message/Message";
import { paginateMessages } from "../../../../store/actions/chat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MessageBox.scss";

const MessageBox = ({ chat }) => {
  const user = useSelector((store) => store.authReducer.user);
  const [loading, setLoading] = useState(false);
  const { scrollBottom, senderTyping } = useSelector(
    (store) => store.chatReducer
  );
  const msgBox = useRef();
  const [scrollUp, setScrollUp] = useState(0);
  const dispatch = useDispatch();

  const scrollManual = (value) => {
    msgBox.current.scrollTop = value;
  };

  const handleInfiniteScroll = async (e) => {
    if (e.target.scrollTop === 0) {
      setLoading(false);
      const pagination = chat.Pagination;
      const page = typeof pagination === "undefined" ? 1 : pagination.page;
      try {
        const res = await dispatch(paginateMessages(chat.id, +page + 1));
        if (res) {
          setScrollUp(scrollUp + 1);
        }
        setLoading(false);
      } catch (err) {}
    }
  };

  useEffect(() => {
    setTimeout(() => {
      scrollManual(Math.ceil(msgBox.current.scrollHeight * 0.1));
    }, 100);
  }, [scrollUp]);

  useEffect(() => {
    if (
      senderTyping.typing &&
      msgBox.current.scrollTop > msgBox.current.scrollHeight * 0.3
    ) {
      setTimeout(() => {
        scrollManual(msgBox.current.scrollHeight);
      }, 100);
    }
  }, [senderTyping]);

  useEffect(() => {
    if (!senderTyping.typing) {
      setTimeout(() => {
        scrollManual(msgBox.current.scrollHeight);
      }, 100);
    }
  }, [scrollBottom]);

  return (
    <div onScroll={handleInfiniteScroll} id="msg-box" ref={msgBox}>
      {loading && (
        <p className="loader m-0">
          <FontAwesomeIcon icon="spinner" className="fa-spin" />
        </p>
      )}
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
      {senderTyping.typing && senderTyping.chatId === chat.id ? (
        <div className="message">
          <div className="other-person">
            <p className="m-0">
              {senderTyping.fromUser.firstName}
              {senderTyping.fromUser.lastName}
              ...
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MessageBox;
