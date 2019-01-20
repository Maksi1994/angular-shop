import { Inject, Injectable } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';

@Injectable()
export class UniversalStorage implements Storage {

    [index: number]: string;
    [key: string]: any;
    length: number;
    cookies: any;

    constructor(@Inject(REQUEST) private request: any) {
        if (this.request === null) {
            this.cookies = [];
            return;
        }
        this.cookies = this.request.cookies;
    }

    clear(): void {
        this.cookies = [];
    }

    getItem(key: string): string {
        return this.cookies[key];
    }

    key(index: number): string {
        return  this.cookies.propertyIsEnumerable[index];
    }

    removeItem(key: string): void {
        this.cookies[key] = undefined;
    }

    setItem(key: string, data: string): void {
        this.cookies[key] = data;
    }


}
