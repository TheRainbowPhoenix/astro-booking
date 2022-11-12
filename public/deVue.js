/*
    TODO : Place your component-specific functions and variables here !!
    You'll see in the console "Undefined : stuff". take a look at the code to see if 
*/

const featured_image = undefined;

/*
    END.
*/

var vm = new Proxy(window, {
  get(target, name) {
    if (target[name] !== undefined) return target[name];

    if (name.startsWith("is")) {
      console.log(`Undefined boolean : ${name}, returning true ...`);
      return true;
    }
    console.log(`Undefined : ${name}`);
    return "" + name;
  },
});

var VNode = function VNode(tag, data, child, text, elm, context, comment) {
  this.tag = tag;
  this.data = data;
  this.children = child;
  this.text = text;
  this.elm = elm;
  this.context = context;
  this.comment = comment;
};

function _createEmpty(text) {
  if (text === undefined) text = "";
  var node = new VNode();
  node.comment = " missing ";
  node.text = text;
  return node;
}

function $createElement(context, tag, data, child) {
  if (Array.isArray(data)) {
    child = data;
    data = undefined;
  }
  var vnode = new VNode(tag, data, child, undefined);
  if (vnode) {
    return vnode;
  }
  return _createEmpty();
}

function _v(val) {
  // create text VNode
  return new VNode(undefined, undefined, undefined, String(val));
  // console.log(`_v ${prop}`);
}

function _s(val) {
  // toString
  console.log("_s ", val);
  return val == null
    ? ""
    : Array.isArray(val)
    ? JSON.stringify(val, null, 2)
    : `{${val.toString()}}`;
}

function $t(name) {
  // i18n translated
  return `$t("${name}")`;
}

function _e() {
  return _createEmpty();
}

function _l(val, render) {
  // list

  let args = render
    .toString()
    .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s))/gm, "")
    .match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1]
    .split(/,/);

  let callArs = args
    ? args.map((v) => {
        var p = new Proxy(window, {
          get(target, name) {
            if (target[name]) return target[name];

            if (typeof name !== "string") {
              return () => {
                `${v}`;
              };
            }
            if (name) {
              return `${v}.${name}`;
            }
            return () => {
              `${v}`;
            };
          },
        });
        p.toString = () => {
          return `${v}`;
        };
        return p;
      })
    : "__val__";

  return $createElement(
    vm,
    "_Loop",
    {
      attrs: {
        each: `${val} as ${
          args && Array.isArray(args) && args?.length > 0
            ? args?.length > 1
              ? `(${args.join(", ")})`
              : args[0]
            : "__val__"
        }`,
      },
    },
    [render.call(vm, ...callArs)]
    // [render.call(vm, ...args)]
  );
}

function _u() {
  // resolveScopedSlots
  return _createEmpty();
}

function _b(data, tag, value, asProp, isSync) {
  // bind node
  /*
    _vm._b(
        { on: { "hook:mounted": _vm.updateStickyElements } },
        "nav-bar",
        _vm.navbarProps,
        false
    )
  */
  //   if (data?.on) {
  //     for (const [attr, value] of Object.entries(data.on)) {
  //       el.setAttribute(`on:${attr}`, Object.keys({ value })[0]);
  //     }
  //   }
  return {
    data: data,
  };
}

var _self = {
  _c: (tag, data, child) => {
    return $createElement(vm, tag, data, child);
  },
};

function buildDom(vnode) {
  if (vnode.tag == undefined) {
    if (vnode.text !== undefined) {
      return document.createTextNode(vnode.text);
    }
    if (vnode.comment !== undefined) {
      return document.createComment(`<!-- ${vnode.comment} -->`);
    }
    return document.createTextNode("");
  }
  let el = document.createElement(vnode.tag);
  if (vnode.data?.staticClass) {
    el.className = vnode.data?.staticClass;
  }

  if (vnode.data?.attrs) {
    for (const [attr, value] of Object.entries(vnode.data.attrs)) {
      el.setAttribute(attr, value || "");
    }
  }

  if (vnode.data?.key) {
    el.setAttribute(":key", vnode.data.key || "");
  }

  if (vnode.data?.class && Array.isArray(vnode.data.class)) {
    for (const cls of vnode.data.class) {
      el.setAttribute(`class:${cls}`, "{ TODOCheckMe || true}");
      //   el.classList.add(cls);
    }
  }

  if (vnode.data?.on) {
    for (const [attr, value] of Object.entries(vnode.data.on)) {
      el.setAttribute(`on:${attr}`, value);
    }
  }

  if (vnode.children !== undefined) {
    if (Array.isArray(vnode.children)) {
      for (const child of vnode.children) {
        let elm = buildDom(child);
        elm && el.appendChild(elm);
      }
    } else {
      console.log(vnode.children);
      let elm = buildDom(vnode.children);
      elm && el.appendChild(elm);
    }
  }

  if (vnode.text !== undefined) {
    var textnode = document.createTextNode(vnode.text);
    el.appendChild(textnode);
  }
  return el;
}

function flush(vdom) {
  let $root = document.createElement("div");
  $root.id = "app";
  console.log(vdom);

  let elm = buildDom(vdom);
  elm && $root.appendChild(elm);

  document.body.appendChild($root);
}

/*
====================================================================================================
TODO: Paste here the code in the render() return
====================================================================================================
*/

var render = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _c(
        "a",
        {
          staticClass: "skip-link",
          attrs: { href: _vm.$id("skiplink") },
          on: {
            click: function ($event) {
              $event.preventDefault();
              return _vm.focusNextElement($event);
            },
          },
        },
        [_vm._t("label")],
        2
      ),
      _vm._t("default"),
      _c("a", { ref: "skipTarget", attrs: { name: _vm.skipTarget } }),
    ],
    2
  );
};

var render = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "sm-header",
    {
      directives: [
        {
          name: "mq-listener",
          rawName: "v-mq-listener",
          value: {
            mediaQueries: _vm.mediaQueries,
            eventHandler: _vm.setIsDesktopFlag,
          },
          expression: "{ mediaQueries, eventHandler: setIsDesktopFlag }",
        },
      ],
      staticClass: "header",
      class: { sticky: _vm.isDesktop },
    },
    [
      _c(
        "nav",
        { staticClass: "navbar" },
        [
          !_vm.isDesktop
            ? [
                _vm.isCheckoutPage
                  ? _c(
                      "checkout-back-step-button",
                      {
                        attrs: {
                          "has-applicable-extras": _vm.hasApplicableExtras,
                        },
                      },
                      [
                        _vm.website || _vm.homeLink
                          ? _c("logo", _vm._b({}, "logo", _vm.logoProps, false))
                          : _vm._e(),
                        _vm.languages.length > 1
                          ? _c(
                              "native-selector",
                              {
                                staticClass: "language-selector",
                                attrs: {
                                  items: _vm.languages,
                                  "key-field": "locale",
                                  "value-field": "locale",
                                  "display-field": "nativeName",
                                  selected: _vm.$get(
                                    _vm.activeLanguage,
                                    "locale"
                                  ),
                                },
                                on: { change: _vm.updateLanguage },
                              },
                              [
                                _c(
                                  "template",
                                  { slot: "label" },
                                  [
                                    _c("svgicon", {
                                      attrs: {
                                        focusable: "false",
                                        icon: "icon-globe-alt",
                                        width: "20",
                                        height: "20",
                                      },
                                    }),
                                  ],
                                  1
                                ),
                              ],
                              2
                            )
                          : _vm._e(),
                      ],
                      1
                    )
                  : _c(
                      "hamburger-menu",
                      _vm._b(
                        { ref: "hamburger-menu" },
                        "hamburger-menu",
                        _vm.hamburgerProps,
                        false
                      ),
                      [
                        _vm.website || _vm.homeLink
                          ? _c(
                              "logo",
                              _vm._b(
                                { attrs: { slot: "logo" }, slot: "logo" },
                                "logo",
                                _vm.logoProps,
                                false
                              )
                            )
                          : _vm._e(),
                      ],
                      1
                    ),
              ]
            : [
                _c(
                  _vm.skipLink,
                  { tag: "component" },
                  [
                    _c("template", { slot: "label" }, [
                      _vm._v(
                        _vm._s(
                          _vm.$t("Header.SkipLink.skip_to_content_link_label")
                        )
                      ),
                    ]),
                    _c("template", { slot: "default" }, [
                      _c(
                        "div",
                        { staticClass: "wrapper" },
                        [
                          _vm.isCheckoutPage
                            ? _c(
                                "checkout-back-step-button",
                                {
                                  attrs: {
                                    "has-applicable-extras":
                                      _vm.hasApplicableExtras,
                                  },
                                },
                                [
                                  _vm.website || _vm.homeLink
                                    ? _c(
                                        "logo",
                                        _vm._b({}, "logo", _vm.logoProps, false)
                                      )
                                    : _vm._e(),
                                ],
                                1
                              )
                            : _c(
                                "div",
                                { staticClass: "logo-and-links" },
                                [
                                  _vm.website || _vm.homeLink
                                    ? _c(
                                        "logo",
                                        _vm._b({}, "logo", _vm.logoProps, false)
                                      )
                                    : _vm._e(),
                                  _c(
                                    "ul",
                                    {
                                      ref: "menuLinks",
                                      staticClass: "menu-links",
                                      attrs: { role: "menu" },
                                    },
                                    [
                                      _c(
                                        "li",
                                        { attrs: { role: "presentation" } },
                                        [
                                          _c(
                                            "router-link",
                                            {
                                              staticClass: "router-link",
                                              class: {
                                                "router-link-active":
                                                  _vm.isRouteActive(
                                                    _vm.pages.booking
                                                  ),
                                              },
                                              attrs: {
                                                role: "menuitem",
                                                to: _vm.homeLink,
                                                exact: "",
                                                tabindex: "0",
                                              },
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t(
                                                    "Header.HamburgerMenu.Links.availability_link_label"
                                                  )
                                                )
                                              ),
                                            ]
                                          ),
                                        ],
                                        1
                                      ),
                                      _c(
                                        "li",
                                        { attrs: { role: "presentation" } },
                                        [
                                          _c(
                                            "router-link",
                                            {
                                              staticClass: "router-link",
                                              class: {
                                                "router-link-active":
                                                  _vm.isRouteActive(
                                                    _vm.pages.about
                                                  ),
                                              },
                                              attrs: {
                                                role: "menuitem",
                                                to: { name: _vm.pages.about },
                                                exact: "",
                                                tabindex: "0",
                                              },
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t(
                                                    "Header.HamburgerMenu.Links.about_link_label"
                                                  )
                                                )
                                              ),
                                            ]
                                          ),
                                        ],
                                        1
                                      ),
                                      _c(
                                        "li",
                                        { attrs: { role: "presentation" } },
                                        [
                                          _c(
                                            "router-link",
                                            {
                                              staticClass: "router-link",
                                              class: {
                                                "router-link-active":
                                                  _vm.isRouteActive(
                                                    _vm.pages.contact
                                                  ),
                                              },
                                              attrs: {
                                                role: "menuitem",
                                                to: { name: _vm.pages.contact },
                                                exact: "",
                                                tabindex: "0",
                                              },
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t(
                                                    "Header.HamburgerMenu.Links.contact_link_label"
                                                  )
                                                )
                                              ),
                                            ]
                                          ),
                                        ],
                                        1
                                      ),
                                      _c(
                                        "li",
                                        { attrs: { role: "presentation" } },
                                        [
                                          _c(
                                            "router-link",
                                            {
                                              staticClass: "router-link",
                                              class: {
                                                "router-link-active":
                                                  _vm.isRouteActive(
                                                    _vm.pages.policies
                                                  ),
                                              },
                                              attrs: {
                                                role: "menuitem",
                                                to: {
                                                  name: _vm.pages.policies,
                                                },
                                                exact: "",
                                                tabindex: "0",
                                              },
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.$t(
                                                    "Header.HamburgerMenu.Links.policies_link_label"
                                                  )
                                                )
                                              ),
                                            ]
                                          ),
                                        ],
                                        1
                                      ),
                                    ]
                                  ),
                                ],
                                1
                              ),
                          _vm.notDetailsPage
                            ? _c(
                                "div",
                                { staticClass: "language-currency-selectors" },
                                [
                                  _vm.currencies && !_vm.isReservationPage
                                    ? _c(_vm.navSelector, {
                                        tag: "component",
                                        staticClass: "nav-select",
                                        attrs: {
                                          "is-mobile": false,
                                          items: _vm.filteredCurrencies,
                                          "active-item": _vm.currencyToItem(
                                            _vm.activeCurrency
                                          ),
                                        },
                                        on: {
                                          "selection-item": _vm.updateCurrency,
                                        },
                                        scopedSlots: _vm._u(
                                          [
                                            {
                                              key: "prefix",
                                              fn: function (ref) {
                                                var item = ref.item;
                                                return [
                                                  _vm._v(
                                                    " " +
                                                      _vm._s(item.key) +
                                                      " - "
                                                  ),
                                                ];
                                              },
                                            },
                                          ],
                                          null,
                                          false,
                                          457726366
                                        ),
                                      })
                                    : _vm._e(),
                                  _vm.languages.length > 1
                                    ? _c(_vm.navSelector, {
                                        ref: "languageSelector",
                                        tag: "component",
                                        staticClass: "nav-select",
                                        attrs: {
                                          "is-mobile": false,
                                          items:
                                            _vm.languages &&
                                            _vm.languages.map(
                                              _vm.languageToItem
                                            ),
                                          "active-item": _vm.languageToItem(
                                            _vm.activeLanguage
                                          ),
                                        },
                                        on: {
                                          "selection-item": _vm.updateLanguage,
                                        },
                                      })
                                    : _vm._e(),
                                ],
                                1
                              )
                            : _vm._e(),
                        ],
                        1
                      ),
                    ]),
                  ],
                  2
                ),
              ],
        ],
        2
      ),
    ]
  );
};

/*
====================================================================================================
END HERE
====================================================================================================
*/

console.log(render.call(vm));

flush(render.call(vm));
