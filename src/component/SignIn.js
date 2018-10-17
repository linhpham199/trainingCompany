import React, { Component } from 'react';
import { auth } from '../firebase';
import { SignUpLink } from './SignUp';
import { withRouter } from 'react-router-dom';
import { PasswordForgetLink } from './PasswordForget';

const SignInPage = ({history}) => 
    <div>
        <h1>Sign In</h1>
        <SignInForm history={history}/>
        <SignUpLink />
        <PasswordForgetLink />
    </div>


const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
}

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    onSubmit = (event) => {
        const { history } = this.props;

        const {
            email,
            password,
            error
        } = this.state;


        auth.doSignInWithEmailAndPassword(email,password)
            .then (() => {
                this.setState(() => ({...INITIAL_STATE}));
                history.push('/home');
            }
            )
            .catch ({error: error})
        event.preventDefault();
    }

    render() {
        const {
            email,
            password,
            error
        } = this.state;

        const isInValid = 
            email === '' ||
            password === '' ;

        return (
            <form onSubmit={this.onSubmit}>
                    <div className="form-row container-fluid">
                        <div className="form-group  col-sm-4"></div>
                        <div className="form-group col-sm-4">
                            <input value={email} placeholder="Email" className="form-control" name="email" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group col-sm-4"></div>
                        <div className="form-group col-sm-4"></div>
                        <div className="form-group col-sm-4">
                            <input value={password} placeholder="Password" type="password" className="form-control" name="password" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group col-sm-4"></div>
                    </div>
                    <div className="justify-content-center">
                        <button style={{margin:10}} className="btn btn-primary" disabled={isInValid} type="submit">Sign In</button>
                    </div>
                    {error && <p>{error.message}</p>}
            </form>
        );
    }
}

export default withRouter(SignInPage);

export { SignInForm };