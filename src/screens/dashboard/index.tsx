import React, { Component, Ref, RefObject, MutableRefObject } from 'react';
import { connect } from 'react-redux';
import PDFViewer from '../../components/molecules/Pdf';
import { StyleSheet, css } from 'aphrodite';
import Button from "../../components/atoms/Button";
import { STEPS, CONTENT_MODE, moveToNextStep, resetAll, submit } from "../../redux/actions";
import PDFJSBackend from "../../backends/pdfjs";
import html2canvas from "html2canvas";
import {requestAPICall} from "../../util/network";
import Input from '../../components/atoms/input';

interface iProps {

};
interface iState {

};

const DEFAULT_SCALE = 1;
// question_details: { title: string, hint?: string, difficulty?: string, metadata?: any, image?: string, topic_id?: number, subject_id?: number, mode?: number, options: Array<{ optionText: string, mode?: number, isCorrect: boolean }>, summary?: string, ref?: number }
class Dashboard extends Component<any, any>{
    pdfRef: any;
    metadata: any;

    constructor(props: iProps) {
        super(props);
        this.pdfRef = React.createRef();
        this.state = {
            cropping: {
                value: false
            },
            mousePos: {
                X: 0,
                Y: 0
            },
            values: {

            },
            config: {
                subject_id: 1,
                topic_id: 19,
                difficulty: "easy",
                summary: "Empty summary"
            }
        }
        this.metadata = {};
    }

    componentDidMount() {
        document.addEventListener("mousemove", this.onMouseMove.bind(this), false);
        document.addEventListener("keydown", this.onKeyDown.bind(this), false);
        document.addEventListener("keyup", this.onKeyUp.bind(this), false);
        //  console.log(this.pdfRef.current.contentWindow.document);
    }

    componentDidUpdate(){
        if(this.props.step === STEPS.CORRECT_ANSWER){
            const enteredAnswer = parseInt(prompt('Which is the correct answer?'));
            this.moveToNextStep(enteredAnswer, CONTENT_MODE.TEXT);

        }
        if(this.props.step === STEPS.SUBMIT){
            // Finally submit the form.
            const title = this.props.values[STEPS.QUESTION];
            const options = {
                1: this.props.values[STEPS.ANSWER_1],
                2: this.props.values[STEPS.ANSWER_2],
                3: this.props.values[STEPS.ANSWER_3],
                4: this.props.values[STEPS.ANSWER_4],
            };
            const correct_answer = this.props.values[STEPS.CORRECT_ANSWER];
            const payload = {
                title: this.props.values[STEPS.QUESTION].mode === CONTENT_MODE.TEXT ?  this.props.values[STEPS.QUESTION].content : null,
                mode: this.props.values[STEPS.QUESTION].mode,
                difficulty: this.state.config.difficulty,
                metadata: JSON.stringify(this.metadata),
                image: this.props.values[STEPS.QUESTION].mode === CONTENT_MODE.IMAGE ?  this.props.values[STEPS.QUESTION].content : null,
                topic_id: parseInt(this.state.config.topic_id),
                subject_id: parseInt(this.state.config.subject_id),
                summary: this.state.config.summary,
                options: [
                    {
                        optionText: options[1].content,
                        mode: options[1].mode,
                        isCorrect: correct_answer === 1
                    },
                    {
                        optionText: options[2].content,
                        mode: options[2].mode,
                        isCorrect: correct_answer === 2
                    },
                    {
                        optionText: options[3].content,
                        mode: options[3].mode,
                        isCorrect: correct_answer === 3
                    },
                    {
                        optionText: options[4].content,
                        mode: options[4].mode,
                        isCorrect: correct_answer === 4
                    }
                ]

            };
            console.log(payload);
            const _this = this;
            this.props.submit(payload);
        }
    }

    cropCanvas(sourceCanvas: HTMLCanvasElement, left: number, top: number, width: number ,height:number){
        let destCanvas = document.createElement('canvas');
        destCanvas.width = width;
        destCanvas.height = height;
        destCanvas.getContext("2d").drawImage(
            sourceCanvas,
            left,top,width,height,  // source rect with content to crop
            0,0,width,height);      // newCanvas, same size as source rect
        return destCanvas;
    }
    async onMouseMove(event: MouseEvent){
        this.setState({mousePos: {X: event.clientX, Y: event.clientY}});
    }

    async onKeyUp(event: KeyboardEvent){
        if(this.state.cropping.value && event.keyCode==16){
            const width = Math.abs(this.state.mousePos.X - this.state.cropping.clientX);
            const height = Math.abs(this.state.mousePos.Y - this.state.cropping.clientY);
            document.body.style.cursor="default";
            const style = document.getElementById("myStyle");

            if(style){
                style.textContent = "";
            }
            const canvas = await html2canvas(document.querySelector("body"), {scale: DEFAULT_SCALE});
            const new_canvas = this.cropCanvas(canvas, this.state.cropping.clientX * DEFAULT_SCALE, this.state.cropping.clientY * DEFAULT_SCALE, width * DEFAULT_SCALE, height * DEFAULT_SCALE);
            this.moveToNextStep(new_canvas.toDataURL("image/png"), CONTENT_MODE.IMAGE);
            this.setState({cropping: {value: false}});
        }
    }

    moveToNextStep(content: any, mode: number) {
        if(this.props.step !== STEPS.SUBMIT){
            this.props.moveToNextStep(this.props.step, {content, mode});
        }
    }

    async onKeyDown(event: KeyboardEvent) {
        console.log("Presesd");
        const key = event.keyCode;
        const ctrl = event.ctrlKey || event.metaKey;
        if (ctrl && key == 67) {
            // ctrl + c
            console.log("LAA");
            const content = await navigator.clipboard.readText();
            this.moveToNextStep(content, CONTENT_MODE.TEXT);
        } else if(key == 16){
            this.setState({cropping: {value: true, clientX: this.state.mousePos.X, clientY: this.state.mousePos.Y }});
            // document.body.style.cursor="none";
            document.body.style.cursor="crosshair";
            const style: HTMLStyleElement = document.getElementById("myStyle") ? document.getElementById("myStyle") as HTMLStyleElement :  document.createElement("style");
            style.id = "myStyle";
            style.textContent = `
                .textLayer > span{
                    cursor: crosshair;
                    -webkit-touch-callout: none; /* iOS Safari */
                    -webkit-user-select: none; /* Safari */
                     -khtml-user-select: none; /* Konqueror HTML */
                       -moz-user-select: none; /* Old versions of Firefox */
                        -ms-user-select: none; /* Internet Explorer/Edge */
                            user-select: none; /* Non-prefixed version, currently
                                                  supported by Chrome, Opera and Firefox */
                }
            `
            if(!document.getElementById("myStyle")){
                document.body.appendChild(style);
            }
        }
    }

    updateTopicId(value){
        this.setState({...this.state, config: {...this.state.config, topic_id: value}})
    }

    updateSubjectId(value){
        this.setState({...this.state, config: {...this.state.config, subject_id: value}})
    }

    updateSummary(value){
        this.setState({...this.state, config: {...this.state.config, summary: value}})
    }

    updateDifficulty(value){
        this.setState({...this.state, config: {...this.state.config, difficulty: value}})
    }


    render() {
        const isQuestion = (this.props.step===STEPS.QUESTION);
        const isAnswer1 = (this.props.step===STEPS.ANSWER_1);
        const isAnswer2 = (this.props.step===STEPS.ANSWER_2);
        const isAnswer3 = (this.props.step===STEPS.ANSWER_3);
        const isAnswer4 = (this.props.step===STEPS.ANSWER_4);
        const isCorrectAnswer = (this.props.step===STEPS.CORRECT_ANSWER);

        return (
            <div className={css(styles.container)}>
                <div className={css(styles.stepsSection)}>
                    <div className={css(styles.stepsHeading)}>Config</div>
                    <div className={css(styles.buttonsContainer)}>
                        <Input placeholder="Enter topic_id" title="Topic" value={this.state.config.topic_id} callback={this.updateTopicId.bind(this)}/>
                        <Input placeholder="Enter subject_id" title="Subject" value={this.state.config.subject_id} callback={this.updateSubjectId.bind(this)}/>
                        <Input placeholder="Enter difficulty" title="Difficulty" value={this.state.config.difficulty} callback={this.updateDifficulty.bind(this)}/>
                        <Input placeholder="Enter summary" title="Summary" value={this.state.config.summary} callback={this.updateSummary.bind(this)}/>
                    </div>
                    <div className={css(styles.stepsHeading)}></div>
                    <div className={css(styles.stepsHeading)}></div>
                    <div className={css(styles.stepsHeading)}>Steps</div>
                    <div className={css(styles.buttonsContainer)}>
                        <Button text="Select Question" selected={isQuestion}></Button>
                        <Button text="Select Answer 1" selected={isAnswer1}></Button>
                        <Button text="Select Answer 2" selected={isAnswer2}></Button>
                        <Button text="Select Answer 3" selected={isAnswer3}></Button>
                        <Button text="Select Answer 4" selected={isAnswer4}></Button>
                        <Button text="Select Correct Answer" selected={isCorrectAnswer}></Button>
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
    step: app.step,
    values: app.values
});

const mapDispatchToProps = {
    moveToNextStep,
    resetAll,
    submit
};

export default connect(mapStateToProps, mapDispatchToProps,
)(Dashboard);