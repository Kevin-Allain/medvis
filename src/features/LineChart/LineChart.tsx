import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartData, ScatterDataPoint, CoreChartOptions, ElementChartOptions, PluginChartOptions, DatasetChartOptions, ScaleChartOptions, LineControllerChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';
import { FC, useState } from 'react';
import { _DeepPartialObject } from 'chart.js/types/utils';
import {Patient} from '../../interface/Patient'

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

type LineChartProps = {
    // data: ChartData<"line", (number | ScatterDataPoint | null)[], unknown> | null;
    options?: _DeepPartialObject<CoreChartOptions<"line"> & ElementChartOptions<"line"> & PluginChartOptions<"line"> & DatasetChartOptions<"line"> & ScaleChartOptions<"line"> & LineControllerChartOptions> | undefined;
    numLongitunal?: number;
    numLines:number;
    // labels: (number|string)[] | undefined;
    patients?:Array<Patient>
}


const LineChart: FC<LineChartProps> = ((props) => {
    // const [labels, setLabels] = useState(['January', 'February', 'March','April']);
    // const labels = props.labels || [];
    // const labels = (props.patients)? props.patient[0].medTestA: [1,2,3,4,5]

    if (props.patients){
        props.patients.forEach( a=> a.medTests.forEach( l => l.listRecords = l.listRecords.sort( (u,v) => new Date(u.record).getTime() - new Date(v.record).getTime()  ) ));
    } else {
        props.patients = new Array<Patient>();
    }

    console.log({props})

    // const firstRecD = (props.patients)?[... props.patients[0].medTests.map( s => [...s.listRecords.map(t => t.record)]) ].map(q => q.map(r=>new Date(r)) ):undefined;
    // const labels = (firstRecD)? (firstRecD[0].sort( (a,b)=>a.getTime()-b.getTime()) ) : ['1','2','3'];
    const labels = [...props.patients[0].medTests[0].listRecords.map(t => t.record)]

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' as const, },
            title: {
                display: true, text: `Patient ${(props.patients.length>0)?props.patients[0].name:'unnamed'}`, },
        },
    };

    let datasets = [];
    for (let i = 0; i< props.patients[0].medTests.length; i++){
        datasets.push({
            label: `Dataset ${(props.patients)?props.patients[0].medTests[i].testName:'#'}`,
            data: [...props.patients[0].medTests[i].listRecords.map(a=>a.score)],
            borderColor: `rgb(${(i+3)*700%255}, ${(i+1)*200%255}, ${(i+1)*400%255})`,
            backgroundColor: `rgba(${(i+3)*700%255}, ${(i+1)*200%255}, ${(i+1)*400%255}, 0.5)`,
        })
    }

    const data = {
        labels,
        datasets:datasets
    };

    return (<>
        <Line options={options} data={data}></Line>
    </>);
    }
)

export default LineChart;