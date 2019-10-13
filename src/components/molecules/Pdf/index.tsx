import React, { useRef, useEffect, useState, ReactElement, Ref } from 'react';
import pdfjs, { PDFPageProxy, PDFJS, PDFDocumentProxy, PDFPageViewport } from 'pdfjs-dist';
import PrepareCanvas from "./pdfCanvas";
import { StyleSheet, css } from 'aphrodite';
import { Viewport } from 'csstype';

const pdfjsWorker: any = require('pdfjs-dist/build/pdf.worker.entry');

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
const DEFAULT_SCALE = 1.33;
let PAGE_HEIGHT: number;

var __html = require('./viewer/viewer.html');
var template = { __html: __html };

export const PdfComponent = ({ src }: any) => {
    const viewer = useRef(null);
    const [pages, setPages] = useState(null as any);
    const [pdfDocument, setPdfDocument] = useState(null as any);

    const createEmptyPage = function (num: number) {
        return (
            <div key={num} className="page" id={`pageContainer${num}`} data-loaded={false} data-page-number={num}>
                <div className="canvasWrapper">
                    <canvas id={`page${num}`}></canvas>
                </div>
                <div className="textLayer">

                </div>
            </div>
        );
    };
    const loadPage = function (pageNum: number) {
        return pdfDocument.getPage(pageNum).then((pdfPage: PDFPageProxy) => {
            let page: HTMLDivElement = document.getElementById(`pageContainer${pageNum}`) as any;
            let canvas: HTMLCanvasElement = page.querySelector('canvas') as any;
            let wrapper: HTMLDivElement = page.querySelector('.canvasWrapper') as any;
            let container: HTMLDivElement = page.querySelector('.textLayer') as any;
            let canvasContext: CanvasRenderingContext2D = canvas.getContext('2d') as any;
            let viewport = pdfPage.getViewport({ scale: DEFAULT_SCALE });

            canvas.width = viewport.width * 2;
            canvas.height = viewport.height * 2;
            page.style.width = `${viewport.width}px`;
            page.style.height = `${viewport.height}px`;
            wrapper.style.width = `${viewport.width}px`;
            wrapper.style.height = `${viewport.height}px`;
            container.style.width = `${viewport.width}px`;
            container.style.height = `${viewport.height}px`;

            pdfPage.render({
                canvasContext,
                viewport
            });

            pdfPage.getTextContent().then((textContent: any) => {
                (pdfjs as any).renderTextLayer({
                    textContent,
                    container,
                    viewport,
                    textDivs: []
                });
            });

            page.setAttribute('data-loaded', 'true');

            return pdfPage;
        });
    };

    const handleWindowScroll = function (event: any) {
        if (PAGE_HEIGHT && pdfDocument) {
            let visiblePageNum = Math.round(window.scrollY / PAGE_HEIGHT) + 1;
            let visiblePage = document.querySelector(`.page[data-page-number="${visiblePageNum}"][data-loaded="false"]`);
            if (visiblePage) {
                setTimeout(function () {
                    loadPage(visiblePageNum);
                });
            }
        }
    }
    window.addEventListener('scroll', handleWindowScroll);

    useEffect(() => {
        const fetchPdf = async () => {
            const _doc = await pdfjs.getDocument(src).promise;
            setPdfDocument(_doc);
            const _pages = [];
            for (let i = 0; i < _doc.numPages; i++) {
                let page = createEmptyPage(i + 1);
                _pages.push(page);
            }
            setPages(_pages);
        };
        fetchPdf();
    }, [src]);

    useEffect(() => {
        if (pages && pages.length > 0) {
            console.log(pdfDocument);
            loadPage(1).then((pdfPage: PDFPageProxy) => {
                let viewport: PDFPageViewport = pdfPage.getViewport({ scale: DEFAULT_SCALE });
                PAGE_HEIGHT = viewport.height;
                document.body.style.width = `${viewport.width}px`;
            });
        }
    }, [pages]);

    return (
        <div dangerouslySetInnerHTML={template}>

        </div>
    );
};

const styles = StyleSheet.create({
    pdfViewer: {
        boxShadow: "0 0 3px #bbb"
    }
});

export default PdfComponent;