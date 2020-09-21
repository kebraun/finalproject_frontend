import { Router } from '@angular/router';
import { CatDetailsService } from './../cat-details.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cat-card',
  templateUrl: './cat-card.component.html',
  styleUrls: ['./cat-card.component.css'],
})
export class CatCardComponent implements OnInit {
  @Input() catRef;
  @Output() deleted = new EventEmitter<void>();
  favoriteFlag: boolean = false;

  constructor(private router: Router, private cService: CatDetailsService) {}

  ngOnInit(): void {
    if (this.cService.getFavoriteCats().includes(this.catRef.id)) {
      this.favoriteFlag = true;
    }
  }

  showCatBio = (catId: number, orgId: string) => {
    this.router.navigate(['cat-bio'], {
      queryParams: {
        cat: catId,
        org: orgId,
      },
    });
  };

  handleHeartClick = (catId: number) => {
    if (this.catRef.isFavorite) {
      this.delete();
    } else {
      this.addToFavorites(catId);
      this.favoriteFlag = !this.favoriteFlag;
    }
  };

  addToFavorites = (catId: number) => {
    this.cService.addFavoriteCat(catId);
  };

  delete = () => {
    this.deleted.emit();
  };
}
