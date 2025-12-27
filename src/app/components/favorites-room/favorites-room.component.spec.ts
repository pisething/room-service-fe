import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesRoomComponent } from './favorites-room.component';

describe('FavoritesRoomComponent', () => {
  let component: FavoritesRoomComponent;
  let fixture: ComponentFixture<FavoritesRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
