import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppFrame from './../components/AppFrame';
import CustomersActions from '../components/CustomerActions'

class HomeContainer extends Component {
    
    handleOnClick = () => {
        console.log("Click");
        this.props.history.push('/customers');
    }

    renderBody = () => (
        <div>
            Esta es la pantalla inicial
            <CustomersActions>
                <button onClick={this.handleOnClick}>Listado de clientes</button>
            </CustomersActions>
        </div>    
    )

    render() {
        return (
            <div>
                <AppFrame 
                    header='Home'
                    body={this.renderBody()} />
            </div>
        );
    }
}

export default withRouter(HomeContainer);