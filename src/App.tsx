import { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
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


//@ts-ignore
function App({ ual }) {
  const auth = () => {
    if(ual.activeUser !== null){
      return true
    } 
    return false
  }
  
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
        <Router>
          <Header ual = { ual }/>
          <Switch>
            <Route path="/landing" component={Landing} />
            <Redirect exact from="/" to="/landing" />
            <Route path="/about-us" component={AboutUs} />
            <Route path="/account" component={() => auth() ? (<Account ual = {ual}/>) : (<Error ual = {ual}/>)}/>
            <Route path="/cpu4sale" component={() => auth() ? (<Cpu4sale ual = {ual}/>) : (<Error ual = {ual}/>)}/>
            <Route path="/limitlesswax" component={Limitlesswax} />
            <Route path="*" component={() => <Error ual = {ual}/>} />
          </Switch>
          <Footer />
        </Router>
      </Box>
    </Fragment>
  );
}

export default App;
