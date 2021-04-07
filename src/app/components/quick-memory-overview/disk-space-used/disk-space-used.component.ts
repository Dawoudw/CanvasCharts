import { AfterViewInit, Component, Input, NgZone, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-disk-space-used',
  template: `<div id="{{ chartdiv }}"></div>`,
  styles: [
    `
      div {
        width: 100%;
        height: 100%;
      }
    `,
  ],
  // templateUrl: './disk-space-used.component.html',
  // styleUrls: ['./disk-space-used.component.css']
})
export class DiskSpaceUsedComponent implements OnInit, AfterViewInit {
  @Input() chartdiv: string = '';
  chart: am4charts.XYChart;
  constructor(private zone: NgZone) {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    // Create chart instance

    this.zone.runOutsideAngular(() => {
      let chart = am4core.create(this.chartdiv, am4charts.XYChart);
      chart.showOnInit = true;
      chart.data = [
        {
          path: '/C',
          space_used: 40,
          last_update: new Date().getDay() - 1,
        },
        {
          path: '/D',
          space_used: 80,
          last_update: new Date().getDay() + 1,
        },
        {
          path: '/E',
          space_used: 0,
          last_update: new Date().getDay() + 2,
        },
        {
          path: '/F',
          space_used: 65,
          last_update: new Date().getDay() + 3,
        },
        {
          path: '/C/users',
          space_used: 20,
          last_update: new Date().getDay() + 4,
        },
      ];

      chart.colors.step = 3;
      let title = chart.titles.create();
      title.textAlign = 'middle';
      title.text = 'Disk Space Used';

      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.title.text = 'Path';
      categoryAxis.dataFields.category = 'path';

      let valueAxisY = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxisY.title.text = 'Disk Space Usage';
      // valueAxisY.renderer.minWidth = 20;
      valueAxisY.dataFields.data = 'space_used';
      valueAxisY.renderer.minGridDistance = 20;
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.title.text = 'Disk Space Usage';
      dateAxis.dataFields.date = 'last_update';
      dateAxis.renderer.minGridDistance = 5;
      //dateAxis.renderer.minWidth = 20;
      dateAxis.renderer.width = 10;

      // let series = chart.series.push(new am4charts.LineSeries());
      // // series.dataFields.categoryX = 'path';
      // series.dataFields.valueY = 'space_used';
      // series.dataFields.dateX = 'last_update';
      // series.name = 'Space Used';

      let series2 = chart.series.push(new am4charts.LineSeries());
      series2.dataFields.categoryX = 'path';
      series2.dataFields.valueY = 'space_used';
      series2.dataFields.dateX = 'last_update';

      chart.cursor = new am4charts.XYCursor();
      this.chart = chart;
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
