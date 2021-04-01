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
};

export default chatService;
