import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { IGameInfoData } from '../../models/IGameInfoData.model';
import { IGameDetailData } from '../../models/IGameDetailData.model';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatIconModule, MatDialogModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() gameDetail: IGameInfoData;
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { gameDetail: IGameDetailData, id: number }
  ) {
  }
  
  /**
   * This method is used to close the modal using a button
   */
  close(): void {
    this.dialogRef.close();
  }
}
