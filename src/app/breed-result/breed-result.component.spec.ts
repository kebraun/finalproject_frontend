import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedResultComponent } from './breed-result.component';

describe('BreedResultComponent', () => {
  let component: BreedResultComponent;
  let fixture: ComponentFixture<BreedResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreedResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
