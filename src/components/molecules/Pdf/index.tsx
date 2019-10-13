import React from 'react';

export default class PDFViewer extends React.Component<any, any> {
    viewerRef: any;
    backend: any;

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    // this.backend.init(src, element);
  }
  

  render() {
    return (
      <div ref={this.viewerRef} id='viewer' style={{ width: '100%', height: '100%' }}>
      </div>
    )
  }
}