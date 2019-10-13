import React, { Component, Ref, RefObject, MutableRefObject } from 'react';
import { connect } from 'react-redux';
import PDFViewer from '../../components/molecules/Pdf';
import { StyleSheet, css } from 'aphrodite';
import Button from "../../components/atoms/Button";
import { STEPS } from "../../redux/actions";
import PDFJSBackend from "../../backends/pdfjs";

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
        document.addEventListener("keydown", (this.onKeyDown.bind(this)), true);

        //  console.log(this.pdfRef.current.contentWindow.document);
    }

    async onKeyDown(event: KeyboardEvent) {
        console.log("Presesd");
        const key = event.keyCode;
        const ctrl = event.ctrlKey || event.metaKey;
        if (ctrl && key == 67) {
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
            </div>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        background: "#fff"
    },
    stepsSection: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        fontSize: '1.3rem'
    },
    buttonsContainer: {

    },
    stepsHeading: {
        marginBottom: "1rem"
    }
});

const mapStateToProps = ({ app }: any) => ({
    step: app.step
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps,
)(Dashboard);