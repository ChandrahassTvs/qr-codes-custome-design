import { Component, VERSION } from '@angular/core';
import { QR_DATA } from './data';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  QR_DATA = QR_DATA;
}
