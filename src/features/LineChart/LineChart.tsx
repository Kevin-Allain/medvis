import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartData, ScatterDataPoint, CoreChartOptions, ElementChartOptions, PluginChartOptions, DatasetChartOptions, ScaleChartOptions, LineControllerChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';
import { FC, useState } from 'react';
import { _DeepPartialObject } from 'chart.js/types/utils';
import { Patient } from '../../interface/Patient'
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import '../../Styles/LineChart.css'

import {
    decrement, increment, incrementByAmount,
    selectDoubleSlider,
} from '../DoubleSlider/DoubleSliderSlice';
import { selectSelection, sortPatients } from '../Selection/SelectionSlice';
import { changeMaxEdgeMenu, changeMinEdgeMenu, changeMaxThresholdMenu, changeMinThresholdMenu, selectFilterMenu, } from '../FilterMenu/FilterMenuSlice';
import { LocationDisabledRounded } from '@material-ui/icons';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type LineChartProps = {
    // options?: _DeepPartialObject<CoreChartOptions<"line"> & ElementChartOptions<"line"> & PluginChartOptions<"line"> & DatasetChartOptions<"line"> & ScaleChartOptions<"line"> & LineControllerChartOptions> | undefined; // numLongitunal?: number; // patients?:Array<Patient>; // numLines:number; // labels: (number|string)[] | undefined; // data: ChartData<"line", (number | ScatterDataPoint | null)[], unknown> | null;    
}

const linearInterpolate = (before: number, after: number, atPoint: number) => {
    return before + (after - before) * atPoint;
};


const LineChart: FC<LineChartProps> = ((props) => {
    // const [labels, setLabels] = useState(['January', 'February', 'March','April']); // const labels = props.labels || []; // const labels = (props.patients)? props.patient[0].medTestA: [1,2,3,4,5]

    const selectionAttr = useAppSelector(selectSelection);
    const patients = selectionAttr.patients;
    const patientsSelection = selectionAttr.patientsSelection;

    // if (props.patients){ props.patients.forEach( a=> a.medTests.forEach( l => l.listRecords = l.listRecords.sort( (u,v) => new Date(u.record).getTime() - new Date(v.record).getTime()  ) )); } else { props.patients = new Array<Patient>(); }

    // patients.forEach( a=> a.medTests.forEach( l => l.listRecords = l.listRecords.sort( (u,v) => new Date(u.record).getTime() - new Date(v.record).getTime()  ) ));

    const dlSliderAttr = useAppSelector(selectDoubleSlider);
    // console.log("inside LineChart: ", dlSliderAttr);

    // const firstRecD = (props.patients)?[... props.patients[0].medTests.map( s => [...s.listRecords.map(t => t.record)]) ].map(q => q.map(r=>new Date(r)) ):undefined;
    // const labels = (firstRecD)? (firstRecD[0].sort( (a,b)=>a.getTime()-b.getTime()) ) : ['1','2','3'];
    // const dispatch = useAppDispatch();
    // dispatch(sortPatients);

    console.log("========");
    console.log(dlSliderAttr.valueName, dlSliderAttr.minThreshold, dlSliderAttr.maxThreshold)
    const filterMenuAttr = useAppSelector(selectFilterMenu);

    // console.log({ filterMenuAttr });
    // // applying tyhe filter 
    // let filteredPatient = Array<Patient>;
    // const arrValName = ['voluptate', 'aliquip', 'consectetur', 'laboris'];
    // for (let p of patients) {
    //     for (let i in p.medTests) {
    //         let indexArrFilter = arrValName.indexOf(p.medTests[i].testName);
    //         if (indexArrFilter !== -1) {
    //             // NOT WORKING
    //             p.medTests[i].listRecords.map((a, indx) =>
    //                 (a.score >= filterMenuAttr.minThreshold[indexArrFilter]
    //                     && a.score <= filterMenuAttr.maxThreshold[indexArrFilter]) ? a :
    //                     (indx > 0 && indx < p.medTests[i].listRecords.length - 1) ? linearInterpolate(p.medTests[i].listRecords[indx - 1].score, p.medTests[i].listRecords[indx + 1].score, 1) :
    //                         (indx === 0) ? p.medTests[i].listRecords[indx + 1].score : p.medTests[i].listRecords[indx - 1].score)
    //         }
    //     }
    // }

    const final = [];
    for (let patient of patients) {
        let datasets = [];
        if (patientsSelection.includes(patient.index)) {
            // 0 -> get ALL records in one structure
            let allRecords: string[] = [];
            patient.medTests[0].listRecords.map(b => allRecords.push(b.record));
            console.log("Pre filtering allRecords: ", { allRecords });
            console.log("filterMenuAttr: ", { filterMenuAttr });
            // 1 -> what are the listRecords to filter, according to filterMenu
            let stupid: string[] = [];
            let toFilterAll: string[] = [];
            // for (let i = 0; i < patient.medTests.length; i++) { patient.medTests.map( md => toFilterAll = toFilterAll.concat(  md.listRecords.filter( a => a.score < filterMenuAttr.minThreshold[i] || a.score > filterMenuAttr.maxThreshold[i] ) map(z => z.record) ) ) }
            for (let i in filterMenuAttr.minThreshold) {
                for (let m in patient.medTests) {
                    if (patient.medTests[m].testName === filterMenuAttr.valueName[i]) {
                        let recsToFilter = patient.medTests[m].listRecords
                            .filter(a => a.score < filterMenuAttr.minThreshold[i] || a.score > filterMenuAttr.maxThreshold[i])
                            .map(z => z.record);
                            toFilterAll = toFilterAll.concat(recsToFilter);
                    }
                }
            }
            console.log("toFilterAll: ", { toFilterAll })

            console.log("stupid: ",{ stupid });
            // 2 -> remove them from ALL labels
            const filteredRecords = allRecords.filter(a => !toFilterAll.includes(a))
            console.log("Post filtering, filteredRecords: ", { filteredRecords })
            // 3 -> load the data with filters for data that doesn't match

            let labels = [...patient.medTests[0].listRecords.filter( a => !stupid.includes(a.record)).map(t => t.record)]; console.log({ labels });
            labels = filteredRecords.map( a => a );
            console.log("labels: ",{labels})

            const options = {
                responsive: true,
                plugins: { legend: { position: 'top' as const, }, title: { display: true, text: `Patient ${patient.name}`, },},
            };

            for (let i = 0; i < patient.medTests.length; i++) {
                // let iterData = []; // for (let pm in patient.medTests) { for (let pmd in patient.medTests[pm].listRecords) { iterData.push({ x: patient.medTests[pm].listRecords[pmd].record, y: patient.medTests[pm].listRecords[pmd].score }) } }

                datasets.push({
                    label: `Dataset ${patient.medTests[i].testName}`,
                    data: [...patient.medTests[i].listRecords.filter(a => a.score >= filterMenuAttr.minThreshold[i] && a.score <= filterMenuAttr.maxThreshold[i]).map(a => a.score)],
                    // data: iterData,
                    borderColor: `rgb(${(i + 3) * 700 % 255}, ${(i + 1) * 200 % 255}, ${(i + 1) * 400 % 255})`,
                    backgroundColor: `rgba(${(i + 3) * 700 % 255}, ${(i + 1) * 200 % 255}, ${(i + 1) * 400 % 255}, 0.5)`,
                })
            }

            const data = { labels , datasets: datasets };
            final.push(<li key={patient.name}> <Line options={options} data={data}></Line></li>);
        }
    }

    return (<>
        <ul className='no-bullets' >{final}</ul>
    </>);
}
)

export default LineChart;
