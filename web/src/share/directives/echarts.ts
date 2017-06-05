// tslint:disable
import { Directive, DoCheck, ElementRef, Input, KeyValueDiffer, KeyValueDiffers, OnDestroy } from '@angular/core';

let ECharts = require('echarts/lib/echarts');

import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

@Directive({
    selector: '[echarts]'
})
export class EchartsDirective implements OnDestroy, DoCheck {

    @Input('echarts') options: any;

    private chart: any;
    private currentWidth: number;
    private currentHeight: number;
    private differ: KeyValueDiffer<any, any>;

    constructor(private el: ElementRef, private differs: KeyValueDiffers) {
        this.differ = differs.find({}).create();
    }

    resize() {

        if (!this.chart || !this.options) {
            return;
        }

        this.chart.resize();
    }

    ngDoCheck() {
        if (this.currentWidth != this.el.nativeElement.offsetWidth) {
            this.resize();
            this.currentWidth = this.el.nativeElement.offsetWidth;
        }
        if (this.currentHeight != this.el.nativeElement.offsetHeight) {
            this.resize();
            this.currentHeight = this.el.nativeElement.offsetHeight;
        }
        if (this.differ.diff(this.options)) {
            this.draw(this.options);
        }
    }

    ngOnDestroy() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    draw(opt: any): void {
        if (!opt) {
            console.log('No valid options...');
            console.log(opt);
            return;
        }

        if (opt.series || opt.data) {
            if (opt.dispose) {
                this.chart.dispose();
            }
            if (opt.clear) {
                this.chart.clear();
            }

            if (!this.chart) {
                this.chart = ECharts.init(this.el.nativeElement, opt.theme ? opt.theme : 'default');
            }

            if (opt.loading) {
                this.chart.showLoading();
            }

            this.chart.setOption(opt);
            if (opt.loading) {
                this.chart.hideLoading();
            }

            if (opt.dispatchAction) {
                this.chart.dispatchAction(opt.dispatchAction);
            }

            if (opt.off) {
                for (let event of Object.keys(opt.off)) {
                    this.chart.off(event, opt.off[event])
                }
            }

            if (opt.on) {
                for (let event of Object.keys(opt.on)) {
                    this.chart.on(event, opt.on[event])
                }
            }

        } else {
            console.log('No valid options...');
            console.dir(opt);
        }
    }

}