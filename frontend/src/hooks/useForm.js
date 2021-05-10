import { useEffect, useState } from 'react'

export function useForm(initialState, cb = function () {}) {
  const [fields, setFields] = useState(initialState)

  useEffect(() => {
    cb(fields)
  }, [fields])

  return [
    fields,
    function ({ target }) {
      const field = target.name
      const value = target.value
      setFields({ ...fields, [field]: value })
    },
    setFields,
  ]
}

function isNumeric(str) {
  if (typeof str != 'string') return false // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ) // ...and ensure strings of whitespace fail
}
