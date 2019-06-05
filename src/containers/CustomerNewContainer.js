import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppFrame from './../components/AppFrame';
import CustomerActions from '../components/CustomerActions';

class CustomerNewContainer extends Component {

    handleCreateCustomer= () => {
        console.log('cliente creado');
    }

    renderBody = () => (
        <div>
           Datos nuevo cliente
            <CustomerActions>
                <button onClick={this.handleCreateCustomer}>Crear cliente</button>
            </CustomerActions>
        </div>
    )

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

export default withRouter(CustomerNewContainer);