import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IGameResultsData } from '../../models/IGameResultsData.model';
import { IGameInfoData } from '../../models/IGameInfoData.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default
})
export class CardsComponent {
  @Input() gameStores: IGameResultsData[] = [];
  gameDetail: IGameInfoData;
  router = inject(Router);

  /**
   * This method is used to return to the previous screen using a button
   * @param id 
   */
  clickCard(id?: number): void {
    this.router.navigate(['/detail', id]);
  }
}
