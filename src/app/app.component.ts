import { Component, VERSION } from '@angular/core';
import JSZip = require('jszip');
import { saveAs } from 'file-saver';
import { QR_DATA } from './data';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  QR_DATA = QR_DATA;

  onQrCodeURL(localUrl, qrCode) {
    console.log(localUrl, qrCode);
  }

  download() {
    const zip = new JSZip();
    // create a file
    zip.file('hello.txt', 'Hello[p my)6cxsw2q');
    // oops, cat on keyboard. Fixing !
    zip.file('hello.txt', 'Hello World\n');

    // create a file and a folder
    zip.file('nested/hello.txt', 'Hello World\n');
    // same as
    zip.folder('nested').file('hello.txt', 'Hello World\n');
    zip.generateAsync({ type: 'blob' }).then(function (content) {
      // see FileSaver.js
      saveAs(content, 'example.zip');
    });
  }
}
