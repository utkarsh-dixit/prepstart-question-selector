import React, { useRef, useEffect, useState, ReactElement, Ref } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Toolbar from "./toolbar";
import pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import PropTypes from 'prop-types';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const PdfComponent = ({ src }: any) => {
  const canvasRef = useRef(null)
  console.log("Url of pdf: ", src);
  useEffect(() => {
    const fetchPdf = async () => {
      const loadingTask = pdfjs.getDocument(src);

      const pdf = await loadingTask.promise;

      const firstPageNumber = 1;

      const page = await pdf.getPage(firstPageNumber);

      const scale = 1.5;
      const viewport = page.getViewport({ scale: scale });

      // Prepare canvas using PDF page dimensions
      const canvas = canvasRef.current;

      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page into canvas context
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      const renderTask = page.render(renderContext);

      await renderTask.promise;
    };

    fetchPdf();
  }, [src]);

  return (
    <div className={css(styles.pdfViewer)}>
      <Toolbar />
      <div className={css(styles.content)}>
        <canvas
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  pdfViewer: {
    boxShadow: "0 0 3px #bbb"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});


PdfComponent.propTypes = {
  src: PropTypes.string
};

PdfComponent.defaultProps = {
  src: `${process.env.PUBLIC_URL}/helloworld.pdf`
};

export default PdfComponent;