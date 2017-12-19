import React from 'react';
import {render} from 'react-dom';
import { Router ,IndexRoute ,Route ,browserHistory ,hashHistory} from 'react-router';

import Approot from './component/approot.jsx';
import Home from './component/home.jsx';
import Around from './component/around.jsx';
import Focus from './component/focus.jsx';
import Mine from './component/mine.jsx';

import WepApplist from './component/applist.jsx';

import './css/index.css';


render((
  <Router history={hashHistory}>
    <Route path="/" component={Approot}>
      <IndexRoute  component={Home}/>
      <Route path="/around" component={Around}></Route>
      <Route path="/focus" component={Focus}></Route>
      <Route path="/mine" component={Mine}></Route>
    </Route>
  </Router>
),document.getElementById("app"))
