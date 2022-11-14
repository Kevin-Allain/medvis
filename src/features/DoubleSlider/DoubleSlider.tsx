import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import '../../Styles/DoubleSlider.css'

import {
  decrement, increment, incrementByAmount,
  selectDoubleSlider,
  changeMaxEdge, changeMinEdge, 
  changeMaxThreshold, changeMinThreshold
} from './DoubleSliderSlice';

import {
  selectFilterMenu,
  incrementByAmountMenu,
  changeMaxEdgeMenu, changeMinEdgeMenu, 
  changeMaxThresholdMenu, changeMinThresholdMenu,
  MenuSlice
} from '../FilterMenu/FilterMenuSlice';

const Input = styled.input` border-radius: 6px; min: '0' max: '100' -webkit-appearance: none; -moz-appearance: none; `;

interface Props {
  step?: number,
  valueName:'voluptate' | 'aliquip' | 'consectetur' | 'laboris'
}

const DoubleSlider: React.FC<Props> = (props) => {
  const [doubleSliderStep, setDoubleSliderStep] = useState( (props.step)?props.step:1 );
  const dispatch = useAppDispatch();

  const filterMenuAttr = useAppSelector(selectFilterMenu);
  const valueName = props.valueName;

  const indexName = filterMenuAttr.valueName.indexOf(valueName);

  return (
    <>
      <div className="wrapper">
          minEdge: {filterMenuAttr.minEdge[indexName]} | maxEdge: {filterMenuAttr.maxEdge[indexName]} <br/>
        <div className = "attrIndic">{valueName}</div>
        <br/>
        <div className="slider">
          <div className="progress"></div>
        </div>
        <div className="range-input">
          <Input type="range" 
            className="range-min" min={String(filterMenuAttr.minEdge[indexName])} max={String(filterMenuAttr.maxEdge[indexName])} step={String(doubleSliderStep)}
            value={filterMenuAttr.minThreshold[indexName]}
            data-testid={'min_range_test_'+valueName}
            onChange={e => 
              dispatch(changeMinThresholdMenu(
                {
                  valueName: (valueName) ? valueName : '',
                  value: parseInt(e.target.value), //[parseInt(e.target.value), (valueName)?valueName:''] 
                }), )
            }
          />
          <Input type="range" className="range-max" 
            min={String(filterMenuAttr.minEdge[indexName])} max={String(filterMenuAttr.maxEdge[indexName])} step={String(doubleSliderStep)}
            value={filterMenuAttr.maxThreshold[indexName]}
            data-testid={'max_range_test_'+valueName}
            onChange={e => 
              dispatch(changeMaxThresholdMenu({
                valueName: (valueName) ? valueName : '',
                value: parseInt(e.target.value), //[parseInt(e.target.value), (valueName)?valueName:''] 
              }),)
            }
          />
        </div>
        <br/>
        <div className="communicateSlider">
          The double slider selection is {filterMenuAttr.minThreshold[indexName]} and {filterMenuAttr.maxThreshold[indexName]}.
        </div>

      </div>
    </>
  );

}

export default DoubleSlider;