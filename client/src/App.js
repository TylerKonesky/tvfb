import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Route} from 'react-router-dom';
import {toast} from 'react-toastify';

import Admin from './Components/Admin/Admin'
import Coaches from './Components/Coaches/Coaches';
import EditCoach from './Components/Admin/ManageCoaches/EditCoaches';
import EditEvent from './Components/Admin/ManageSchedule/EditEvent';
import EditSponsors from './Components/Admin/ManageSponsors/EditSponsors';
import Game from './Components/Schedule/Game';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import LiveStream from './Components/LiveStream/LiveStream';
import ManageCoaches from './Components/Admin/ManageCoaches/ManageCoaches';
import ManageSchedule from './Components/Admin/ManageSchedule/ManageSchedule'
import ManageSponsors from './Components/Admin/ManageSponsors/ManageSponsors';
import Schedule from './Components/Schedule/Schedule';
import Sponsors from './Components/Sponsors/Sponsors';

toast.configure()
function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
            <Header />
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/coaches" component={Coaches}></Route>
            <Route path='/schedule/game/:id' component={Game}></Route>
            <Route exact path="/pageAdmin" component={Admin}></Route>
            <Route exact path="/pageAdmin/manageCoaches" component={ManageCoaches}></Route>
            <Route path="/pageAdmin/manageCoaches/edit/:id" component={EditCoach}></Route>
            <Route exact path="/pageAdmin/manageSchedule" component={ManageSchedule}></Route>
            <Route path="/pageAdmin/manageSchedule/edit/:id" component={EditEvent}></Route>
            <Route exact path="/pageAdmin/manageSponsors" component={ManageSponsors}></Route>
            <Route path="/pageAdmin/manageSponsors/edit/:id" component={EditSponsors}></Route>
            <Route exact path="/schedule" component={Schedule}></Route>
            <Route exact path="/sponsors" component={Sponsors}></Route>
            <Route exact path="/live/:id" component={LiveStream}></Route>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
