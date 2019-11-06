import React, { Component, Ref, RefObject, MutableRefObject } from 'react';
import { connect } from 'react-redux';
import PDFViewer from '../../components/molecules/Pdf';
import { StyleSheet, css } from 'aphrodite';
import Button from "../../components/atoms/Button";
import { STEPS, CONTENT_MODE, moveToNextStep, resetAll, submit, moveToThisStep } from "../../redux/actions";
import PDFJSBackend from "../../backends/pdfjs";
import html2canvas from "html2canvas";
import { requestAPICall } from "../../util/network";
import Input from '../../components/atoms/input';
import AreaOverlay from '../../components/molecules/AreaOverlay';
import removeByValue from "lodash/remove";
import Switch from "../../components/atoms/Switch";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import _ from "underscore";

import { reject } from 'q';
import { tsThisType, thisExpression } from '@babel/types';

interface iProps {

};
interface iState {

};

const INITIAL_STATE = {
    cropping: {
        value: false
    },
    modalIsOpen: false,
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
    },
    block_mode: true,
    block: {
        height: 0,
        width: 0,
        unit: 3
    },
    doingPenTabletModeCrop: false,
    pen_touch_mode: true,
    tasks: []
};
const DEFAULT_SCALE = 1;


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },
    overlay: {
        zIndex: 3
    }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('body')
// question_details: { title: string, hint?: string, difficulty?: string, metadata?: any, image?: string, topic_id?: number, subject_id?: number, mode?: number, options: Array<{ optionText: string, mode?: number, isCorrect: boolean }>, summary?: string, ref?: number }
class Dashboard extends Component<any, any>{
    pdfRef: any;
    metadata: any;

    constructor(props: iProps) {
        super(props);
        this.pdfRef = React.createRef();
        this.state = INITIAL_STATE;
        this.metadata = {};
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    componentDidMount() {
        document.getElementById("viewer").addEventListener("mousemove", _.throttle(this.onMouseMove.bind(this), 40), false);
        window.addEventListener("keydown", this.onKeyDown.bind(this), false);
        window.addEventListener("keyup", this.onKeyUp.bind(this), false);
        document.querySelector("#viewer").addEventListener("mousedown", this.onMouseDown.bind(this), false);
        //  console.log(this.pdfRef.current.contentWindow.document);
    }

    onMouseDown(event: MouseEvent) {
        if (this.state.pen_touch_mode && !this.state.doingPenTabletModeCrop) {
            this.disableTextLayering();
            this.setState({ cropping: { value: true, clientX: this.state.mousePos.X, clientY: this.state.mousePos.Y }, doingPenTabletModeCrop: true });
            // document.body.style.cursor="none";
            document.body.style.cursor = "crosshair";
            const style: HTMLStyleElement = document.getElementById("myStyle") ? document.getElementById("myStyle") as HTMLStyleElement : document.createElement("style");
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
            if (!document.getElementById("myStyle")) {
                document.body.appendChild(style);
            }
        }
        else if (this.state.pen_touch_mode && this.state.doingPenTabletModeCrop) {
            this.setState({ block: { ...this.state.block, height: Math.abs(this.state.mousePos.Y - this.state.cropping.clientY) , width:  Math.abs(this.state.mousePos.X - this.state.cropping.clientX)},block_mode: true});
        }
    }

    reset() {
        this.setState(INITIAL_STATE);
        this.props.resetAll();
    }

    preparePayload() {
        const title = this.props.values[STEPS.QUESTION];
        const options = {
            1: this.props.values[STEPS.ANSWER_1],
            2: this.props.values[STEPS.ANSWER_2],
            3: this.props.values[STEPS.ANSWER_3],
            4: this.props.values[STEPS.ANSWER_4],
        };
        const correct_answer = this.props.values[STEPS.CORRECT_ANSWER];
        const payload = {
            title: this.props.values[STEPS.QUESTION].mode === CONTENT_MODE.TEXT ? this.props.values[STEPS.QUESTION].content : null,
            mode: this.props.values[STEPS.QUESTION].mode,
            difficulty: this.state.config.difficulty,
            metadata: JSON.stringify(this.metadata),
            image: this.props.values[STEPS.QUESTION].mode === CONTENT_MODE.IMAGE ? this.props.values[STEPS.QUESTION].content : null,
            topic_id: parseInt(this.state.config.topic_id),
            subject_id: parseInt(this.state.config.subject_id),
            summary: this.state.config.summary,
            options: [
                {
                    optionText: options[1] ? options[1].content : null,
                    mode: options[1].mode,
                    isCorrect: correct_answer === 1
                },
                {
                    optionText: options[2] ? options[2].content : null,
                    mode: options[2].mode,
                    isCorrect: correct_answer === 2
                },
                {
                    optionText: options[3] ? options[3].content : null,
                    mode: options[3].mode,
                    isCorrect: correct_answer === 3
                },
                {
                    optionText: options[4] ? options[4].content : null,
                    mode: options[4].mode,
                    isCorrect: correct_answer === 4
                }
            ]

        };
        return payload;
    }

    componentDidUpdate() {
        if (this.state.tasks.length === 0 && this.props.step === STEPS.CORRECT_ANSWER) {
            const enteredAnswer = parseInt(prompt('Which is the correct answer?'));
            this.moveToNextStep(enteredAnswer, CONTENT_MODE.TEXT);
        }
        if (this.props.step === STEPS.SUBMIT) {
            // Finally submit the form.

            const payload = this.preparePayload();
            const _this = this;
            this.props.submit(payload);
        }
    }

    cropCanvas(sourceCanvas: HTMLCanvasElement, left: number, top: number, width: number, height: number) {
        let destCanvas = document.createElement('canvas');
        destCanvas.width = width;
        destCanvas.height = height;
        destCanvas.getContext("2d").drawImage(
            sourceCanvas,
            left, top, width, height,  // source rect with content to crop
            0, 0, width, height);      // newCanvas, same size as source rect
        return destCanvas;
    }
    async onMouseMove(event: MouseEvent) {
        // console.log(event.target);
        event.preventDefault();
        const target = event.target as any;
        let _target = this.state.mousePos.target ? this.state.mousePos.target : null;
        if (target.tagName === "CANVAS" && target.id.slice(0, 4) === "page") {
            _target = target;
        } else {

            if (target.tagName === "SPAN" && target.parentElement.className === "textLayer") {
                _target = target.parentElement.parentElement.querySelector("canvas");
            } else if (target.tagName === "DIV" && target.className === "textLayer") {
                _target = target.parentElement.querySelector("canvas");
            }
        }
        this.setState({ mousePos: { X: event.clientX, Y: event.clientY, target: _target } });
    }

    getRelativePosition(canvas, abs) {
        let pos = { X: 0, Y: 0 };
        if (canvas.tagName === "CANVAS" && canvas.id.slice(0, 4) === "page") {
            const rect = canvas.getBoundingClientRect();
            const xPos = abs.X - rect.x;
            const yPos = abs.Y - rect.y;
            pos = { X: xPos > 0 ? xPos : 0, Y: yPos > 0 ? yPos : 0 };
            console.log(pos);
        }
        return pos;
    }
    async takeScreenshot(canvas) {
        this.setState({ cropping: { ...this.state.cropping, value: false }, doingPenTabletModeCrop: false });
        const relativeCroppingPos = this.getRelativePosition(canvas, { X: this.state.cropping.clientX, Y: this.state.cropping.clientY });
        const relativeMousePos = this.getRelativePosition(canvas, { X: this.state.mousePos.X, Y: this.state.mousePos.Y });

        const width = !this.state.block_mode ? Math.abs(relativeMousePos.X - relativeCroppingPos.X) : this.state.block.width;
        const height = !this.state.block_mode ? Math.abs(relativeMousePos.Y -relativeCroppingPos.Y) : this.state.block.height;
        document.body.style.cursor = "default";
        const style = document.getElementById("myStyle");

        if (style) {
            style.textContent = "";
        }
        const _this = this;
        const _promise = new Promise(async (resolve, reject) => {
            const new_canvas = this.cropCanvas(canvas, relativeCroppingPos.X * DEFAULT_SCALE, relativeCroppingPos.Y * DEFAULT_SCALE, width * DEFAULT_SCALE, height * DEFAULT_SCALE);
            _this.moveToNextStep(new_canvas.toDataURL("image/png"), CONTENT_MODE.IMAGE);
            const _tasks = _this.state.tasks;
            removeByValue(_tasks, this);
            _this.setState({ tasks: _tasks });
            resolve(true);
        });
        this.setState({
            tasks: [
                ...this.state.tasks,
            ],
            cropping: {
                value: false
            }
        });
    }
    async onKeyUp(event: KeyboardEvent) {
        event.preventDefault();
        if ((event.target as any).tagName.toUpperCase() == 'INPUT') {
            return false;
        }
        if (this.state.cropping.value && !this.state.block_mode && event.keyCode == 16) {
            this.takeScreenshot(this.state.mousePos.target);
        }
    }

    moveToNextStep(content: any, mode: number) {
        if (this.props.step !== STEPS.SUBMIT) {
            this.props.moveToNextStep(this.props.step, { content, mode });
        }
    }

    disableTextLayering() {
        const style: HTMLStyleElement = document.getElementById("disableTextlayer") ? document.getElementById("disableTextlayer") as HTMLStyleElement : document.createElement("style");
        style.id = "disableTextlayer";
        style.textContent = `
            .textLayer{
                display: none
            }
        `;
        if (!document.getElementById("disableTextlayer")) {
            document.body.appendChild(style);
        }
    }

    enableTextLayering() {
        if (document.getElementById("disableTextlayer")) {
            document.getElementById("disableTextlayer").textContent = "";
        }
    }

    async onKeyDown(event: KeyboardEvent) {
        if ((event.target as any).tagName.toUpperCase() == 'INPUT') {
            return false;
        }
        const key = event.keyCode;
        const ctrl = event.ctrlKey || event.metaKey;
        if (key == 66) {
            // Toggle block mode with b key
            this.handleBlockModeToggle();
        }
        if (key === 40) {
            event.preventDefault();
            this.setState({ block: { ...this.state.block, height: this.state.block.height + this.state.block.unit } });
        }
        if (key === 38) {
            event.preventDefault();
            this.setState({ block: { ...this.state.block, height: this.state.block.height - this.state.block.unit } });
        }
        if (key === 37) {
            event.preventDefault();
            this.setState({ block: { ...this.state.block, width: this.state.block.width - this.state.block.unit } });
        }
        if (key === 39) {
            event.preventDefault();
            this.setState({ block: { ...this.state.block, width: this.state.block.width + this.state.block.unit } });
        }
        if (key === 83 && this.state.cropping.value) {
            this.takeScreenshot(this.state.mousePos.target);
        }
        if (ctrl && key == 67) {
            // ctrl + c
            console.log("LAA");
            const content = await navigator.clipboard.readText();
            this.moveToNextStep(content, CONTENT_MODE.TEXT);
        } else if (key == 16) {
            this.disableTextLayering();
            this.setState({ cropping: { value: true, clientX: this.state.mousePos.X, clientY: this.state.mousePos.Y } });
            // document.body.style.cursor="none";
            document.body.style.cursor = "crosshair";
            const style: HTMLStyleElement = document.getElementById("myStyle") ? document.getElementById("myStyle") as HTMLStyleElement : document.createElement("style");
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
            if (!document.getElementById("myStyle")) {
                document.body.appendChild(style);
            }
        }
    }

    updateTopicId(value) {
        this.setState({ ...this.state, config: { ...this.state.config, topic_id: value } })
    }

    updateSubjectId(value) {
        this.setState({ ...this.state, config: { ...this.state.config, subject_id: value } })
    }

    updateSummary(value) {
        this.setState({ ...this.state, config: { ...this.state.config, summary: value } })
    }

    updateDifficulty(value) {
        this.setState({ ...this.state, config: { ...this.state.config, difficulty: value } })
    }

    goToThisStep(step) {
        this.props.moveToThisStep(step);
    }

    handleBlockModeToggle() {
        this.setState({ block_mode: this.state.block_mode ? false : true });
    }
    handlePenTouchMode() {
        this.setState({ pen_touch_mode: this.state.pen_touch_mode ? false : true });
    }

    updateBlockWidth(width) {
        this.setState({ block: { ...this.state.block, width } });
    }

    updateBlockHeight(height) {
        this.setState({ block: { ...this.state.block, height } });
    }

    handleOverlayResize(width, height) {
        this.setState({ block: { ...this.state.block, width, height } });
    }

    preparePreview() {
        const question = this.props.values[STEPS.QUESTION] ? this.props.values[STEPS.QUESTION] : {};
        const answer_1 = this.props.values[STEPS.ANSWER_1] ? this.props.values[STEPS.ANSWER_1] : {};
        const answer_2 = this.props.values[STEPS.ANSWER_2] ? this.props.values[STEPS.ANSWER_2] : {};
        const answer_3 = this.props.values[STEPS.ANSWER_3] ? this.props.values[STEPS.ANSWER_3] : {};
        const answer_4 = this.props.values[STEPS.ANSWER_4] ? this.props.values[STEPS.ANSWER_4] : {};

        return (
            <React.Fragment>
                {question.mode === CONTENT_MODE.TEXT && (<div className={css(styles.preview_question)}><h2><span className={css(styles.preview_index)}>Q.</span> {question.content}</h2></div>)}
                {question.mode === CONTENT_MODE.IMAGE && (<div className={css(styles.preview_question)}><span className={css(styles.preview_index)}>Q.</span><img src={question.content} /></div>)}
                {answer_1.mode === CONTENT_MODE.TEXT && (<div className={css(styles.preview_answer)}><h4><span className={css(styles.preview_index)}>(a)</span>{answer_1.content}</h4></div>)}
                {answer_1.mode === CONTENT_MODE.IMAGE && (<div className={css(styles.preview_answer)}><span className={css(styles.preview_index)}>(a)</span><img src={answer_1.content} /></div>)}
                {answer_2.mode === CONTENT_MODE.TEXT && (<div className={css(styles.preview_answer)}><h4><span className={css(styles.preview_index)}>(b)</span>{answer_2.content}</h4></div>)}
                {answer_2.mode === CONTENT_MODE.IMAGE && (<div className={css(styles.preview_answer)}><span className={css(styles.preview_index)}>(b)</span><img src={answer_2.content} /></div>)}
                {answer_3.mode === CONTENT_MODE.TEXT && (<div className={css(styles.preview_answer)}><h4><span className={css(styles.preview_index)}>(c)</span>{answer_3.content}</h4></div>)}
                {answer_3.mode === CONTENT_MODE.IMAGE && (<div className={css(styles.preview_answer)}><span className={css(styles.preview_index)}>(c)</span><img src={answer_3.content} /></div>)}
                {answer_4.mode === CONTENT_MODE.TEXT && (<div className={css(styles.preview_answer)}><h4><span className={css(styles.preview_index)}>(d)</span>{answer_4.content}</h4></div>)}
                {answer_4.mode === CONTENT_MODE.IMAGE && (<div className={css(styles.preview_answer)}><span className={css(styles.preview_index)}>(d)</span><img src={answer_4.content} /></div>)}

            </React.Fragment>
        )
    }

    updateBlockUnit(unit) {
        this.setState({ block: { ...this.state.block, unit: parseInt(unit) ? parseInt(unit) : 0 } });
    }

    render() {
        const isQuestion = (this.props.step === STEPS.QUESTION);
        const isAnswer1 = (this.props.step === STEPS.ANSWER_1);
        const isAnswer2 = (this.props.step === STEPS.ANSWER_2);
        const isAnswer3 = (this.props.step === STEPS.ANSWER_3);
        const isAnswer4 = (this.props.step === STEPS.ANSWER_4);
        const isCorrectAnswer = (this.props.step === STEPS.CORRECT_ANSWER);
        // console.log(this.state);
        // console.log(this.state.cropping.clientX, this.state.cropping.clientY);
        return (
            <div className={css(styles.container)}>
                <div className={css(styles.stepsSection)}>
                    <div className={css(styles.stepsHeading)}>Config</div>
                    <div className={css(styles.buttonsContainer)}>
                        <Input placeholder="Enter topic_id" title="Topic" value={this.state.config.topic_id} callback={this.updateTopicId.bind(this)} />
                        <Input placeholder="Enter subject_id" title="Subject" value={this.state.config.subject_id} callback={this.updateSubjectId.bind(this)} />
                        <Input placeholder="Enter difficulty" title="Difficulty" value={this.state.config.difficulty} callback={this.updateDifficulty.bind(this)} />
                        <Input placeholder="Enter summary" title="Summary" value={this.state.config.summary} callback={this.updateSummary.bind(this)} />
                        <Switch value={this.state.block_mode} toggleCallback={this.handleBlockModeToggle.bind(this)}>Block Mode:</Switch>
                        {this.state.block_mode &&
                            <React.Fragment>
                                <Input placeholder="Enter Block Width" title="Width" value={this.state.block.width} callback={this.updateBlockWidth.bind(this)} />
                                <Input placeholder="Enter Block Height" title="Height" value={this.state.block.height} callback={this.updateBlockHeight.bind(this)} />
                                <Input placeholder="Enter Block Unit" title="Unit" value={this.state.block.unit} callback={this.updateBlockUnit.bind(this)} />

                            </React.Fragment>
                        }
                        <Switch value={this.state.pen_touch_mode} toggleCallback={this.handlePenTouchMode.bind(this)}>Pen Touch Mode:</Switch>

                    </div>
                    <div className={css(styles.stepsHeading)}></div>
                    <div className={css(styles.stepsHeading)}></div>
                    <div className={css(styles.stepsHeading)}>Steps</div>
                    <div className={css(styles.buttonsContainer)}>
                        <Button text="Select Question" selected={isQuestion} callback={this.goToThisStep.bind(this, STEPS.QUESTION)}></Button>
                        <Button text="Select Answer 1" selected={isAnswer1} callback={this.goToThisStep.bind(this, STEPS.ANSWER_1)}></Button>
                        <Button text="Select Answer 2" selected={isAnswer2} callback={this.goToThisStep.bind(this, STEPS.ANSWER_2)}></Button>
                        <Button text="Select Answer 3" selected={isAnswer3} callback={this.goToThisStep.bind(this, STEPS.ANSWER_3)}></Button>
                        <Button text="Select Answer 4" selected={isAnswer4} callback={this.goToThisStep.bind(this, STEPS.ANSWER_4)}></Button>
                        <Button text="Select Correct Answer" selected={isCorrectAnswer} callback={this.goToThisStep.bind(this, STEPS.CORRECT_ANSWER)}></Button>
                        <button onClick={this.reset.bind(this)} className={css(styles.resetButton)}>Reset</button>
                        <button onClick={this.openModal} className={css(styles.previewButton)}>Preview</button>
                    </div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        {this.preparePreview()}
                    </Modal>

                </div>
                {this.state.cropping.value &&
                    <React.Fragment>
                        <AreaOverlay resizeCallback={this.handleOverlayResize.bind(this)} x={this.state.cropping.clientX} y={this.state.cropping.clientY} width={!this.state.block_mode ? Math.abs(this.state.mousePos.X - this.state.cropping.clientX) : this.state.block.width} height={!this.state.block_mode ? Math.abs(this.state.mousePos.Y - this.state.cropping.clientY) : this.state.block.height}></AreaOverlay>
                    </React.Fragment>
                }
            </div>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        background: "#fff",
        position: "relative"
    },
    resetButton: {
        position: "absolute",
        top: "20px",
        right: "20px",
        padding: "4px 15px",
        borderRadius: "10px"
    },
    previewButton: {
        position: "absolute",
        top: "20px",
        left: "20px",
        padding: "4px 15px",
        borderRadius: "10px"
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
    },
    preview_question: {
        display: "flex",
        alignItems: "center",
        marginBottom: "20px"
    },
    preview_answer: {
        display: "flex",
        alignItems: "center",
        marginTop: "10px"
    },
    preview_index: {
        marginRight: "3px",
        fontWeight: 700,
        fontSize: "15px"
    }
});

const mapStateToProps = ({ app }: any) => ({
    step: app.step,
    values: app.values
});

const mapDispatchToProps = {
    moveToNextStep,
    resetAll,
    submit,
    moveToThisStep
};

export default connect(mapStateToProps, mapDispatchToProps,
)(Dashboard);