import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ITimeBlock } from '../../interfaces/time-block.interface';

import { TimeBlocksService } from '../../services/time-blocks.service';

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
    form: FormGroup;

    correction: string;
    wwke_bolus: string;
    wbtke_bolus: string;

    time_block$: Observable<ITimeBlock>;

    constructor(
        private readonly router: Router,
        private readonly fb: FormBuilder,
        public service: TimeBlocksService,
    ) {
        service.load();

        this.form = this.fb.group({
            glucose: ['', []],
            wwke: ['', []],
            wbtke: ['', []],
        });

        this.time_block$ = this.service.blocks$.pipe(
            map((blocks) => {
                const dateNow = new Date();

                const timeNow = dateNow.getHours() * 60 + dateNow.getMinutes();

                return blocks
                    .filter((block) => {
                        const from = block.timeFrom
                            .split(/\:/)
                            .map((a) => parseInt(a));

                        const timeFrom = from[0] * 60 + from[1];

                        const to = block.timeTo
                            .split(/\:/)
                            .map((a) => parseInt(a));

                        const timeTo = to[0] * 60 + to[1];

                        return timeFrom <= timeNow && timeTo > timeNow;
                    })
                    .pop();
            }),
        );
    }

    ngOnInit() {
        this.service.blocks$.subscribe((blocks) => {
            for (const block of blocks) {
                if (!this.service.validateBlock(block))
                    this.router.navigate(['blocks']);
            }
        });

        this.form.valueChanges.subscribe((value) => {
            this.time_block$.subscribe((block) => {
                this.correction =
                    value.glucose &&
                    (parseInt(value.glucose) < block.rangeRequiredFrom ||
                        parseInt(value.glucose) > block.rangeRequiredTo) &&
                    (
                        (value.glucose - block.rangeRequiredTo) /
                        block.insulinSensitivityAmount
                    ).toFixed(1);

                this.wwke_bolus =
                    value.wwke &&
                    (
                        parseFloat(value.wwke) * block.carbohydrateRatioAmount +
                        (this.correction ? parseFloat(this.correction) : 0)
                    ).toFixed(1);

                this.wbtke_bolus =
                    value.wbtke &&
                    (
                        parseFloat(value.wbtke) * block.carbohydrateRatioAmount
                    ).toFixed(1);
            });
        });
    }
}
