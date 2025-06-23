import axios from 'axios';

export class ApiClient {
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: "http://localhost:3001",
            withCredentials: true,

        })

        this.axiosInstance.interceptors.request.use((config) => {
            const token = localStorage.getItem('authToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
            });

            this.axiosInstance.interceptors.response.use(
                (res) => res,
                async (error) => {
                    const original = error.config;
                    if (
                        error.response.status === 401 &&
                        !original._retry
                    ) {
                        original._retry = true;
                        const newToken = await this.refreshAccessToken();
                        if (newToken) {
                            this.setToken(newToken);
                            original.headers.Authorization = `Bearer ${newToken}`;
                            return this.axiosInstance(original);
                        }
                    }
                    return Promise.reject(error);
                }
            )
        }
 isLoggedIn() {
        return !!this.getToken();
    }

    getToken() {
        return typeof window !== "undefined"
        ? localStorage.getItem('authToken')
        : null;
    }

    setToken(token) {
        if (typeof window !== "undefined") {
            localStorage.setItem('authToken', token);
        }
    }

    removeToken() {
        if (typeof window !== "undefined") {
            localStorage.removeItem('authToken');
        }
    }

    async refreshAccessToken() {
        try {
            const { data } = await this.axiosInstance.post('/auth/refreshToken');
            return data.accessToken;
        } catch {
            return null;
        }
    }
// Generic API call (paths are relative)
  async apiCall(method, path, data) {
    return this.axiosInstance({ method, url: path, data });
  }

  
  // Auth
async login(email, password) {
  try {
    const response = await this.axiosInstance.post("api/auth/login", { email, password });
    console.log("Login response data:", response.data);
    const { accessToken } = response.data;
    if (accessToken) {
      this.setToken(accessToken);
      return response.data;
    }
    throw new Error("No accessToken in response");
  } catch (err) {
    console.error("Login failed:", err.response?.data || err);
    throw err;
  }
}


  async register(email, password, name) {
    const { data } = await this.axiosInstance.post("api/auth/register", {
      email,
      password,
      name
    });
    if (data.accessToken) {
      this.setToken(data.accessToken);
      return data;
    }
    throw new Error("No access token received");
  }

  logout() {
    this.removeToken();
    if (typeof window !== "undefined") {
      window.location.href = "/user";
    }
  }

 async addChore(newItem) {
  try {
    const res = await this.axiosInstance.post("/api/chores", newItem);
    return res.data; 
  } catch (err) {
    console.error("Add chore failed:", err.response?.data || err);
    throw err;
  }
}

async getPages() {
  try {
    const res = await this.axiosInstance.get("/api/pages");
    return res.data.pages;
  } catch (err) {
    console.error("Failed to fetch pages:", err.response?.data || err);
    throw err;
  }
}

async addUsersToPage(pageId, invitedEmails) {
  try {
    const res = await this.axiosInstance.post('/api/pages/add-users', {
      pageId,
      invitedEmails,
    });
    return res.data;
  } catch (err) {
    console.error("Failed to add users to page:", err.response?.data || err);
    throw err;
  }
}


}