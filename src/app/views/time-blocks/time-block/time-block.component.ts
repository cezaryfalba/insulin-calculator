import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';

import { TimeBlocksService } from 'src/app/services/time-blocks.service';

@Component({
    selector: 'app-time-block',
    templateUrl: './time-block.component.html',
})
export class TimeBlockComponent {
    blockForm: FormGroup;
    index: number;

    constructor(
        private readonly fb: FormBuilder,
        private readonly route: ActivatedRoute,
        public service: TimeBlocksService,
    ) {
        this.blockForm = this.fb.group({
            timeFrom: ['', []],
            timeTo: ['', []],
            rangeRequiredFrom: ['', []],
            rangeRequiredTo: ['', []],
            carbohydrateRatioAmount: ['', []],
            carbohydrateRatioFor: ['', []],
            insulinSensitivityAmount: ['', []],
            insulinSensitivityFor: ['', []],
        });

        this.route.params
            .pipe(
                map((params) => params.index),
                tap((index) => (this.index = index)),
                switchMap((_) => this.service.getBlock(this.index)),
            )
            .subscribe((block) => this.blockForm.setValue(block));

        this.blockForm.valueChanges.subscribe((value) =>
            this.service.setBlock(this.index, value),
        );
    }
}
