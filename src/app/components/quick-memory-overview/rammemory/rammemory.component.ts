import { AfterViewInit, Component, Input, NgZone, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from '@amcharts/amcharts4/themes/material';
am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-rammemory',
  template: `<div id="{{ chartdiv }}"></div>`,
  styles: [
    `
      div {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class RAMMemoryComponent implements OnInit, AfterViewInit {
  @Input() chartdiv: string = '';
  document: Document;
  chart: am4charts.XYChart;
  constructor(private zone: NgZone) {}
  // add data
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      function getRandomVal(): any {
        return  (Math.random() * 100 + 1 + Math.random()).toFixed(2);
      }
      function getRandomTime(h): any {
        let val = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDay(),
          new Date().getHours() + h,
          new Date().getMinutes() + Math.floor(Math.random() * 30 + 1)
        );
        return val;
        // console.log('getRandomTime',val)
      }
      let chart = am4core.create(this.chartdiv, am4charts.XYChart);
      chart.colors.step = 2;
      chart.hiddenState.properties.opacity = 0;
      chart.padding(2, 2, 30, 2);
      chart.zoomOutButton.disabled = true;
      let data = [];
      let visits = 10;
      let visits2 = 10;
      let i = 0;
      // for (i = 0; i <= 20; i++) {
      //   visits -= Math.round(
      //     (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10
      //   );
      //   data.push({ date: new Date().setSeconds(i - 10), value: visits });
      // }

      for (let i = 0; i < 24; i++) {
        data.push({
          date: new Date().setSeconds(i - 10),
          time: new Date().setSeconds(i - 10),
          ram_use: getRandomVal(),
          ram_free: getRandomVal(),
        });
      }
      chart.data = data.sort((a, b) => a.date - b.date);

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
      dateAxis.title.text = 'RAM Memory';
      // dateAxis.renderer.grid.template.margin (15,15,15,15) ;
      dateAxis.title.textAlign = 'middle';
      dateAxis.interpolationDuration = 10000;
      dateAxis.rangeChangeDuration = 500;
      dateAxis.title.valign = 'top';
      dateAxis.title.marginTop = 15;

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.renderer.minGridDistance = 15;
      valueAxis.strictMinMax = true;
      //  valueAxis.renderer.grid.template.margin (15,15,15,15) ;

      // valueAxis.renderer.minLabelPosition = 0.02;
      // valueAxis.renderer.maxLabelPosition = 0.98;
      valueAxis.tooltip.disabled = true;
      valueAxis.interpolationDuration = 10000;
      valueAxis.rangeChangeDuration = 10000;
      valueAxis.renderer.inside = false;
      valueAxis.renderer.grid.template.strokeOpacity = 0.2;
      valueAxis.renderer.grid.template.stroke = am4core.color('#A0CA92');
      valueAxis.renderer.grid.template.strokeWidth = 1;
      valueAxis.renderer.axisFills.template.disabled = false;
      // valueAxis.renderer.ticks.template.disabled = false;
      // valueAxis.renderer.ticks.template.stroke = am4core.color('#A0CA92');
      // valueAxis.renderer.ticks.template.strokeWidth = 3;
      //valueAxis.renderer.tooltipText = 'Series: {valueX}\n Value: {valueY}';
      valueAxis.renderer.width =60;
      chart.numberFormatter.numberFormat = "#.##' GiB";
      valueAxis.calculateTotals = true;
      //ValueAxis to synchronize its grid with some other axis.
       valueAxis.syncWithAxis = dateAxis;
      dateAxis.syncWithAxis = valueAxis;

      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = 'date';
      series.dataItems.template.locations.dateX = 0;
      series.dataFields.valueY = 'ram_use';
      series.interpolationDuration = 10000;
      series.fillOpacity = 0.4;
      series.defaultState.transitionDuration = 10000;
        series.tensionX = 0.98;
      // series.tensionY = 0.7;
      //series.margin(15,15,15,5);
      // series.xAxis.tooltipText = 'cc: {valueX}\n vv: {valueX}';
      series.dataFields.valueYShow = 'totalPercent';
      series.sequencedInterpolation = true;
      // series.dataFields.openValueY = "ram_free";
      series.stacked = true;
      var lineSeries2 = chart.series.push(new am4charts.LineSeries());
      lineSeries2.dataFields.dateX = 'time';
      lineSeries2.dataFields.valueY = 'ram_free';
      lineSeries2.dataFields.customValue = 'ram_use';

      lineSeries2.tooltipText =
        '[bold]Date[/]: {dateX}\n [bold]Ram-Free:[/] {valueY.value}\n[bold]Ram-Used:[/] {customValue}';
      // lineSeries2.tooltip.stroke = am4core.color('black'); // text color

      lineSeries2.tooltip.fontWeight = 'lighter';
      //lineSeries2.tooltip.fill = am4core.color('#f0dd89');
      lineSeries2.tooltip.label.fill = am4core.color('darkred');
      lineSeries2.tooltip.opacity = 0.6;
      lineSeries2.tooltip.getFillFromObject = false;
      lineSeries2.tooltip.background.fill = am4core.color('#f0dd89');
      // lineSeries2.tooltip.background.stroke = am4core.color('#f0dd89');
      lineSeries2.interpolationDuration = 10000;
      lineSeries2.defaultState.transitionDuration = 10000;
        lineSeries2.tensionX = 0.98;
      // lineSeries2.tensionY = 0.7;
      lineSeries2.stroke = am4core.color('#f0dd89');
      lineSeries2.propertyFields.stroke = '#f0dd89';
      lineSeries2.propertyFields.fill = '#f0dd89';
      lineSeries2.dataFields.valueYShow = 'totalPercent';
      lineSeries2.sequencedInterpolation = true;
      lineSeries2.stacked = true;
      //lineSeries2.dataFields.openValueY = 'ram_used';
      chart.events.on('datavalidated', function () {
        dateAxis.zoom({ start: 1 / 14, end: 1 }, false, true);
      });
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
          visits2 =
            visits2 +
            Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
          let lastdataItem2 = lineSeries2.dataItems.getIndex(
            lineSeries2.dataItems.length - 1
          );
          chart.addData(
            {
              date: new Date(lastdataItem.dateX.getTime() + 500),
              time: new Date(lastdataItem.dateX.getTime() + 500),
              ram_use: visits,
              ram_free: visits2,
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
      gradient.addColor(chart.colors.getIndex(0), 0.5);
      gradient.addColor(chart.colors.getIndex(0), 0);
      series.fill = gradient;

      lineSeries2.fillOpacity = 1;
      var gradient2 = new am4core.LinearGradient();
      gradient2.addColor(chart.colors.getIndex(3), 0.5);
      gradient2.addColor(chart.colors.getIndex(3), 0);
      lineSeries2.fill = gradient2;

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
      //     // dataItem['value']== am4core.time .round(new Date(dataItem['value']), 'minute',null).getTime()
      //     // )
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
      // let scrollbarX = new am4charts.XYChartScrollbar();
      // scrollbarX.series.push(series);
      // chart.scrollbarX = scrollbarX;

      // chart.legend = new am4charts.Legend();
      // chart.numberFormatter.numberFormat = "#.#' io/s'";
      chart.cursor = new am4charts.XYCursor();
      // bullet at the front of the line
      let bullet = series.createChild(am4charts.CircleBullet);
      bullet.circle.stroke = am4core.color('#fff');
      bullet.circle.strokeWidth = 1;
      bullet.circle.tooltipText = '{dateX}: [b]{valueY}[/]';
      bullet.circle.radius = 1;
      bullet.fillOpacity = 1;
      bullet.fill = chart.colors.getIndex(0);
      bullet.isMeasured = false;

      let bullet2 = series.createChild(am4charts.LabelBullet);
      bullet2.label.stroke = am4core.color('#fff');
      bullet2.label.strokeWidth = 1;
      bullet2.label.tooltipText = '{dateX}: [b]{valueY}[/]';
      // bullet2.circle.radius = 0;
      bullet2.fillOpacity = 1;
      bullet2.fill = chart.colors.getIndex(0);
      bullet2.isMeasured = false;

      chart.legend = new am4charts.Legend();
      chart.legend.parent = chart.tooltipContainer;
      chart.legend.zIndex = 100;

      series.events.on('validated', function () {
        bullet.moveTo(series.dataItems.last.point);
        bullet.validatePosition();
      });
      lineSeries2.events.on('validated', function () {
        bullet2.moveTo(lineSeries2.dataItems.last.point);
        bullet2.validatePosition();
      });
    });
  }
}
