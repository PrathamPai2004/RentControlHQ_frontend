import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Towers } from './towers';

describe('Towers', () => {
  let component: Towers;
  let fixture: ComponentFixture<Towers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Towers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Towers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
