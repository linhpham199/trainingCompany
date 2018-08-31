import React, { Component } from 'react';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import { Link } from 'react-router-dom';

const INITIAL_STATE = {
    email: '',
    error: null,
}

class PasswordForgetPage extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state.email);
    }
    
    onSubmit = (event) => {
        const { email } = this.state;
        console.log(email);

        auth.doPasswordReset(email)
        .then(
            this.setState({...INITIAL_STATE}),
            console.log(email)
        )
        .catch(error => this.setState({error}))

        event.preventDefault();
    }

    render() {
        const { 
            email,
            error,
        } = this.state;

        const isInValid = email === '';

        return (
            <div>
                <h1> Password Reset </h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-row container-fluid">
                        <div className="form-group  col-sm-4"></div>
                        <div className="form-group col-sm-4">
                            <input value={email} placeholder="Email" className="form-control" name="email" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group  col-sm-4"></div>
                    </div>
                    <div className="justify-content-center">
                        <button style={{margin:10}} className="btn btn-primary" disabled={isInValid} type="submit">Reset Password</button>
                    </div>
                    {error && <p>{error.message}</p>}
                </form>
            </div>
        );
    }
}

const PasswordForgetLink = () =>
    <div>
        <Link to={routes.PASSWORD_FORGET}>Forgot password?</Link>
    </div>

export default PasswordForgetPage;

export { PasswordForgetLink };