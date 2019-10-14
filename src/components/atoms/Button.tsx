import React from 'react';
import { StyleSheet, css } from 'aphrodite';

interface iProps{
    text: string;
    callback?: any;
    destroyProgressCallback?: any;
    completed?: boolean;
    selected?: boolean;
}
export default class Button extends React.Component<iProps, {}>{

    render() {
        const {text, callback, destroyProgressCallback, completed, selected} = this.props;
        // console.log(this.props.selected);
        const classes = [styles.container];
        if(selected){
            classes.push(styles.selected);
        }
        return (
            <div className={css(...classes)} onClick={callback} >
                <div className={css(styles.text)}>{text}</div>
                {completed && <div className={css(styles.cancel)} onClick={destroyProgressCallback}></div>}
            </div>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        background: "#272727",
        padding: "0.8rem 2rem",
        fontSize: "1.1rem",
        borderRadius: "1px",
        marginBottom: "1rem",
        justifyContent: "center",
        cursor: "pointer"
    },
    selected: {
        background: "green"
    },
    text: {
        color: "#fff"
    },
    cancel: {
        color: "#fff"
    }
});