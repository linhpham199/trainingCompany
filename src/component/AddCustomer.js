import React, { Component } from 'react';
import SkyLight from 'react-skylight';


class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {id: '', firstname: '', lastname: '', streetaddress: '', postcode: '', city:'', email:'', phone:''}
    }

    handleChange = (event) => {
        this.setState ({
            [event.target.name]: event.target.value  
        })
        // console.log(this.state)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const newCustomer = {id: this.state.id, firstname: this.state.firstname, lastname: this.state.lastname, streetaddress: this.state.streetaddress, postcode: this.state.postcode, city: this.state.city, email: this.state.email, phone: this.state.phone};
        this.props.addCustomer(newCustomer);
        this.simpleDialog.hide();
    }

    render() {
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Customer's Information">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-sm-6">
                                <input placeholder="Id" className="form-control" name="id" onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-sm-6">
                                <input placeholder="First Name" className="form-control" name="firstname" onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-sm-6">
                                <input placeholder="Lastname" className="form-control" name="lastname" onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-sm-6">
                                <input placeholder="Street Address" className="form-control" name="streetaddress" onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-sm-6">
                                <input placeholder="Postcode" className="form-control" name="postcode" onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-sm-6">
                                <input placeholder="City" className="form-control" name="city" onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-sm-6">
                                <input placeholder="Email" className="form-control" name="email" onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-sm-6">
                                <input placeholder="Phone" className="form-control" name="phone" onChange={this.handleChange} />
                            </div>
                            <div className="justify-content-center">
                            <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                            </div>
                        </div>
                    </form>
                </SkyLight>
                <div className="justify-content-center">
                    <button style={{margin:10}} className="btn btn-primary" onClick={() => this.simpleDialog.show()}>Add Customer</button>
                </div>
                
            </div>
        );
    }
}

export default AddCustomer;