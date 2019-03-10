import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  HomeWithUserConsumer,
  NotFound
} from './Pages';
import {
  NavbarWithUserContext,
  Footer
} from '../Common/Commons';
import {
  LoginWithUserConsumer,
  RegisterWithUserConsumer,
  SetAdminRoleWithUserConsumer
} from '../User/Users';
import {
  AllDevicesWithUserContext,
  CreateDeviceWithUserContext,
  DeviceDetailsWithUserContext
} from '../Device/Devices';
import {
  CreateCategoryWithUserContext,
  AllCategoriesWithUserContext
} from '../Category/Categories';

import { UserProvider } from '../../contexts/UserContext';

import withTokenGetter from '../../hocs/withTokenGetter';

const ToastCloseButton = () => {
  return <span>&otimes;</span>;
}

class AppBase extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <UserProvider value={{ user: this.props.user, updateUser: this.props.updateUser }}>
            <ToastContainer autoClose={3000} hideProgressBar={true} closeButton={<ToastCloseButton />} />
            <NavbarWithUserContext toast={toast} />
            <Switch>
              <Route path="/" exact render={(props) => <HomeWithUserConsumer {...props} toast={toast} />} />
              <Route path="/user/login" exact render={(props) => <LoginWithUserConsumer {...props} toast={toast} />} />
              <Route path="/user/register" exact render={(props) => <RegisterWithUserConsumer {...props} toast={toast} />} />
              <Route path="/user/setadminrole" exact render={(props) => <SetAdminRoleWithUserConsumer {...props} toast={toast} />} />
              <Route path="/category/create" exact render={(props) => <CreateCategoryWithUserContext {...props} toast={toast} />} />
              <Route path="/category/all" exact render={(props) => <AllCategoriesWithUserContext {...props} toast={toast} />} />
              <Route path="/device/create" exact render={(props) => <CreateDeviceWithUserContext {...props} toast={toast} />} />
              <Route path="/device/all" exact render={(props) => <AllDevicesWithUserContext {...props} toast={toast} />} />
              <Route path="/device/:id" render={(props) => <DeviceDetailsWithUserContext {...props} toast={toast} />} />
              <Route component={NotFound} />
            </Switch>
          </UserProvider>
          <Footer />
        </Fragment>
      </Router>
    );
  }
}

const App = withTokenGetter(AppBase);

export default App;