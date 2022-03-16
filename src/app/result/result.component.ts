import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { AppService } from "../app.service";

@Component({
    selector: "app-result",
    templateUrl: "./result.component.html",
    styleUrls: ["./result.component.css"],
})

export class ResultComponent implements OnInit {

    public indChartData: ChartDataSets[] = [
        { data: [0.00, 0.23, 1.03, 1.03, 1.40, 0.90], label: 'P1' },
    ];
    public lineChartData: ChartDataSets[] = [
        { data: [0.00, 0.23, 1.03, 1.03, 1.40, 0.90], label: 'P1' },
        { data: [0.00, 0.66, 0.41, 0.25, 0.39, 0.39], label: 'P2' },
        { data: [0.00, 0.00, 0.71, 0.71, 1.07, 0.83], label: 'P3' },
        { data: [0.00, 0.66, 0.66, 1.12, 0.99, 0.99], label: 'P4' },
        { data: [0.00, 0.00, 1.27, 0.77, 0.21, 0.39], label: 'P5' },
    ];
    public lineChartLabels: Label[] = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'];
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

    loginForm: FormGroup;
    week;
    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private appSrv: AppService
    ) {

    }

    ngOnInit() {
        this.week = this.route.snapshot.params['week'];

        this.loginForm = this.fb.group({
            id: ['', Validators.required]
        });

        this.appSrv.getGroupData();
    }
}