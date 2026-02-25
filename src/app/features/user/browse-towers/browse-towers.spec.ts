import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseTowers } from './browse-towers';

describe('BrowseTowers', () => {
  let component: BrowseTowers;
  let fixture: ComponentFixture<BrowseTowers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseTowers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseTowers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
