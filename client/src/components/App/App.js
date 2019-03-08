import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../Common/Navbar/Navbar';
import Footer from '../Common/Footer/Footer';
import Home from '../Home/Home';
import Login from '../User/Login/Login';
import Register from '../User/Register/Register';
import SetAdminRole from '../User/Admin/SetAdminRole/SetAdminRole';
import NotFound from '../NotFound/NotFound';
import CreateCategory from '../Category/Create';
import AllCategories from '../Category/All';
import CreateDevice from '../Device/Create';
import AllDevices from '../Device/All';
import DeviceDetails from '../Device/Details';

import { UserProvider, UserConsumer } from '../../contexts/UserContext';

import withConsumer from '../../hocs/withConsumer';
import withTokenGetter from '../../hocs/withTokenGetter';

const HomeWithUserConsumer = withConsumer(Home, UserConsumer);
const RegisterWithUserConsumer = withConsumer(Register, UserConsumer);
const LoginWithUserConsumer = withConsumer(Login, UserConsumer);
const SetAdminRoleWithUserConsumer = withConsumer(SetAdminRole, UserConsumer);
const NavbarWithUserContext = withConsumer(Navbar, UserConsumer);
const CreateCategoryWithUserContext = withConsumer(CreateCategory, UserConsumer);
const AllCategoriesWithUserContext = withConsumer(AllCategories, UserConsumer);
const CreateDeviceWithUserContext = withConsumer(CreateDevice, UserConsumer);
const AllDevicesWithUserContext = withConsumer(AllDevices, UserConsumer);
const DeviceDetailsWithUserContext = withConsumer(DeviceDetails, UserConsumer);

function ToastCloseButton() {
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