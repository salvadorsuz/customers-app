import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CustomersList from '../components/CustomerList';
import CustomersActions from '../components/CustomerActions';
import AppFrame from './../components/AppFrame';
import {fetchCustomers} from './../actions/fetchCustomers';
import {getCustomers} from './../selectors/customers';

class CustomersContainer extends Component {

    componentDidMount() {
        this.props.fetchCustomers();
    }

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
                    body={this.renderBody(this.props.customers)} />
            </div>
        );
    }
}

CustomersContainer.propTypes = {
    customers: PropTypes.array.isRequired,
    fetchCustomers: PropTypes.func.isRequired,
};

CustomersContainer.defaultProps = {
    customers: [],
};

/*
const mapDispatchToProps = dispatch => ({
    fetchCustomers: () => dispatch(fetchCustomers()),
});
*/
const mapDispatchToProps = { fetchCustomers };

const mapStateToProps = state => ({
    customers: getCustomers(state),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomersContainer));