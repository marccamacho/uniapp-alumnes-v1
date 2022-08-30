import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'removeNoneInInput'
})
export class RemoveNoneInInputPipe implements PipeTransform {

    transform(value: unknown, ...args: unknown[]): unknown {
        if (value == "None") return "";
        else return value;
    }
}
