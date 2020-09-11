import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatBioComponent } from './cat-bio.component';

describe('CatBioComponent', () => {
  let component: CatBioComponent;
  let fixture: ComponentFixture<CatBioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatBioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
