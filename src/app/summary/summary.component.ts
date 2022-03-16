import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../app.service";
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
    selector: "app-summary",
    templateUrl: "./summary.component.html",
    styleUrls: ["./summary.component.css"],
})

export class SummaryComponent implements OnInit {

    uid;
    name;

    currentTab = 1;

    public lineChartData: ChartDataSets[] = [
        { data: [0.00, 0.23, 1.03, 1.03, 1.40, 0.90], label: 'P1' },
        { data: [0.00, 0.66, 0.41, 0.25, 0.39, 0.39], label: 'P2' },
        { data: [0.00, 0.00, 0.71, 0.71, 1.07, 0.83], label: 'P3' },
        { data: [0.00, 0.66, 0.66, 1.12, 0.99, 0.99], label: 'P4' },
        { data: [0.00, 0.00, 1.27, 0.77, 0.21, 0.39], label: 'P5' },
    ];
    public lineChartLabels: Label[] = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'];
    public lineChartOptions: (ChartOptions & { annotation?: any }) = {
        responsive: true,
    };
    public lineChartColors: Color[] = [
        {
            borderColor: 'black',
            backgroundColor: 'rgba(255,0,0,0.3)',
        },
    ];
    public lineChartLegend = true;
    public lineChartType = 'line';
    public lineChartPlugins = [];

    testData = [
        { 'studentId': 'P1', 'week': 'W1', 'gp': 1, 'values': 0 },
        { 'studentId': 'P1', 'week': 'W2', 'gp': 2, 'values': 0.23109537 },
        { 'studentId': 'P1', 'week': 'W3', 'gp': 3, 'values': 1.0302902 },
        { 'studentId': 'P1', 'week': 'W4', 'gp': 1, 'values': 1.0302902 },
        { 'studentId': 'P1', 'week': 'W5', 'gp': 1, 'values': 1.4023153 },
        { 'studentId': 'P1', 'week': 'W6', 'gp': 4, 'values': 0.8970851 },
        { 'studentId': 'P1', 'week': 'W1', 'gp': 1, 'values': 0 },
        { 'studentId': 'P2', 'week': 'W2', 'gp': 1, 'values': 0.66107494 },
        { 'studentId': 'P2', 'week': 'W3', 'gp': 2, 'values': 0.41404596 },
        { 'studentId': 'P2', 'week': 'W4', 'gp': 3, 'values': 0.2518665 },
        { 'studentId': 'P2', 'week': 'W5', 'gp': 1, 'values': 0.39387438 },
        { 'studentId': 'P2', 'week': 'W6', 'gp': 1, 'values': 0.39387438 },
        { 'studentId': 'P3', 'week': 'W1', 'gp': 1, 'values': 0 }
    ];

    sortedData = [];
    class;

    constructor(
        private route: ActivatedRoute,
        private appSrv: AppService
    ) {

    }


    ngOnInit() {
        this.uid = this.route.snapshot.params['id'];
        this.name = this.route.snapshot.params['name'];

        this.onSortData(this.testData);
        this.class = this.appSrv.getClass();
    }

    changeTab(x) {
        this.currentTab = x;
        if (x == 1) {
            document.getElementById("1").classList.add('active');
            document.getElementById("2").classList.remove('active');
        } else {
            document.getElementById("2").classList.add('active');
            document.getElementById("1").classList.remove('active');
        }

    }

    onSortData(data) {
        this.sortedData = [];
        let grps = data.map(item => item['gp'])
            .filter((value, index, self) => self.indexOf(value) === index)
        let count = 0;
        while (true) {
            if (count < grps.length) {
                let array = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i]['gp'] === grps[count]) {
                        array.push(data[i]);
                    }
                }
                array.sort(function (a, b) {
                    if (a['week'] < b['week']) {
                        return -1;
                    }
                    if (a['week'] > b['week']) {
                        return 1;
                    }
                    return 0;
                });
                this.sortedData.push(array);
                count += 1;
            } else {
                break
            }
        }
    }


}