import { post } from "./request";
import BaseService from "./base";

class SessionService extends BaseService {
  constructor() {
    super();
    this.createSessionUrl = `${this.baseUrl}/session/create`;
    this.getSessionUrl = `${this.baseUrl}/session/get`;
    this.logoutUrl = `${this.baseUrl}/session/remove`;
  }

  addSession(session) {
    return post(this.createSessionUrl, session);
  }

  getSession(session) {
    return post(this.getSessionUrl, session);
  }

  deleteSession(body) {
    return post(this.logoutUrl, body);
  }
}

export default SessionService;