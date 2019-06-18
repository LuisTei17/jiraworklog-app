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

        };

        this.getIssues = async (projectId) => {
            try {
                const requestData = await this.httpService.get('issues/' + projectId);
                
                return requestData;
            } catch (error) {
                throw error;
            }
        }

        this.logHours = async (data, issueId) => {
            try {
                const requestData = await this.httpService.post('worklog/issues/' + issueId, data);

                return requestData;
            } catch (error) {
                throw error;
            }
        }
    }
}

export default JiraService;