/**
 * Created by hastings on 29/09/2017.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './network.css';

var echarts = require('echarts');

export default class Network extends Component {

    componentDidMount() {
        let parent = ReactDOM.findDOMNode(this);
        let chart = echarts.init(parent);
        chart.setOption();
    }

    render() {
        return (<div className="network">
        </div>);
    }
}