import './react-CMmQoc10.js';
import { c as get, l as set, o as appendErrors } from './index.esm-BEBQmgfJ.js';
import { gi as $ZodError, hi as parseAsync, mi as parse } from './core-DWany0j2.js';

//#region node_modules/@hookform/resolvers/dist/resolvers.mjs
var r = (t$1, r$1, o$1) => {
    if (t$1 && 'reportValidity' in t$1) {
      const s$2 = get(o$1, r$1);
      (t$1.setCustomValidity((s$2 && s$2.message) || ''), t$1.reportValidity());
    }
  },
  o = (e, t$1) => {
    for (const o$1 in t$1.fields) {
      const s$2 = t$1.fields[o$1];
      s$2 && s$2.ref && 'reportValidity' in s$2.ref
        ? r(s$2.ref, o$1, e)
        : s$2 && s$2.refs && s$2.refs.forEach((t$2) => r(t$2, o$1, e));
    }
  },
  s = (r$1, s$2) => {
    s$2.shouldUseNativeValidation && o(r$1, s$2);
    const n$1 = {};
    for (const o$1 in r$1) {
      const f = get(s$2.fields, o$1),
        c = Object.assign(r$1[o$1] || {}, { ref: f && f.ref });
      if (i$1(s$2.names || Object.keys(r$1), o$1)) {
        const r$2 = Object.assign({}, get(n$1, o$1));
        (set(r$2, 'root', c), set(n$1, o$1, r$2));
      } else set(n$1, o$1, c);
    }
    return n$1;
  },
  i$1 = (e, t$1) => {
    const r$1 = n(t$1);
    return e.some((e$1) => n(e$1).match(`^${r$1}\\.\\d+`));
  };
function n(e) {
  return e.replace(/\]|\[/g, '');
}

//#endregion
//#region node_modules/@hookform/resolvers/zod/dist/zod.mjs
function t(r$1, e) {
  try {
    var o$1 = r$1();
  } catch (r$2) {
    return e(r$2);
  }
  return o$1 && o$1.then ? o$1.then(void 0, e) : o$1;
}
function s$1(r$1, e) {
  for (var n$1 = {}; r$1.length; ) {
    var t$1 = r$1[0],
      s$2 = t$1.code,
      i$2 = t$1.message,
      a$1 = t$1.path.join('.');
    if (!n$1[a$1])
      if ('unionErrors' in t$1) {
        var u = t$1.unionErrors[0].errors[0];
        n$1[a$1] = {
          message: u.message,
          type: u.code,
        };
      } else
        n$1[a$1] = {
          message: i$2,
          type: s$2,
        };
    if (
      ('unionErrors' in t$1 &&
        t$1.unionErrors.forEach(function (e$1) {
          return e$1.errors.forEach(function (e$2) {
            return r$1.push(e$2);
          });
        }),
      e)
    ) {
      var c = n$1[a$1].types,
        f = c && c[t$1.code];
      n$1[a$1] = appendErrors(a$1, e, n$1, s$2, f ? [].concat(f, t$1.message) : t$1.message);
    }
    r$1.shift();
  }
  return n$1;
}
function i(r$1, e) {
  for (var n$1 = {}; r$1.length; ) {
    var t$1 = r$1[0],
      s$2 = t$1.code,
      i$2 = t$1.message,
      a$1 = t$1.path.join('.');
    if (!n$1[a$1])
      if ('invalid_union' === t$1.code && t$1.errors.length > 0) {
        var u = t$1.errors[0][0];
        n$1[a$1] = {
          message: u.message,
          type: u.code,
        };
      } else
        n$1[a$1] = {
          message: i$2,
          type: s$2,
        };
    if (
      ('invalid_union' === t$1.code &&
        t$1.errors.forEach(function (e$1) {
          return e$1.forEach(function (e$2) {
            return r$1.push(e$2);
          });
        }),
      e)
    ) {
      var c = n$1[a$1].types,
        f = c && c[t$1.code];
      n$1[a$1] = appendErrors(a$1, e, n$1, s$2, f ? [].concat(f, t$1.message) : t$1.message);
    }
    r$1.shift();
  }
  return n$1;
}
function a(o$1, a$1, u) {
  if (
    (void 0 === u && (u = {}),
    (function (r$1) {
      return '_def' in r$1 && 'object' == typeof r$1._def && 'typeName' in r$1._def;
    })(o$1))
  )
    return function (n$1, i$2, c) {
      try {
        return Promise.resolve(
          t(
            function () {
              return Promise.resolve(
                o$1['sync' === u.mode ? 'parse' : 'parseAsync'](n$1, a$1)
              ).then(function (e) {
                return (
                  c.shouldUseNativeValidation && o({}, c),
                  {
                    errors: {},
                    values: u.raw ? Object.assign({}, n$1) : e,
                  }
                );
              });
            },
            function (r$1) {
              if (
                (function (r$2) {
                  return Array.isArray(null == r$2 ? void 0 : r$2.issues);
                })(r$1)
              )
                return {
                  values: {},
                  errors: s(
                    s$1(r$1.errors, !c.shouldUseNativeValidation && 'all' === c.criteriaMode),
                    c
                  ),
                };
              throw r$1;
            }
          )
        );
      } catch (r$1) {
        return Promise.reject(r$1);
      }
    };
  if (
    (function (r$1) {
      return '_zod' in r$1 && 'object' == typeof r$1._zod;
    })(o$1)
  )
    return function (s$2, c, f) {
      try {
        return Promise.resolve(
          t(
            function () {
              return Promise.resolve(('sync' === u.mode ? parse : parseAsync)(o$1, s$2, a$1)).then(
                function (e) {
                  return (
                    f.shouldUseNativeValidation && o({}, f),
                    {
                      errors: {},
                      values: u.raw ? Object.assign({}, s$2) : e,
                    }
                  );
                }
              );
            },
            function (r$1) {
              if (
                (function (r$2) {
                  return r$2 instanceof $ZodError;
                })(r$1)
              )
                return {
                  values: {},
                  errors: s(
                    i(r$1.issues, !f.shouldUseNativeValidation && 'all' === f.criteriaMode),
                    f
                  ),
                };
              throw r$1;
            }
          )
        );
      } catch (r$1) {
        return Promise.reject(r$1);
      }
    };
  throw new Error('Invalid input: not a Zod schema');
}

//#endregion
export { a as zodResolver };
//# sourceMappingURL=@hookform_resolvers_zod.js.map
