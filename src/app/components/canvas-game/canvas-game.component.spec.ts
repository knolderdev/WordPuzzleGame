import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CanvasGameComponent} from './canvas-game.component';

describe('CanvasGameComponent', () => {
  let component: CanvasGameComponent;
  let fixture: ComponentFixture<CanvasGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CanvasGameComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
