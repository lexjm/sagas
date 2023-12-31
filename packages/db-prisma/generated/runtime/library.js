'use strict'
var Ua = Object.create
var Wt = Object.defineProperty
var Qa = Object.getOwnPropertyDescriptor
var Ja = Object.getOwnPropertyNames
var Ga = Object.getPrototypeOf,
  Wa = Object.prototype.hasOwnProperty
var L = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
  bt = (e, t) => {
    for (var r in t) Wt(e, r, { get: t[r], enumerable: !0 })
  },
  mi = (e, t, r, n) => {
    if ((t && typeof t == 'object') || typeof t == 'function')
      for (let i of Ja(t))
        !Wa.call(e, i) &&
          i !== r &&
          Wt(e, i, {
            get: () => t[i],
            enumerable: !(n = Qa(t, i)) || n.enumerable,
          })
    return e
  }
var A = (e, t, r) => (
    (r = e != null ? Ua(Ga(e)) : {}),
    mi(
      t || !e || !e.__esModule
        ? Wt(r, 'default', { value: e, enumerable: !0 })
        : r,
      e,
    )
  ),
  Ha = (e) => mi(Wt({}, '__esModule', { value: !0 }), e)
var Pi = L((cm, Ei) => {
  var Ye = 1e3,
    Ze = Ye * 60,
    Xe = Ze * 60,
    Ue = Xe * 24,
    za = Ue * 7,
    Ya = Ue * 365.25
  Ei.exports = function (e, t) {
    t = t || {}
    var r = typeof e
    if (r === 'string' && e.length > 0) return Za(e)
    if (r === 'number' && isFinite(e)) return t.long ? el(e) : Xa(e)
    throw new Error(
      'val is not a non-empty string or a valid number. val=' +
        JSON.stringify(e),
    )
  }
  function Za(e) {
    if (((e = String(e)), !(e.length > 100))) {
      var t =
        /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          e,
        )
      if (!!t) {
        var r = parseFloat(t[1]),
          n = (t[2] || 'ms').toLowerCase()
        switch (n) {
          case 'years':
          case 'year':
          case 'yrs':
          case 'yr':
          case 'y':
            return r * Ya
          case 'weeks':
          case 'week':
          case 'w':
            return r * za
          case 'days':
          case 'day':
          case 'd':
            return r * Ue
          case 'hours':
          case 'hour':
          case 'hrs':
          case 'hr':
          case 'h':
            return r * Xe
          case 'minutes':
          case 'minute':
          case 'mins':
          case 'min':
          case 'm':
            return r * Ze
          case 'seconds':
          case 'second':
          case 'secs':
          case 'sec':
          case 's':
            return r * Ye
          case 'milliseconds':
          case 'millisecond':
          case 'msecs':
          case 'msec':
          case 'ms':
            return r
          default:
            return
        }
      }
    }
  }
  function Xa(e) {
    var t = Math.abs(e)
    return t >= Ue
      ? Math.round(e / Ue) + 'd'
      : t >= Xe
      ? Math.round(e / Xe) + 'h'
      : t >= Ze
      ? Math.round(e / Ze) + 'm'
      : t >= Ye
      ? Math.round(e / Ye) + 's'
      : e + 'ms'
  }
  function el(e) {
    var t = Math.abs(e)
    return t >= Ue
      ? Zt(e, t, Ue, 'day')
      : t >= Xe
      ? Zt(e, t, Xe, 'hour')
      : t >= Ze
      ? Zt(e, t, Ze, 'minute')
      : t >= Ye
      ? Zt(e, t, Ye, 'second')
      : e + ' ms'
  }
  function Zt(e, t, r, n) {
    var i = t >= r * 1.5
    return Math.round(e / r) + ' ' + n + (i ? 's' : '')
  }
})
var tn = L((pm, Ti) => {
  function tl(e) {
    ;(r.debug = r),
      (r.default = r),
      (r.coerce = l),
      (r.disable = o),
      (r.enable = i),
      (r.enabled = s),
      (r.humanize = Pi()),
      (r.destroy = u),
      Object.keys(e).forEach((c) => {
        r[c] = e[c]
      }),
      (r.names = []),
      (r.skips = []),
      (r.formatters = {})
    function t(c) {
      let p = 0
      for (let m = 0; m < c.length; m++)
        (p = (p << 5) - p + c.charCodeAt(m)), (p |= 0)
      return r.colors[Math.abs(p) % r.colors.length]
    }
    r.selectColor = t
    function r(c) {
      let p,
        m = null,
        g,
        y
      function f(...b) {
        if (!f.enabled) return
        let P = f,
          v = Number(new Date()),
          x = v - (p || v)
        ;(P.diff = x),
          (P.prev = p),
          (P.curr = v),
          (p = v),
          (b[0] = r.coerce(b[0])),
          typeof b[0] != 'string' && b.unshift('%O')
        let M = 0
        ;(b[0] = b[0].replace(/%([a-zA-Z%])/g, (B, Ke) => {
          if (B === '%%') return '%'
          M++
          let I = r.formatters[Ke]
          if (typeof I == 'function') {
            let J = b[M]
            ;(B = I.call(P, J)), b.splice(M, 1), M--
          }
          return B
        })),
          r.formatArgs.call(P, b),
          (P.log || r.log).apply(P, b)
      }
      return (
        (f.namespace = c),
        (f.useColors = r.useColors()),
        (f.color = r.selectColor(c)),
        (f.extend = n),
        (f.destroy = r.destroy),
        Object.defineProperty(f, 'enabled', {
          enumerable: !0,
          configurable: !1,
          get: () =>
            m !== null
              ? m
              : (g !== r.namespaces && ((g = r.namespaces), (y = r.enabled(c))),
                y),
          set: (b) => {
            m = b
          },
        }),
        typeof r.init == 'function' && r.init(f),
        f
      )
    }
    function n(c, p) {
      let m = r(this.namespace + (typeof p > 'u' ? ':' : p) + c)
      return (m.log = this.log), m
    }
    function i(c) {
      r.save(c), (r.namespaces = c), (r.names = []), (r.skips = [])
      let p,
        m = (typeof c == 'string' ? c : '').split(/[\s,]+/),
        g = m.length
      for (p = 0; p < g; p++)
        !m[p] ||
          ((c = m[p].replace(/\*/g, '.*?')),
          c[0] === '-'
            ? r.skips.push(new RegExp('^' + c.slice(1) + '$'))
            : r.names.push(new RegExp('^' + c + '$')))
    }
    function o() {
      let c = [...r.names.map(a), ...r.skips.map(a).map((p) => '-' + p)].join(
        ',',
      )
      return r.enable(''), c
    }
    function s(c) {
      if (c[c.length - 1] === '*') return !0
      let p, m
      for (p = 0, m = r.skips.length; p < m; p++)
        if (r.skips[p].test(c)) return !1
      for (p = 0, m = r.names.length; p < m; p++)
        if (r.names[p].test(c)) return !0
      return !1
    }
    function a(c) {
      return c
        .toString()
        .substring(2, c.toString().length - 2)
        .replace(/\.\*\?$/, '*')
    }
    function l(c) {
      return c instanceof Error ? c.stack || c.message : c
    }
    function u() {
      console.warn(
        'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.',
      )
    }
    return r.enable(r.load()), r
  }
  Ti.exports = tl
})
var vi = L((oe, Xt) => {
  oe.formatArgs = nl
  oe.save = il
  oe.load = ol
  oe.useColors = rl
  oe.storage = sl()
  oe.destroy = (() => {
    let e = !1
    return () => {
      e ||
        ((e = !0),
        console.warn(
          'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.',
        ))
    }
  })()
  oe.colors = [
    '#0000CC',
    '#0000FF',
    '#0033CC',
    '#0033FF',
    '#0066CC',
    '#0066FF',
    '#0099CC',
    '#0099FF',
    '#00CC00',
    '#00CC33',
    '#00CC66',
    '#00CC99',
    '#00CCCC',
    '#00CCFF',
    '#3300CC',
    '#3300FF',
    '#3333CC',
    '#3333FF',
    '#3366CC',
    '#3366FF',
    '#3399CC',
    '#3399FF',
    '#33CC00',
    '#33CC33',
    '#33CC66',
    '#33CC99',
    '#33CCCC',
    '#33CCFF',
    '#6600CC',
    '#6600FF',
    '#6633CC',
    '#6633FF',
    '#66CC00',
    '#66CC33',
    '#9900CC',
    '#9900FF',
    '#9933CC',
    '#9933FF',
    '#99CC00',
    '#99CC33',
    '#CC0000',
    '#CC0033',
    '#CC0066',
    '#CC0099',
    '#CC00CC',
    '#CC00FF',
    '#CC3300',
    '#CC3333',
    '#CC3366',
    '#CC3399',
    '#CC33CC',
    '#CC33FF',
    '#CC6600',
    '#CC6633',
    '#CC9900',
    '#CC9933',
    '#CCCC00',
    '#CCCC33',
    '#FF0000',
    '#FF0033',
    '#FF0066',
    '#FF0099',
    '#FF00CC',
    '#FF00FF',
    '#FF3300',
    '#FF3333',
    '#FF3366',
    '#FF3399',
    '#FF33CC',
    '#FF33FF',
    '#FF6600',
    '#FF6633',
    '#FF9900',
    '#FF9933',
    '#FFCC00',
    '#FFCC33',
  ]
  function rl() {
    return typeof window < 'u' &&
      window.process &&
      (window.process.type === 'renderer' || window.process.__nwjs)
      ? !0
      : typeof navigator < 'u' &&
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
      ? !1
      : (typeof document < 'u' &&
          document.documentElement &&
          document.documentElement.style &&
          document.documentElement.style.WebkitAppearance) ||
        (typeof window < 'u' &&
          window.console &&
          (window.console.firebug ||
            (window.console.exception && window.console.table))) ||
        (typeof navigator < 'u' &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
          parseInt(RegExp.$1, 10) >= 31) ||
        (typeof navigator < 'u' &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
  }
  function nl(e) {
    if (
      ((e[0] =
        (this.useColors ? '%c' : '') +
        this.namespace +
        (this.useColors ? ' %c' : ' ') +
        e[0] +
        (this.useColors ? '%c ' : ' ') +
        '+' +
        Xt.exports.humanize(this.diff)),
      !this.useColors)
    )
      return
    let t = 'color: ' + this.color
    e.splice(1, 0, t, 'color: inherit')
    let r = 0,
      n = 0
    e[0].replace(/%[a-zA-Z%]/g, (i) => {
      i !== '%%' && (r++, i === '%c' && (n = r))
    }),
      e.splice(n, 0, t)
  }
  oe.log = console.debug || console.log || (() => {})
  function il(e) {
    try {
      e ? oe.storage.setItem('debug', e) : oe.storage.removeItem('debug')
    } catch {}
  }
  function ol() {
    let e
    try {
      e = oe.storage.getItem('debug')
    } catch {}
    return (
      !e && typeof process < 'u' && 'env' in process && (e = process.env.DEBUG),
      e
    )
  }
  function sl() {
    try {
      return localStorage
    } catch {}
  }
  Xt.exports = tn()(oe)
  var { formatters: al } = Xt.exports
  al.j = function (e) {
    try {
      return JSON.stringify(e)
    } catch (t) {
      return '[UnexpectedJSONParseError]: ' + t.message
    }
  }
})
var rn = L((mm, Ci) => {
  'use strict'
  Ci.exports = (e, t = process.argv) => {
    let r = e.startsWith('-') ? '' : e.length === 1 ? '-' : '--',
      n = t.indexOf(r + e),
      i = t.indexOf('--')
    return n !== -1 && (i === -1 || n < i)
  }
})
var sn = L((dm, Ai) => {
  'use strict'
  var ll = require('os'),
    Mi = require('tty'),
    ue = rn(),
    { env: q } = process,
    ke
  ue('no-color') || ue('no-colors') || ue('color=false') || ue('color=never')
    ? (ke = 0)
    : (ue('color') || ue('colors') || ue('color=true') || ue('color=always')) &&
      (ke = 1)
  'FORCE_COLOR' in q &&
    (q.FORCE_COLOR === 'true'
      ? (ke = 1)
      : q.FORCE_COLOR === 'false'
      ? (ke = 0)
      : (ke =
          q.FORCE_COLOR.length === 0
            ? 1
            : Math.min(parseInt(q.FORCE_COLOR, 10), 3)))
  function nn(e) {
    return e === 0
      ? !1
      : { level: e, hasBasic: !0, has256: e >= 2, has16m: e >= 3 }
  }
  function on(e, t) {
    if (ke === 0) return 0
    if (ue('color=16m') || ue('color=full') || ue('color=truecolor')) return 3
    if (ue('color=256')) return 2
    if (e && !t && ke === void 0) return 0
    let r = ke || 0
    if (q.TERM === 'dumb') return r
    if (process.platform === 'win32') {
      let n = ll.release().split('.')
      return Number(n[0]) >= 10 && Number(n[2]) >= 10586
        ? Number(n[2]) >= 14931
          ? 3
          : 2
        : 1
    }
    if ('CI' in q)
      return [
        'TRAVIS',
        'CIRCLECI',
        'APPVEYOR',
        'GITLAB_CI',
        'GITHUB_ACTIONS',
        'BUILDKITE',
      ].some((n) => n in q) || q.CI_NAME === 'codeship'
        ? 1
        : r
    if ('TEAMCITY_VERSION' in q)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(q.TEAMCITY_VERSION) ? 1 : 0
    if (q.COLORTERM === 'truecolor') return 3
    if ('TERM_PROGRAM' in q) {
      let n = parseInt((q.TERM_PROGRAM_VERSION || '').split('.')[0], 10)
      switch (q.TERM_PROGRAM) {
        case 'iTerm.app':
          return n >= 3 ? 3 : 2
        case 'Apple_Terminal':
          return 2
      }
    }
    return /-256(color)?$/i.test(q.TERM)
      ? 2
      : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
          q.TERM,
        ) || 'COLORTERM' in q
      ? 1
      : r
  }
  function ul(e) {
    let t = on(e, e && e.isTTY)
    return nn(t)
  }
  Ai.exports = {
    supportsColor: ul,
    stdout: nn(on(!0, Mi.isatty(1))),
    stderr: nn(on(!0, Mi.isatty(2))),
  }
})
var Fi = L((V, tr) => {
  var cl = require('tty'),
    er = require('util')
  V.init = hl
  V.log = fl
  V.formatArgs = ml
  V.save = gl
  V.load = yl
  V.useColors = pl
  V.destroy = er.deprecate(() => {},
  'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.')
  V.colors = [6, 2, 3, 4, 5, 1]
  try {
    let e = sn()
    e &&
      (e.stderr || e).level >= 2 &&
      (V.colors = [
        20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63,
        68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128,
        129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168,
        169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200,
        201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221,
      ])
  } catch {}
  V.inspectOpts = Object.keys(process.env)
    .filter((e) => /^debug_/i.test(e))
    .reduce((e, t) => {
      let r = t
          .substring(6)
          .toLowerCase()
          .replace(/_([a-z])/g, (i, o) => o.toUpperCase()),
        n = process.env[t]
      return (
        /^(yes|on|true|enabled)$/i.test(n)
          ? (n = !0)
          : /^(no|off|false|disabled)$/i.test(n)
          ? (n = !1)
          : n === 'null'
          ? (n = null)
          : (n = Number(n)),
        (e[r] = n),
        e
      )
    }, {})
  function pl() {
    return 'colors' in V.inspectOpts
      ? Boolean(V.inspectOpts.colors)
      : cl.isatty(process.stderr.fd)
  }
  function ml(e) {
    let { namespace: t, useColors: r } = this
    if (r) {
      let n = this.color,
        i = '\x1B[3' + (n < 8 ? n : '8;5;' + n),
        o = `  ${i};1m${t} \x1B[0m`
      ;(e[0] =
        o +
        e[0]
          .split(
            `
`,
          )
          .join(
            `
` + o,
          )),
        e.push(i + 'm+' + tr.exports.humanize(this.diff) + '\x1B[0m')
    } else e[0] = dl() + t + ' ' + e[0]
  }
  function dl() {
    return V.inspectOpts.hideDate ? '' : new Date().toISOString() + ' '
  }
  function fl(...e) {
    return process.stderr.write(
      er.format(...e) +
        `
`,
    )
  }
  function gl(e) {
    e ? (process.env.DEBUG = e) : delete process.env.DEBUG
  }
  function yl() {
    return process.env.DEBUG
  }
  function hl(e) {
    e.inspectOpts = {}
    let t = Object.keys(V.inspectOpts)
    for (let r = 0; r < t.length; r++) e.inspectOpts[t[r]] = V.inspectOpts[t[r]]
  }
  tr.exports = tn()(V)
  var { formatters: Si } = tr.exports
  Si.o = function (e) {
    return (
      (this.inspectOpts.colors = this.useColors),
      er
        .inspect(e, this.inspectOpts)
        .split(
          `
`,
        )
        .map((t) => t.trim())
        .join(' ')
    )
  }
  Si.O = function (e) {
    return (
      (this.inspectOpts.colors = this.useColors),
      er.inspect(e, this.inspectOpts)
    )
  }
})
var Ri = L((fm, an) => {
  typeof process > 'u' ||
  process.type === 'renderer' ||
  process.browser === !0 ||
  process.__nwjs
    ? (an.exports = vi())
    : (an.exports = Fi())
})
var Li = L((Nm, El) => {
  El.exports = {
    name: 'dotenv',
    version: '16.0.3',
    description: 'Loads environment variables from .env file',
    main: 'lib/main.js',
    types: 'lib/main.d.ts',
    exports: {
      '.': {
        require: './lib/main.js',
        types: './lib/main.d.ts',
        default: './lib/main.js',
      },
      './config': './config.js',
      './config.js': './config.js',
      './lib/env-options': './lib/env-options.js',
      './lib/env-options.js': './lib/env-options.js',
      './lib/cli-options': './lib/cli-options.js',
      './lib/cli-options.js': './lib/cli-options.js',
      './package.json': './package.json',
    },
    scripts: {
      'dts-check': 'tsc --project tests/types/tsconfig.json',
      lint: 'standard',
      'lint-readme': 'standard-markdown',
      pretest: 'npm run lint && npm run dts-check',
      test: 'tap tests/*.js --100 -Rspec',
      prerelease: 'npm test',
      release: 'standard-version',
    },
    repository: { type: 'git', url: 'git://github.com/motdotla/dotenv.git' },
    keywords: [
      'dotenv',
      'env',
      '.env',
      'environment',
      'variables',
      'config',
      'settings',
    ],
    readmeFilename: 'README.md',
    license: 'BSD-2-Clause',
    devDependencies: {
      '@types/node': '^17.0.9',
      decache: '^4.6.1',
      dtslint: '^3.7.0',
      sinon: '^12.0.1',
      standard: '^16.0.4',
      'standard-markdown': '^7.1.0',
      'standard-version': '^9.3.2',
      tap: '^15.1.6',
      tar: '^6.1.11',
      typescript: '^4.5.4',
    },
    engines: { node: '>=12' },
  }
})
var qi = L((Lm, or) => {
  var Pl = require('fs'),
    $i = require('path'),
    Tl = require('os'),
    vl = Li(),
    Cl = vl.version,
    Ml =
      /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm
  function Al(e) {
    let t = {},
      r = e.toString()
    r = r.replace(
      /\r\n?/gm,
      `
`,
    )
    let n
    for (; (n = Ml.exec(r)) != null; ) {
      let i = n[1],
        o = n[2] || ''
      o = o.trim()
      let s = o[0]
      ;(o = o.replace(/^(['"`])([\s\S]*)\1$/gm, '$2')),
        s === '"' &&
          ((o = o.replace(
            /\\n/g,
            `
`,
          )),
          (o = o.replace(/\\r/g, '\r'))),
        (t[i] = o)
    }
    return t
  }
  function cn(e) {
    console.log(`[dotenv@${Cl}][DEBUG] ${e}`)
  }
  function Sl(e) {
    return e[0] === '~' ? $i.join(Tl.homedir(), e.slice(1)) : e
  }
  function Fl(e) {
    let t = $i.resolve(process.cwd(), '.env'),
      r = 'utf8',
      n = Boolean(e && e.debug),
      i = Boolean(e && e.override)
    e &&
      (e.path != null && (t = Sl(e.path)),
      e.encoding != null && (r = e.encoding))
    try {
      let o = ir.parse(Pl.readFileSync(t, { encoding: r }))
      return (
        Object.keys(o).forEach(function (s) {
          Object.prototype.hasOwnProperty.call(process.env, s)
            ? (i === !0 && (process.env[s] = o[s]),
              n &&
                cn(
                  i === !0
                    ? `"${s}" is already defined in \`process.env\` and WAS overwritten`
                    : `"${s}" is already defined in \`process.env\` and was NOT overwritten`,
                ))
            : (process.env[s] = o[s])
        }),
        { parsed: o }
      )
    } catch (o) {
      return n && cn(`Failed to load ${t} ${o.message}`), { error: o }
    }
  }
  var ir = { config: Fl, parse: Al }
  or.exports.config = ir.config
  or.exports.parse = ir.parse
  or.exports = ir
})
var Qi = L((Um, Ui) => {
  'use strict'
  Ui.exports = (e) => {
    let t = e.match(/^[ \t]*(?=\S)/gm)
    return t ? t.reduce((r, n) => Math.min(r, n.length), 1 / 0) : 0
  }
})
var Gi = L((Qm, Ji) => {
  'use strict'
  var Dl = Qi()
  Ji.exports = (e) => {
    let t = Dl(e)
    if (t === 0) return e
    let r = new RegExp(`^[ \\t]{${t}}`, 'gm')
    return e.replace(r, '')
  }
})
var Zi = L((rd, hn) => {
  'use strict'
  var C = hn.exports
  hn.exports.default = C
  var S = '\x1B[',
    Tt = '\x1B]',
    nt = '\x07',
    ur = ';',
    Yi = process.env.TERM_PROGRAM === 'Apple_Terminal'
  C.cursorTo = (e, t) => {
    if (typeof e != 'number')
      throw new TypeError('The `x` argument is required')
    return typeof t != 'number'
      ? S + (e + 1) + 'G'
      : S + (t + 1) + ';' + (e + 1) + 'H'
  }
  C.cursorMove = (e, t) => {
    if (typeof e != 'number')
      throw new TypeError('The `x` argument is required')
    let r = ''
    return (
      e < 0 ? (r += S + -e + 'D') : e > 0 && (r += S + e + 'C'),
      t < 0 ? (r += S + -t + 'A') : t > 0 && (r += S + t + 'B'),
      r
    )
  }
  C.cursorUp = (e = 1) => S + e + 'A'
  C.cursorDown = (e = 1) => S + e + 'B'
  C.cursorForward = (e = 1) => S + e + 'C'
  C.cursorBackward = (e = 1) => S + e + 'D'
  C.cursorLeft = S + 'G'
  C.cursorSavePosition = Yi ? '\x1B7' : S + 's'
  C.cursorRestorePosition = Yi ? '\x1B8' : S + 'u'
  C.cursorGetPosition = S + '6n'
  C.cursorNextLine = S + 'E'
  C.cursorPrevLine = S + 'F'
  C.cursorHide = S + '?25l'
  C.cursorShow = S + '?25h'
  C.eraseLines = (e) => {
    let t = ''
    for (let r = 0; r < e; r++)
      t += C.eraseLine + (r < e - 1 ? C.cursorUp() : '')
    return e && (t += C.cursorLeft), t
  }
  C.eraseEndLine = S + 'K'
  C.eraseStartLine = S + '1K'
  C.eraseLine = S + '2K'
  C.eraseDown = S + 'J'
  C.eraseUp = S + '1J'
  C.eraseScreen = S + '2J'
  C.scrollUp = S + 'S'
  C.scrollDown = S + 'T'
  C.clearScreen = '\x1Bc'
  C.clearTerminal =
    process.platform === 'win32'
      ? `${C.eraseScreen}${S}0f`
      : `${C.eraseScreen}${S}3J${S}H`
  C.beep = nt
  C.link = (e, t) => [Tt, '8', ur, ur, t, nt, e, Tt, '8', ur, ur, nt].join('')
  C.image = (e, t = {}) => {
    let r = `${Tt}1337;File=inline=1`
    return (
      t.width && (r += `;width=${t.width}`),
      t.height && (r += `;height=${t.height}`),
      t.preserveAspectRatio === !1 && (r += ';preserveAspectRatio=0'),
      r + ':' + e.toString('base64') + nt
    )
  }
  C.iTerm = {
    setCwd: (e = process.cwd()) => `${Tt}50;CurrentDir=${e}${nt}`,
    annotation: (e, t = {}) => {
      let r = `${Tt}1337;`,
        n = typeof t.x < 'u',
        i = typeof t.y < 'u'
      if ((n || i) && !(n && i && typeof t.length < 'u'))
        throw new Error(
          '`x`, `y` and `length` must be defined when `x` or `y` is defined',
        )
      return (
        (e = e.replace(/\|/g, '')),
        (r += t.isHidden ? 'AddHiddenAnnotation=' : 'AddAnnotation='),
        t.length > 0
          ? (r += (n ? [e, t.length, t.x, t.y] : [t.length, e]).join('|'))
          : (r += e),
        r + nt
      )
    },
  }
})
var to = L((nd, eo) => {
  'use strict'
  var Nl = sn(),
    it = rn()
  function Xi(e) {
    if (/^\d{3,4}$/.test(e)) {
      let r = /(\d{1,2})(\d{2})/.exec(e)
      return { major: 0, minor: parseInt(r[1], 10), patch: parseInt(r[2], 10) }
    }
    let t = (e || '').split('.').map((r) => parseInt(r, 10))
    return { major: t[0], minor: t[1], patch: t[2] }
  }
  function xn(e) {
    let { env: t } = process
    if ('FORCE_HYPERLINK' in t)
      return !(
        t.FORCE_HYPERLINK.length > 0 && parseInt(t.FORCE_HYPERLINK, 10) === 0
      )
    if (
      it('no-hyperlink') ||
      it('no-hyperlinks') ||
      it('hyperlink=false') ||
      it('hyperlink=never')
    )
      return !1
    if (it('hyperlink=true') || it('hyperlink=always') || 'NETLIFY' in t)
      return !0
    if (
      !Nl.supportsColor(e) ||
      (e && !e.isTTY) ||
      process.platform === 'win32' ||
      'CI' in t ||
      'TEAMCITY_VERSION' in t
    )
      return !1
    if ('TERM_PROGRAM' in t) {
      let r = Xi(t.TERM_PROGRAM_VERSION)
      switch (t.TERM_PROGRAM) {
        case 'iTerm.app':
          return r.major === 3 ? r.minor >= 1 : r.major > 3
        case 'WezTerm':
          return r.major >= 20200620
        case 'vscode':
          return r.major > 1 || (r.major === 1 && r.minor >= 72)
      }
    }
    if ('VTE_VERSION' in t) {
      if (t.VTE_VERSION === '0.50.0') return !1
      let r = Xi(t.VTE_VERSION)
      return r.major > 0 || r.minor >= 50
    }
    return !1
  }
  eo.exports = {
    supportsHyperlink: xn,
    stdout: xn(process.stdout),
    stderr: xn(process.stderr),
  }
})
var no = L((id, vt) => {
  'use strict'
  var Ll = Zi(),
    bn = to(),
    ro = (e, t, { target: r = 'stdout', ...n } = {}) =>
      bn[r]
        ? Ll.link(e, t)
        : n.fallback === !1
        ? e
        : typeof n.fallback == 'function'
        ? n.fallback(e, t)
        : `${e} (\u200B${t}\u200B)`
  vt.exports = (e, t, r = {}) => ro(e, t, r)
  vt.exports.stderr = (e, t, r = {}) => ro(e, t, { target: 'stderr', ...r })
  vt.exports.isSupported = bn.stdout
  vt.exports.stderr.isSupported = bn.stderr
})
var fo = L((Pd, Zl) => {
  Zl.exports = {
    name: '@prisma/engines-version',
    version: '4.17.0-26.6b0aef69b7cdfc787f822ecd7cdc76d5f1991584',
    main: 'index.js',
    types: 'index.d.ts',
    license: 'Apache-2.0',
    author: 'Tim Suchanek <suchanek@prisma.io>',
    prisma: { enginesVersion: '6b0aef69b7cdfc787f822ecd7cdc76d5f1991584' },
    repository: {
      type: 'git',
      url: 'https://github.com/prisma/engines-wrapper.git',
      directory: 'packages/engines-version',
    },
    devDependencies: { '@types/node': '18.16.19', typescript: '4.9.5' },
    files: ['index.js', 'index.d.ts'],
    scripts: { build: 'tsc -d' },
  }
})
var Tn = L((dr) => {
  'use strict'
  Object.defineProperty(dr, '__esModule', { value: !0 })
  dr.enginesVersion = void 0
  dr.enginesVersion = fo().prisma.enginesVersion
})
var Sn = L((Id, ho) => {
  'use strict'
  ho.exports = (e, t = 1, r) => {
    if (
      ((r = { indent: ' ', includeEmptyLines: !1, ...r }), typeof e != 'string')
    )
      throw new TypeError(
        `Expected \`input\` to be a \`string\`, got \`${typeof e}\``,
      )
    if (typeof t != 'number')
      throw new TypeError(
        `Expected \`count\` to be a \`number\`, got \`${typeof t}\``,
      )
    if (typeof r.indent != 'string')
      throw new TypeError(
        `Expected \`options.indent\` to be a \`string\`, got \`${typeof r.indent}\``,
      )
    if (t === 0) return e
    let n = r.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm
    return e.replace(n, r.indent.repeat(t))
  }
})
var Eo = L(($d, wo) => {
  'use strict'
  wo.exports = ({ onlyFirst: e = !1 } = {}) => {
    let t = [
      '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
      '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
    ].join('|')
    return new RegExp(t, e ? void 0 : 'g')
  }
})
var On = L((qd, Po) => {
  'use strict'
  var lu = Eo()
  Po.exports = (e) => (typeof e == 'string' ? e.replace(lu(), '') : e)
})
var To = L((Bd, fr) => {
  'use strict'
  fr.exports = (e = {}) => {
    let t
    if (e.repoUrl) t = e.repoUrl
    else if (e.user && e.repo) t = `https://github.com/${e.user}/${e.repo}`
    else
      throw new Error(
        'You need to specify either the `repoUrl` option or both the `user` and `repo` options',
      )
    let r = new URL(`${t}/issues/new`),
      n = [
        'body',
        'title',
        'labels',
        'template',
        'milestone',
        'assignee',
        'projects',
      ]
    for (let i of n) {
      let o = e[i]
      if (o !== void 0) {
        if (i === 'labels' || i === 'projects') {
          if (!Array.isArray(o))
            throw new TypeError(`The \`${i}\` option should be an array`)
          o = o.join(',')
        }
        r.searchParams.set(i, o)
      }
    }
    return r.toString()
  }
  fr.exports.default = fr.exports
})
var ii = L((kx, Js) => {
  'use strict'
  Js.exports = (function () {
    function e(t, r, n, i, o) {
      return t < r || n < r ? (t > n ? n + 1 : t + 1) : i === o ? r : r + 1
    }
    return function (t, r) {
      if (t === r) return 0
      if (t.length > r.length) {
        var n = t
        ;(t = r), (r = n)
      }
      for (
        var i = t.length, o = r.length;
        i > 0 && t.charCodeAt(i - 1) === r.charCodeAt(o - 1);

      )
        i--, o--
      for (var s = 0; s < i && t.charCodeAt(s) === r.charCodeAt(s); ) s++
      if (((i -= s), (o -= s), i === 0 || o < 3)) return o
      var a = 0,
        l,
        u,
        c,
        p,
        m,
        g,
        y,
        f,
        b,
        P,
        v,
        x,
        M = []
      for (l = 0; l < i; l++) M.push(l + 1), M.push(t.charCodeAt(s + l))
      for (var ae = M.length - 1; a < o - 3; )
        for (
          b = r.charCodeAt(s + (u = a)),
            P = r.charCodeAt(s + (c = a + 1)),
            v = r.charCodeAt(s + (p = a + 2)),
            x = r.charCodeAt(s + (m = a + 3)),
            g = a += 4,
            l = 0;
          l < ae;
          l += 2
        )
          (y = M[l]),
            (f = M[l + 1]),
            (u = e(y, u, c, b, f)),
            (c = e(u, c, p, P, f)),
            (p = e(c, p, m, v, f)),
            (g = e(p, m, g, x, f)),
            (M[l] = g),
            (m = p),
            (p = c),
            (c = u),
            (u = y)
      for (; a < o; )
        for (b = r.charCodeAt(s + (u = a)), g = ++a, l = 0; l < ae; l += 2)
          (y = M[l]), (M[l] = g = e(y, u, g, b, M[l + 1])), (u = y)
      return g
    }
  })()
})
var zp = {}
bt(zp, {
  DMMF: () => le,
  DMMFClass: () => wt,
  Debug: () => ln,
  Decimal: () => Ee,
  Extensions: () => Zr,
  MetricsClient: () => at,
  NotFoundError: () => Me,
  PrismaClientInitializationError: () => _,
  PrismaClientKnownRequestError: () => z,
  PrismaClientRustPanicError: () => se,
  PrismaClientUnknownRequestError: () => Y,
  PrismaClientValidationError: () => te,
  Public: () => Xr,
  Sql: () => K,
  Types: () => en,
  defineDmmfProperty: () => Co,
  empty: () => Ao,
  getPrismaClient: () => Ba,
  join: () => Mo,
  makeStrictEnum: () => Va,
  objectEnumValues: () => Pr,
  raw: () => $n,
  sqltag: () => qn,
  warnEnvConflicts: () => Ka,
  warnOnce: () => Nn,
})
module.exports = Ha(zp)
var Zr = {}
bt(Zr, { defineExtension: () => di, getExtensionContext: () => fi })
function di(e) {
  return typeof e == 'function' ? e : (t) => t.$extends(e)
}
function fi(e) {
  return e
}
var Xr = {}
bt(Xr, { validator: () => gi })
function gi(...e) {
  return (t) => t
}
var en = {}
bt(en, { Extensions: () => yi, Public: () => hi, Utils: () => xi })
var yi = {}
var hi = {}
var xi = {}
function bi(e, t) {
  for (let r of t)
    for (let n of Object.getOwnPropertyNames(r.prototype))
      Object.defineProperty(
        e.prototype,
        n,
        Object.getOwnPropertyDescriptor(r.prototype, n) ?? Object.create(null),
      )
}
var H = (e, t) => {
    let r = {}
    for (let n of e) {
      let i = n[t]
      r[i] = n
    }
    return r
  },
  ze = {
    String: !0,
    Int: !0,
    Float: !0,
    Boolean: !0,
    Long: !0,
    DateTime: !0,
    ID: !0,
    UUID: !0,
    Json: !0,
    Bytes: !0,
    Decimal: !0,
    BigInt: !0,
  }
function wi(e) {
  return e.substring(0, 1).toLowerCase() + e.substring(1)
}
var Ht = class {
    constructor({ datamodel: t }) {
      ;(this.datamodel = t),
        (this.datamodelEnumMap = this.getDatamodelEnumMap()),
        (this.modelMap = this.getModelMap()),
        (this.typeMap = this.getTypeMap()),
        (this.typeAndModelMap = this.getTypeModelMap())
    }
    getDatamodelEnumMap() {
      return H(this.datamodel.enums, 'name')
    }
    getModelMap() {
      return { ...H(this.datamodel.models, 'name') }
    }
    getTypeMap() {
      return { ...H(this.datamodel.types, 'name') }
    }
    getTypeModelMap() {
      return { ...this.getTypeMap(), ...this.getModelMap() }
    }
  },
  zt = class {
    constructor({ mappings: t }) {
      ;(this.mappings = t), (this.mappingsMap = this.getMappingsMap())
    }
    getMappingsMap() {
      return H(this.mappings.modelOperations, 'model')
    }
    getOtherOperationNames() {
      return [
        Object.values(this.mappings.otherOperations.write),
        Object.values(this.mappings.otherOperations.read),
      ].flat()
    }
  },
  Yt = class {
    constructor({ schema: t }) {
      this.outputTypeToMergedOutputType = (t) => ({ ...t, fields: t.fields })
      ;(this.schema = t),
        (this.enumMap = this.getEnumMap()),
        (this.queryType = this.getQueryType()),
        (this.mutationType = this.getMutationType()),
        (this.outputTypes = this.getOutputTypes()),
        (this.outputTypeMap = this.getMergedOutputTypeMap()),
        this.resolveOutputTypes(),
        (this.inputObjectTypes = this.schema.inputObjectTypes),
        (this.inputTypeMap = this.getInputTypeMap()),
        this.resolveInputTypes(),
        this.resolveFieldArgumentTypes(),
        (this.queryType = this.outputTypeMap.Query),
        (this.mutationType = this.outputTypeMap.Mutation),
        (this.rootFieldMap = this.getRootFieldMap())
    }
    get [Symbol.toStringTag]() {
      return 'DMMFClass'
    }
    resolveOutputTypes() {
      for (let t of this.outputTypes.model) {
        for (let r of t.fields)
          typeof r.outputType.type == 'string' &&
            !ze[r.outputType.type] &&
            (r.outputType.type =
              this.outputTypeMap[r.outputType.type] ||
              this.outputTypeMap[r.outputType.type] ||
              this.enumMap[r.outputType.type] ||
              r.outputType.type)
        t.fieldMap = H(t.fields, 'name')
      }
      for (let t of this.outputTypes.prisma) {
        for (let r of t.fields)
          typeof r.outputType.type == 'string' &&
            !ze[r.outputType.type] &&
            (r.outputType.type =
              this.outputTypeMap[r.outputType.type] ||
              this.outputTypeMap[r.outputType.type] ||
              this.enumMap[r.outputType.type] ||
              r.outputType.type)
        t.fieldMap = H(t.fields, 'name')
      }
    }
    resolveInputTypes() {
      let t = this.inputObjectTypes.prisma
      this.inputObjectTypes.model && t.push(...this.inputObjectTypes.model)
      for (let r of t) {
        for (let n of r.fields)
          for (let i of n.inputTypes) {
            let o = i.type
            typeof o == 'string' &&
              !ze[o] &&
              (this.inputTypeMap[o] || this.enumMap[o]) &&
              (i.type = this.inputTypeMap[o] || this.enumMap[o] || o)
          }
        r.fieldMap = H(r.fields, 'name')
      }
    }
    resolveFieldArgumentTypes() {
      for (let t of this.outputTypes.prisma)
        for (let r of t.fields)
          for (let n of r.args)
            for (let i of n.inputTypes) {
              let o = i.type
              typeof o == 'string' &&
                !ze[o] &&
                (i.type = this.inputTypeMap[o] || this.enumMap[o] || o)
            }
      for (let t of this.outputTypes.model)
        for (let r of t.fields)
          for (let n of r.args)
            for (let i of n.inputTypes) {
              let o = i.type
              typeof o == 'string' &&
                !ze[o] &&
                (i.type = this.inputTypeMap[o] || this.enumMap[o] || i.type)
            }
    }
    getQueryType() {
      return this.schema.outputObjectTypes.prisma.find(
        (t) => t.name === 'Query',
      )
    }
    getMutationType() {
      return this.schema.outputObjectTypes.prisma.find(
        (t) => t.name === 'Mutation',
      )
    }
    getOutputTypes() {
      return {
        model: this.schema.outputObjectTypes.model.map(
          this.outputTypeToMergedOutputType,
        ),
        prisma: this.schema.outputObjectTypes.prisma.map(
          this.outputTypeToMergedOutputType,
        ),
      }
    }
    getEnumMap() {
      return {
        ...H(this.schema.enumTypes.prisma, 'name'),
        ...(this.schema.enumTypes.model
          ? H(this.schema.enumTypes.model, 'name')
          : void 0),
      }
    }
    hasEnumInNamespace(t, r) {
      return this.schema.enumTypes[r]?.find((n) => n.name === t) !== void 0
    }
    getMergedOutputTypeMap() {
      return {
        ...H(this.outputTypes.model, 'name'),
        ...H(this.outputTypes.prisma, 'name'),
      }
    }
    getInputTypeMap() {
      return {
        ...(this.schema.inputObjectTypes.model
          ? H(this.schema.inputObjectTypes.model, 'name')
          : void 0),
        ...H(this.schema.inputObjectTypes.prisma, 'name'),
      }
    }
    getRootFieldMap() {
      return {
        ...H(this.queryType.fields, 'name'),
        ...H(this.mutationType.fields, 'name'),
      }
    }
  },
  wt = class {
    constructor(t) {
      return Object.assign(this, new Ht(t), new zt(t), new Yt(t))
    }
  }
bi(wt, [Ht, zt, Yt])
var le
;((t) => {
  let e
  ;((x) => (
    (x.findUnique = 'findUnique'),
    (x.findUniqueOrThrow = 'findUniqueOrThrow'),
    (x.findFirst = 'findFirst'),
    (x.findFirstOrThrow = 'findFirstOrThrow'),
    (x.findMany = 'findMany'),
    (x.create = 'create'),
    (x.createMany = 'createMany'),
    (x.update = 'update'),
    (x.updateMany = 'updateMany'),
    (x.upsert = 'upsert'),
    (x.delete = 'delete'),
    (x.deleteMany = 'deleteMany'),
    (x.groupBy = 'groupBy'),
    (x.count = 'count'),
    (x.aggregate = 'aggregate'),
    (x.findRaw = 'findRaw'),
    (x.aggregateRaw = 'aggregateRaw')
  ))((e = t.ModelAction || (t.ModelAction = {})))
})(le || (le = {}))
var rr = A(Ri()),
  xl = 100,
  Et = []
typeof process < 'u' &&
  typeof process.stderr?.write != 'function' &&
  (rr.default.log = console.debug ?? console.log)
function bl(e) {
  let t = (0, rr.default)(e),
    r = Object.assign(
      (...n) => (
        (t.log = r.log),
        n.length !== 0 && Et.push([e, ...n]),
        Et.length > xl && Et.shift(),
        t('', ...n)
      ),
      t,
    )
  return r
}
var ln = Object.assign(bl, rr.default)
function ki(e = 7500) {
  let t = Et.map((r) =>
    r.map((n) => (typeof n == 'string' ? n : JSON.stringify(n))).join(' '),
  ).join(`
`)
  return t.length < e ? t : t.slice(-e)
}
function Oi() {
  Et.length = 0
}
var N = ln
var un,
  Di,
  _i,
  Ii,
  Ni = !0
typeof process < 'u' &&
  (({
    FORCE_COLOR: un,
    NODE_DISABLE_COLORS: Di,
    NO_COLOR: _i,
    TERM: Ii,
  } = process.env || {}),
  (Ni = process.stdout && process.stdout.isTTY))
var wl = {
  enabled:
    !Di && _i == null && Ii !== 'dumb' && ((un != null && un !== '0') || Ni),
}
function k(e, t) {
  let r = new RegExp(`\\x1b\\[${t}m`, 'g'),
    n = `\x1B[${e}m`,
    i = `\x1B[${t}m`
  return function (o) {
    return !wl.enabled || o == null
      ? o
      : n + (~('' + o).indexOf(i) ? o.replace(r, i + n) : o) + i
  }
}
var ym = k(0, 0),
  re = k(1, 22),
  Oe = k(2, 22),
  hm = k(3, 23),
  X = k(4, 24),
  xm = k(7, 27),
  bm = k(8, 28),
  wm = k(9, 29),
  Em = k(30, 39),
  ce = k(31, 39),
  Qe = k(32, 39),
  he = k(33, 39),
  et = k(34, 39),
  Pm = k(35, 39),
  De = k(36, 39),
  Tm = k(37, 39),
  nr = k(90, 39),
  vm = k(90, 39),
  Cm = k(40, 49),
  Mm = k(41, 49),
  Am = k(42, 49),
  Sm = k(43, 49),
  Fm = k(44, 49),
  Rm = k(45, 49),
  km = k(46, 49),
  Om = k(47, 49)
var mn = A(qi()),
  sr = A(require('fs'))
var tt = A(require('path'))
function ji(e) {
  let t = e.ignoreProcessEnv ? {} : process.env,
    r = (n) =>
      n.match(/(.?\${(?:[a-zA-Z0-9_]+)?})/g)?.reduce(function (o, s) {
        let a = /(.?)\${([a-zA-Z0-9_]+)?}/g.exec(s)
        if (!a) return o
        let l = a[1],
          u,
          c
        if (l === '\\') (c = a[0]), (u = c.replace('\\$', '$'))
        else {
          let p = a[2]
          ;(c = a[0].substring(l.length)),
            (u = Object.hasOwnProperty.call(t, p) ? t[p] : e.parsed[p] || ''),
            (u = r(u))
        }
        return o.replace(c, u)
      }, n) ?? n
  for (let n in e.parsed) {
    let i = Object.hasOwnProperty.call(t, n) ? t[n] : e.parsed[n]
    e.parsed[n] = r(i)
  }
  for (let n in e.parsed) t[n] = e.parsed[n]
  return e
}
var pn = N('prisma:tryLoadEnv')
function Pt(
  { rootEnvPath: e, schemaEnvPath: t },
  r = { conflictCheck: 'none' },
) {
  let n = Bi(e)
  r.conflictCheck !== 'none' && Rl(n, t, r.conflictCheck)
  let i = null
  return (
    Vi(n?.path, t) || (i = Bi(t)),
    !n && !i && pn('No Environment variables loaded'),
    i?.dotenvResult.error
      ? console.error(ce(re('Schema Env Error: ')) + i.dotenvResult.error)
      : {
          message: [n?.message, i?.message].filter(Boolean).join(`
`),
          parsed: { ...n?.dotenvResult?.parsed, ...i?.dotenvResult?.parsed },
        }
  )
}
function Rl(e, t, r) {
  let n = e?.dotenvResult.parsed,
    i = !Vi(e?.path, t)
  if (n && t && i && sr.default.existsSync(t)) {
    let o = mn.default.parse(sr.default.readFileSync(t)),
      s = []
    for (let a in o) n[a] === o[a] && s.push(a)
    if (s.length > 0) {
      let a = tt.default.relative(process.cwd(), e.path),
        l = tt.default.relative(process.cwd(), t)
      if (r === 'error') {
        let u = `There is a conflict between env var${
          s.length > 1 ? 's' : ''
        } in ${X(a)} and ${X(l)}
Conflicting env vars:
${s.map((c) => `  ${re(c)}`).join(`
`)}

We suggest to move the contents of ${X(l)} to ${X(
          a,
        )} to consolidate your env vars.
`
        throw new Error(u)
      } else if (r === 'warn') {
        let u = `Conflict for env var${s.length > 1 ? 's' : ''} ${s
          .map((c) => re(c))
          .join(', ')} in ${X(a)} and ${X(l)}
Env vars from ${X(l)} overwrite the ones from ${X(a)}
      `
        console.warn(`${he('warn(prisma)')} ${u}`)
      }
    }
  }
}
function Bi(e) {
  return kl(e)
    ? (pn(`Environment variables loaded from ${e}`),
      {
        dotenvResult: ji(
          mn.default.config({
            path: e,
            debug: process.env.DOTENV_CONFIG_DEBUG ? !0 : void 0,
          }),
        ),
        message: Oe(
          `Environment variables loaded from ${tt.default.relative(
            process.cwd(),
            e,
          )}`,
        ),
        path: e,
      })
    : (pn(`Environment variables not found at ${e}`), null)
}
function Vi(e, t) {
  return e && t && tt.default.resolve(e) === tt.default.resolve(t)
}
function kl(e) {
  return Boolean(e && sr.default.existsSync(e))
}
var Ki = 'library'
function dn(e) {
  let t = Ol()
  return (
    t ||
    (e?.config.engineType === 'library'
      ? 'library'
      : e?.config.engineType === 'binary'
      ? 'binary'
      : Ki)
  )
}
function Ol() {
  let e = process.env.PRISMA_CLIENT_ENGINE_TYPE
  return e === 'library' ? 'library' : e === 'binary' ? 'binary' : void 0
}
var ar = Symbol('@ts-pattern/matcher'),
  Wi = '@ts-pattern/anonymous-select-key',
  Hi = function (e) {
    return Boolean(e && typeof e == 'object')
  },
  fn = function (e) {
    return e && !!e[ar]
  },
  _l = function e(t, r, n) {
    if (Hi(t)) {
      if (fn(t)) {
        var i = t[ar]().match(r),
          o = i.matched,
          s = i.selections
        return (
          o &&
            s &&
            Object.keys(s).forEach(function (l) {
              return n(l, s[l])
            }),
          o
        )
      }
      if (!Hi(r)) return !1
      if (Array.isArray(t))
        return (
          !!Array.isArray(r) &&
          t.length === r.length &&
          t.every(function (l, u) {
            return e(l, r[u], n)
          })
        )
      if (t instanceof Map)
        return (
          r instanceof Map &&
          Array.from(t.keys()).every(function (l) {
            return e(t.get(l), r.get(l), n)
          })
        )
      if (t instanceof Set) {
        if (!(r instanceof Set)) return !1
        if (t.size === 0) return r.size === 0
        if (t.size === 1) {
          var a = Array.from(t.values())[0]
          return fn(a)
            ? Array.from(r.values()).every(function (l) {
                return e(a, l, n)
              })
            : r.has(a)
        }
        return Array.from(t.values()).every(function (l) {
          return r.has(l)
        })
      }
      return Object.keys(t).every(function (l) {
        var u,
          c = t[l]
        return (
          (l in r || (fn((u = c)) && u[ar]().matcherType === 'optional')) &&
          e(c, r[l], n)
        )
      })
    }
    return Object.is(r, t)
  }
function Je(e) {
  var t
  return (
    ((t = {})[ar] = function () {
      return {
        match: function (r) {
          return { matched: Boolean(e(r)) }
        },
      }
    }),
    t
  )
}
var Jm = Je(function (e) {
  return !0
})
var Gm = Je(function (e) {
    return typeof e == 'string'
  }),
  Wm = Je(function (e) {
    return typeof e == 'number'
  }),
  Hm = Je(function (e) {
    return typeof e == 'boolean'
  }),
  zm = Je(function (e) {
    return typeof e == 'bigint'
  }),
  Ym = Je(function (e) {
    return typeof e == 'symbol'
  }),
  Zm = Je(function (e) {
    return e == null
  })
function rt(e) {
  return new Il(e, [])
}
var Il = (function () {
  function e(r, n) {
    ;(this.value = void 0),
      (this.cases = void 0),
      (this.value = r),
      (this.cases = n)
  }
  var t = e.prototype
  return (
    (t.with = function () {
      var r = [].slice.call(arguments),
        n = r[r.length - 1],
        i = [r[0]],
        o = []
      return (
        r.length === 3 && typeof r[1] == 'function'
          ? (i.push(r[0]), o.push(r[1]))
          : r.length > 2 && i.push.apply(i, r.slice(1, r.length - 1)),
        new e(
          this.value,
          this.cases.concat([
            {
              match: function (s) {
                var a = {},
                  l = Boolean(
                    i.some(function (u) {
                      return _l(u, s, function (c, p) {
                        a[c] = p
                      })
                    }) &&
                      o.every(function (u) {
                        return u(s)
                      }),
                  )
                return {
                  matched: l,
                  value: l && Object.keys(a).length ? (Wi in a ? a[Wi] : a) : s,
                }
              },
              handler: n,
            },
          ]),
        )
      )
    }),
    (t.when = function (r, n) {
      return new e(
        this.value,
        this.cases.concat([
          {
            match: function (i) {
              return { matched: Boolean(r(i)), value: i }
            },
            handler: n,
          },
        ]),
      )
    }),
    (t.otherwise = function (r) {
      return new e(
        this.value,
        this.cases.concat([
          {
            match: function (n) {
              return { matched: !0, value: n }
            },
            handler: r,
          },
        ]),
      ).run()
    }),
    (t.exhaustive = function () {
      return this.run()
    }),
    (t.run = function () {
      for (var r = this.value, n = void 0, i = 0; i < this.cases.length; i++) {
        var o = this.cases[i],
          s = o.match(this.value)
        if (s.matched) {
          ;(r = s.value), (n = o.handler)
          break
        }
      }
      if (!n) {
        var a
        try {
          a = JSON.stringify(this.value)
        } catch {
          a = this.value
        }
        throw new Error('Pattern matching error: no pattern matches value ' + a)
      }
      return n(r, this.value)
    }),
    e
  )
})()
var zi = A(require('fs'))
function gn() {
  let e = process.env.PRISMA_QUERY_ENGINE_LIBRARY
  if (!(e && zi.default.existsSync(e)) && process.arch === 'ia32')
    throw new Error(
      'The default query engine type (Node-API, "library") is currently not supported for 32bit Node. Please set `engineType = "binary"` in the "generator" block of your "schema.prisma" file (or use the environment variables "PRISMA_CLIENT_ENGINE_TYPE=binary" and/or "PRISMA_CLI_QUERY_ENGINE_TYPE=binary".)',
    )
}
var lr = 'libquery_engine'
function yn(e, t) {
  let r = t === 'url'
  return e.includes('windows')
    ? r
      ? 'query_engine.dll.node'
      : `query_engine-${e}.dll.node`
    : e.includes('darwin')
    ? r
      ? `${lr}.dylib.node`
      : `${lr}-${e}.dylib.node`
    : r
    ? `${lr}.so.node`
    : `${lr}-${e}.so.node`
}
var ao = A(require('child_process')),
  wn = A(require('fs/promises')),
  pr = A(require('os'))
var lo = require('util')
var io = A(no())
function Ct(e) {
  return (0, io.default)(e, e, { fallback: X })
}
var $l = { warn: he('prisma:warn') },
  ql = { warn: () => !process.env.PRISMA_DISABLE_WARNINGS }
function Mt(e, ...t) {
  ql.warn() && console.warn(`${$l.warn} ${e}`, ...t)
}
var jl = (0, lo.promisify)(ao.default.exec),
  ne = N('prisma:get-platform'),
  Bl = ['1.0.x', '1.1.x', '3.0.x']
async function uo() {
  let e = pr.default.platform(),
    t = process.arch
  if (e === 'freebsd') {
    let s = await mr('freebsd-version')
    if (s && s.trim().length > 0) {
      let l = /^(\d+)\.?/.exec(s)
      if (l)
        return { platform: 'freebsd', targetDistro: `freebsd${l[1]}`, arch: t }
    }
  }
  if (e !== 'linux') return { platform: e, arch: t }
  let r = await Kl(),
    n = await Yl(),
    i = Ql({ arch: t, archFromUname: n, familyDistro: r.familyDistro }),
    { libssl: o } = await Jl(i)
  return { platform: 'linux', libssl: o, arch: t, archFromUname: n, ...r }
}
function Vl(e) {
  let t = /^ID="?([^"\n]*)"?$/im,
    r = /^ID_LIKE="?([^"\n]*)"?$/im,
    n = t.exec(e),
    i = (n && n[1] && n[1].toLowerCase()) || '',
    o = r.exec(e),
    s = (o && o[1] && o[1].toLowerCase()) || '',
    a = rt({ id: i, idLike: s })
      .with({ id: 'alpine' }, ({ id: l }) => ({
        targetDistro: 'musl',
        familyDistro: l,
        originalDistro: l,
      }))
      .with({ id: 'raspbian' }, ({ id: l }) => ({
        targetDistro: 'arm',
        familyDistro: 'debian',
        originalDistro: l,
      }))
      .with({ id: 'nixos' }, ({ id: l }) => ({
        targetDistro: 'nixos',
        originalDistro: l,
        familyDistro: 'nixos',
      }))
      .with({ id: 'debian' }, { id: 'ubuntu' }, ({ id: l }) => ({
        targetDistro: 'debian',
        familyDistro: 'debian',
        originalDistro: l,
      }))
      .with(
        { id: 'rhel' },
        { id: 'centos' },
        { id: 'fedora' },
        ({ id: l }) => ({
          targetDistro: 'rhel',
          familyDistro: 'rhel',
          originalDistro: l,
        }),
      )
      .when(
        ({ idLike: l }) => l.includes('debian') || l.includes('ubuntu'),
        ({ id: l }) => ({
          targetDistro: 'debian',
          familyDistro: 'debian',
          originalDistro: l,
        }),
      )
      .when(
        ({ idLike: l }) => i === 'arch' || l.includes('arch'),
        ({ id: l }) => ({
          targetDistro: 'debian',
          familyDistro: 'arch',
          originalDistro: l,
        }),
      )
      .when(
        ({ idLike: l }) =>
          l.includes('centos') ||
          l.includes('fedora') ||
          l.includes('rhel') ||
          l.includes('suse'),
        ({ id: l }) => ({
          targetDistro: 'rhel',
          familyDistro: 'rhel',
          originalDistro: l,
        }),
      )
      .otherwise(({ id: l }) => ({
        targetDistro: void 0,
        familyDistro: void 0,
        originalDistro: l,
      }))
  return (
    ne(`Found distro info:
${JSON.stringify(a, null, 2)}`),
    a
  )
}
async function Kl() {
  let e = '/etc/os-release'
  try {
    let t = await wn.default.readFile(e, { encoding: 'utf-8' })
    return Vl(t)
  } catch {
    return {
      targetDistro: void 0,
      familyDistro: void 0,
      originalDistro: void 0,
    }
  }
}
function Ul(e) {
  let t = /^OpenSSL\s(\d+\.\d+)\.\d+/.exec(e)
  if (t) {
    let r = `${t[1]}.x`
    return co(r)
  }
}
function oo(e) {
  let t = /libssl\.so\.(\d)(\.\d)?/.exec(e)
  if (t) {
    let r = `${t[1]}${t[2] ?? '.0'}.x`
    return co(r)
  }
}
function co(e) {
  let t = (() => {
    if (mo(e)) return e
    let r = e.split('.')
    return (r[1] = '0'), r.join('.')
  })()
  if (Bl.includes(t)) return t
}
function Ql(e) {
  return rt(e)
    .with(
      { familyDistro: 'musl' },
      () => (ne('Trying platform-specific paths for "alpine"'), ['/lib']),
    )
    .with(
      { familyDistro: 'debian' },
      ({ archFromUname: t }) => (
        ne('Trying platform-specific paths for "debian" (and "ubuntu")'),
        [`/usr/lib/${t}-linux-gnu`, `/lib/${t}-linux-gnu`]
      ),
    )
    .with(
      { familyDistro: 'rhel' },
      () => (
        ne('Trying platform-specific paths for "rhel"'),
        ['/lib64', '/usr/lib64']
      ),
    )
    .otherwise(
      ({ familyDistro: t, arch: r, archFromUname: n }) => (
        ne(`Don't know any platform-specific paths for "${t}" on ${r} (${n})`),
        []
      ),
    )
}
async function Jl(e) {
  let t = 'grep -v "libssl.so.0"',
    r = await so(e)
  if (r) {
    ne(`Found libssl.so file using platform-specific paths: ${r}`)
    let o = oo(r)
    if ((ne(`The parsed libssl version is: ${o}`), o))
      return { libssl: o, strategy: 'libssl-specific-path' }
  }
  ne('Falling back to "ldconfig" and other generic paths')
  let n = await mr(
    `ldconfig -p | sed "s/.*=>s*//" | sed "s|.*/||" | grep libssl | sort | ${t}`,
  )
  if ((n || (n = await so(['/lib64', '/usr/lib64', '/lib'])), n)) {
    ne(`Found libssl.so file using "ldconfig" or other generic paths: ${n}`)
    let o = oo(n)
    if ((ne(`The parsed libssl version is: ${o}`), o))
      return { libssl: o, strategy: 'ldconfig' }
  }
  let i = await mr('openssl version -v')
  if (i) {
    ne(`Found openssl binary with version: ${i}`)
    let o = Ul(i)
    if ((ne(`The parsed openssl version is: ${o}`), o))
      return { libssl: o, strategy: 'openssl-binary' }
  }
  return ne("Couldn't find any version of libssl or OpenSSL in the system"), {}
}
async function so(e) {
  for (let t of e) {
    let r = await Gl(t)
    if (r) return r
  }
}
async function Gl(e) {
  try {
    return (await wn.default.readdir(e)).find(
      (r) => r.startsWith('libssl.so') && !r.startsWith('libssl.so.0'),
    )
  } catch (t) {
    if (t.code === 'ENOENT') return
    throw t
  }
}
async function ot() {
  let { binaryTarget: e } = await po()
  return e
}
function Wl(e) {
  return e.binaryTarget !== void 0
}
async function En() {
  let { memoized: e, ...t } = await po()
  return t
}
var cr = {}
async function po() {
  if (Wl(cr)) return Promise.resolve({ ...cr, memoized: !0 })
  let e = await uo(),
    t = Hl(e)
  return (cr = { ...e, binaryTarget: t }), { ...cr, memoized: !1 }
}
function Hl(e) {
  let {
    platform: t,
    arch: r,
    archFromUname: n,
    libssl: i,
    targetDistro: o,
    familyDistro: s,
    originalDistro: a,
  } = e
  t === 'linux' &&
    !['x64', 'arm64'].includes(r) &&
    Mt(
      `Prisma only officially supports Linux on amd64 (x86_64) and arm64 (aarch64) system architectures. If you are using your own custom Prisma engines, you can ignore this warning, as long as you've compiled the engines for your system architecture "${n}".`,
    )
  let l = '1.1.x'
  if (t === 'linux' && i === void 0) {
    let c = rt({ familyDistro: s })
      .with(
        { familyDistro: 'debian' },
        () =>
          "Please manually install OpenSSL via `apt-get update -y && apt-get install -y openssl` and try installing Prisma again. If you're running Prisma on Docker, add this command to your Dockerfile, or switch to an image that already has OpenSSL installed.",
      )
      .otherwise(
        () =>
          'Please manually install OpenSSL and try installing Prisma again.',
      )
    Mt(`Prisma failed to detect the libssl/openssl version to use, and may not work as expected. Defaulting to "openssl-${l}".
${c}`)
  }
  let u = 'debian'
  if (
    (t === 'linux' &&
      o === void 0 &&
      Mt(`Prisma doesn't know which engines to download for the Linux distro "${a}". Falling back to Prisma engines built "${u}".
Please report your experience by creating an issue at ${Ct(
        'https://github.com/prisma/prisma/issues',
      )} so we can add your distro to the list of known supported distros.`),
    t === 'darwin' && r === 'arm64')
  )
    return 'darwin-arm64'
  if (t === 'darwin') return 'darwin'
  if (t === 'win32') return 'windows'
  if (t === 'freebsd') return o
  if (t === 'openbsd') return 'openbsd'
  if (t === 'netbsd') return 'netbsd'
  if (t === 'linux' && o === 'nixos') return 'linux-nixos'
  if (t === 'linux' && r === 'arm64')
    return `${o === 'musl' ? 'linux-musl-arm64' : 'linux-arm64'}-openssl-${
      i || l
    }`
  if (t === 'linux' && r === 'arm') return `linux-arm-openssl-${i || l}`
  if (t === 'linux' && o === 'musl') {
    let c = 'linux-musl'
    return !i || mo(i) ? c : `${c}-openssl-${i}`
  }
  return t === 'linux' && o && i
    ? `${o}-openssl-${i}`
    : (t !== 'linux' &&
        Mt(
          `Prisma detected unknown OS "${t}" and may not work as expected. Defaulting to "linux".`,
        ),
      i ? `${u}-openssl-${i}` : o ? `${o}-openssl-${l}` : `${u}-openssl-${l}`)
}
async function zl(e) {
  try {
    return await e()
  } catch {
    return
  }
}
function mr(e) {
  return zl(async () => {
    let t = await jl(e)
    return ne(`Command "${e}" successfully returned "${t.stdout}"`), t.stdout
  })
}
async function Yl() {
  return typeof pr.default.machine == 'function'
    ? pr.default.machine()
    : (await mr('uname -m'))?.trim()
}
function mo(e) {
  return e.startsWith('1.')
}
var Pn = [
  'darwin',
  'darwin-arm64',
  'debian-openssl-1.0.x',
  'debian-openssl-1.1.x',
  'debian-openssl-3.0.x',
  'rhel-openssl-1.0.x',
  'rhel-openssl-1.1.x',
  'rhel-openssl-3.0.x',
  'linux-arm64-openssl-1.1.x',
  'linux-arm64-openssl-1.0.x',
  'linux-arm64-openssl-3.0.x',
  'linux-arm-openssl-1.1.x',
  'linux-arm-openssl-1.0.x',
  'linux-arm-openssl-3.0.x',
  'linux-musl',
  'linux-musl-openssl-3.0.x',
  'linux-musl-arm64-openssl-1.1.x',
  'linux-musl-arm64-openssl-3.0.x',
  'linux-nixos',
  'linux-static-x64',
  'linux-static-arm64',
  'windows',
  'freebsd11',
  'freebsd12',
  'freebsd13',
  'openbsd',
  'netbsd',
  'arm',
]
var Xl = A(Tn())
var O = A(require('path')),
  eu = A(Tn()),
  Cd = N('prisma:engines')
function go() {
  return O.default.join(__dirname, '../')
}
var Md = 'libquery-engine'
O.default.join(__dirname, '../query-engine-darwin')
O.default.join(__dirname, '../query-engine-darwin-arm64')
O.default.join(__dirname, '../query-engine-debian-openssl-1.0.x')
O.default.join(__dirname, '../query-engine-debian-openssl-1.1.x')
O.default.join(__dirname, '../query-engine-debian-openssl-3.0.x')
O.default.join(__dirname, '../query-engine-linux-static-x64')
O.default.join(__dirname, '../query-engine-linux-static-arm64')
O.default.join(__dirname, '../query-engine-rhel-openssl-1.0.x')
O.default.join(__dirname, '../query-engine-rhel-openssl-1.1.x')
O.default.join(__dirname, '../query-engine-rhel-openssl-3.0.x')
O.default.join(__dirname, '../libquery_engine-darwin.dylib.node')
O.default.join(__dirname, '../libquery_engine-darwin-arm64.dylib.node')
O.default.join(__dirname, '../libquery_engine-debian-openssl-1.0.x.so.node')
O.default.join(__dirname, '../libquery_engine-debian-openssl-1.1.x.so.node')
O.default.join(__dirname, '../libquery_engine-debian-openssl-3.0.x.so.node')
O.default.join(
  __dirname,
  '../libquery_engine-linux-arm64-openssl-1.0.x.so.node',
)
O.default.join(
  __dirname,
  '../libquery_engine-linux-arm64-openssl-1.1.x.so.node',
)
O.default.join(
  __dirname,
  '../libquery_engine-linux-arm64-openssl-3.0.x.so.node',
)
O.default.join(__dirname, '../libquery_engine-linux-musl.so.node')
O.default.join(__dirname, '../libquery_engine-linux-musl-openssl-3.0.x.so.node')
O.default.join(__dirname, '../libquery_engine-rhel-openssl-1.0.x.so.node')
O.default.join(__dirname, '../libquery_engine-rhel-openssl-1.1.x.so.node')
O.default.join(__dirname, '../libquery_engine-rhel-openssl-3.0.x.so.node')
O.default.join(__dirname, '../query_engine-windows.dll.node')
var vn = A(require('fs')),
  yo = N('chmodPlusX')
function Cn(e) {
  if (process.platform === 'win32') return
  let t = vn.default.statSync(e),
    r = t.mode | 64 | 8 | 1
  if (t.mode === r) {
    yo(`Execution permissions of ${e} are fine`)
    return
  }
  let n = r.toString(8).slice(-3)
  yo(`Have to call chmodPlusX on ${e}`), vn.default.chmodSync(e, n)
}
function Mn(e) {
  let t = e.e,
    r = (a) =>
      `Prisma cannot find the required \`${a}\` system library in your system`,
    n = t.message.includes('cannot open shared object file'),
    i = `Please refer to the documentation about Prisma's system requirements: ${Ct(
      'https://pris.ly/d/system-requirements',
    )}`,
    o = `Unable to require(\`${Oe(e.id)}\`).`,
    s = rt({ message: t.message, code: t.code })
      .with({ code: 'ENOENT' }, () => 'File does not exist.')
      .when(
        ({ message: a }) => n && a.includes('libz'),
        () => `${r('libz')}. Please install it and try again.`,
      )
      .when(
        ({ message: a }) => n && a.includes('libgcc_s'),
        () => `${r('libgcc_s')}. Please install it and try again.`,
      )
      .when(
        ({ message: a }) => n && a.includes('libssl'),
        () => {
          let a = e.platformInfo.libssl
            ? `openssl-${e.platformInfo.libssl}`
            : 'openssl'
          return `${r('libssl')}. Please install ${a} and try again.`
        },
      )
      .when(
        ({ message: a }) => a.includes('GLIBC'),
        () =>
          `Prisma has detected an incompatible version of the \`glibc\` C standard library installed in your system. This probably means your system may be too old to run Prisma. ${i}`,
      )
      .when(
        ({ message: a }) =>
          e.platformInfo.platform === 'linux' && a.includes('symbol not found'),
        () =>
          `The Prisma engines are not compatible with your system ${e.platformInfo.originalDistro} on (${e.platformInfo.archFromUname}) which uses the \`${e.platformInfo.binaryTarget}\` binaryTarget by default. ${i}`,
      )
      .otherwise(
        () =>
          `The Prisma engines do not seem to be compatible with your system. ${i}`,
      )
  return `${o}
${s}

Details: ${t.message}`
}
var At = A(require('path'))
function An(e) {
  return At.default.sep === At.default.posix.sep
    ? e
    : e.split(At.default.sep).join(At.default.posix.sep)
}
var xo = A(Sn())
function Rn(e) {
  return String(new Fn(e))
}
var Fn = class {
  constructor(t) {
    this.config = t
  }
  toString() {
    let { config: t } = this,
      r = t.provider.fromEnvVar
        ? `env("${t.provider.fromEnvVar}")`
        : t.provider.value,
      n = JSON.parse(
        JSON.stringify({ provider: r, binaryTargets: tu(t.binaryTargets) }),
      )
    return `generator ${t.name} {
${(0, xo.default)(ru(n), 2)}
}`
  }
}
function tu(e) {
  let t
  if (e.length > 0) {
    let r = e.find((n) => n.fromEnvVar !== null)
    r
      ? (t = `env("${r.fromEnvVar}")`)
      : (t = e.map((n) => (n.native ? 'native' : n.value)))
  } else t = void 0
  return t
}
function ru(e) {
  let t = Object.keys(e).reduce((r, n) => Math.max(r, n.length), 0)
  return Object.entries(e).map(([r, n]) => `${r.padEnd(t)} = ${nu(n)}`).join(`
`)
}
function nu(e) {
  return JSON.parse(
    JSON.stringify(e, (t, r) =>
      Array.isArray(r)
        ? `[${r.map((n) => JSON.stringify(n)).join(', ')}]`
        : JSON.stringify(r),
    ),
  )
}
var Ft = {}
bt(Ft, {
  error: () => su,
  info: () => ou,
  log: () => iu,
  query: () => au,
  should: () => bo,
  tags: () => St,
  warn: () => kn,
})
var St = {
    error: ce('prisma:error'),
    warn: he('prisma:warn'),
    info: De('prisma:info'),
    query: et('prisma:query'),
  },
  bo = { warn: () => !process.env.PRISMA_DISABLE_WARNINGS }
function iu(...e) {
  console.log(...e)
}
function kn(e, ...t) {
  bo.warn() && console.warn(`${St.warn} ${e}`, ...t)
}
function ou(e, ...t) {
  console.info(`${St.info} ${e}`, ...t)
}
function su(e, ...t) {
  console.error(`${St.error} ${e}`, ...t)
}
function au(e, ...t) {
  console.log(`${St.query} ${e}`, ...t)
}
function pe(e, t) {
  throw new Error(t)
}
function Dn(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t)
}
var _n = (e, t) => e.reduce((r, n) => ((r[t(n)] = n), r), {})
function st(e, t) {
  let r = {}
  for (let n of Object.keys(e)) r[n] = t(e[n], n)
  return r
}
function In(e, t) {
  if (e.length === 0) return
  let r = e[0]
  for (let n = 1; n < e.length; n++) t(r, e[n]) < 0 && (r = e[n])
  return r
}
function ee(e, t) {
  Object.defineProperty(e, 'name', { value: t, configurable: !0 })
}
var vo = new Set(),
  Nn = (e, t, ...r) => {
    vo.has(e) || (vo.add(e), kn(t, ...r))
  }
var z = class extends Error {
  constructor(r, { code: n, clientVersion: i, meta: o, batchRequestIdx: s }) {
    super(r)
    ;(this.name = 'PrismaClientKnownRequestError'),
      (this.code = n),
      (this.clientVersion = i),
      (this.meta = o),
      Object.defineProperty(this, 'batchRequestIdx', {
        value: s,
        enumerable: !1,
        writable: !0,
      })
  }
  get [Symbol.toStringTag]() {
    return 'PrismaClientKnownRequestError'
  }
}
ee(z, 'PrismaClientKnownRequestError')
var Me = class extends z {
  constructor(t, r) {
    super(t, { code: 'P2025', clientVersion: r }), (this.name = 'NotFoundError')
  }
}
ee(Me, 'NotFoundError')
var _ = class extends Error {
  constructor(r, n, i) {
    super(r)
    ;(this.name = 'PrismaClientInitializationError'),
      (this.clientVersion = n),
      (this.errorCode = i),
      Error.captureStackTrace(_)
  }
  get [Symbol.toStringTag]() {
    return 'PrismaClientInitializationError'
  }
}
ee(_, 'PrismaClientInitializationError')
var se = class extends Error {
  constructor(r, n) {
    super(r)
    ;(this.name = 'PrismaClientRustPanicError'), (this.clientVersion = n)
  }
  get [Symbol.toStringTag]() {
    return 'PrismaClientRustPanicError'
  }
}
ee(se, 'PrismaClientRustPanicError')
var Y = class extends Error {
  constructor(r, { clientVersion: n, batchRequestIdx: i }) {
    super(r)
    ;(this.name = 'PrismaClientUnknownRequestError'),
      (this.clientVersion = n),
      Object.defineProperty(this, 'batchRequestIdx', {
        value: i,
        writable: !0,
        enumerable: !1,
      })
  }
  get [Symbol.toStringTag]() {
    return 'PrismaClientUnknownRequestError'
  }
}
ee(Y, 'PrismaClientUnknownRequestError')
var te = class extends Error {
  constructor(r, { clientVersion: n }) {
    super(r)
    this.name = 'PrismaClientValidationError'
    this.clientVersion = n
  }
  get [Symbol.toStringTag]() {
    return 'PrismaClientValidationError'
  }
}
ee(te, 'PrismaClientValidationError')
var at = class {
  constructor(t) {
    this._engine = t
  }
  prometheus(t) {
    return this._engine.metrics({ format: 'prometheus', ...t })
  }
  json(t) {
    return this._engine.metrics({ format: 'json', ...t })
  }
}
function Rt(e) {
  let t
  return {
    get() {
      return t || (t = { value: e() }), t.value
    },
  }
}
function Co(e, t) {
  let r = Rt(() => cu(t))
  Object.defineProperty(e, 'dmmf', { get: () => r.get() })
}
function cu(e) {
  return {
    datamodel: { models: Ln(e.models), enums: Ln(e.enums), types: Ln(e.types) },
  }
}
function Ln(e) {
  return Object.entries(e).map(([t, r]) => ({ name: t, ...r }))
}
var $a = require('async_hooks'),
  qa = require('events'),
  ja = A(require('fs')),
  Jt = A(require('path'))
var K = class {
  constructor(t, r) {
    if (t.length - 1 !== r.length)
      throw t.length === 0
        ? new TypeError('Expected at least 1 string')
        : new TypeError(
            `Expected ${t.length} strings to have ${t.length - 1} values`,
          )
    let n = r.reduce((s, a) => s + (a instanceof K ? a.values.length : 1), 0)
    ;(this.values = new Array(n)),
      (this.strings = new Array(n + 1)),
      (this.strings[0] = t[0])
    let i = 0,
      o = 0
    for (; i < r.length; ) {
      let s = r[i++],
        a = t[i]
      if (s instanceof K) {
        this.strings[o] += s.strings[0]
        let l = 0
        for (; l < s.values.length; )
          (this.values[o++] = s.values[l++]), (this.strings[o] = s.strings[l])
        this.strings[o] += a
      } else (this.values[o++] = s), (this.strings[o] = a)
    }
  }
  get text() {
    let t = 1,
      r = this.strings[0]
    for (; t < this.strings.length; ) r += `$${t}${this.strings[t++]}`
    return r
  }
  get sql() {
    let t = 1,
      r = this.strings[0]
    for (; t < this.strings.length; ) r += `?${this.strings[t++]}`
    return r
  }
  inspect() {
    return { text: this.text, sql: this.sql, values: this.values }
  }
}
function Mo(e, t = ',', r = '', n = '') {
  if (e.length === 0)
    throw new TypeError(
      'Expected `join([])` to be called with an array of multiple elements, but got an empty array',
    )
  return new K([r, ...Array(e.length - 1).fill(t), n], e)
}
function $n(e) {
  return new K([e], [])
}
var Ao = $n('')
function qn(e, ...t) {
  return new K(e, t)
}
function kt(e) {
  return {
    getKeys() {
      return Object.keys(e)
    },
    getPropertyValue(t) {
      return e[t]
    },
  }
}
function me(e, t) {
  return {
    getKeys() {
      return [e]
    },
    getPropertyValue() {
      return t()
    },
  }
}
var xe = class {
  constructor() {
    this._map = new Map()
  }
  get(t) {
    return this._map.get(t)?.value
  }
  set(t, r) {
    this._map.set(t, { value: r })
  }
  getOrCreate(t, r) {
    let n = this._map.get(t)
    if (n) return n.value
    let i = r()
    return this.set(t, i), i
  }
}
function Ge(e) {
  let t = new xe()
  return {
    getKeys() {
      return e.getKeys()
    },
    getPropertyValue(r) {
      return t.getOrCreate(r, () => e.getPropertyValue(r))
    },
    getPropertyDescriptor(r) {
      return e.getPropertyDescriptor?.(r)
    },
  }
}
var Ro = require('util')
var gr = { enumerable: !0, configurable: !0, writable: !0 }
function yr(e) {
  let t = new Set(e)
  return {
    getOwnPropertyDescriptor: () => gr,
    has: (r, n) => t.has(n),
    set: (r, n, i) => t.add(n) && Reflect.set(r, n, i),
    ownKeys: () => [...t],
  }
}
var So = Symbol.for('nodejs.util.inspect.custom')
function be(e, t) {
  let r = pu(t),
    n = new Set(),
    i = new Proxy(e, {
      get(o, s) {
        if (n.has(s)) return o[s]
        let a = r.get(s)
        return a ? a.getPropertyValue(s) : o[s]
      },
      has(o, s) {
        if (n.has(s)) return !0
        let a = r.get(s)
        return a ? a.has?.(s) ?? !0 : Reflect.has(o, s)
      },
      ownKeys(o) {
        let s = Fo(Reflect.ownKeys(o), r),
          a = Fo(Array.from(r.keys()), r)
        return [...new Set([...s, ...a, ...n])]
      },
      set(o, s, a) {
        return r.get(s)?.getPropertyDescriptor?.(s)?.writable === !1
          ? !1
          : (n.add(s), Reflect.set(o, s, a))
      },
      getOwnPropertyDescriptor(o, s) {
        let a = Reflect.getOwnPropertyDescriptor(o, s)
        if (a && !a.configurable) return a
        let l = r.get(s)
        return l
          ? l.getPropertyDescriptor
            ? { ...gr, ...l?.getPropertyDescriptor(s) }
            : gr
          : a
      },
      defineProperty(o, s, a) {
        return n.add(s), Reflect.defineProperty(o, s, a)
      },
    })
  return (
    (i[So] = function (o, s, a = Ro.inspect) {
      let l = { ...this }
      return delete l[So], a(l, s)
    }),
    i
  )
}
function pu(e) {
  let t = new Map()
  for (let r of e) {
    let n = r.getKeys()
    for (let i of n) t.set(i, r)
  }
  return t
}
function Fo(e, t) {
  return e.filter((r) => t.get(r)?.has?.(r) ?? !0)
}
function Ot(e) {
  return {
    getKeys() {
      return e
    },
    has() {
      return !1
    },
    getPropertyValue() {},
  }
}
function ko({ error: e, user_facing_error: t }, r) {
  return t.error_code
    ? new z(t.message, {
        code: t.error_code,
        clientVersion: r,
        meta: t.meta,
        batchRequestIdx: t.batch_request_idx,
      })
    : new Y(e, { clientVersion: r, batchRequestIdx: t.batch_request_idx })
}
var hr = class {}
var No = A(require('fs')),
  Dt = A(require('path'))
function xr(e) {
  let { runtimeBinaryTarget: t } = e
  return `Add "${t}" to \`binaryTargets\` in the "schema.prisma" file and run \`prisma generate\` after saving it:

${mu(e)}`
}
function mu(e) {
  let { generator: t, generatorBinaryTargets: r, runtimeBinaryTarget: n } = e,
    i = { fromEnvVar: null, value: n },
    o = [...r, i]
  return Rn({ ...t, binaryTargets: o })
}
function _e(e) {
  let { runtimeBinaryTarget: t } = e
  return `Prisma Client could not locate the Query Engine for runtime "${t}".`
}
function Ie(e) {
  let { searchedLocations: t } = e
  return `The following locations have been searched:
${[...new Set(t)].map((i) => `  ${i}`).join(`
`)}`
}
function Oo(e) {
  let { runtimeBinaryTarget: t } = e
  return `${_e(e)}

This happened because \`binaryTargets\` have been pinned, but the actual deployment also required "${t}".
${xr(e)}

${Ie(e)}`
}
function br(e) {
  return `We would appreciate if you could take the time to share some information with us.
Please help us by answering a few questions: https://pris.ly/${e}`
}
function Do(e) {
  let { queryEngineName: t } = e
  return `${_e(e)}

This is likely caused by a bundler that has not copied "${t}" next to the resulting bundle.
Ensure that "${t}" has been copied next to the bundle or in "${
    e.expectedLocation
  }".

${br('engine-not-found-bundler-investigation')}

${Ie(e)}`
}
function _o(e) {
  let { runtimeBinaryTarget: t, generatorBinaryTargets: r } = e,
    n = r.find((i) => i.native)
  return `${_e(e)}

This happened because Prisma Client was generated for "${
    n?.value ?? 'unknown'
  }", but the actual deployment required "${t}".
${xr(e)}

${Ie(e)}`
}
function Io(e) {
  let { queryEngineName: t } = e
  return `${_e(e)}

This is likely caused by tooling that has not copied "${t}" to the deployment folder.
Ensure that you ran \`prisma generate\` and that "${t}" has been copied to "${
    e.expectedLocation
  }".

${br('engine-not-found-tooling-investigation')}

${Ie(e)}`
}
var du = N('prisma:client:engines:resolveEnginePath'),
  fu = () => new RegExp('runtime[\\\\/]library\\.m?js$')
async function Lo(e, t) {
  let r =
    {
      binary: process.env.PRISMA_QUERY_ENGINE_BINARY,
      library: process.env.PRISMA_QUERY_ENGINE_LIBRARY,
    }[e] ?? t.prismaPath
  if (r !== void 0) return r
  let { enginePath: n, searchedLocations: i } = await gu(e, t)
  if (
    (du('enginePath', n), n !== void 0 && e === 'binary' && Cn(n), n !== void 0)
  )
    return (t.prismaPath = n)
  let o = await ot(),
    s = t.generator?.binaryTargets ?? [],
    a = s.some((m) => m.native),
    l = !s.some((m) => m.value === o),
    u = __filename.match(fu()) === null,
    c = {
      searchedLocations: i,
      generatorBinaryTargets: s,
      generator: t.generator,
      runtimeBinaryTarget: o,
      queryEngineName: $o(e, o),
      expectedLocation: Dt.default.relative(process.cwd(), t.dirname),
    },
    p
  throw (
    (a && l ? (p = _o(c)) : l ? (p = Oo(c)) : u ? (p = Do(c)) : (p = Io(c)),
    new _(p, t.clientVersion))
  )
}
async function gu(engineType, config) {
  let binaryTarget = await ot(),
    searchedLocations = [],
    dirname = eval('__dirname'),
    searchLocations = [
      config.dirname,
      Dt.default.resolve(dirname, '..'),
      config.generator?.output?.value ?? dirname,
      Dt.default.resolve(dirname, '../../../.prisma/client'),
      '/tmp/prisma-engines',
      config.cwd,
    ]
  __filename.includes('resolveEnginePath') && searchLocations.push(go())
  for (let e of searchLocations) {
    let t = $o(engineType, binaryTarget),
      r = Dt.default.join(e, t)
    if ((searchedLocations.push(e), No.default.existsSync(r)))
      return { enginePath: r, searchedLocations }
  }
  return { enginePath: void 0, searchedLocations }
}
function $o(e, t) {
  return e === 'library'
    ? yn(t, 'fs')
    : `query-engine-${t}${t === 'windows' ? '.exe' : ''}`
}
function qo(e, t) {
  return {
    batch: e,
    transaction:
      t?.kind === 'batch'
        ? { isolationLevel: t.options.isolationLevel }
        : void 0,
  }
}
var jn = A(On())
function jo(e) {
  return e
    ? e
        .replace(/".*"/g, '"X"')
        .replace(/[\s:\[]([+-]?([0-9]*[.])?[0-9]+)/g, (t) => `${t[0]}5`)
    : ''
}
function Bo(e) {
  return e
    .split(
      `
`,
    )
    .map((t) =>
      t
        .replace(
          /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)\s*/,
          '',
        )
        .replace(/\+\d+\s*ms$/, ''),
    ).join(`
`)
}
var Vo = A(To())
function Ko({
  title: e,
  user: t = 'prisma',
  repo: r = 'prisma',
  template: n = 'bug_report.md',
  body: i,
}) {
  return (0, Vo.default)({ user: t, repo: r, template: n, title: e, body: i })
}
function Uo({
  version: e,
  platform: t,
  title: r,
  description: n,
  engineVersion: i,
  database: o,
  query: s,
}) {
  let a = ki(6e3 - (s?.length ?? 0)),
    l = Bo((0, jn.default)(a)),
    u = n
      ? `# Description
\`\`\`
${n}
\`\`\``
      : '',
    c = (0,
    jn.default)(`Hi Prisma Team! My Prisma Client just crashed. This is the report:
## Versions

| Name            | Version            |
|-----------------|--------------------|
| Node            | ${process.version?.padEnd(19)}| 
| OS              | ${t?.padEnd(19)}|
| Prisma Client   | ${e?.padEnd(19)}|
| Query Engine    | ${i?.padEnd(19)}|
| Database        | ${o?.padEnd(19)}|

${u}

## Logs
\`\`\`
${l}
\`\`\`

## Client Snippet
\`\`\`ts
// PLEASE FILL YOUR CODE SNIPPET HERE
\`\`\`

## Schema
\`\`\`prisma
// PLEASE ADD YOUR SCHEMA HERE IF POSSIBLE
\`\`\`

## Prisma Engine Query
\`\`\`
${s ? jo(s) : ''}
\`\`\`
`),
    p = Ko({ title: r, body: c })
  return `${r}

This is a non-recoverable error which probably happens when the Prisma Query Engine has a panic.

${X(p)}

If you want the Prisma team to look into it, please open the link above \u{1F64F}
To increase the chance of success, please post your schema and a snippet of
how you used Prisma Client in the issue. 
`
}
var Ho = A(require('fs'))
function Qo(e) {
  if (e?.kind === 'itx') return e.options.id
}
var Vn = A(require('os')),
  Jo = A(require('path'))
var Bn = Symbol('PrismaLibraryEngineCache')
function yu() {
  let e = globalThis
  return e[Bn] === void 0 && (e[Bn] = {}), e[Bn]
}
function hu(e) {
  let t = yu()
  if (t[e] !== void 0) return t[e]
  let r = Jo.default.toNamespacedPath(e),
    n = { exports: {} },
    i = 0
  return (
    process.platform !== 'win32' &&
      (i =
        Vn.default.constants.dlopen.RTLD_LAZY |
        Vn.default.constants.dlopen.RTLD_DEEPBIND),
    process.dlopen(n, r, i),
    (t[e] = n.exports),
    n.exports
  )
}
var wr = class {
  constructor(t) {
    this.config = t
  }
  async loadLibrary() {
    let t = await En(),
      r = await Lo('library', this.config)
    try {
      return this.config.tracingHelper.runInChildSpan(
        { name: 'loadLibrary', internal: !0 },
        () => hu(r),
      )
    } catch (n) {
      let i = Mn({ e: n, platformInfo: t, id: r })
      throw new _(i, this.config.clientVersion)
    }
  }
}
var Ae = N('prisma:client:libraryEngine')
function xu(e) {
  return e.item_type === 'query' && 'query' in e
}
function bu(e) {
  return 'level' in e ? e.level === 'error' && e.message === 'PANIC' : !1
}
var Go = [...Pn, 'native'],
  Wo = 0,
  _t = class extends hr {
    constructor(r, n = new wr(r)) {
      super()
      try {
        this.datamodel = Ho.default.readFileSync(r.datamodelPath, 'utf-8')
      } catch (i) {
        throw i.stack.match(/\/\.next|\/next@|\/next\//)
          ? new _(
              `Your schema.prisma could not be found, and we detected that you are using Next.js.
Find out why and learn how to fix this: https://pris.ly/d/schema-not-found-nextjs`,
              r.clientVersion,
            )
          : r.isBundled === !0
          ? new _(
              'Prisma Client could not find its `schema.prisma`. This is likely caused by a bundling step, which leads to `schema.prisma` not being copied near the resulting bundle. We would appreciate if you could take the time to share some information with us.\nPlease help us by answering a few questions: https://pris.ly/bundler-investigation-error',
              r.clientVersion,
            )
          : i
      }
      ;(this.config = r),
        (this.libraryStarted = !1),
        (this.logQueries = r.logQueries ?? !1),
        (this.logLevel = r.logLevel ?? 'error'),
        (this.libraryLoader = n),
        (this.logEmitter = r.logEmitter),
        (this.datasourceOverrides = r.datasources
          ? this.convertDatasources(r.datasources)
          : {}),
        r.enableDebugLogs && (this.logLevel = 'debug'),
        (this.libraryInstantiationPromise = this.instantiateLibrary()),
        this.checkForTooManyEngines()
    }
    checkForTooManyEngines() {
      Wo === 10 &&
        console.warn(
          `${he(
            'warn(prisma-client)',
          )} This is the 10th instance of Prisma Client being started. Make sure this is intentional.`,
        )
    }
    async transaction(r, n, i) {
      await this.start()
      let o = JSON.stringify(n),
        s
      if (r === 'start') {
        let l = JSON.stringify({
          max_wait: i?.maxWait ?? 2e3,
          timeout: i?.timeout ?? 5e3,
          isolation_level: i?.isolationLevel,
        })
        s = await this.engine?.startTransaction(l, o)
      } else
        r === 'commit'
          ? (s = await this.engine?.commitTransaction(i.id, o))
          : r === 'rollback' &&
            (s = await this.engine?.rollbackTransaction(i.id, o))
      let a = this.parseEngineResponse(s)
      if (a.error_code)
        throw new z(a.message, {
          code: a.error_code,
          clientVersion: this.config.clientVersion,
          meta: a.meta,
        })
      return a
    }
    async instantiateLibrary() {
      if ((Ae('internalSetup'), this.libraryInstantiationPromise))
        return this.libraryInstantiationPromise
      gn(),
        (this.platform = await this.getPlatform()),
        await this.loadEngine(),
        this.version()
    }
    async getPlatform() {
      if (this.platform) return this.platform
      let r = await ot()
      if (!Go.includes(r))
        throw new _(
          `Unknown ${ce('PRISMA_QUERY_ENGINE_LIBRARY')} ${ce(
            re(r),
          )}. Possible binaryTargets: ${Qe(
            Go.join(', '),
          )} or a path to the query engine library.
You may have to run ${Qe('prisma generate')} for your changes to take effect.`,
          this.config.clientVersion,
        )
      return r
    }
    parseEngineResponse(r) {
      if (!r)
        throw new Y('Response from the Engine was empty', {
          clientVersion: this.config.clientVersion,
        })
      try {
        return JSON.parse(r)
      } catch {
        throw new Y('Unable to JSON.parse response from engine', {
          clientVersion: this.config.clientVersion,
        })
      }
    }
    convertDatasources(r) {
      let n = Object.create(null)
      for (let { name: i, url: o } of r) n[i] = o
      return n
    }
    async loadEngine() {
      if (!this.engine) {
        this.QueryEngineConstructor ||
          ((this.library = await this.libraryLoader.loadLibrary()),
          (this.QueryEngineConstructor = this.library.QueryEngine))
        try {
          let r = new WeakRef(this)
          ;(this.engine = new this.QueryEngineConstructor(
            {
              datamodel: this.datamodel,
              env: process.env,
              logQueries: this.config.logQueries ?? !1,
              ignoreEnvVarErrors: !0,
              datasourceOverrides: this.datasourceOverrides,
              logLevel: this.logLevel,
              configDir: this.config.cwd,
              engineProtocol: 'json',
            },
            (n) => {
              r.deref()?.logger(n)
            },
          )),
            Wo++
        } catch (r) {
          let n = r,
            i = this.parseInitError(n.message)
          throw typeof i == 'string'
            ? n
            : new _(i.message, this.config.clientVersion, i.error_code)
        }
      }
    }
    logger(r) {
      let n = this.parseEngineResponse(r)
      if (!!n) {
        if ('span' in n) {
          this.config.tracingHelper.createEngineSpan(n)
          return
        }
        ;(n.level = n?.level.toLowerCase() ?? 'unknown'),
          xu(n)
            ? this.logEmitter.emit('query', {
                timestamp: new Date(),
                query: n.query,
                params: n.params,
                duration: Number(n.duration_ms),
                target: n.module_path,
              })
            : bu(n)
            ? (this.loggerRustPanic = new se(
                this.getErrorMessageWithLink(
                  `${n.message}: ${n.reason} in ${n.file}:${n.line}:${n.column}`,
                ),
                this.config.clientVersion,
              ))
            : this.logEmitter.emit(n.level, {
                timestamp: new Date(),
                message: n.message,
                target: n.module_path,
              })
      }
    }
    getErrorMessageWithLink(r) {
      return Uo({
        platform: this.platform,
        title: r,
        version: this.config.clientVersion,
        engineVersion: this.versionInfo?.commit,
        database: this.config.activeProvider,
        query: this.lastQuery,
      })
    }
    parseInitError(r) {
      try {
        return JSON.parse(r)
      } catch {}
      return r
    }
    parseRequestError(r) {
      try {
        return JSON.parse(r)
      } catch {}
      return r
    }
    on(r, n) {
      if (r === 'beforeExit')
        throw new Error(
          '"beforeExit" hook is not applicable to the library engine since Prisma 5.0.0, it is only relevant and implemented for the binary engine. Please add your event listener to the `process` object directly instead.',
        )
      this.logEmitter.on(r, n)
    }
    async start() {
      if (
        (await this.libraryInstantiationPromise,
        await this.libraryStoppingPromise,
        this.libraryStartingPromise)
      )
        return (
          Ae(
            `library already starting, this.libraryStarted: ${this.libraryStarted}`,
          ),
          this.libraryStartingPromise
        )
      if (this.libraryStarted) return
      let r = async () => {
        Ae('library starting')
        try {
          let n = { traceparent: this.config.tracingHelper.getTraceParent() }
          await this.engine?.connect(JSON.stringify(n)),
            (this.libraryStarted = !0),
            Ae('library started')
        } catch (n) {
          let i = this.parseInitError(n.message)
          throw typeof i == 'string'
            ? n
            : new _(i.message, this.config.clientVersion, i.error_code)
        } finally {
          this.libraryStartingPromise = void 0
        }
      }
      return (
        (this.libraryStartingPromise = this.config.tracingHelper.runInChildSpan(
          'connect',
          r,
        )),
        this.libraryStartingPromise
      )
    }
    async stop() {
      if (
        (await this.libraryStartingPromise,
        await this.executingQueryPromise,
        this.libraryStoppingPromise)
      )
        return Ae('library is already stopping'), this.libraryStoppingPromise
      if (!this.libraryStarted) return
      let r = async () => {
        await new Promise((i) => setTimeout(i, 5)), Ae('library stopping')
        let n = { traceparent: this.config.tracingHelper.getTraceParent() }
        await this.engine?.disconnect(JSON.stringify(n)),
          (this.libraryStarted = !1),
          (this.libraryStoppingPromise = void 0),
          Ae('library stopped')
      }
      return (
        (this.libraryStoppingPromise = this.config.tracingHelper.runInChildSpan(
          'disconnect',
          r,
        )),
        this.libraryStoppingPromise
      )
    }
    version() {
      return (
        (this.versionInfo = this.library?.version()),
        this.versionInfo?.version ?? 'unknown'
      )
    }
    debugPanic(r) {
      return this.library?.debugPanic(r)
    }
    async request(r, { traceparent: n, interactiveTransaction: i }) {
      Ae(`sending request, this.libraryStarted: ${this.libraryStarted}`)
      let o = JSON.stringify({ traceparent: n }),
        s = JSON.stringify(r)
      try {
        await this.start(),
          (this.executingQueryPromise = this.engine?.query(s, o, i?.id)),
          (this.lastQuery = s)
        let a = this.parseEngineResponse(await this.executingQueryPromise)
        if (a.errors)
          throw a.errors.length === 1
            ? this.buildQueryError(a.errors[0])
            : new Y(JSON.stringify(a.errors), {
                clientVersion: this.config.clientVersion,
              })
        if (this.loggerRustPanic) throw this.loggerRustPanic
        return { data: a, elapsed: 0 }
      } catch (a) {
        if (a instanceof _) throw a
        if (a.code === 'GenericFailure' && a.message?.startsWith('PANIC:'))
          throw new se(
            this.getErrorMessageWithLink(a.message),
            this.config.clientVersion,
          )
        let l = this.parseRequestError(a.message)
        throw typeof l == 'string'
          ? a
          : new Y(
              `${l.message}
${l.backtrace}`,
              { clientVersion: this.config.clientVersion },
            )
      }
    }
    async requestBatch(r, { transaction: n, traceparent: i }) {
      Ae('requestBatch')
      let o = qo(r, n)
      await this.start(),
        (this.lastQuery = JSON.stringify(o)),
        (this.executingQueryPromise = this.engine.query(
          this.lastQuery,
          JSON.stringify({ traceparent: i }),
          Qo(n),
        ))
      let s = await this.executingQueryPromise,
        a = this.parseEngineResponse(s)
      if (a.errors)
        throw a.errors.length === 1
          ? this.buildQueryError(a.errors[0])
          : new Y(JSON.stringify(a.errors), {
              clientVersion: this.config.clientVersion,
            })
      let { batchResult: l, errors: u } = a
      if (Array.isArray(l))
        return l.map((c) =>
          c.errors && c.errors.length > 0
            ? this.loggerRustPanic ?? this.buildQueryError(c.errors[0])
            : { data: c, elapsed: 0 },
        )
      throw u && u.length === 1
        ? new Error(u[0].error)
        : new Error(JSON.stringify(a))
    }
    buildQueryError(r) {
      return r.user_facing_error.is_panic
        ? new se(
            this.getErrorMessageWithLink(r.user_facing_error.message),
            this.config.clientVersion,
          )
        : ko(r, this.config.clientVersion)
    }
    async metrics(r) {
      await this.start()
      let n = await this.engine.metrics(JSON.stringify(r))
      return r.format === 'prometheus' ? n : this.parseEngineResponse(n)
    }
  }
var lt = class {
  constructor(t = 0, r) {
    this.context = r
    this.lines = []
    this.currentLine = ''
    this.currentIndent = 0
    this.currentIndent = t
  }
  write(t) {
    return typeof t == 'string' ? (this.currentLine += t) : t.write(this), this
  }
  writeJoined(t, r) {
    let n = r.length - 1
    for (let i = 0; i < r.length; i++)
      this.write(r[i]), i !== n && this.write(t)
    return this
  }
  writeLine(t) {
    return this.write(t).newLine()
  }
  newLine() {
    this.lines.push(this.indentedCurrentLine()),
      (this.currentLine = ''),
      (this.marginSymbol = void 0)
    let t = this.afterNextNewLineCallback
    return (this.afterNextNewLineCallback = void 0), t?.(), this
  }
  withIndent(t) {
    return this.indent(), t(this), this.unindent(), this
  }
  afterNextNewline(t) {
    return (this.afterNextNewLineCallback = t), this
  }
  indent() {
    return this.currentIndent++, this
  }
  unindent() {
    return this.currentIndent > 0 && this.currentIndent--, this
  }
  addMarginSymbol(t) {
    return (this.marginSymbol = t), this
  }
  toString() {
    return this.lines.concat(this.indentedCurrentLine()).join(`
`)
  }
  getCurrentLineLength() {
    return this.currentLine.length
  }
  indentedCurrentLine() {
    let t = this.currentLine.padStart(
      this.currentLine.length + 2 * this.currentIndent,
    )
    return this.marginSymbol ? this.marginSymbol + t.slice(1) : t
  }
}
var Er = Symbol(),
  Kn = new WeakMap(),
  Se = class {
    constructor(t) {
      t === Er
        ? Kn.set(this, `Prisma.${this._getName()}`)
        : Kn.set(
            this,
            `new Prisma.${this._getNamespace()}.${this._getName()}()`,
          )
    }
    _getName() {
      return this.constructor.name
    }
    toString() {
      return Kn.get(this)
    }
  },
  It = class extends Se {
    _getNamespace() {
      return 'NullTypes'
    }
  },
  Nt = class extends It {}
Un(Nt, 'DbNull')
var Lt = class extends It {}
Un(Lt, 'JsonNull')
var $t = class extends It {}
Un($t, 'AnyNull')
var Pr = {
  classes: { DbNull: Nt, JsonNull: Lt, AnyNull: $t },
  instances: { DbNull: new Nt(Er), JsonNull: new Lt(Er), AnyNull: new $t(Er) },
}
function Un(e, t) {
  Object.defineProperty(e, 'name', { value: t, configurable: !0 })
}
function ut(e) {
  return (
    e instanceof Date || Object.prototype.toString.call(e) === '[object Date]'
  )
}
function Tr(e) {
  return e.toString() !== 'Invalid Date'
}
var ct = 9e15,
  qe = 1e9,
  Qn = '0123456789abcdef',
  Cr =
    '2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058',
  Mr =
    '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789',
  Jn = {
    precision: 20,
    rounding: 4,
    modulo: 1,
    toExpNeg: -7,
    toExpPos: 21,
    minE: -ct,
    maxE: ct,
    crypto: !1,
  },
  Xo,
  Fe,
  E = !0,
  Sr = '[DecimalError] ',
  $e = Sr + 'Invalid argument: ',
  es = Sr + 'Precision limit exceeded',
  ts = Sr + 'crypto unavailable',
  rs = '[object Decimal]',
  Z = Math.floor,
  $ = Math.pow,
  wu = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
  Eu = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
  Pu = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,
  ns = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
  fe = 1e7,
  w = 7,
  Tu = 9007199254740991,
  vu = Cr.length - 1,
  Gn = Mr.length - 1,
  d = { toStringTag: rs }
d.absoluteValue = d.abs = function () {
  var e = new this.constructor(this)
  return e.s < 0 && (e.s = 1), h(e)
}
d.ceil = function () {
  return h(new this.constructor(this), this.e + 1, 2)
}
d.clampedTo = d.clamp = function (e, t) {
  var r,
    n = this,
    i = n.constructor
  if (((e = new i(e)), (t = new i(t)), !e.s || !t.s)) return new i(NaN)
  if (e.gt(t)) throw Error($e + t)
  return (r = n.cmp(e)), r < 0 ? e : n.cmp(t) > 0 ? t : new i(n)
}
d.comparedTo = d.cmp = function (e) {
  var t,
    r,
    n,
    i,
    o = this,
    s = o.d,
    a = (e = new o.constructor(e)).d,
    l = o.s,
    u = e.s
  if (!s || !a)
    return !l || !u ? NaN : l !== u ? l : s === a ? 0 : !s ^ (l < 0) ? 1 : -1
  if (!s[0] || !a[0]) return s[0] ? l : a[0] ? -u : 0
  if (l !== u) return l
  if (o.e !== e.e) return (o.e > e.e) ^ (l < 0) ? 1 : -1
  for (n = s.length, i = a.length, t = 0, r = n < i ? n : i; t < r; ++t)
    if (s[t] !== a[t]) return (s[t] > a[t]) ^ (l < 0) ? 1 : -1
  return n === i ? 0 : (n > i) ^ (l < 0) ? 1 : -1
}
d.cosine = d.cos = function () {
  var e,
    t,
    r = this,
    n = r.constructor
  return r.d
    ? r.d[0]
      ? ((e = n.precision),
        (t = n.rounding),
        (n.precision = e + Math.max(r.e, r.sd()) + w),
        (n.rounding = 1),
        (r = Cu(n, ls(n, r))),
        (n.precision = e),
        (n.rounding = t),
        h(Fe == 2 || Fe == 3 ? r.neg() : r, e, t, !0))
      : new n(1)
    : new n(NaN)
}
d.cubeRoot = d.cbrt = function () {
  var e,
    t,
    r,
    n,
    i,
    o,
    s,
    a,
    l,
    u,
    c = this,
    p = c.constructor
  if (!c.isFinite() || c.isZero()) return new p(c)
  for (
    E = !1,
      o = c.s * $(c.s * c, 1 / 3),
      !o || Math.abs(o) == 1 / 0
        ? ((r = U(c.d)),
          (e = c.e),
          (o = (e - r.length + 1) % 3) && (r += o == 1 || o == -2 ? '0' : '00'),
          (o = $(r, 1 / 3)),
          (e = Z((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2))),
          o == 1 / 0
            ? (r = '5e' + e)
            : ((r = o.toExponential()),
              (r = r.slice(0, r.indexOf('e') + 1) + e)),
          (n = new p(r)),
          (n.s = c.s))
        : (n = new p(o.toString())),
      s = (e = p.precision) + 3;
    ;

  )
    if (
      ((a = n),
      (l = a.times(a).times(a)),
      (u = l.plus(c)),
      (n = R(u.plus(c).times(a), u.plus(l), s + 2, 1)),
      U(a.d).slice(0, s) === (r = U(n.d)).slice(0, s))
    )
      if (((r = r.slice(s - 3, s + 1)), r == '9999' || (!i && r == '4999'))) {
        if (!i && (h(a, e + 1, 0), a.times(a).times(a).eq(c))) {
          n = a
          break
        }
        ;(s += 4), (i = 1)
      } else {
        ;(!+r || (!+r.slice(1) && r.charAt(0) == '5')) &&
          (h(n, e + 1, 1), (t = !n.times(n).times(n).eq(c)))
        break
      }
  return (E = !0), h(n, e, p.rounding, t)
}
d.decimalPlaces = d.dp = function () {
  var e,
    t = this.d,
    r = NaN
  if (t) {
    if (((e = t.length - 1), (r = (e - Z(this.e / w)) * w), (e = t[e]), e))
      for (; e % 10 == 0; e /= 10) r--
    r < 0 && (r = 0)
  }
  return r
}
d.dividedBy = d.div = function (e) {
  return R(this, new this.constructor(e))
}
d.dividedToIntegerBy = d.divToInt = function (e) {
  var t = this,
    r = t.constructor
  return h(R(t, new r(e), 0, 1, 1), r.precision, r.rounding)
}
d.equals = d.eq = function (e) {
  return this.cmp(e) === 0
}
d.floor = function () {
  return h(new this.constructor(this), this.e + 1, 3)
}
d.greaterThan = d.gt = function (e) {
  return this.cmp(e) > 0
}
d.greaterThanOrEqualTo = d.gte = function (e) {
  var t = this.cmp(e)
  return t == 1 || t === 0
}
d.hyperbolicCosine = d.cosh = function () {
  var e,
    t,
    r,
    n,
    i,
    o = this,
    s = o.constructor,
    a = new s(1)
  if (!o.isFinite()) return new s(o.s ? 1 / 0 : NaN)
  if (o.isZero()) return a
  ;(r = s.precision),
    (n = s.rounding),
    (s.precision = r + Math.max(o.e, o.sd()) + 4),
    (s.rounding = 1),
    (i = o.d.length),
    i < 32
      ? ((e = Math.ceil(i / 3)), (t = (1 / Rr(4, e)).toString()))
      : ((e = 16), (t = '2.3283064365386962890625e-10')),
    (o = pt(s, 1, o.times(t), new s(1), !0))
  for (var l, u = e, c = new s(8); u--; )
    (l = o.times(o)), (o = a.minus(l.times(c.minus(l.times(c)))))
  return h(o, (s.precision = r), (s.rounding = n), !0)
}
d.hyperbolicSine = d.sinh = function () {
  var e,
    t,
    r,
    n,
    i = this,
    o = i.constructor
  if (!i.isFinite() || i.isZero()) return new o(i)
  if (
    ((t = o.precision),
    (r = o.rounding),
    (o.precision = t + Math.max(i.e, i.sd()) + 4),
    (o.rounding = 1),
    (n = i.d.length),
    n < 3)
  )
    i = pt(o, 2, i, i, !0)
  else {
    ;(e = 1.4 * Math.sqrt(n)),
      (e = e > 16 ? 16 : e | 0),
      (i = i.times(1 / Rr(5, e))),
      (i = pt(o, 2, i, i, !0))
    for (var s, a = new o(5), l = new o(16), u = new o(20); e--; )
      (s = i.times(i)), (i = i.times(a.plus(s.times(l.times(s).plus(u)))))
  }
  return (o.precision = t), (o.rounding = r), h(i, t, r, !0)
}
d.hyperbolicTangent = d.tanh = function () {
  var e,
    t,
    r = this,
    n = r.constructor
  return r.isFinite()
    ? r.isZero()
      ? new n(r)
      : ((e = n.precision),
        (t = n.rounding),
        (n.precision = e + 7),
        (n.rounding = 1),
        R(r.sinh(), r.cosh(), (n.precision = e), (n.rounding = t)))
    : new n(r.s)
}
d.inverseCosine = d.acos = function () {
  var e,
    t = this,
    r = t.constructor,
    n = t.abs().cmp(1),
    i = r.precision,
    o = r.rounding
  return n !== -1
    ? n === 0
      ? t.isNeg()
        ? de(r, i, o)
        : new r(0)
      : new r(NaN)
    : t.isZero()
    ? de(r, i + 4, o).times(0.5)
    : ((r.precision = i + 6),
      (r.rounding = 1),
      (t = t.asin()),
      (e = de(r, i + 4, o).times(0.5)),
      (r.precision = i),
      (r.rounding = o),
      e.minus(t))
}
d.inverseHyperbolicCosine = d.acosh = function () {
  var e,
    t,
    r = this,
    n = r.constructor
  return r.lte(1)
    ? new n(r.eq(1) ? 0 : NaN)
    : r.isFinite()
    ? ((e = n.precision),
      (t = n.rounding),
      (n.precision = e + Math.max(Math.abs(r.e), r.sd()) + 4),
      (n.rounding = 1),
      (E = !1),
      (r = r.times(r).minus(1).sqrt().plus(r)),
      (E = !0),
      (n.precision = e),
      (n.rounding = t),
      r.ln())
    : new n(r)
}
d.inverseHyperbolicSine = d.asinh = function () {
  var e,
    t,
    r = this,
    n = r.constructor
  return !r.isFinite() || r.isZero()
    ? new n(r)
    : ((e = n.precision),
      (t = n.rounding),
      (n.precision = e + 2 * Math.max(Math.abs(r.e), r.sd()) + 6),
      (n.rounding = 1),
      (E = !1),
      (r = r.times(r).plus(1).sqrt().plus(r)),
      (E = !0),
      (n.precision = e),
      (n.rounding = t),
      r.ln())
}
d.inverseHyperbolicTangent = d.atanh = function () {
  var e,
    t,
    r,
    n,
    i = this,
    o = i.constructor
  return i.isFinite()
    ? i.e >= 0
      ? new o(i.abs().eq(1) ? i.s / 0 : i.isZero() ? i : NaN)
      : ((e = o.precision),
        (t = o.rounding),
        (n = i.sd()),
        Math.max(n, e) < 2 * -i.e - 1
          ? h(new o(i), e, t, !0)
          : ((o.precision = r = n - i.e),
            (i = R(i.plus(1), new o(1).minus(i), r + e, 1)),
            (o.precision = e + 4),
            (o.rounding = 1),
            (i = i.ln()),
            (o.precision = e),
            (o.rounding = t),
            i.times(0.5)))
    : new o(NaN)
}
d.inverseSine = d.asin = function () {
  var e,
    t,
    r,
    n,
    i = this,
    o = i.constructor
  return i.isZero()
    ? new o(i)
    : ((t = i.abs().cmp(1)),
      (r = o.precision),
      (n = o.rounding),
      t !== -1
        ? t === 0
          ? ((e = de(o, r + 4, n).times(0.5)), (e.s = i.s), e)
          : new o(NaN)
        : ((o.precision = r + 6),
          (o.rounding = 1),
          (i = i.div(new o(1).minus(i.times(i)).sqrt().plus(1)).atan()),
          (o.precision = r),
          (o.rounding = n),
          i.times(2)))
}
d.inverseTangent = d.atan = function () {
  var e,
    t,
    r,
    n,
    i,
    o,
    s,
    a,
    l,
    u = this,
    c = u.constructor,
    p = c.precision,
    m = c.rounding
  if (u.isFinite()) {
    if (u.isZero()) return new c(u)
    if (u.abs().eq(1) && p + 4 <= Gn)
      return (s = de(c, p + 4, m).times(0.25)), (s.s = u.s), s
  } else {
    if (!u.s) return new c(NaN)
    if (p + 4 <= Gn) return (s = de(c, p + 4, m).times(0.5)), (s.s = u.s), s
  }
  for (
    c.precision = a = p + 10,
      c.rounding = 1,
      r = Math.min(28, (a / w + 2) | 0),
      e = r;
    e;
    --e
  )
    u = u.div(u.times(u).plus(1).sqrt().plus(1))
  for (
    E = !1, t = Math.ceil(a / w), n = 1, l = u.times(u), s = new c(u), i = u;
    e !== -1;

  )
    if (
      ((i = i.times(l)),
      (o = s.minus(i.div((n += 2)))),
      (i = i.times(l)),
      (s = o.plus(i.div((n += 2)))),
      s.d[t] !== void 0)
    )
      for (e = t; s.d[e] === o.d[e] && e--; );
  return (
    r && (s = s.times(2 << (r - 1))),
    (E = !0),
    h(s, (c.precision = p), (c.rounding = m), !0)
  )
}
d.isFinite = function () {
  return !!this.d
}
d.isInteger = d.isInt = function () {
  return !!this.d && Z(this.e / w) > this.d.length - 2
}
d.isNaN = function () {
  return !this.s
}
d.isNegative = d.isNeg = function () {
  return this.s < 0
}
d.isPositive = d.isPos = function () {
  return this.s > 0
}
d.isZero = function () {
  return !!this.d && this.d[0] === 0
}
d.lessThan = d.lt = function (e) {
  return this.cmp(e) < 0
}
d.lessThanOrEqualTo = d.lte = function (e) {
  return this.cmp(e) < 1
}
d.logarithm = d.log = function (e) {
  var t,
    r,
    n,
    i,
    o,
    s,
    a,
    l,
    u = this,
    c = u.constructor,
    p = c.precision,
    m = c.rounding,
    g = 5
  if (e == null) (e = new c(10)), (t = !0)
  else {
    if (((e = new c(e)), (r = e.d), e.s < 0 || !r || !r[0] || e.eq(1)))
      return new c(NaN)
    t = e.eq(10)
  }
  if (((r = u.d), u.s < 0 || !r || !r[0] || u.eq(1)))
    return new c(r && !r[0] ? -1 / 0 : u.s != 1 ? NaN : r ? 0 : 1 / 0)
  if (t)
    if (r.length > 1) o = !0
    else {
      for (i = r[0]; i % 10 === 0; ) i /= 10
      o = i !== 1
    }
  if (
    ((E = !1),
    (a = p + g),
    (s = Le(u, a)),
    (n = t ? Ar(c, a + 10) : Le(e, a)),
    (l = R(s, n, a, 1)),
    qt(l.d, (i = p), m))
  )
    do
      if (
        ((a += 10),
        (s = Le(u, a)),
        (n = t ? Ar(c, a + 10) : Le(e, a)),
        (l = R(s, n, a, 1)),
        !o)
      ) {
        ;+U(l.d).slice(i + 1, i + 15) + 1 == 1e14 && (l = h(l, p + 1, 0))
        break
      }
    while (qt(l.d, (i += 10), m))
  return (E = !0), h(l, p, m)
}
d.minus = d.sub = function (e) {
  var t,
    r,
    n,
    i,
    o,
    s,
    a,
    l,
    u,
    c,
    p,
    m,
    g = this,
    y = g.constructor
  if (((e = new y(e)), !g.d || !e.d))
    return (
      !g.s || !e.s
        ? (e = new y(NaN))
        : g.d
        ? (e.s = -e.s)
        : (e = new y(e.d || g.s !== e.s ? g : NaN)),
      e
    )
  if (g.s != e.s) return (e.s = -e.s), g.plus(e)
  if (
    ((u = g.d), (m = e.d), (a = y.precision), (l = y.rounding), !u[0] || !m[0])
  ) {
    if (m[0]) e.s = -e.s
    else if (u[0]) e = new y(g)
    else return new y(l === 3 ? -0 : 0)
    return E ? h(e, a, l) : e
  }
  if (((r = Z(e.e / w)), (c = Z(g.e / w)), (u = u.slice()), (o = c - r), o)) {
    for (
      p = o < 0,
        p
          ? ((t = u), (o = -o), (s = m.length))
          : ((t = m), (r = c), (s = u.length)),
        n = Math.max(Math.ceil(a / w), s) + 2,
        o > n && ((o = n), (t.length = 1)),
        t.reverse(),
        n = o;
      n--;

    )
      t.push(0)
    t.reverse()
  } else {
    for (n = u.length, s = m.length, p = n < s, p && (s = n), n = 0; n < s; n++)
      if (u[n] != m[n]) {
        p = u[n] < m[n]
        break
      }
    o = 0
  }
  for (
    p && ((t = u), (u = m), (m = t), (e.s = -e.s)),
      s = u.length,
      n = m.length - s;
    n > 0;
    --n
  )
    u[s++] = 0
  for (n = m.length; n > o; ) {
    if (u[--n] < m[n]) {
      for (i = n; i && u[--i] === 0; ) u[i] = fe - 1
      --u[i], (u[n] += fe)
    }
    u[n] -= m[n]
  }
  for (; u[--s] === 0; ) u.pop()
  for (; u[0] === 0; u.shift()) --r
  return u[0]
    ? ((e.d = u), (e.e = Fr(u, r)), E ? h(e, a, l) : e)
    : new y(l === 3 ? -0 : 0)
}
d.modulo = d.mod = function (e) {
  var t,
    r = this,
    n = r.constructor
  return (
    (e = new n(e)),
    !r.d || !e.s || (e.d && !e.d[0])
      ? new n(NaN)
      : !e.d || (r.d && !r.d[0])
      ? h(new n(r), n.precision, n.rounding)
      : ((E = !1),
        n.modulo == 9
          ? ((t = R(r, e.abs(), 0, 3, 1)), (t.s *= e.s))
          : (t = R(r, e, 0, n.modulo, 1)),
        (t = t.times(e)),
        (E = !0),
        r.minus(t))
  )
}
d.naturalExponential = d.exp = function () {
  return Wn(this)
}
d.naturalLogarithm = d.ln = function () {
  return Le(this)
}
d.negated = d.neg = function () {
  var e = new this.constructor(this)
  return (e.s = -e.s), h(e)
}
d.plus = d.add = function (e) {
  var t,
    r,
    n,
    i,
    o,
    s,
    a,
    l,
    u,
    c,
    p = this,
    m = p.constructor
  if (((e = new m(e)), !p.d || !e.d))
    return (
      !p.s || !e.s
        ? (e = new m(NaN))
        : p.d || (e = new m(e.d || p.s === e.s ? p : NaN)),
      e
    )
  if (p.s != e.s) return (e.s = -e.s), p.minus(e)
  if (
    ((u = p.d), (c = e.d), (a = m.precision), (l = m.rounding), !u[0] || !c[0])
  )
    return c[0] || (e = new m(p)), E ? h(e, a, l) : e
  if (((o = Z(p.e / w)), (n = Z(e.e / w)), (u = u.slice()), (i = o - n), i)) {
    for (
      i < 0
        ? ((r = u), (i = -i), (s = c.length))
        : ((r = c), (n = o), (s = u.length)),
        o = Math.ceil(a / w),
        s = o > s ? o + 1 : s + 1,
        i > s && ((i = s), (r.length = 1)),
        r.reverse();
      i--;

    )
      r.push(0)
    r.reverse()
  }
  for (
    s = u.length,
      i = c.length,
      s - i < 0 && ((i = s), (r = c), (c = u), (u = r)),
      t = 0;
    i;

  )
    (t = ((u[--i] = u[i] + c[i] + t) / fe) | 0), (u[i] %= fe)
  for (t && (u.unshift(t), ++n), s = u.length; u[--s] == 0; ) u.pop()
  return (e.d = u), (e.e = Fr(u, n)), E ? h(e, a, l) : e
}
d.precision = d.sd = function (e) {
  var t,
    r = this
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error($e + e)
  return r.d ? ((t = is(r.d)), e && r.e + 1 > t && (t = r.e + 1)) : (t = NaN), t
}
d.round = function () {
  var e = this,
    t = e.constructor
  return h(new t(e), e.e + 1, t.rounding)
}
d.sine = d.sin = function () {
  var e,
    t,
    r = this,
    n = r.constructor
  return r.isFinite()
    ? r.isZero()
      ? new n(r)
      : ((e = n.precision),
        (t = n.rounding),
        (n.precision = e + Math.max(r.e, r.sd()) + w),
        (n.rounding = 1),
        (r = Au(n, ls(n, r))),
        (n.precision = e),
        (n.rounding = t),
        h(Fe > 2 ? r.neg() : r, e, t, !0))
    : new n(NaN)
}
d.squareRoot = d.sqrt = function () {
  var e,
    t,
    r,
    n,
    i,
    o,
    s = this,
    a = s.d,
    l = s.e,
    u = s.s,
    c = s.constructor
  if (u !== 1 || !a || !a[0])
    return new c(!u || (u < 0 && (!a || a[0])) ? NaN : a ? s : 1 / 0)
  for (
    E = !1,
      u = Math.sqrt(+s),
      u == 0 || u == 1 / 0
        ? ((t = U(a)),
          (t.length + l) % 2 == 0 && (t += '0'),
          (u = Math.sqrt(t)),
          (l = Z((l + 1) / 2) - (l < 0 || l % 2)),
          u == 1 / 0
            ? (t = '5e' + l)
            : ((t = u.toExponential()),
              (t = t.slice(0, t.indexOf('e') + 1) + l)),
          (n = new c(t)))
        : (n = new c(u.toString())),
      r = (l = c.precision) + 3;
    ;

  )
    if (
      ((o = n),
      (n = o.plus(R(s, o, r + 2, 1)).times(0.5)),
      U(o.d).slice(0, r) === (t = U(n.d)).slice(0, r))
    )
      if (((t = t.slice(r - 3, r + 1)), t == '9999' || (!i && t == '4999'))) {
        if (!i && (h(o, l + 1, 0), o.times(o).eq(s))) {
          n = o
          break
        }
        ;(r += 4), (i = 1)
      } else {
        ;(!+t || (!+t.slice(1) && t.charAt(0) == '5')) &&
          (h(n, l + 1, 1), (e = !n.times(n).eq(s)))
        break
      }
  return (E = !0), h(n, l, c.rounding, e)
}
d.tangent = d.tan = function () {
  var e,
    t,
    r = this,
    n = r.constructor
  return r.isFinite()
    ? r.isZero()
      ? new n(r)
      : ((e = n.precision),
        (t = n.rounding),
        (n.precision = e + 10),
        (n.rounding = 1),
        (r = r.sin()),
        (r.s = 1),
        (r = R(r, new n(1).minus(r.times(r)).sqrt(), e + 10, 0)),
        (n.precision = e),
        (n.rounding = t),
        h(Fe == 2 || Fe == 4 ? r.neg() : r, e, t, !0))
    : new n(NaN)
}
d.times = d.mul = function (e) {
  var t,
    r,
    n,
    i,
    o,
    s,
    a,
    l,
    u,
    c = this,
    p = c.constructor,
    m = c.d,
    g = (e = new p(e)).d
  if (((e.s *= c.s), !m || !m[0] || !g || !g[0]))
    return new p(
      !e.s || (m && !m[0] && !g) || (g && !g[0] && !m)
        ? NaN
        : !m || !g
        ? e.s / 0
        : e.s * 0,
    )
  for (
    r = Z(c.e / w) + Z(e.e / w),
      l = m.length,
      u = g.length,
      l < u && ((o = m), (m = g), (g = o), (s = l), (l = u), (u = s)),
      o = [],
      s = l + u,
      n = s;
    n--;

  )
    o.push(0)
  for (n = u; --n >= 0; ) {
    for (t = 0, i = l + n; i > n; )
      (a = o[i] + g[n] * m[i - n - 1] + t),
        (o[i--] = a % fe | 0),
        (t = (a / fe) | 0)
    o[i] = (o[i] + t) % fe | 0
  }
  for (; !o[--s]; ) o.pop()
  return (
    t ? ++r : o.shift(),
    (e.d = o),
    (e.e = Fr(o, r)),
    E ? h(e, p.precision, p.rounding) : e
  )
}
d.toBinary = function (e, t) {
  return zn(this, 2, e, t)
}
d.toDecimalPlaces = d.toDP = function (e, t) {
  var r = this,
    n = r.constructor
  return (
    (r = new n(r)),
    e === void 0
      ? r
      : (ie(e, 0, qe),
        t === void 0 ? (t = n.rounding) : ie(t, 0, 8),
        h(r, e + r.e + 1, t))
  )
}
d.toExponential = function (e, t) {
  var r,
    n = this,
    i = n.constructor
  return (
    e === void 0
      ? (r = we(n, !0))
      : (ie(e, 0, qe),
        t === void 0 ? (t = i.rounding) : ie(t, 0, 8),
        (n = h(new i(n), e + 1, t)),
        (r = we(n, !0, e + 1))),
    n.isNeg() && !n.isZero() ? '-' + r : r
  )
}
d.toFixed = function (e, t) {
  var r,
    n,
    i = this,
    o = i.constructor
  return (
    e === void 0
      ? (r = we(i))
      : (ie(e, 0, qe),
        t === void 0 ? (t = o.rounding) : ie(t, 0, 8),
        (n = h(new o(i), e + i.e + 1, t)),
        (r = we(n, !1, e + n.e + 1))),
    i.isNeg() && !i.isZero() ? '-' + r : r
  )
}
d.toFraction = function (e) {
  var t,
    r,
    n,
    i,
    o,
    s,
    a,
    l,
    u,
    c,
    p,
    m,
    g = this,
    y = g.d,
    f = g.constructor
  if (!y) return new f(g)
  if (
    ((u = r = new f(1)),
    (n = l = new f(0)),
    (t = new f(n)),
    (o = t.e = is(y) - g.e - 1),
    (s = o % w),
    (t.d[0] = $(10, s < 0 ? w + s : s)),
    e == null)
  )
    e = o > 0 ? t : u
  else {
    if (((a = new f(e)), !a.isInt() || a.lt(u))) throw Error($e + a)
    e = a.gt(t) ? (o > 0 ? t : u) : a
  }
  for (
    E = !1,
      a = new f(U(y)),
      c = f.precision,
      f.precision = o = y.length * w * 2;
    (p = R(a, t, 0, 1, 1)), (i = r.plus(p.times(n))), i.cmp(e) != 1;

  )
    (r = n),
      (n = i),
      (i = u),
      (u = l.plus(p.times(i))),
      (l = i),
      (i = t),
      (t = a.minus(p.times(i))),
      (a = i)
  return (
    (i = R(e.minus(r), n, 0, 1, 1)),
    (l = l.plus(i.times(u))),
    (r = r.plus(i.times(n))),
    (l.s = u.s = g.s),
    (m =
      R(u, n, o, 1).minus(g).abs().cmp(R(l, r, o, 1).minus(g).abs()) < 1
        ? [u, n]
        : [l, r]),
    (f.precision = c),
    (E = !0),
    m
  )
}
d.toHexadecimal = d.toHex = function (e, t) {
  return zn(this, 16, e, t)
}
d.toNearest = function (e, t) {
  var r = this,
    n = r.constructor
  if (((r = new n(r)), e == null)) {
    if (!r.d) return r
    ;(e = new n(1)), (t = n.rounding)
  } else {
    if (((e = new n(e)), t === void 0 ? (t = n.rounding) : ie(t, 0, 8), !r.d))
      return e.s ? r : e
    if (!e.d) return e.s && (e.s = r.s), e
  }
  return (
    e.d[0]
      ? ((E = !1), (r = R(r, e, 0, t, 1).times(e)), (E = !0), h(r))
      : ((e.s = r.s), (r = e)),
    r
  )
}
d.toNumber = function () {
  return +this
}
d.toOctal = function (e, t) {
  return zn(this, 8, e, t)
}
d.toPower = d.pow = function (e) {
  var t,
    r,
    n,
    i,
    o,
    s,
    a = this,
    l = a.constructor,
    u = +(e = new l(e))
  if (!a.d || !e.d || !a.d[0] || !e.d[0]) return new l($(+a, u))
  if (((a = new l(a)), a.eq(1))) return a
  if (((n = l.precision), (o = l.rounding), e.eq(1))) return h(a, n, o)
  if (((t = Z(e.e / w)), t >= e.d.length - 1 && (r = u < 0 ? -u : u) <= Tu))
    return (i = os(l, a, r, n)), e.s < 0 ? new l(1).div(i) : h(i, n, o)
  if (((s = a.s), s < 0)) {
    if (t < e.d.length - 1) return new l(NaN)
    if (
      ((e.d[t] & 1) == 0 && (s = 1), a.e == 0 && a.d[0] == 1 && a.d.length == 1)
    )
      return (a.s = s), a
  }
  return (
    (r = $(+a, u)),
    (t =
      r == 0 || !isFinite(r)
        ? Z(u * (Math.log('0.' + U(a.d)) / Math.LN10 + a.e + 1))
        : new l(r + '').e),
    t > l.maxE + 1 || t < l.minE - 1
      ? new l(t > 0 ? s / 0 : 0)
      : ((E = !1),
        (l.rounding = a.s = 1),
        (r = Math.min(12, (t + '').length)),
        (i = Wn(e.times(Le(a, n + r)), n)),
        i.d &&
          ((i = h(i, n + 5, 1)),
          qt(i.d, n, o) &&
            ((t = n + 10),
            (i = h(Wn(e.times(Le(a, t + r)), t), t + 5, 1)),
            +U(i.d).slice(n + 1, n + 15) + 1 == 1e14 && (i = h(i, n + 1, 0)))),
        (i.s = s),
        (E = !0),
        (l.rounding = o),
        h(i, n, o))
  )
}
d.toPrecision = function (e, t) {
  var r,
    n = this,
    i = n.constructor
  return (
    e === void 0
      ? (r = we(n, n.e <= i.toExpNeg || n.e >= i.toExpPos))
      : (ie(e, 1, qe),
        t === void 0 ? (t = i.rounding) : ie(t, 0, 8),
        (n = h(new i(n), e, t)),
        (r = we(n, e <= n.e || n.e <= i.toExpNeg, e))),
    n.isNeg() && !n.isZero() ? '-' + r : r
  )
}
d.toSignificantDigits = d.toSD = function (e, t) {
  var r = this,
    n = r.constructor
  return (
    e === void 0
      ? ((e = n.precision), (t = n.rounding))
      : (ie(e, 1, qe), t === void 0 ? (t = n.rounding) : ie(t, 0, 8)),
    h(new n(r), e, t)
  )
}
d.toString = function () {
  var e = this,
    t = e.constructor,
    r = we(e, e.e <= t.toExpNeg || e.e >= t.toExpPos)
  return e.isNeg() && !e.isZero() ? '-' + r : r
}
d.truncated = d.trunc = function () {
  return h(new this.constructor(this), this.e + 1, 1)
}
d.valueOf = d.toJSON = function () {
  var e = this,
    t = e.constructor,
    r = we(e, e.e <= t.toExpNeg || e.e >= t.toExpPos)
  return e.isNeg() ? '-' + r : r
}
function U(e) {
  var t,
    r,
    n,
    i = e.length - 1,
    o = '',
    s = e[0]
  if (i > 0) {
    for (o += s, t = 1; t < i; t++)
      (n = e[t] + ''), (r = w - n.length), r && (o += Ne(r)), (o += n)
    ;(s = e[t]), (n = s + ''), (r = w - n.length), r && (o += Ne(r))
  } else if (s === 0) return '0'
  for (; s % 10 === 0; ) s /= 10
  return o + s
}
function ie(e, t, r) {
  if (e !== ~~e || e < t || e > r) throw Error($e + e)
}
function qt(e, t, r, n) {
  var i, o, s, a
  for (o = e[0]; o >= 10; o /= 10) --t
  return (
    --t < 0 ? ((t += w), (i = 0)) : ((i = Math.ceil((t + 1) / w)), (t %= w)),
    (o = $(10, w - t)),
    (a = e[i] % o | 0),
    n == null
      ? t < 3
        ? (t == 0 ? (a = (a / 100) | 0) : t == 1 && (a = (a / 10) | 0),
          (s =
            (r < 4 && a == 99999) ||
            (r > 3 && a == 49999) ||
            a == 5e4 ||
            a == 0))
        : (s =
            (((r < 4 && a + 1 == o) || (r > 3 && a + 1 == o / 2)) &&
              ((e[i + 1] / o / 100) | 0) == $(10, t - 2) - 1) ||
            ((a == o / 2 || a == 0) && ((e[i + 1] / o / 100) | 0) == 0))
      : t < 4
      ? (t == 0
          ? (a = (a / 1e3) | 0)
          : t == 1
          ? (a = (a / 100) | 0)
          : t == 2 && (a = (a / 10) | 0),
        (s = ((n || r < 4) && a == 9999) || (!n && r > 3 && a == 4999)))
      : (s =
          (((n || r < 4) && a + 1 == o) || (!n && r > 3 && a + 1 == o / 2)) &&
          ((e[i + 1] / o / 1e3) | 0) == $(10, t - 3) - 1),
    s
  )
}
function vr(e, t, r) {
  for (var n, i = [0], o, s = 0, a = e.length; s < a; ) {
    for (o = i.length; o--; ) i[o] *= t
    for (i[0] += Qn.indexOf(e.charAt(s++)), n = 0; n < i.length; n++)
      i[n] > r - 1 &&
        (i[n + 1] === void 0 && (i[n + 1] = 0),
        (i[n + 1] += (i[n] / r) | 0),
        (i[n] %= r))
  }
  return i.reverse()
}
function Cu(e, t) {
  var r, n, i
  if (t.isZero()) return t
  ;(n = t.d.length),
    n < 32
      ? ((r = Math.ceil(n / 3)), (i = (1 / Rr(4, r)).toString()))
      : ((r = 16), (i = '2.3283064365386962890625e-10')),
    (e.precision += r),
    (t = pt(e, 1, t.times(i), new e(1)))
  for (var o = r; o--; ) {
    var s = t.times(t)
    t = s.times(s).minus(s).times(8).plus(1)
  }
  return (e.precision -= r), t
}
var R = (function () {
  function e(n, i, o) {
    var s,
      a = 0,
      l = n.length
    for (n = n.slice(); l--; )
      (s = n[l] * i + a), (n[l] = s % o | 0), (a = (s / o) | 0)
    return a && n.unshift(a), n
  }
  function t(n, i, o, s) {
    var a, l
    if (o != s) l = o > s ? 1 : -1
    else
      for (a = l = 0; a < o; a++)
        if (n[a] != i[a]) {
          l = n[a] > i[a] ? 1 : -1
          break
        }
    return l
  }
  function r(n, i, o, s) {
    for (var a = 0; o--; )
      (n[o] -= a), (a = n[o] < i[o] ? 1 : 0), (n[o] = a * s + n[o] - i[o])
    for (; !n[0] && n.length > 1; ) n.shift()
  }
  return function (n, i, o, s, a, l) {
    var u,
      c,
      p,
      m,
      g,
      y,
      f,
      b,
      P,
      v,
      x,
      M,
      ae,
      B,
      Ke,
      I,
      J,
      Ce,
      G,
      He,
      Gt = n.constructor,
      Yr = n.s == i.s ? 1 : -1,
      W = n.d,
      F = i.d
    if (!W || !W[0] || !F || !F[0])
      return new Gt(
        !n.s || !i.s || (W ? F && W[0] == F[0] : !F)
          ? NaN
          : (W && W[0] == 0) || !F
          ? Yr * 0
          : Yr / 0,
      )
    for (
      l
        ? ((g = 1), (c = n.e - i.e))
        : ((l = fe), (g = w), (c = Z(n.e / g) - Z(i.e / g))),
        G = F.length,
        J = W.length,
        P = new Gt(Yr),
        v = P.d = [],
        p = 0;
      F[p] == (W[p] || 0);
      p++
    );
    if (
      (F[p] > (W[p] || 0) && c--,
      o == null
        ? ((B = o = Gt.precision), (s = Gt.rounding))
        : a
        ? (B = o + (n.e - i.e) + 1)
        : (B = o),
      B < 0)
    )
      v.push(1), (y = !0)
    else {
      if (((B = (B / g + 2) | 0), (p = 0), G == 1)) {
        for (m = 0, F = F[0], B++; (p < J || m) && B--; p++)
          (Ke = m * l + (W[p] || 0)), (v[p] = (Ke / F) | 0), (m = Ke % F | 0)
        y = m || p < J
      } else {
        for (
          m = (l / (F[0] + 1)) | 0,
            m > 1 &&
              ((F = e(F, m, l)),
              (W = e(W, m, l)),
              (G = F.length),
              (J = W.length)),
            I = G,
            x = W.slice(0, G),
            M = x.length;
          M < G;

        )
          x[M++] = 0
        ;(He = F.slice()), He.unshift(0), (Ce = F[0]), F[1] >= l / 2 && ++Ce
        do
          (m = 0),
            (u = t(F, x, G, M)),
            u < 0
              ? ((ae = x[0]),
                G != M && (ae = ae * l + (x[1] || 0)),
                (m = (ae / Ce) | 0),
                m > 1
                  ? (m >= l && (m = l - 1),
                    (f = e(F, m, l)),
                    (b = f.length),
                    (M = x.length),
                    (u = t(f, x, b, M)),
                    u == 1 && (m--, r(f, G < b ? He : F, b, l)))
                  : (m == 0 && (u = m = 1), (f = F.slice())),
                (b = f.length),
                b < M && f.unshift(0),
                r(x, f, M, l),
                u == -1 &&
                  ((M = x.length),
                  (u = t(F, x, G, M)),
                  u < 1 && (m++, r(x, G < M ? He : F, M, l))),
                (M = x.length))
              : u === 0 && (m++, (x = [0])),
            (v[p++] = m),
            u && x[0] ? (x[M++] = W[I] || 0) : ((x = [W[I]]), (M = 1))
        while ((I++ < J || x[0] !== void 0) && B--)
        y = x[0] !== void 0
      }
      v[0] || v.shift()
    }
    if (g == 1) (P.e = c), (Xo = y)
    else {
      for (p = 1, m = v[0]; m >= 10; m /= 10) p++
      ;(P.e = p + c * g - 1), h(P, a ? o + P.e + 1 : o, s, y)
    }
    return P
  }
})()
function h(e, t, r, n) {
  var i,
    o,
    s,
    a,
    l,
    u,
    c,
    p,
    m,
    g = e.constructor
  e: if (t != null) {
    if (((p = e.d), !p)) return e
    for (i = 1, a = p[0]; a >= 10; a /= 10) i++
    if (((o = t - i), o < 0))
      (o += w), (s = t), (c = p[(m = 0)]), (l = (c / $(10, i - s - 1)) % 10 | 0)
    else if (((m = Math.ceil((o + 1) / w)), (a = p.length), m >= a))
      if (n) {
        for (; a++ <= m; ) p.push(0)
        ;(c = l = 0), (i = 1), (o %= w), (s = o - w + 1)
      } else break e
    else {
      for (c = a = p[m], i = 1; a >= 10; a /= 10) i++
      ;(o %= w),
        (s = o - w + i),
        (l = s < 0 ? 0 : (c / $(10, i - s - 1)) % 10 | 0)
    }
    if (
      ((n =
        n ||
        t < 0 ||
        p[m + 1] !== void 0 ||
        (s < 0 ? c : c % $(10, i - s - 1))),
      (u =
        r < 4
          ? (l || n) && (r == 0 || r == (e.s < 0 ? 3 : 2))
          : l > 5 ||
            (l == 5 &&
              (r == 4 ||
                n ||
                (r == 6 &&
                  (o > 0 ? (s > 0 ? c / $(10, i - s) : 0) : p[m - 1]) % 10 &
                    1) ||
                r == (e.s < 0 ? 8 : 7)))),
      t < 1 || !p[0])
    )
      return (
        (p.length = 0),
        u
          ? ((t -= e.e + 1), (p[0] = $(10, (w - (t % w)) % w)), (e.e = -t || 0))
          : (p[0] = e.e = 0),
        e
      )
    if (
      (o == 0
        ? ((p.length = m), (a = 1), m--)
        : ((p.length = m + 1),
          (a = $(10, w - o)),
          (p[m] = s > 0 ? ((c / $(10, i - s)) % $(10, s) | 0) * a : 0)),
      u)
    )
      for (;;)
        if (m == 0) {
          for (o = 1, s = p[0]; s >= 10; s /= 10) o++
          for (s = p[0] += a, a = 1; s >= 10; s /= 10) a++
          o != a && (e.e++, p[0] == fe && (p[0] = 1))
          break
        } else {
          if (((p[m] += a), p[m] != fe)) break
          ;(p[m--] = 0), (a = 1)
        }
    for (o = p.length; p[--o] === 0; ) p.pop()
  }
  return (
    E &&
      (e.e > g.maxE
        ? ((e.d = null), (e.e = NaN))
        : e.e < g.minE && ((e.e = 0), (e.d = [0]))),
    e
  )
}
function we(e, t, r) {
  if (!e.isFinite()) return as(e)
  var n,
    i = e.e,
    o = U(e.d),
    s = o.length
  return (
    t
      ? (r && (n = r - s) > 0
          ? (o = o.charAt(0) + '.' + o.slice(1) + Ne(n))
          : s > 1 && (o = o.charAt(0) + '.' + o.slice(1)),
        (o = o + (e.e < 0 ? 'e' : 'e+') + e.e))
      : i < 0
      ? ((o = '0.' + Ne(-i - 1) + o), r && (n = r - s) > 0 && (o += Ne(n)))
      : i >= s
      ? ((o += Ne(i + 1 - s)),
        r && (n = r - i - 1) > 0 && (o = o + '.' + Ne(n)))
      : ((n = i + 1) < s && (o = o.slice(0, n) + '.' + o.slice(n)),
        r && (n = r - s) > 0 && (i + 1 === s && (o += '.'), (o += Ne(n)))),
    o
  )
}
function Fr(e, t) {
  var r = e[0]
  for (t *= w; r >= 10; r /= 10) t++
  return t
}
function Ar(e, t, r) {
  if (t > vu) throw ((E = !0), r && (e.precision = r), Error(es))
  return h(new e(Cr), t, 1, !0)
}
function de(e, t, r) {
  if (t > Gn) throw Error(es)
  return h(new e(Mr), t, r, !0)
}
function is(e) {
  var t = e.length - 1,
    r = t * w + 1
  if (((t = e[t]), t)) {
    for (; t % 10 == 0; t /= 10) r--
    for (t = e[0]; t >= 10; t /= 10) r++
  }
  return r
}
function Ne(e) {
  for (var t = ''; e--; ) t += '0'
  return t
}
function os(e, t, r, n) {
  var i,
    o = new e(1),
    s = Math.ceil(n / w + 4)
  for (E = !1; ; ) {
    if (
      (r % 2 && ((o = o.times(t)), Yo(o.d, s) && (i = !0)),
      (r = Z(r / 2)),
      r === 0)
    ) {
      ;(r = o.d.length - 1), i && o.d[r] === 0 && ++o.d[r]
      break
    }
    ;(t = t.times(t)), Yo(t.d, s)
  }
  return (E = !0), o
}
function zo(e) {
  return e.d[e.d.length - 1] & 1
}
function ss(e, t, r) {
  for (var n, i = new e(t[0]), o = 0; ++o < t.length; )
    if (((n = new e(t[o])), n.s)) i[r](n) && (i = n)
    else {
      i = n
      break
    }
  return i
}
function Wn(e, t) {
  var r,
    n,
    i,
    o,
    s,
    a,
    l,
    u = 0,
    c = 0,
    p = 0,
    m = e.constructor,
    g = m.rounding,
    y = m.precision
  if (!e.d || !e.d[0] || e.e > 17)
    return new m(
      e.d
        ? e.d[0]
          ? e.s < 0
            ? 0
            : 1 / 0
          : 1
        : e.s
        ? e.s < 0
          ? 0
          : e
        : 0 / 0,
    )
  for (
    t == null ? ((E = !1), (l = y)) : (l = t), a = new m(0.03125);
    e.e > -2;

  )
    (e = e.times(a)), (p += 5)
  for (
    n = ((Math.log($(2, p)) / Math.LN10) * 2 + 5) | 0,
      l += n,
      r = o = s = new m(1),
      m.precision = l;
    ;

  ) {
    if (
      ((o = h(o.times(e), l, 1)),
      (r = r.times(++c)),
      (a = s.plus(R(o, r, l, 1))),
      U(a.d).slice(0, l) === U(s.d).slice(0, l))
    ) {
      for (i = p; i--; ) s = h(s.times(s), l, 1)
      if (t == null)
        if (u < 3 && qt(s.d, l - n, g, u))
          (m.precision = l += 10), (r = o = a = new m(1)), (c = 0), u++
        else return h(s, (m.precision = y), g, (E = !0))
      else return (m.precision = y), s
    }
    s = a
  }
}
function Le(e, t) {
  var r,
    n,
    i,
    o,
    s,
    a,
    l,
    u,
    c,
    p,
    m,
    g = 1,
    y = 10,
    f = e,
    b = f.d,
    P = f.constructor,
    v = P.rounding,
    x = P.precision
  if (f.s < 0 || !b || !b[0] || (!f.e && b[0] == 1 && b.length == 1))
    return new P(b && !b[0] ? -1 / 0 : f.s != 1 ? NaN : b ? 0 : f)
  if (
    (t == null ? ((E = !1), (c = x)) : (c = t),
    (P.precision = c += y),
    (r = U(b)),
    (n = r.charAt(0)),
    Math.abs((o = f.e)) < 15e14)
  ) {
    for (; (n < 7 && n != 1) || (n == 1 && r.charAt(1) > 3); )
      (f = f.times(e)), (r = U(f.d)), (n = r.charAt(0)), g++
    ;(o = f.e),
      n > 1 ? ((f = new P('0.' + r)), o++) : (f = new P(n + '.' + r.slice(1)))
  } else
    return (
      (u = Ar(P, c + 2, x).times(o + '')),
      (f = Le(new P(n + '.' + r.slice(1)), c - y).plus(u)),
      (P.precision = x),
      t == null ? h(f, x, v, (E = !0)) : f
    )
  for (
    p = f,
      l = s = f = R(f.minus(1), f.plus(1), c, 1),
      m = h(f.times(f), c, 1),
      i = 3;
    ;

  ) {
    if (
      ((s = h(s.times(m), c, 1)),
      (u = l.plus(R(s, new P(i), c, 1))),
      U(u.d).slice(0, c) === U(l.d).slice(0, c))
    )
      if (
        ((l = l.times(2)),
        o !== 0 && (l = l.plus(Ar(P, c + 2, x).times(o + ''))),
        (l = R(l, new P(g), c, 1)),
        t == null)
      )
        if (qt(l.d, c - y, v, a))
          (P.precision = c += y),
            (u = s = f = R(p.minus(1), p.plus(1), c, 1)),
            (m = h(f.times(f), c, 1)),
            (i = a = 1)
        else return h(l, (P.precision = x), v, (E = !0))
      else return (P.precision = x), l
    ;(l = u), (i += 2)
  }
}
function as(e) {
  return String((e.s * e.s) / 0)
}
function Hn(e, t) {
  var r, n, i
  for (
    (r = t.indexOf('.')) > -1 && (t = t.replace('.', '')),
      (n = t.search(/e/i)) > 0
        ? (r < 0 && (r = n), (r += +t.slice(n + 1)), (t = t.substring(0, n)))
        : r < 0 && (r = t.length),
      n = 0;
    t.charCodeAt(n) === 48;
    n++
  );
  for (i = t.length; t.charCodeAt(i - 1) === 48; --i);
  if (((t = t.slice(n, i)), t)) {
    if (
      ((i -= n),
      (e.e = r = r - n - 1),
      (e.d = []),
      (n = (r + 1) % w),
      r < 0 && (n += w),
      n < i)
    ) {
      for (n && e.d.push(+t.slice(0, n)), i -= w; n < i; )
        e.d.push(+t.slice(n, (n += w)))
      ;(t = t.slice(n)), (n = w - t.length)
    } else n -= i
    for (; n--; ) t += '0'
    e.d.push(+t),
      E &&
        (e.e > e.constructor.maxE
          ? ((e.d = null), (e.e = NaN))
          : e.e < e.constructor.minE && ((e.e = 0), (e.d = [0])))
  } else (e.e = 0), (e.d = [0])
  return e
}
function Mu(e, t) {
  var r, n, i, o, s, a, l, u, c
  if (t.indexOf('_') > -1) {
    if (((t = t.replace(/(\d)_(?=\d)/g, '$1')), ns.test(t))) return Hn(e, t)
  } else if (t === 'Infinity' || t === 'NaN')
    return +t || (e.s = NaN), (e.e = NaN), (e.d = null), e
  if (Eu.test(t)) (r = 16), (t = t.toLowerCase())
  else if (wu.test(t)) r = 2
  else if (Pu.test(t)) r = 8
  else throw Error($e + t)
  for (
    o = t.search(/p/i),
      o > 0
        ? ((l = +t.slice(o + 1)), (t = t.substring(2, o)))
        : (t = t.slice(2)),
      o = t.indexOf('.'),
      s = o >= 0,
      n = e.constructor,
      s &&
        ((t = t.replace('.', '')),
        (a = t.length),
        (o = a - o),
        (i = os(n, new n(r), o, o * 2))),
      u = vr(t, r, fe),
      c = u.length - 1,
      o = c;
    u[o] === 0;
    --o
  )
    u.pop()
  return o < 0
    ? new n(e.s * 0)
    : ((e.e = Fr(u, c)),
      (e.d = u),
      (E = !1),
      s && (e = R(e, i, a * 4)),
      l && (e = e.times(Math.abs(l) < 54 ? $(2, l) : We.pow(2, l))),
      (E = !0),
      e)
}
function Au(e, t) {
  var r,
    n = t.d.length
  if (n < 3) return t.isZero() ? t : pt(e, 2, t, t)
  ;(r = 1.4 * Math.sqrt(n)),
    (r = r > 16 ? 16 : r | 0),
    (t = t.times(1 / Rr(5, r))),
    (t = pt(e, 2, t, t))
  for (var i, o = new e(5), s = new e(16), a = new e(20); r--; )
    (i = t.times(t)), (t = t.times(o.plus(i.times(s.times(i).minus(a)))))
  return t
}
function pt(e, t, r, n, i) {
  var o,
    s,
    a,
    l,
    u = 1,
    c = e.precision,
    p = Math.ceil(c / w)
  for (E = !1, l = r.times(r), a = new e(n); ; ) {
    if (
      ((s = R(a.times(l), new e(t++ * t++), c, 1)),
      (a = i ? n.plus(s) : n.minus(s)),
      (n = R(s.times(l), new e(t++ * t++), c, 1)),
      (s = a.plus(n)),
      s.d[p] !== void 0)
    ) {
      for (o = p; s.d[o] === a.d[o] && o--; );
      if (o == -1) break
    }
    ;(o = a), (a = n), (n = s), (s = o), u++
  }
  return (E = !0), (s.d.length = p + 1), s
}
function Rr(e, t) {
  for (var r = e; --t; ) r *= e
  return r
}
function ls(e, t) {
  var r,
    n = t.s < 0,
    i = de(e, e.precision, 1),
    o = i.times(0.5)
  if (((t = t.abs()), t.lte(o))) return (Fe = n ? 4 : 1), t
  if (((r = t.divToInt(i)), r.isZero())) Fe = n ? 3 : 2
  else {
    if (((t = t.minus(r.times(i))), t.lte(o)))
      return (Fe = zo(r) ? (n ? 2 : 3) : n ? 4 : 1), t
    Fe = zo(r) ? (n ? 1 : 4) : n ? 3 : 2
  }
  return t.minus(i).abs()
}
function zn(e, t, r, n) {
  var i,
    o,
    s,
    a,
    l,
    u,
    c,
    p,
    m,
    g = e.constructor,
    y = r !== void 0
  if (
    (y
      ? (ie(r, 1, qe), n === void 0 ? (n = g.rounding) : ie(n, 0, 8))
      : ((r = g.precision), (n = g.rounding)),
    !e.isFinite())
  )
    c = as(e)
  else {
    for (
      c = we(e),
        s = c.indexOf('.'),
        y
          ? ((i = 2), t == 16 ? (r = r * 4 - 3) : t == 8 && (r = r * 3 - 2))
          : (i = t),
        s >= 0 &&
          ((c = c.replace('.', '')),
          (m = new g(1)),
          (m.e = c.length - s),
          (m.d = vr(we(m), 10, i)),
          (m.e = m.d.length)),
        p = vr(c, 10, i),
        o = l = p.length;
      p[--l] == 0;

    )
      p.pop()
    if (!p[0]) c = y ? '0p+0' : '0'
    else {
      if (
        (s < 0
          ? o--
          : ((e = new g(e)),
            (e.d = p),
            (e.e = o),
            (e = R(e, m, r, n, 0, i)),
            (p = e.d),
            (o = e.e),
            (u = Xo)),
        (s = p[r]),
        (a = i / 2),
        (u = u || p[r + 1] !== void 0),
        (u =
          n < 4
            ? (s !== void 0 || u) && (n === 0 || n === (e.s < 0 ? 3 : 2))
            : s > a ||
              (s === a &&
                (n === 4 ||
                  u ||
                  (n === 6 && p[r - 1] & 1) ||
                  n === (e.s < 0 ? 8 : 7)))),
        (p.length = r),
        u)
      )
        for (; ++p[--r] > i - 1; ) (p[r] = 0), r || (++o, p.unshift(1))
      for (l = p.length; !p[l - 1]; --l);
      for (s = 0, c = ''; s < l; s++) c += Qn.charAt(p[s])
      if (y) {
        if (l > 1)
          if (t == 16 || t == 8) {
            for (s = t == 16 ? 4 : 3, --l; l % s; l++) c += '0'
            for (p = vr(c, i, t), l = p.length; !p[l - 1]; --l);
            for (s = 1, c = '1.'; s < l; s++) c += Qn.charAt(p[s])
          } else c = c.charAt(0) + '.' + c.slice(1)
        c = c + (o < 0 ? 'p' : 'p+') + o
      } else if (o < 0) {
        for (; ++o; ) c = '0' + c
        c = '0.' + c
      } else if (++o > l) for (o -= l; o--; ) c += '0'
      else o < l && (c = c.slice(0, o) + '.' + c.slice(o))
    }
    c = (t == 16 ? '0x' : t == 2 ? '0b' : t == 8 ? '0o' : '') + c
  }
  return e.s < 0 ? '-' + c : c
}
function Yo(e, t) {
  if (e.length > t) return (e.length = t), !0
}
function Su(e) {
  return new this(e).abs()
}
function Fu(e) {
  return new this(e).acos()
}
function Ru(e) {
  return new this(e).acosh()
}
function ku(e, t) {
  return new this(e).plus(t)
}
function Ou(e) {
  return new this(e).asin()
}
function Du(e) {
  return new this(e).asinh()
}
function _u(e) {
  return new this(e).atan()
}
function Iu(e) {
  return new this(e).atanh()
}
function Nu(e, t) {
  ;(e = new this(e)), (t = new this(t))
  var r,
    n = this.precision,
    i = this.rounding,
    o = n + 4
  return (
    !e.s || !t.s
      ? (r = new this(NaN))
      : !e.d && !t.d
      ? ((r = de(this, o, 1).times(t.s > 0 ? 0.25 : 0.75)), (r.s = e.s))
      : !t.d || e.isZero()
      ? ((r = t.s < 0 ? de(this, n, i) : new this(0)), (r.s = e.s))
      : !e.d || t.isZero()
      ? ((r = de(this, o, 1).times(0.5)), (r.s = e.s))
      : t.s < 0
      ? ((this.precision = o),
        (this.rounding = 1),
        (r = this.atan(R(e, t, o, 1))),
        (t = de(this, o, 1)),
        (this.precision = n),
        (this.rounding = i),
        (r = e.s < 0 ? r.minus(t) : r.plus(t)))
      : (r = this.atan(R(e, t, o, 1))),
    r
  )
}
function Lu(e) {
  return new this(e).cbrt()
}
function $u(e) {
  return h((e = new this(e)), e.e + 1, 2)
}
function qu(e, t, r) {
  return new this(e).clamp(t, r)
}
function ju(e) {
  if (!e || typeof e != 'object') throw Error(Sr + 'Object expected')
  var t,
    r,
    n,
    i = e.defaults === !0,
    o = [
      'precision',
      1,
      qe,
      'rounding',
      0,
      8,
      'toExpNeg',
      -ct,
      0,
      'toExpPos',
      0,
      ct,
      'maxE',
      0,
      ct,
      'minE',
      -ct,
      0,
      'modulo',
      0,
      9,
    ]
  for (t = 0; t < o.length; t += 3)
    if (((r = o[t]), i && (this[r] = Jn[r]), (n = e[r]) !== void 0))
      if (Z(n) === n && n >= o[t + 1] && n <= o[t + 2]) this[r] = n
      else throw Error($e + r + ': ' + n)
  if (((r = 'crypto'), i && (this[r] = Jn[r]), (n = e[r]) !== void 0))
    if (n === !0 || n === !1 || n === 0 || n === 1)
      if (n)
        if (
          typeof crypto < 'u' &&
          crypto &&
          (crypto.getRandomValues || crypto.randomBytes)
        )
          this[r] = !0
        else throw Error(ts)
      else this[r] = !1
    else throw Error($e + r + ': ' + n)
  return this
}
function Bu(e) {
  return new this(e).cos()
}
function Vu(e) {
  return new this(e).cosh()
}
function us(e) {
  var t, r, n
  function i(o) {
    var s,
      a,
      l,
      u = this
    if (!(u instanceof i)) return new i(o)
    if (((u.constructor = i), Zo(o))) {
      ;(u.s = o.s),
        E
          ? !o.d || o.e > i.maxE
            ? ((u.e = NaN), (u.d = null))
            : o.e < i.minE
            ? ((u.e = 0), (u.d = [0]))
            : ((u.e = o.e), (u.d = o.d.slice()))
          : ((u.e = o.e), (u.d = o.d ? o.d.slice() : o.d))
      return
    }
    if (((l = typeof o), l === 'number')) {
      if (o === 0) {
        ;(u.s = 1 / o < 0 ? -1 : 1), (u.e = 0), (u.d = [0])
        return
      }
      if ((o < 0 ? ((o = -o), (u.s = -1)) : (u.s = 1), o === ~~o && o < 1e7)) {
        for (s = 0, a = o; a >= 10; a /= 10) s++
        E
          ? s > i.maxE
            ? ((u.e = NaN), (u.d = null))
            : s < i.minE
            ? ((u.e = 0), (u.d = [0]))
            : ((u.e = s), (u.d = [o]))
          : ((u.e = s), (u.d = [o]))
        return
      } else if (o * 0 !== 0) {
        o || (u.s = NaN), (u.e = NaN), (u.d = null)
        return
      }
      return Hn(u, o.toString())
    } else if (l !== 'string') throw Error($e + o)
    return (
      (a = o.charCodeAt(0)) === 45
        ? ((o = o.slice(1)), (u.s = -1))
        : (a === 43 && (o = o.slice(1)), (u.s = 1)),
      ns.test(o) ? Hn(u, o) : Mu(u, o)
    )
  }
  if (
    ((i.prototype = d),
    (i.ROUND_UP = 0),
    (i.ROUND_DOWN = 1),
    (i.ROUND_CEIL = 2),
    (i.ROUND_FLOOR = 3),
    (i.ROUND_HALF_UP = 4),
    (i.ROUND_HALF_DOWN = 5),
    (i.ROUND_HALF_EVEN = 6),
    (i.ROUND_HALF_CEIL = 7),
    (i.ROUND_HALF_FLOOR = 8),
    (i.EUCLID = 9),
    (i.config = i.set = ju),
    (i.clone = us),
    (i.isDecimal = Zo),
    (i.abs = Su),
    (i.acos = Fu),
    (i.acosh = Ru),
    (i.add = ku),
    (i.asin = Ou),
    (i.asinh = Du),
    (i.atan = _u),
    (i.atanh = Iu),
    (i.atan2 = Nu),
    (i.cbrt = Lu),
    (i.ceil = $u),
    (i.clamp = qu),
    (i.cos = Bu),
    (i.cosh = Vu),
    (i.div = Ku),
    (i.exp = Uu),
    (i.floor = Qu),
    (i.hypot = Ju),
    (i.ln = Gu),
    (i.log = Wu),
    (i.log10 = zu),
    (i.log2 = Hu),
    (i.max = Yu),
    (i.min = Zu),
    (i.mod = Xu),
    (i.mul = ec),
    (i.pow = tc),
    (i.random = rc),
    (i.round = nc),
    (i.sign = ic),
    (i.sin = oc),
    (i.sinh = sc),
    (i.sqrt = ac),
    (i.sub = lc),
    (i.sum = uc),
    (i.tan = cc),
    (i.tanh = pc),
    (i.trunc = mc),
    e === void 0 && (e = {}),
    e && e.defaults !== !0)
  )
    for (
      n = [
        'precision',
        'rounding',
        'toExpNeg',
        'toExpPos',
        'maxE',
        'minE',
        'modulo',
        'crypto',
      ],
        t = 0;
      t < n.length;

    )
      e.hasOwnProperty((r = n[t++])) || (e[r] = this[r])
  return i.config(e), i
}
function Ku(e, t) {
  return new this(e).div(t)
}
function Uu(e) {
  return new this(e).exp()
}
function Qu(e) {
  return h((e = new this(e)), e.e + 1, 3)
}
function Ju() {
  var e,
    t,
    r = new this(0)
  for (E = !1, e = 0; e < arguments.length; )
    if (((t = new this(arguments[e++])), t.d)) r.d && (r = r.plus(t.times(t)))
    else {
      if (t.s) return (E = !0), new this(1 / 0)
      r = t
    }
  return (E = !0), r.sqrt()
}
function Zo(e) {
  return e instanceof We || (e && e.toStringTag === rs) || !1
}
function Gu(e) {
  return new this(e).ln()
}
function Wu(e, t) {
  return new this(e).log(t)
}
function Hu(e) {
  return new this(e).log(2)
}
function zu(e) {
  return new this(e).log(10)
}
function Yu() {
  return ss(this, arguments, 'lt')
}
function Zu() {
  return ss(this, arguments, 'gt')
}
function Xu(e, t) {
  return new this(e).mod(t)
}
function ec(e, t) {
  return new this(e).mul(t)
}
function tc(e, t) {
  return new this(e).pow(t)
}
function rc(e) {
  var t,
    r,
    n,
    i,
    o = 0,
    s = new this(1),
    a = []
  if (
    (e === void 0 ? (e = this.precision) : ie(e, 1, qe),
    (n = Math.ceil(e / w)),
    this.crypto)
  )
    if (crypto.getRandomValues)
      for (t = crypto.getRandomValues(new Uint32Array(n)); o < n; )
        (i = t[o]),
          i >= 429e7
            ? (t[o] = crypto.getRandomValues(new Uint32Array(1))[0])
            : (a[o++] = i % 1e7)
    else if (crypto.randomBytes) {
      for (t = crypto.randomBytes((n *= 4)); o < n; )
        (i =
          t[o] + (t[o + 1] << 8) + (t[o + 2] << 16) + ((t[o + 3] & 127) << 24)),
          i >= 214e7
            ? crypto.randomBytes(4).copy(t, o)
            : (a.push(i % 1e7), (o += 4))
      o = n / 4
    } else throw Error(ts)
  else for (; o < n; ) a[o++] = (Math.random() * 1e7) | 0
  for (
    n = a[--o],
      e %= w,
      n && e && ((i = $(10, w - e)), (a[o] = ((n / i) | 0) * i));
    a[o] === 0;
    o--
  )
    a.pop()
  if (o < 0) (r = 0), (a = [0])
  else {
    for (r = -1; a[0] === 0; r -= w) a.shift()
    for (n = 1, i = a[0]; i >= 10; i /= 10) n++
    n < w && (r -= w - n)
  }
  return (s.e = r), (s.d = a), s
}
function nc(e) {
  return h((e = new this(e)), e.e + 1, this.rounding)
}
function ic(e) {
  return (e = new this(e)), e.d ? (e.d[0] ? e.s : 0 * e.s) : e.s || NaN
}
function oc(e) {
  return new this(e).sin()
}
function sc(e) {
  return new this(e).sinh()
}
function ac(e) {
  return new this(e).sqrt()
}
function lc(e, t) {
  return new this(e).sub(t)
}
function uc() {
  var e = 0,
    t = arguments,
    r = new this(t[e])
  for (E = !1; r.s && ++e < t.length; ) r = r.plus(t[e])
  return (E = !0), h(r, this.precision, this.rounding)
}
function cc(e) {
  return new this(e).tan()
}
function pc(e) {
  return new this(e).tanh()
}
function mc(e) {
  return h((e = new this(e)), e.e + 1, 1)
}
d[Symbol.for('nodejs.util.inspect.custom')] = d.toString
d[Symbol.toStringTag] = 'Decimal'
var We = (d.constructor = us(Jn))
Cr = new We(Cr)
Mr = new We(Mr)
var Ee = We
function mt(e) {
  return We.isDecimal(e)
    ? !0
    : e !== null &&
        typeof e == 'object' &&
        typeof e.s == 'number' &&
        typeof e.e == 'number' &&
        typeof e.toFixed == 'function' &&
        Array.isArray(e.d)
}
var jt = class {
  constructor(t, r, n, i, o) {
    ;(this.modelName = t),
      (this.name = r),
      (this.typeName = n),
      (this.isList = i),
      (this.isEnum = o)
  }
  _toGraphQLInputType() {
    let t = this.isList ? 'List' : '',
      r = this.isEnum ? 'Enum' : ''
    return `${t}${r}${this.typeName}FieldRefInput<${this.modelName}>`
  }
}
function dt(e) {
  return e instanceof jt
}
var kr = (e) => e,
  Or = { bold: kr, red: kr, green: kr, dim: kr },
  cs = { bold: re, red: ce, green: Qe, dim: Oe },
  ft = {
    write(e) {
      e.writeLine(',')
    },
  }
var Pe = class {
  constructor(t) {
    this.contents = t
    this.isUnderlined = !1
    this.color = (t) => t
  }
  underline() {
    return (this.isUnderlined = !0), this
  }
  setColor(t) {
    return (this.color = t), this
  }
  write(t) {
    let r = t.getCurrentLineLength()
    t.write(this.color(this.contents)),
      this.isUnderlined &&
        t.afterNextNewline(() => {
          t.write(' '.repeat(r)).writeLine(
            this.color('~'.repeat(this.contents.length)),
          )
        })
  }
}
var je = class {
  constructor() {
    this.hasError = !1
  }
  markAsError() {
    return (this.hasError = !0), this
  }
}
var Dr = class extends je {
  constructor() {
    super(...arguments)
    this.items = []
  }
  addItem(r) {
    return this.items.push(r), this
  }
  getPrintWidth() {
    return this.items.length === 0
      ? 2
      : Math.max(...this.items.map((n) => n.getPrintWidth())) + 2
  }
  write(r) {
    if (this.items.length === 0) {
      this.writeEmpty(r)
      return
    }
    this.writeWithItems(r)
  }
  writeEmpty(r) {
    let n = new Pe('[]')
    this.hasError && n.setColor(r.context.colors.red).underline(), r.write(n)
  }
  writeWithItems(r) {
    let { colors: n } = r.context
    r
      .writeLine('[')
      .withIndent(() => r.writeJoined(ft, this.items).newLine())
      .write(']'),
      this.hasError &&
        r.afterNextNewline(() => {
          r.writeLine(n.red('~'.repeat(this.getPrintWidth())))
        })
  }
}
var ps = ': ',
  _r = class {
    constructor(t, r) {
      this.name = t
      this.value = r
      this.hasError = !1
    }
    markAsError() {
      this.hasError = !0
    }
    getPrintWidth() {
      return this.name.length + this.value.getPrintWidth() + ps.length
    }
    write(t) {
      let r = new Pe(this.name)
      this.hasError && r.underline().setColor(t.context.colors.red),
        t.write(r).write(ps).write(this.value)
    }
  }
var D = class extends je {
  constructor() {
    super(...arguments)
    this.fields = {}
    this.suggestions = []
  }
  addField(r) {
    this.fields[r.name] = r
  }
  addSuggestion(r) {
    this.suggestions.push(r)
  }
  getField(r) {
    return this.fields[r]
  }
  getDeepField(r) {
    let [n, ...i] = r,
      o = this.getField(n)
    if (!o) return
    let s = o
    for (let a of i) {
      if (!(s.value instanceof D)) return
      let l = s.value.getField(a)
      if (!l) return
      s = l
    }
    return s
  }
  getDeepFieldValue(r) {
    return r.length === 0 ? this : this.getDeepField(r)?.value
  }
  hasField(r) {
    return Boolean(this.getField(r))
  }
  removeAllFields() {
    this.fields = {}
  }
  removeField(r) {
    delete this.fields[r]
  }
  getFields() {
    return this.fields
  }
  isEmpty() {
    return Object.keys(this.fields).length === 0
  }
  getFieldValue(r) {
    return this.getField(r)?.value
  }
  getDeepSubSelectionValue(r) {
    let n = this
    for (let i of r) {
      if (!(n instanceof D)) return
      let o = n.getSubSelectionValue(i)
      if (!o) return
      n = o
    }
    return n
  }
  getDeepSelectionParent(r) {
    let n = this.getSelectionParent()
    if (!n) return
    let i = n
    for (let o of r) {
      let s = i.value.getFieldValue(o)
      if (!s || !(s instanceof D)) return
      let a = s.getSelectionParent()
      if (!a) return
      i = a
    }
    return i
  }
  getSelectionParent() {
    let r = this.getField('select')
    if (r?.value instanceof D) return { kind: 'select', value: r.value }
    let n = this.getField('include')
    if (n?.value instanceof D) return { kind: 'include', value: n.value }
  }
  getSubSelectionValue(r) {
    return this.getSelectionParent()?.value.fields[r].value
  }
  getPrintWidth() {
    let r = Object.values(this.fields)
    return r.length == 0 ? 2 : Math.max(...r.map((i) => i.getPrintWidth())) + 2
  }
  write(r) {
    let n = Object.values(this.fields)
    if (n.length === 0 && this.suggestions.length === 0) {
      this.writeEmpty(r)
      return
    }
    this.writeWithContents(r, n)
  }
  writeEmpty(r) {
    let n = new Pe('{}')
    this.hasError && n.setColor(r.context.colors.red).underline(), r.write(n)
  }
  writeWithContents(r, n) {
    r.writeLine('{').withIndent(() => {
      r.writeJoined(ft, [...n, ...this.suggestions]).newLine()
    }),
      r.write('}'),
      this.hasError &&
        r.afterNextNewline(() => {
          r.writeLine(r.context.colors.red('~'.repeat(this.getPrintWidth())))
        })
  }
}
var Q = class extends je {
  constructor(r) {
    super()
    this.text = r
  }
  getPrintWidth() {
    return this.text.length
  }
  write(r) {
    let n = new Pe(this.text)
    this.hasError && n.underline().setColor(r.context.colors.red), r.write(n)
  }
}
var Yn = class {
  constructor(t) {
    this.errorMessages = []
    this.arguments = t
  }
  write(t) {
    t.write(this.arguments)
  }
  addErrorMessage(t) {
    this.errorMessages.push(t)
  }
  renderAllMessages(t) {
    return this.errorMessages.map((r) => r(t)).join(`
`)
  }
}
function Ir(e) {
  return new Yn(ms(e))
}
function ms(e) {
  let t = new D()
  for (let [r, n] of Object.entries(e)) {
    let i = new _r(r, ds(n))
    t.addField(i)
  }
  return t
}
function ds(e) {
  if (typeof e == 'string') return new Q(JSON.stringify(e))
  if (typeof e == 'number' || typeof e == 'boolean') return new Q(String(e))
  if (typeof e == 'bigint') return new Q(`${e}n`)
  if (e === null) return new Q('null')
  if (e === void 0) return new Q('undefined')
  if (mt(e)) return new Q(`new Prisma.Decimal("${e.toFixed()}")`)
  if (e instanceof Uint8Array)
    return Buffer.isBuffer(e)
      ? new Q(`Buffer.alloc(${e.byteLength})`)
      : new Q(`new Uint8Array(${e.byteLength})`)
  if (e instanceof Date) {
    let t = Tr(e) ? e.toISOString() : 'Invalid Date'
    return new Q(`new Date("${t}")`)
  }
  if (e instanceof Se) return new Q(`Prisma.${e._getName()}`)
  if (dt(e)) return new Q(`prisma.${wi(e.modelName)}.$fields.${e.name}`)
  if (Array.isArray(e)) return fc(e)
  if (typeof e == 'object') return ms(e)
  pe(e, 'Unknown value type')
}
function fc(e) {
  let t = new Dr()
  for (let r of e) t.addItem(ds(r))
  return t
}
function fs(e) {
  if (e === void 0) return ''
  let t = Ir(e)
  return new lt(0, { colors: Or }).write(t).toString()
}
var Bt = '<unknown>'
function gs(e) {
  var t = e.split(`
`)
  return t.reduce(function (r, n) {
    var i = hc(n) || bc(n) || Pc(n) || Mc(n) || vc(n)
    return i && r.push(i), r
  }, [])
}
var gc =
    /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/|[a-z]:\\|\\\\).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
  yc = /\((\S*)(?::(\d+))(?::(\d+))\)/
function hc(e) {
  var t = gc.exec(e)
  if (!t) return null
  var r = t[2] && t[2].indexOf('native') === 0,
    n = t[2] && t[2].indexOf('eval') === 0,
    i = yc.exec(t[2])
  return (
    n && i != null && ((t[2] = i[1]), (t[3] = i[2]), (t[4] = i[3])),
    {
      file: r ? null : t[2],
      methodName: t[1] || Bt,
      arguments: r ? [t[2]] : [],
      lineNumber: t[3] ? +t[3] : null,
      column: t[4] ? +t[4] : null,
    }
  )
}
var xc =
  /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i
function bc(e) {
  var t = xc.exec(e)
  return t
    ? {
        file: t[2],
        methodName: t[1] || Bt,
        arguments: [],
        lineNumber: +t[3],
        column: t[4] ? +t[4] : null,
      }
    : null
}
var wc =
    /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i,
  Ec = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i
function Pc(e) {
  var t = wc.exec(e)
  if (!t) return null
  var r = t[3] && t[3].indexOf(' > eval') > -1,
    n = Ec.exec(t[3])
  return (
    r && n != null && ((t[3] = n[1]), (t[4] = n[2]), (t[5] = null)),
    {
      file: t[3],
      methodName: t[1] || Bt,
      arguments: t[2] ? t[2].split(',') : [],
      lineNumber: t[4] ? +t[4] : null,
      column: t[5] ? +t[5] : null,
    }
  )
}
var Tc = /^\s*(?:([^@]*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i
function vc(e) {
  var t = Tc.exec(e)
  return t
    ? {
        file: t[3],
        methodName: t[1] || Bt,
        arguments: [],
        lineNumber: +t[4],
        column: t[5] ? +t[5] : null,
      }
    : null
}
var Cc =
  /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i
function Mc(e) {
  var t = Cc.exec(e)
  return t
    ? {
        file: t[2],
        methodName: t[1] || Bt,
        arguments: [],
        lineNumber: +t[3],
        column: t[4] ? +t[4] : null,
      }
    : null
}
var Zn = class {
    getLocation() {
      return null
    }
  },
  Xn = class {
    constructor() {
      this._error = new Error()
    }
    getLocation() {
      let t = this._error.stack
      if (!t) return null
      let n = gs(t).find((i) => {
        if (!i.file) return !1
        let o = An(i.file)
        return (
          o !== '<anonymous>' &&
          !o.includes('@prisma') &&
          !o.includes('/packages/client/src/runtime/') &&
          !o.endsWith('/runtime/binary.js') &&
          !o.endsWith('/runtime/library.js') &&
          !o.endsWith('/runtime/data-proxy.js') &&
          !o.endsWith('/runtime/edge.js') &&
          !o.endsWith('/runtime/edge-esm.js') &&
          !o.startsWith('internal/') &&
          !i.methodName.includes('new ') &&
          !i.methodName.includes('getCallSite') &&
          !i.methodName.includes('Proxy.') &&
          i.methodName.split('.').length < 4
        )
      })
      return !n || !n.file
        ? null
        : { fileName: n.file, lineNumber: n.lineNumber, columnNumber: n.column }
    }
  }
function Be(e) {
  return e === 'minimal' ? new Zn() : new Xn()
}
var ys = { _avg: !0, _count: !0, _sum: !0, _min: !0, _max: !0 }
function gt(e = {}) {
  let t = Sc(e)
  return Object.entries(t).reduce(
    (n, [i, o]) => (
      ys[i] !== void 0 ? (n.select[i] = { select: o }) : (n[i] = o), n
    ),
    { select: {} },
  )
}
function Sc(e = {}) {
  return typeof e._count == 'boolean' ? { ...e, _count: { _all: e._count } } : e
}
function Nr(e = {}) {
  return (t) => (typeof e._count == 'boolean' && (t._count = t._count._all), t)
}
function hs(e, t) {
  let r = Nr(e)
  return t({ action: 'aggregate', unpacker: r, argsMapper: gt })(e)
}
function Fc(e = {}) {
  let { select: t, ...r } = e
  return typeof t == 'object'
    ? gt({ ...r, _count: t })
    : gt({ ...r, _count: { _all: !0 } })
}
function Rc(e = {}) {
  return typeof e.select == 'object'
    ? (t) => Nr(e)(t)._count
    : (t) => Nr(e)(t)._count._all
}
function xs(e, t) {
  return t({ action: 'count', unpacker: Rc(e), argsMapper: Fc })(e)
}
function kc(e = {}) {
  let t = gt(e)
  if (Array.isArray(t.by))
    for (let r of t.by) typeof r == 'string' && (t.select[r] = !0)
  return t
}
function Oc(e = {}) {
  return (t) => (
    typeof e?._count == 'boolean' &&
      t.forEach((r) => {
        r._count = r._count._all
      }),
    t
  )
}
function bs(e, t) {
  return t({ action: 'groupBy', unpacker: Oc(e), argsMapper: kc })(e)
}
function ws(e, t, r) {
  if (t === 'aggregate') return (n) => hs(n, r)
  if (t === 'count') return (n) => xs(n, r)
  if (t === 'groupBy') return (n) => bs(n, r)
}
function Es(e, t) {
  let r = t.fields.filter((i) => !i.relationName),
    n = _n(r, (i) => i.name)
  return new Proxy(
    {},
    {
      get(i, o) {
        if (o in i || typeof o == 'symbol') return i[o]
        let s = n[o]
        if (s) return new jt(e, o, s.type, s.isList, s.kind === 'enum')
      },
      ...yr(Object.keys(n)),
    },
  )
}
var Ps = (e) => (Array.isArray(e) ? e : e.split('.')),
  ei = (e, t) => Ps(t).reduce((r, n) => r && r[n], e),
  Ts = (e, t, r) =>
    Ps(t).reduceRight(
      (n, i, o, s) => Object.assign({}, ei(e, s.slice(0, o)), { [i]: n }),
      r,
    )
function Dc(e, t) {
  return e === void 0 || t === void 0 ? [] : [...t, 'select', e]
}
function _c(e, t, r) {
  return t === void 0 ? e ?? {} : Ts(t, r, e || !0)
}
function ti(e, t, r, n, i, o) {
  let a = e._runtimeDataModel.models[t].fields.reduce(
    (l, u) => ({ ...l, [u.name]: u }),
    {},
  )
  return (l) => {
    let u = Be(e._errorFormat),
      c = Dc(n, i),
      p = _c(l, o, c),
      m = r({ dataPath: c, callsite: u })(p),
      g = Ic(e, t)
    return new Proxy(m, {
      get(y, f) {
        if (!g.includes(f)) return y[f]
        let P = [a[f].type, r, f],
          v = [c, p]
        return ti(e, ...P, ...v)
      },
      ...yr([...g, ...Object.getOwnPropertyNames(m)]),
    })
  }
}
function Ic(e, t) {
  return e._runtimeDataModel.models[t].fields
    .filter((r) => r.kind === 'object')
    .map((r) => r.name)
}
var Fs = A(Sn())
var Ss = A(require('fs'))
var vs = {
  keyword: De,
  entity: De,
  value: (e) => re(et(e)),
  punctuation: et,
  directive: De,
  function: De,
  variable: (e) => re(et(e)),
  string: (e) => re(Qe(e)),
  boolean: he,
  number: De,
  comment: nr,
}
var Nc = (e) => e,
  Lr = {},
  Lc = 0,
  T = {
    manual: Lr.Prism && Lr.Prism.manual,
    disableWorkerMessageHandler:
      Lr.Prism && Lr.Prism.disableWorkerMessageHandler,
    util: {
      encode: function (e) {
        if (e instanceof ge) {
          let t = e
          return new ge(t.type, T.util.encode(t.content), t.alias)
        } else
          return Array.isArray(e)
            ? e.map(T.util.encode)
            : e
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/\u00a0/g, ' ')
      },
      type: function (e) {
        return Object.prototype.toString.call(e).slice(8, -1)
      },
      objId: function (e) {
        return (
          e.__id || Object.defineProperty(e, '__id', { value: ++Lc }), e.__id
        )
      },
      clone: function e(t, r) {
        let n,
          i,
          o = T.util.type(t)
        switch (((r = r || {}), o)) {
          case 'Object':
            if (((i = T.util.objId(t)), r[i])) return r[i]
            ;(n = {}), (r[i] = n)
            for (let s in t) t.hasOwnProperty(s) && (n[s] = e(t[s], r))
            return n
          case 'Array':
            return (
              (i = T.util.objId(t)),
              r[i]
                ? r[i]
                : ((n = []),
                  (r[i] = n),
                  t.forEach(function (s, a) {
                    n[a] = e(s, r)
                  }),
                  n)
            )
          default:
            return t
        }
      },
    },
    languages: {
      extend: function (e, t) {
        let r = T.util.clone(T.languages[e])
        for (let n in t) r[n] = t[n]
        return r
      },
      insertBefore: function (e, t, r, n) {
        n = n || T.languages
        let i = n[e],
          o = {}
        for (let a in i)
          if (i.hasOwnProperty(a)) {
            if (a == t) for (let l in r) r.hasOwnProperty(l) && (o[l] = r[l])
            r.hasOwnProperty(a) || (o[a] = i[a])
          }
        let s = n[e]
        return (
          (n[e] = o),
          T.languages.DFS(T.languages, function (a, l) {
            l === s && a != e && (this[a] = o)
          }),
          o
        )
      },
      DFS: function e(t, r, n, i) {
        i = i || {}
        let o = T.util.objId
        for (let s in t)
          if (t.hasOwnProperty(s)) {
            r.call(t, s, t[s], n || s)
            let a = t[s],
              l = T.util.type(a)
            l === 'Object' && !i[o(a)]
              ? ((i[o(a)] = !0), e(a, r, null, i))
              : l === 'Array' && !i[o(a)] && ((i[o(a)] = !0), e(a, r, s, i))
          }
      },
    },
    plugins: {},
    highlight: function (e, t, r) {
      let n = { code: e, grammar: t, language: r }
      return (
        T.hooks.run('before-tokenize', n),
        (n.tokens = T.tokenize(n.code, n.grammar)),
        T.hooks.run('after-tokenize', n),
        ge.stringify(T.util.encode(n.tokens), n.language)
      )
    },
    matchGrammar: function (e, t, r, n, i, o, s) {
      for (let f in r) {
        if (!r.hasOwnProperty(f) || !r[f]) continue
        if (f == s) return
        let b = r[f]
        b = T.util.type(b) === 'Array' ? b : [b]
        for (let P = 0; P < b.length; ++P) {
          let v = b[P],
            x = v.inside,
            M = !!v.lookbehind,
            ae = !!v.greedy,
            B = 0,
            Ke = v.alias
          if (ae && !v.pattern.global) {
            let I = v.pattern.toString().match(/[imuy]*$/)[0]
            v.pattern = RegExp(v.pattern.source, I + 'g')
          }
          v = v.pattern || v
          for (let I = n, J = i; I < t.length; J += t[I].length, ++I) {
            let Ce = t[I]
            if (t.length > e.length) return
            if (Ce instanceof ge) continue
            if (ae && I != t.length - 1) {
              v.lastIndex = J
              var p = v.exec(e)
              if (!p) break
              var c = p.index + (M ? p[1].length : 0),
                m = p.index + p[0].length,
                a = I,
                l = J
              for (
                let F = t.length;
                a < F && (l < m || (!t[a].type && !t[a - 1].greedy));
                ++a
              )
                (l += t[a].length), c >= l && (++I, (J = l))
              if (t[I] instanceof ge) continue
              ;(u = a - I), (Ce = e.slice(J, l)), (p.index -= J)
            } else {
              v.lastIndex = 0
              var p = v.exec(Ce),
                u = 1
            }
            if (!p) {
              if (o) break
              continue
            }
            M && (B = p[1] ? p[1].length : 0)
            var c = p.index + B,
              p = p[0].slice(B),
              m = c + p.length,
              g = Ce.slice(0, c),
              y = Ce.slice(m)
            let G = [I, u]
            g && (++I, (J += g.length), G.push(g))
            let He = new ge(f, x ? T.tokenize(p, x) : p, Ke, p, ae)
            if (
              (G.push(He),
              y && G.push(y),
              Array.prototype.splice.apply(t, G),
              u != 1 && T.matchGrammar(e, t, r, I, J, !0, f),
              o)
            )
              break
          }
        }
      }
    },
    tokenize: function (e, t) {
      let r = [e],
        n = t.rest
      if (n) {
        for (let i in n) t[i] = n[i]
        delete t.rest
      }
      return T.matchGrammar(e, r, t, 0, 0, !1), r
    },
    hooks: {
      all: {},
      add: function (e, t) {
        let r = T.hooks.all
        ;(r[e] = r[e] || []), r[e].push(t)
      },
      run: function (e, t) {
        let r = T.hooks.all[e]
        if (!(!r || !r.length)) for (var n = 0, i; (i = r[n++]); ) i(t)
      },
    },
    Token: ge,
  }
T.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
  ],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
  'class-name': {
    pattern:
      /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ },
  },
  keyword:
    /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(?:true|false)\b/,
  function: /\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
  punctuation: /[{}[\];(),.:]/,
}
T.languages.javascript = T.languages.extend('clike', {
  'class-name': [
    T.languages.clike['class-name'],
    {
      pattern:
        /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
      lookbehind: !0,
    },
  ],
  keyword: [
    { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
    {
      pattern:
        /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: !0,
    },
  ],
  number:
    /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
  function:
    /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  operator:
    /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/,
})
T.languages.javascript['class-name'][0].pattern =
  /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/
T.languages.insertBefore('javascript', 'keyword', {
  regex: {
    pattern:
      /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/,
    lookbehind: !0,
    greedy: !0,
  },
  'function-variable': {
    pattern:
      /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
    alias: 'function',
  },
  parameter: [
    {
      pattern:
        /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
      lookbehind: !0,
      inside: T.languages.javascript,
    },
    {
      pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
      inside: T.languages.javascript,
    },
    {
      pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
      lookbehind: !0,
      inside: T.languages.javascript,
    },
    {
      pattern:
        /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
      lookbehind: !0,
      inside: T.languages.javascript,
    },
  ],
  constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
})
T.languages.markup && T.languages.markup.tag.addInlined('script', 'javascript')
T.languages.js = T.languages.javascript
T.languages.typescript = T.languages.extend('javascript', {
  keyword:
    /\b(?:abstract|as|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|var|void|while|with|yield)\b/,
  builtin:
    /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/,
})
T.languages.ts = T.languages.typescript
function ge(e, t, r, n, i) {
  ;(this.type = e),
    (this.content = t),
    (this.alias = r),
    (this.length = (n || '').length | 0),
    (this.greedy = !!i)
}
ge.stringify = function (e, t) {
  return typeof e == 'string'
    ? e
    : Array.isArray(e)
    ? e
        .map(function (r) {
          return ge.stringify(r, t)
        })
        .join('')
    : $c(e.type)(e.content)
}
function $c(e) {
  return vs[e] || Nc
}
function Cs(e) {
  return qc(e, T.languages.javascript)
}
function qc(e, t) {
  return T.tokenize(e, t)
    .map((n) => ge.stringify(n))
    .join('')
}
var Ms = A(Gi())
function As(e) {
  return (0, Ms.default)(e)
}
var ye = class {
  static read(t) {
    let r
    try {
      r = Ss.default.readFileSync(t, 'utf-8')
    } catch {
      return null
    }
    return ye.fromContent(r)
  }
  static fromContent(t) {
    let r = t.split(/\r?\n/)
    return new ye(1, r)
  }
  constructor(t, r) {
    ;(this.firstLineNumber = t), (this.lines = r)
  }
  get lastLineNumber() {
    return this.firstLineNumber + this.lines.length - 1
  }
  mapLineAt(t, r) {
    if (
      t < this.firstLineNumber ||
      t > this.lines.length + this.firstLineNumber
    )
      return this
    let n = t - this.firstLineNumber,
      i = [...this.lines]
    return (i[n] = r(i[n])), new ye(this.firstLineNumber, i)
  }
  mapLines(t) {
    return new ye(
      this.firstLineNumber,
      this.lines.map((r, n) => t(r, this.firstLineNumber + n)),
    )
  }
  lineAt(t) {
    return this.lines[t - this.firstLineNumber]
  }
  prependSymbolAt(t, r) {
    return this.mapLines((n, i) => (i === t ? `${r} ${n}` : `  ${n}`))
  }
  slice(t, r) {
    let n = this.lines.slice(t - 1, r).join(`
`)
    return new ye(
      t,
      As(n).split(`
`),
    )
  }
  highlight() {
    let t = Cs(this.toString())
    return new ye(
      this.firstLineNumber,
      t.split(`
`),
    )
  }
  toString() {
    return this.lines.join(`
`)
  }
}
var jc = {
    red: ce,
    gray: nr,
    dim: Oe,
    bold: re,
    underline: X,
    highlightSource: (e) => e.highlight(),
  },
  Bc = {
    red: (e) => e,
    gray: (e) => e,
    dim: (e) => e,
    bold: (e) => e,
    underline: (e) => e,
    highlightSource: (e) => e,
  }
function Vc(
  { callsite: e, message: t, originalMethod: r, isPanic: n, callArguments: i },
  o,
) {
  let s = {
    functionName: `prisma.${r}()`,
    message: t,
    isPanic: n ?? !1,
    callArguments: i,
  }
  if (!e || typeof window < 'u' || process.env.NODE_ENV === 'production')
    return s
  let a = e.getLocation()
  if (!a || !a.lineNumber || !a.columnNumber) return s
  let l = Math.max(1, a.lineNumber - 3),
    u = ye.read(a.fileName)?.slice(l, a.lineNumber),
    c = u?.lineAt(a.lineNumber)
  if (u && c) {
    let p = Uc(c),
      m = Kc(c)
    if (!m) return s
    ;(s.functionName = `${m.code})`),
      (s.location = a),
      n ||
        (u = u.mapLineAt(a.lineNumber, (y) => y.slice(0, m.openingBraceIndex))),
      (u = o.highlightSource(u))
    let g = String(u.lastLineNumber).length
    if (
      ((s.contextLines = u
        .mapLines((y, f) => o.gray(String(f).padStart(g)) + ' ' + y)
        .mapLines((y) => o.dim(y))
        .prependSymbolAt(a.lineNumber, o.bold(o.red('\u2192')))),
      i)
    ) {
      let y = p + g + 1
      ;(y += 2), (s.callArguments = (0, Fs.default)(i, y).slice(y))
    }
  }
  return s
}
function Kc(e) {
  let t = Object.keys(le.ModelAction).join('|'),
    n = new RegExp(String.raw`\.(${t})\(`).exec(e)
  if (n) {
    let i = n.index + n[0].length,
      o = e.lastIndexOf(' ', n.index) + 1
    return { code: e.slice(o, i), openingBraceIndex: i }
  }
  return null
}
function Uc(e) {
  let t = 0
  for (let r = 0; r < e.length; r++) {
    if (e.charAt(r) !== ' ') return t
    t++
  }
  return t
}
function Qc(
  {
    functionName: e,
    location: t,
    message: r,
    isPanic: n,
    contextLines: i,
    callArguments: o,
  },
  s,
) {
  let a = [''],
    l = t ? ' in' : ':'
  if (
    (n
      ? (a.push(
          s.red(
            `Oops, an unknown error occurred! This is ${s.bold(
              'on us',
            )}, you did nothing wrong.`,
          ),
        ),
        a.push(
          s.red(`It occurred in the ${s.bold(`\`${e}\``)} invocation${l}`),
        ))
      : a.push(s.red(`Invalid ${s.bold(`\`${e}\``)} invocation${l}`)),
    t && a.push(s.underline(Jc(t))),
    i)
  ) {
    a.push('')
    let u = [i.toString()]
    o && (u.push(o), u.push(s.dim(')'))), a.push(u.join('')), o && a.push('')
  } else a.push(''), o && a.push(o), a.push('')
  return (
    a.push(r),
    a.join(`
`)
  )
}
function Jc(e) {
  let t = [e.fileName]
  return (
    e.lineNumber && t.push(String(e.lineNumber)),
    e.columnNumber && t.push(String(e.columnNumber)),
    t.join(':')
  )
}
function yt(e) {
  let t = e.showColors ? jc : Bc,
    r = Vc(e, t)
  return Qc(r, t)
}
function Rs(e, t, r, n) {
  return e === le.ModelAction.findFirstOrThrow ||
    e === le.ModelAction.findUniqueOrThrow
    ? Gc(t, r, n)
    : n
}
function Gc(e, t, r) {
  return async (n) => {
    if ('rejectOnNotFound' in n.args) {
      let o = yt({
        originalMethod: n.clientMethod,
        callsite: n.callsite,
        message: "'rejectOnNotFound' option is not supported",
      })
      throw new te(o, { clientVersion: t })
    }
    return await r(n).catch((o) => {
      throw o instanceof z && o.code === 'P2025'
        ? new Me(`No ${e} found`, t)
        : o
    })
  }
}
function Te(e) {
  return e.replace(/^./, (t) => t.toLowerCase())
}
var Wc = [
    'findUnique',
    'findUniqueOrThrow',
    'findFirst',
    'findFirstOrThrow',
    'create',
    'update',
    'upsert',
    'delete',
  ],
  Hc = ['aggregate', 'count', 'groupBy']
function ri(e, t) {
  let r = [Yc(e, t), zc(t), Xc(e, t)],
    n = e._extensions.getAllModelExtensions(t)
  return n && r.push(kt(n)), be({}, r)
}
function zc(e) {
  return me('name', () => e)
}
function Yc(e, t) {
  let r = Te(t),
    n = Object.keys(le.ModelAction).concat('count')
  return {
    getKeys() {
      return n
    },
    getPropertyValue(i) {
      let o = i,
        s = (l) => e._request(l)
      s = Rs(o, t, e._clientVersion, s)
      let a = (l) => (u) => {
        let c = Be(e._errorFormat)
        return e._createPrismaPromise((p) => {
          let m = {
            args: u,
            dataPath: [],
            action: o,
            model: t,
            clientMethod: `${r}.${i}`,
            jsModelName: r,
            transaction: p,
            callsite: c,
          }
          return s({ ...m, ...l })
        })
      }
      return Wc.includes(o) ? ti(e, t, a) : Zc(i) ? ws(e, i, a) : a({})
    },
  }
}
function Zc(e) {
  return Hc.includes(e)
}
function Xc(e, t) {
  return Ge(
    me('fields', () => {
      let r = e._runtimeDataModel.models[t]
      return Es(t, r)
    }),
  )
}
function ks(e) {
  return e.replace(/^./, (t) => t.toUpperCase())
}
var ni = Symbol()
function Vt(e) {
  let t = [ep(e), me(ni, () => e)],
    r = e._extensions.getAllClientExtensions()
  return r && t.push(kt(r)), be(e, t)
}
function ep(e) {
  let t = Object.keys(e._runtimeDataModel.models),
    r = t.map(Te),
    n = [...new Set(t.concat(r))]
  return Ge({
    getKeys() {
      return n
    },
    getPropertyValue(i) {
      let o = ks(i)
      if (e._runtimeDataModel.models[o] !== void 0) return ri(e, o)
      if (e._runtimeDataModel.models[i] !== void 0) return ri(e, i)
    },
    getPropertyDescriptor(i) {
      if (!r.includes(i)) return { enumerable: !1 }
    },
  })
}
function $r(e) {
  return e[ni] ? e[ni] : e
}
function Os(e) {
  if (typeof e == 'function') return e(this)
  let t = $r(this),
    r = Object.create(t, {
      _extensions: { value: this._extensions.append(e) },
      $use: { value: void 0 },
      $on: { value: void 0 },
    })
  return Vt(r)
}
function Ds(e) {
  if (e instanceof K) return tp(e)
  if (Array.isArray(e)) {
    let r = [e[0]]
    for (let n = 1; n < e.length; n++) r[n] = Kt(e[n])
    return r
  }
  let t = {}
  for (let r in e) t[r] = Kt(e[r])
  return t
}
function tp(e) {
  return new K(e.strings, e.values)
}
function Kt(e) {
  if (typeof e != 'object' || e == null || e instanceof Se || dt(e)) return e
  if (mt(e)) return new Ee(e.toFixed())
  if (ut(e)) return new Date(+e)
  if (ArrayBuffer.isView(e)) return e.slice(0)
  if (Array.isArray(e)) {
    let t = e.length,
      r
    for (r = Array(t); t--; ) r[t] = Kt(e[t])
    return r
  }
  if (typeof e == 'object') {
    let t = {}
    for (let r in e)
      r === '__proto__'
        ? Object.defineProperty(t, r, {
            value: Kt(e[r]),
            configurable: !0,
            enumerable: !0,
            writable: !0,
          })
        : (t[r] = Kt(e[r]))
    return t
  }
  pe(e, 'Unknown value')
}
function Is(e, t, r, n = 0) {
  return e._createPrismaPromise((i) => {
    let o = t.customDataProxyFetch
    return (
      'transaction' in t &&
        i !== void 0 &&
        (t.transaction?.kind === 'batch' && t.transaction.lock.then(),
        (t.transaction = i)),
      n === r.length
        ? e._executeRequest(t)
        : r[n]({
            model: t.model,
            operation: t.model ? t.action : t.clientMethod,
            args: Ds(t.args ?? {}),
            __internalParams: t,
            query: (s, a = t) => {
              let l = a.customDataProxyFetch
              return (
                (a.customDataProxyFetch = qs(o, l)),
                (a.args = s),
                Is(e, a, r, n + 1)
              )
            },
          })
    )
  })
}
function Ns(e, t) {
  let { jsModelName: r, action: n, clientMethod: i } = t,
    o = r ? n : i
  if (e._extensions.isEmpty()) return e._executeRequest(t)
  let s = e._extensions.getAllQueryCallbacks(r ?? '$none', o)
  return Is(e, t, s)
}
function Ls(e) {
  return (t) => {
    let r = { requests: t },
      n = t[0].extensions.getAllBatchQueryCallbacks()
    return n.length ? $s(r, n, 0, e) : e(r)
  }
}
function $s(e, t, r, n) {
  if (r === t.length) return n(e)
  let i = e.customDataProxyFetch,
    o = e.requests[0].transaction
  return t[r]({
    args: {
      queries: e.requests.map((s) => ({
        model: s.modelName,
        operation: s.action,
        args: s.args,
      })),
      transaction: o
        ? { isolationLevel: o.kind === 'batch' ? o.isolationLevel : void 0 }
        : void 0,
    },
    __internalParams: e,
    query(s, a = e) {
      let l = a.customDataProxyFetch
      return (a.customDataProxyFetch = qs(i, l)), $s(a, t, r + 1, n)
    },
  })
}
var _s = (e) => e
function qs(e = _s, t = _s) {
  return (r) => e(t(r))
}
function Bs(e, t, r) {
  let n = Te(r)
  return !t.result || !(t.result.$allModels || t.result[n])
    ? e
    : rp({
        ...e,
        ...js(t.name, e, t.result.$allModels),
        ...js(t.name, e, t.result[n]),
      })
}
function rp(e) {
  let t = new xe(),
    r = (n, i) =>
      t.getOrCreate(n, () =>
        i.has(n)
          ? [n]
          : (i.add(n), e[n] ? e[n].needs.flatMap((o) => r(o, i)) : [n]),
      )
  return st(e, (n) => ({ ...n, needs: r(n.name, new Set()) }))
}
function js(e, t, r) {
  return r
    ? st(r, ({ needs: n, compute: i }, o) => ({
        name: o,
        needs: n ? Object.keys(n).filter((s) => n[s]) : [],
        compute: np(t, o, i),
      }))
    : {}
}
function np(e, t, r) {
  let n = e?.[t]?.compute
  return n ? (i) => r({ ...i, [t]: n(i) }) : r
}
function Vs(e, t) {
  if (!t) return e
  let r = { ...e }
  for (let n of Object.values(t))
    if (!!e[n.name]) for (let i of n.needs) r[i] = !0
  return r
}
var qr = class {
    constructor(t, r) {
      this.extension = t
      this.previous = r
      this.computedFieldsCache = new xe()
      this.modelExtensionsCache = new xe()
      this.queryCallbacksCache = new xe()
      this.clientExtensions = Rt(() =>
        this.extension.client
          ? {
              ...this.previous?.getAllClientExtensions(),
              ...this.extension.client,
            }
          : this.previous?.getAllClientExtensions(),
      )
      this.batchCallbacks = Rt(() => {
        let t = this.previous?.getAllBatchQueryCallbacks() ?? [],
          r = this.extension.query?.$__internalBatch
        return r ? t.concat(r) : t
      })
    }
    getAllComputedFields(t) {
      return this.computedFieldsCache.getOrCreate(t, () =>
        Bs(this.previous?.getAllComputedFields(t), this.extension, t),
      )
    }
    getAllClientExtensions() {
      return this.clientExtensions.get()
    }
    getAllModelExtensions(t) {
      return this.modelExtensionsCache.getOrCreate(t, () => {
        let r = Te(t)
        return !this.extension.model ||
          !(this.extension.model[r] || this.extension.model.$allModels)
          ? this.previous?.getAllModelExtensions(t)
          : {
              ...this.previous?.getAllModelExtensions(t),
              ...this.extension.model.$allModels,
              ...this.extension.model[r],
            }
      })
    }
    getAllQueryCallbacks(t, r) {
      return this.queryCallbacksCache.getOrCreate(`${t}:${r}`, () => {
        let n = this.previous?.getAllQueryCallbacks(t, r) ?? [],
          i = [],
          o = this.extension.query
        return !o || !(o[t] || o.$allModels || o[r] || o.$allOperations)
          ? n
          : (o[t] !== void 0 &&
              (o[t][r] !== void 0 && i.push(o[t][r]),
              o[t].$allOperations !== void 0 && i.push(o[t].$allOperations)),
            t !== '$none' &&
              o.$allModels !== void 0 &&
              (o.$allModels[r] !== void 0 && i.push(o.$allModels[r]),
              o.$allModels.$allOperations !== void 0 &&
                i.push(o.$allModels.$allOperations)),
            o[r] !== void 0 && i.push(o[r]),
            o.$allOperations !== void 0 && i.push(o.$allOperations),
            n.concat(i))
      })
    }
    getAllBatchQueryCallbacks() {
      return this.batchCallbacks.get()
    }
  },
  Ve = class {
    constructor(t) {
      this.head = t
    }
    static empty() {
      return new Ve()
    }
    static single(t) {
      return new Ve(new qr(t))
    }
    isEmpty() {
      return this.head === void 0
    }
    append(t) {
      return new Ve(new qr(t, this.head))
    }
    getAllComputedFields(t) {
      return this.head?.getAllComputedFields(t)
    }
    getAllClientExtensions() {
      return this.head?.getAllClientExtensions()
    }
    getAllModelExtensions(t) {
      return this.head?.getAllModelExtensions(t)
    }
    getAllQueryCallbacks(t, r) {
      return this.head?.getAllQueryCallbacks(t, r) ?? []
    }
    getAllBatchQueryCallbacks() {
      return this.head?.getAllBatchQueryCallbacks() ?? []
    }
  }
var Ks = N('prisma:client'),
  Us = { Vercel: 'vercel', 'Netlify CI': 'netlify' }
function Qs({ postinstall: e, ciName: t, clientVersion: r }) {
  if (
    (Ks('checkPlatformCaching:postinstall', e),
    Ks('checkPlatformCaching:ciName', t),
    e === !0 && t && t in Us)
  ) {
    let n = `Prisma has detected that this project was built on ${t}, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the \`prisma generate\` command during the build process.

Learn how: https://pris.ly/d/${Us[t]}-build`
    throw (console.error(n), new _(n, r))
  }
}
var Ys = A(ii())
function Hs(e, t) {
  let r = zs(e),
    n = ip(r),
    i = sp(n)
  i ? jr(i, t) : t.addErrorMessage(() => 'Unknown error')
}
function zs(e) {
  return e.errors.flatMap((t) => (t.kind === 'Union' ? zs(t) : [t]))
}
function ip(e) {
  let t = new Map(),
    r = []
  for (let n of e) {
    if (n.kind !== 'InvalidArgumentType') {
      r.push(n)
      continue
    }
    let i = `${n.selectionPath.join('.')}:${n.argumentPath.join('.')}`,
      o = t.get(i)
    o
      ? t.set(i, {
          ...n,
          argument: {
            ...n.argument,
            typeNames: op(o.argument.typeNames, n.argument.typeNames),
          },
        })
      : t.set(i, n)
  }
  return r.push(...t.values()), r
}
function op(e, t) {
  return [...new Set(e.concat(t))]
}
function sp(e) {
  return In(e, (t, r) => {
    let n = Gs(t),
      i = Gs(r)
    return n !== i ? n - i : Ws(t) - Ws(r)
  })
}
function Gs(e) {
  let t = 0
  return (
    Array.isArray(e.selectionPath) && (t += e.selectionPath.length),
    Array.isArray(e.argumentPath) && (t += e.argumentPath.length),
    t
  )
}
function Ws(e) {
  switch (e.kind) {
    case 'InvalidArgumentValue':
    case 'ValueTooLarge':
      return 20
    case 'InvalidArgumentType':
      return 10
    case 'RequiredArgumentMissing':
      return -10
    default:
      return 0
  }
}
var Re = class {
  constructor(t, r) {
    this.name = t
    this.value = r
    this.isRequired = !1
  }
  makeRequired() {
    return (this.isRequired = !0), this
  }
  write(t) {
    let {
      colors: { green: r },
    } = t.context
    t.addMarginSymbol(r(this.isRequired ? '+' : '?')),
      t.write(r(this.name)),
      this.isRequired || t.write(r('?')),
      t.write(r(': ')),
      typeof this.value == 'string'
        ? t.write(r(this.value))
        : t.write(this.value)
  }
}
var Br = class {
  constructor() {
    this.fields = []
  }
  addField(t, r) {
    return (
      this.fields.push({
        write(n) {
          let { green: i, dim: o } = n.context.colors
          n.write(i(o(`${t}: ${r}`))).addMarginSymbol(i(o('+')))
        },
      }),
      this
    )
  }
  write(t) {
    let {
      colors: { green: r },
    } = t.context
    t.writeLine(r('{'))
      .withIndent(() => {
        t.writeJoined(ft, this.fields).newLine()
      })
      .write(r('}'))
      .addMarginSymbol(r('+'))
  }
}
function jr(e, t) {
  switch (e.kind) {
    case 'IncludeAndSelect':
      ap(e, t)
      break
    case 'IncludeOnScalar':
      lp(e, t)
      break
    case 'EmptySelection':
      up(e, t)
      break
    case 'UnknownSelectionField':
      cp(e, t)
      break
    case 'UnknownArgument':
      pp(e, t)
      break
    case 'UnknownInputField':
      mp(e, t)
      break
    case 'RequiredArgumentMissing':
      dp(e, t)
      break
    case 'InvalidArgumentType':
      fp(e, t)
      break
    case 'InvalidArgumentValue':
      gp(e, t)
      break
    case 'ValueTooLarge':
      yp(e, t)
      break
    case 'SomeFieldsMissing':
      hp(e, t)
      break
    case 'TooManyFieldsGiven':
      xp(e, t)
      break
    case 'Union':
      Hs(e, t)
      break
    default:
      throw new Error('not implemented: ' + e.kind)
  }
}
function ap(e, t) {
  let r = t.arguments.getDeepSubSelectionValue(e.selectionPath)
  r &&
    r instanceof D &&
    (r.getField('include')?.markAsError(), r.getField('select')?.markAsError()),
    t.addErrorMessage(
      (n) =>
        `Please ${n.bold('either')} use ${n.green('`include`')} or ${n.green(
          '`select`',
        )}, but ${n.red('not both')} at the same time.`,
    )
}
function lp(e, t) {
  let [r, n] = Vr(e.selectionPath),
    i = e.outputType,
    o = t.arguments.getDeepSelectionParent(r)?.value
  if (o && (o.getField(n)?.markAsError(), i))
    for (let s of i.fields)
      s.isRelation && o.addSuggestion(new Re(s.name, 'true'))
  t.addErrorMessage((s) => {
    let a = `Invalid scalar field ${s.red(`\`${n}\``)} for ${s.bold(
      'include',
    )} statement`
    return (
      i ? (a += ` on model ${s.bold(i.name)}. ${Ut(s)}`) : (a += '.'),
      (a += `
Note that ${s.bold('include')} statements only accept relation fields.`),
      a
    )
  })
}
function up(e, t) {
  let r = e.outputType,
    n = t.arguments.getDeepSelectionParent(e.selectionPath)?.value,
    i = n?.isEmpty() ?? !1
  n && (n.removeAllFields(), ea(n, r)),
    t.addErrorMessage((o) =>
      i
        ? `The ${o.red('`select`')} statement for type ${o.bold(
            r.name,
          )} must not be empty. ${Ut(o)}`
        : `The ${o.red('`select`')} statement for type ${o.bold(
            r.name,
          )} needs ${o.bold('at least one truthy value')}.`,
    )
}
function cp(e, t) {
  let [r, n] = Vr(e.selectionPath),
    i = t.arguments.getDeepSelectionParent(r)
  i && (i.value.getField(n)?.markAsError(), ea(i.value, e.outputType)),
    t.addErrorMessage((o) => {
      let s = [`Unknown field ${o.red(`\`${n}\``)}`]
      return (
        i && s.push(`for ${o.bold(i.kind)} statement`),
        s.push(`on model ${o.bold(`\`${e.outputType.name}\``)}.`),
        s.push(Ut(o)),
        s.join(' ')
      )
    })
}
function pp(e, t) {
  let r = e.argumentPath[0],
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath)
  n instanceof D && (n.getField(r)?.markAsError(), bp(n, e.arguments)),
    t.addErrorMessage((i) =>
      Zs(
        i,
        r,
        e.arguments.map((o) => o.name),
      ),
    )
}
function mp(e, t) {
  let [r, n] = Vr(e.argumentPath),
    i = t.arguments.getDeepSubSelectionValue(e.selectionPath)
  if (i instanceof D) {
    i.getDeepField(e.argumentPath)?.markAsError()
    let o = i.getDeepFieldValue(r)
    o instanceof D && ta(o, e.inputType)
  }
  t.addErrorMessage((o) =>
    Zs(
      o,
      n,
      e.inputType.fields.map((s) => s.name),
    ),
  )
}
function Zs(e, t, r) {
  let n = [`Unknown argument \`${e.red(t)}\`.`],
    i = Ep(t, r)
  return (
    i && n.push(`Did you mean \`${e.green(i)}\`?`),
    r.length > 0 && n.push(Ut(e)),
    n.join(' ')
  )
}
function dp(e, t) {
  let r
  t.addErrorMessage((l) =>
    r?.value instanceof Q && r.value.text === 'null'
      ? `Argument \`${l.green(o)}\` must not be ${l.red('null')}.`
      : `Argument \`${l.green(o)}\` is missing.`,
  )
  let n = t.arguments.getDeepSubSelectionValue(e.selectionPath)
  if (!(n instanceof D)) return
  let [i, o] = Vr(e.argumentPath),
    s = new Br(),
    a = n.getDeepFieldValue(i)
  if (a instanceof D)
    if (
      ((r = a.getField(o)),
      r && a.removeField(o),
      e.inputTypes.length === 1 && e.inputTypes[0].kind === 'object')
    ) {
      for (let l of e.inputTypes[0].fields)
        s.addField(l.name, l.typeNames.join(' | '))
      a.addSuggestion(new Re(o, s).makeRequired())
    } else {
      let l = e.inputTypes.map(Xs).join(' | ')
      a.addSuggestion(new Re(o, l).makeRequired())
    }
}
function Xs(e) {
  return e.kind === 'list' ? `${Xs(e.elementType)}[]` : e.name
}
function fp(e, t) {
  let r = e.argument.name,
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath)
  n instanceof D && n.getDeepFieldValue(e.argumentPath)?.markAsError(),
    t.addErrorMessage((i) => {
      let o = Kr(
        'or',
        e.argument.typeNames.map((s) => i.green(s)),
      )
      return `Argument \`${i.bold(
        r,
      )}\`: Invalid value provided. Expected ${o}, provided ${i.red(
        e.inferredType,
      )}.`
    })
}
function gp(e, t) {
  let r = e.argument.name,
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath)
  n instanceof D && n.getDeepFieldValue(e.argumentPath)?.markAsError(),
    t.addErrorMessage((i) => {
      let o = Kr(
          'or',
          e.argument.typeNames.map((a) => i.green(a)),
        ),
        s = [`Invalid value for argument \`${i.bold(r)}\``]
      return (
        e.underlyingError && s.push(`: ${e.underlyingError}`),
        s.push(`. Expected ${o}.`),
        s.join('')
      )
    })
}
function yp(e, t) {
  let r = e.argument.name,
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath),
    i
  if (n instanceof D) {
    let s = n.getDeepField(e.argumentPath)?.value
    s?.markAsError(), s instanceof Q && (i = s.text)
  }
  t.addErrorMessage((o) => {
    let s = ['Unable to fit value']
    return (
      i && s.push(o.red(i)),
      s.push(`into a 64-bit signed integer for field \`${o.bold(r)}\``),
      s.join(' ')
    )
  })
}
function hp(e, t) {
  let r = e.argumentPath[e.argumentPath.length - 1],
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath)
  if (n instanceof D) {
    let i = n.getDeepFieldValue(e.argumentPath)
    i instanceof D && ta(i, e.inputType)
  }
  t.addErrorMessage((i) => {
    let o = [
      `Argument \`${i.bold(r)}\` of type ${i.bold(e.inputType.name)} needs`,
    ]
    return (
      e.constraints.minFieldCount === 1
        ? e.constraints.requiredFields
          ? o.push(
              `${i.green('at least one of')} ${Kr(
                'or',
                e.constraints.requiredFields.map((s) => `\`${i.bold(s)}\``),
              )} arguments.`,
            )
          : o.push(`${i.green('at least one')} argument.`)
        : o.push(
            `${i.green(`at least ${e.constraints.minFieldCount}`)} arguments.`,
          ),
      o.push(Ut(i)),
      o.join(' ')
    )
  })
}
function xp(e, t) {
  let r = e.argumentPath[e.argumentPath.length - 1],
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath),
    i = []
  if (n instanceof D) {
    let o = n.getDeepFieldValue(e.argumentPath)
    o instanceof D && (o.markAsError(), (i = Object.keys(o.getFields())))
  }
  t.addErrorMessage((o) => {
    let s = [
      `Argument \`${o.bold(r)}\` of type ${o.bold(e.inputType.name)} needs`,
    ]
    return (
      e.constraints.minFieldCount === 1 && e.constraints.maxFieldCount == 1
        ? s.push(`${o.green('exactly one')} argument,`)
        : e.constraints.maxFieldCount == 1
        ? s.push(`${o.green('at most one')} argument,`)
        : s.push(
            `${o.green(`at most ${e.constraints.maxFieldCount}`)} arguments,`,
          ),
      s.push(
        `but you provided ${Kr(
          'and',
          i.map((a) => o.red(a)),
        )}. Please choose`,
      ),
      e.constraints.maxFieldCount === 1
        ? s.push('one.')
        : s.push(`${e.constraints.maxFieldCount}.`),
      s.join(' ')
    )
  })
}
function ea(e, t) {
  for (let r of t.fields)
    e.hasField(r.name) || e.addSuggestion(new Re(r.name, 'true'))
}
function bp(e, t) {
  for (let r of t)
    e.hasField(r.name) ||
      e.addSuggestion(new Re(r.name, r.typeNames.join(' | ')))
}
function ta(e, t) {
  if (t.kind === 'object')
    for (let r of t.fields)
      e.hasField(r.name) ||
        e.addSuggestion(new Re(r.name, r.typeNames.join(' | ')))
}
function Vr(e) {
  let t = [...e],
    r = t.pop()
  if (!r) throw new Error('unexpected empty path')
  return [t, r]
}
function Ut({ green: e }) {
  return `Available options are listed in ${e('green')}.`
}
function Kr(e, t) {
  if (t.length === 1) return t[0]
  let r = [...t],
    n = r.pop()
  return `${r.join(', ')} ${e} ${n}`
}
var wp = 3
function Ep(e, t) {
  let r = 1 / 0,
    n
  for (let i of t) {
    let o = (0, Ys.default)(e, i)
    o > wp || (o < r && ((r = o), (n = i)))
  }
  return n
}
function Ur({
  args: e,
  errors: t,
  errorFormat: r,
  callsite: n,
  originalMethod: i,
  clientVersion: o,
}) {
  let s = Ir(e)
  for (let p of t) jr(p, s)
  let a = r === 'pretty' ? cs : Or,
    l = s.renderAllMessages(a),
    u = new lt(0, { colors: a }).write(s).toString(),
    c = yt({
      message: l,
      callsite: n,
      originalMethod: i,
      showColors: r === 'pretty',
      callArguments: u,
    })
  throw new te(c, { clientVersion: o })
}
var Pp = {
  findUnique: 'findUnique',
  findUniqueOrThrow: 'findUniqueOrThrow',
  findFirst: 'findFirst',
  findFirstOrThrow: 'findFirstOrThrow',
  findMany: 'findMany',
  count: 'aggregate',
  create: 'createOne',
  createMany: 'createMany',
  update: 'updateOne',
  updateMany: 'updateMany',
  upsert: 'upsertOne',
  delete: 'deleteOne',
  deleteMany: 'deleteMany',
  executeRaw: 'executeRaw',
  queryRaw: 'queryRaw',
  aggregate: 'aggregate',
  groupBy: 'groupBy',
  runCommandRaw: 'runCommandRaw',
  findRaw: 'findRaw',
  aggregateRaw: 'aggregateRaw',
}
function ra({
  modelName: e,
  action: t,
  args: r,
  runtimeDataModel: n,
  extensions: i,
  callsite: o,
  clientMethod: s,
  errorFormat: a,
  clientVersion: l,
}) {
  let u = new ht({
    runtimeDataModel: n,
    modelName: e,
    action: t,
    rootArgs: r,
    callsite: o,
    extensions: i,
    selectionPath: [],
    argumentPath: [],
    originalMethod: s,
    errorFormat: a,
    clientVersion: l,
  })
  return { modelName: e, action: Pp[t], query: oi(r, u) }
}
function oi({ select: e, include: t, ...r } = {}, n) {
  return { arguments: ia(r, n), selection: Tp(e, t, n) }
}
function Tp(e, t, r) {
  return (
    e &&
      t &&
      r.throwValidationError({
        kind: 'IncludeAndSelect',
        selectionPath: r.getSelectionPath(),
      }),
    e ? Mp(e, r) : vp(r, t)
  )
}
function vp(e, t) {
  let r = {}
  return (
    e.model && !e.isRawAction() && ((r.$composites = !0), (r.$scalars = !0)),
    t && Cp(r, t, e),
    r
  )
}
function Cp(e, t, r) {
  for (let [n, i] of Object.entries(t)) {
    let o = r.findField(n)
    o &&
      o?.kind !== 'object' &&
      r.throwValidationError({
        kind: 'IncludeOnScalar',
        selectionPath: r.getSelectionPath().concat(n),
        outputType: r.getOutputTypeDescription(),
      }),
      i === !0
        ? (e[n] = !0)
        : typeof i == 'object' && (e[n] = oi(i, r.nestSelection(n)))
  }
}
function Mp(e, t) {
  let r = {},
    n = t.getComputedFields(),
    i = Vs(e, n)
  for (let [o, s] of Object.entries(i)) {
    let a = t.findField(o)
    ;(n?.[o] && !a) ||
      (s === !0
        ? (r[o] = !0)
        : typeof s == 'object' && (r[o] = oi(s, t.nestSelection(o))))
  }
  return r
}
function na(e, t) {
  if (e === null) return null
  if (typeof e == 'string' || typeof e == 'number' || typeof e == 'boolean')
    return e
  if (typeof e == 'bigint') return { $type: 'BigInt', value: String(e) }
  if (ut(e)) {
    if (Tr(e)) return { $type: 'DateTime', value: e.toISOString() }
    t.throwValidationError({
      kind: 'InvalidArgumentValue',
      selectionPath: t.getSelectionPath(),
      argumentPath: t.getArgumentPath(),
      argument: { name: t.getArgumentName(), typeNames: ['Date'] },
      underlyingError: 'Provided Date object is invalid',
    })
  }
  if (dt(e))
    return {
      $type: 'FieldRef',
      value: { _ref: e.name, _container: e.modelName },
    }
  if (Array.isArray(e)) return Ap(e, t)
  if (ArrayBuffer.isView(e))
    return { $type: 'Bytes', value: Buffer.from(e).toString('base64') }
  if (Sp(e)) return e.values
  if (mt(e)) return { $type: 'Decimal', value: e.toFixed() }
  if (e instanceof Se) {
    if (e !== Pr.instances[e._getName()])
      throw new Error('Invalid ObjectEnumValue')
    return { $type: 'Enum', value: e._getName() }
  }
  if (typeof e == 'object') return ia(e, t)
  pe(e, 'Unknown value type')
}
function ia(e, t) {
  if (e.$type) return { $type: 'Json', value: JSON.stringify(e) }
  let r = {}
  for (let n in e) {
    let i = e[n]
    i !== void 0 && (r[n] = na(i, t.nestArgument(n)))
  }
  return r
}
function Ap(e, t) {
  let r = []
  for (let n = 0; n < e.length; n++) {
    let i = e[n]
    i !== void 0 && r.push(na(i, t.nestArgument(String(n))))
  }
  return r
}
function Sp(e) {
  return typeof e == 'object' && e !== null && e.__prismaRawParameters__ === !0
}
var ht = class {
  constructor(t) {
    this.params = t
    this.params.modelName &&
      (this.model = this.params.runtimeDataModel.models[this.params.modelName])
  }
  throwValidationError(t) {
    Ur({
      errors: [t],
      originalMethod: this.params.originalMethod,
      args: this.params.rootArgs ?? {},
      callsite: this.params.callsite,
      errorFormat: this.params.errorFormat,
      clientVersion: this.params.clientVersion,
    })
  }
  getSelectionPath() {
    return this.params.selectionPath
  }
  getArgumentPath() {
    return this.params.argumentPath
  }
  getArgumentName() {
    return this.params.argumentPath[this.params.argumentPath.length - 1]
  }
  getOutputTypeDescription() {
    if (!(!this.params.modelName || !this.model))
      return {
        name: this.params.modelName,
        fields: this.model.fields.map((t) => ({
          name: t.name,
          typeName: 'boolean',
          isRelation: t.kind === 'object',
        })),
      }
  }
  isRawAction() {
    return [
      'executeRaw',
      'queryRaw',
      'runCommandRaw',
      'findRaw',
      'aggregateRaw',
    ].includes(this.params.action)
  }
  getComputedFields() {
    if (!!this.params.modelName)
      return this.params.extensions.getAllComputedFields(this.params.modelName)
  }
  findField(t) {
    return this.model?.fields.find((r) => r.name === t)
  }
  nestSelection(t) {
    let r = this.findField(t),
      n = r?.kind === 'object' ? r.type : void 0
    return new ht({
      ...this.params,
      modelName: n,
      selectionPath: this.params.selectionPath.concat(t),
    })
  }
  nestArgument(t) {
    return new ht({
      ...this.params,
      argumentPath: this.params.argumentPath.concat(t),
    })
  }
}
var oa = (e) => ({ command: e })
var sa = (e) => e.strings.reduce((t, r, n) => `${t}@P${n}${r}`)
function Qt(e) {
  try {
    return aa(e, 'fast')
  } catch {
    return aa(e, 'slow')
  }
}
function aa(e, t) {
  return JSON.stringify(e.map((r) => Fp(r, t)))
}
function Fp(e, t) {
  return typeof e == 'bigint'
    ? { prisma__type: 'bigint', prisma__value: e.toString() }
    : ut(e)
    ? { prisma__type: 'date', prisma__value: e.toJSON() }
    : Ee.isDecimal(e)
    ? { prisma__type: 'decimal', prisma__value: e.toJSON() }
    : Buffer.isBuffer(e)
    ? { prisma__type: 'bytes', prisma__value: e.toString('base64') }
    : Rp(e) || ArrayBuffer.isView(e)
    ? {
        prisma__type: 'bytes',
        prisma__value: Buffer.from(e).toString('base64'),
      }
    : typeof e == 'object' && t === 'slow'
    ? ua(e)
    : e
}
function Rp(e) {
  return e instanceof ArrayBuffer || e instanceof SharedArrayBuffer
    ? !0
    : typeof e == 'object' && e !== null
    ? e[Symbol.toStringTag] === 'ArrayBuffer' ||
      e[Symbol.toStringTag] === 'SharedArrayBuffer'
    : !1
}
function ua(e) {
  if (typeof e != 'object' || e === null) return e
  if (typeof e.toJSON == 'function') return e.toJSON()
  if (Array.isArray(e)) return e.map(la)
  let t = {}
  for (let r of Object.keys(e)) t[r] = la(e[r])
  return t
}
function la(e) {
  return typeof e == 'bigint' ? e.toString() : ua(e)
}
var kp = /^(\s*alter\s)/i,
  ca = N('prisma:client')
function si(e, t, r, n) {
  if (
    !(e !== 'postgresql' && e !== 'cockroachdb') &&
    r.length > 0 &&
    kp.exec(t)
  )
    throw new Error(`Running ALTER using ${n} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`)
}
var ai = (e, t) => (r) => {
    let n = '',
      i
    if (Array.isArray(r)) {
      let [o, ...s] = r
      ;(n = o), (i = { values: Qt(s || []), __prismaRawParameters__: !0 })
    } else
      switch (e) {
        case 'sqlite':
        case 'mysql': {
          ;(n = r.sql),
            (i = { values: Qt(r.values), __prismaRawParameters__: !0 })
          break
        }
        case 'cockroachdb':
        case 'postgresql': {
          ;(n = r.text),
            (i = { values: Qt(r.values), __prismaRawParameters__: !0 })
          break
        }
        case 'sqlserver': {
          ;(n = sa(r)),
            (i = { values: Qt(r.values), __prismaRawParameters__: !0 })
          break
        }
        default:
          throw new Error(`The ${e} provider does not support ${t}`)
      }
    return (
      i?.values
        ? ca(`prisma.${t}(${n}, ${i.values})`)
        : ca(`prisma.${t}(${n})`),
      { query: n, parameters: i }
    )
  },
  pa = {
    requestArgsToMiddlewareArgs(e) {
      return [e.strings, ...e.values]
    },
    middlewareArgsToRequestArgs(e) {
      let [t, ...r] = e
      return new K(t, r)
    },
  },
  ma = {
    requestArgsToMiddlewareArgs(e) {
      return [e]
    },
    middlewareArgsToRequestArgs(e) {
      return e[0]
    },
  }
function li(e) {
  return function (r) {
    let n,
      i = (o = e) => {
        try {
          return o === void 0 || o?.kind === 'itx'
            ? n ?? (n = da(r(o)))
            : da(r(o))
        } catch (s) {
          return Promise.reject(s)
        }
      }
    return {
      then(o, s) {
        return i().then(o, s)
      },
      catch(o) {
        return i().catch(o)
      },
      finally(o) {
        return i().finally(o)
      },
      requestTransaction(o) {
        let s = i(o)
        return s.requestTransaction ? s.requestTransaction(o) : s
      },
      [Symbol.toStringTag]: 'PrismaPromise',
    }
  }
}
function da(e) {
  return typeof e.then == 'function' ? e : Promise.resolve(e)
}
var fa = {
    isEnabled() {
      return !1
    },
    getTraceParent() {
      return '00-10-10-00'
    },
    async createEngineSpan() {},
    getActiveContext() {},
    runInChildSpan(e, t) {
      return t()
    },
  },
  ui = class {
    isEnabled() {
      return this.getGlobalTracingHelper().isEnabled()
    }
    getTraceParent(t) {
      return this.getGlobalTracingHelper().getTraceParent(t)
    }
    createEngineSpan(t) {
      return this.getGlobalTracingHelper().createEngineSpan(t)
    }
    getActiveContext() {
      return this.getGlobalTracingHelper().getActiveContext()
    }
    runInChildSpan(t, r) {
      return this.getGlobalTracingHelper().runInChildSpan(t, r)
    }
    getGlobalTracingHelper() {
      return globalThis.PRISMA_INSTRUMENTATION?.helper ?? fa
    }
  }
function ga(e) {
  return e.includes('tracing') ? new ui() : fa
}
function ya(e, t = () => {}) {
  let r,
    n = new Promise((i) => (r = i))
  return {
    then(i) {
      return --e === 0 && r(t()), i?.(n)
    },
  }
}
function ha(e) {
  return typeof e == 'string'
    ? e
    : e.reduce((t, r) => {
        let n = typeof r == 'string' ? r : r.level
        return n === 'query'
          ? t
          : t && (r === 'info' || t === 'info')
          ? 'info'
          : n
      }, void 0)
}
var Op = ['$connect', '$disconnect', '$on', '$transaction', '$use', '$extends'],
  xa = Op
function wa(e, t, r) {
  let n = ba(e, r),
    i = ba(t, r),
    o = Object.values(i).map((a) => a[a.length - 1]),
    s = Object.keys(i)
  return (
    Object.entries(n).forEach(([a, l]) => {
      s.includes(a) || o.push(l[l.length - 1])
    }),
    o
  )
}
var ba = (e, t) =>
  e.reduce((r, n) => {
    let i = t(n)
    return r[i] || (r[i] = []), r[i].push(n), r
  }, {})
var Qr = class {
  constructor() {
    this._middlewares = []
  }
  use(t) {
    this._middlewares.push(t)
  }
  get(t) {
    return this._middlewares[t]
  }
  has(t) {
    return !!this._middlewares[t]
  }
  length() {
    return this._middlewares.length
  }
}
var va = A(On())
function Jr(e) {
  return typeof e.batchRequestIdx == 'number'
}
function Ea({ result: e, modelName: t, select: r, extensions: n }) {
  let i = n.getAllComputedFields(t)
  if (!i) return e
  let o = [],
    s = []
  for (let a of Object.values(i)) {
    if (r) {
      if (!r[a.name]) continue
      let l = a.needs.filter((u) => !r[u])
      l.length > 0 && s.push(Ot(l))
    }
    Dp(e, a.needs) && o.push(_p(a, be(e, o)))
  }
  return o.length > 0 || s.length > 0 ? be(e, [...o, ...s]) : e
}
function Dp(e, t) {
  return t.every((r) => Dn(e, r))
}
function _p(e, t) {
  return Ge(me(e.name, () => e.compute(t)))
}
function Gr({
  visitor: e,
  result: t,
  args: r,
  runtimeDataModel: n,
  modelName: i,
}) {
  if (Array.isArray(t)) {
    for (let s = 0; s < t.length; s++)
      t[s] = Gr({
        result: t[s],
        args: r,
        modelName: i,
        runtimeDataModel: n,
        visitor: e,
      })
    return t
  }
  let o = e(t, i, r) ?? t
  return (
    r.include &&
      Pa({
        includeOrSelect: r.include,
        result: o,
        parentModelName: i,
        runtimeDataModel: n,
        visitor: e,
      }),
    r.select &&
      Pa({
        includeOrSelect: r.select,
        result: o,
        parentModelName: i,
        runtimeDataModel: n,
        visitor: e,
      }),
    o
  )
}
function Pa({
  includeOrSelect: e,
  result: t,
  parentModelName: r,
  runtimeDataModel: n,
  visitor: i,
}) {
  for (let [o, s] of Object.entries(e)) {
    if (!s || t[o] == null) continue
    let l = n.models[r].fields.find((c) => c.name === o)
    if (!l || l.kind !== 'object' || !l.relationName) continue
    let u = typeof s == 'object' ? s : {}
    t[o] = Gr({
      visitor: i,
      result: t[o],
      args: u,
      modelName: l.type,
      runtimeDataModel: n,
    })
  }
}
function Wr(e) {
  return e === null
    ? e
    : Array.isArray(e)
    ? e.map(Wr)
    : typeof e == 'object'
    ? Ip(e)
      ? Np(e)
      : st(e, Wr)
    : e
}
function Ip(e) {
  return e !== null && typeof e == 'object' && typeof e.$type == 'string'
}
function Np({ $type: e, value: t }) {
  switch (e) {
    case 'BigInt':
      return BigInt(t)
    case 'Bytes':
      return Buffer.from(t, 'base64')
    case 'DateTime':
      return new Date(t)
    case 'Decimal':
      return new Ee(t)
    case 'Json':
      return JSON.parse(t)
    default:
      pe(t, 'Unknown tagged value')
  }
}
function Ta(e) {
  if (e.action !== 'findUnique' && e.action !== 'findUniqueOrThrow') return
  let t = []
  return (
    e.modelName && t.push(e.modelName),
    e.query.arguments && t.push(ci(e.query.arguments)),
    t.push(ci(e.query.selection)),
    t.join('')
  )
}
function ci(e) {
  return `(${Object.keys(e)
    .sort()
    .map((r) => {
      let n = e[r]
      return typeof n == 'object' && n !== null ? `(${r} ${ci(n)})` : r
    })
    .join(' ')})`
}
var Lp = {
  aggregate: !1,
  aggregateRaw: !1,
  createMany: !0,
  createOne: !0,
  deleteMany: !0,
  deleteOne: !0,
  executeRaw: !0,
  findFirst: !1,
  findFirstOrThrow: !1,
  findMany: !1,
  findRaw: !1,
  findUnique: !1,
  findUniqueOrThrow: !1,
  groupBy: !1,
  queryRaw: !1,
  runCommandRaw: !0,
  updateMany: !0,
  updateOne: !0,
  upsertOne: !0,
}
function pi(e) {
  return Lp[e]
}
var Hr = class {
  constructor(t) {
    this.options = t
    this.tickActive = !1
    this.batches = {}
  }
  request(t) {
    let r = this.options.batchBy(t)
    return r
      ? (this.batches[r] ||
          ((this.batches[r] = []),
          this.tickActive ||
            ((this.tickActive = !0),
            process.nextTick(() => {
              this.dispatchBatches(), (this.tickActive = !1)
            }))),
        new Promise((n, i) => {
          this.batches[r].push({ request: t, resolve: n, reject: i })
        }))
      : this.options.singleLoader(t)
  }
  dispatchBatches() {
    for (let t in this.batches) {
      let r = this.batches[t]
      delete this.batches[t],
        r.length === 1
          ? this.options
              .singleLoader(r[0].request)
              .then((n) => {
                n instanceof Error ? r[0].reject(n) : r[0].resolve(n)
              })
              .catch((n) => {
                r[0].reject(n)
              })
          : (r.sort((n, i) => this.options.batchOrder(n.request, i.request)),
            this.options
              .batchLoader(r.map((n) => n.request))
              .then((n) => {
                if (n instanceof Error)
                  for (let i = 0; i < r.length; i++) r[i].reject(n)
                else
                  for (let i = 0; i < r.length; i++) {
                    let o = n[i]
                    o instanceof Error ? r[i].reject(o) : r[i].resolve(o)
                  }
              })
              .catch((n) => {
                for (let i = 0; i < r.length; i++) r[i].reject(n)
              }))
    }
  }
  get [Symbol.toStringTag]() {
    return 'DataLoader'
  }
}
var $p = N('prisma:client:request_handler'),
  zr = class {
    constructor(t, r) {
      ;(this.logEmitter = r),
        (this.client = t),
        (this.dataloader = new Hr({
          batchLoader: Ls(async ({ requests: n, customDataProxyFetch: i }) => {
            let { transaction: o, otelParentCtx: s } = n[0],
              a = n.map((p) => p.protocolQuery),
              l = this.client._tracingHelper.getTraceParent(s),
              u = n.some((p) => pi(p.protocolQuery.action))
            return (
              await this.client._engine.requestBatch(a, {
                traceparent: l,
                transaction: qp(o),
                containsWrite: u,
                customDataProxyFetch: i,
              })
            ).map((p, m) => {
              if (p instanceof Error) return p
              try {
                return this.mapQueryEngineResult(n[m], p)
              } catch (g) {
                return g
              }
            })
          }),
          singleLoader: async (n) => {
            let i = n.transaction?.kind === 'itx' ? Ca(n.transaction) : void 0,
              o = await this.client._engine.request(n.protocolQuery, {
                traceparent: this.client._tracingHelper.getTraceParent(),
                interactiveTransaction: i,
                isWrite: pi(n.protocolQuery.action),
                customDataProxyFetch: n.customDataProxyFetch,
              })
            return this.mapQueryEngineResult(n, o)
          },
          batchBy: (n) =>
            n.transaction?.id
              ? `transaction-${n.transaction.id}`
              : Ta(n.protocolQuery),
          batchOrder(n, i) {
            return n.transaction?.kind === 'batch' &&
              i.transaction?.kind === 'batch'
              ? n.transaction.index - i.transaction.index
              : 0
          },
        }))
    }
    async request(t) {
      try {
        return await this.dataloader.request(t)
      } catch (r) {
        let { clientMethod: n, callsite: i, transaction: o, args: s } = t
        this.handleAndLogRequestError({
          error: r,
          clientMethod: n,
          callsite: i,
          transaction: o,
          args: s,
        })
      }
    }
    mapQueryEngineResult(
      { dataPath: t, unpacker: r, modelName: n, args: i, extensions: o },
      s,
    ) {
      let a = s?.data,
        l = s?.elapsed,
        u = this.unpack(a, t, r)
      return (
        n &&
          (u = this.applyResultExtensions({
            result: u,
            modelName: n,
            args: i,
            extensions: o,
          })),
        process.env.PRISMA_CLIENT_GET_TIME ? { data: u, elapsed: l } : u
      )
    }
    handleAndLogRequestError(t) {
      try {
        this.handleRequestError(t)
      } catch (r) {
        throw (
          (this.logEmitter &&
            this.logEmitter.emit('error', {
              message: r.message,
              target: t.clientMethod,
              timestamp: new Date(),
            }),
          r)
        )
      }
    }
    handleRequestError({
      error: t,
      clientMethod: r,
      callsite: n,
      transaction: i,
      args: o,
    }) {
      if (($p(t), jp(t, i) || t instanceof Me)) throw t
      if (t instanceof z && Bp(t)) {
        let a = Ma(t.meta)
        Ur({
          args: o,
          errors: [a],
          callsite: n,
          errorFormat: this.client._errorFormat,
          originalMethod: r,
          clientVersion: this.client._clientVersion,
        })
      }
      let s = t.message
      throw (
        (n &&
          (s = yt({
            callsite: n,
            originalMethod: r,
            isPanic: t.isPanic,
            showColors: this.client._errorFormat === 'pretty',
            message: s,
          })),
        (s = this.sanitizeMessage(s)),
        t.code
          ? new z(s, {
              code: t.code,
              clientVersion: this.client._clientVersion,
              meta: t.meta,
              batchRequestIdx: t.batchRequestIdx,
            })
          : t.isPanic
          ? new se(s, this.client._clientVersion)
          : t instanceof Y
          ? new Y(s, {
              clientVersion: this.client._clientVersion,
              batchRequestIdx: t.batchRequestIdx,
            })
          : t instanceof _
          ? new _(s, this.client._clientVersion)
          : t instanceof se
          ? new se(s, this.client._clientVersion)
          : ((t.clientVersion = this.client._clientVersion), t))
      )
    }
    sanitizeMessage(t) {
      return this.client._errorFormat && this.client._errorFormat !== 'pretty'
        ? (0, va.default)(t)
        : t
    }
    unpack(t, r, n) {
      if (!t || (t.data && (t = t.data), !t)) return t
      let i = Object.values(t)[0],
        o = r.filter((a) => a !== 'select' && a !== 'include'),
        s = Wr(ei(i, o))
      return n ? n(s) : s
    }
    applyResultExtensions({ result: t, modelName: r, args: n, extensions: i }) {
      return i.isEmpty() ||
        t == null ||
        !this.client._runtimeDataModel.models[r]
        ? t
        : Gr({
            result: t,
            args: n ?? {},
            modelName: r,
            runtimeDataModel: this.client._runtimeDataModel,
            visitor(s, a, l) {
              let u = Te(a)
              return Ea({
                result: s,
                modelName: u,
                select: l.select,
                extensions: i,
              })
            },
          })
    }
    get [Symbol.toStringTag]() {
      return 'RequestHandler'
    }
  }
function qp(e) {
  if (!!e) {
    if (e.kind === 'batch')
      return { kind: 'batch', options: { isolationLevel: e.isolationLevel } }
    if (e.kind === 'itx') return { kind: 'itx', options: Ca(e) }
    pe(e, 'Unknown transaction kind')
  }
}
function Ca(e) {
  return { id: e.id, payload: e.payload }
}
function jp(e, t) {
  return Jr(e) && t?.kind === 'batch' && e.batchRequestIdx !== t.index
}
function Bp(e) {
  return e.code === 'P2009' || e.code === 'P2012'
}
function Ma(e) {
  if (e.kind === 'Union') return { kind: 'Union', errors: e.errors.map(Ma) }
  if (Array.isArray(e.selectionPath)) {
    let [, ...t] = e.selectionPath
    return { ...e, selectionPath: t }
  }
  return e
}
var Aa = '5.0.0'
var Sa = Aa
function Fa(e) {
  return e.map((t) => {
    let r = {}
    for (let n of Object.keys(t)) r[n] = Ra(t[n])
    return r
  })
}
function Ra({ prisma__type: e, prisma__value: t }) {
  switch (e) {
    case 'bigint':
      return BigInt(t)
    case 'bytes':
      return Buffer.from(t, 'base64')
    case 'decimal':
      return new Ee(t)
    case 'datetime':
    case 'date':
      return new Date(t)
    case 'time':
      return new Date(`1970-01-01T${t}Z`)
    case 'array':
      return t.map(Ra)
    default:
      return t
  }
}
var _a = A(ii())
var j = class extends Error {
  constructor(t) {
    super(
      t +
        `
Read more at https://pris.ly/d/client-constructor`,
    ),
      (this.name = 'PrismaClientConstructorValidationError')
  }
  get [Symbol.toStringTag]() {
    return 'PrismaClientConstructorValidationError'
  }
}
ee(j, 'PrismaClientConstructorValidationError')
var ka = ['datasources', 'errorFormat', 'log', '__internal'],
  Oa = ['pretty', 'colorless', 'minimal'],
  Da = ['info', 'query', 'warn', 'error'],
  Kp = {
    datasources: (e, t) => {
      if (!!e) {
        if (typeof e != 'object' || Array.isArray(e))
          throw new j(
            `Invalid value ${JSON.stringify(
              e,
            )} for "datasources" provided to PrismaClient constructor`,
          )
        for (let [r, n] of Object.entries(e)) {
          if (!t.includes(r)) {
            let i = xt(r, t) || ` Available datasources: ${t.join(', ')}`
            throw new j(
              `Unknown datasource ${r} provided to PrismaClient constructor.${i}`,
            )
          }
          if (typeof n != 'object' || Array.isArray(n))
            throw new j(`Invalid value ${JSON.stringify(
              e,
            )} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`)
          if (n && typeof n == 'object')
            for (let [i, o] of Object.entries(n)) {
              if (i !== 'url')
                throw new j(`Invalid value ${JSON.stringify(
                  e,
                )} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`)
              if (typeof o != 'string')
                throw new j(`Invalid value ${JSON.stringify(
                  o,
                )} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`)
            }
        }
      }
    },
    errorFormat: (e) => {
      if (!!e) {
        if (typeof e != 'string')
          throw new j(
            `Invalid value ${JSON.stringify(
              e,
            )} for "errorFormat" provided to PrismaClient constructor.`,
          )
        if (!Oa.includes(e)) {
          let t = xt(e, Oa)
          throw new j(
            `Invalid errorFormat ${e} provided to PrismaClient constructor.${t}`,
          )
        }
      }
    },
    log: (e) => {
      if (!e) return
      if (!Array.isArray(e))
        throw new j(
          `Invalid value ${JSON.stringify(
            e,
          )} for "log" provided to PrismaClient constructor.`,
        )
      function t(r) {
        if (typeof r == 'string' && !Da.includes(r)) {
          let n = xt(r, Da)
          throw new j(
            `Invalid log level "${r}" provided to PrismaClient constructor.${n}`,
          )
        }
      }
      for (let r of e) {
        t(r)
        let n = {
          level: t,
          emit: (i) => {
            let o = ['stdout', 'event']
            if (!o.includes(i)) {
              let s = xt(i, o)
              throw new j(
                `Invalid value ${JSON.stringify(
                  i,
                )} for "emit" in logLevel provided to PrismaClient constructor.${s}`,
              )
            }
          },
        }
        if (r && typeof r == 'object')
          for (let [i, o] of Object.entries(r))
            if (n[i]) n[i](o)
            else
              throw new j(
                `Invalid property ${i} for "log" provided to PrismaClient constructor`,
              )
      }
    },
    __internal: (e) => {
      if (!e) return
      let t = ['debug', 'hooks', 'engine', 'measurePerformance']
      if (typeof e != 'object')
        throw new j(
          `Invalid value ${JSON.stringify(
            e,
          )} for "__internal" to PrismaClient constructor`,
        )
      for (let [r] of Object.entries(e))
        if (!t.includes(r)) {
          let n = xt(r, t)
          throw new j(
            `Invalid property ${JSON.stringify(
              r,
            )} for "__internal" provided to PrismaClient constructor.${n}`,
          )
        }
    },
  }
function Ia(e, t) {
  for (let [r, n] of Object.entries(e)) {
    if (!ka.includes(r)) {
      let i = xt(r, ka)
      throw new j(
        `Unknown property ${r} provided to PrismaClient constructor.${i}`,
      )
    }
    Kp[r](n, t)
  }
}
function xt(e, t) {
  if (t.length === 0 || typeof e != 'string') return ''
  let r = Up(e, t)
  return r ? ` Did you mean "${r}"?` : ''
}
function Up(e, t) {
  if (t.length === 0) return null
  let r = t.map((i) => ({ value: i, distance: (0, _a.default)(e, i) }))
  r.sort((i, o) => (i.distance < o.distance ? -1 : 1))
  let n = r[0]
  return n.distance < 3 ? n.value : null
}
function Na(e) {
  return e.length === 0
    ? Promise.resolve([])
    : new Promise((t, r) => {
        let n = new Array(e.length),
          i = null,
          o = !1,
          s = 0,
          a = () => {
            o || (s++, s === e.length && ((o = !0), i ? r(i) : t(n)))
          },
          l = (u) => {
            o || ((o = !0), r(u))
          }
        for (let u = 0; u < e.length; u++)
          e[u].then(
            (c) => {
              ;(n[u] = c), a()
            },
            (c) => {
              if (!Jr(c)) {
                l(c)
                return
              }
              c.batchRequestIdx === u ? l(c) : (i || (i = c), a())
            },
          )
      })
}
var ve = N('prisma:client')
typeof globalThis == 'object' && (globalThis.NODE_CLIENT = !0)
var Qp = {
    requestArgsToMiddlewareArgs: (e) => e,
    middlewareArgsToRequestArgs: (e) => e,
  },
  Jp = Symbol.for('prisma.client.transaction.id'),
  Gp = {
    id: 0,
    nextId() {
      return ++this.id
    },
  }
function Ba(e) {
  class t {
    constructor(n) {
      this._middlewares = new Qr()
      this._createPrismaPromise = li()
      this.$extends = Os
      Qs(e), n && Ia(n, e.datasourceNames)
      let i = new qa.EventEmitter().on('error', () => {})
      ;(this._extensions = Ve.empty()),
        (this._previewFeatures = e.generator?.previewFeatures ?? []),
        (this._clientVersion = e.clientVersion ?? Sa),
        (this._activeProvider = e.activeProvider),
        (this._dataProxy = e.dataProxy),
        (this._tracingHelper = ga(this._previewFeatures)),
        (this._clientEngineType = dn(e.generator))
      let o = {
          rootEnvPath:
            e.relativeEnvPaths.rootEnvPath &&
            Jt.default.resolve(e.dirname, e.relativeEnvPaths.rootEnvPath),
          schemaEnvPath:
            e.relativeEnvPaths.schemaEnvPath &&
            Jt.default.resolve(e.dirname, e.relativeEnvPaths.schemaEnvPath),
        },
        s = Pt(o, { conflictCheck: 'none' })
      try {
        let a = n ?? {},
          l = a.__internal ?? {},
          u = l.debug === !0
        u && N.enable('prisma:client')
        let c = Jt.default.resolve(e.dirname, e.relativePath)
        ja.default.existsSync(c) || (c = e.dirname),
          ve('dirname', e.dirname),
          ve('relativePath', e.relativePath),
          ve('cwd', c)
        let p = a.datasources || {},
          m = Object.entries(p)
            .filter(([f, b]) => b && b.url)
            .map(([f, { url: b }]) => ({ name: f, url: b })),
          g = wa([], m, (f) => f.name),
          y = l.engine || {}
        if (
          (a.errorFormat
            ? (this._errorFormat = a.errorFormat)
            : process.env.NODE_ENV === 'production'
            ? (this._errorFormat = 'minimal')
            : process.env.NO_COLOR
            ? (this._errorFormat = 'colorless')
            : (this._errorFormat = 'colorless'),
          (this._runtimeDataModel = e.runtimeDataModel),
          (this._engineConfig = {
            cwd: c,
            dirname: e.dirname,
            enableDebugLogs: u,
            allowTriggerPanic: y.allowTriggerPanic,
            datamodelPath: Jt.default.join(
              e.dirname,
              e.filename ?? 'schema.prisma',
            ),
            prismaPath: y.binaryPath ?? void 0,
            engineEndpoint: y.endpoint,
            datasources: g,
            generator: e.generator,
            showColors: this._errorFormat === 'pretty',
            logLevel: a.log && ha(a.log),
            logQueries:
              a.log &&
              Boolean(
                typeof a.log == 'string'
                  ? a.log === 'query'
                  : a.log.find((f) =>
                      typeof f == 'string'
                        ? f === 'query'
                        : f.level === 'query',
                    ),
              ),
            env: s?.parsed ?? e.injectableEdgeEnv?.parsed ?? {},
            flags: [],
            clientVersion: e.clientVersion,
            previewFeatures: this._previewFeatures,
            activeProvider: e.activeProvider,
            inlineSchema: e.inlineSchema,
            inlineDatasources: e.inlineDatasources,
            inlineSchemaHash: e.inlineSchemaHash,
            tracingHelper: this._tracingHelper,
            logEmitter: i,
            isBundled: e.isBundled,
          }),
          ve('clientVersion', e.clientVersion),
          ve(
            'clientEngineType',
            this._dataProxy ? 'dataproxy' : this._clientEngineType,
          ),
          this._dataProxy && ve('using Data Proxy with Node.js runtime'),
          (this._engine = this.getEngine()),
          (this._fetcher = new zr(this, i)),
          a.log)
        )
          for (let f of a.log) {
            let b =
              typeof f == 'string' ? f : f.emit === 'stdout' ? f.level : null
            b &&
              this.$on(b, (P) => {
                Ft.log(`${Ft.tags[b] ?? ''}`, P.message || P.query)
              })
          }
        this._metrics = new at(this._engine)
      } catch (a) {
        throw ((a.clientVersion = this._clientVersion), a)
      }
      return Vt(this)
    }
    get [Symbol.toStringTag]() {
      return 'PrismaClient'
    }
    getEngine() {
      if ((this._dataProxy, this._clientEngineType === 'library'))
        return new _t(this._engineConfig)
      throw (
        (this._clientEngineType,
        'binary',
        new te('Invalid client engine type, please use `library` or `binary`', {
          clientVersion: this._clientVersion,
        }))
      )
    }
    $use(n) {
      this._middlewares.use(n)
    }
    $on(n, i) {
      n === 'beforeExit'
        ? this._engine.on('beforeExit', i)
        : this._engine.on(n, (o) => {
            let s = o.fields
            return i(
              n === 'query'
                ? {
                    timestamp: o.timestamp,
                    query: s?.query ?? o.query,
                    params: s?.params ?? o.params,
                    duration: s?.duration_ms ?? o.duration,
                    target: o.target,
                  }
                : {
                    timestamp: o.timestamp,
                    message: s?.message ?? o.message,
                    target: o.target,
                  },
            )
          })
    }
    $connect() {
      try {
        return this._engine.start()
      } catch (n) {
        throw ((n.clientVersion = this._clientVersion), n)
      }
    }
    async _runDisconnect() {
      await this._engine.stop(),
        delete this._connectionPromise,
        (this._engine = this.getEngine()),
        delete this._disconnectionPromise
    }
    async $disconnect() {
      try {
        await this._engine.stop()
      } catch (n) {
        throw ((n.clientVersion = this._clientVersion), n)
      } finally {
        Oi()
      }
    }
    $executeRawInternal(n, i, o, s) {
      return this._request({
        action: 'executeRaw',
        args: o,
        transaction: n,
        clientMethod: i,
        argsMapper: ai(this._activeProvider, i),
        callsite: Be(this._errorFormat),
        dataPath: [],
        middlewareArgsMapper: s,
      })
    }
    $executeRaw(n, ...i) {
      return this._createPrismaPromise((o) => {
        if (n.raw !== void 0 || n.sql !== void 0) {
          let [s, a] = La(n, i)
          return (
            si(
              this._activeProvider,
              s.text,
              s.values,
              Array.isArray(n)
                ? 'prisma.$executeRaw`<SQL>`'
                : 'prisma.$executeRaw(sql`<SQL>`)',
            ),
            this.$executeRawInternal(o, '$executeRaw', s, a)
          )
        }
        throw new te(
          "`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n",
          { clientVersion: this._clientVersion },
        )
      })
    }
    $executeRawUnsafe(n, ...i) {
      return this._createPrismaPromise(
        (o) => (
          si(
            this._activeProvider,
            n,
            i,
            'prisma.$executeRawUnsafe(<SQL>, [...values])',
          ),
          this.$executeRawInternal(o, '$executeRawUnsafe', [n, ...i])
        ),
      )
    }
    $runCommandRaw(n) {
      if (e.activeProvider !== 'mongodb')
        throw new te(
          `The ${e.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`,
          { clientVersion: this._clientVersion },
        )
      return this._createPrismaPromise((i) =>
        this._request({
          args: n,
          clientMethod: '$runCommandRaw',
          dataPath: [],
          action: 'runCommandRaw',
          argsMapper: oa,
          callsite: Be(this._errorFormat),
          transaction: i,
        }),
      )
    }
    async $queryRawInternal(n, i, o, s) {
      return this._request({
        action: 'queryRaw',
        args: o,
        transaction: n,
        clientMethod: i,
        argsMapper: ai(this._activeProvider, i),
        callsite: Be(this._errorFormat),
        dataPath: [],
        middlewareArgsMapper: s,
      }).then(Fa)
    }
    $queryRaw(n, ...i) {
      return this._createPrismaPromise((o) => {
        if (n.raw !== void 0 || n.sql !== void 0)
          return this.$queryRawInternal(o, '$queryRaw', ...La(n, i))
        throw new te(
          "`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n",
          { clientVersion: this._clientVersion },
        )
      })
    }
    $queryRawUnsafe(n, ...i) {
      return this._createPrismaPromise((o) =>
        this.$queryRawInternal(o, '$queryRawUnsafe', [n, ...i]),
      )
    }
    _transactionWithArray({ promises: n, options: i }) {
      let o = Gp.nextId(),
        s = ya(n.length),
        a = n.map((l, u) => {
          if (l?.[Symbol.toStringTag] !== 'PrismaPromise')
            throw new Error(
              'All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.',
            )
          let c = i?.isolationLevel,
            p = { kind: 'batch', id: o, index: u, isolationLevel: c, lock: s }
          return l.requestTransaction?.(p) ?? l
        })
      return Na(a)
    }
    async _transactionWithCallback({ callback: n, options: i }) {
      let o = { traceparent: this._tracingHelper.getTraceParent() },
        s = await this._engine.transaction('start', o, i),
        a
      try {
        let l = { kind: 'itx', ...s }
        ;(a = await n(this._createItxClient(l))),
          await this._engine.transaction('commit', o, s)
      } catch (l) {
        throw (
          (await this._engine.transaction('rollback', o, s).catch(() => {}), l)
        )
      }
      return a
    }
    _createItxClient(n) {
      let i = $r(this)
      return Vt(
        be(i, [
          me('_createPrismaPromise', () => li(n)),
          me(Jp, () => n.id),
          Ot(xa),
        ]),
      )
    }
    $transaction(n, i) {
      let o
      typeof n == 'function'
        ? (o = () => this._transactionWithCallback({ callback: n, options: i }))
        : (o = () => this._transactionWithArray({ promises: n, options: i }))
      let s = { name: 'transaction', attributes: { method: '$transaction' } }
      return this._tracingHelper.runInChildSpan(s, o)
    }
    _request(n) {
      n.otelParentCtx = this._tracingHelper.getActiveContext()
      let i = n.middlewareArgsMapper ?? Qp,
        o = {
          args: i.requestArgsToMiddlewareArgs(n.args),
          dataPath: n.dataPath,
          runInTransaction: Boolean(n.transaction),
          action: n.action,
          model: n.model,
        },
        s = {
          middleware: {
            name: 'middleware',
            middleware: !0,
            attributes: { method: '$use' },
            active: !1,
          },
          operation: {
            name: 'operation',
            attributes: {
              method: o.action,
              model: o.model,
              name: `${o.model}.${o.action}`,
            },
          },
        },
        a = -1,
        l = (u) => {
          let c = this._middlewares.get(++a)
          if (c)
            return this._tracingHelper.runInChildSpan(s.middleware, (f) =>
              c(u, (b) => (f?.end(), l(b))),
            )
          let { runInTransaction: p, args: m, ...g } = u,
            y = { ...n, ...g }
          return (
            m && (y.args = i.middlewareArgsToRequestArgs(m)),
            n.transaction !== void 0 && p === !1 && delete y.transaction,
            Ns(this, y)
          )
        }
      return this._tracingHelper.runInChildSpan(s.operation, () =>
        new $a.AsyncResource('prisma-client-request').runInAsyncScope(() =>
          l(o),
        ),
      )
    }
    async _executeRequest({
      args: n,
      clientMethod: i,
      dataPath: o,
      callsite: s,
      action: a,
      model: l,
      argsMapper: u,
      transaction: c,
      unpacker: p,
      otelParentCtx: m,
      customDataProxyFetch: g,
    }) {
      try {
        n = u ? u(n) : n
        let y = { name: 'serialize' },
          f = this._tracingHelper.runInChildSpan(y, () =>
            ra({
              modelName: l,
              runtimeDataModel: this._runtimeDataModel,
              action: a,
              args: n,
              clientMethod: i,
              callsite: s,
              extensions: this._extensions,
              errorFormat: this._errorFormat,
              clientVersion: this._clientVersion,
            }),
          )
        return (
          N.enabled('prisma:client') &&
            (ve('Prisma Client call:'),
            ve(`prisma.${i}(${fs(n)})`),
            ve('Generated request:'),
            ve(
              JSON.stringify(f, null, 2) +
                `
`,
            )),
          c?.kind === 'batch' && (await c.lock),
          this._fetcher.request({
            protocolQuery: f,
            modelName: l,
            action: a,
            clientMethod: i,
            dataPath: o,
            callsite: s,
            args: n,
            extensions: this._extensions,
            transaction: c,
            unpacker: p,
            otelParentCtx: m,
            otelChildCtx: this._tracingHelper.getActiveContext(),
            customDataProxyFetch: g,
          })
        )
      } catch (y) {
        throw ((y.clientVersion = this._clientVersion), y)
      }
    }
    get $metrics() {
      if (!this._hasPreviewFlag('metrics'))
        throw new te(
          '`metrics` preview feature must be enabled in order to access metrics API',
          { clientVersion: this._clientVersion },
        )
      return this._metrics
    }
    _hasPreviewFlag(n) {
      return !!this._engineConfig.previewFeatures?.includes(n)
    }
  }
  return t
}
function La(e, t) {
  return Wp(e) ? [new K(e, t), pa] : [e, ma]
}
function Wp(e) {
  return Array.isArray(e) && Array.isArray(e.raw)
}
var Hp = new Set([
  'toJSON',
  '$$typeof',
  'asymmetricMatch',
  Symbol.iterator,
  Symbol.toStringTag,
  Symbol.isConcatSpreadable,
  Symbol.toPrimitive,
])
function Va(e) {
  return new Proxy(e, {
    get(t, r) {
      if (r in t) return t[r]
      if (!Hp.has(r)) throw new TypeError(`Invalid enum value: ${String(r)}`)
    },
  })
}
function Ka(e) {
  Pt(e, { conflictCheck: 'warn' })
}
0 &&
  (module.exports = {
    DMMF,
    DMMFClass,
    Debug,
    Decimal,
    Extensions,
    MetricsClient,
    NotFoundError,
    PrismaClientInitializationError,
    PrismaClientKnownRequestError,
    PrismaClientRustPanicError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError,
    Public,
    Sql,
    Types,
    defineDmmfProperty,
    empty,
    getPrismaClient,
    join,
    makeStrictEnum,
    objectEnumValues,
    raw,
    sqltag,
    warnEnvConflicts,
    warnOnce,
  })
/*!
 *  decimal.js v10.4.3
 *  An arbitrary-precision Decimal type for JavaScript.
 *  https://github.com/MikeMcl/decimal.js
 *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
 *  MIT Licence
 */
//# sourceMappingURL=library.js.map
