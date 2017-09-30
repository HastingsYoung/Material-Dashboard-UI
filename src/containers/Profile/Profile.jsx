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
            selected: [0],
            headers:[],
            data: [[]]
        };
    }

    componentDidMount() {
        let self = this;

        fetch("http://localhost:8080/dashboard/profile",{
            method: "GET",
            mode: 'cors'
        }).then((res)=>{
            return res.json();
        }).then((json)=>{
            self.setState({
                headers:json.headers,
                data:json.data
            });
        });
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
            {d.map((dc,j)=><TableRowColumn key={j}>{dc}</TableRowColumn>)}
        </TableRow>);
    }

    render() {
        return (
            <Table onRowSelection={this.handleRowSelection}>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Attribute</TableHeaderColumn>
                        <TableHeaderColumn>Type</TableHeaderColumn>
                        <TableHeaderColumn>Value</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {this.getRows()}
                </TableBody>
            </Table>
        );
    }

}