import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { AuthService } from '@app/core/services/auth.service';
import { SharedModule } from '@app/shared/shared.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DictionaryService } from '@app/core/services/dictionary/dictionary.service';
import { AwayGuard } from '@app/core/guards/away.guard';
import { ValidationService } from '@app/core/services/validation.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatDialogModule,
    SharedModule,
    MatSnackBarModule
  ],
  declarations: [
    NotFoundComponent
  ],
  providers: [
    AuthGuard,
    AwayGuard,
    AuthService,
    DictionaryService,
    ValidationService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only.'
      );
    }
  }
}
