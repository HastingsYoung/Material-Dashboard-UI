import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import './log.css';

const reg = {
    NORMAL: /\[NORMAL\]/,
    WARN: /\[WARN\]/,
    ERROR: /\[ERROR\]/,
    LIST: /\[LIST\]/,
    PROGRESS: /\[PROGRESS\]/,
};

export default class Log extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: `Loading...`,
            records: [],
            page: 0,
            max: 0,
            maxLines: 40
        };
    }

    componentDidMount() {
        let self = this;

        fetch("http://localhost:8080/dashboard/logs", {
            method: "GET",
            mode: 'cors'
        }).then((res) => {
            return res.text();
        }).then((text) => {
            let records = text.split(/\n/);
            let max = (Math.floor(records.length / this.state.maxLines));
            self.setState({text, records, max});
        });
    }

    toPage(i) {
        if (i >= 0 && i <= this.state.records.length / this.state.maxLines)
            this.setState({page: i});
    }

    render() {

        const from = this.state.page * this.state.maxLines;
        const to = (this.state.page + 1) * this.state.maxLines;
        const records = this.state.records.slice(from, to);

        return (<div className="log">
            <Pagination curr={this.state.page} max={this.state.max} first={this.toPage.bind(this, 0)}
                        last={this.toPage.bind(this, this.state.max)}
                        next={this.toPage.bind(this, (this.state.page + 1))}
                        previous={this.toPage.bind(this, (this.state.page - 1))}/>

            <div className="log-container">
                {records.map((d, i) => {
                    return <LogRecord key={i} text={d}/>;
                })}
            </div>

            <Pagination curr={this.state.page} max={this.state.max} first={this.toPage.bind(this, 0)}
                        last={this.toPage.bind(this, this.state.max)}
                        next={this.toPage.bind(this, (this.state.page + 1))}
                        previous={this.toPage.bind(this, (this.state.page - 1))}/>
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

        return (<div className={"log-record" + type}>
            {this.props.text}
        </div>);
    }
}

class Pagination extends Component {
    render() {
        return (<div className="log-pagination">
            <div className="log-pagination-legend">
                Page {this.props.curr + 1} of {this.props.max + 1}
            </div>
            <div className="log-pagination-btns">
                <FlatButton label="First" style={{borderRadius: 20}} onClick={this.props.first}/>
                <FlatButton label="Previous" style={{borderRadius: 20}} onClick={this.props.previous}/>
                <FlatButton label="Next" style={{borderRadius: 20}} onClick={this.props.next}/>
                <FlatButton label="Last" style={{borderRadius: 20}} onClick={this.props.last}/>
            </div>
        </div>);
    }
}