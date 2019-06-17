import HttpService from './HttpService';

class JiraService {
    constructor() {
        this.httpService = new HttpService();
        this.getProjects = async () => {
            try {
                const requestData = await this.httpService.get('projects');

                return requestData;
            } catch (error) {
                throw error;
            }

        }
    }
}

export default JiraService;