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
            issues: []
        }

        this.fetchProjects = this.fetchProjects.bind(this);
    }

    async componentWillMount () {
        const cookie = localStorage.getItem('cookie');

        if (cookie)
            await this.fetchProjects();
    }

    async fetchProjects() {
        const projects = await this.jiraService.getProjects();

        this.setState({projects: projects});
    }

    render () {
        return (
            <div>
                <Typography className="title" gutterBottom variant="h2" component="h2">Projetos</Typography>
                {this.state.projects.map((project, projectIndex) =>   
                    <Card className="project" key={projectIndex}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {project.projectName}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )}
            </div>
        )
    }
}

export default Dashboard;