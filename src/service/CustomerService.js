import axios from 'axios';

export class CustomerService {
  getCustomers() {
    return axios.get('data.json').then((res) => res.data.data);
  }
}
