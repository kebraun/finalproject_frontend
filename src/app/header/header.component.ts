import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  showNav = () => {
    let x = document.getElementById('nav');
    if (x.className === 'navbar-links') {
      x.className += ' responsive';
    } else {
      x.className = 'navbar-links';
    }
  };
}
