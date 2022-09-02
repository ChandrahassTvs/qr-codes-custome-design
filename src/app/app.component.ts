import { Component, VERSION } from '@angular/core';
import JSZip = require('jszip');
import { saveAs } from 'file-saver';
import { QR_DATA } from './data';
import { SafeUrl } from '@angular/platform-browser';
import * as htmlToImage from 'html-to-image';
import { toSvg } from 'html-to-image';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  QR_DATA = QR_DATA;
  qrDataUrls = [];

  download(start = 0, end = 20) {
    const zip = new JSZip();
    QR_DATA.forEach((data, index) => {
      if (index >= start && index < end) {
        console.log(index);
        let temp = this;
        htmlToImage
          .toSvg(document.getElementById(data.ID), { filter: temp.filter })
          .then(function (dataUrl) {
            temp.qrDataUrls.push({
              id: data.ID,
              dataUrl,
            });
            var dl = document.createElement('a');
            document.body.appendChild(dl); // This line makes it work in Firefox.
            dl.setAttribute('href', dataUrl);
            dl.setAttribute('download', `${data.ID}.svg`);
            dl.click();
          });
      }
    });
    // this.qrDataUrls.forEach((data, i) => {
    //   zip.file(`${data.id}.svg`, data.dataUrl);
    // });

    // zip.generateAsync({ type: 'blob' }).then(function (content) {
    //   saveAs(content, 'qr-codes.zip');
    // });
  }
  filter(node) {
    return node.tagName !== 'i';
  }

  downloadAll() {
    let start = 0;
    let count = 20;
    const interval = setInterval(() => {
      // this.download(start, start + count);
      console.log('hey');
      start = start + count;
    }, 1000);
  }
}
