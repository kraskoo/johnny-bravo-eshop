import BaseService from './base';
import { get, post } from './request';

class CategoryService extends BaseService {
  constructor() {
    super();
    this.baseUrl = `${this.baseUrl}/category`;
    this.getUrl = `${this.baseUrl}/get`;
    this.getAllUrl = `${this.baseUrl}/all`;
    this.createUrl = `${this.baseUrl}/create`;
    this.editUrl = `${this.baseUrl}/edit`;
    this.deleteUrl = `${this.baseUrl}/delete`;
  }

  get(id) {
    const url = `${this.getUrl}/${id}`;
    return get(url);
  }

  getAll() {
    return get(this.getAllUrl);
  }

  create(body) {
    return post(this.createUrl, body);
  }

  edit(id, name) {
    const url = `${this.editUrl}/${id}/${name}`;
    return get(url);
  }

  delete(id) {
    const url = `${this.deleteUrl}/${id}`;
    return get(url);
  }
}

export default CategoryService;