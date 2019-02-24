import {Injectable} from '@angular/core';
import {AjaxService} from '../../../+shared/services/ajax.service';

@Injectable()
export class PromotionsService {

    constructor(private ajaxService: AjaxService) {

    }

    public getList(data) {
        return this.ajaxService.post('/backend/promotions/get-list', data, false);
    }

    public getOne(id) {
        return this.ajaxService.post('/backend/promotions/get-one', {id}, false);
    }

    public updatePromotion(data) {
        return this.ajaxService.post('/backend/promotions/update', data, false);
    }

    public removePromotion(id) {
        return this.ajaxService.post('/backend/promotions/delete', {id}, false);
    }

}
