import _ from 'lodash';

export function isArrayEqual(x?: Array<any>, y?: Array<any>) {
  return _(x).xorWith(y, _.isEqual).isEmpty();
}