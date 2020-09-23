import { Component, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  animate,
  style,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          height: '300px',
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          height: '0px',
          opacity: 0,
        })
      ),
      transition('open => closed', [animate('0.5s')]),
      transition('closed => open', [animate('0.5s')]),
      transition('* => closed', [animate('1s')]),
      transition('* => open', [animate('0.5s')]),
      transition('open <=> closed', [animate('0.5s')]),
      transition('* => open', [animate('1s', style({ opacity: '*' }))]),
      transition('* => *', [animate('1s')]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  isOpen = false;

  constructor() {}
  ngOnInit(): void {}

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
