import React, { Component } from 'react';
import JiraService from '../../services/JiraService';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import WorkLogForm from '../workLogForm/WorkLogForm';
import './issues.css';

class Issues extends Component {

    constructor(props) {
        super(props);

        this.jiraService = new JiraService();

        this.state = {
            issues: props.issues,
            open: false,
            issueId: null
        }

    }

    componentWillReceiveProps (props) {
        this.setState({issues: props.issues});
    }

    open (issueId) {
        this.setState({open: true, issueId: issueId});
    }

    render () {
        return (
            <div>
                <Typography className="title" gutterBottom variant="h2" component="h2">Issues</Typography>
                {this.state.issues.map(issue =>   
                    <Card className="issue" key={issue.issue_id} onClick={() => this.open(issue.issue_id)}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {issue.issue_key}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )}
                <Modal open={this.state.open}>
                    <WorkLogForm issueId={this.state.issueId} />
                </Modal>
            </div>

        )
    }
}

export default Issues;