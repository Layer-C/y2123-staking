import { AssertUtils } from '.';

export const resolveResponse = async (res: Response) => {
  const text = await res.text();
  const responseData = !AssertUtils.isEmpty(text) && AssertUtils.isJSONResponse(res) ? JSON.parse(text) : text;
  return res.ok ? responseData : Promise.reject(responseData);
};
