import { get, post } from './request';
import BaseService from './base';

class UserService extends BaseService {
  constructor() {
    super();
    this.baseUrl = `${this.baseUrl}/user`;
    this.loginUrl = `${this.baseUrl}/login`;
    this.registerUrl = `${this.baseUrl}/register`;
    this.allRegularUrl = `${this.baseUrl}/allRegular`;
    this.setToAdminUrl = `${this.baseUrl}/setadmin`;
  }

  login(body) {
    return post(this.loginUrl, body);
  }

  register(body) {
    return post(this.registerUrl, body);
  }

  getAllRegularUsers() {
    return get(this.allRegularUrl);
  }

  setToAdminRole(id) {
    const url = `${this.setToAdminUrl}/${id}`;
    return get(url);
  }
}

export default UserService;