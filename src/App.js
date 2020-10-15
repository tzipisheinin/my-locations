import React from 'react';
import TopBar from './TopBar'
import Categories from'./Categories'
import categoriesStore from './AppStore/Categories'
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import './App.css';

function Home() {
  const actions = [{name: "Categories", action: () => window.location.hash = "/categories" }];

  return (
    <div className="App">
      <TopBar title="Home" menu={actions} />
      <div className="content">
        <h2 class="text"> Welcome to Location app ...</h2>
        {/* <img alt="location" src='./location.png' /> */}
      </div>
    </div>
  );
}

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/categories">
          <Categories store={categoriesStore} />
        </Route>          
      </Switch>
    </Router>
  );
}

export default App;
