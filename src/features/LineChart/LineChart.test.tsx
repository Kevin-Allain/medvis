import {describe, expect, test} from '@jest/globals';
import { sumTest } from "./LineChart";
// const LineChart = require ('./LineChart');

/**
 * About the set up: we followed the approach suggested for webpacks to ignore certain files, e.g. css
 * More can be read here https://jestjs.io/docs/webpack
 */

test('Ensuring sum works and set up for testing as well', () => {
    expect( sumTest(1,2) ).toBe(3)
})