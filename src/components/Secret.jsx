import "../styles/secret.scss";
import Button from '@mui/material/Button';
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
  });

  useEffect(() => {
    const request = async () => {
      const resp = await api.get(url);
      setData(resp.data);
    };

    request();
  }, [api]);

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 403) {
        const response = await refreshToken(error);
        return response;
      }
      return Promise.reject(error);
    }
  );

  const refreshToken = async (error) => {
    try {
      const requestOriginal = error.config;

      const request = await axios.get("http://localhost:8080/auth/refresh", {
        withCredentials: true,
      });
      const novoToken = request.data.accessToken;

      requestOriginal.headers["Authorization"] = `Bearer ${novoToken}`;
      dispatch(addToken(novoToken));
      const novoRequest = await axios.request(requestOriginal);

      return novoRequest;
    } catch (err) {
      dispatch(removeToken());
    }
  };

  

  return (
    <div className="secret-container">
      <h2>O segredo é</h2>
      <h1>{data}</h1>
      <Button variant="contained" color="warning" onClick={() => dispatch(removeToken())}>
        LOGOUT
      </Button>
    </div>
  );
}

export default Secret;
