import { Legacy, Splish, RowsPlugin } from './splishToEdtr';
export declare function convert(content: Legacy | Splish): RowsPlugin;
export declare function convertLegacyToSplish(content: Legacy, id: string): Splish;
export declare function convertSplishToEdtrIO(content: Splish): RowsPlugin;
export { OtherPlugin, LayoutPlugin, RowsPlugin, Edtr, Legacy, Splish, isSplish, isEdtr, } from './splishToEdtr';
//# sourceMappingURL=index.d.ts.map