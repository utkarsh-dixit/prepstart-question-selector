import React, { Component, Ref, RefObject, MutableRefObject } from 'react';
import { connect } from 'react-redux';
import PdfComponent from '../../components/molecules/Pdf';
import { StyleSheet, css } from 'aphrodite';
import Button from "../../components/atoms/Button";
import {STEPS} from "../../redux/actions";

interface iProps {

};
interface iState {

};
class Dashboard extends Component<iProps, iState>{
    pdfRef: any;

    constructor(props: iProps) {
        super(props);
        this.pdfRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener("keydown", this.onKeyDown.bind(this), true);
        // console.log(this.pdfRef);
    }

    async onKeyDown(event: KeyboardEvent) {
       const key = event.keyCode;
       const ctrl = event.ctrlKey || event.metaKey;
       if(ctrl && key == 67) {
           // ctrl + c
        console.log("LAA");
        console.log(await navigator.clipboard.readText());
       }
    }

    render() {
        return (
            <div className={css(styles.container)}>
                <div className={css(styles.stepsSection)}>
                    <div className={css(styles.stepsHeading)}>Steps</div>
                    <div className={css(styles.buttonsContainer)}>
                        <Button text="Select Question"></Button>
                        <Button text="Select Answer 1"></Button>
                        <Button text="Select Answer 2"></Button>
                        <Button text="Select Answer 3"></Button>
                        <Button text="Select Answer 4"></Button>
                        <Button text="Select Correct Answer"></Button>
                    </div>

                </div>
                <div className={css(styles.pdfSection)}>
                    <PdfComponent forwardRef={this.pdfRef} src="http://localhost:3000/Kubernetes%20Microservices%20with%20Docker.pdf" />
                </div>
            </div>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        display: "flex"
    },
    stepsSection: {
        flex: 0.3,
        maxWidth: "400px",
        boxShadow: "3px 0 5px 0 #555;",
        padding: "2px 2px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonsContainer: {

    },
    stepsHeading: {
        marginBottom: "1rem"
    },
    pdfSection: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        background: "rgb(82, 86, 89)"
    }
});

const mapStateToProps = ({ app }: any) => ({
    step: app.step
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps,
)(Dashboard);