import { AfterViewInit, Component, Input, NgZone, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from '@amcharts/amcharts4/themes/material';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-memory-pages-in-out',
  // templateUrl: './memory-pages-in-out.component.html',
  template: `<div id="{{ chartdiv }}"></div>`,
  // styleUrls: ['./memory-pages-in-out.component.css'],
  styles: [
    `
      div {
        padding: 0px;
        margin: 5px;
        width: 90%;
        height: 100%;
      }
    `,
  ],
})
export class MemoryPagesInOutComponent implements OnInit, AfterViewInit {
  @Input() chartdiv: string = '';
  document: Document;
  chart: am4charts.XYChart;
  constructor(private zone: NgZone) {}
  // add data
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      am4core.useTheme(am4themes_material);
      let chart = am4core.create(this.chartdiv, am4charts.XYChart);
      chart.hiddenState.properties.opacity = 0;

      chart.padding(2, 2, 30, 2);

      chart.zoomOutButton.disabled = true;
      let data = [];
      let visits = 10;
      let i = 0;

      for (i = 0; i <= 20; i++) {
        visits -= Math.round(
          (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10
        );
        data.push({ date: new Date().setSeconds(i - 10), value: visits });
      }

      chart.data = data;

      var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.minGridDistance = 40;
      dateAxis.dateFormats.setKey('second', 'hh:mm:ss');
      dateAxis.periodChangeDateFormats.setKey('second', '[bold]h:mm a');
      dateAxis.periodChangeDateFormats.setKey('minute', '[bold]h:mm a');
      dateAxis.periodChangeDateFormats.setKey('hour', '[bold]h:mm a');
      dateAxis.renderer.inside = true;
      dateAxis.renderer.axisFills.template.disabled = true;
      dateAxis.renderer.ticks.template.disabled = true;
      dateAxis.title.text = 'Memory Pages In / Out';
      dateAxis.title.marginTop = 30;
      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = false;
      valueAxis.interpolationDuration = 10000;
      valueAxis.rangeChangeDuration = 10000;
      valueAxis.renderer.inside = false;
      valueAxis.renderer.minLabelPosition = 0.5;
      valueAxis.renderer.maxLabelPosition = 0.95;
      valueAxis.renderer.axisFills.template.disabled = false;
      valueAxis.renderer.ticks.template.disabled = false;
      valueAxis.renderer.ticks.template.stroke = am4core.color('#A0CA92');
      valueAxis.renderer.ticks.template.strokeWidth = 3;

      valueAxis.renderer.grid.template.strokeOpacity = 0.2;
      valueAxis.renderer.grid.template.stroke = am4core.color('#A0CA92');
      valueAxis.renderer.grid.template.strokeWidth = 1;

      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = 'date';
      series.dataFields.valueY = 'value';
      series.interpolationDuration = 10000;
      series.defaultState.transitionDuration = 10000;
      series.tensionX = 0.8;
      series.xAxis.tooltipText = 'cc: {dateX}\n vv: {valueY}';
      valueAxis.renderer.tooltipText = 'Series: {dateX}\n Value: {valueY}';
      chart.events.on('datavalidated', function () {
        dateAxis.zoom({ start: 1 / 14, end: 1 }, false, true);
      });

      dateAxis.interpolationDuration = 10000;
      dateAxis.rangeChangeDuration = 500;
      document.addEventListener(
        'visibilitychange',
        function () {
          if (document.hidden) {
            if (interval) {
              clearInterval(interval);
            }
          } else {
            startInterval();
          }
        },
        false
      );
      // add data
      let interval;
      function startInterval() {
        interval = setInterval(function () {
          visits =
            visits +
            Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
          let lastdataItem = series.dataItems.getIndex(
            series.dataItems.length - 1
          );
          chart.addData(
            {
              date: new Date(lastdataItem.dateX.getTime() + 500),
              value: visits,
            },
            1
          );
        }, 10000);
      }

      startInterval();
      // all the below is optional, makes some fancy effects
      // gradient fill of the series
      series.fillOpacity = 1;
      var gradient = new am4core.LinearGradient();
      gradient.addColor(chart.colors.getIndex(0), 0.2);
      gradient.addColor(chart.colors.getIndex(0), 0);
      series.fill = gradient;

      // this makes date axis labels to fade out
      dateAxis.renderer.labels.template.adapter.add(
        'fillOpacity',
        function (fillOpacity, target) {
          var dataItem = target.dataItem;
          return dataItem.position;
        }
      );

      // need to set this, otherwise fillOpacity is not changed and not set
      dateAxis.events.on('validated', function () {
        am4core.iter.each(
          dateAxis.renderer.labels.iterator(),
          function (label) {
            label.fillOpacity = label.fillOpacity;
          }
        );
      });

      // this makes date axis labels which are at equal minutes to be rotated
      // dateAxis.renderer.labels.template.adapter.add(
      //   'rotation',
      //   function (rotation, target) {
      //     let dataItem = target.dataItem;
      //     // console.log('dataItem',
      //     // dataItem['value']==  am4core.time .round(new Date(dataItem['value']), 'minute',null).getTime()
      //     //    )
      //     if (
      //       dataItem['value'] ==
      //       am4core.time
      //         .round(new Date(dataItem['value']), 'minute', null)
      //         .getTime()
      //     ) {
      //       dateAxis.renderer.verticalCenter = 'middle';
      //       dateAxis.renderer.horizontalCenter = 'middle';
      //       return -90;
      //     } else {
      //       dateAxis.renderer.verticalCenter = 'bottom';
      //       dateAxis.renderer.horizontalCenter = 'middle';
      //       return 0;
      //     }
      //   }
      // );
      // chart.legend = new am4charts.Legend();
      // chart.numberFormatter.numberFormat = "#.#' io/s'";
      chart.cursor = new am4charts.XYCursor();
      // bullet at the front of the line
      let bullet = series.createChild(am4charts.CircleBullet);
      bullet.circle.radius = 0;
      bullet.fillOpacity = 1;
      bullet.fill = chart.colors.getIndex(0);
      bullet.isMeasured = false;

      series.events.on('validated', function () {
        bullet.moveTo(series.dataItems.last.point);
        bullet.validatePosition();
      });
    });
  }
}
