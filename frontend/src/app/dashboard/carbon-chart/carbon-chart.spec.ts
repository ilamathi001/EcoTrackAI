import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonChart } from './carbon-chart';

describe('CarbonChart', () => {
  let component: CarbonChart;
  let fixture: ComponentFixture<CarbonChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarbonChart],
    }).compileComponents();

    fixture = TestBed.createComponent(CarbonChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
