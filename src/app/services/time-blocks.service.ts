import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import Dexie from 'dexie';

import { TIME_BLOCKS } from '../constants/time-blocks';

import { ITimeBlock } from '../interfaces/time-block.interface';

@Injectable({
    providedIn: 'root',
})
export class TimeBlocksService {
    blocks$: BehaviorSubject<Array<ITimeBlock>> = new BehaviorSubject<
        Array<ITimeBlock>
    >([]);

    db: any;

    constructor() {
        this.db = new Dexie('insulin');
        this.db.version(1).stores({
            blocks:
                'timeFrom,timeTo,rangeRequiredFrom,rangeRequiredTo,carbohydrateRatioAmount,carbohydrateRatioFor,insulinSensitivityAmount,insulinSensitivityFor',
        });

        this.load();
    }

    async load() {
        let blocks = await this.db.blocks.toArray();

        if (blocks.length === 0) {
            blocks = TIME_BLOCKS;
        }

        this.blocks$.next(blocks);
    }

    async save() {
        this.db.blocks.clear();

        this.blocks$
            .pipe(take(1))
            .subscribe((blocks) => this.db.blocks.bulkAdd(blocks));
    }

    getBlock(index: number): Observable<ITimeBlock> {
        return this.blocks$.pipe(
            filter((blocks) => !!blocks.length),
            take(1),
            map((blocks) => blocks[index]),
        );
    }

    setBlock(index: number, block: ITimeBlock) {
        this.blocks$.pipe(take(1)).subscribe((blocks) => {
            blocks[index] = block;

            this.blocks$.next(blocks);

            this.save();
        });
    }

    validateBlock(block: ITimeBlock): boolean {
        return (
            !!block.carbohydrateRatioAmount &&
            !!block.carbohydrateRatioFor &&
            !!block.insulinSensitivityAmount &&
            !!block.rangeRequiredFrom &&
            !!block.rangeRequiredTo &&
            !!block.timeFrom &&
            !!block.timeTo
        );
    }
}
