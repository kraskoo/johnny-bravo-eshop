import BaseService from './base';
import { get, post } from './request';

class DeviceService extends BaseService {
  constructor() {
    super();
    this.baseUrl = `${this.baseUrl}/device`;
    this.createUrl = `${this.baseUrl}/create`;
    this.getAllUrl = `${this.baseUrl}/all`;
    this.getByIdUrl = `${this.baseUrl}/get`;
    this.deleteUrl = `${this.baseUrl}/delete`;
  }

  create(body) {
    return post(this.createUrl, body);
  }

  getAll() {
    return get(this.getAllUrl);
  }

  getById(id) {
    const url = `${this.getByIdUrl}/${id}`;
    return get(url);
  }

  delete(id) {
    const url = `${this.deleteUrl}/${id}`;
    return get(url);
  }
}

export default DeviceService;