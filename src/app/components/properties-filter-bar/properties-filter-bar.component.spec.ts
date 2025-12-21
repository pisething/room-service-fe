import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesFilterBarComponent } from './properties-filter-bar.component';

describe('PropertiesFilterBarComponent', () => {
  let component: PropertiesFilterBarComponent;
  let fixture: ComponentFixture<PropertiesFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertiesFilterBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertiesFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
