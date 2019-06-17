import React, { Component } from 'react';
import JiraService from '../../services/JiraService';
import Typography from '@material-ui/core/Typography';
import './workLogForm.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class Issues extends Component {

    constructor(props) {
        super(props);

        this.jiraService = new JiraService();

        this.state = {
            open: false,
            issueId: props.issueId,
            started: null,
            timeSpentSeconds: null,
            comment: '',
            types: [
                '[DESENV]',
                '[TESTE]',
                '[REUNIAO]'
            ],
            type: null
        }

        this.startCronometer = this.startCronometer.bind(this);
        this.pauseCronometer = this.pauseCronometer.bind(this);
        this.logHour = this.logHour.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    startCronometer() {
        this.setState({started: new Date()})
    }

    pauseCronometer() {
        const endedDate = new Date(),
            timeSpentSeconds = Number(((endedDate - this.state.started)/1000).toFixed());

        this.setState({timeSpentSeconds: timeSpentSeconds});
    }

    handleClick(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleChange(event) {
        this.setState({type: event.target.value});
    }

    async logHour() {
        const data = {
            'type': this.state.type,
            'started' : this.state.started,
            'timeSpentSeconds' : this.state.timeSpentSeconds,
            'comment' : this.state.comment
        };

        await this.jiraService.logHours(data, this.state.issueId);
    }

    render () {
        return (
            <div className="workLogForm">
                <Typography className="title" gutterBottom variant="h2" component="h2">Worklog</Typography>
                <Button variant="contained" color="primary" onClick={this.startCronometer}>
                    Começar
                </Button>
                <Button variant="contained" color="primary" onClick={this.pauseCronometer}>
                    Pausar
                </Button>
                <RadioGroup
                    aria-label="Type"
                    name="type"
                    value={this.state.type}
                    onChange={this.state.handleChange}
                >
                    {this.state.types.map(type => (<FormControlLabel value={type} control={<Radio />} label={type} />))}
                </RadioGroup>
                <TextField
                    required
                    label="Comentário"
                    margin="normal"
                    name="comment"
                    onChange={this.handleClick}
                />
                <Button variant="contained" color="primary" onClick={this.logHour}>
                    Enviar
                </Button>


            </div>

        )
    }
}

export default Issues;