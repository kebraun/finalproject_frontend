import { ActivatedRoute, Router } from '@angular/router';
import { CatDetailsService } from './../cat-details.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cat-card',
  templateUrl: './cat-card.component.html',
  styleUrls: ['./cat-card.component.css'],
})
export class CatCardComponent implements OnInit {
  @Input() catRef;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  showCatBio = (catId: number) => {
    // this.router.navigate(['search'], {

    this.router.navigate(['cat-bio'], {
      queryParams: {
        cat: catId,
      },
    });
  };
}
