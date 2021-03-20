import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeBlocksComponent } from './time-blocks.component';

export const routes: Routes = [
    {
        path: '',
        component: TimeBlocksComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TimeBlocksRoutingModule {}
