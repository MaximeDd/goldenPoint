import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusviewComponent } from './bonusview.component';

describe('BonusviewComponent', () => {
  let component: BonusviewComponent;
  let fixture: ComponentFixture<BonusviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
