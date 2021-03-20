import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'calculator',
        pathMatch: 'full',
    },
    {
        path: 'calculator',
        loadChildren: () =>
            import('./views/calculator/calculator.module').then(
                (m) => m.CalculatorModule,
            ),
    },
    {
        path: 'blocks',
        loadChildren: () =>
            import('./views/time-blocks/time-blocks.module').then(
                (m) => m.TimeBlocksModule,
            ),
    },
    {
        path: 'blocks/:index',
        loadChildren: () =>
            import('./views/time-blocks/time-block/time-block.module').then(
                (m) => m.TimeBlockModule,
            ),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
