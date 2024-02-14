import { Component, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GameStoreService } from '../../services/game-store.service';
import { CardsComponent } from '../cards/cards.component';
import { IGameResultsData } from '../../models/IGameResultsData.model';
import { IGameTotalData } from '../../models/IGameTotalData.model';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [GameStoreService],
  imports: [CardsComponent]
})
export class HomeComponent {
  gameStoreService = inject(GameStoreService);
  gameStoreArray: IGameResultsData[]

  private readonly destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.getGameStores();
  }

  /**
   * Return all game stores
   */
  getGameStores(): void {
    this.gameStoreService.getGameStores()
    .pipe(takeUntil(this.destroy$))
    .subscribe((games: IGameTotalData) => {
        this.gameStoreArray = games?.results;
    })
  }

  /**
   * Destroy all observables
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
