import React from 'react';
import { StyleSheet, css } from 'aphrodite';

interface iProps {
    value?: boolean;
    children: any;
    toggleCallback: any;
}
export default class Switch extends React.Component<iProps, {}>{

    render() {
        const { value, toggleCallback } = this.props;

        return (
            <div className={css(styles.container)}>
                <span className={css(styles.heading)}>{this.props.children}</span>
                <label className="switch">
                    <input checked={value} onChange={toggleCallback} type="checkbox" />
                    <span className="slider round"></span>
                </label>

            </div>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: "20px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    heading:{
        marginRight: "10px"
    }
});