import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { GameStoreService } from '../../services/game-store.service';
import { IGameTotalData } from '../../models/IGameTotalData.model';
import { of } from 'rxjs';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockGameStoreService: jasmine.SpyObj<GameStoreService>;

  beforeEach(async () => {
    mockGameStoreService = jasmine.createSpyObj('GameStoreService', ['getGameStores']);
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: GameStoreService, useValue: mockGameStoreService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set gameStoreArray when getGameStores() is called', () => {
    const mockGameTotalData: IGameTotalData = {
      results: [{
        domain: 'data',
        games: [{
          added: 2,
          id: 2,
          name: 'data',
          slug: 'data',
        }],
        games_count: 2,
        id: 2,
        image_background: 'data',
        name: 'data',
        slug: 'data',
        description: 'data',
      }]
    };

    mockGameStoreService.getGameStores.and.returnValue(of(mockGameTotalData));
    component.getGameStores();

    expect(component.gameStoreArray).toEqual(mockGameTotalData.results);
  });
});
