__MOCK.CLEAR = (key) => eval(`"use strict"; ${key} = __MOCK.CACHE[key];`)

__MOCK.MOCK = (key, mock) => {
  if (key === 'default') key = __MOCK.DEFAULT

  if (!globalThis.__MOCK_internal_isVarName(key))
    throw new Error(`'${key}' key is not a valid JS token`)
  if (!key || !mock) throw new Error(`New key or mock for '${key}' is invalid`)
  if (!(key in __MOCK.CACHE))
    throw new Error(`'${key}' key does not exist in module`)

  eval(`"use strict"; ${key} = mock;`)

  return () => __MOCK.CLEAR(key)
}

__MOCK.MOCK.CLEAR = () => Object.keys(__MOCK.CACHE).forEach(__MOCK.CLEAR)

export const _MOCK = __MOCK.MOCK
