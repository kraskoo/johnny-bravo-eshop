import BaseService from './base';
import { get, post } from './request';

class CategoryService extends BaseService {
  constructor() {
    super();
    this.baseUrl = `${this.baseUrl}/category`;
    this.createUrl = `${this.baseUrl}/create`;
    this.editUrl = `${this.baseUrl}/edit`;
    this.getAllUrl = `${this.baseUrl}/all`;
  }

  create(body) {
    return post(this.createUrl, body);
  }

  edit(id, name) {
    const url = `${this.editUrl}/${id}/${name}`;
    return get(url);
  }

  getAll() {
    return get(this.getAllUrl);
  }
}

export default CategoryService;