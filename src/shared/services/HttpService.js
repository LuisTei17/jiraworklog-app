const jira = require('../../conf/jira.json'),
    axios = require('axios');

class HttpService {
    constructor() {
        this.post = (path, data, notGuarded) => {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            if (!notGuarded)
                config.headers.cookie = localStorage.getItem('cookie');

            return new Promise( async (resolve, reject) => {
                try {
                    const response = await axios.post(jira.base_url + path, data, config);

                    resolve(response.data);
                } catch (error) {
                    reject(error);
                }
            }); 
        };

        this.get = (path, notGuarded) => {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            if (!notGuarded)
                config.headers.cookie = localStorage.getItem('cookie');

            return new Promise( async (resolve, reject) => {
                try {
                    const response = await axios.get(jira.base_url + path, config);

                    resolve(response.data);
                } catch (error) {
                    reject(error);
                }
            }); 
        };
    };
};
export default HttpService;