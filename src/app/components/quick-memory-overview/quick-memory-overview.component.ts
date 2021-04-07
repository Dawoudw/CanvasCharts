import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quick-memory-overview',
  templateUrl: './quick-memory-overview.component.html',
  styleUrls: ['./quick-memory-overview.component.css']
})
export class QuickMemoryOverviewComponent implements OnInit {

  constructor() { }
  div1 ="div1"
  div2 ="div2"
  ngOnInit(): void {
    this.setwidth();
  }
  setwidth(){
    var parentdiv = document.getElementById("tilesinside");
    var amountofdivs = parentdiv.getElementsByTagName("div").length;
    var widthset = amountofdivs * 280;
    document.getElementById("tilesinside").style.width = widthset + "px";
    }
}
