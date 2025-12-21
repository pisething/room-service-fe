import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesActiveFiltersComponent } from './properties-active-filters.component';

describe('PropertiesActiveFiltersComponent', () => {
  let component: PropertiesActiveFiltersComponent;
  let fixture: ComponentFixture<PropertiesActiveFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertiesActiveFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertiesActiveFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
