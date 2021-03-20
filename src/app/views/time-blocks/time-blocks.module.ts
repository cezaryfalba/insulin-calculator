import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { TimeBlocksRoutingModule } from './time-blocks-routing.module';

import { TimeBlocksComponent } from './time-blocks.component';

@NgModule({
    declarations: [TimeBlocksComponent],
    imports: [
        CommonModule,
        MatIconModule,
        MatTableModule,
        TimeBlocksRoutingModule,
    ],
})
export class TimeBlocksModule {}
