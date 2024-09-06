import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WpmComponentComponent } from './wpm-component.component';

describe('WpmComponentComponent', () => {
  let component: WpmComponentComponent;
  let fixture: ComponentFixture<WpmComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WpmComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WpmComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
