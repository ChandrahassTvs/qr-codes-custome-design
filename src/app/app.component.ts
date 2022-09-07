import { Component, VERSION } from '@angular/core';
import JSZip = require('jszip');
import { saveAs } from 'file-saver';
import { QR_DATA } from './data';
import { SafeUrl } from '@angular/platform-browser';
import * as htmlToImage from 'html-to-image';
import { toSvg } from 'html-to-image';
import { documentToSVG, elementToSVG, inlineResources } from 'dom-to-svg';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  QR_DATA = QR_DATA;
  qrDataUrls = [];

  download(start = 0, end = 200) {
    const zip = new JSZip();
    QR_DATA.forEach((data, index) => {
      if (index >= start && index < end) {
        let temp = this;
        const xml = elementToSVG(document.getElementById(data.ID));

        let xmlString = new XMLSerializer().serializeToString(
          xml.documentElement
        );
        xmlString = xmlString.replace('36px', '18px');
        console.log(xmlString);
        zip.file(`${data.ID}.svg`, xmlString);
        // htmlToImage
        //   .toBlob(document.getElementById(data.ID))
        //   .then(function (dataUrl) {
        //     temp.qrDataUrls.push({
        //       id: data.ID,
        //       dataUrl,
        //     });
        //     console.log(dataUrl);

        // var dl = document.createElement('a');
        // dl.setAttribute('href', dataUrl);
        // dl.setAttribute('download', `${data.ID}.jpeg`);
        // dl.click();

        // console.log(dataUrl.replace(/^data:image\/(png|jpg);base64,/, ''));
        // zip.file(`${data.ID}.png`, dataUrl, { base64: true });
        // });
        // Capture specific element
        // const svgDocument = elementToSVG(document.getElementById(data.ID));

        // // Inline external resources (fonts, images, etc) as data: URIs
        // await inlineResources(svgDocument.documentElement);

        // // Get SVG string
        // const svgString = new XMLSerializer().serializeToString(svgDocument);
        // // zip.file(`${data.ID}.svg`, svgString);
        // console.log(svgDocument, svgString);
      }
    });
    zip.generateAsync({ type: 'blob' }).then(function (content) {
      saveAs(content, 'qr-codes.zip');
    });
  }
  filter(node) {
    return node.tagName !== 'i';
  }

  downloadAll() {
    let start = 0;
    let count = 5;
    console.log('Exporting all files');
    const interval = setInterval(() => {
      this.download(start, start + count);
      start = start + count;
      if (start >= QR_DATA.length) {
        console.log('Exported all files');
        clearInterval(interval);
      }
    }, 5000);
  }
}
