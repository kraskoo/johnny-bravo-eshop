import BaseService from './base';
import { get, post } from './request';

class DeviceService extends BaseService {
  constructor() {
    super();
    this.baseUrl = `${this.baseUrl}/device`;
    this.createUrl = `${this.baseUrl}/create`;
    this.searchUrl = `${this.baseUrl}/search`;
    this.getAllUrl = `${this.baseUrl}/all`;
    this.getByIdUrl = `${this.baseUrl}/get`;
    this.buyUrl = `${this.baseUrl}/buy`;
    this.editUrl = `${this.baseUrl}/edit`;
    this.deleteUrl = `${this.baseUrl}/delete`;
  }

  create(body) {
    return post(this.createUrl, body);
  }

  search(search) {
    const url = `${this.searchUrl}/${search}`;
    return get(url);
  }

  getAll() {
    return get(this.getAllUrl);
  }

  get(id) {
    const url = `${this.getByIdUrl}/${id}`;
    return get(url);
  }

  buy(id, count) {
    const url = `${this.buyUrl}/${id}/${count}`;
    return get(url);
  }

  edit(id, body) {
    const url = `${this.editUrl}/${id}`;
    return post(url, body);
  }

  delete(id) {
    const url = `${this.deleteUrl}/${id}`;
    return get(url);
  }
}

export default DeviceService;