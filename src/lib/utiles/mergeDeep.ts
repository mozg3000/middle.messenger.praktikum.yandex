export function mergeDeep(lhs: Indexed, rhs: Indexed): Indexed { // eslint-disable-line no-undef
  for (let p in rhs) {
    if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
      continue
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = mergeDeep(lhs[p] as Indexed, rhs[p] as Indexed) // eslint-disable-line no-undef
      } else {
        lhs[p] = rhs[p]
      }
    } catch (e) {
      lhs[p] = rhs[p]
    }
  }

  return lhs
}
