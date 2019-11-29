import { Component, OnInit, ViewChild, Input, AfterViewInit, SimpleChange, SimpleChanges, OnChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-doughnut-widget',
  templateUrl: './doughnut-widget.component.html',
  styleUrls: ['./doughnut-widget.component.scss']
})
export class DoughnutWidgetComponent implements OnInit, AfterViewInit, OnChanges {

  chart: any;
  doughnutCutoutPercentage = 75;

  @ViewChild('chartCanvas', {static: false}) chartCanvas;
  @Input() totalNumber: number;
  @Input() firstCriteria: number;
  @Input() secondCriteria: number;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.createDoughnut();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.totalNumber || changes.firstCriteria || changes.secondCriteria) {
      this.updateChart();
    }
  }

  createDoughnut() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: this.createChartData(),
      options: {
        responsive: true,
        legend: {
          display: true
        },
        tooltips: {
          enabled: true
        },
        events: [],
        cutoutPercentage: this.doughnutCutoutPercentage,
        animation: {
          duration: 0,
          animateScale: true
        }
      },
      plugins: [{
        beforeDraw: chart => {
          const width = chart.width;
          const height = chart.height;

          ctx.textBaseline = 'middle';

          const text = `ceva text ${this.firstCriteria}`;
          const textX = Math.round((width - ctx.measureText(text).width) / 2);
          const textY = height / 2;

          ctx.fillText(text, textX, textY);
        }
      }]
    });

    this.updateChart();
  }

  updateChart(): void {
    if (this.chart === undefined) {
      this.createDoughnut();
      return;
    }

    this.chart.data.datasets.length = 0;
    this.chart.update();

    const data = this.createChartData();
    this.chart.data = data;

    this.chart.update();
  }

  createChartData() {
    const first = (this.firstCriteria * 100) / this.totalNumber;
    const second = (this.secondCriteria * 100) / this.totalNumber;
    const remained = 100 - first - second;

    const data = {
      labels: ['Data1', 'Data 2'],
      datasets: [
        {
          data: [first, second, remained],
          backgroundColor: ['red', 'green', 'grey'],
          fill: false,
          borderWidth: 0
        }
      ]
    };
    return data;
  }

}
