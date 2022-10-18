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
    labels: (number|string)[] | undefined;
    patients?:Array<Patient>
}


const LineChart: FC<LineChartProps> = ((props) => {
    // const [labels, setLabels] = useState(['January', 'February', 'March','April']);
    console.log({props});
    const labels = props.labels || [];
    console.log(labels.map(() => Math.random()*(2000)-1000))

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' as const, },
            title: {
                display: true, text: 'Chart.js Line Chart', },
        },
    };

    let datasets = [];
    for (let i = 0; i< props.numLines; i++){
        datasets.push({
            label: `Dataset ${(props.patients)?props.patients[i].name:'#'}`,
            data: labels.map(() => Math.random()*(2000)-1000),
            borderColor: `rgb(${Math.random()*(i+1)*800%255}, ${Math.random()*(i+1)*200%255}, ${Math.random()*(i+1)*400%255})`,
            backgroundColor: `rgba(${Math.random()*(i+1)*800%255}, ${Math.random()*(i+1)*200%255}, ${Math.random()*(i+1)*400%255}, 0.5)`,
        })
    }

    const data = {
        labels,
        datasets:datasets
    };

    return <Line options={props.options} data={data} />;
    }
)

export default LineChart;
