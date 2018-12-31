import {Injectable} from '@angular/core';
import {AjaxService} from '../../../+shared/services/ajax.service';

@Injectable()
export class CategoriesService {

    constructor(private ajaxService: AjaxService) {

    }

   public getAll() {
        return this.ajaxService.post('/backend/category/get-list');
   }

}