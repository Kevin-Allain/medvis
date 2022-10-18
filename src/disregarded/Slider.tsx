import react, { Component, useState } from 'react';
import React from 'react';
import styled from 'styled-components';

interface Props {
  value:number,
  max:number,
  onChange: (e:any) => void
}

const Slider: React.FC<Props> = (props) => {
  
  console.log("Slider: ",props);
  
  const SliderStyled = styled.input.attrs({
    type: 'range',
    min: '0',
    max: props.max,
    // value: props.value
  })`
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: 0;
  height: 12px;
  width: 60%;
  border-radius: 160px;
  background: ${(props) =>
      `linear-gradient(to right, #fff 0%, #fff ${props.value}%, #fff ${props.value}%, #fff 100%);`}; // TODO if there is time: fix this css... the two values on the left used to be ff9800
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    background-image: radial-gradient(circle, #f7f7fc 40%, #ff9800 45%);
    border-radius: 50%;
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.5);
  }
  
  ::-moz-range-thumb {
    width: 24px;
    height: 24px;
    -moz-appearance: none;
    background-image: radial-gradient(circle, #f7f7fc 40%, #ff9800 45%);
    border-radius: 50%;
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.5);
  }
  `;
  

  return(
    <>
      <div>yo</div>
      <SliderStyled/>
    </>
    );
}

// const [value, setValue] = useState(50);
// return <Slider value={value} onChange={e => setValue(e.target.value)} /> 
export default Slider;