import {Injectable} from '@angular/core';
import {AjaxService} from '../../../+shared/services/ajax.service';

@Injectable()
export class ProductsService {

    constructor(private ajaxService: AjaxService) {

    }

    public getList(data) {
        return this.ajaxService.post('/backend/product/get-list', data, false);
    }

    public getOne(id) {
        return this.ajaxService.post('/backend/product/get-one', {id}, false);
    }

    public saveProduct(data) {
        return this.ajaxService.file('/backend/product/create', data);
    }

    public updateProduct(data) {
        return this.ajaxService.file('/backend/product/update', data);
    }

    public removeProduct(id) {
        return this.ajaxService.post('/backend/product/delete', {id});
    }


}