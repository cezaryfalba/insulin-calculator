import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { CalculatorRoutingModule } from './calculator-routing.module';

import { CalculatorComponent } from './calculator.component';

@NgModule({
    declarations: [CalculatorComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatGridListModule,
        MatInputModule,
        MatTableModule,
        CalculatorRoutingModule,
    ],
})
export class CalculatorModule {}
