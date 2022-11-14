import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartData, ScatterDataPoint, CoreChartOptions, ElementChartOptions, PluginChartOptions, DatasetChartOptions, ScaleChartOptions, LineControllerChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FC, useState } from 'react';
import { _DeepPartialObject } from 'chart.js/types/utils';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import '../../Styles/LineChart.css';
import { selectSelection, sortPatients } from '../Selection/SelectionSlice';
import { changeMaxEdgeMenu, changeMinEdgeMenu, changeMaxThresholdMenu, changeMinThresholdMenu, selectFilterMenu, } from '../FilterMenu/FilterMenuSlice';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type LineChartProps = {}

export const linearInterpolate = (before: number, after: number, atPoint: number) => { return before + (after - before) * atPoint; };

const numCols = 2;

const LineChart: FC<LineChartProps> = ((props) => {
    const selectionAttr = useAppSelector(selectSelection);
    const patients = selectionAttr.patients;
    const patientsSelection = selectionAttr.patientsSelection;
    const filterMenuAttr = useAppSelector(selectFilterMenu);
    const final = [];let final1 = [], final2=[];

    for (let patient of patients) {
        let datasets = [];
        if (patientsSelection.includes(patient.index)) {
            // 0 -> get ALL records in one structure
            let allRecords: string[] = [];
            patient.medTests[0].listRecords.map(b => allRecords.push(b.record));
            // 1 -> what are the listRecords to filter, according to filterMenu
            let toFilterAll: string[] = [];
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
            let labels = [...patient.medTests[0].listRecords.filter( a => !toFilterAll.includes(a.record)).map(t => t.record)]; 
            labels = filteredRecords.map( a => a );

            for (let i = 0; i < patient.medTests.length; i++) {
                datasets.push({
                    label: `Dataset ${patient.medTests[i].testName}`,
                    data:  [...patient.medTests[i].listRecords.filter(a => labels.includes(a.record) ).map(a => a.score)],
                    borderColor: `rgb(${(i + 3) * 700 % 255}, ${(i + 1) * 200 % 255}, ${(i + 1) * 400 % 255})`,
                    backgroundColor: `rgba(${(i + 3) * 700 % 255}, ${(i + 1) * 200 % 255}, ${(i + 1) * 400 % 255}, 0.5)`,
                })
            }

            const options = {
                responsive: true,
                plugins: { legend: { position: 'top' as const, }, title: { display: true, text: `Patient ${patient.name}`, },},
            };
            const data = { labels , datasets: datasets };
            final.push(
                <Line key={patient.name} options={options} data={data}></Line>
            )

        }
    }

    final2 = final.filter( (v,i) => i%numCols );
    final1 = final.filter( (v,i) => !(i%numCols));
    const structHTML = <div id="grid">
        <div className="head1" id='head1'>{final1}</div>
        <div className="head2" id='head2'>{final2}</div>
    </div>
    return (<>
        {structHTML}
    </>)
}
)

export default LineChart;
