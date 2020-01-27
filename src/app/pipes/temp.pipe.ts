import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'temp'
})
export class TempPipe implements PipeTransform {

    transform(value: number): string {
        if (!value) {
            return '';
        }
        return value.toFixed(0) + '°';
    }
}
