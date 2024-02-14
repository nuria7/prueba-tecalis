import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailComponent } from './card-detail.component';
import { GameStoreService } from '../../../../services/game-store.service';
import { IGameResultsData } from '../../../../models/IGameResultsData.model';
import { of } from 'rxjs';
import { IGameInfoData } from '../../../../models/IGameInfoData.model';
import { IGameTotalData } from '../../../../models/IGameTotalData.model';

describe('CardDetailComponent', () => {
  let component: CardDetailComponent;
  let fixture: ComponentFixture<CardDetailComponent>;
  let mockGameStoreService: jasmine.SpyObj<GameStoreService>;
  
  beforeEach(async () => {
    mockGameStoreService = jasmine.createSpyObj('GameStoreService', ['getStoreDetail']);
    await TestBed.configureTestingModule({
      imports: [CardDetailComponent],
      providers: [
        { provide: GameStoreService, useValue: mockGameStoreService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardDetailComponent);
    component = fixture.componentInstance;
    mockGameStoreService = TestBed.inject(GameStoreService) as jasmine.SpyObj<GameStoreService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getStoreDetail()', () => {
    const mockStoreDetail: IGameResultsData = {
      domain: 'data',
      games: [{
        added: 2,
        id: 2,
        name: 'data',
        slug: 'data'
      }],
      games_count: 2,
      id: 2,
      image_background: 'data',
      name: 'data',
      slug: 'data',
      description: 'data',
    };

    mockGameStoreService.getStoreDetail.and.returnValue(of(mockStoreDetail));
    component.getStoreDetail(1);
    expect(component.storeDetail).toEqual(mockStoreDetail);
  });

  it('should getGameDetail()', () => {
    const mockGameDetail: IGameInfoData = {
      id: 1,
      name: 'Mock Game'
    };

    mockGameStoreService.getGameDetail.and.returnValue(of(mockGameDetail));
    const showModalSpy = spyOn(component, 'showModal');
    component.getGameDetail(1);

    expect(component.gameDetail).toEqual(mockGameDetail);
    expect(showModalSpy).toHaveBeenCalledWith(mockGameDetail.id);
  });

  it('should getGameStores() is called', () => {
    const mockGameData: IGameTotalData = {
      count: 2,
      next: null,
      previous: null,
      results: [{
        domain: 'data',
        games: [{
          added: 2,
          id: 2,
          name: 'data',
          slug: 'data'
        }],
        games_count: 2,
        id: 2,
        image_background: 'data',
        name: 'data',
        slug: 'data',
        description: 'data',
      }]
    };

    mockGameStoreService.getGameStores.and.returnValue(of(mockGameData));

    component.getGameStores();
    expect(component.gamesArray).toEqual(mockGameData.results[0].games);
  });

  it('should getGameStores()', () => {
    const mockGameData: IGameTotalData = {
      count: 2,
      next: null,
      previous: null,
      results: [{
        domain: 'data',
        games: [{
          added: 2,
          id: 2,
          name: 'data',
          slug: 'data'
        }],
        games_count: 2,
        id: 2,
        image_background: 'data',
        name: 'data',
        slug: 'data',
        description: 'data',
      }]
    };

    mockGameStoreService.getGameStores.and.returnValue(of(mockGameData));
    component.getGameStores();
    expect(component.gamesArray).toBeUndefined();
  });

});
