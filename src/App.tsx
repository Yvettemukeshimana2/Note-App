
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
 import LoginPage from "./Component/Loginpage";
 import RegisterPage from "./Component/Registerpage";
 import NotePage from "./Component/Notepage";
 import { MantineProvider } from "@mantine/core";

const App = () => (
  <Router>
       <MantineProvider >
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/notes" element={<NotePage />} />
    </Routes>
    </MantineProvider>
  </Router>
);

export default App;
