import { AssertUtils } from 'utils/assert';
import { resolveResponse } from 'utils/response';
import config from './config';

const ACCOUNT_URL = config.BASE_URL + '/account';

const get = async (address: string | null | undefined) => {
  if (AssertUtils.isEmpty(address)) {
    return;
  }
  try {
    const res = await fetch(ACCOUNT_URL + `?addr=${address}`);
    return resolveResponse(res);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const AccountApis = { get };
