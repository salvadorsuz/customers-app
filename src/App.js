import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';
import CustomersContainer from './containers/CustomersContainer';

class App extends Component {
  
  renderHome = () => <HomeContainer />;
  
  renderCustomerListContainer = () => <CustomersContainer />;

  renderCustomerContainer = () => <h1>Customer Container</h1>;

  renderCustomerEditContainer = () => <h1>Customer Edit Container</h1>;
  
  renderCustomerNewContainer = () => <h1>Customer New Container</h1>;

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={this.renderHome}/>
          <Route exact path="/customers" component={this.renderCustomerListContainer}/>
          <Switch>
            <Route path="/customers/new" component={this.renderCustomerNewContainer}/>
            <Route path="/customers/:dni/edit" component={this.renderCustomerEditContainer}/>
            <Route path="/customers/:dni" component={this.renderCustomerContainer}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
