/**
 * Created by hastings on 29/09/2017.
 */
import React, {Component} from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Lock from '../../icons/lock.svg';
import './schemes.css';

export default class Schemes extends Component {

    constructor(props) {
        super(props);
        this.state = {value: 1};
    }

    render() {
        return <div className="schemes">
            <div className="schemes-left">
                <span>Schemes</span>
                <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                    <MenuItem value={1} primaryText="HTTP"/>
                    <MenuItem value={2} primaryText="SSH"/>
                </DropDownMenu>
            </div>
            <div className="schemes-right">
                <button><label>Authorize</label> <img src={Lock} alt="lock"/></button>
            </div>
        </div>
    }
}