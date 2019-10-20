import React, { ReactPortal, RefObject } from 'react';
import ReactDOM from 'react-dom';
import { css, StyleSheet } from 'aphrodite';
import { Resizable, ResizableBox } from "react-resizable";
import { relative } from 'path';

interface iProps {
    x: number;
    y: number;
    height: number;
    width: number;
    style?: any;
    resizeCallback?: any;
}
export default class AreaOverlay extends React.Component<any, any> {
    viewerRef: any;
    backend: any;
    ref: RefObject<HTMLDivElement>;

    state = {handle: null, }
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.resize = this.resize.bind(this);
        this.stopResize = this.stopResize.bind(this);
    }

    componentDidMount() {
        // this.backend.init(src, element);
    }

    handleMouseDown(event: MouseEvent, handle){
        this.setState({handle: handle});
        window.addEventListener('mousemove', this.resize, false);
        window.addEventListener('mouseup', this.stopResize, false);
    }

    resize(event) {
        console.log(event.clientX, this.ref.current.offsetLeft);
        const width = this.state.handle === "w" ? (event.clientX - this.ref.current.offsetLeft ) : this.ref.current.offsetWidth;
        const height = this.state.handle === "h" ? (event.clientY -  this.ref.current.offsetTop) : this.ref.current.offsetHeight;
        if(this.props.resizeCallback){
            this.props.resizeCallback(width, height);
        }
    }

    stopResize(){
        window.removeEventListener('mousemove', this.resize, false);
        window.removeEventListener('mouseup', this.stopResize, false);
    }

    
    render() {
        const { x, y, width, height } = this.props;

        return ReactDOM.createPortal(
            (
                <div className={css(styles.overlay)} ref={this.ref} style={{top: y, left: x, width: width >= 0 ? width : 0, height: height >= 0 ? height : 0, ...this.props.style}}>
                    <div className={css(styles.container)}>
                        <div className={css(styles.bottomIncrease)} onMouseDown={(event: any) => {this.handleMouseDown(event, "h")}}></div>
                        <div className={css(styles.rightIncrease)} onMouseDown={(event: any) => {this.handleMouseDown(event, "w")}}></div>
                    </div>
                </div>
            ),
            document.getElementsByTagName("body")[0]
        );
    }
}

const styles = StyleSheet.create({
    overlay:{
        background: "rgba(0, 0, 0, 0.3)",
        position: "absolute",
        zIndex: 12,
    },
    container: {
        width: "100%",
        height: "100%",
        position: "relative"
    },
    bottomIncrease: {
        cursor: "s-resize",
        bottom: 0,
        position: "absolute",
        width: "100%",
        height: "4px"
    },
    rightIncrease: {
        cursor: "e-resize",
        right: 0,
        position: "absolute",
        height: "100%",
        width: "4px" 
    }
});