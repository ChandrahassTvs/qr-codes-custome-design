import { Component, VERSION } from '@angular/core';
import JSZip = require('jszip');
import { saveAs } from 'file-saver';
import { QR_DATA } from './data';
import { SafeUrl } from '@angular/platform-browser';
import * as htmlToImage from 'html-to-image';
import { toSvg } from 'html-to-image';
import { documentToSVG, elementToSVG, inlineResources } from 'dom-to-svg';
import { potrace } from 'potrace';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  QR_DATA = QR_DATA;
  qrDataUrls = [];

  download(start = 0, end = 5) {
    const zip = new JSZip();
    QR_DATA.forEach(async (data, index) => {
      if (index >= start && index < end) {
        let temp = this;
        htmlToImage
          .toPng(document.getElementById(data.ID))
          .then(function (dataUrl) {
            temp.qrDataUrls.push({
              id: data.ID,
              dataUrl,
            });
            // var dl = document.createElement('a');
            // dl.setAttribute('href', dataUrl);
            // dl.setAttribute('download', `${data.ID}.png`);
            // dl.click();

            potrace.trace('./path/to/image.png', function (err, svg) {
              if (err) throw err;
              console.log(svg);
            });

            // console.log(dataUrl.replace(/^data:image\/(png|jpg);base64,/, ''));
            // zip.file(`${data.ID}.png`, dataUrl, { base64: true });
          });
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
