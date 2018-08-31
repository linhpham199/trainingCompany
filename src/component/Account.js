import React from 'react';
import AuthUserContext from './AuthUserContext';
import PasswordForgetPage from './PasswordForget';
import PasswordChangePage from './PasswordChange';

const AccountPage = () =>
    <AuthUserContext.Consumer>
        {authUser =>
            <div>
                <h4>Account: {authUser.email}</h4>
                <PasswordChangePage />
                <PasswordForgetPage />
                
            </div>
        }
    </AuthUserContext.Consumer>

export default AccountPage;