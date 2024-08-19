import { BrowserRouter as Router } from "react-router-dom";
import ApplicationRoutes from "./ApplicationRoutes";
import ProfileInformation from "@/components/ProfileInformation";

const Routes = () => {
  return (
    <Router>
      <ProfileInformation />
      <ApplicationRoutes />
    </Router>
  );
};

export default Routes;
