import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './log.css';

const text = `2017/09/28 08:58:12  [NORMAL]:   Case Identifier:
2017/09/28 08:58:12  [LIST]:     [-] [GoCollaborateStandardCase]
2017/09/28 08:58:12  [NORMAL]:   Local Address:
2017/09/28 08:58:12  [LIST]:     [-] [131.170.171.98]
2017/09/28 08:58:12  [LIST]:     [-] [localhost:57851 Alive]
2017/09/28 08:58:12  [LIST]:     [-] [localhost:57851 Alive]
2017/09/28 08:58:12  [NORMAL]:   Job Linked:
2017/09/28 08:58:12  [LIST]:     [-] [/core/ExampleJobHandler]`;

const reg = {
    NORMAL: /\[NORMAL\]/,
    WARN: /\[WARN\]/,
    ERROR: /\[ERROR\]/,
    LIST: /\[LIST\]/,
    PROGRESS: /\[PROGRESS\]/,
};

export default class Log extends Component {
    render() {

        const records = text.split(/\n/);

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