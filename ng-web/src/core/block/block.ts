import { Injectable } from '@angular/core';
import { delay } from 'share';

@Injectable({ providedIn: 'root' })
export class Block {

    private defaultMessage = 'Loading ...';

    private element = `<div class="block-container">
        <div class="block-overlay"></div>
        <div class="block-message-container">
            <div class="block-message">${this.defaultMessage}</div>
        </div>
    </div>`;

    private container: JQuery;
    private messages: Array<string> = [];

    constructor() {
        this.initBlock();
    }

    private initBlock(): void {
        this.container = $('.block-container');
        if (this.container.length === 0) {
            $('body').append(this.element);
            this.container = $('.block-container');
        }
    }

    show(message?: string): void {
        if (!this.container || this.container.length === 0) {
            this.initBlock();
        }
        this.container.addClass('show');
        this.messages.push(message || '');
        this.container.find('.block-message').text(message || '');
        if (!message) {
            this.container.addClass('empty');
        }
    }

    async hide() {
        if (this.messages.length > 1) {
            this.messages.pop();
            let message = this.messages[this.messages.length - 1];
            this.container.find('.block-message').text(message);
            if (message) {
                this.container.removeClass('empty');
            } else {
                this.container.addClass('empty');
            }
        } else if (this.messages.length === 1) {
            this.messages.pop();
            await delay(500);
            this.container.removeClass('empty');
            this.container.find('.block-message').text(this.defaultMessage);
            this.container.removeClass('show');
        }
    }

    hideAll(): void {
        this.messages.length = 0;
        this.container.removeClass('empty');
        this.container.find('.block-message').text(this.defaultMessage);
        this.container.removeClass('show');
    }

}