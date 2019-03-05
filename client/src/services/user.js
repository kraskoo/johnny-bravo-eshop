import { post } from './request';
import BaseService from './base';

class UserService extends BaseService {
  constructor() {
    super();
    this.loginUrl = `${this.baseUrl}/user/login`;
    this.registerUrl = `${this.baseUrl}/user/register`;
  }

  login(body) {
    return post(this.loginUrl, body);
  }

  register(body) {
    return post(this.registerUrl, body);
  }
}

export default UserService;