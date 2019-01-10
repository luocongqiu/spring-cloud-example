import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'jsonKeyValue'
})

export class JsonKeyValuePipe implements PipeTransform {
    transform(value: any, key: number): any {
        try {
            let obj = JSON.parse(value);
            if (obj) {
                return obj[key];
            }
        } catch (err) {

        }
    }
}