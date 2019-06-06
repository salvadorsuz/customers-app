import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SubmissionError } from 'redux-form';  
import AppFrame from './../components/AppFrame';
import { getCustomerByDni } from './../selectors/customers';
import CustomerEdit from './../components/CustomerEdit';
import CustomerData from './../components/CustomerData';
import {fetchCustomers} from './../actions/fetchCustomers';
import {updateCustomer} from './../actions/updateCustomer';

class CustomerContainer extends Component {

    componentDidMount() {
        if(!this.props.customer) {
            this.props.fetchCustomers();
        }
    };

    handleSubmit = values => {
        console.log(JSON.stringify(values));
        const {id} = values;
        return this.props.updateCustomer(id,values).then( r => {
            console.log('After promise submit');
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

    renderBody = ({customer}) => (
        <Route path="/customers/:dni/edit" children={
            ({ match }) => {
                const CustomerControl =  match ? CustomerEdit : CustomerData;
                return <CustomerControl {...customer} 
                    onSubmit={this.handleSubmit} 
                    onBack={this.handleOnBack}
                    onSubmitSuccess={this.handleOnSubmitSuccess}
                    />
            }
        } />
    )

    render() {
        return (
            <div>
                <AppFrame 
                    header={`Cliente ${this.props.dni}`}
                    body={this.renderBody(this.props)}
                />
            </div>
        );
    }
}

CustomerContainer.propTypes = {
    dni:PropTypes.string.isRequired,
    customer: PropTypes.object,
    fetchCustomers: PropTypes.func.isRequired,
    updateCustomer: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
    customer: getCustomerByDni(state, props),
});

const mapDispatchToProps = { 
    fetchCustomers,
    updateCustomer
};

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerContainer));