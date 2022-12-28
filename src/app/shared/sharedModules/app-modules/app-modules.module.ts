import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from 'src/app/Components/spinner/spinner.component';
import { CardHighlightDirective } from 'src/app/CustomDirectives/card-highlight.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SpinnerComponent,
    CardHighlightDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports:[SpinnerComponent,CardHighlightDirective,ReactiveFormsModule,FormsModule]
})
export class AppModulesModule { }
