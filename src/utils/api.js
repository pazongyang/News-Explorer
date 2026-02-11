const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const getNews = (query) => {
  const to = new Date().toISOString().split("T")[0];
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7);
  const from = fromDate.toISOString().split("T")[0];

  const url = `${newsApiBaseUrl}?q=${query}&from=${from}&to=${to}&pageSize=100&apiKey=${API_KEY}`;

  return fetch(url).then((res) => {
    if (!res.ok) return Promise.reject(`Error: ${res.status}`);
    return res.json();
  });
};
