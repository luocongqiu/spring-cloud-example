declare interface GlobalEnvironment {
    env: string;
    client_id: string;
    client_secret: string;
}

declare const ENV: GlobalEnvironment;

declare class Tooltip {

    public drop?: Drop;

    constructor(options: Tooltip.TooltipOptions);

    close();

    open();

    toggle();

    remove();

    destroy();

    position();
}

declare interface Drop {
    drop?: HTMLElement;
    content?: HTMLElement;
}

declare namespace Tooltip {
    interface TooltipOptions {
        target?: HTMLElement | string | any;
        position?: string;
        content?: string;
        classes?: string;
        openOn?: string;
        constrainToWindow?: boolean;
        constrainToScrollParent?: boolean;
        classPrefix?: string;
    }
}