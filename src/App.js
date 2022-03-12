import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import AboutUs from './pages/AboutUs';
import Error from './pages/Error';
import RectangleImage from './assets/images/Rectangle.png';

function App() {
  return (
    <Fragment>
      <Box sx={{
        backgroundImage: `url(${RectangleImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        overflow: 'hidden'
      }}>
        <Router>
          <Header />
          <Switch>
            <Route
              path="/landing"
              component={Landing}
            />
            <Redirect exact from='/' to='/landing' />
            <Route
              path="/about-us"
              component={AboutUs}
            />
            <Route
              path="*"
              component={Error}
            />
          </Switch>
          <Footer />
        </Router>
      </Box>
    </Fragment>
  );
}

export default App;