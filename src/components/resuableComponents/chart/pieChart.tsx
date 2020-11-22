import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import { getChartSeries, getTaskByStatus } from '../../../utils/helper';

function PieChart(props:any) {
    const [chartInst, setChartInst] = useState(null);

    useEffect(() => {
        const allTask = props.task ? props.task : getTaskByStatus();
        const options = {
            series: getChartSeries(allTask)
        } 
        createChart(options);
    }, []);

    const createChart = (customOptions:any={}) => {
        let options = {
            series: customOptions?.series || [],
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: ['To-Do', 'In-Progress', 'Done'],
            colors: ['#f2c94c', '#27ae60', '#2f80ed'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: '100%'
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            legend: {
                position: 'bottom'
            }
        };
        let chart = new ApexCharts(document.querySelector("#overall-view-chart"), options);
        chart.render();
        setChartInst(chart);
    }

    return (
        <React.Fragment>
            <div className="pie-chart-container">
                <h3 className="pie-chart-head">Your Tasks Overview</h3>
                <div id="overall-view-chart"></div>
            </div>
        </React.Fragment>
    )
}

export default PieChart;