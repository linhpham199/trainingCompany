import React, { Component } from 'react';
import { auth } from '../firebase';

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
}

class PasswordChangePage extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
        console.log(this.state)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state.passwordOne)
    }

    onSubmit = (event) => {
        const { 
            passwordOne
        } = this.state

        auth.doPasswordUpdate(passwordOne)
        .then(this.setState({...INITIAL_STATE}))
        .catch(error => this.setState({error}))

        event.preventDefault();
    }

    render() {
        const {
            passwordOne,
            passwordTwo,
            error
        } = this.state;

        const isInValid = passwordOne !== passwordTwo 
            || passwordOne === '';

        return (
            <div>
                <h1> Password Change </h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-row container-fluid">
                        <div className="form-group  col-sm-4"></div>
                        <div className="form-group col-sm-4">
                            <input value={passwordOne} placeholder="Enter new password" className="form-control" name="passwordOne" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group  col-sm-4"></div>
                        <div className="form-group  col-sm-4"></div>
                        <div className="form-group col-sm-4">
                            <input value={passwordTwo} placeholder="Confirm new password" className="form-control" name="passwordTwo" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group  col-sm-4"></div>
                    </div>
                    <div className="justify-content-center">
                        <button style={{margin:10}} className="btn btn-primary" disabled={isInValid} type="submit">Change Password</button>
                    </div>
                    {error && <p>{error.message}</p>}
                </form>
            </div>
        );
    }
}

export default PasswordChangePage;