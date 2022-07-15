import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Secret from "./components/Secret";
import VerificarAuth from "./components/VerificarAuth";
import NotFound from "./components/NotFound";
import VerificarLogin from "./components/VerificarLogin";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route element={<VerificarLogin />}>
          <Route index element={<Home />} />
        </Route>
        <Route element={<VerificarAuth />}>
          <Route path="secret" element={<Secret />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
