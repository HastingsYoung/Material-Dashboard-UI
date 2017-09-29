import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './containers/Home/Home.jsx';
import {Switch,Route,Redirect} from "react-router";
import './main.css';

class App extends Component {
    render() {
        return (
            <div style={{width:"100%"}}>
                <MuiThemeProvider>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Redirect to="/"/>
                    </Switch>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
