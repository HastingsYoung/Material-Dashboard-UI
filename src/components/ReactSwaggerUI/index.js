import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Schemes from './components/Schemes';
import Models from './components/Models';
import Entries from './components/Entries';
import './styles/app.css';

class ReactSwaggerUI extends Component {
    
    render() {
        const entries = [];
        const models = [];

        this.props.entries.forEach((d, i)=> {
            entries.push(
                <Entries key={i} {...d}/>
            );
        });

        this.props.models.forEach((d, i)=>{
            models.push(
                <Models  {...d}/>
            );
        });

        return (
            <div className="react-swagger-ui">
                <MuiThemeProvider>
                    <div style={{width: "100%", overflowX:"hidden",overflowY:"scroll", paddingTop: "50px"}}>
                        <Schemes/>
                        {entries}
                        {models}
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

ReactSwaggerUI.propTypes = {
    models: PropTypes.array,
    entries: PropTypes.array
}

export default ReactSwaggerUI;
