import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationPopupComponent } from '@app/shared/components/confirmation-popup/confirmation-popup.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { RouterModule } from '@angular/router';
import { ChipsAutocompleteComponent } from './components/chips-autocomplete/chips-autocomplete.component';
import { ChipsAutocompleteNewComponent } from './components/chips-autocomplete-single/chips-autocomplete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileDropComponent } from './components/file-drop/file-drop.component';
import { TranslateModule } from '@ngx-translate/core';
import { SafePipe } from './pipes/safe.pipe';
import { DeleteSnackbarComponent } from '@app/shared/components/delete-snackbar/delete-snackbar.component';
import { TextareaEditorComponent } from './components/textarea-editor/textarea-editor.component';

import { ProxyAddDialogComponent } from '@app/proxy/components/proxy-add-dialog/proxy-add-dialog.component';
import { ProxyEditDialogComponent } from '@app/proxy/components/proxy-edit-dialog/proxy-edit-dialog.component';
import { SnackBarImportComponent } from '@app/avatar/avatar-details/snack-bar-import/snack-bar-import.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { ProfileAboutBlockComponent } from './components/profile-about-block/profile-about-block.component';
import { SnackBarSearchRequestComponent } from '@app/search/components/snack-bar-search-request/snack-bar-search-request.component';
import { OriginResultComponent } from '@app/shared/components/origin-result/origin-result.component';
import { HeaderComponent } from './components/header/header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ChartComponent } from './components/chart/chart.component';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  imports: [
    CommonModule,
    PlotlyModule,
    MatDialogModule,
    RouterModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatInputModule,
    MatOptionModule,
    MatCheckboxModule,
    MatProgressBarModule
  ],
  exports: [
    ConfirmationPopupComponent,
    SnackBarComponent,
    BreadcrumbsComponent,
    ChipsAutocompleteComponent,
    ChipsAutocompleteNewComponent,
    FileDropComponent,
    SafePipe,
    DeleteSnackbarComponent,
    TextareaEditorComponent,
    ProxyAddDialogComponent,
    ProxyEditDialogComponent,
    SearchInputComponent,
    ProfileAboutBlockComponent,
    OriginResultComponent,
    HeaderComponent,
    SpinnerComponent,
    ChartComponent
  ],
  declarations: [
    ConfirmationPopupComponent,
    SnackBarComponent,
    BreadcrumbsComponent,
    ChipsAutocompleteComponent,
    ChipsAutocompleteNewComponent,
    FileDropComponent,
    SafePipe,
    DeleteSnackbarComponent,
    TextareaEditorComponent,
    ProxyAddDialogComponent,
    ProxyEditDialogComponent,
    SnackBarImportComponent,
    SearchInputComponent,
    ProfileAboutBlockComponent,
    SnackBarSearchRequestComponent,
    OriginResultComponent,
    HeaderComponent,
    SpinnerComponent,
    ChartComponent
  ],
  entryComponents: [
    ConfirmationPopupComponent,
    SnackBarComponent,
    ProxyAddDialogComponent,
    ProxyEditDialogComponent,
    ConfirmationPopupComponent,
    SnackBarComponent,
    SnackBarImportComponent,
    SnackBarSearchRequestComponent
  ]

})
export class SharedModule { }
