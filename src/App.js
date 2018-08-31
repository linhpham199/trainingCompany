import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import * as routes from './constants/routes';
import Navigation from './component/Navigation';
import Trainings from './component/Trainings';
import Customers from './component/Customers';
import Calendar from './component/Calendar';
import LandingPage from './component/Landing';
import SignUpPage from './component/SignUp';
import SignInPage from './component/SignIn';
import PasswordForgetPage from './component/PasswordForget';
import HomePage from './component/Home';
import AccountPage from './component/Account';
import withAuthentication from './component/withAuthentication';



class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     authUser: null,
  //   }
  // }

  // componentDidMount() {
  //   firebase.auth.onAuthStateChanged(function(authUser){
  //     console.log(authUser);
  //     authUser
  //       ? this.setState({ authUser })
  //       : this.setState({ authUser: null })
  //   }.bind(this))
  // }


  render() {
    return (
      <div className="App">
        <header className="App-header"> 
          <h1 classNaBrowserRouterme="App-title">Personal Trainer Company</h1>
        </header>
        <BrowserRouter>
          <div>
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                {/* <Navigation authUser={this.state.authUser}/> */}
                <Navigation />
            </nav>
            <Switch>
              <Route path={routes.CUSTOMERS} component={Customers}/>
              <Route path={routes.TRAININGS} component={Trainings}/>
              <Route path={routes.CALENDAR} component={Calendar}/>
              <Route path={routes.HOME} component={HomePage}/>
              <Route path={routes.ACCOUNT} component={AccountPage}/>
              <Route path={routes.SIGN_IN} component={SignInPage}/>
              <Route exact path={routes.LANDING} component={LandingPage}/>
              <Route path={routes.SIGN_UP} component={SignUpPage}/>
              <Route path={routes.PASSWORD_FORGET} component={PasswordForgetPage}/>
            </Switch>   
          </div>
        </BrowserRouter>
            
          
        
      </div>
    );
  }
}

export default withAuthentication(App);

