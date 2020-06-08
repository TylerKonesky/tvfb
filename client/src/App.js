import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';

import Admin from './Components/Admin/Admin'
import Coaches from './Components/Coaches/Coaches';
import EditEvent from './Components/Admin/ManageSchedule/EditEvent';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import ManageCoaches from './Components/Admin/ManageCoaches/ManageCoaches';
import ManageSchedule from './Components/Admin/ManageSchedule/ManageSchedule'
import ManageSponsors from './Components/Admin/ManageSponsors/ManageSponsors';
import Schedule from './Components/Schedule/Schedule';


function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
            <Header />
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/coaches" component={Coaches}></Route>
            <Route exact path="/pageAdmin" component={Admin}></Route>
            <Route path="/pageAdmin/manageCoaches" component={ManageCoaches}></Route>
            <Route exact path="/pageAdmin/manageSchedule" component={ManageSchedule}></Route>
            <Route path="/pageAdmin/manageSchedule/edit/:id" component={EditEvent}></Route>
            <Route path="/pageAdmin/manageSponsors" component={ManageSponsors}></Route>
            <Route exact path="/schedule" component={Schedule}></Route>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
