/**
 * Created by hastings on 29/09/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {List, ListItem} from 'material-ui/List';
import './models.css';

export default class Models extends Component {
    render() {
        const listItems = [];

        this.props.models.forEach((d, i)=> {
            listItems.push(<ListItem key={i} primaryText={d.name}
                                     initiallyOpen={false}
                                     primaryTogglesNestedList={true} nestedItems={[
                    <Model key={i} model={d.attributes}/>]}/>);
        });

        return <div className="models">
            <List>
                <ListItem
                    primaryText={<h3>{this.props.groupName}</h3>}
                    secondaryText={<p>{this.props.groupDesc}</p>}
                    initiallyOpen={false}
                    primaryTogglesNestedList={true}
                    nestedItems={listItems}/>
            </List>
        </div>
    }
}

class Model extends Component {
    render() {
        return (<div className="model">
            <pre>
                {JSON.stringify(this.props.model, null, "    ")}
            </pre>
        </div>);
    }
}

Models.propTypes = {
    groupName: PropTypes.string,
    groupDesc: PropTypes.string,
    models: PropTypes.array.isRequired
}