import { CatDetailsService } from './../cat-details.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cat-card',
  templateUrl: './cat-card.component.html',
  styleUrls: ['./cat-card.component.css'],
})
export class CatCardComponent implements OnInit {
  cat: any;

  constructor(private catServ: CatDetailsService) {}

  ngOnInit(): void {
    this.getCats();
  }

  getCats = () => {
    this.cat = this.catServ.getCats();
  };
}
