import { Injectable } from '@angular/core';
import {AjaxService} from './ajax.service';

@Injectable()
export class UserService {

  user;

  constructor(private ajaxService: AjaxService) {

  }

  public getUser() {

  }
}
