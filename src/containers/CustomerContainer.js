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
import {deleteCustomer} from './../actions/deleteCustomer';

class CustomerContainer extends Component {

    componentDidMount() {
        if(!this.props.customer) {
            this.props.fetchCustomers();
        }
    };

    handleOnSubmit = values => {
        console.log(JSON.stringify(values));
        const {id} = values;
        return this.props.updateCustomer(id,values).then( r => {
            console.log('After promise update');
            if(r.error) {
                throw new SubmissionError(r.payload);   
            }
        }).catch( 
            e => {
                console.log('Error on update ');
                throw new SubmissionError(e);
            }
        );
    };

    handleOnBack = () => {
        console.log('back');
        this.props.history.goBack();
    };

    handleOnSubmitSuccess = () => {
        this.props.history.goBack();
    };

    handleOnDelete = id => {
        console.log('delete '+id);
        return this.props.deleteCustomer(id).then( r => {
            console.log('After promise delete');
            this.props.history.goBack();
        }).catch( 
            e => {
                console.log('Error on delete');
                throw new SubmissionError(e);
            }
        );
    };

    renderCustomerControl = (isEdit, isDelete) => {
        if(this.props.customer) {
            const CustomerControl =  isEdit ? CustomerEdit : CustomerData;
            return <CustomerControl {...this.props.customer} 
                    onSubmit={this.handleOnSubmit} 
                    onBack={this.handleOnBack}
                    onSubmitSuccess={this.handleOnSubmitSuccess}
                    isDeleteAllow={!!isDelete}
                    onDelete={this.handleOnDelete} />
        }

        return null;
    }

    renderBody = () => (
        <Route 
            path="/customers/:dni/edit" 
            children={({ match: isEdit }) => (
                <Route 
                    path="/customers/:dni/del" 
                    children={({ match: isDelete }) => (
                        this.renderCustomerControl(isEdit, isDelete)
                    )} 
                />
            )} 
        />
    )

    render() {
        return (
            <div>
                <AppFrame 
                    header={`Cliente ${this.props.dni}`}
                    body={this.renderBody()}
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
    deleteCustomer: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
    customer: getCustomerByDni(state, props),
});

const mapDispatchToProps = { 
    fetchCustomers,
    updateCustomer,
    deleteCustomer
};

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerContainer));