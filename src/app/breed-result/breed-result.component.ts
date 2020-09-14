import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CatBreedDetailsService } from '../cat-breed-details.service';

@Component({
  selector: 'app-breed-result',
  templateUrl: './breed-result.component.html',
  styleUrls: ['./breed-result.component.css'],
})
export class BreedResultComponent implements OnInit {
  filteredBreeds: any = [];

  constructor(
    private catBreedService: CatBreedDetailsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filteredBreeds = this.catBreedService.getFilteredBreeds();
  }

  getSelectedOptions = (options: any) => {
    let selectedOptions: string[] = [];
    for (const [key, value] of Object.entries(options)) {
      // console.log(`${key}: ${value}`);
      if (value) {
        console.log(`pushed ${key}: ${value}`);
        selectedOptions.push(key);
      }
    }
    return selectedOptions;
  };

  setBreedsToSearch = (breedForm: NgForm) => {
    let breedsArr: string[] = this.getSelectedOptions(breedForm.value.breeds);
    console.log(breedsArr);
    this.catBreedService.setBreedsToSearch(breedsArr);
    this.router.navigate(['search']);
  };
}
