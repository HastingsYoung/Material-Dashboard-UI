/**
 * Created by hastings on 28/09/2017.
 */
import React, { Component } from 'react';
import './logo.css';

export default class Logo extends Component {
    render() {
        return (
            <div className="logo">
                <a href="https://github.com/GoCollaborate/src">
                    {/*<img src="/static/icons/gocollaborate-logo.svg" alt="GoCollaborate"/>*/}
                    GoCollaborate
                </a>
            </div>
        );
    }
}