import { Component } from '@angular/core';

import { TimeBlocksService } from '../../services/time-blocks.service';

@Component({
    selector: 'app-time-blocks',
    templateUrl: './time-blocks.component.html',
    styleUrls: ['./time-blocks.component.scss'],
})
export class TimeBlocksComponent {
    displayedColumns = ['timeFrom', 'timeTo', 'validate'];

    constructor(public service: TimeBlocksService) {
        service.load();
    }
}
