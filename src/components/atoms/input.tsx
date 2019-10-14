import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import "./input.css";

interface iProps {
    placeholder?: string;
    value?: string;
    callback?: any;
    title?: string;
};
export default class Input extends React.Component<iProps, any>{
    constructor(props: iProps) {
        super(props);
    }
    handleChange(event) {
        this.props.callback(event.target.value);
    }
    render() {
        return (
            <div className="text-input">
                <input type="text" onChange={this.handleChange.bind(this)} value={this.props.value} placeholder={this.props.placeholder} />
                <label htmlFor="input1">{this.props.title}</label>
            </div>
        );
    }
}

const styles = StyleSheet.create({

});