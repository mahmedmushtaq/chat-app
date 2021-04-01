import API from "./api";

const authService = {
  login: async (data) => {
    try {
      const res = await API.post("/login", data);
      setHeaderAndAuthStorage(res.data);
      return res.data;
    } catch (err) {
      console.log("login err", err);
      throw err;
    }
  },
  register: async (data) => {
    try {
      const res = await API.post("/register", data);
      setHeaderAndAuthStorage(res.data);

      return res.data;
    } catch (err) {
      console.log("login err", err);
      throw err;
    }
  },

  update: async (data) => {
    try {
      const headers = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      };
      const res = await API.post("/user/update", data, headers);
      localStorage.setItem("user", JSON.stringify(res.data));
      return res.data;
    } catch (err) {}
  },

  logout() {
    API.defaults.headers["Authorization"] = "";
  },
};

const setHeaderAndAuthStorage = ({ user, token }) => {
  API.defaults.headers["Authorization"] = `Bearer ${token}`;
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", JSON.stringify(token));
};

export default authService;
