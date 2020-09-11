import { CatDetailsService } from './../cat-details.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private catServ: CatDetailsService) {}
  cats: any;
  ngOnInit(): void {
    this.getCats();
  }

  getCats = () => {
    this.catServ.getCats().subscribe(
      (response) => {
        console.log('Data stuff yo', response);
        // this.cats = response.data.children;
      },
      (error) => {
        console.log(error.message);
      }
    );
  };
}
