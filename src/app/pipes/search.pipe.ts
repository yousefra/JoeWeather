import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filter'
})
export class SearchPipe implements PipeTransform {

	transform(value: any, field: string, text: string): any {
		if (!value) return null;
		if (!field || !text) return value;

		text = text.toLowerCase();

		return value.filter(item => item[field].toLowerCase().includes(text));
	}
}
