import { Component, OnInit } from '@angular/core';
import { CatDetailsService } from '../cat-details.service';
import { CatBreedDetailsService } from '../cat-breed-details.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  catBreeds: any = [];
  constructor(
    private catServ: CatDetailsService,
    private breedService: CatBreedDetailsService
  ) {}
  cats: any;
  ngOnInit(): void {
    // this.getCats();

    this.getCatBreedDetails();
  }

  //   getCats = () => {
  //     this.catServ.getCats().subscribe(
  //       (response) => {
  //         console.log('Data stuff yo', response);
  //         // this.cats = response.data.children;
  //       },
  //       (error) => {
  //         console.log(error.message);
  //       }
  //     );
  //   };

  getCatBreedDetails = () => {
    this.breedService.getCatBreedDetails().subscribe(
      (response) => {
        console.log('Breed stuff yo', response);
        this.catBreeds = response;
      },
      (error) => {
        console.log(error.message);
      }
    );
  };
}
