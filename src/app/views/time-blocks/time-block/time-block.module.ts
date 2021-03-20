import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TimeBlocksService } from 'src/app/services/time-blocks.service';

import { TimeBlockRoutingModule } from './time-block-routing.module';

import { TimeBlockComponent } from './time-block.component';

@NgModule({
    declarations: [TimeBlockComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        TimeBlockRoutingModule,
    ],
    providers: [TimeBlocksService],
})
export class TimeBlockModule {}
