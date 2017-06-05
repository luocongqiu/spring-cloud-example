import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import * as ace from 'brace';
import 'brace/mode/json';
import 'brace/mode/xml';
import 'brace/theme/github';
import { delay } from 'share';

@Directive({
    selector: '[aiAceEditor]',
    exportAs: 'aceEditor'
})
export class AceEditorDirective {

    @Output() textChanged = new EventEmitter();
    @Output() onBlur = new EventEmitter();

    editor: ace.Editor;

    private _oldVal: string;

    constructor(elementRef: ElementRef) {

        const el = elementRef.nativeElement;
        el.classList.add('editor');
        this.editor = ace.edit(el);
        this.editor.setTheme('ace/theme/github');
        this.editor.$blockScrolling = Infinity;

        this.editor.on('change', () => {
            const newVal = this.editor.getValue();
            if (newVal === this._oldVal) {
                return;
            }
            if (typeof this._oldVal !== 'undefined') {
                this.textChanged.next(newVal);
            }
            this._oldVal = newVal;
        });

        this.editor.on('blur', () => {
            this.onBlur.emit();
        });


    }

    @Input()
    set options(value) {
        this.editor.setOptions(value || {
                indent_size: 2
            });
    }

    @Input()
    set readOnly(value: boolean) {
        this.editor.setReadOnly(value);
    }

    @Input()
    set mode(value: string) {
        this.editor.getSession().setMode(`ace/mode/${value}`);
    }

    @Input()
    set text(value: string) {
        if (value === this._oldVal) {
            return;
        }
        this.editor.setValue(value);
        this.editor.clearSelection();
        this.editor.focus();
    }

    async resize() {
        await delay(500);
        this.editor.resize(true);
    }

}