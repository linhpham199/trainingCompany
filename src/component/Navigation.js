import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';
import SignOutButton from './SignOut';
import AuthUserContext from './AuthUserContext';


const NavigationNonAuth = () => 
  <div>     
    <Link className="link" to={routes.SIGN_IN}>Sign In</Link>{'  '}
  </div>

const NavigationAuth = () =>
  <div>   
    <Link className="link" to={routes.CUSTOMERS}>Customers</Link>{'  '}
    <Link className="link" to={routes.TRAININGS}>Trainings</Link>{'  '}
    <Link className="link" to={routes.CALENDAR}>Calendar</Link>{'  '}
    <Link className="link" to={routes.HOME}>Home</Link>{'  '}
    <Link className="link" to={routes.ACCOUNT}>Account</Link>{'  '}
    <SignOutButton />{' '}  
  </div>

const Navigation = () =>
    <AuthUserContext.Consumer>
        {authUser =>
            <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                { authUser
                    ? <NavigationAuth />
                    : <NavigationNonAuth />
                }
            </div>
        }
    </AuthUserContext.Consumer>
export default Navigation;