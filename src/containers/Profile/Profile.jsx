import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [1],
            data: [[1, "Attribute 01", "Value"], [2, "Attribute 02", "Value"], [3, "Attribute 03", "Value"], [4, "Attribute 04", "Value"],
                [5, "Attribute 05", "Value"], [6, "Attribute 06", "Value"], [7, "Attribute 07", "Value"], [8, "Attribute 08", "Value"]]
        };
    }

    isSelected = (index) => {
        return this.state.selected.indexOf(index) !== -1;
    };

    handleRowSelection = (selectedRows) => {
        this.setState({
            selected: selectedRows,
        });
    };

    getRows() {
        return this.state.data.map((d, i)=><TableRow key={i} selected={this.isSelected(i)}>
            <TableRowColumn>{d[0]}</TableRowColumn>
            <TableRowColumn>{d[1]}</TableRowColumn>
            <TableRowColumn>{d[2]}</TableRowColumn>
        </TableRow>);
    }

    render() {
        return (
            <Table onRowSelection={this.handleRowSelection}>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Status</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {this.getRows()}
                </TableBody>
            </Table>
        );
    }

}