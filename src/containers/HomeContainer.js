import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import AppFrame from './../components/AppFrame';
import CustomersAction from './../components/CustomerActions'

class HomeContainer extends Component {
    render() {
        return (
            <div>
               <AppFrame 
                header='Home'
                body={
                    <div>
                        Esta es la pantalla inicial
                        <CustomersAction>
                            <Link to='/customers'>Listado de clientes</Link>
                        </CustomersAction>
                    </div>                        
                }
                />
            </div>
        );
    }
}

HomeContainer.propTypes = {

};

export default HomeContainer;