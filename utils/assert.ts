import ldIsFunction from 'lodash/isFunction';
import ldIsArray from 'lodash/isArray';
import React from 'react';

const isRef = <T = Element>(target: any): target is React.RefObject<T> => target?.hasOwnProperty('current');

const isArray = ldIsArray;

const isFunction = ldIsFunction;

function isJSONResponse(res: Response): boolean {
  for (const header in res.headers) {
    const value = res.headers.get(header) || '';
    if (header.toLowerCase() === 'content-type' && value.toLowerCase().includes('application/json')) {
      return true;
    }
  }

  return false;
}

function isEmpty(value: string | undefined | null): boolean {
  return value == null || value === '';
}

export const AssertUtils = { isRef, isArray, isFunction, isJSONResponse, isEmpty };
