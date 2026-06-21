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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have formData object', () => {
    expect(component.formData).toBeTruthy();
  });

  it('should have carbonScore property', () => {
    expect(component.carbonScore).toBeDefined();
  });

  it('should render EcoTrackAI title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('EcoTrackAI');
  });

  it('should render Calculate button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Calculate Carbon Footprint');
  });
});