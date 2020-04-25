import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { echartStyles } from './echarts.style';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  public salesChartPie: EChartOption;
  public option: EChartOption;
  public chartLineOption3: EChartOption;

  constructor() { }

  ngOnInit() {
    this.option = {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          // ['product', '2019'],
          ['Email', 43.3],
          ['EDC', 83.1],
          ['User uplaods', 86.4],
          ['FTP', 72.4]
        ]
      },
      xAxis: { type: 'category', nameTextStyle: { color: '#555' } },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [
        {
          type: 'bar',
          itemStyle: {
            color: '#663399'
          }
        }
      ]
    };

    this.salesChartPie = {
      color: ['#62549c', '#7566b5', '#7d6cbb', '#8877bd', '#9181bd', '#6957af'],
      tooltip: {
        show: true,
        backgroundColor: 'rgba(0, 0, 0, .8)'
      },

      xAxis: [{
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        }
      }

      ],
      yAxis: [{
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
      ],
      series: [{
        name: 'Drug vs Count',
        type: 'pie',
        radius: '75%',
        center: ['50%', '50%'],
        data: [
          { value: 535, name: 'DMARD' },
          { value: 310, name: 'Perceptron' },
          { value: 234, name: 'Intraveno' },
          { value: 155, name: 'Amoxicillin' },
          { value: 130, name: 'Benadryl' },
          { value: 348, name: 'Cipro' }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
      ]
    };

    this.chartLineOption3 = {
      legend: {},
      tooltip: {},
      // dataset: {
      //   source: [
      //     // ['product', '2019'],
      //     ['Email', 43.3],
      //     ['EDC', 83.1],
      //     ['User uplaods', 86.4],
      //     ['FTP', 72.4]
      //   ]
      // },
      xAxis: { type: 'category', nameTextStyle: { color: '#555' } },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [
        {
          type: 'line',
          smooth: true,
          itemStyle: {
            color: '#663399'
          },
          data: [40, 80, 20, 90, 30, 80, 40, 90, 20, 80, 30, 45, 50, 110, 90, 145, 120, 135, 120, 140]
        }
      ]
    };
  }

}
