import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import {ToastContainer, toast} from 'react-toastify';
import AddCustomer from './AddCustomer';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'


class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {customers: [], customerId: []};
    }

    componentDidMount() {
        this.loadCustomers();
    }

    loadCustomers() {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(res => res.json())
        .then(resData => {
            // console.log(resData.content)
            this.setState({customers: resData.content});
            resData.content.forEach((row) =>
                this.setState({customerId: 
                    [ ...this.state.customerId, row.links[0].href.substr(49)]  
                })
            )
            // console.log(this.state.customers);
            // console.log(this.state.customerId);
        })
    }

    addCustomer = (newCustomer) => {
        console.log(this.state.customerId)
        var existedId = 0;
        for (var i = 0; i < this.state.customerId.length; i = i+1) {
            if (this.state.customerId[i] === newCustomer.id) {
                // console.log(this.state.customerId[i])
                toast.error("This customer Id is already existed!", {
                    position: toast.POSITION.TOP_CENTER
                });
                existedId =+ 1;
            }
        }
        if (existedId === 0) {
            fetch('https://customerrest.herokuapp.com/api/customers', {method: 'POST'
                , headers : {'Content-Type': 'application/json'}
                , body: JSON.stringify(newCustomer)
            })
            .then(res => this.loadCustomers())
            .catch(err => console.error(err))
            toast.success("The new customer is added successfully!",{
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    deleteCustomer = (value)  => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'This customer will be deleted. Are you sure?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    fetch(value, {method: 'DELETE'})
                     .then(res => this.loadCustomers())
                     .catch(err => console.error(err))
                    
                    toast.success("Customer is deleted succesfully!", {
                        position: toast.POSITION.TOP_CENTER
                    });         
                }
              },
              {
                label: 'No',
                
              }
            ]
          })
    }

    render() {
        return (
            <div className = "container">
                <h2>Customer List</h2>
                <AddCustomer addCustomer={this.addCustomer} />
                <ToastContainer autoClose={2000} closeOnCliCK />
                <ReactTable
                    data={this.state.customers}
                    columns={[
                        {
                        columns: [
                            {
                                Header: "Id",
                                accessor: (row) => {
                                    return row.links[0].href.substr(49)
                                },
                                id: "id"
                            },
                            {
                                Header: "Firstname",
                                accessor: "firstname",
                            },
                            {
                                Header: "Last Name",
                                accessor: "lastname",
                            },
                            {
                                Header: "Street Address",
                                accessor: "streetaddress",
                            },
                            {
                                Header: "Postcode",
                                accessor: "postcode",
                            },
                            {
                                Header: "City",
                                accessor: "city",
                            },
                            {
                                Header: "Email",
                                accessor: "email",
                            },
                            {
                                Header: "Phone",
                                accessor: "phone",
                            },
                            {
                                Header: "",
                                accessor: "links[0].href",
                                filterable: false,
                                Cell: (row) => (<button onClick={
                                    // console.log(row),
                                    () => this.deleteCustomer(row.value)}>Delete</button>),
                            }
                        ]
                        }
                        
                    ]}
                    defaultSorted={[
                        {
                          id: "links[0].href",
                          desc: false
                        }
                    ]}
                    
                    filterable
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
            
            </div>
        );
    }
}

export default Customers;