import BaseService from './base';
import { get, post } from './request';

class TagService extends BaseService {
  constructor() {
    super();
    this.baseUrl = `${this.baseUrl}/tag`;
    this.createUrl = `${this.baseUrl}/create`;
    this.getAllUrl = `${this.baseUrl}/all`;
  }

  create(body) {
    return post(this.createUrl, body);
  }

  getAll() {
    return get(this.getAllUrl);
  }
}

export default TagService;