import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../firebase';

const SignUpPage = ({history}) => 
    <div>
        <h1>Sign Up</h1>
        <SignUpForm history={history}/>
    </div>

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
}

class SignUpForm extends Component {
    constructor(props){
        super(props);
        this.state = {
           ...INITIAL_STATE,
        };
    }

    handleChange = (event) => {
        this.setState ({
            [event.target.name] : event.target.value
        });
        console.log(this.state);
    }

    onSubmit = (event) => {
        const {
            username,
            email,
            passwordOne,
        } = this.state;

        const {history} = this.props;

        // firebase.auth().doCreateUserWithEmailAndPassword(email.passwordOne)
        //     .then(authUser => {
        //         this.setState(() => ({...INITIAL_STATE}));
        //         history.push('/home');
        //     })
        //     .catch(error => {
        //         this.setState({error: error});
        // });
    
        // event.preventDefault();

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState(() => ({...INITIAL_STATE}));
                history.push('/home');
            })
            .catch(error => {
                this.setState({error: error});
            });
        
        event.preventDefault();
            
    }

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
          } = this.state; //destructuring assignment

        const isInValid = 
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '' ;

        return (
            <form onSubmit = {this.onSubmit}>
                <div className="form-row container-fluid">
                    <div className="form-group  col-sm-3"></div>
                    <div className="form-group col-sm-3">
                        <input value={username} placeholder="Username" className="form-control" name="username" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group col-sm-3">
                        <input value={email} placeholder="Email" className="form-control" name="email" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group col-sm-3"></div>
                    <div className="form-group col-sm-3"></div>
                    <div className="form-group col-sm-3">
                        <input value={passwordOne} type="password" placeholder="Password" className="form-control" name="passwordOne" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group col-sm-3">
                        <input value={passwordTwo} type="password" placeholder="Confirm Password" className="form-control" name="passwordTwo" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group col-sm-3"></div>
                </div>
                <div className="justify-content-center">
                    <button style={{margin:10}} className="btn btn-primary" disabled={isInValid} type="submit">Sign Up</button>
                </div>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = () =>
    <p>
        Don't have an account? {' '}
        <Link to="/signup">Sign Up</Link>
    </p>

export default withRouter(SignUpPage);
export {
    SignUpForm,
    SignUpLink,
};