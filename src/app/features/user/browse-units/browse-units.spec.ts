import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseUnits } from './browse-units';

describe('BrowseUnits', () => {
  let component: BrowseUnits;
  let fixture: ComponentFixture<BrowseUnits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseUnits]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseUnits);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
