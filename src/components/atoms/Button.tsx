import React from 'react';
import { StyleSheet, css } from 'aphrodite';

interface iProps{
    text: string;
    callback?: any;
    destroyProgressCallback?: any;
    completed?: boolean;
}
export default class Button extends React.Component<iProps, {}>{

    render() {
        const {text, callback, destroyProgressCallback, completed} = this.props;
        return (
            <div className={css(styles.container)} onClick={callback}>
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
        padding: "0.8rem 1.6rem",
        fontSize: "0.9rem",
        borderRadius: "1px",
        marginBottom: "1rem",
        justifyContent: "center"
    },
    text: {
        color: "#fff"
    },
    cancel: {
        color: "#fff"
    }
});