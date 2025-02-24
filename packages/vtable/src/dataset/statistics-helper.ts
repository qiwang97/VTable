import type { SortOrder } from '../ts-types';
import { AggregationType } from '../ts-types';

export abstract class Aggregator {
  className = 'Aggregator';
  isRecord?: boolean = true;
  records?: any[] = [];
  type?: string;
  field?: string | string[];
  formatFun?: any;
  _formatedValue?: any;
  constructor(dimension: string | string[], formatFun?: any, isRecord?: boolean) {
    this.field = dimension;
    this.formatFun = formatFun;
    this.isRecord = isRecord ?? this.isRecord;
  }
  // push(record: any) {
  //   if (this.isRecord) {
  //     if (record.className === 'Aggregator') this.records.push(...record.records);
  //     else this.records.push(record);
  //   }
  // }
  abstract push(record: any): void;
  abstract value(): any;
  formatValue() {
    if (!this._formatedValue) {
      if (this.formatFun) {
        this._formatedValue = this.formatFun(this.value());
      } else {
        this._formatedValue = this.value();
      }
    }
    return this._formatedValue;
  }
  reset() {
    this.records = [];
  }
}
export class RecordAggregator extends Aggregator {
  type: string = AggregationType.RECORD;
  isRecord?: boolean = true;
  push(record: any): void {
    if (this.isRecord) {
      if (record.className === 'Aggregator') {
        this.records.push(...record.records);
      } else {
        this.records.push(record);
      }
    }
  }
  value() {
    return this.records;
  }
  reset() {
    this.records = [];
  }
}
export class SumAggregator extends Aggregator {
  type: string = AggregationType.SUM;
  sum = 0;
  declare field?: string;
  push(record: any): void {
    if (this.isRecord) {
      if (record.className === 'Aggregator') {
        this.records.push(...record.records);
      } else {
        this.records.push(record);
      }
    }
    if (record.className === 'Aggregator') {
      this.sum += record.value();
    } else if (!isNaN(parseFloat(record[this.field]))) {
      this.sum += parseFloat(record[this.field]);
    }
  }
  value() {
    return this.sum;
  }
  reset() {
    this.records = [];
    this.sum = 0;
  }
}

export class CountAggregator extends Aggregator {
  type: string = AggregationType.COUNT;
  count = 0;
  declare field?: string;
  push(record: any): void {
    if (this.isRecord) {
      if (record.className === 'Aggregator') {
        this.records.push(...record.records);
      } else {
        this.records.push(record);
      }
    }
    if (record.className === 'Aggregator') {
      this.count += record.value();
    } else {
      this.count++;
    }
  }
  value() {
    return this.count;
  }
  reset() {
    this.records = [];
    this.count = 0;
  }
}
export class AvgAggregator extends Aggregator {
  type: string = AggregationType.AVG;
  sum = 0;
  count = 0;
  declare field?: string;
  push(record: any): void {
    if (this.isRecord) {
      if (record.className === 'Aggregator') {
        this.records.push(...record.records);
      } else {
        this.records.push(record);
      }
    }
    if (record.className === 'Aggregator' && record.type === AggregationType.AVG) {
      this.sum += record.sum;
      this.count += record.count;
    } else if (!isNaN(parseFloat(record[this.field]))) {
      this.sum += parseFloat(record[this.field]);
      this.count++;
    }
  }
  value() {
    return this.sum / this.count;
  }
  reset() {
    this.records = [];
    this.sum = 0;
    this.count = 0;
  }
}
export class MaxAggregator extends Aggregator {
  type: string = AggregationType.MAX;
  max: number = Number.MIN_SAFE_INTEGER;
  declare field?: string;
  push(record: any): void {
    if (this.isRecord) {
      if (record.className === 'Aggregator') {
        this.records.push(...record.records);
      } else {
        this.records.push(record);
      }
    }
    if (record.className === 'Aggregator') {
      this.max = record.max > this.max ? record.max : this.max;
    } else if (typeof record === 'number') {
      this.max = record > this.max ? record : this.max;
    } else if (typeof record[this.field] === 'number') {
      this.max = record[this.field] > this.max ? record[this.field] : this.max;
    } else if (!isNaN(record[this.field])) {
      this.max = parseFloat(record[this.field]) > this.max ? parseFloat(record[this.field]) : this.max;
    }
  }
  value() {
    return this.max;
  }
  reset() {
    this.records = [];
    this.max = Number.MIN_SAFE_INTEGER;
  }
}
export class MinAggregator extends Aggregator {
  type: string = AggregationType.MIN;
  min: number = Number.MAX_SAFE_INTEGER;
  isRecord?: boolean = false;
  declare field?: string;
  push(record: any): void {
    if (this.isRecord) {
      if (record.className === 'Aggregator') {
        this.records.push(...record.records);
      } else {
        this.records.push(record);
      }
    }
    if (record.className === 'Aggregator') {
      this.min = record.min < this.min ? record.min : this.min;
    } else if (typeof record === 'number') {
      this.min = record < this.min ? record : this.min;
    } else if (typeof record[this.field] === 'number') {
      this.min = record[this.field] < this.min ? record[this.field] : this.min;
    }
  }
  value() {
    return this.min;
  }
  reset() {
    this.records = [];
    this.min = Number.MAX_SAFE_INTEGER;
  }
}
export function indicatorSort(a: any, b: any) {
  if (a && b) {
    // 数据健全兼容，用户数据不全时，能够展示.
    return a.toString().localeCompare(b.toString(), 'zh');
  }
  if (a) {
    return 1;
  }
  return -1;
}
export function typeSort(a: any, b: any) {
  if (a && b) {
    // 数据健全兼容，用户数据不全时，能够展示.
    return a.toString().localeCompare(b.toString(), 'zh');
  }
  if (a) {
    return 1;
  }
  return -1;
}
export function naturalSort(as: any, bs: any) {
  const rx = /(\d+)|(\D+)/g;
  const rd = /\d/;
  const rz = /^0/;
  let a;
  let a1;
  let b;
  let b1;
  let nas = 0;
  let nbs = 0;
  if (bs !== null && as === null) {
    return -1;
  }
  if (as !== null && bs === null) {
    return 1;
  }
  if (typeof as === 'number' && isNaN(as)) {
    return -1;
  }
  if (typeof bs === 'number' && isNaN(bs)) {
    return 1;
  }
  nas = +as;
  nbs = +bs;
  if (nas < nbs) {
    return -1;
  }
  if (nas > nbs) {
    return 1;
  }
  if (typeof as === 'number' && typeof bs !== 'number') {
    return -1;
  }
  if (typeof bs === 'number' && typeof as !== 'number') {
    return 1;
  }
  if (typeof as === 'number' && typeof bs === 'number') {
    return 0;
  }
  if (isNaN(nbs) && !isNaN(nas)) {
    return -1;
  }
  if (isNaN(nas) && !isNaN(nbs)) {
    return 1;
  }
  a = String(as);
  b = String(bs);
  if (a === b) {
    return 0;
  }
  if (!(rd.test(a) && rd.test(b))) {
    return a > b ? 1 : -1;
  }
  a = a.match(rx);
  b = b.match(rx);
  while (a.length && b.length) {
    a1 = a.shift();
    b1 = b.shift();
    if (a1 !== b1) {
      if (rd.test(a1) && rd.test(b1)) {
        return <any>a1.replace(rz, '.0') - <any>b1.replace(rz, '.0');
      }
      return a1 > b1 ? 1 : -1;
    }
  }
  return a.length - b.length;
}
export function sortBy(order: string[]) {
  let x;
  let i;
  const mapping = {};
  const lowercase_mapping = {};
  // for (i in order) {
  for (let i = 0; i < order.length; i++) {
    x = order[i];
    mapping[x] = i;
    if (typeof x === 'string') {
      lowercase_mapping[x.toLowerCase()] = i;
    }
  }
  return function (a: any, b: any) {
    if (mapping[a] !== null && mapping[a] !== undefined && mapping[b] !== null && mapping[b] !== undefined) {
      return mapping[a] - mapping[b];
    } else if (mapping[a] !== null && mapping[a] !== undefined) {
      return -1;
    } else if (mapping[b] !== null && mapping[b] !== undefined) {
      return 1;
    } else if (
      lowercase_mapping[a] !== null &&
      mapping[a] !== undefined &&
      lowercase_mapping[b] !== null &&
      mapping[b] !== undefined
    ) {
      return lowercase_mapping[a] - lowercase_mapping[b];
    } else if (
      lowercase_mapping[a] === null ||
      mapping[a] === undefined ||
      lowercase_mapping[b] === null ||
      mapping[b] === undefined
    ) {
      return 0;
    } else if (lowercase_mapping[a] !== null && mapping[a] !== undefined) {
      return -1;
    } else if (lowercase_mapping[b] !== null && mapping[b] !== undefined) {
      return 1;
    }
    return naturalSort(a, b);
  };
}
