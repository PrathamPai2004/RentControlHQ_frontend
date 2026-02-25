import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLease } from './my-lease';

describe('MyLease', () => {
  let component: MyLease;
  let fixture: ComponentFixture<MyLease>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyLease]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyLease);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
