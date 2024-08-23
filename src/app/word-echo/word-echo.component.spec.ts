import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordEchoComponent } from './word-echo.component';

describe('WordEchoComponent', () => {
  let component: WordEchoComponent;
  let fixture: ComponentFixture<WordEchoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordEchoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordEchoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
