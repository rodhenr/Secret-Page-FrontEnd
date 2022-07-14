import "../styles/secret.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToken, removeToken, selectToken } from "../store/slices/tokenSlice";

function Secret() {
  const [data, setData] = useState("");
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const url = "http://localhost:8080/secret";

  const api = axios.create({
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
    baseURL: url,
  });

  const refreshToken = async (error) => {
    try {
      const requestOriginal = error.config;
      delete requestOriginal.headers["Authorization"];

      await axios
        .get("http://localhost:8080/auth/refresh", { withCredentials: true })
        .then(async (res) => {
          const novoToken = res.data.accessToken;
          requestOriginal.headers["Authorization"] = `Bearer ${novoToken}`;
          dispatch(addToken(novoToken));
          return await axios.request(requestOriginal);
        })
        .catch((err) => {
          dispatch(removeToken());
        });
    } catch (err) {
      console.log(err);
    }
  };

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 403) return await refreshToken(error);
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const getSecret = async () => {
      console.log(token);
      await api
        .get(url)
        .then((resp) => {
          setData(resp.data);
        })
        .catch((err) => console.log(err.request.response));
    };

    getSecret();
  }, []);

  return (
    <div className="secret-container">
      <h2>O segredo é</h2>
      <h1>{data}</h1>
    </div>
  );
}

export default Secret;
