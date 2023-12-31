import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { BackendService } from 'src/app/shared/services/backend.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { Subscription } from 'rxjs';
import { SortEvent } from '../../../shared/interfaces/SortEvent';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss'],
})
export class AddDataComponent implements OnInit, OnDestroy {
  errorMessages: { [key: string]: string } = {};
  subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    public storeService: StoreService,
    public backendService: BackendService,
    private dialog: MatDialog,
  ) {}

  public addChildForm: any;
  @Input() currentPage!: number;
  @Input() sort!: SortEvent;

  ngOnInit(): void {
    this.buildChildForm();
  }

  buildChildForm() {
    this.addChildForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      kindergardenId: ['', Validators.required],
      birthDate: [null, [Validators.required, this.validateAge()]],
    });
  }

  get name() {
    return this.addChildForm.get('name');
  }

  get kindergardenId() {
    return this.addChildForm.get('kindergardenId');
  }

  get birthDate() {
    return this.addChildForm.get('birthDate');
  }

  onSubmit() {
    if (this.addChildForm.valid) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent);
      this.subscription = dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.backendService.addChildData(
            {
              ...this.addChildForm.value,
              registeredDate: new Date(),
            },
            this.currentPage,
            this.sort,
          );
          this.resetForm();
        }
      });
    }
  }

  resetForm() {
    this.addChildForm.reset();
    this.addChildForm.markAsPristine();
    this.addChildForm.markAsUntouched();
    this.name.setErrors(null);
    this.kindergardenId.setErrors(null);
    this.birthDate.setErrors(null);
    this.addChildForm.setErrors({ invalid: true });
  }

  validateAge(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const fitsInAgeGroup = age >= 3 && age <= 6;
      return !fitsInAgeGroup ? { birthDate: true } : null;
    };
  }

  getErrorMessage(controlName: string) {
    const control = this.addChildForm.get(controlName);

    if (!control) {
      return '';
    }

    const errorCheck = (type: string, message: string) =>
      control.hasError(type) ? message : '';

    this.errorMessages[controlName] =
      errorCheck('required', 'Bitte gib einen Wert ein') ||
      errorCheck('minlength', 'Name muss mindestens 3 characters lang sein') ||
      errorCheck(
        'maxlength',
        'Name darf nicht mehr als 20 characters lang sein',
      ) ||
      errorCheck('birthDate', 'Das Kind muss zwischen 3 und 6 Jahre alt sein');

    return this.errorMessages[controlName];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
