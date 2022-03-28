import { Fragment } from "react";
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import AboutUs from "./pages/AboutUs";
import Account from "./pages/Account";
import Cpu4sale from "./pages/Cpu4sale";
import Limitlesswax from "./pages/Limitlesswax";
import Error from "./pages/Error";
import RectangleImage from "./assets/images/Rectangle.png";

function App() {
  return (
    <Fragment>
      <Box
        sx={{
          backgroundImage: `url(${RectangleImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <HashRouter>
          <Header />
          <Switch>
            <Route path="/landing" component={Landing} />
            <Redirect exact from="/" to="/landing" />
            <Route path="/about-us" component={AboutUs} />
            <Route path="/account" component={Account} />
            <Route path="/cpu4sale" component={Cpu4sale} />
            <Route path="/limitlesswax" component={Limitlesswax} />
            <Route path="*" component={Error} />
          </Switch>
          <Footer />
        </HashRouter>
      </Box>
    </Fragment>
  );
}

export default App;
