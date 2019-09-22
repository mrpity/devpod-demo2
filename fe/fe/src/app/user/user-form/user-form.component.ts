import {
  Component,
  Output,
  EventEmitter,
  Input,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HelpersService } from '../../shared/services/helpers.service';
import { FormMode } from '../models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements AfterViewInit {
  /**
   * Public variables
   */
  submitted = false;

  @Input() isLoading: Observable<boolean>;
  @Input() isFailed = false;
  @Input() formMode = FormMode.ADD;

  /**
   * Getter/setter Roles Dropdown
   */
  private _roles: string[] = [];
  @Input() set roles(values: string[]) {
    this._roles = values;
  }
  get roles(): string[] {
    return this._roles;
  }

  /**
   * Getter/setter Form Object
   */
  private _formObject: FormGroup;
  @Input() set formObject(value: FormGroup) {
    this._formObject = value;
    this.externalModifications.observers.length > 0
      ? this.externalModifications.emit()
      : this.makeFormModifications();
  }
  get formObject(): FormGroup {
    return this._formObject;
  }

  /**
   * Getter/setter User details
   */
  private _user: any;
  @Input() set user(value: any) {
    this._user = value;
  }
  get user(): any {
    return this._user;
  }

  @Output() submitForm = new EventEmitter();
  @Output() submitFailed = new EventEmitter();
  @Output() setIsDirty = new EventEmitter();
  @Output() externalModifications = new EventEmitter();

  constructor(
    public helpers: HelpersService,
    private cdRef: ChangeDetectorRef,
  ) { }

  get f() {
    return this._formObject.controls;
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges(); // ExpressionChangedAfterItHasBeenCheckedError resolve
  }

  submit() {
    this.submitted = true;
    this.helpers.validateAllFormFields(this._formObject);
    if (this._formObject.invalid) {
      return;
    }
    const data = this.helpers.cleanEmptyKeys(this._formObject.value);
    this.submitForm.emit(data);
  }

  private makeFormModifications() { }
}
