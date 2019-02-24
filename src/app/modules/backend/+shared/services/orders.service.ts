import {Injectable} from '@angular/core';
import {AjaxService} from '../../../+shared/services/ajax.service';

@Injectable()
export class OrdersService {

    constructor(private ajaxService: AjaxService) {

    }

    public getList(data) {
        return this.ajaxService.post('/backend/orders/get-list', data, false);
    }

    public getOne(id) {
        return this.ajaxService.post('/backend/orders/get-one', {id}, false);
    }

    public updateOrder(data) {
        return this.ajaxService.post('/backend/orders/update', data, false);
    }

    public removeOrder(id) {
        return this.ajaxService.post('/backend/orders/delete', {id}, false);
    }

}
