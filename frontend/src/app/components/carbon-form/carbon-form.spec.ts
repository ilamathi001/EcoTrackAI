import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonForm } from './carbon-form';

describe('CarbonForm', () => {
  let component: CarbonForm;
  let fixture: ComponentFixture<CarbonForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarbonForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CarbonForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
