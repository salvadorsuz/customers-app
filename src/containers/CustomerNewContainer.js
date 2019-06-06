import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';  
import AppFrame from './../components/AppFrame';
import CustomerEdit from './../components/CustomerEdit';
import { insertCustomer } from './../actions/insertCustomer';

class CustomerNewContainer extends Component {

    handleSubmit = values => {
        console.log(JSON.stringify(values));
        return this.props.insertCustomer(values).then( r => {
            console.log('After promise submit new customer');
            if(r.error) {
                throw new SubmissionError(r.payload);   
            }
        });
    };

    handleOnBack = () => {
        console.log('back');
        this.props.history.goBack();
    };

    handleOnSubmitSuccess = () => {
        this.props.history.goBack();
    };

    renderBody = () => {
        const newCustomer = {
            "id": "",
            "dni": "",
            "name": "",
            "age": 0
        };

        return <CustomerEdit
                {...newCustomer}
                onSubmit={this.handleSubmit} 
                onBack={this.handleOnBack}
                onSubmitSuccess={this.handleOnSubmitSuccess}
        />
    };

    render() {
        return (
            <div>
                <AppFrame 
                    header='Nuevo cliente'
                    body={this.renderBody()} />
            </div>
        );
    }
}

const mapDispatchToProps = { 
    insertCustomer
};

export default withRouter(connect(null, mapDispatchToProps)(CustomerNewContainer));