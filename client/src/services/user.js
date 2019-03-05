import { post } from './request';
import BaseService from './base';

class UserService extends BaseService {
  constructor() {
    super();
    this.baseUrl = `${this.baseUrl}/user`;
    this.loginUrl = `${this.baseUrl}/login`;
    this.registerUrl = `${this.baseUrl}/register`;
  }

  login(body) {
    return post(this.loginUrl, body);
  }

  register(body) {
    return post(this.registerUrl, body);
  }
}

export default UserService;