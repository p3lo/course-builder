import { FullCourse } from '../types';
import _ from 'lodash';

export const sumPrice = (course: FullCourse[]) => {
  let prices: number[] = [];
  course.map((item) => {
    if (item.discount_price > 0) {
      prices.push(item.discount_price);
    } else {
      prices.push(item.price);
    }
  });
  return _.sum(prices);
};

export const arrContains = (enrolled: any[], id: number) => {
  return _.some(enrolled, { course: id });
};
