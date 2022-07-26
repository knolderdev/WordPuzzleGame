import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameJsComponent } from './game-js.component';

describe('GameJsComponent', () => {
  let component: GameJsComponent;
  let fixture: ComponentFixture<GameJsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameJsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
