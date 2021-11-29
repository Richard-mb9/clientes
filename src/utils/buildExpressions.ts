/* eslint-disable consistent-return */
import { IListCustomerDTO } from '../repository/ICustomersRepository';

// eslint-disable-next-line import/prefer-default-export
export const buildExpressionsList = (params: IListCustomerDTO) => {
  const keys = Object.keys(params);
  if (!keys.length) return;
  const ExpressionAttributeNames:{[string:string]:string | number} = {};
  const ExpressionAttributeValues:{[string:string]:string | number} = {};
  let FilterExpression = '';
  keys.forEach((key) => {
    ExpressionAttributeNames[`#${key}`] = key;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ExpressionAttributeValues[`:${key}`] = params[key];
    if (FilterExpression === '') {
      FilterExpression = `#${key} = :${key}`;
    } else {
      FilterExpression += ` and #${key} = :${key}`;
    }
  });
  return {
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    FilterExpression,
  };
};
