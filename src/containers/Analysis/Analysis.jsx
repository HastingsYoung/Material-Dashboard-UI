/**
 * Created by hastings on 29/09/2017.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import './analysis.css';

var echarts = require('echarts');


export default class Analysis extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hits: {
                array: [],
                policy: ""
            },
            tasks: {
                array: [],
                policy: ""
            },
        }
    }

    componentDidMount() {
        let self = this;

        fetch("http://localhost:8080/dashboard/stats", {
            method: "GET",
            mode: 'cors'
        }).then((res) => res.json()).then((json) => {
            self.setState(json);
            self.renderChart01();
            self.renderChart02();
        });
    }

    renderChart01() {
        let parent = ReactDOM.findDOMNode(this.refs.card01);
        let chart = echarts.init(parent);
        chart.setOption({
            title: {
                text: 'Dynamics',
                subtext: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Hits', 'Tasks']
            },
            "color": [
                "#2196F3",
                "#1E88E5",
                "#1976D2",
                "#1565C0",
                "#0D47A1"
            ],
            "textStyle": {
                "fontFamily": `'Nunito', "Helvetica Neue", Helvetica, Arial, sans-serif`,
                "fontSize": 12,
                "fontStyle": "normal",
                "fontWeight": "normal"

            },
            toolbox: {
                show: true,
                feature: {
                    dataView: {readOnly: false, title: "Data View", lang: ["Data View","Close","Refresh"]},
                    restore: {title: "Restore"},
                    saveAsImage: {title:"Save", lang: ["Right Click to Save"]}
                },
            },
            dataZoom: [
                {
                    id: 'dataZoomX',
                    type: 'slider',
                    xAxisIndex: [0, 1],
                    filterMode: 'filter'
                },
                {
                    id: 'dataZoomY',
                    type: 'slider',
                    yAxisIndex: [0, 1],
                    filterMode: 'empty'
                }
            ],
            xAxis: [
                {
                    type: 'category',
                    name: 'Time',
                    boundaryGap: true,
                    data: this.state.hits.array.map((t) => {
                        let ts = t.midts * 1000
                        return new Date(ts).toLocaleTimeString();
                    })
                },
                {
                    type: 'category',
                    name: 'Time',
                    boundaryGap: true,
                    data: this.state.hits.array.map((t) => {
                        let ts = t.midts * 1000
                        return new Date(ts).toLocaleTimeString();
                    })
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    scale: true,
                    name: 'Hits',
                    boundaryGap: [0.2, 0.2]
                },
                {
                    type: 'value',
                    scale: true,
                    name: 'Tasks / Sec',
                    boundaryGap: [0.2, 0.2]
                },
            ],
            series: [
                {
                    name: 'Hits',
                    type: 'line',
                    data: this.state.hits.array.map((d) => d.val)
                },
                {
                    name: 'Tasks',
                    type: 'bar',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: this.state.tasks.array.map((d) => d.val)
                }
            ]
        });
    }

    renderChart02() {
        let parent = ReactDOM.findDOMNode(this.refs.card02);
        let chart = echarts.init(parent);

        let obj = this.state;
        let routes = Object.keys(obj);
        const len = routes.length;
        let hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
            '7a', '8a', '9a', '10a', '11a',
            '12p', '1p', '2p', '3p', '4p', '5p',
            '6p', '7p', '8p', '9p', '10p', '11p'];

        let option = {
            tooltip: {
                position: 'top'
            },
            title: [],
            singleAxis: [],
            series: [],
            color: ["#2196F3"]
        };

        routes.forEach((route, idx) => {
            option.title.push({
                textBaseline: 'middle',
                top: (idx + 0.5) * 300 / len + 10 + 'px',
                text: route,
                textStyle: {
                    fontWeight: 300,
                    fontSize: 11
                }
            });
            option.singleAxis.push({
                left: '15%',
                type: 'category',
                boundaryGap: false,
                data: hours,
                top: (idx * 300 / len + 10) + 'px',
                height: (300 / len) + 'px',
                axisLabel: {
                    interval: 1
                }
            });
            option.series.push({
                singleAxisIndex: idx,
                coordinateSystem: 'singleAxis',
                type: 'scatter',
                data: [],
                symbolSize: function (dataItem) {
                    return dataItem;
                }
            });
        });

        routes.forEach((r, i) => {
            let r_obj = obj[r];
            let hrs = [0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0];
            r_obj.array.forEach((d, i) => {
                const date = new Date(d.midts * 1000);
                // adds up hours hits
                hrs[date.getHours()] += d.val;
            });
            option.series[i].data.push(...hrs);
        });

        chart.setOption(option);
    }

    render() {
        return (<div className="analysis">
            <section>
                <div className="card double" ref="card01"></div>
            </section>
            <section>
                <div className="card double" ref="card02"></div>
            </section>
        </div>);
    }
}
