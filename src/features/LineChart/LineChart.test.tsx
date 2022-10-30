import {describe, expect, test} from '@jest/globals';
import { sumTest } from "./LineChart";
// const LineChart = require ('./LineChart');

test('Ensuring sum works and set up for testing as well', () => {
    expect( sumTest(1,2) ).toBe(3)
})