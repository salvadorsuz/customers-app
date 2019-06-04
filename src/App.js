import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';
import CustomersContainer from './containers/CustomersContainer';
import CustomerNewContainer from './containers/CustomerNewContainer';
import CustomerContainer from './containers/CustomerContainer';

class App extends Component {
/*  
  renderHome = () => <HomeContainer />;
  
  renderCustomerListContainer = () => <CustomersContainer />;

  renderCustomerNewContainer = () => <CustomerNewContainer />;

  renderCustomerContainer = () => <CustomerContainer />;

  renderCustomerEditContainer = () => <CustomerContainer />;
*/  
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomeContainer}/>
          <Route exact path="/customers" component={CustomersContainer}/>
          <Switch>
            <Route path="/customers/new" component={CustomerNewContainer}/>
            <Route path="/customers/:dni" render={props => <CustomerContainer dni={props.match.params.dni}/>}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
