import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from '../../contexts/UserContext';
import withTokenGetter from '../../hocs/withTokenGetter';
import './app.css';

import { Home, NotFound } from './Pages';
import { NavbarWithUserContext as Navbar, Footer } from '../Common/Commons';
import {
  LoginWithUserConsumer as Login,
  RegisterWithUserConsumer as Register,
  SetAdminRoleWithUserConsumer as SetAdminRole
} from '../User/Users';
import {
  AllDevicesWithUserContext as AllDevices,
  SearchDevicesWithUserContext as SearchDevices,
  CreateDeviceWithUserContext as CreateDevice,
  EditDeviceWithUserContext as EditDevice,
  DeleteDeviceWithUserContext as DeleteDevice,
  DeviceDetailsWithUserContext as DeviceDetails,
  BuyDevicesWithUserContext as BuyDevices
} from '../Device/Devices';
import {
  CreateCategoryWithUserContext as CreateCategory,
  EditCategoryWithUserContext as EditCategory,
  DeleteCategoryWithUserContext as DeleteCategory,
  AllCategoriesWithUserContext as AllCategories
} from '../Category/Categories';

const ToastCloseButton = () => {
  return <span>&otimes;</span>;
}

class AppBase extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <UserProvider value={{ user: this.props.user, updateUser: this.props.updateUser }}>
            <ToastContainer position="top-left" autoClose={3000} hideProgressBar={true} closeButton={<ToastCloseButton />} />
            <Navbar toast={toast} />
            <Switch>
              <Route path="/" exact render={(props) => <Home {...props} toast={toast} />} />
              <Route path="/user/login" exact render={(props) => <Login {...props} toast={toast} />} />
              <Route path="/user/register" exact render={(props) => <Register {...props} toast={toast} />} />
              <Route path="/user/setadminrole" exact render={(props) => <SetAdminRole {...props} toast={toast} />} />
              <Route path="/category/create" exact render={(props) => <CreateCategory {...props} toast={toast} />} />
              <Route path="/category/edit/:id" exact render={(props) => <EditCategory {...props} toast={toast} />} />
              <Route path="/category/delete/:id" exact render={(props) => <DeleteCategory {...props} toast={toast} />} />
              <Route path="/category/all" exact render={(props) => <AllCategories {...props} toast={toast} />} />
              <Route path="/device/create" exact render={(props) => <CreateDevice {...props} toast={toast} />} />
              <Route path="/device/edit/:id" exact render={(props) => <EditDevice {...props} toast={toast} />} />
              <Route path="/device/delete/:id" exact render={(props) => <DeleteDevice {...props} toast={toast} />} />
              <Route path="/device/buy/:id" exact render={(props) => <BuyDevices {...props} toast={toast} />} />
              <Route path="/device/search/:search" exact render={(props) => <SearchDevices {...props} toast={toast} />} />
              <Route path="/device/all" exact render={(props) => <AllDevices {...props} toast={toast} />} />
              <Route path="/device/:id" exact render={(props) => <DeviceDetails {...props} toast={toast} />} />
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