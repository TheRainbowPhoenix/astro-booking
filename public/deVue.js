/*
    TODO : Place your component-specific functions and variables here !!
    You'll see in the console "Undefined : stuff". take a look at the code to see if 
*/

const featured_image = undefined;
function $size(v) {
  return v;
}

function $get(p, k, d) {
  return p, k, d;
}

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
    {
      staticClass: "booking-page",
      attrs: { "data-cy": "booking-page" },
    },
    [
      _c("h1", { staticClass: "vh" }, [
        _vm._v(
          _vm._s(_vm.$t("Header.HamburgerMenu.Links.availability_link_label"))
        ),
      ]),
      _vm.headerBannerImageUrl
        ? _c("header-banner", {
            attrs: { "banner-url": _vm.headerBannerImageUrl },
          })
        : _vm._e(),
      _c("search-bar", _vm._b({}, "search-bar", _vm.searchBarProps, false)),
      _vm.currentRoomIndex < _vm.$size(_vm.rooms) && _vm.currentRoomIndex > -1
        ? _c(
            "keep-alive",
            [
              _vm.$size(_vm.rooms) > 1
                ? _c(
                    "select-room-banner",
                    {
                      ref: "roomTabs",
                      staticClass: "sticky",
                      class: { animate: _vm.doAnimateCTA },
                    },
                    [
                      _c("span", { attrs: { "aria-live": "polite" } }, [
                        _vm._v(
                          _vm._s(
                            _vm.$t(
                              "SelectionPage.SelectionSteps.current_room_over_total_rooms_label",
                              {
                                current_room: _vm.currentRoomIndex + 1,
                                total_rooms: _vm.$size(_vm.rooms),
                              }
                            )
                          )
                        ),
                      ]),
                    ]
                  )
                : _vm._e(),
            ],
            1
          )
        : _vm._e(),
      _c("sm-main", [
        _c(
          "div",
          {
            staticClass: "wrapper",
            class: { "is-dropdown-open": _vm.isDropdownOpen },
          },
          [
            _vm.isDesktop
              ? [
                  _c(
                    "sm-row",
                    { attrs: { gutter: 16 } },
                    [
                      _c(
                        "sm-col",
                        {
                          staticClass: "main-content--col",
                          attrs: { sm: 16, md: 16 },
                        },
                        [
                          _c(
                            "section",
                            { staticClass: "main-content" },
                            [
                              _vm.showNoVacancy
                                ? _c(_vm.noVacancy, {
                                    tag: "component",
                                    attrs: {
                                      "phone-number": _vm.$get(
                                        _vm.property,
                                        "contact.phone[0]",
                                        null
                                      ),
                                    },
                                  })
                                : _vm._e(),
                              _c("rooms", {
                                attrs: {
                                  roomtypes: _vm.roomtypes,
                                  quotes: _vm.quotes,
                                  "room-props": _vm.roomProps,
                                  "unavailable-dates-per-rate":
                                    _vm.unavailableDatesPerRate,
                                },
                                on: {
                                  "update-rate-id": _vm.doUpdateRateId,
                                  "update-unavailable-dates":
                                    _vm.updateUnavailableDates,
                                },
                              }),
                              _vm.isSingleRoom
                                ? _c(
                                    "primary-button",
                                    {
                                      staticClass: "show-all-rates-button",
                                      attrs: { id: "showAllRates" },
                                      on: { click: _vm.showAllRates },
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          _vm.$t(
                                            "SelectionPage.Content.show_all_rates"
                                          )
                                        )
                                      ),
                                    ]
                                  )
                                : _vm._e(),
                            ],
                            1
                          ),
                        ]
                      ),
                      _c(
                        "sm-col",
                        {
                          ref: "aside",
                          staticClass: "aside--col",
                          attrs: { sm: 8, md: 8 },
                        },
                        [
                          _vm.isQuotesFetched
                            ? _c(
                                "aside",
                                { staticClass: "aside" },
                                [
                                  _c(
                                    "booking-summary-cart",
                                    _vm._b(
                                      {
                                        ref: "bookingSummary",
                                        attrs: { showSubmitButton: true },
                                        on: {
                                          "booking-now": _vm.handleBookNow,
                                          "remove-room": _vm.handleRemoveRoom,
                                        },
                                      },
                                      "booking-summary-cart",
                                      _vm.bookingSummaryProps,
                                      false
                                    )
                                  ),
                                ],
                                1
                              )
                            : _vm._e(),
                        ]
                      ),
                    ],
                    1
                  ),
                ]
              : [
                  _c(
                    "sm-row",
                    { attrs: { gutter: 20 } },
                    [
                      _c(
                        "sm-col",
                        { attrs: { md: 24 } },
                        [
                          _vm.showNoVacancy
                            ? _c(_vm.noVacancy, {
                                tag: "component",
                                attrs: {
                                  "phone-number": _vm.$get(
                                    _vm.property,
                                    "contact.phone[0]",
                                    null
                                  ),
                                },
                              })
                            : _vm._e(),
                          _c("rooms", {
                            attrs: {
                              roomtypes: _vm.roomtypes,
                              quotes: _vm.quotes,
                              "room-props": _vm.roomProps,
                              "unavailable-dates-per-rate":
                                _vm.unavailableDatesPerRate,
                            },
                            on: {
                              "update-rate-id": _vm.doUpdateRateId,
                              "update-unavailable-dates":
                                _vm.updateUnavailableDates,
                            },
                          }),
                          _vm.isSingleRoom
                            ? _c(
                                "primary-button",
                                {
                                  staticClass: "show-all-rates-button",
                                  attrs: { id: "showAllRates" },
                                  on: { click: _vm.showAllRates },
                                },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$t(
                                        "SelectionPage.Content.show_all_rates"
                                      )
                                    )
                                  ),
                                ]
                              )
                            : _vm._e(),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                ],
          ],
          2
        ),
      ]),
    ],
    1
  );
};

/*
====================================================================================================
END HERE
====================================================================================================
*/

console.log(render.call(vm));

flush(render.call(vm));
