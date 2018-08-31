import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import * as moment from 'moment';
import AddTraining from './AddTraining';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'


class Trainings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trainings: [],
            customers: {},
            trainingIds: []
        };
    }

    componentDidMount() {
        this.loadTrainings();  
         
    }

    loadTrainings() {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(res => res.json())
        .then(resData => {
            // console.log(resData.content)
            this.setState({trainings: resData.content});
            console.log(this.state.trainings);
            resData.content.forEach((row) => {
                fetch(row.links[2].href)
                .then(res => res.json())
                .then((customerData) => {
                    const trainingId = row.links[0].href.substr(49)
                    const customerId = customerData.links[0].href.substr(49)
                    this.setState({
                        customers: {...this.state.customers, [trainingId]: customerId },
                        trainingIds: [...this.state.trainingIds, trainingId]
                    })
                    // console.log(this.state.customers)
                    // console.log(this.state.trainingIds)
                })
            });
        })
    }

    addTraining = (newTraining) => {
        var existedId = 0;
        for (var i = 0; i < this.state.trainingIds.length; i = i+1) {
            if (this.state.trainingIds[i] === newTraining.id) {
                // console.log(this.state.trainingIds[i])
                toast.error("This training Id is already existed!", {
                    position: toast.POSITION.TOP_CENTER
                });
                existedId =+ 1;
            }
        }
        if (existedId === 0) {
            fetch('https://customerrest.herokuapp.com/api/trainings', {method: 'POST'
                , headers : {'Content-Type': 'application/json'}
                , body: JSON.stringify(newTraining)
            })
            .then(res => this.loadTrainings())
            .catch(err => console.error(err))
            toast.success("The new training session is added successfully!",{
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    deleteTraining = (value) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'This training session will be deleted. Are you sure?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    fetch(value, {method: 'DELETE'})
                     .then(res => this.loadTrainings())
                     .catch(err => console.error(err))
                    
                    toast.success("Training session is deleted succesfully!", {
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
        console.log(this.state)
        return (
            <div className = "container">
                <h2>Trainings</h2>
                <AddTraining addTraining={this.addTraining}/>
                <ToastContainer autoClose={false} closeOnCliCK />
                <ReactTable
                    data={this.state.trainings}
                    columns={[
                        {
                        columns: [
                            {
                                Header: "Id",
                                accessor: (row) => {
                                    return row.links[0].href.substr(49);
                                },
                                id: "id",
                            },
                            {
                                Header: "Date",
                                accessor: (row) => {
                                return moment(row.date).format('YYYY-M-D')                        
                                },
                                id: 'date',
                            },
                            {
                                Header: "Duration in minutes",
                                accessor: "duration",
                            },
                            {
                                Header: "Activity",
                                accessor: "activity",
                            },
                            {
                                Header: "Customers",
                                accessor: (row) => {
                                    const trainingId = row.links[0].href.substr(49)
                                    return this.state.customers[trainingId]
                                },
                                id: 'customers'
                            },
                            {
                                Header: "",
                                accessor: "links[0].href",
                                filterable: false,
                                Cell: (row) => (<button onClick={
                                    // console.log(row),
                                    () => this.deleteTraining(row.value)}>Delete</button>),
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

export default Trainings;