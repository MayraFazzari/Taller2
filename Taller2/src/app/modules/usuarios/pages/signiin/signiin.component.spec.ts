import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigniinComponent } from './signiin.component';

describe('SigniinComponent', () => {
  let component: SigniinComponent;
  let fixture: ComponentFixture<SigniinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigniinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigniinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
