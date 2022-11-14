import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import DoubleSlider from '../DoubleSlider/DoubleSlider';
import { selectFilterMenu } from './FilterMenuSlice';

const FilterMenu: React.FC = () => {
    const filterMenuAttr = useAppSelector(selectFilterMenu);
    const medTests = filterMenuAttr.patients[0].medTests.map(m => m.testName);

    let final = [];
    for (let i in medTests){
        let str = medTests[i];
        if (str==='aliquip'||str==='consectetur'||str==='laboris'||str==='voluptate'){
            final.push(<DoubleSlider key={str} valueName={str} ></DoubleSlider>)
        }
    }

    return (
        <>
            {final}
        </>
    );
}


export default FilterMenu;