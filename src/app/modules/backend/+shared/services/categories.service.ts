import {Injectable} from '@angular/core';
import {AjaxService} from '../../../+shared/services/ajax.service';

@Injectable()
export class CategoriesService {

    constructor(private ajaxService: AjaxService) {

    }

    public getAll(data?) {
        return this.ajaxService.post('/backend/categories/get-list', data, false);
    }

    public removeOne(id) {
        return this.ajaxService.post('/backend/categories/delete', {id});
    }

    public getOne(id) {
        return this.ajaxService.post('/backend/categories/get-one', {id}, false);
    }

    public updateCategory(data) {
        return this.ajaxService.post('/backend/categories/update', data, false);
    }

}