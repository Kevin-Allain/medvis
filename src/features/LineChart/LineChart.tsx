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

import { decrement, increment, incrementByAmount,
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
    console.log(dlSliderAttr.valueName,dlSliderAttr.minThreshold,dlSliderAttr.maxThreshold)
    const filterMenuAttr = useAppSelector(selectFilterMenu);

    console.log({filterMenuAttr});
    // applying tyhe filter 
    let filteredPatient = Array<Patient>;
    const arrValName = ['voluptate','aliquip','consectetur','laboris'];
    for(let p of patients){
        for (let i in p.medTests){
            let indexArrFilter = arrValName.indexOf(p.medTests[i].testName);
            if (indexArrFilter !== -1){
                // NOT WORKING
                p.medTests[i].listRecords.map((a,indx) => 
                    (a.score>= filterMenuAttr.minThreshold[indexArrFilter] 
                    && a.score<=filterMenuAttr.maxThreshold[indexArrFilter])? a : 
                        ( indx>0 && indx < p.medTests[i].listRecords.length-1)? linearInterpolate(p.medTests[i].listRecords[indx-1].score,p.medTests[i].listRecords[indx+1].score,1 ) :
                        ( indx===0)? p.medTests[i].listRecords[indx+1].score : p.medTests[i].listRecords[indx-1].score )
            }
        }
    }

    const final = [];
    for (let patient of patients) {
        let datasets = [];
        // patient.medTests.forEach( l => l.listRecords = l.listRecords.sort( (u,v) => new Date(u.record).getTime() - new Date(v.record).getTime() ) ); // console.log("Patient index: ",patient.index, " and is selected: ",(patientsSelection.includes(patient.index)));

        if (patientsSelection.includes(patient.index)){
            // 0 -> get ALL records in one structure
            let allRecords : string[] = [];
            patient.medTests.map(a => a.listRecords.map( b => allRecords.push(b.record) ) );
            console.log("Pre filtering ",{allRecords});
            // 1 -> what are the listRecords to filter, according to filterMenu
            let recordsFilter : string[] = [];
            
            let toFilterAll:Array<string> = [];
            for (let i = 0; i < patient.medTests.length; i++) {
                // recordsFilter = recordsFilter.concat([... patient.medTests[i].listRecords.filter(a => a.score<filterMenuAttr.minThreshold[i] || a.score>filterMenuAttr.maxThreshold[i] ).map(a => a.record)]);
                patient.medTests.map( md => toFilterAll = toFilterAll.concat( 
                    md.listRecords.filter( a => a.score < filterMenuAttr.minThreshold[i] || a.score > filterMenuAttr.maxThreshold[i] )
                    .map(z => z.record) ) )
            }
            console.log("++++",{toFilterAll})
            
            console.log({recordsFilter});
            // 2 -> remove them from ALL labels
            const filteredRecords = allRecords.filter(a => !toFilterAll.includes(a) )
            console.log("Post filtering",{filteredRecords})
            // 3 -> load the data with filters for data that doesn't match

            const labels = [...patient.medTests[0].listRecords.filter(a => !recordsFilter.includes(a.record)).map(t => t.record)]; console.log({labels});

            const options = {
                responsive: true,
                plugins: { legend: { position: 'top' as const, }, title: { display: true, text: `Patient ${patient.name}`, },
                },
            };

            for (let i = 0; i < patient.medTests.length; i++) {
                let iterData = []
                for (let pm in patient.medTests){
                    for (let pmd in patient.medTests[pm].listRecords){
                        iterData.push( {x:patient.medTests[pm].listRecords[pmd].record, y : patient.medTests[pm].listRecords[pmd].score})
                    }
                }
                console.log("-- iterData: ",iterData);
                // TODO debugging occuring now, eventually we need to use iterData
                let dataTest = [{"x":"2014-01-23T08:05:37","y":69},{"x":"2014-03-01T11:37:13","y":null},{"x":"2015-04-05T08:54:11","y":115},{"x":"2015-11-14T06:54:39","y":51},{"x":"2016-08-15T04:53:39","y":89},{"x":"2016-12-14T01:04:02","y":102},{"x":"2017-09-18T06:00:38","y":58},{"x":"2020-04-06T07:43:08","y":60},{"x":"2021-03-17T02:40:08","y":73},{"x":"2021-03-29T10:46:43","y":53},{"x":"2021-04-05T04:54:01","y":94},{"x":"2022-04-18T08:37:55","y":78},{"x":"2015-07-04T10:14:44","y":64},{"x":"2015-09-24T01:19:26","y":55},{"x":"2015-12-03T11:35:06","y":50},{"x":"2016-09-14T12:25:16","y":62},{"x":"2016-12-07T06:46:18","y":88},{"x":"2017-06-17T06:02:04","y":78},{"x":"2019-04-07T07:57:56","y":69},{"x":"2019-11-06T01:40:00","y":77},{"x":"2020-05-26T03:16:51","y":69},{"x":"2020-08-06T12:46:54","y":39},{"x":"2020-11-24T02:45:59","y":66},{"x":"2021-10-09T04:39:29","y":64},{"x":"2014-01-05T07:25:11","y":48},{"x":"2015-05-15T02:13:43","y":58},{"x":"2016-11-22T06:37:14","y":78},{"x":"2017-02-08T07:07:28","y":128},{"x":"2017-10-19T11:31:49","y":68},{"x":"2018-07-25T04:00:21","y":57},{"x":"2018-12-19T06:16:31","y":60},{"x":"2019-03-24T12:21:54","y":78},{"x":"2019-09-23T07:19:05","y":43},{"x":"2020-06-21T01:06:27","y":95},{"x":"2021-08-21T08:17:57","y":44},{"x":"2022-08-15T11:46:10","y":70},{"x":"2015-01-08T05:44:31","y":null},{"x":"2017-07-01T01:23:45","y":null},{"x":"2017-11-28T08:35:01","y":null},{"x":"2017-12-11T01:34:19","y":null},{"x":"2019-05-11T05:47:31","y":null},{"x":"2019-06-30T08:51:13","y":null},{"x":"2019-07-24T02:10:03","y":null},{"x":"2020-03-28T08:37:44","y":null},{"x":"2020-08-31T09:14:24","y":null},{"x":"2022-02-05T08:56:26","y":null},{"x":"2022-07-11T06:38:00","y":74},{"x":"2022-08-17T04:26:32","y":65}];

                datasets.push({
                    label: `Dataset ${patient.medTests[i].testName}`,
                    // data: iterData,
                    data: [...patient.medTests[i].listRecords.filter(a => a.score>=filterMenuAttr.minThreshold[i] && a.score<=filterMenuAttr.maxThreshold[i] ).map(a => a.score)],
                    // [...patient.medTests[i].listRecords
                    // .filter(a => !recordsFilter.includes(a.record)
                    //     // a.score>=filterMenuAttr.minThreshold[i] && a.score<=filterMenuAttr.maxThreshold[i] 
                    //     )
                    // .map((a,indx) => {x:indx ; y:a.score})], 
                    borderColor: `rgb(${(i + 3) * 700 % 255}, ${(i + 1) * 200 % 255}, ${(i + 1) * 400 % 255})`,
                    backgroundColor: `rgba(${(i + 3) * 700 % 255}, ${(i + 1) * 200 % 255}, ${(i + 1) * 400 % 255}, 0.5)`,
                })
            }

            // for (let testIndx = 0; testIndx<20; testIndx++){datasets[2].data[testIndx].y=0;} // datasets[0].data[0] = {x: '1990-01-01T00:42:42',y:-1 }; //datasets[0].data[0].y= -1; // datasets[1].data[0].x= '1990-01-01T00:42:42'; // datasets[3].data[20].x= '1980-01-01T00:42:42'; // datasets[3].data.sort((a,b) => new Date(a.x).getTime() - new Date(b.x).getTime())
            // datasets.push({ label: `Dataset Test`,
            //     data: {  datasets : [{x: '1970-01-01T00:42:42', y: 20}, {x: '1960-01-01T00:42:42', y: null}, {x: '2022-01-01T00:42:42', y: 10}], labels: ['1980-01-01T00:42:42', '2000-01-01T00:42:42', '1990-01-01T00:42:42'] } , borderColor: `rgb(0, 0,0)`, backgroundColor: `rgba(0,0,0, 0.5)`,  })
            // datasets[2].data[5].y= 0;

            const data = { labels, datasets: datasets };            
            final.push(<li key={patient.name}> <Line options={options} data={data}></Line></li>);
        }
    }

    return (<>
        <ul className='no-bullets' >{final}</ul>
    </>);
}
)

export default LineChart;
