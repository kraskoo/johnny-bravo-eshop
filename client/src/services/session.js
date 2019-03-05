import { post } from "./request";
import BaseService from "./base";

class SessionService extends BaseService {
  constructor() {
    super();
    this.baseUrl = `${this.baseUrl}/session`;
    this.createSessionUrl = `${this.baseUrl}/create`;
    this.getSessionUrl = `${this.baseUrl}/get`;
    this.deleteSessionUrl = `${this.baseUrl}/remove`;
  }

  addSession(session) {
    return post(this.createSessionUrl, session);
  }

  getSession(session) {
    return post(this.getSessionUrl, session);
  }

  deleteSession(body) {
    return post(this.deleteSessionUrl, body);
  }
}

export default SessionService;