import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import CustomersList from '../components/CustomerList';
import CustomersActions from '../components/CustomerActions';
import AppFrame from './../components/AppFrame';

const customers = [
    {"dni":"123", "name": "Pepe", "age": 30},
    {"dni":"456", "name": "Paco", "age": 31},
    {"dni":"789", "name": "Antonio", "age": 32},
    {"dni":"741", "name": "jose", "age": 33},
];

class CustomersContainer extends Component {

    handleAddNew = () => {
        console.log('Cliente nuevo');
        this.props.history.push('/customers/new');
    }

    renderBody = (customers) => (
        <div>
            <CustomersList 
                customers={customers} 
                urlPath={'/customers'}>
            </CustomersList>
            <CustomersActions>
                <button onClick={this.handleAddNew}>Nuevo</button>
            </CustomersActions>
        </div>
    )

    render() {
        return (
            <div>
                <AppFrame 
                    header='Listado de clientes'
                    body={this.renderBody(customers)} />
            </div>
        );
    }
}

CustomersContainer.propTypes = {
    customers: PropTypes.array,
};

export default withRouter(CustomersContainer);