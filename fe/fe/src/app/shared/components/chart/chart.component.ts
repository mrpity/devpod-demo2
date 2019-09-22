import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  private _layout = { width: '50%', height: '50%', title: 'A Fancy Plot', barmode: 'relative' };
  private _marker = [
    { color: 'rgba(200, 200, 200, 1)' },
    { color: 'rgba(200, 200, 200, 0.3)' },
    { color: 'rgba(200, 200, 200, 0.3)' },
    null,
    null
  ];

  chartData = [];
  chartLayout = this._layout;

  @Input() set data(cData: Array<any>) {
    if (cData && cData.length) {
      this.chartData = cData.map((item, i) => {
        return {
          ...item,
          ...(this._marker[i] ? { marker: this._marker[i] } : {})
        };
      });
    }
  }

  constructor() { }

  ngOnInit() { }

}
