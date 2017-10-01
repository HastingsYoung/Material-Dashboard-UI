import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './log.css';

const reg = {
    NORMAL: /\[NORMAL\]/,
    WARN: /\[WARN\]/,
    ERROR: /\[ERROR\]/,
    LIST: /\[LIST\]/,
    PROGRESS: /\[PROGRESS\]/,
};

export default class Log extends Component {

    constructor(props){
        super(props);
        this.state = {
            text : `Loading...`
        }
    }

    componentDidMount() {
        let self = this;

        fetch("http://localhost:8080/dashboard/logs", {
            method: "GET",
            mode: 'cors'
        }).then((res)=> {
            return res.text();
        }).then((text)=> {
            self.setState({text});
        });
    }

    render() {

        const records = this.state.text.split(/\n/);

        return (<div className="log">
            {records.map((d, i)=> {
                return <LogRecord key={i} text={d}/>;
            })}
        </div>);
    }
}

class LogRecord extends Component {

    render() {
        let type = "";
        if (this.props.text.match(reg.ERROR)) {
            type += " error"
        } else if (this.props.text.match(reg.WARN)) {
            type += " warn"
        } else if (this.props.text.match(reg.PROGRESS)) {
            type += " progress"
        } else if (this.props.text.match(reg.LIST)) {
            type += " list"
        } else {
            type += " normal"
        }

        return (<div className={"log-record"+type}>
            {this.props.text}
        </div>);
    }
}