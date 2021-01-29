const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const e = await response.json();
      console.warn(e);
    }
  } catch (e) {
    console.warn(e);
  }
};

const api = {
  fetchCats: async (keyword) => {
    return await request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
  },
  fetchCatsRandom: async () => {
    return await request(`${API_ENDPOINT}/api/cats/random50`);
  },

  fetchInfo: async (id) => {
    return await request(`${API_ENDPOINT}/api/cats/${id}`);
  },
};

export { api };
