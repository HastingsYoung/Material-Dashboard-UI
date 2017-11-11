import React, { Component } from 'react';
import MotionMenu from '../../components/MotionMenu';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import Profile from '../Profile/Profile.jsx';
import Analysis from '../Analysis/Analysis.jsx';
import API from '../API/API.jsx';
import Log from '../Log/Log.jsx';
import Network from '../Network/Network.jsx';
import './home.css';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: 0
        };
    }

    getContents() {
        switch (this.state.tab) {
            case 1:
                return <API/>;
            case 2:
                return <Log/>;
            case 3:
                return <Analysis/>;
            case 4:
                return <Network/>;
            default:
                return <Profile/>;
        }
    }

    render() {
        return <div className="home">
            <Logo/>
            <MotionMenu className="motion-menu"
                        type="circle"
                        margin={80}
                        open={true}
            >

                <Button>
                    <img src="/static/icons/plus.svg" alt="+"/>
                </Button>
                <Button onClick={()=>{this.setState({tab:0})}}>
                    <img src="/static/icons/profile.svg" alt="profile"/>
                </Button>
                <Button onClick={()=>{this.setState({tab:1})}}>
                    <img src="/static/icons/api.svg" alt="api"/>
                </Button>
                <Button onClick={()=>{this.setState({tab:2})}}>
                    <img src="/static/icons/log.svg" alt="log"/>
                </Button>
                <Button onClick={()=>{this.setState({tab:3})}}>
                    <img src="/static/icons/bigdata.svg" alt="data"/>
                </Button>
                {/*<Button onClick={()=>{this.setState({tab:4})}}>
                 <img src="/static/icons/network.svg" alt="network"/>
                 </Button>*/}
            </MotionMenu>

            <div
                style={{position:"absolute",width:"80%", height: "100%", right: "0", top: "0", overflowX:"hidden",overflowY:"scroll"}}>
                <div className="container">
                    {this.getContents()}
                </div>
            </div>
        </div>
    }
}