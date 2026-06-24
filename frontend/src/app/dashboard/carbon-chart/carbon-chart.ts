import {
  Component,
  Input,
  OnChanges,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  Chart,
  registerables
} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-carbon-chart',
  standalone: true,
  templateUrl: './carbon-chart.html',
  styleUrls: ['./carbon-chart.css']
})
export class CarbonChartComponent implements OnChanges {

  @Input()
  history: any[] = [];

  @ViewChild('chartCanvas')
  chartCanvas!: ElementRef<HTMLCanvasElement>;

  chart!: Chart;

  ngOnChanges(): void {

    setTimeout(() => {

      this.loadChart();

    }, 100);
  }

  loadChart(): void {

    if (!this.chartCanvas) {
      return;
    }

    if (this.chart) {

      this.chart.destroy();
    }

    const labels =
      this.history.map(
        (_, index) =>
          `Activity ${index + 1}`
      );

    const scores =
      this.history.map(
        item =>
          item.carbonScore
      );

    const emissions =
      this.history.map(
        item =>
          item.carbonEmission
      );

    this.chart =
      new Chart(
        this.chartCanvas.nativeElement,
        {

          type: 'line',

          data: {

            labels,

            datasets: [

              {
                label: 'Carbon Score',
                data: scores,
                borderColor: '#2e7d32',
                backgroundColor:
                  'rgba(46,125,50,0.15)',
                fill: true,
                tension: 0.4
              },

              {
                label: 'CO₂ Emission',
                data: emissions,
                borderColor: '#ef6c00',
                backgroundColor:
                  'rgba(239,108,0,0.15)',
                fill: true,
                tension: 0.4
              }

            ]
          },

          options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

              legend: {

                display: true,

                position: 'top'
              }
            },

            scales: {

              y: {

                beginAtZero: true
              }
            }
          }
        }
      );
  }
}