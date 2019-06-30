import { Redirect } from 'react-router-dom';

const jira = require('../../conf/jira.json'),
    axios = require('axios');

class HttpService {
    constructor() {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        this.post = (path, data, notGuarded) => {
            
            if (!notGuarded)
                path += '?cookie=' + localStorage.getItem('cookie');

            return new Promise( async (resolve, reject) => {
                try {
                    const response = await axios.post(jira.base_url + path, data, config);

                    resolve(response.data);
                } catch (error) {
                    localStorage.removeItem('cookie');
                    reject(error);
                }
            }); 
        };

        this.get = (path, notGuarded) => {
            
            if (!notGuarded)
                path += '?cookie=' + localStorage.getItem('cookie');

            return new Promise( async (resolve, reject) => {
                try {
                    const response = await axios.get(jira.base_url + path, config);

                    resolve(response.data);
                } catch (error) {
                    localStorage.removeItem('cookie');
                    reject(error);
                }
            }); 
        };
    };
};
export default HttpService;