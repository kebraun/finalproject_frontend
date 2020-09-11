import { CatDetailsService } from './../cat-details.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cat-card',
  templateUrl: './cat-card.component.html',
  styleUrls: ['./cat-card.component.css'],
})
export class CatCardComponent implements OnInit {
  @Input() catRef: any; //Cat interface?
  constructor() {}

  ngOnInit(): void {}
}
