import { Directive, forwardRef, HostListener } from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const TRIM_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TrimValueAccessor),
    multi: true
};

/**
 * The trim accessor for writing trimmed value and listening to changes that is
 * used by the {@link NgModel}, {@link FormControlDirective}, and
 * {@link FormControlName} directives.
 */
@Directive({
    selector: 'input:not([type=checkbox]):not([type=radio])[formControlName],textarea[formControlName],input:not([type=checkbox]):not([type=radio])[formControl],textarea[formControl],input:not([type=checkbox]):not([type=radio])[ngModel],textarea[ngModel],[ngDefaultControl]',
    providers: [TRIM_VALUE_ACCESSOR]
})
export class TrimValueAccessor extends DefaultValueAccessor { // tslint:disable-line

    @HostListener('input', ['$event.target.value'])
    ngOnChange(val: string) {
        this.onChange(val.trim());
    }

    writeValue(value: any): void {
        if (typeof value === 'string') {
            value = value.trim();
        }

        super.writeValue(value);
    }

}