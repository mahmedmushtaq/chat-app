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
};

export default chatService;
