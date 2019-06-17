import HttpService from './HttpService';

class LoginService {
    constructor() {
        this.httpService = new HttpService();
        this.login = async (data) => {
            try {
                const requestData = await this.httpService.post('auth/', data, true);
                localStorage.setItem('cookie', requestData.cookie);
                return requestData;
            } catch (error) {
                throw error;
            }

        }
    }
}

export default LoginService;