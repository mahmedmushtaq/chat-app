import chatService from "../../services/chatService";
export const FETCH_CHATS = "FETCH_CHATS";
export const SET_CURRENT_CHAT = "SET_CURRENT_CHAT";
export const FRIENDS_ONLINE = "FRIENDS_ONLINE";
export const FRIEND_ONLINE = "FRIEND_ONLINE";
export const FRIEND_OFFLINE = "FRIEND_OFFLINE";

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
