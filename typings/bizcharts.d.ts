declare namespace bizcharts {
  export type tooltipData = [string, (...args: any[]) => {
    name?: string | undefined;
    value: string;
  }]

  export type LegendItem = {
    color?: string;
    checked?: boolean;
    x?: number;
    y?: number;
    percent: number;
    item: Array<any>;
    name?: string;
    value?: string;
  }

  export namespace Guide {
    export interface ArcProps {
      zIndex?: number;
    }
  }
}