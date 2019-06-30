import React, { Component } from 'react';
import JiraService from '../../shared/services/JiraService';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './dashboard.css'
import Issues from '../../shared/components/issues/Issues';

class Dashboard extends Component {
    constructor (props) {
        super(props);

        this.jiraService = new JiraService();

        this.state = {
            logged: false,
            projects: [],
            component: ''
        }

        this.fetchProjects = this.fetchProjects.bind(this);
        this.getIssues = this.getIssues.bind(this);
    }

    async componentDidMount () {
        const cookie = localStorage.getItem('cookie');

        if (cookie)
            await this.fetchProjects();
    }

    async fetchProjects() {
        const projects = await this.jiraService.getProjects();

        this.setState({projects: projects});
    }

    async getIssues(projectId) {
        const issues = await this.jiraService.getIssues(projectId),
            isssuesComponent = <Issues issues={issues} />;

        this.setState({component: isssuesComponent})
    }

    render () {
        return (
            <div>
                <Typography className="title" gutterBottom variant="h2" component="h2">Projetos</Typography>
                {this.state.projects.map(project =>   
                    <Card className="project" id={project} key={project.projectId} onClick={() => this.getIssues(project.projectId)}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {project.projectName}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )}
                {this.state.component}
                
            </div>
        )
    }
}

export default Dashboard;