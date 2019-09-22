import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SEMICOLON, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {HelpersService} from '@app/shared/services/helpers.service';

interface Education {
  city: string;
  description: string;
  name: string;
  studiedFrom: string;
  studiedTo: string;
  type: string;
  specialization: string;
}

@Component({
  selector: 'app-add-education-modal',
  templateUrl: './add-education-modal.component.html',
  styleUrls: ['./add-education-modal.component.scss']
})
export class AddEducationModalComponent implements OnInit {
  submitted = false;
  educationForm: FormGroup;
  education: Education;
  specializations = [];

  readonly separatorKeysCodes: number[] = [ENTER, SEMICOLON];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEducationModalComponent>,
    private helpersService: HelpersService
  ) {}

  ngOnInit() {
    this.education = {...this.data.education};
    this.education.studiedFrom  = this.education.studiedFrom ? new Date(this.education.studiedFrom).toISOString() : '';
    this.education.studiedTo  = this.education.studiedTo ? new Date(this.education.studiedTo).toISOString() : '';
    if (this.education.specialization) {
      this.specializations = this.education.specialization.split(';');
    }
    this.educationForm = this.fb.group({
      studiedFrom:  [this.education.studiedFrom, {validators: []}],
      studiedTo: [this.education.studiedTo, {validators: []}],
      description: [this.education.description, {validators: []}]
    });
  }

  add(event: MatChipInputEvent, name) {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.education[name] = value.trim();
    }
    if (input) {
      input.value = '';
    }
  }

  remove(name) {
    this.education[name] = '';
  }

  addSpec(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.specializations.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  removeSpec(spec): void {
    const index = this.specializations.indexOf(spec);
    if (index >= 0) {
      this.specializations.splice(index, 1);
    }
  }

  closeDialog() {
    let education;
    this.submitted = true;
    if (!this.education.name) {
      return;
    }
    education = {...this.education, ...this.educationForm.value};
    education.specialization = this.specializations.join(';');
    education = this.helpersService.removeEmptyKeys(education);
    this.dialogRef.close(education);
  }
}
