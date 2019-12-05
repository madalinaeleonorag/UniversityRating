import { Component, OnInit, Input } from '@angular/core';
import { DoughnutData } from 'src/app/models/DoughnutData';

@Component({
  selector: 'app-doughnut-widget',
  templateUrl: './doughnut-widget.component.html',
  styleUrls: ['./doughnut-widget.component.scss']
})
export class DoughnutWidgetComponent implements OnInit {

  @Input() data: DoughnutData;
  chartData: Array<Array<any>> = [];
  myOptions = {
    colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
    is3D: false,
    title: ''
  };

  constructor() { }

  ngOnInit() {
    this.chartData = this.data.values;
    this.myOptions.title = this.data.title;
  }

}
