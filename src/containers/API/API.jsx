import React, {Component} from 'react';
// import ReactSwaggerUI from '../../components/ReactSwaggerUI';
import ReactSwaggerUI from 'react-swagger';
import './api.css';
import 'react-swagger/dist/index.css';

const models = [{
    name: "Model 01",
    attributes: {
        "id": {
            "type": "integer",
            "default": 0
        },
        "quantity": {
            "type": "integer",
            "default": 0
        },
        "status": {
            "type": "string",
            "default": ""
        },
        "complete": {
            "type": "boolean",
            "default": false
        }
    }
}, {
    name: "Model 02",
    attributes: {
        "id": {
            "type": "integer",
            "default": 0
        },
        "quantity": {
            "type": "integer",
            "default": 0
        },
        "status": {
            "type": "string",
            "default": ""
        },
        "complete": {
            "type": "boolean",
            "default": false
        }
    }
}];

const entries = [{
    type: "get",
    api: "/model",
    desc: "The description of model api"
}, {
    type: "post",
    api: "/model",
    desc: "The description of model api"
}, {
    type: "put",
    api: "/model",
    desc: "The description of model api"
}, {
    type: "delete",
    api: "/model",
    desc: "The description of model api"
},{
    type: 'get',
    api: '/model',
    desc: 'The description of model api',
    deprecated: true,
}];

const base = {
    title: "Swagger Example API",
    subTitle: "[ Base URL: example.swagger.io/v2 ]"
}

const entriesGroup = [{
    groupName: "Model APIs",
    groupDesc: "The description of Model APIs",
    entries
}];
const modelsGroup = [{
    groupName: "Models",
    groupDesc: "The description of Models",
    models
}];

export default class API extends Component {
    render() {
        return (<div className="apis">
            <ReactSwaggerUI entries={entriesGroup} models={modelsGroup} base={base}>
                This is a sample server Swagger UI. You can find out more about Swagger at http://swagger.io or on
                irc.freenode.net, #swagger. For this sample, you can use the api key special-key to test the authorization filters.
            </ReactSwaggerUI>
        </div>);
    }
}