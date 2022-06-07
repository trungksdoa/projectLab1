import { SharedService } from 'src/app/shared.service'
import { OrderService } from './../api/cart/order.service'
import { Component, OnInit, ViewChild } from '@angular/core'
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js'
import { BaseChartDirective } from 'ng2-charts'
import DataLabelsPlugin from 'chartjs-plugin-datalabels'
import { Order, orderManagement } from 'src/app/model/Order'
import { Chartoption } from '../model/chartOption'

@Component({
  selector: 'app-profile-chart',
  templateUrl: './profile-chart.component.html',
  styleUrls: ['./profile-chart.component.css']
})
export class ProfileChartComponent implements OnInit {
  //

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined

  constructor (
    private orderService: OrderService,
    private sharedService: SharedService
  ) {}

  ngOnInit (): void {
    this.orderService
      .getChartOption(JSON.parse(this.sharedService.getLocal('user')).id)
      .subscribe((items: Chartoption) => {
        this.barChartData.datasets[0].data = [
          items.jan,
          items.feb,
          items.mar,
          items.apr,
          items.may,
          items.jun,
          items.jul,
          items.aug,
          items.sep,
          items.oct,
          items.nov,
          items.dec
        ]

        this.chart?.update()
        //End api
      })
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  }
  public barChartType: ChartType = 'bar'
  public barChartPlugins = [DataLabelsPlugin]

  public barChartData: ChartData<'bar'> = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    datasets: [
      {
        data: [100, 200, 300, 400, 500, 600, 700,800,900,1000,2000,3000],
        label: 'Khách hàng'
      }
    ]
  }
  // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  // events
  public chartClicked ({
    event,
    active
  }: {
    event?: any
    active?: {}[]
  }): void {
    console.log(event.native)
    alert(event.chart.tooltip.dataPoints[0].label)
  }

  public chartHovered ({
    event,
    active
  }: {
    event?: ChartEvent
    active?: {}[]
  }): void {
    console.log(event, active)
  }

  public randomize (): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40
    ]

    this.chart?.update()
  }
}
