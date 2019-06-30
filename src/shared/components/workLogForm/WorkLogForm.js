import React, { Component } from 'react';
import JiraService from '../../services/JiraService';
import Typography from '@material-ui/core/Typography';
import './workLogForm.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';

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
            cronometerStarted: false,
            currentTimer: '0:0:0',
            types: [
                '[DESENV]',
                '[TESTE]',
                '[REUNIAO]'
            ],
            type: null,
            close: props.close,
            error: false,
            success: false
        }

        this.startCronometer = this.startCronometer.bind(this);
        this.pauseCronometer = this.pauseCronometer.bind(this);
        this.logHour = this.logHour.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.cronometerShow = this.cronometerShow.bind(this);
        this.cronometer = this.cronometer.bind(this);

    }

    startCronometer() {
        this.setState({started: new Date(), cronometerStarted: true})

        this.cronometer();
    }

    pauseCronometer() {
        const endedDate = new Date(),
            timeSpentSeconds = Number(((endedDate - this.state.started)/1000).toFixed());

        this.setState({timeSpentSeconds: timeSpentSeconds, cronometerStarted: false});
    }

    handleClick(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleChange(event) {
        this.setState({type: event.target.value});
    }

    cronometerShow() {
        if (!this.state.cronometerStarted) {

            return (
                <Button className="cronometer-button" variant="contained" color="primary" onClick={this.startCronometer}>
                    Começar
                </Button>
            )
        }
        return (
            <Button className="cronometer-button" variant="contained" color="primary" onClick={this.pauseCronometer}>
                Pausar
            </Button>
        )
    }

    convertSecondsToCronometer(timerMiliseconds) {
        const date = new Date(timerMiliseconds);

        return `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
        
    }

    cronometer() {
        setTimeout(() => {
            const timerMiliseconds = new Date() - this.state.started,
                timeSpentSeconds = timerMiliseconds / 1000,
                timerTime = this.convertSecondsToCronometer(timerMiliseconds);
            this.setState({timeSpentSeconds: timeSpentSeconds.toFixed(), currentTimer: timerTime});
            return;
        }, 1000)
    }

    componentWillUpdate(prevProps, props) {
        if (!props.cronometerStarted)
            return;
        
        this.cronometer();
    }

    async logHour() {
        const data = {
            'type': this.state.type,
            'started' : this.state.started,
            'timeSpentSeconds' : this.state.timeSpentSeconds,
            'comment' : this.state.comment
        };

        try {
            await this.jiraService.logHours(data, this.state.issueId);
            this.state.close(true);
        } catch {
            this.setState({error: true})
        }

    }

    render () {
        return (
            <div className="workLogForm">
                 <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.state.error}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                >
                    <SnackbarContent
                        aria-describedby="client-snackbar"
                        message={
                            <span>
                                Horas não cadastradas
                            </span>
                        }
                    />
                </Snackbar>
                <Typography className="title-worklog" gutterBottom variant="h3" component="h2">Worklog</Typography>
                <h1>{this.state.currentTimer}</h1>
                {this.cronometerShow()}
                <RadioGroup
                    className="radio"
                    aria-label="Type"
                    name="type"
                    value={this.state.type}
                    onChange={this.handleChange}
                >
                    {this.state.types.map((type, index) => (<FormControlLabel value={type} key={index} control={<Radio />} label={type} />))}
                </RadioGroup>
                <TextField
                    className="comment"
                    required
                    multiline
                    label="Comentário"
                    variant="outlined"
                    margin="normal"
                    name="comment"
                    rows="4"
                    onChange={this.handleClick}
                />
                <Button className="sent-button" variant="contained" color="secondary" onClick={this.state.close}>Fechar</Button>
                <Button className="sent-button" variant="contained" color="primary" onClick={this.logHour}>
                    Enviar
                </Button>


            </div>

        )
    }
}

export default Issues;