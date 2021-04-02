import API from "./api";

const chatService = {
  fetchChats: async () => {
    try {
      const res = await API.get("/chats");

      return res.data;
    } catch (err) {
      throw err;
    }
  },

  async uploadImage(data) {
    try {
      const headers = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      };
      const res = await API.post("/chats/upload-image", data, headers);
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  paginationMessage: async (id, page) => {
    try {
      const res = await API.get("/chats/messages", { params: { id, page } });
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  searchUsers: async (term) => {
    try {
      const res = await API.get("/user/search-users", {
        params: { term },
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  createChat: async (partnerId) => {
    try {
      const res = await API.post("/chats/create", { partnerId });
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  addFriendToGroupChat: async (userId, chatId) => {
    try {
      const res = await API.post("/chats/add-users-to-group", {
        userId,
        chatId,
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  leaveCurrentChat: async (chatId) => {
    try {
      const res = await API.post("/chats/leave-current-chat", {
        chatId,
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  deleteCurrentChat: async (chatId) => {
    try {
      const res = await API.delete(`/chats/${chatId}`, {
        chatId,
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  },
};

export default chatService;
