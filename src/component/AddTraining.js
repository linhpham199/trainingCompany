import React, { Component } from 'react';
import SkyLight from 'react-skylight';

class AddTraining extends Component {
    constructor(props) {
        super(props);
        this.state = {id: '', date: '', duration: '', activity: '', customer: ''}
    }

    handleChange = (event) => {
        if (event.target.name === "customer") {
            this.setState({
                [event.target.name] : 'https://customerrest.herokuapp.com/api/customers/' + event.target.value
            })          
        } else {
            this.setState ({
                [event.target.name]: event.target.value  
            })
        }
        // console.log(this.state)
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const newTraining = {id: this.state.id, date: this.state.date, duration: this.state.duration, activity: this.state.activity, customer: this.state.customer};
        this.props.addTraining(newTraining);
        this.simpleDialog.hide();
    }

    render() {
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Training Information">
                    <form>
                        <div className="form-group">
                            <input placeholder="Id" className="form-control" name="id" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input placeholder="Date" className="form-control" name="date" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input placeholder="Duration" className="form-control" name="duration" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input placeholder="Activity" className="form-control" name="activity" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input placeholder="Customer Id" className="form-control" name="customer" onChange={this.handleChange} />
                        </div>
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                    </form>
                </SkyLight>
                <button style={{margin:10}} className="btn btn-primary" onClick={() => this.simpleDialog.show()}>Add Training</button>
            </div>
        );
    }
}

export default AddTraining;