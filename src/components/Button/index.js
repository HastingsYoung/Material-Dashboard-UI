/**
 * Created by hastings on 28/09/2017.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './ripplebtn.css';

export default class Button extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clicking: false,
            rippleLeft: 0,
            rippleTop: 0
        }
    }

    onClick(e) {
        let self = this;
        let parent = ReactDOM.findDOMNode(this);

        let box = parent.getBoundingClientRect();

        const offsetX = box.left;
        const offsetY = box.top;

        let x = (e.pageX - offsetX - box.width / 2);
        let y = (e.pageY - offsetY - box.height / 2);

        this.setState({clicking: true, rippleLeft: x, rippleTop: y});

        setTimeout(function () {
            self.setState({clicking: false, rippleLeft: 0, rippleTop: 0});
        }, 700);
    }

    render() {
        return <div className={this.state.clicking?"button btn-animate":"button"} {...this.props} onClick={(evt)=>{
                    this.onClick(evt);
                    this.props.onClick(evt)}
               }>
            {this.props.children}
            <div ref="ripple" className="ripple"
                 style={{transform:`translate(`+this.state.rippleLeft+`px,`+this.state.rippleTop+`px)`}}></div>
        </div>
    }
}