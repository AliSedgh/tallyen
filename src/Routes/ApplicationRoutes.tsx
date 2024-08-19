import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Buy from "../pages/Buy";

const ApplicationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/buy" element={<Buy />} />
    </Routes>
  );
};

export default ApplicationRoutes;
