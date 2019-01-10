export interface ScrollBarConfigInterface {
    wheelSpeed?: number;
    wheelPropagation?: boolean;
    swipePropagation?: boolean;
    minScrollbarLength?: number;
    maxScrollbarLength?: number;
    useBothWheelAxes?: boolean;
    suppressScrollX?: boolean;
    suppressScrollY?: boolean;
    scrollXMarginOffset?: number;
    scrollYMarginOffset?: number;
    stopPropagationOnClick?: boolean;
}

export class ScrollBarConfig implements ScrollBarConfigInterface {

    public wheelSpeed: number;
    public wheelPropagation: boolean;
    public swipePropagation: boolean;
    public minScrollbarLength: number;
    public maxScrollbarLength: number;
    public useBothWheelAxes: boolean;
    public suppressScrollX: boolean;
    public suppressScrollY: boolean;
    public scrollXMarginOffset: number;
    public scrollYMarginOffset: number;
    public stopPropagationOnClick: boolean;

    constructor(config: ScrollBarConfigInterface = {}) {
        this.assign(config);
    }

    public assign(config: ScrollBarConfigInterface = {}) {
        for (let key in config) {
            if (config.hasOwnProperty(key)) {
                this[key] = config[key];
            }
        }
    }
}