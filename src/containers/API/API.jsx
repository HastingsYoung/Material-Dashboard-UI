import React, {Component} from 'react';
// import ReactSwaggerUI from '../../components/ReactSwaggerUI';
import ReactSwaggerUI from 'react-swagger';
import './api.css';
import 'react-swagger/dist/index.css';

export default class API extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                entries: [],
                models: [],
                base: {
                    title: "Swagger Example API",
                    subTitle: "[ Base URL: example.swagger.io/v2 ]"
                }
            }
        };
    }

    componentDidMount() {
        let self = this;

        fetch("http://localhost:8080/dashboard/routes", {
            method: "GET",
            mode: 'cors'
        }).then((res)=> {
            return res.json();
        }).then((json)=> {
            self.setState({
                data: json
            });
        });
    }

    render() {
        return (<div className="apis">
            <ReactSwaggerUI {...this.state.data}>
                This is a list of GoCollaborate sample API, please find out more at https://github.com/HastingsYoung/GoCollaborate.
            </ReactSwaggerUI>
        </div>);
    }
}