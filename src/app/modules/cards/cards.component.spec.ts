import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsComponent } from './cards.component';
import { Router } from '@angular/router';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clickCard() is called with an id', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const id = 123;

    component.clickCard(id);
    expect(navigateSpy).toHaveBeenCalledWith(['/detail', id]);
  });

  it('should clickCard() is called without an id', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.clickCard();

    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
