import { Component, OnInit } from '@angular/core';
import { CatDetailsService } from '../cat-details.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  cats; //interface later?
  constructor(private catServ: CatDetailsService) {}

  ngOnInit(): void {
    this.getCats();
  }

  getCats = () => {
    this.catServ.getCats().subscribe(
      (response) => {
        console.log('Data stuff yo', response);
        this.cats = response;
      },
      (error) => {
        console.log(error.message);
      }
    );
  };
}
