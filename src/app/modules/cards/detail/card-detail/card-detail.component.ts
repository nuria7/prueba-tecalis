import { Component, inject } from '@angular/core';
import { GameStoreService } from '../../../../services/game-store.service';
import { Subject, takeUntil } from 'rxjs';
import { IGameResultsData } from '../../../../models/IGameResultsData.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../modal/modal.component';
import { IGameInfoData } from '../../../../models/IGameInfoData.model';
import { IGameTotalData } from '../../../../models/IGameTotalData.model';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.scss'
})
export class CardDetailComponent {
  gameStoreService = inject(GameStoreService);
  router = inject(Router);
  id: number = 0;
  storeDetail: IGameResultsData;
  gameDetail: IGameInfoData;
  gamesArray?: IGameInfoData[];
  
  private readonly destroy$: Subject<void> = new Subject<void>();
  
  constructor(private activatedRoute: ActivatedRoute, public dialog: MatDialog){
    this.activatedRoute.params.subscribe(params=>{
      this.id = params?.['id'];
      this.getStoreDetail(this.id);
    });
  }

  ngOnInit(): void {
    this.getGameStores();
  }
  
  /**
   *  Get details of each store
   * @param id 
   */
  getStoreDetail(id: number): void {
    this.gameStoreService.getStoreDetail(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((games: IGameResultsData) => {
      this.storeDetail = games;
    })
  }

  /**
   *  Get details of each games
   * @param id 
   */
  getGameDetail(id: number): void {
    this.gameStoreService.getGameDetail(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((games: IGameInfoData) => {
      this.gameDetail = games;
      this.showModal(this.gameDetail.id)
    })
  }

  /**
   * Get all game stores
   */
  getGameStores(): void {
    this.gameStoreService.getGameStores()
    .pipe(takeUntil(this.destroy$))
    .subscribe((games: IGameTotalData ) => {
      if(games?.results) {
        const gameArray = games.results.filter((game: IGameResultsData) => game.id == this.id);
        this.gamesArray = gameArray[0].games;
      }
    })
  }
  
  /**
   * This method displays a modal with detailed information of the selected game
   * @param id 
   */
  showModal(id?: number): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        gameDetail: this.gameDetail,
        id: id
      },
      width: "600px"
    })

    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate(['detail/' + this.id]);
    })
  }

  /**
   * This method is used to return to the previous screen using a button
   */
  goBack() {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
