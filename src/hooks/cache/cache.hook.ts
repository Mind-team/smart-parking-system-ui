let _cache: Record<string, any> = {};

const runCache = <ReturnCallbackValue>(
  key: string,
  cb: () => ReturnCallbackValue,
): ReturnCallbackValue => {
  if (_cache[key]) {
    return _cache[key];
  }
  _cache[key] = cb();
  return _cache[key];
};

const clearCache = (key?: string | ""): void => {
  if (key && key !== "") {
    _cache[key] = null;
    return;
  }
  _cache = {};
};

export const useCache = () => {
  return { runCache, clearCache };
};
