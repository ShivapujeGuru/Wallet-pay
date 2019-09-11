import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  userId: number;
  history = false;
  historyData = [];
  fromRange : any;
  toRange : any;
  emptyDate = [];
  invalid = false;
  exportAsConfig: ExportAsConfig = {
    type: 'xlsx',
    elementId: 'transactionHistory',
    options: {
      orientation: 'landscape',
      margins: {
        top: '60',
        right: '200',
        left: '200'
      }
    }
  }

  constructor(private dataService: DataService,
              private exportAsService: ExportAsService) { }

  ngOnInit() {
    this.getHistory(this.emptyDate, this.emptyDate);
  }

  getHistory(fromRange: any, toRange: any) {
    this.history = true;
    this.userId = JSON.parse(localStorage.getItem('details'))['id'];
    this.dataService.getHistory(this.userId)
    .subscribe(
      data => {
        if(data) {
          if(data['history'] && data['history'].length) {
            if(fromRange.length || toRange.length) {
              this.historyData = [];
              this.fromRange = new Date(fromRange).getTime();
              this.toRange = new Date(toRange).getTime();
              this.history = true;
              for(let i=0; i<data['history'].length; i++) {
                // if(this.fromRange != "NaN" && this.toRange != "NaN") {
                  if(data['history'][i].createdAt > this.fromRange && data['history'][i].createdAt < this.toRange) {
                    this.historyData.push(data['history'][i]);
                  }
                // } else {
                  // console.log('61');
                // }
              }
            } else {
              this.history = true;
              this.historyData = data['history'];
            }
          }
        }
      },
      error => { 
        this.invalid = true;
        console.log(error);
      }
    );
  }

  downloadPDF() {
    var data = document.getElementById('transactionHistory');
    html2canvas(data).then(canvas => {
    var imgWidth = 208;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    
    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jspdf('p', 'mm', 'a4');
    var position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    pdf.save('history.pdf');
    });
  }

  downloadExcel() {
    this.exportAsService.save(this.exportAsConfig, 'history');
  }

}