import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'maxlength'
})

export class MaxlengthPipe implements PipeTransform {
    transform(value: any, length: number): any {
        if (!value) {
            return '';
        }
        return value.length <= length ? value : value.substr(0, 10);
    }
}