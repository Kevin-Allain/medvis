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

const linearInterpolate = (before: number, after: number, atPoint: number) => { return before + (after - before) * atPoint; };

const numCols = 2;

const LineChart: FC<LineChartProps> = ((props) => {

    const selectionAttr = useAppSelector(selectSelection);
    const patients = selectionAttr.patients;
    const patientsSelection = selectionAttr.patientsSelection;

    const dlSliderAttr = useAppSelector(selectDoubleSlider);

    console.log(dlSliderAttr.valueName, dlSliderAttr.minThreshold, dlSliderAttr.maxThreshold)
    const filterMenuAttr = useAppSelector(selectFilterMenu);

    const final = [];
    const final1 = [], final2=[];

    for (let patient of patients) {
        let datasets = [];
        if (patientsSelection.includes(patient.index)) {
            // 0 -> get ALL records in one structure
            let allRecords: string[] = [];
            patient.medTests[0].listRecords.map(b => allRecords.push(b.record));
            // 1 -> what are the listRecords to filter, according to filterMenu
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
            // 2 -> remove them from ALL labels
            const filteredRecords = allRecords.filter(a => !toFilterAll.includes(a))

            // 3 -> load the data with filters for data that doesn't match
            let labels = [...patient.medTests[0].listRecords.filter( a => !toFilterAll.includes(a.record)).map(t => t.record)]; console.log({ labels });
            labels = filteredRecords.map( a => a );


            for (let i = 0; i < patient.medTests.length; i++) {
                // let iterData = []; // for (let pm in patient.medTests) { for (let pmd in patient.medTests[pm].listRecords) { iterData.push({ x: patient.medTests[pm].listRecords[pmd].record, y: patient.medTests[pm].listRecords[pmd].score }) } }
                datasets.push({
                    label: `Dataset ${patient.medTests[i].testName}`,
                    data:  [...patient.medTests[i].listRecords.filter(a => labels.includes(a.record) ).map(a => a.score)],
                    // [...patient.medTests[i].listRecords.filter(a => a.score >= filterMenuAttr.minThreshold[i] && a.score <= filterMenuAttr.maxThreshold[i]).map(a => a.score)], // data: iterData,
                    borderColor: `rgb(${(i + 3) * 700 % 255}, ${(i + 1) * 200 % 255}, ${(i + 1) * 400 % 255})`,
                    backgroundColor: `rgba(${(i + 3) * 700 % 255}, ${(i + 1) * 200 % 255}, ${(i + 1) * 400 % 255}, 0.5)`,
                })
            }

            const options = {
                responsive: true,
                plugins: { legend: { position: 'top' as const, }, title: { display: true, text: `Patient ${patient.name}`, },},
            };
            const data = { labels , datasets: datasets };
            // final.push(
            //     <li key={patient.name}> 
            //         <Line options={options} data={data}></Line>
            //     </li>
            // );

            // ---- Attempt to make prettier 
            // // final.push(  )
            // console.log({patientsSelection});
            // // TODO wrong still but trying to see how we can make it work
            // (patientsSelection.length % numCols === 0)?
            //     final.push(
            //         <tr className='rowChart'>
            //             <th className='columnChart' key={'_'+patient.name}>
            //             <Line options={options} data={data}></Line>
            //             </th>
            //         </tr>
            //     )
            //     : final.push(
            //         <th className='columnChart' key={'_'+patient.name}>
            //         <Line options={options} data={data}></Line>
            //         </th>
            //     )
            console.log( "patient.index: ", patient.index, " % numCols === 0 ", (patient.index % numCols ===0));
            (patient.index % numCols === 0)?
            final1.push(
                    <Line key={patient.name} options={options} data={data}></Line>
            ) : 
            final2.push(
                <Line key={patient.name} options={options} data = {data}></Line>
            )

        }
    }

    // return (<>
    //     <ul className='no-bullets' >{final}</ul>
    // </>);

    // ---- Attempt to make something prettier
    // return (<>
    //     <table>
    //         <tbody>{final}</tbody>
    //     </table>
    // </>);

    let structHTML = <div id="grid">
    <div className="head1" id='head1'>{final1}</div>
    <div className="head2" id='head2'>{final2}</div>
    </div>

    console.log({structHTML, final1,final2})

    return (<>
        {structHTML}
    </>)

}
)

export default LineChart;
