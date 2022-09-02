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
  name = 'Angular ' + VERSION.major;
  QR_DATA = QR_DATA;
  qrDataUrls = [];

  // onQrCodeURL(localUrl: SafeUrl, qrCode) {
  //   this.qrDataUrls.push({
  //     id: qrCode.ID,
  //     url: localUrl,
  //   });
  // }

  download() {
    // const zip = new JSZip();
    // console.log(this.qrDataUrls.length, this.qrDataUrls);
    // this.qrDataUrls.forEach((data, i) => {
    //   if (i <= 5) {
    //     var blob = new Blob([data.url], {
    //       type: 'image/svg+xml;charset=utf-8',
    //     });
    //     var reader = new FileReader();
    //     reader.readAsDataURL(blob);
    //     console.log(blob, reader);
    //     zip.file(`${data.id}.svg`, reader.result);
    //   }
    // });
    // zip.generateAsync({ type: 'blob' }).then(function (content) {
    //   // see FileSaver.js
    //   // saveAs(content, 'qr-codes.zip');
    // });
    const zip = new JSZip();
    QR_DATA.forEach((data, index) => {
      if (index < 1) {
        let temp = this;
        htmlToImage
          .toBlob(document.getElementById(data.ID), {
            type: 'image/svg+xml;charset=utf-8',
          })
          .then(function (dataUrl) {
            console.log(dataUrl);
            /* do something */
            temp.qrDataUrls.push({
              id: data.ID,
              dataUrl,
            });
            saveAs(dataUrl, 'my-node.svg');
          });
      }
    });
    setTimeout(() => {
      // console.log(this.qrDataUrls);
      this.qrDataUrls.forEach((data, i) => {
        console.log(window.btoa(data.dataUrl));
        zip.file(`${data.id}.svg`, window.btoa(data.dataUrl), { base64: true });
      });

      zip.generateAsync({ type: 'blob' }).then(function (content) {
        // see FileSaver.js
        // saveAs(content, 'qr-codes.zip');
      });
    }, 100);
  }
  filter(node) {
    return node.tagName !== 'i';
  }
}
