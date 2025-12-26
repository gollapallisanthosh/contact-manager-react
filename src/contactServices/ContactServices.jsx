import axios from "axios";

export class ContactService {
  static SERVER_URL = "http://localhost:5000";

  // GET all contacts
  static getAllContacts() {
    let dataURL = `${this.SERVER_URL}/contacts`;
    return axios.get(dataURL);
  }

  // GET single contact
  static getContact(contactId) {
    let dataURL = `${this.SERVER_URL}/contacts/${contactId}`;
    return axios.get(dataURL);
  }

  // CREATE contact
  static createContact(contact) {
    let dataURL = `${this.SERVER_URL}/contacts`;
    return axios.post(dataURL, contact);
  }

  // UPDATE contact
  static updateContact(contactId, contact) {
    let dataURL = `${this.SERVER_URL}/contacts/${contactId}`;
    return axios.put(dataURL, contact);
  }

  // DELETE contact
  static deleteContact(contactId) {
    let dataURL = `${this.SERVER_URL}/contacts/${contactId}`;
    return axios.delete(dataURL);
  }
}
