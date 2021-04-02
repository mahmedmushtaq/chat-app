import chatService from "../../services/chatService";
export const FETCH_CHATS = "FETCH_CHATS";
export const SET_CURRENT_CHAT = "SET_CURRENT_CHAT";
export const FRIENDS_ONLINE = "FRIENDS_ONLINE";
export const FRIEND_ONLINE = "FRIEND_ONLINE";
export const FRIEND_OFFLINE = "FRIEND_OFFLINE";
export const SET_SOCKET = "SET_SOCKET";
export const RECEIVED_MESSAGE = "RECEIVED_MESSAGE";
export const SENDER_TYPING = "SENDER_TYPING";
export const PAGINATE_MESSAGES = "PAGINATE_MESSAGES";
export const INCREMENTAL_SCROLL = "INCREMENTAL_SCROLL";
export const CREATE_CHAT = "CREATE_CHAT";
export const ADD_USER_TO_GROUP = "ADD_USER_TO_GROUP";
export const LEAVE_CURRENT_CHAT = "LEAVE_CURRENT_CHAT";
export const DELETE_CURRENT_CHAT = "DELETE_CURRENT_CHAT";

export const fetchChats = () => async (dispatch) => {
  const data = await chatService.fetchChats();

  data.forEach((chat) => {
    chat.Users.forEach((user) => {
      user.status = "offline";
    });

    chat.Messages.reverse();
  });

  dispatch({ type: FETCH_CHATS, payload: data });

  return data;
};

export const setCurrentChat = (chat) => (dispatch) => {
  dispatch({ type: SET_CURRENT_CHAT, payload: chat });
};

export const onlineFriends = (friends) => (dispatch) => {
  dispatch({ type: FRIENDS_ONLINE, payload: friends });
};

export const onlineFriend = (friend) => (dispatch) => {
  dispatch({ type: FRIEND_ONLINE, payload: friend });
};
export const offlineFriend = (friend) => (dispatch) => {
  dispatch({ type: FRIEND_OFFLINE, payload: friend });
};

export const setSocket = (socket) => (dispatch) => {
  dispatch({ type: SET_SOCKET, payload: socket });
};

export const receivedMessage = (message, userId) => (dispatch) => {
  dispatch({ type: RECEIVED_MESSAGE, payload: { message, userId } });
};

export const senderTyping = (message) => (dispatch) => {
  dispatch({ type: SENDER_TYPING, payload: message });
};

export const paginateMessages = (id, page) => async (dispatch) => {
  try {
    const data = await chatService.paginationMessage(id, page);
    const { messages, pagination } = data;

    if (typeof messages !== "undefined" && messages.length > 1) {
      messages.reverse();
      const payload = { messages, id, pagination };
      dispatch({ type: PAGINATE_MESSAGES, payload });
      return true;
    }

    return false;
  } catch (err) {
    throw err;
  }
};

export const incrementalScroll = () => (dispatch) => {
  dispatch({ type: INCREMENTAL_SCROLL });
};

export const createChat = (chat) => (dispatch) => {
  dispatch({ type: CREATE_CHAT, payload: chat });
};

export const addUserToGroup = (group) => (dispatch) => {
  dispatch({ type: ADD_USER_TO_GROUP, payload: group });
};

export const leaveCurrentChat = (data) => (dispatch) => {
  dispatch({ type: LEAVE_CURRENT_CHAT, payload: data });
};

export const deleteChat = (chatId) => (dispatch) => {
  dispatch({ type: DELETE_CURRENT_CHAT, payload: chatId });
};
