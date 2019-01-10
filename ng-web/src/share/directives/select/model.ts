import * as Ps from 'perfect-scrollbar';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

export interface SelectOptions {
    alignToHighlighted?: string;
    className?: string;
    el?: HTMLElement;
    useNative?: boolean;
}
export class Select {

    static defaults = {
        alignToHighlighted: 'auto',
        className: 'select-theme-default'
    };

    select: JQuery;
    originSelect: JQuery;

    private subscriptions: Array<Subscription> = [];

    constructor(private options: SelectOptions) {

        this.options = Object.assign({}, Select.defaults, options);
        this.originSelect = $(this.options.el);

        this._setup();
        this.render();
    }


    private _setup() {

        if (this.originSelect.next('.select').length > 0) {
            this.select = this.originSelect.next('.select');
            return;
        }

        let dom = ` <div class="select">
                        <a class="select-target" href="javascript:;"></a>
                        <div class="select-dropdown show">
                            <ul class="select-options"> 
                            </ul>
                        </div>
                    </div>`;

        this.select = $(dom);

        if (this.options.className) {
            this.select.addClass(this.options.className);
        }

        $(this.select).insertAfter(this.originSelect);
        Ps.initialize(this.select.find('.select-dropdown')[0]);
        this.originSelect.addClass('select-select');
    }

    render() {
        this._unbindEvent();
        this.select.find('.select-target').html(this.originSelect.find('option:selected').text());
        const options = this.originSelect.find('option');
        let html = '';
        for (let i = 0; i < options.length; i++) {
            let el = $(options[i]);
            html += `<li class="select-option${el.is(':selected') ? ' selected' : ''}" data-value="${el.attr('value')}">${el.text()}</li>`;
        }
        this.select.find('.select-options').html(html);
        this._bindEvent();
        Ps.update(this.select.find('.select-dropdown')[0]);
    }

    open() {
        this.select.addClass('open');
    }

    close() {
        this.select.removeClass('open');
    }

    toggle() {
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
            Ps.update(this.select.find('.select-dropdown')[0]);
        }
    }

    isOpen() {
        return this.select.hasClass('open');
    }

    private _bindEvent() {
        this._bindClick();
        this._bindMouseMove();
        this._bindChange();
    }

    private _bindClick() {

        let clickTarget = Observable.fromEvent(this.select.find('.select-target'), 'click')
            .do<JQueryEventObject>(event => event.stopPropagation())
            .subscribe(event => {
                if (!this.isOpen()) {
                    let value = this.select.val();
                    this.select.find('.select-option').removeClass('selected').removeClass('highlighted');
                    this.select.find(`.select-option[data-value='${this.originSelect.val()}']`).addClass('selected').addClass('highlighted');
                }
                this.toggle();
                this._position(event.pageY);
            });

        this.subscriptions.push(clickTarget);

        let clickOption = Observable.from(this.select.find('.select-option'))
            .mergeMap(target => Observable.fromEvent(target, 'click'))
            .do<Event>(event => event.stopPropagation())
            .pluck('target')
            .map(target => $(target))
            .subscribe(target => {

                this.select.find('.select-target').text(target.text());
                this.originSelect.val(target.data('value'));
                this._triggerChange();

                this.select.find('select-option.selected').removeClass('selected').removeClass('highlighted');
                target.addClass('selected').addClass('highlighted');
                this.close();
            });

        this.subscriptions.push(clickOption);

        let clickDocument = Observable.fromEvent(document, 'click')
            .subscribe(() => this.close());

        this.subscriptions.push(clickDocument);

    }

    private _position(pageY) {
        let dropdown = this.select.find('.select-dropdown');
        if (pageY + dropdown.height() > $(document).height()) {
            dropdown.css('bottom', this.select.height() + 'px');
            dropdown.css('top', 'auto');
        } else {
            dropdown.css('top', this.select.height() + 'px');
            dropdown.css('bottom', 'auto');
        }
    }

    private _triggerChange() {
        let event = document.createEvent('HTMLEvents');
        event.initEvent('change', true, false);
        this.originSelect[0].dispatchEvent(event);
    }

    private _bindMouseMove() {
        let subscription = Observable.from(this.select.find('.select-option'))
            .mergeMap(target => Observable.fromEvent(target, 'mouseenter'))
            .map(target => $(target))
            .filter(target => !target.hasClass('.selected'))
            .subscribe(() => {
                this.select.find('.select-option.selected').removeClass('highlighted');
            });
        this.subscriptions.push(subscription);

    }


    private _bindChange() {
        let subscription = Observable.fromEvent(this.originSelect, 'change')
            .subscribe(() => {
                this.render();
            });

        this.subscriptions.push(subscription);
    }

    destroy(): void {
        this._unbindEvent();
        Ps.destroy(this.select.find('.select-dropdown')[0]);
    }

    private _unbindEvent(): void {
        Observable.from(this.subscriptions).subscribe(subscription => subscription.unsubscribe());
        this.subscriptions.length = 0;
    }
}
