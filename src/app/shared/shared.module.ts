import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagSelectorComponent, TagSelectorDialog } from './tag-selector/tag-selector.component';
import { RemoveNoneInInputPipe } from './pipes/remove-none-in-input.pipe';
import { TimeAgoPipe } from './pipes/time-ago-pipe';

import { ChartsModule } from 'ng2-charts';

import { NewDocDialogComponent } from './new-doc-dialog/new-doc-dialog.component';
import { DocListComponent }      from './doc-list/doc-list.component';
import { DocItemComponent }      from './doc-item/doc-item.component';
import { SelectPersonDialogComponent } from './select-person-dialog/select-person-dialog.component';
import { PersonSelectorComponent } from './person-selector/person-selector.component';
import { AvaluaCriteriDialegComponent } from './avalua-criteri-dialeg/avalua-criteri-dialeg.component';

import { AgendaModule } from '../agenda/agenda.module'

import { FlexLayoutModule }         from '@angular/flex-layout';
import { MatIconModule }            from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule }              from '@angular/forms';
import { MatChipsModule }           from '@angular/material/chips';
import { MatListModule }            from '@angular/material/list';
import { MatInputModule }           from '@angular/material/input';
import { MatDialogModule }          from '@angular/material/dialog';
import { MatButtonModule }          from '@angular/material/button';
import { MatCardModule }            from '@angular/material/card';
import { MatToolbarModule }         from '@angular/material/toolbar';
import { MatCheckboxModule }        from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { MatMenuModule }            from '@angular/material/menu';
import { MatSliderModule }          from '@angular/material/slider';
import { MatGridListModule }        from '@angular/material/grid-list';
import { MatExpansionModule }       from '@angular/material/expansion';
import { MatTooltipModule }         from '@angular/material/tooltip';
import { MatTabsModule }            from '@angular/material/tabs';
import { MatBottomSheetModule }     from '@angular/material/bottom-sheet';
import { MatSnackBarModule }        from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import {MatStepperModule} from '@angular/material/stepper';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

// import {
//   NgxMatDatetimePickerModule,
//   NgxMatNativeDateModule,
//   NgxMatTimepickerModule
// } from '@angular-material-components/datetime-picker';



import { PastisComponent } from './pastis/pastis.component';
import { SectorsStandardComponent } from './sectors-standard/sectors-standard.component';
import { EstriNotesComponent } from './estri-notes/estri-notes.component';


@NgModule({
  declarations: [
    TagSelectorComponent, TagSelectorDialog,
    RemoveNoneInInputPipe,
    TimeAgoPipe,
    NewDocDialogComponent,
    DocListComponent,
    DocItemComponent,
    SelectPersonDialogComponent,
    PersonSelectorComponent,
    AvaluaCriteriDialegComponent,
    PastisComponent,
    SectorsStandardComponent,
    EstriNotesComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    FlexLayoutModule,
    MatChipsModule,
    MatListModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatSelectModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatTableModule,
    MatStepperModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    ChartsModule,
    AgendaModule
    // NgxMatDatetimePickerModule,
    // NgxMatNativeDateModule,
    // NgxMatTimepickerModule
  ],
  exports : [
    TagSelectorComponent,
    PersonSelectorComponent,
    RemoveNoneInInputPipe,
    TimeAgoPipe,
    MatTabsModule,
    MatListModule,
    MatExpansionModule,
    MatCardModule,
    MatChipsModule,
    FormsModule,
    MatSelectModule,
    MatMenuModule,
    NewDocDialogComponent,
    DocListComponent,
    DocItemComponent,
    MatSlideToggleModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    SelectPersonDialogComponent,
    MatTableModule,
    MatStepperModule,
    AvaluaCriteriDialegComponent,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    PastisComponent,
    SectorsStandardComponent,
    MatProgressSpinnerModule,
    MatButtonModule,
    AgendaModule,
    EstriNotesComponent
    // NgxMatDatetimePickerModule,
    // NgxMatNativeDateModule,
    // NgxMatTimepickerModule
  ]
})
export class SharedModule { }
