import axios from "axios";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function AxiosAuth() {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const instance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.data.token}`,
    },
  });

  return instance;
}

export { currencyFormatter, AxiosAuth };
