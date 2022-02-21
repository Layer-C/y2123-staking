import { resolveResponse } from 'utils/response';
import config from './config';

const CLAIM_URL = config.BASE_URL + '/claim';

const claim = async (address: string, donate: string) => {
  try {
    const donateAmount = Math.floor(Number(donate));
    const res = await fetch(CLAIM_URL + `?addr=${address}&donate=${donateAmount}`);
    return resolveResponse(res);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const ClaimApis = { claim };
