import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';

import Coaches from './Components/Coaches/Coaches'
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Schedule from './Components/Schedule/Schedule';


function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
            <Header />
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/coaches" component={Coaches}></Route>
            <Route exact path="/schedule" component={Schedule}></Route>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
