import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { MatDialogRef } from '@angular/material/dialog';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ModalComponent>>;

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    await TestBed.configureTestingModule({
      imports: [ModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<ModalComponent>>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close()', () => {
    component.close();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
