var __DEV__=false,__BUNDLE_START_TIME__=this.nativePerformanceNow?nativePerformanceNow():Date.now(),process=this.process||{};process.env=process.env||{};process.env.NODE_ENV="production";
(function (global) {
  "use strict";

  global.__r = metroRequire;
  global.__d = define;
  global.__c = clear;
  var modules = clear();
  var EMPTY = {};
  var _ref = {},
      hasOwnProperty = _ref.hasOwnProperty;

  function clear() {
    modules = typeof __NUM_MODULES__ === "number" ? Array(__NUM_MODULES__ | 0) : Object.create(null);
    return modules;
  }

  function define(factory, moduleId, dependencyMap) {
    if (modules[moduleId] != null) {
      return;
    }

    modules[moduleId] = {
      dependencyMap: dependencyMap,
      factory: factory,
      hasError: false,
      importedAll: EMPTY,
      importedDefault: EMPTY,
      isInitialized: false,
      publicModule: {
        exports: {}
      }
    };
  }

  function metroRequire(moduleId) {
    var moduleIdReallyIsNumber = moduleId;
    var module = modules[moduleIdReallyIsNumber];
    return module && module.isInitialized ? module.publicModule.exports : guardedLoadModule(moduleIdReallyIsNumber, module);
  }

  function metroImportDefault(moduleId) {
    var moduleIdReallyIsNumber = moduleId;

    if (modules[moduleIdReallyIsNumber] && modules[moduleIdReallyIsNumber].importedDefault !== EMPTY) {
      return modules[moduleIdReallyIsNumber].importedDefault;
    }

    var exports = metroRequire(moduleIdReallyIsNumber);
    var importedDefault = exports && exports.__esModule ? exports.default : exports;
    return modules[moduleIdReallyIsNumber].importedDefault = importedDefault;
  }

  function metroImportAll(moduleId) {
    var moduleIdReallyIsNumber = moduleId;

    if (modules[moduleIdReallyIsNumber] && modules[moduleIdReallyIsNumber].importedAll !== EMPTY) {
      return modules[moduleIdReallyIsNumber].importedAll;
    }

    var exports = metroRequire(moduleIdReallyIsNumber);
    var importedAll = undefined;

    if (exports && exports.__esModule) {
      importedAll = exports;
    } else {
      importedAll = {};

      if (exports) {
        for (var _key in exports) {
          if (hasOwnProperty.call(exports, _key)) {
            importedAll[_key] = exports[_key];
          }
        }
      }

      importedAll.default = exports;
    }

    return modules[moduleIdReallyIsNumber].importedAll = importedAll;
  }

  var inGuard = false;

  function guardedLoadModule(moduleId, module) {
    if (!inGuard && global.ErrorUtils) {
      inGuard = true;
      var returnValue = undefined;

      try {
        returnValue = loadModuleImplementation(moduleId, module);
      } catch (e) {
        global.ErrorUtils.reportFatalError(e);
      }

      inGuard = false;
      return returnValue;
    } else {
      return loadModuleImplementation(moduleId, module);
    }
  }

  var ID_MASK_SHIFT = 16;
  var LOCAL_ID_MASK = 65535;

  function unpackModuleId(moduleId) {
    var segmentId = moduleId >>> ID_MASK_SHIFT;
    var localId = moduleId & LOCAL_ID_MASK;
    return {
      segmentId: segmentId,
      localId: localId
    };
  }

  metroRequire.unpackModuleId = unpackModuleId;

  function packModuleId(value) {
    return (value.segmentId << ID_MASK_SHIFT) + value.localId;
  }

  metroRequire.packModuleId = packModuleId;
  var hooks = [];

  function registerHook(cb) {
    var hook = {
      cb: cb
    };
    hooks.push(hook);
    return {
      release: function release() {
        for (var i = 0; i < hooks.length; ++i) {
          if (hooks[i] === hook) {
            hooks.splice(i, 1);
            break;
          }
        }
      }
    };
  }

  metroRequire.registerHook = registerHook;

  function loadModuleImplementation(moduleId, module) {
    if (!module && global.__defineModule) {
      global.__defineModule(moduleId);

      module = modules[moduleId];
    }

    var nativeRequire = global.nativeRequire;

    if (!module && nativeRequire) {
      var _unpackModuleId = unpackModuleId(moduleId),
          _segmentId = _unpackModuleId.segmentId,
          _localId = _unpackModuleId.localId;

      nativeRequire(_localId, _segmentId);
      module = modules[moduleId];
    }

    if (!module) {
      throw unknownModuleError(moduleId);
    }

    if (module.hasError) {
      throw moduleThrewError(moduleId, module.error);
    }

    module.isInitialized = true;
    var _module = module,
        factory = _module.factory,
        dependencyMap = _module.dependencyMap;

    try {
      var _moduleObject = module.publicModule;
      _moduleObject.id = moduleId;

      if (hooks.length > 0) {
        for (var i = 0; i < hooks.length; ++i) {
          hooks[i].cb(moduleId, _moduleObject);
        }
      }

      factory(global, metroRequire, metroImportDefault, metroImportAll, _moduleObject, _moduleObject.exports, dependencyMap);
      {
        module.factory = undefined;
        module.dependencyMap = undefined;
      }
      return _moduleObject.exports;
    } catch (e) {
      module.hasError = true;
      module.error = e;
      module.isInitialized = false;
      module.publicModule.exports = undefined;
      throw e;
    } finally {}
  }

  function unknownModuleError(id) {
    var message = 'Requiring unknown module "' + id + '".';
    return Error(message);
  }

  function moduleThrewError(id, error) {
    var displayName = id;
    return Error('Requiring module "' + displayName + '", which threw an exception: ' + error);
  }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  var supportsArgumentsClass = function () {
    return Object.prototype.toString.call(arguments);
  }() == '[object Arguments]';

  exports = module.exports = supportsArgumentsClass ? supported : unsupported;
  exports.supported = supported;

  function supported(object) {
    return Object.prototype.toString.call(object) == '[object Arguments]';
  }

  ;
  exports.unsupported = unsupported;

  function unsupported(object) {
    return object && typeof object == 'object' && typeof object.length == 'number' && Object.prototype.hasOwnProperty.call(object, 'callee') && !Object.prototype.propertyIsEnumerable.call(object, 'callee') || false;
  }

  ;
},-1830798251,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _flipper = global.Flipper;
  var _react = global.React;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  const deepEqual = _$$_REQUIRE(_dependencyMap[0]);

  const NoData = (0, _flipper.styled)(_flipper.FlexCenter)({
    fontSize: 18,
    color: _flipper.colors.macOSTitleBarIcon
  });

  class InspectorSidebarSection extends _react.Component {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "setValue", (path, value) => {
        if (this.props.onValueChanged) {
          this.props.onValueChanged([this.props.id, ...path], value);
        }
      });

      _defineProperty(this, "extractValue", (val, depth) => {
        if (val && val.__type__) {
          return {
            mutable: Boolean(val.__mutable__),
            type: val.__type__ === 'auto' ? typeof val.value : val.__type__,
            value: val.value
          };
        } else {
          return {
            mutable: typeof val === 'object',
            type: typeof val,
            value: val
          };
        }
      });
    }

    shouldComponentUpdate(nextProps) {
      return !deepEqual(nextProps, this.props) || this.props.id !== nextProps.id || this.props.onValueChanged !== nextProps.onValueChanged;
    }

    render() {
      const {
        id
      } = this.props;
      return global.React.createElement(_flipper.Panel, {
        heading: id,
        floating: false,
        grow: false
      }, global.React.createElement(_flipper.ManagedDataInspector, {
        data: this.props.data,
        setValue: this.props.onValueChanged ? this.setValue : undefined,
        extractValue: this.extractValue,
        expandRoot: true,
        collapsed: true,
        tooltips: this.props.tooltips
      }));
    }

  }

  class Sidebar extends _react.Component {
    constructor(props) {
      super(props);

      _defineProperty(this, "state", {
        isConsoleEnabled: false
      });

      this.checkIfConsoleIsEnabled();
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.client !== this.props.client) {
        this.checkIfConsoleIsEnabled();
      }
    }

    checkIfConsoleIsEnabled() {
      this.props.client.call('isConsoleEnabled').then(result => {
        this.setState({
          isConsoleEnabled: result.isEnabled
        });
      });
    }

    render() {
      const {
        element
      } = this.props;

      if (!element || !element.data) {
        return global.React.createElement(NoData, {
          grow: true
        }, "No data");
      }

      const sections = _flipper.SidebarExtensions && _flipper.SidebarExtensions.map(ext => ext(this.props.client, this.props.realClient, element.id, this.props.logger)) || [];

      for (const key in element.data) {
        if (key === 'Extra Sections') {
          for (const extraSection in element.data[key]) {
            let data = element.data[key][extraSection];

            if (typeof data === 'string') {
              try {
                data = JSON.parse(data);
              } catch (e) {
                console.error(`ElementsInspector unable to parse extra section: ${extraSection}`);
                data = {};
              }
            }

            sections.push(global.React.createElement(InspectorSidebarSection, {
              tooltips: this.props.tooltips,
              key: extraSection,
              id: extraSection,
              data: data,
              onValueChanged: this.props.onValueChanged
            }));
          }
        } else {
          sections.push(global.React.createElement(InspectorSidebarSection, {
            tooltips: this.props.tooltips,
            key: key,
            id: key,
            data: element.data[key],
            onValueChanged: this.props.onValueChanged
          }));
        }
      }

      if (_flipper.GK.get('sonar_show_console_plugin') && this.state.isConsoleEnabled) {
        sections.push(global.React.createElement(_flipper.Panel, {
          heading: "JS Console",
          floating: false,
          grow: false
        }, global.React.createElement(_flipper.Console, {
          client: this.props.client,
          getContext: () => element.id
        })));
      }

      return sections;
    }

  }

  exports.default = Sidebar;
},-1646016014,[1039152508]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _flipper = global.Flipper;
  var _react = global.React;

  var _lodash = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[0]));

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class Inspector extends _react.Component {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "selected", () => {
        return this.props.ax ? this.props.selectedAXElement : this.props.selectedElement;
      });

      _defineProperty(this, "root", () => {
        return this.props.ax ? this.props.persistedState.rootAXElement : this.props.persistedState.rootElement;
      });

      _defineProperty(this, "elements", () => {
        return this.props.ax ? this.props.persistedState.AXelements : this.props.persistedState.elements;
      });

      _defineProperty(this, "onElementSelected", (0, _lodash.default)(selectedKey => {
        this.onElementHovered(selectedKey);
        this.props.onSelect(selectedKey);
      }));

      _defineProperty(this, "onElementHovered", (0, _lodash.default)(key => this.props.client.call(this.call().SET_HIGHLIGHTED, {
        id: key,
        isAlignmentMode: this.props.inAlignmentMode
      })));

      _defineProperty(this, "onElementExpanded", (id, deep) => {
        const expanded = !this.elements()[id].expanded;
        this.updateElement(id, {
          expanded
        });

        if (expanded) {
          this.getChildren(id, {}).then(children => {
            if (deep) {
              children.forEach(child => this.onElementExpanded(child.id, deep));
            }
          });
        }
      });
    }

    call() {
      return {
        GET_ROOT: this.props.ax ? 'getAXRoot' : 'getRoot',
        INVALIDATE: this.props.ax ? 'invalidateAX' : 'invalidate',
        GET_NODES: this.props.ax ? 'getAXNodes' : 'getNodes',
        SET_HIGHLIGHTED: 'setHighlighted',
        SELECT: this.props.ax ? 'selectAX' : 'select'
      };
    }

    componentDidMount() {
      this.props.client.call(this.call().GET_ROOT).then(root => {
        this.props.setPersistedState({
          [this.props.ax ? 'rootAXElement' : 'rootElement']: root.id
        });
        this.updateElement(root.id, _objectSpread({}, root, {
          expanded: true
        }));
        this.performInitialExpand(root);
      });
      this.props.client.subscribe(this.call().INVALIDATE, ({
        nodes
      }) => {
        this.getNodes(nodes.map(n => [n.id, ...(n.children || [])]).reduce((acc, cv) => acc.concat(cv), []), {});
      });
      this.props.client.subscribe(this.call().SELECT, ({
        path
      }) => {
        this.getAndExpandPath(path);
      });
    }

    componentDidUpdate(prevProps) {
      const {
        ax,
        selectedElement,
        selectedAXElement
      } = this.props;

      if (ax && selectedElement !== prevProps.selectedElement && selectedElement) {
        var _this$props$persisted, _this$props$persisted2;

        const linkedAXNode = (_this$props$persisted = this.props.persistedState.elements[selectedElement]) === null || _this$props$persisted === undefined ? undefined : (_this$props$persisted2 = _this$props$persisted.extraInfo) === null || _this$props$persisted2 === undefined ? undefined : _this$props$persisted2.linkedAXNode;
        this.props.onSelect(linkedAXNode);
      } else if (!ax && selectedAXElement !== prevProps.selectedAXElement && selectedAXElement) {
        const linkedNode = Object.values(this.props.persistedState.elements).find(e => {
          var _e$extraInfo;

          return ((_e$extraInfo = e.extraInfo) === null || _e$extraInfo === undefined ? undefined : _e$extraInfo.linkedAXNode) === selectedAXElement;
        });
        this.props.onSelect(linkedNode === null || linkedNode === undefined ? undefined : linkedNode.id);
      }
    }

    updateElement(id, data) {
      this.props.setPersistedState({
        [this.props.ax ? 'AXelements' : 'elements']: _objectSpread({}, this.elements(), {
          [id]: _objectSpread({}, this.elements()[id], data)
        })
      });
    }

    async performInitialExpand(element) {
      if (!element.children.length) {
        return;
      }

      return this.getChildren(element.id, {}).then(elements => {
        if (element.children.length >= 2) {
          return;
        }

        return this.performInitialExpand(this.elements()[element.children[0]]);
      });
    }

    async getChildren(id, options) {
      if (!this.elements()[id]) {
        await this.getNodes([id], options);
      }

      this.updateElement(id, {
        expanded: true
      });
      return this.getNodes(this.elements()[id].children, options);
    }

    getNodes(ids = [], options) {
      const {
        forAccessibilityEvent
      } = options;

      if (ids.length > 0) {
        return this.props.client.call(this.call().GET_NODES, {
          ids,
          forAccessibilityEvent,
          selected: false
        }).then(({
          elements
        }) => {
          elements.forEach(e => this.updateElement(e.id, e));
          return elements;
        });
      } else {
        return Promise.resolve([]);
      }
    }

    getAndExpandPath(path) {
      return Promise.all(path.map(id => this.getChildren(id, {}))).then(() => {
        this.onElementSelected(path[path.length - 1]);
      });
    }

    render() {
      return this.root() ? global.React.createElement(_flipper.ElementsInspector, {
        onElementSelected: this.onElementSelected,
        onElementHovered: this.onElementHovered,
        onElementExpanded: this.onElementExpanded,
        onValueChanged: this.props.onDataValueChanged,
        searchResults: this.props.searchResults,
        selected: this.selected(),
        root: this.root(),
        elements: this.elements()
      }) : null;
    }

  }

  exports.default = Inspector;
},-722060000,[777769367]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _default;
  var _flipper = global.Flipper;
  const ToolbarIcon = (0, _flipper.styled)('div')({
    marginRight: 9,
    marginTop: -3,
    marginLeft: 4,
    position: 'relative'
  });

  function _default(props) {
    return global.React.createElement(ToolbarIcon, {
      onClick: props.onClick,
      title: props.title
    }, global.React.createElement(_flipper.Glyph, {
      name: props.icon,
      size: 16,
      color: props.active ? _flipper.colors.macOSTitleBarIconSelected : _flipper.colors.macOSTitleBarIconActive
    }));
  }
},-608923549,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _flipper = global.Flipper;

  var _Inspector = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[0]));

  var _ToolbarIcon = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _InspectorSidebar = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _Search = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var _ProxyArchiveClient = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  const BetaBar = (0, _flipper.styled)(_flipper.Toolbar)({
    display: 'block',
    overflow: 'hidden',
    lineHeight: '15px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  });

  class Layout extends _flipper.FlipperPlugin {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "state", {
        init: false,
        inTargetMode: false,
        inAXMode: false,
        inAlignmentMode: false,
        selectedElement: null,
        selectedAXElement: null,
        searchResults: null
      });

      _defineProperty(this, "onToggleTargetMode", () => {
        const inTargetMode = !this.state.inTargetMode;
        this.setState({
          inTargetMode
        });
        this.client.send('setSearchActive', {
          active: inTargetMode
        });
      });

      _defineProperty(this, "onToggleAXMode", () => {
        this.setState({
          inAXMode: !this.state.inAXMode
        });
      });

      _defineProperty(this, "onToggleAlignmentMode", () => {
        if (this.state.selectedElement) {
          this.client.send('setHighlighted', {
            id: this.state.selectedElement,
            inAlignmentMode: !this.state.inAlignmentMode
          });
        }

        this.setState({
          inAlignmentMode: !this.state.inAlignmentMode
        });
      });

      _defineProperty(this, "onDataValueChanged", (path, value) => {
        const id = this.state.inAXMode ? this.state.selectedAXElement : this.state.selectedElement;
        this.client.call('setData', {
          id,
          path,
          value,
          ax: this.state.inAXMode
        });
      });
    }

    init() {
      if (!this.props.persistedState) {
        this.props.setPersistedState(this.constructor.defaultPersistedState);
      }

      this.client.call('isSearchActive').then(({
        isSearchActive
      }) => {
        this.setState({
          inTargetMode: isSearchActive
        });
      });
      this.client.subscribe('select', () => {
        if (this.state.inTargetMode) {
          this.onToggleTargetMode();
        }
      });
      this.setState({
        init: true
      });
    }

    getClient() {
      return this.props.isArchivedDevice ? new _ProxyArchiveClient.default(this.props.persistedState) : this.client;
    }

    render() {
      const inspectorProps = {
        client: this.getClient(),
        inAlignmentMode: this.state.inAlignmentMode,
        selectedElement: this.state.selectedElement,
        selectedAXElement: this.state.selectedAXElement,
        setPersistedState: this.props.setPersistedState,
        persistedState: this.props.persistedState,
        onDataValueChanged: this.onDataValueChanged,
        searchResults: this.state.searchResults
      };
      let element;

      if (this.state.inAXMode && this.state.selectedAXElement) {
        element = this.props.persistedState.AXelements[this.state.selectedAXElement];
      } else if (this.state.selectedElement) {
        element = this.props.persistedState.elements[this.state.selectedElement];
      }

      const inspector = global.React.createElement(_Inspector.default, _extends({}, inspectorProps, {
        onSelect: selectedElement => this.setState({
          selectedElement
        }),
        showsSidebar: !this.state.inAXMode
      }));
      return global.React.createElement(_flipper.FlexColumn, {
        grow: true
      }, this.state.init && global.React.createElement(global.React.Fragment, null, global.React.createElement(_flipper.Toolbar, null, !this.props.isArchivedDevice && global.React.createElement(_ToolbarIcon.default, {
        onClick: this.onToggleTargetMode,
        title: "Toggle target mode",
        icon: "target",
        active: this.state.inTargetMode
      }), this.realClient.query.os === 'Android' && global.React.createElement(_ToolbarIcon.default, {
        onClick: this.onToggleAXMode,
        title: "Toggle to see the accessibility hierarchy",
        icon: "accessibility",
        active: this.state.inAXMode
      }), !this.props.isArchivedDevice && global.React.createElement(_ToolbarIcon.default, {
        onClick: this.onToggleAlignmentMode,
        title: "Toggle AlignmentMode to show alignment lines",
        icon: "borders",
        active: this.state.inAlignmentMode
      }), global.React.createElement(_Search.default, {
        client: this.getClient(),
        setPersistedState: this.props.setPersistedState,
        persistedState: this.props.persistedState,
        onSearchResults: searchResults => this.setState({
          searchResults
        }),
        inAXMode: this.state.inAXMode
      })), global.React.createElement(_flipper.FlexRow, {
        grow: true
      }, this.state.inAXMode ? global.React.createElement(global.React.Fragment, null, global.React.createElement(_flipper.Sidebar, {
        position: "left",
        maxWidth: Infinity
      }, inspector), global.React.createElement(_Inspector.default, _extends({}, inspectorProps, {
        onSelect: selectedAXElement => this.setState({
          selectedAXElement
        }),
        showsSidebar: true,
        ax: true
      }))) : inspector), global.React.createElement(_flipper.DetailSidebar, null, global.React.createElement(_InspectorSidebar.default, {
        client: this.getClient(),
        realClient: this.realClient,
        element: element,
        onValueChanged: this.onDataValueChanged,
        logger: this.props.logger
      }))), global.React.createElement(BetaBar, {
        position: "bottom",
        compact: true
      }, global.React.createElement(_flipper.Glyph, {
        name: "beta",
        color: "#8157C7"
      }), "\xA0", global.React.createElement("strong", null, "Version 2.0:"), "\xA0 Provide feedback about this plugin in our\xA0", global.React.createElement(_flipper.Link, {
        href: "https://fb.workplace.com/groups/246035322947653/"
      }, "feedback group"), "."));
    }

  }

  exports.default = Layout;

  _defineProperty(Layout, "exportPersistedState", (callClient, persistedState, store) => {
    const defaultPromise = Promise.resolve(persistedState);

    if (!store) {
      return defaultPromise;
    }

    return callClient('getAllNodes').then(({
      allNodes
    }) => allNodes);
  });

  _defineProperty(Layout, "defaultPersistedState", {
    rootElement: null,
    rootAXElement: null,
    elements: {},
    AXelements: {}
  });
},-220980923,[-722060000,-608923549,-1646016014,2035338703,1959531704]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  var FUNC_ERROR_TEXT = 'Expected a function';
  var NAN = 0 / 0;
  var symbolTag = '[object Symbol]';
  var reTrim = /^\s+|\s+$/g;
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
  var reIsBinary = /^0b[01]+$/i;
  var reIsOctal = /^0o[0-7]+$/i;
  var freeParseInt = parseInt;
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
  var root = freeGlobal || freeSelf || Function('return this')();
  var objectProto = Object.prototype;
  var objectToString = objectProto.toString;
  var nativeMax = Math.max,
      nativeMin = Math.min;

  var now = function () {
    return root.Date.now();
  };

  function debounce(func, wait, options) {
    var lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime,
        lastInvokeTime = 0,
        leading = false,
        maxing = false,
        trailing = true;

    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }

    wait = toNumber(wait) || 0;

    if (isObject(options)) {
      leading = !!options.leading;
      maxing = 'maxWait' in options;
      maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time) {
      var args = lastArgs,
          thisArg = lastThis;
      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }

    function leadingEdge(time) {
      lastInvokeTime = time;
      timerId = setTimeout(timerExpired, wait);
      return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime,
          result = wait - timeSinceLastCall;
      return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
    }

    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime;
      return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }

    function timerExpired() {
      var time = now();

      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }

      timerId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
      timerId = undefined;

      if (trailing && lastArgs) {
        return invokeFunc(time);
      }

      lastArgs = lastThis = undefined;
      return result;
    }

    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }

      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
      return timerId === undefined ? result : trailingEdge(now());
    }

    function debounced() {
      var time = now(),
          isInvoking = shouldInvoke(time);
      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;

      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }

        if (maxing) {
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }

      if (timerId === undefined) {
        timerId = setTimeout(timerExpired, wait);
      }

      return result;
    }

    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }

  function isObject(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
  }

  function isObjectLike(value) {
    return !!value && typeof value == 'object';
  }

  function isSymbol(value) {
    return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
  }

  function toNumber(value) {
    if (typeof value == 'number') {
      return value;
    }

    if (isSymbol(value)) {
      return NAN;
    }

    if (isObject(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject(other) ? other + '' : other;
    }

    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }

    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
  }

  module.exports = debounce;
},777769367,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  var pSlice = Array.prototype.slice;

  var objectKeys = _$$_REQUIRE(_dependencyMap[0]);

  var isArguments = _$$_REQUIRE(_dependencyMap[1]);

  var deepEqual = module.exports = function (actual, expected, opts) {
    if (!opts) opts = {};

    if (actual === expected) {
      return true;
    } else if (actual instanceof Date && expected instanceof Date) {
      return actual.getTime() === expected.getTime();
    } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
      return opts.strict ? actual === expected : actual == expected;
    } else {
      return objEquiv(actual, expected, opts);
    }
  };

  function isUndefinedOrNull(value) {
    return value === null || value === undefined;
  }

  function isBuffer(x) {
    if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;

    if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
      return false;
    }

    if (x.length > 0 && typeof x[0] !== 'number') return false;
    return true;
  }

  function objEquiv(a, b, opts) {
    var i, key;
    if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) return false;
    if (a.prototype !== b.prototype) return false;

    if (isArguments(a)) {
      if (!isArguments(b)) {
        return false;
      }

      a = pSlice.call(a);
      b = pSlice.call(b);
      return deepEqual(a, b, opts);
    }

    if (isBuffer(a)) {
      if (!isBuffer(b)) {
        return false;
      }

      if (a.length !== b.length) return false;

      for (i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
      }

      return true;
    }

    try {
      var ka = objectKeys(a),
          kb = objectKeys(b);
    } catch (e) {
      return false;
    }

    if (ka.length != kb.length) return false;
    ka.sort();
    kb.sort();

    for (i = ka.length - 1; i >= 0; i--) {
      if (ka[i] != kb[i]) return false;
    }

    for (i = ka.length - 1; i >= 0; i--) {
      key = ka[i];
      if (!deepEqual(a[key], b[key], opts)) return false;
    }

    return typeof a === typeof b;
  }
},1039152508,[1788098818,-1830798251]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  var LARGE_ARRAY_SIZE = 200;
  var HASH_UNDEFINED = '__lodash_hash_undefined__';
  var MAX_SAFE_INTEGER = 9007199254740991;
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      promiseTag = '[object Promise]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      symbolTag = '[object Symbol]',
      weakMapTag = '[object WeakMap]';
  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reFlags = /\w*$/;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
  var root = freeGlobal || freeSelf || Function('return this')();
  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;

  function addMapEntry(map, pair) {
    map.set(pair[0], pair[1]);
    return map;
  }

  function addSetEntry(set, value) {
    set.add(value);
    return set;
  }

  function arrayEach(array, iteratee) {
    var index = -1,
        length = array ? array.length : 0;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }

    return array;
  }

  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }

    return array;
  }

  function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index = -1,
        length = array ? array.length : 0;

    if (initAccum && length) {
      accumulator = array[++index];
    }

    while (++index < length) {
      accumulator = iteratee(accumulator, array[index], index, array);
    }

    return accumulator;
  }

  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }

    return result;
  }

  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  function isHostObject(value) {
    var result = false;

    if (value != null && typeof value.toString != 'function') {
      try {
        result = !!(value + '');
      } catch (e) {}
    }

    return result;
  }

  function mapToArray(map) {
    var index = -1,
        result = Array(map.size);
    map.forEach(function (value, key) {
      result[++index] = [key, value];
    });
    return result;
  }

  function overArg(func, transform) {
    return function (arg) {
      return func(transform(arg));
    };
  }

  function setToArray(set) {
    var index = -1,
        result = Array(set.size);
    set.forEach(function (value) {
      result[++index] = value;
    });
    return result;
  }

  var arrayProto = Array.prototype,
      funcProto = Function.prototype,
      objectProto = Object.prototype;
  var coreJsData = root['__core-js_shared__'];

  var maskSrcKey = function () {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
    return uid ? 'Symbol(src)_1.' + uid : '';
  }();

  var funcToString = funcProto.toString;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var objectToString = objectProto.toString;
  var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  var Buffer = moduleExports ? root.Buffer : undefined,
      Symbol = root.Symbol,
      Uint8Array = root.Uint8Array,
      getPrototype = overArg(Object.getPrototypeOf, Object),
      objectCreate = Object.create,
      propertyIsEnumerable = objectProto.propertyIsEnumerable,
      splice = arrayProto.splice;
  var nativeGetSymbols = Object.getOwnPropertySymbols,
      nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
      nativeKeys = overArg(Object.keys, Object);
  var DataView = getNative(root, 'DataView'),
      Map = getNative(root, 'Map'),
      Promise = getNative(root, 'Promise'),
      Set = getNative(root, 'Set'),
      WeakMap = getNative(root, 'WeakMap'),
      nativeCreate = getNative(Object, 'create');
  var dataViewCtorString = toSource(DataView),
      mapCtorString = toSource(Map),
      promiseCtorString = toSource(Promise),
      setCtorString = toSource(Set),
      weakMapCtorString = toSource(WeakMap);
  var symbolProto = Symbol ? Symbol.prototype : undefined,
      symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

  function Hash(entries) {
    var index = -1,
        length = entries ? entries.length : 0;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
  }

  function hashDelete(key) {
    return this.has(key) && delete this.__data__[key];
  }

  function hashGet(key) {
    var data = this.__data__;

    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }

    return hasOwnProperty.call(data, key) ? data[key] : undefined;
  }

  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
  }

  function hashSet(key, value) {
    var data = this.__data__;
    data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
    return this;
  }

  Hash.prototype.clear = hashClear;
  Hash.prototype['delete'] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;

  function ListCache(entries) {
    var index = -1,
        length = entries ? entries.length : 0;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  function listCacheClear() {
    this.__data__ = [];
  }

  function listCacheDelete(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }

    var lastIndex = data.length - 1;

    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }

    return true;
  }

  function listCacheGet(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);
    return index < 0 ? undefined : data[index][1];
  }

  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }

  function listCacheSet(key, value) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }

    return this;
  }

  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype['delete'] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;

  function MapCache(entries) {
    var index = -1,
        length = entries ? entries.length : 0;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  function mapCacheClear() {
    this.__data__ = {
      'hash': new Hash(),
      'map': new (Map || ListCache)(),
      'string': new Hash()
    };
  }

  function mapCacheDelete(key) {
    return getMapData(this, key)['delete'](key);
  }

  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }

  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }

  function mapCacheSet(key, value) {
    getMapData(this, key).set(key, value);
    return this;
  }

  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype['delete'] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;

  function Stack(entries) {
    this.__data__ = new ListCache(entries);
  }

  function stackClear() {
    this.__data__ = new ListCache();
  }

  function stackDelete(key) {
    return this.__data__['delete'](key);
  }

  function stackGet(key) {
    return this.__data__.get(key);
  }

  function stackHas(key) {
    return this.__data__.has(key);
  }

  function stackSet(key, value) {
    var cache = this.__data__;

    if (cache instanceof ListCache) {
      var pairs = cache.__data__;

      if (!Map || pairs.length < 199) {
        pairs.push([key, value]);
        return this;
      }

      cache = this.__data__ = new MapCache(pairs);
    }

    cache.set(key, value);
    return this;
  }

  Stack.prototype.clear = stackClear;
  Stack.prototype['delete'] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;

  function arrayLikeKeys(value, inherited) {
    var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
    var length = result.length,
        skipIndexes = !!length;

    for (var key in value) {
      if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
        result.push(key);
      }
    }

    return result;
  }

  function assignValue(object, key, value) {
    var objValue = object[key];

    if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
      object[key] = value;
    }
  }

  function assocIndexOf(array, key) {
    var length = array.length;

    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }

    return -1;
  }

  function baseAssign(object, source) {
    return object && copyObject(source, keys(source), object);
  }

  function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
    var result;

    if (customizer) {
      result = object ? customizer(value, key, object, stack) : customizer(value);
    }

    if (result !== undefined) {
      return result;
    }

    if (!isObject(value)) {
      return value;
    }

    var isArr = isArray(value);

    if (isArr) {
      result = initCloneArray(value);

      if (!isDeep) {
        return copyArray(value, result);
      }
    } else {
      var tag = getTag(value),
          isFunc = tag == funcTag || tag == genTag;

      if (isBuffer(value)) {
        return cloneBuffer(value, isDeep);
      }

      if (tag == objectTag || tag == argsTag || isFunc && !object) {
        if (isHostObject(value)) {
          return object ? value : {};
        }

        result = initCloneObject(isFunc ? {} : value);

        if (!isDeep) {
          return copySymbols(value, baseAssign(result, value));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value : {};
        }

        result = initCloneByTag(value, tag, baseClone, isDeep);
      }
    }

    stack || (stack = new Stack());
    var stacked = stack.get(value);

    if (stacked) {
      return stacked;
    }

    stack.set(value, result);

    if (!isArr) {
      var props = isFull ? getAllKeys(value) : keys(value);
    }

    arrayEach(props || value, function (subValue, key) {
      if (props) {
        key = subValue;
        subValue = value[key];
      }

      assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
    });
    return result;
  }

  function baseCreate(proto) {
    return isObject(proto) ? objectCreate(proto) : {};
  }

  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
  }

  function baseGetTag(value) {
    return objectToString.call(value);
  }

  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }

    var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }

  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys(object);
    }

    var result = [];

    for (var key in Object(object)) {
      if (hasOwnProperty.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }

    return result;
  }

  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }

    var result = new buffer.constructor(buffer.length);
    buffer.copy(result);
    return result;
  }

  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array(result).set(new Uint8Array(arrayBuffer));
    return result;
  }

  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }

  function cloneMap(map, isDeep, cloneFunc) {
    var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
    return arrayReduce(array, addMapEntry, new map.constructor());
  }

  function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }

  function cloneSet(set, isDeep, cloneFunc) {
    var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
    return arrayReduce(array, addSetEntry, new set.constructor());
  }

  function cloneSymbol(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
  }

  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }

  function copyArray(source, array) {
    var index = -1,
        length = source.length;
    array || (array = Array(length));

    while (++index < length) {
      array[index] = source[index];
    }

    return array;
  }

  function copyObject(source, props, object, customizer) {
    object || (object = {});
    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index];
      var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;
      assignValue(object, key, newValue === undefined ? source[key] : newValue);
    }

    return object;
  }

  function copySymbols(source, object) {
    return copyObject(source, getSymbols(source), object);
  }

  function getAllKeys(object) {
    return baseGetAllKeys(object, keys, getSymbols);
  }

  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
  }

  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }

  var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
  var getTag = baseGetTag;

  if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
    getTag = function (value) {
      var result = objectToString.call(value),
          Ctor = result == objectTag ? value.constructor : undefined,
          ctorString = Ctor ? toSource(Ctor) : undefined;

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag;

          case mapCtorString:
            return mapTag;

          case promiseCtorString:
            return promiseTag;

          case setCtorString:
            return setTag;

          case weakMapCtorString:
            return weakMapTag;
        }
      }

      return result;
    };
  }

  function initCloneArray(array) {
    var length = array.length,
        result = array.constructor(length);

    if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
      result.index = array.index;
      result.input = array.input;
    }

    return result;
  }

  function initCloneObject(object) {
    return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
  }

  function initCloneByTag(object, tag, cloneFunc, isDeep) {
    var Ctor = object.constructor;

    switch (tag) {
      case arrayBufferTag:
        return cloneArrayBuffer(object);

      case boolTag:
      case dateTag:
        return new Ctor(+object);

      case dataViewTag:
        return cloneDataView(object, isDeep);

      case float32Tag:
      case float64Tag:
      case int8Tag:
      case int16Tag:
      case int32Tag:
      case uint8Tag:
      case uint8ClampedTag:
      case uint16Tag:
      case uint32Tag:
        return cloneTypedArray(object, isDeep);

      case mapTag:
        return cloneMap(object, isDeep, cloneFunc);

      case numberTag:
      case stringTag:
        return new Ctor(object);

      case regexpTag:
        return cloneRegExp(object);

      case setTag:
        return cloneSet(object, isDeep, cloneFunc);

      case symbolTag:
        return cloneSymbol(object);
    }
  }

  function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
  }

  function isKeyable(value) {
    var type = typeof value;
    return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
  }

  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }

  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
    return value === proto;
  }

  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}

      try {
        return func + '';
      } catch (e) {}
    }

    return '';
  }

  function cloneDeep(value) {
    return baseClone(value, true, true);
  }

  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }

  function isArguments(value) {
    return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
  }

  var isArray = Array.isArray;

  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }

  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }

  var isBuffer = nativeIsBuffer || stubFalse;

  function isFunction(value) {
    var tag = isObject(value) ? objectToString.call(value) : '';
    return tag == funcTag || tag == genTag;
  }

  function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }

  function isObject(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
  }

  function isObjectLike(value) {
    return !!value && typeof value == 'object';
  }

  function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }

  function stubArray() {
    return [];
  }

  function stubFalse() {
    return false;
  }

  module.exports = cloneDeep;
},1044645951,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  exports = module.exports = typeof Object.keys === 'function' ? Object.keys : shim;
  exports.shim = shim;

  function shim(obj) {
    var keys = [];

    for (var key in obj) keys.push(key);

    return keys;
  }
},1788098818,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.searchNodes = searchNodes;
  exports.default = undefined;

  var _lodash = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[0]));

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  const propsForPersistedState = AXMode => {
    return {
      ROOT: AXMode ? 'rootAXElement' : 'rootElement',
      ELEMENTS: AXMode ? 'AXelements' : 'elements',
      ELEMENT: AXMode ? 'axElement' : 'element'
    };
  };

  function constructSearchResultTree(node, isMatch, children, AXMode, AXNode) {
    let searchResult = {
      id: node.id,
      isMatch,
      hasChildren: children.length > 0,
      children: children.length > 0 ? children : null,
      element: node,
      axElement: AXNode
    };
    return searchResult;
  }

  function isMatch(element, query) {
    const nameMatch = element.name.toLowerCase().includes(query.toLowerCase());
    return nameMatch || element.id === query;
  }

  function searchNodes(node, query, AXMode, state) {
    const elements = state[propsForPersistedState(false).ELEMENTS];
    const children = [];
    const match = isMatch(node, query);

    for (const childID of node.children) {
      const child = elements[childID];
      const tree = searchNodes(child, query, AXMode, state);

      if (tree) {
        children.push(tree);
      }
    }

    if (match || children.length > 0) {
      return (0, _lodash.default)(constructSearchResultTree(node, match, children, AXMode, AXMode ? state.AXelements[node.id] : null));
    }

    return null;
  }

  class ProxyArchiveClient {
    constructor(persistedState) {
      _defineProperty(this, "persistedState", undefined);

      this.persistedState = (0, _lodash.default)(persistedState);
    }

    subscribe(method, callback) {
      return;
    }

    supportsMethod(method) {
      return Promise.resolve(false);
    }

    send(method, params) {
      return;
    }

    call(method, params) {
      const paramaters = params;

      switch (method) {
        case 'getRoot':
          {
            const {
              rootElement
            } = this.persistedState;

            if (!rootElement) {
              return Promise.resolve(null);
            }

            return Promise.resolve(this.persistedState.elements[rootElement]);
          }

        case 'getAXRoot':
          {
            const {
              rootAXElement
            } = this.persistedState;

            if (!rootAXElement) {
              return Promise.resolve(null);
            }

            return Promise.resolve(this.persistedState.AXelements[rootAXElement]);
          }

        case 'getNodes':
          {
            if (!paramaters) {
              return Promise.reject(new Error('Called getNodes with no params'));
            }

            const {
              ids
            } = paramaters;
            const arr = [];

            for (let id of ids) {
              arr.push(this.persistedState.elements[id]);
            }

            return Promise.resolve({
              elements: arr
            });
          }

        case 'getAXNodes':
          {
            if (!paramaters) {
              return Promise.reject(new Error('Called getAXNodes with no params'));
            }

            const {
              ids
            } = paramaters;
            const arr = [];

            for (let id of ids) {
              arr.push(this.persistedState.AXelements[id]);
            }

            return Promise.resolve({
              elements: arr
            });
          }

        case 'getSearchResults':
          {
            const {
              rootElement,
              rootAXElement
            } = this.persistedState;

            if (!paramaters) {
              return Promise.reject(new Error('Called getSearchResults with no params'));
            }

            const {
              query,
              axEnabled
            } = paramaters;

            if (!query) {
              return Promise.reject(new Error('query is not passed as a params to getSearchResults'));
            }

            let element = {};

            if (axEnabled) {
              if (!rootAXElement) {
                return Promise.reject(new Error('rootAXElement is undefined'));
              }

              element = this.persistedState.AXelements[rootAXElement];
            } else {
              if (!rootElement) {
                return Promise.reject(new Error('rootElement is undefined'));
              }

              element = this.persistedState.elements[rootElement];
            }

            const output = searchNodes(element, query, axEnabled, this.persistedState);
            return Promise.resolve({
              results: output,
              query
            });
          }

        case 'isConsoleEnabled':
          {
            return Promise.resolve(false);
          }

        default:
          {
            return Promise.resolve();
          }
      }
    }

  }

  var _default = ProxyArchiveClient;
  exports.default = _default;
},1959531704,[1044645951]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _flipper = global.Flipper;
  var _react = global.React;

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  const LoadingSpinner = (0, _flipper.styled)(_flipper.LoadingIndicator)({
    marginRight: 4,
    marginLeft: 3,
    marginTop: -1
  });

  class Search extends _react.Component {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "state", {
        value: '',
        outstandingSearchQuery: null
      });

      _defineProperty(this, "timer", undefined);

      _defineProperty(this, "onChange", e => {
        clearTimeout(this.timer);
        const {
          value
        } = e.target;
        this.setState({
          value
        });
        this.timer = setTimeout(() => this.performSearch(value), 200);
      });

      _defineProperty(this, "onKeyDown", e => {
        if (e.key === 'Enter') {
          this.performSearch(this.state.value);
        }
      });
    }

    performSearch(query) {
      this.setState({
        outstandingSearchQuery: query
      });

      if (!query) {
        this.displaySearchResults({
          query: '',
          results: null
        }, this.props.inAXMode);
      } else {
        this.props.client.call('getSearchResults', {
          query,
          axEnabled: this.props.inAXMode
        }).then(response => this.displaySearchResults(response, this.props.inAXMode));
      }
    }

    displaySearchResults({
      results,
      query
    }, axMode) {
      this.setState({
        outstandingSearchQuery: query === this.state.outstandingSearchQuery ? null : this.state.outstandingSearchQuery
      });
      const searchResults = this.getElementsFromSearchResultTree(results);
      const searchResultIDs = new Set(searchResults.map(r => r.element.id));
      const elements = searchResults.reduce((acc, {
        element
      }) => _objectSpread({}, acc, {
        [element.id]: _objectSpread({}, element, {
          expanded: element.children.some(c => searchResultIDs.has(c))
        })
      }), this.props.persistedState.elements);
      let {
        AXelements
      } = this.props.persistedState;

      if (axMode) {
        AXelements = searchResults.reduce((acc, {
          axElement
        }) => {
          if (!axElement) {
            return acc;
          }

          return _objectSpread({}, acc, {
            [axElement.id]: _objectSpread({}, axElement, {
              expanded: axElement.children.some(c => searchResultIDs.has(c))
            })
          });
        }, this.props.persistedState.AXelements);
      }

      this.props.setPersistedState({
        elements,
        AXelements
      });
      this.props.onSearchResults({
        matches: new Set(searchResults.filter(x => x.isMatch).map(x => x.element.id)),
        query: query
      });
    }

    getElementsFromSearchResultTree(tree) {
      if (!tree) {
        return [];
      }

      let elements = [{
        id: tree.id,
        isMatch: tree.isMatch,
        hasChildren: Boolean(tree.children),
        element: tree.element,
        axElement: tree.axElement
      }];

      if (tree.children) {
        for (const child of tree.children) {
          elements = elements.concat(this.getElementsFromSearchResultTree(child));
        }
      }

      return elements;
    }

    render() {
      return global.React.createElement(_flipper.SearchBox, {
        tabIndex: -1
      }, global.React.createElement(_flipper.SearchIcon, {
        name: "magnifying-glass",
        color: _flipper.colors.macOSTitleBarIcon,
        size: 16
      }), global.React.createElement(_flipper.SearchInput, {
        placeholder: 'Search',
        onChange: this.onChange,
        onKeyDown: this.onKeyDown,
        value: this.state.value
      }), this.state.outstandingSearchQuery && global.React.createElement(LoadingSpinner, {
        size: 16
      }));
    }

  }

  exports.default = Search;
},2035338703,[]);
module.exports = global.__r(-220980923).default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9fcHJlbHVkZV9fIiwiL2RhdGEvc2FuZGNhc3RsZS9ib3hlcy90cnVuay1oZy1mYmNvZGUtZmJzb3VyY2UveHBsYXQvZmxpcHBlci1wdWJsaWMvc3RhdGljL25vZGVfbW9kdWxlcy9tZXRyby9zcmMvbGliL3BvbHlmaWxscy9yZXF1aXJlLmpzIiwiL2RhdGEvc2FuZGNhc3RsZS9ib3hlcy90cnVuay1oZy1mYmNvZGUtZmJzb3VyY2UveHBsYXQvZmxpcHBlci1wdWJsaWMvc3JjL3BsdWdpbnMvbGF5b3V0L2luZGV4LmpzIiwiL2RhdGEvc2FuZGNhc3RsZS9ib3hlcy90cnVuay1oZy1mYmNvZGUtZmJzb3VyY2UveHBsYXQvZmxpcHBlci1wdWJsaWMvc3JjL3BsdWdpbnMvbGF5b3V0L0luc3BlY3Rvci5qcyIsIi9kYXRhL3NhbmRjYXN0bGUvYm94ZXMvdHJ1bmstaGctZmJjb2RlLWZic291cmNlL3hwbGF0L2ZsaXBwZXItcHVibGljL3NyYy9wbHVnaW5zL2xheW91dC9ub2RlX21vZHVsZXMvbG9kYXNoLmRlYm91bmNlL2luZGV4LmpzIiwiL2RhdGEvc2FuZGNhc3RsZS9ib3hlcy90cnVuay1oZy1mYmNvZGUtZmJzb3VyY2UveHBsYXQvZmxpcHBlci1wdWJsaWMvc3JjL3BsdWdpbnMvbGF5b3V0L1Rvb2xiYXJJY29uLmpzIiwiL2RhdGEvc2FuZGNhc3RsZS9ib3hlcy90cnVuay1oZy1mYmNvZGUtZmJzb3VyY2UveHBsYXQvZmxpcHBlci1wdWJsaWMvc3JjL3BsdWdpbnMvbGF5b3V0L0luc3BlY3RvclNpZGViYXIuanMiLCIvZGF0YS9zYW5kY2FzdGxlL2JveGVzL3RydW5rLWhnLWZiY29kZS1mYnNvdXJjZS94cGxhdC9mbGlwcGVyLXB1YmxpYy9zcmMvcGx1Z2lucy9sYXlvdXQvbm9kZV9tb2R1bGVzL2RlZXAtZXF1YWwvaW5kZXguanMiLCIvZGF0YS9zYW5kY2FzdGxlL2JveGVzL3RydW5rLWhnLWZiY29kZS1mYnNvdXJjZS94cGxhdC9mbGlwcGVyLXB1YmxpYy9zcmMvcGx1Z2lucy9sYXlvdXQvbm9kZV9tb2R1bGVzL2RlZXAtZXF1YWwvbGliL2tleXMuanMiLCIvZGF0YS9zYW5kY2FzdGxlL2JveGVzL3RydW5rLWhnLWZiY29kZS1mYnNvdXJjZS94cGxhdC9mbGlwcGVyLXB1YmxpYy9zcmMvcGx1Z2lucy9sYXlvdXQvbm9kZV9tb2R1bGVzL2RlZXAtZXF1YWwvbGliL2lzX2FyZ3VtZW50cy5qcyIsIi9kYXRhL3NhbmRjYXN0bGUvYm94ZXMvdHJ1bmstaGctZmJjb2RlLWZic291cmNlL3hwbGF0L2ZsaXBwZXItcHVibGljL3NyYy9wbHVnaW5zL2xheW91dC9TZWFyY2guanMiLCIvZGF0YS9zYW5kY2FzdGxlL2JveGVzL3RydW5rLWhnLWZiY29kZS1mYnNvdXJjZS94cGxhdC9mbGlwcGVyLXB1YmxpYy9zcmMvcGx1Z2lucy9sYXlvdXQvUHJveHlBcmNoaXZlQ2xpZW50LmpzIiwiL2RhdGEvc2FuZGNhc3RsZS9ib3hlcy90cnVuay1oZy1mYmNvZGUtZmJzb3VyY2UveHBsYXQvZmxpcHBlci1wdWJsaWMvc3JjL3BsdWdpbnMvbGF5b3V0L25vZGVfbW9kdWxlcy9sb2Rhc2guY2xvbmVkZWVwL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX0RFVl9fPWZhbHNlLF9fQlVORExFX1NUQVJUX1RJTUVfXz10aGlzLm5hdGl2ZVBlcmZvcm1hbmNlTm93P25hdGl2ZVBlcmZvcm1hbmNlTm93KCk6RGF0ZS5ub3coKSxwcm9jZXNzPXRoaXMucHJvY2Vzc3x8e307cHJvY2Vzcy5lbnY9cHJvY2Vzcy5lbnZ8fHt9O3Byb2Nlc3MuZW52Lk5PREVfRU5WPVwicHJvZHVjdGlvblwiOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSBGYWNlYm9vaywgSW5jLiBhbmQgaXRzIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQHBvbHlmaWxsXG4gKlxuICogQGZvcm1hdFxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1iaXR3aXNlICovXG5cbmdsb2JhbC5fX3IgPSBtZXRyb1JlcXVpcmU7XG5nbG9iYWwuX19kID0gZGVmaW5lO1xuZ2xvYmFsLl9fYyA9IGNsZWFyO1xuXG52YXIgbW9kdWxlcyA9IGNsZWFyKCk7XG5cbi8vIERvbid0IHVzZSBhIFN5bWJvbCBoZXJlLCBpdCB3b3VsZCBwdWxsIGluIGFuIGV4dHJhIHBvbHlmaWxsIHdpdGggYWxsIHNvcnRzIG9mXG4vLyBhZGRpdGlvbmFsIHN0dWZmIChlLmcuIEFycmF5LmZyb20pLlxudmFyIEVNUFRZID0ge307XG52YXIgX3JlZiA9IHt9LFxuICBoYXNPd25Qcm9wZXJ0eSA9IF9yZWYuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIGNsZWFyKCkge1xuICBtb2R1bGVzID1cbiAgICB0eXBlb2YgX19OVU1fTU9EVUxFU19fID09PSBcIm51bWJlclwiXG4gICAgICA/IEFycmF5KF9fTlVNX01PRFVMRVNfXyB8IDApXG4gICAgICA6IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgLy8gV2UgcmV0dXJuIG1vZHVsZXMgaGVyZSBzbyB0aGF0IHdlIGNhbiBhc3NpZ24gYW4gaW5pdGlhbCB2YWx1ZSB0byBtb2R1bGVzXG4gIC8vIHdoZW4gZGVmaW5pbmcgaXQuIE90aGVyd2lzZSwgd2Ugd291bGQgaGF2ZSB0byBkbyBcImxldCBtb2R1bGVzID0gbnVsbFwiLFxuICAvLyB3aGljaCB3aWxsIGZvcmNlIHVzIHRvIGFkZCBcIm51bGx0aHJvd3NcIiBldmVyeXdoZXJlLlxuICByZXR1cm4gbW9kdWxlcztcbn1cblxuaWYgKF9fREVWX18pIHtcbiAgdmFyIHZlcmJvc2VOYW1lc1RvTW9kdWxlSWRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdmFyIGluaXRpYWxpemluZ01vZHVsZUlkcyA9IFtdO1xufVxuXG5mdW5jdGlvbiBkZWZpbmUoZmFjdG9yeSwgbW9kdWxlSWQsIGRlcGVuZGVuY3lNYXApIHtcbiAgaWYgKG1vZHVsZXNbbW9kdWxlSWRdICE9IG51bGwpIHtcbiAgICBpZiAoX19ERVZfXykge1xuICAgICAgLy8gKFdlIHRha2UgYGludmVyc2VEZXBlbmRlbmNpZXNgIGZyb20gYGFyZ3VtZW50c2AgdG8gYXZvaWQgYW4gdW51c2VkXG4gICAgICAvLyBuYW1lZCBwYXJhbWV0ZXIgaW4gYGRlZmluZWAgaW4gcHJvZHVjdGlvbi5cbiAgICAgIHZhciBpbnZlcnNlRGVwZW5kZW5jaWVzID0gYXJndW1lbnRzWzRdO1xuXG4gICAgICAvLyBJZiB0aGUgbW9kdWxlIGhhcyBhbHJlYWR5IGJlZW4gZGVmaW5lZCBhbmQgdGhlIGRlZmluZSBtZXRob2QgaGFzIGJlZW5cbiAgICAgIC8vIGNhbGxlZCB3aXRoIGludmVyc2VEZXBlbmRlbmNpZXMsIHdlIGNhbiBob3QgcmVsb2FkIGl0LlxuICAgICAgaWYgKGludmVyc2VEZXBlbmRlbmNpZXMpIHtcbiAgICAgICAgZ2xvYmFsLl9fYWNjZXB0KG1vZHVsZUlkLCBmYWN0b3J5LCBkZXBlbmRlbmN5TWFwLCBpbnZlcnNlRGVwZW5kZW5jaWVzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBcIlRyeWluZyB0byBkZWZpbmUgdHdpY2UgbW9kdWxlIElEIFwiICsgbW9kdWxlSWQgKyBcIiBpbiB0aGUgc2FtZSBidW5kbGVcIlxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHByZXZlbnQgcmVwZWF0ZWQgY2FsbHMgdG8gYGdsb2JhbC5uYXRpdmVSZXF1aXJlYCB0byBvdmVyd3JpdGUgbW9kdWxlc1xuICAgIC8vIHRoYXQgYXJlIGFscmVhZHkgbG9hZGVkXG4gICAgcmV0dXJuO1xuICB9XG4gIG1vZHVsZXNbbW9kdWxlSWRdID0ge1xuICAgIGRlcGVuZGVuY3lNYXA6IGRlcGVuZGVuY3lNYXAsXG4gICAgZmFjdG9yeTogZmFjdG9yeSxcbiAgICBoYXNFcnJvcjogZmFsc2UsXG4gICAgaW1wb3J0ZWRBbGw6IEVNUFRZLFxuICAgIGltcG9ydGVkRGVmYXVsdDogRU1QVFksXG4gICAgaXNJbml0aWFsaXplZDogZmFsc2UsXG4gICAgcHVibGljTW9kdWxlOiB7IGV4cG9ydHM6IHt9IH1cbiAgfTtcbiAgaWYgKF9fREVWX18pIHtcbiAgICAvLyBITVJcbiAgICBtb2R1bGVzW21vZHVsZUlkXS5ob3QgPSBjcmVhdGVIb3RSZWxvYWRpbmdPYmplY3QoKTtcblxuICAgIC8vIERFQlVHR0FCTEUgTU9EVUxFUyBOQU1FU1xuICAgIC8vIHdlIHRha2UgYHZlcmJvc2VOYW1lYCBmcm9tIGBhcmd1bWVudHNgIHRvIGF2b2lkIGFuIHVudXNlZCBuYW1lZCBwYXJhbWV0ZXJcbiAgICAvLyBpbiBgZGVmaW5lYCBpbiBwcm9kdWN0aW9uLlxuICAgIHZhciBfdmVyYm9zZU5hbWUgPSBhcmd1bWVudHNbM107XG4gICAgaWYgKF92ZXJib3NlTmFtZSkge1xuICAgICAgbW9kdWxlc1ttb2R1bGVJZF0udmVyYm9zZU5hbWUgPSBfdmVyYm9zZU5hbWU7XG4gICAgICB2ZXJib3NlTmFtZXNUb01vZHVsZUlkc1tfdmVyYm9zZU5hbWVdID0gbW9kdWxlSWQ7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG1ldHJvUmVxdWlyZShtb2R1bGVJZCkge1xuICBpZiAoX19ERVZfXyAmJiB0eXBlb2YgbW9kdWxlSWQgPT09IFwic3RyaW5nXCIpIHtcbiAgICB2YXIgX3ZlcmJvc2VOYW1lMiA9IG1vZHVsZUlkO1xuICAgIG1vZHVsZUlkID0gdmVyYm9zZU5hbWVzVG9Nb2R1bGVJZHNbX3ZlcmJvc2VOYW1lMl07XG4gICAgaWYgKG1vZHVsZUlkID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBuYW1lZCBtb2R1bGU6IFwiJyArIF92ZXJib3NlTmFtZTIgKyAnXCInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnUmVxdWlyaW5nIG1vZHVsZSBcIicgK1xuICAgICAgICAgIF92ZXJib3NlTmFtZTIgK1xuICAgICAgICAgICdcIiBieSBuYW1lIGlzIG9ubHkgc3VwcG9ydGVkIGZvciAnICtcbiAgICAgICAgICBcImRlYnVnZ2luZyBwdXJwb3NlcyBhbmQgd2lsbCBCUkVBSyBJTiBQUk9EVUNUSU9OIVwiXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8vJEZsb3dGaXhNZTogYXQgdGhpcyBwb2ludCB3ZSBrbm93IHRoYXQgbW9kdWxlSWQgaXMgYSBudW1iZXJcbiAgdmFyIG1vZHVsZUlkUmVhbGx5SXNOdW1iZXIgPSBtb2R1bGVJZDtcblxuICBpZiAoX19ERVZfXykge1xuICAgIHZhciBpbml0aWFsaXppbmdJbmRleCA9IGluaXRpYWxpemluZ01vZHVsZUlkcy5pbmRleE9mKFxuICAgICAgbW9kdWxlSWRSZWFsbHlJc051bWJlclxuICAgICk7XG4gICAgaWYgKGluaXRpYWxpemluZ0luZGV4ICE9PSAtMSkge1xuICAgICAgdmFyIGN5Y2xlID0gaW5pdGlhbGl6aW5nTW9kdWxlSWRzXG4gICAgICAgIC5zbGljZShpbml0aWFsaXppbmdJbmRleClcbiAgICAgICAgLm1hcChmdW5jdGlvbihpZCkge1xuICAgICAgICAgIHJldHVybiBtb2R1bGVzW2lkXS52ZXJib3NlTmFtZTtcbiAgICAgICAgfSk7XG4gICAgICAvLyBXZSB3YW50IHRvIHNob3cgQSAtPiBCIC0+IEE6XG4gICAgICBjeWNsZS5wdXNoKGN5Y2xlWzBdKTtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgXCJSZXF1aXJlIGN5Y2xlOiBcIiArXG4gICAgICAgICAgY3ljbGUuam9pbihcIiAtPiBcIikgK1xuICAgICAgICAgIFwiXFxuXFxuXCIgK1xuICAgICAgICAgIFwiUmVxdWlyZSBjeWNsZXMgYXJlIGFsbG93ZWQsIGJ1dCBjYW4gcmVzdWx0IGluIHVuaW5pdGlhbGl6ZWQgdmFsdWVzLiBcIiArXG4gICAgICAgICAgXCJDb25zaWRlciByZWZhY3RvcmluZyB0byByZW1vdmUgdGhlIG5lZWQgZm9yIGEgY3ljbGUuXCJcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgdmFyIG1vZHVsZSA9IG1vZHVsZXNbbW9kdWxlSWRSZWFsbHlJc051bWJlcl07XG5cbiAgcmV0dXJuIG1vZHVsZSAmJiBtb2R1bGUuaXNJbml0aWFsaXplZFxuICAgID8gbW9kdWxlLnB1YmxpY01vZHVsZS5leHBvcnRzXG4gICAgOiBndWFyZGVkTG9hZE1vZHVsZShtb2R1bGVJZFJlYWxseUlzTnVtYmVyLCBtb2R1bGUpO1xufVxuXG5mdW5jdGlvbiBtZXRyb0ltcG9ydERlZmF1bHQobW9kdWxlSWQpIHtcbiAgaWYgKF9fREVWX18gJiYgdHlwZW9mIG1vZHVsZUlkID09PSBcInN0cmluZ1wiKSB7XG4gICAgdmFyIF92ZXJib3NlTmFtZTMgPSBtb2R1bGVJZDtcbiAgICBtb2R1bGVJZCA9IHZlcmJvc2VOYW1lc1RvTW9kdWxlSWRzW192ZXJib3NlTmFtZTNdO1xuICB9XG5cbiAgLy8kRmxvd0ZpeE1lOiBhdCB0aGlzIHBvaW50IHdlIGtub3cgdGhhdCBtb2R1bGVJZCBpcyBhIG51bWJlclxuICB2YXIgbW9kdWxlSWRSZWFsbHlJc051bWJlciA9IG1vZHVsZUlkO1xuXG4gIGlmIChcbiAgICBtb2R1bGVzW21vZHVsZUlkUmVhbGx5SXNOdW1iZXJdICYmXG4gICAgbW9kdWxlc1ttb2R1bGVJZFJlYWxseUlzTnVtYmVyXS5pbXBvcnRlZERlZmF1bHQgIT09IEVNUFRZXG4gICkge1xuICAgIHJldHVybiBtb2R1bGVzW21vZHVsZUlkUmVhbGx5SXNOdW1iZXJdLmltcG9ydGVkRGVmYXVsdDtcbiAgfVxuXG4gIHZhciBleHBvcnRzID0gbWV0cm9SZXF1aXJlKG1vZHVsZUlkUmVhbGx5SXNOdW1iZXIpO1xuICB2YXIgaW1wb3J0ZWREZWZhdWx0ID1cbiAgICBleHBvcnRzICYmIGV4cG9ydHMuX19lc01vZHVsZSA/IGV4cG9ydHMuZGVmYXVsdCA6IGV4cG9ydHM7XG5cbiAgcmV0dXJuIChtb2R1bGVzW21vZHVsZUlkUmVhbGx5SXNOdW1iZXJdLmltcG9ydGVkRGVmYXVsdCA9IGltcG9ydGVkRGVmYXVsdCk7XG59XG5cbmZ1bmN0aW9uIG1ldHJvSW1wb3J0QWxsKG1vZHVsZUlkKSB7XG4gIGlmIChfX0RFVl9fICYmIHR5cGVvZiBtb2R1bGVJZCA9PT0gXCJzdHJpbmdcIikge1xuICAgIHZhciBfdmVyYm9zZU5hbWU0ID0gbW9kdWxlSWQ7XG4gICAgbW9kdWxlSWQgPSB2ZXJib3NlTmFtZXNUb01vZHVsZUlkc1tfdmVyYm9zZU5hbWU0XTtcbiAgfVxuXG4gIC8vJEZsb3dGaXhNZTogYXQgdGhpcyBwb2ludCB3ZSBrbm93IHRoYXQgbW9kdWxlSWQgaXMgYSBudW1iZXJcbiAgdmFyIG1vZHVsZUlkUmVhbGx5SXNOdW1iZXIgPSBtb2R1bGVJZDtcblxuICBpZiAoXG4gICAgbW9kdWxlc1ttb2R1bGVJZFJlYWxseUlzTnVtYmVyXSAmJlxuICAgIG1vZHVsZXNbbW9kdWxlSWRSZWFsbHlJc051bWJlcl0uaW1wb3J0ZWRBbGwgIT09IEVNUFRZXG4gICkge1xuICAgIHJldHVybiBtb2R1bGVzW21vZHVsZUlkUmVhbGx5SXNOdW1iZXJdLmltcG9ydGVkQWxsO1xuICB9XG5cbiAgdmFyIGV4cG9ydHMgPSBtZXRyb1JlcXVpcmUobW9kdWxlSWRSZWFsbHlJc051bWJlcik7XG4gIHZhciBpbXBvcnRlZEFsbCA9IHZvaWQgMDtcblxuICBpZiAoZXhwb3J0cyAmJiBleHBvcnRzLl9fZXNNb2R1bGUpIHtcbiAgICBpbXBvcnRlZEFsbCA9IGV4cG9ydHM7XG4gIH0gZWxzZSB7XG4gICAgaW1wb3J0ZWRBbGwgPSB7fTtcblxuICAgIC8vIFJlZnJhaW4gZnJvbSB1c2luZyBPYmplY3QuYXNzaWduLCBpdCBoYXMgdG8gd29yayBpbiBFUzMgZW52aXJvbm1lbnRzLlxuICAgIGlmIChleHBvcnRzKSB7XG4gICAgICBmb3IgKHZhciBfa2V5IGluIGV4cG9ydHMpIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgX2tleSkpIHtcbiAgICAgICAgICBpbXBvcnRlZEFsbFtfa2V5XSA9IGV4cG9ydHNbX2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpbXBvcnRlZEFsbC5kZWZhdWx0ID0gZXhwb3J0cztcbiAgfVxuXG4gIHJldHVybiAobW9kdWxlc1ttb2R1bGVJZFJlYWxseUlzTnVtYmVyXS5pbXBvcnRlZEFsbCA9IGltcG9ydGVkQWxsKTtcbn1cblxudmFyIGluR3VhcmQgPSBmYWxzZTtcbmZ1bmN0aW9uIGd1YXJkZWRMb2FkTW9kdWxlKG1vZHVsZUlkLCBtb2R1bGUpIHtcbiAgaWYgKCFpbkd1YXJkICYmIGdsb2JhbC5FcnJvclV0aWxzKSB7XG4gICAgaW5HdWFyZCA9IHRydWU7XG4gICAgdmFyIHJldHVyblZhbHVlID0gdm9pZCAwO1xuICAgIHRyeSB7XG4gICAgICByZXR1cm5WYWx1ZSA9IGxvYWRNb2R1bGVJbXBsZW1lbnRhdGlvbihtb2R1bGVJZCwgbW9kdWxlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBnbG9iYWwuRXJyb3JVdGlscy5yZXBvcnRGYXRhbEVycm9yKGUpO1xuICAgIH1cbiAgICBpbkd1YXJkID0gZmFsc2U7XG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsb2FkTW9kdWxlSW1wbGVtZW50YXRpb24obW9kdWxlSWQsIG1vZHVsZSk7XG4gIH1cbn1cblxudmFyIElEX01BU0tfU0hJRlQgPSAxNjtcbnZhciBMT0NBTF9JRF9NQVNLID0gfjAgPj4+IElEX01BU0tfU0hJRlQ7XG5cbmZ1bmN0aW9uIHVucGFja01vZHVsZUlkKG1vZHVsZUlkKSB7XG4gIHZhciBzZWdtZW50SWQgPSBtb2R1bGVJZCA+Pj4gSURfTUFTS19TSElGVDtcbiAgdmFyIGxvY2FsSWQgPSBtb2R1bGVJZCAmIExPQ0FMX0lEX01BU0s7XG4gIHJldHVybiB7IHNlZ21lbnRJZDogc2VnbWVudElkLCBsb2NhbElkOiBsb2NhbElkIH07XG59XG5tZXRyb1JlcXVpcmUudW5wYWNrTW9kdWxlSWQgPSB1bnBhY2tNb2R1bGVJZDtcblxuZnVuY3Rpb24gcGFja01vZHVsZUlkKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUuc2VnbWVudElkIDw8IElEX01BU0tfU0hJRlQpICsgdmFsdWUubG9jYWxJZDtcbn1cbm1ldHJvUmVxdWlyZS5wYWNrTW9kdWxlSWQgPSBwYWNrTW9kdWxlSWQ7XG5cbnZhciBob29rcyA9IFtdO1xuZnVuY3Rpb24gcmVnaXN0ZXJIb29rKGNiKSB7XG4gIHZhciBob29rID0geyBjYjogY2IgfTtcbiAgaG9va3MucHVzaChob29rKTtcbiAgcmV0dXJuIHtcbiAgICByZWxlYXNlOiBmdW5jdGlvbiByZWxlYXNlKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBob29rcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAoaG9va3NbaV0gPT09IGhvb2spIHtcbiAgICAgICAgICBob29rcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5tZXRyb1JlcXVpcmUucmVnaXN0ZXJIb29rID0gcmVnaXN0ZXJIb29rO1xuXG5mdW5jdGlvbiBsb2FkTW9kdWxlSW1wbGVtZW50YXRpb24obW9kdWxlSWQsIG1vZHVsZSkge1xuICBpZiAoIW1vZHVsZSAmJiBnbG9iYWwuX19kZWZpbmVNb2R1bGUpIHtcbiAgICBnbG9iYWwuX19kZWZpbmVNb2R1bGUobW9kdWxlSWQpO1xuICAgIG1vZHVsZSA9IG1vZHVsZXNbbW9kdWxlSWRdO1xuICB9XG5cbiAgdmFyIG5hdGl2ZVJlcXVpcmUgPSBnbG9iYWwubmF0aXZlUmVxdWlyZTtcbiAgaWYgKCFtb2R1bGUgJiYgbmF0aXZlUmVxdWlyZSkge1xuICAgIHZhciBfdW5wYWNrTW9kdWxlSWQgPSB1bnBhY2tNb2R1bGVJZChtb2R1bGVJZCksXG4gICAgICBfc2VnbWVudElkID0gX3VucGFja01vZHVsZUlkLnNlZ21lbnRJZCxcbiAgICAgIF9sb2NhbElkID0gX3VucGFja01vZHVsZUlkLmxvY2FsSWQ7XG5cbiAgICBuYXRpdmVSZXF1aXJlKF9sb2NhbElkLCBfc2VnbWVudElkKTtcbiAgICBtb2R1bGUgPSBtb2R1bGVzW21vZHVsZUlkXTtcbiAgfVxuXG4gIGlmICghbW9kdWxlKSB7XG4gICAgdGhyb3cgdW5rbm93bk1vZHVsZUVycm9yKG1vZHVsZUlkKTtcbiAgfVxuXG4gIGlmIChtb2R1bGUuaGFzRXJyb3IpIHtcbiAgICB0aHJvdyBtb2R1bGVUaHJld0Vycm9yKG1vZHVsZUlkLCBtb2R1bGUuZXJyb3IpO1xuICB9XG5cbiAgLy8gYG1ldHJvUmVxdWlyZWAgY2FsbHMgaW50byB0aGUgcmVxdWlyZSBwb2x5ZmlsbCBpdHNlbGYgYXJlIG5vdCBhbmFseXplZCBhbmRcbiAgLy8gcmVwbGFjZWQgc28gdGhhdCB0aGV5IHVzZSBudW1lcmljIG1vZHVsZSBJRHMuXG4gIC8vIFRoZSBzeXN0cmFjZSBtb2R1bGUgd2lsbCBleHBvc2UgaXRzZWxmIG9uIHRoZSBtZXRyb1JlcXVpcmUgZnVuY3Rpb24gc28gdGhhdFxuICAvLyBpdCBjYW4gYmUgdXNlZCBoZXJlLlxuICAvLyBUT0RPKGRhdmlkYXVyZWxpbykgU2NhbiBwb2x5ZmlsbHMgZm9yIGRlcGVuZGVuY2llcywgdG9vICh0OTc1OTY4NilcbiAgaWYgKF9fREVWX18pIHtcbiAgICB2YXIgU3lzdHJhY2UgPSBtZXRyb1JlcXVpcmUuU3lzdHJhY2U7XG4gIH1cblxuICAvLyBXZSBtdXN0IG9wdGltaXN0aWNhbGx5IG1hcmsgbW9kdWxlIGFzIGluaXRpYWxpemVkIGJlZm9yZSBydW5uaW5nIHRoZVxuICAvLyBmYWN0b3J5IHRvIGtlZXAgYW55IHJlcXVpcmUgY3ljbGVzIGluc2lkZSB0aGUgZmFjdG9yeSBmcm9tIGNhdXNpbmcgYW5cbiAgLy8gaW5maW5pdGUgcmVxdWlyZSBsb29wLlxuICBtb2R1bGUuaXNJbml0aWFsaXplZCA9IHRydWU7XG5cbiAgdmFyIF9tb2R1bGUgPSBtb2R1bGUsXG4gICAgZmFjdG9yeSA9IF9tb2R1bGUuZmFjdG9yeSxcbiAgICBkZXBlbmRlbmN5TWFwID0gX21vZHVsZS5kZXBlbmRlbmN5TWFwO1xuXG4gIGlmIChfX0RFVl9fKSB7XG4gICAgaW5pdGlhbGl6aW5nTW9kdWxlSWRzLnB1c2gobW9kdWxlSWQpO1xuICB9XG4gIHRyeSB7XG4gICAgaWYgKF9fREVWX18pIHtcbiAgICAgIC8vICRGbG93Rml4TWU6IHdlIGtub3cgdGhhdCBfX0RFVl9fIGlzIGNvbnN0IGFuZCBgU3lzdHJhY2VgIGV4aXN0c1xuICAgICAgU3lzdHJhY2UuYmVnaW5FdmVudChcIkpTX3JlcXVpcmVfXCIgKyAobW9kdWxlLnZlcmJvc2VOYW1lIHx8IG1vZHVsZUlkKSk7XG4gICAgfVxuXG4gICAgdmFyIF9tb2R1bGVPYmplY3QgPSBtb2R1bGUucHVibGljTW9kdWxlO1xuXG4gICAgaWYgKF9fREVWX18pIHtcbiAgICAgIGlmIChtb2R1bGUuaG90KSB7XG4gICAgICAgIF9tb2R1bGVPYmplY3QuaG90ID0gbW9kdWxlLmhvdDtcbiAgICAgIH1cbiAgICB9XG4gICAgX21vZHVsZU9iamVjdC5pZCA9IG1vZHVsZUlkO1xuXG4gICAgaWYgKGhvb2tzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaG9va3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaG9va3NbaV0uY2IobW9kdWxlSWQsIF9tb2R1bGVPYmplY3QpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGtlZXAgYXJncyBpbiBzeW5jIHdpdGggd2l0aCBkZWZpbmVNb2R1bGVDb2RlIGluXG4gICAgLy8gbWV0cm8vc3JjL1Jlc29sdmVyL2luZGV4LmpzXG4gICAgLy8gYW5kIG1ldHJvL3NyYy9Nb2R1bGVHcmFwaC93b3JrZXIuanNcbiAgICBmYWN0b3J5KFxuICAgICAgZ2xvYmFsLFxuICAgICAgbWV0cm9SZXF1aXJlLFxuICAgICAgbWV0cm9JbXBvcnREZWZhdWx0LFxuICAgICAgbWV0cm9JbXBvcnRBbGwsXG4gICAgICBfbW9kdWxlT2JqZWN0LFxuICAgICAgX21vZHVsZU9iamVjdC5leHBvcnRzLFxuICAgICAgZGVwZW5kZW5jeU1hcFxuICAgICk7XG5cbiAgICAvLyBhdm9pZCByZW1vdmluZyBmYWN0b3J5IGluIERFViBtb2RlIGFzIGl0IGJyZWFrcyBITVJcbiAgICBpZiAoIV9fREVWX18pIHtcbiAgICAgIC8vICRGbG93Rml4TWU6IFRoaXMgaXMgb25seSBzb3VuZCBiZWNhdXNlIHdlIG5ldmVyIGFjY2VzcyBgZmFjdG9yeWAgYWdhaW5cbiAgICAgIG1vZHVsZS5mYWN0b3J5ID0gdW5kZWZpbmVkO1xuICAgICAgbW9kdWxlLmRlcGVuZGVuY3lNYXAgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKF9fREVWX18pIHtcbiAgICAgIC8vICRGbG93Rml4TWU6IHdlIGtub3cgdGhhdCBfX0RFVl9fIGlzIGNvbnN0IGFuZCBgU3lzdHJhY2VgIGV4aXN0c1xuICAgICAgU3lzdHJhY2UuZW5kRXZlbnQoKTtcbiAgICB9XG4gICAgcmV0dXJuIF9tb2R1bGVPYmplY3QuZXhwb3J0cztcbiAgfSBjYXRjaCAoZSkge1xuICAgIG1vZHVsZS5oYXNFcnJvciA9IHRydWU7XG4gICAgbW9kdWxlLmVycm9yID0gZTtcbiAgICBtb2R1bGUuaXNJbml0aWFsaXplZCA9IGZhbHNlO1xuICAgIG1vZHVsZS5wdWJsaWNNb2R1bGUuZXhwb3J0cyA9IHVuZGVmaW5lZDtcbiAgICB0aHJvdyBlO1xuICB9IGZpbmFsbHkge1xuICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICBpZiAoaW5pdGlhbGl6aW5nTW9kdWxlSWRzLnBvcCgpICE9PSBtb2R1bGVJZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgXCJpbml0aWFsaXppbmdNb2R1bGVJZHMgaXMgY29ycnVwdDsgc29tZXRoaW5nIGlzIHRlcnJpYmx5IHdyb25nXCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdW5rbm93bk1vZHVsZUVycm9yKGlkKSB7XG4gIHZhciBtZXNzYWdlID0gJ1JlcXVpcmluZyB1bmtub3duIG1vZHVsZSBcIicgKyBpZCArICdcIi4nO1xuICBpZiAoX19ERVZfXykge1xuICAgIG1lc3NhZ2UgKz1cbiAgICAgIFwiSWYgeW91IGFyZSBzdXJlIHRoZSBtb2R1bGUgaXMgdGhlcmUsIHRyeSByZXN0YXJ0aW5nIE1ldHJvIEJ1bmRsZXIuIFwiICtcbiAgICAgIFwiWW91IG1heSBhbHNvIHdhbnQgdG8gcnVuIGB5YXJuYCwgb3IgYG5wbSBpbnN0YWxsYCAoZGVwZW5kaW5nIG9uIHlvdXIgZW52aXJvbm1lbnQpLlwiO1xuICB9XG4gIHJldHVybiBFcnJvcihtZXNzYWdlKTtcbn1cblxuZnVuY3Rpb24gbW9kdWxlVGhyZXdFcnJvcihpZCwgZXJyb3IpIHtcbiAgdmFyIGRpc3BsYXlOYW1lID0gKF9fREVWX18gJiYgbW9kdWxlc1tpZF0gJiYgbW9kdWxlc1tpZF0udmVyYm9zZU5hbWUpIHx8IGlkO1xuICByZXR1cm4gRXJyb3IoXG4gICAgJ1JlcXVpcmluZyBtb2R1bGUgXCInICsgZGlzcGxheU5hbWUgKyAnXCIsIHdoaWNoIHRocmV3IGFuIGV4Y2VwdGlvbjogJyArIGVycm9yXG4gICk7XG59XG5cbmlmIChfX0RFVl9fKSB7XG4gIG1ldHJvUmVxdWlyZS5TeXN0cmFjZSA9IHtcbiAgICBiZWdpbkV2ZW50OiBmdW5jdGlvbiBiZWdpbkV2ZW50KCkge30sXG4gICAgZW5kRXZlbnQ6IGZ1bmN0aW9uIGVuZEV2ZW50KCkge31cbiAgfTtcblxuICBtZXRyb1JlcXVpcmUuZ2V0TW9kdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBtb2R1bGVzO1xuICB9O1xuXG4gIC8vIEhPVCBNT0RVTEUgUkVMT0FESU5HXG4gIHZhciBjcmVhdGVIb3RSZWxvYWRpbmdPYmplY3QgPSBmdW5jdGlvbiBjcmVhdGVIb3RSZWxvYWRpbmdPYmplY3QoKSB7XG4gICAgdmFyIGhvdCA9IHtcbiAgICAgIGFjY2VwdENhbGxiYWNrOiBudWxsLFxuICAgICAgYWNjZXB0OiBmdW5jdGlvbiBhY2NlcHQoY2FsbGJhY2spIHtcbiAgICAgICAgaG90LmFjY2VwdENhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICB9LFxuICAgICAgZGlzcG9zZUNhbGxiYWNrOiBudWxsLFxuICAgICAgZGlzcG9zZTogZnVuY3Rpb24gZGlzcG9zZShjYWxsYmFjaykge1xuICAgICAgICBob3QuZGlzcG9zZUNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gaG90O1xuICB9O1xuXG4gIHZhciBtZXRyb0FjY2VwdEFsbCA9IGZ1bmN0aW9uIG1ldHJvQWNjZXB0QWxsKFxuICAgIGRlcGVuZGVudE1vZHVsZXMsXG4gICAgaW52ZXJzZURlcGVuZGVuY2llcyxcbiAgICBwYXRjaGVkTW9kdWxlc1xuICApIHtcbiAgICBpZiAoIWRlcGVuZGVudE1vZHVsZXMgfHwgZGVwZW5kZW50TW9kdWxlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhciBub3RBY2NlcHRlZCA9IGRlcGVuZGVudE1vZHVsZXMuZmlsdGVyKGZ1bmN0aW9uKG1vZHVsZSkge1xuICAgICAgcmV0dXJuICFtZXRyb0FjY2VwdChcbiAgICAgICAgbW9kdWxlLFxuICAgICAgICAvKmZhY3RvcnkqLyB1bmRlZmluZWQsXG4gICAgICAgIC8qZGVwZW5kZW5jeU1hcCovIHVuZGVmaW5lZCxcbiAgICAgICAgaW52ZXJzZURlcGVuZGVuY2llcyxcbiAgICAgICAgcGF0Y2hlZE1vZHVsZXNcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICB2YXIgcGFyZW50cyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm90QWNjZXB0ZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIGlmIHRoZSBtb2R1bGUgaGFzIG5vIHBhcmVudHMgdGhlbiB0aGUgY2hhbmdlIGNhbm5vdCBiZSBob3QgbG9hZGVkXG4gICAgICBpZiAoaW52ZXJzZURlcGVuZGVuY2llc1tub3RBY2NlcHRlZFtpXV0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcGFyZW50cy5wdXNoLmFwcGx5KHBhcmVudHMsIGludmVyc2VEZXBlbmRlbmNpZXNbbm90QWNjZXB0ZWRbaV1dKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyZW50cy5sZW5ndGggPT0gMDtcbiAgfTtcblxuICB2YXIgbWV0cm9BY2NlcHQgPSBmdW5jdGlvbiBtZXRyb0FjY2VwdChcbiAgICBpZCxcbiAgICBmYWN0b3J5LFxuICAgIGRlcGVuZGVuY3lNYXAsXG4gICAgaW52ZXJzZURlcGVuZGVuY2llc1xuICApIHtcbiAgICB2YXIgcGF0Y2hlZE1vZHVsZXMgPVxuICAgICAgYXJndW1lbnRzLmxlbmd0aCA+IDQgJiYgYXJndW1lbnRzWzRdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNF0gOiB7fTtcblxuICAgIGlmIChpZCBpbiBwYXRjaGVkTW9kdWxlcykge1xuICAgICAgLy8gRG8gbm90IHBhdGNoIHRoZSBzYW1lIG1vZHVsZSBtb3JlIHRoYXQgb25jZSBkdXJpbmcgYW4gdXBkYXRlLlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHBhdGNoZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cbiAgICB2YXIgbW9kID0gbW9kdWxlc1tpZF07XG5cbiAgICBpZiAoIW1vZCAmJiBmYWN0b3J5KSB7XG4gICAgICAvLyBOZXcgbW9kdWxlcyBhcmUgZ29pbmcgdG8gYmUgaGFuZGxlZCBieSB0aGUgZGVmaW5lKCkgbWV0aG9kLlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGhvdCA9IG1vZC5ob3Q7XG5cbiAgICBpZiAoIWhvdCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBcIkNhbm5vdCBhY2NlcHQgbW9kdWxlIGJlY2F1c2UgSG90IE1vZHVsZSBSZXBsYWNlbWVudCBcIiArXG4gICAgICAgICAgXCJBUEkgd2FzIG5vdCBpbnN0YWxsZWQuXCJcbiAgICAgICk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGhvdC5kaXNwb3NlQ2FsbGJhY2spIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGhvdC5kaXNwb3NlQ2FsbGJhY2soKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgXCJFcnJvciB3aGlsZSBjYWxsaW5nIGRpc3Bvc2UgaGFuZGxlciBmb3IgbW9kdWxlIFwiICsgaWQgKyBcIjogXCIsXG4gICAgICAgICAgZXJyb3JcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXBsYWNlIGFuZCBpbml0aWFsaXplIGZhY3RvcnlcbiAgICBpZiAoZmFjdG9yeSkge1xuICAgICAgbW9kLmZhY3RvcnkgPSBmYWN0b3J5O1xuICAgIH1cbiAgICBpZiAoZGVwZW5kZW5jeU1hcCkge1xuICAgICAgbW9kLmRlcGVuZGVuY3lNYXAgPSBkZXBlbmRlbmN5TWFwO1xuICAgIH1cbiAgICBtb2QuaGFzRXJyb3IgPSBmYWxzZTtcbiAgICBtb2QuaXNJbml0aWFsaXplZCA9IGZhbHNlO1xuICAgIG1ldHJvUmVxdWlyZShpZCk7XG5cbiAgICBpZiAoaG90LmFjY2VwdENhbGxiYWNrKSB7XG4gICAgICB0cnkge1xuICAgICAgICBob3QuYWNjZXB0Q2FsbGJhY2soKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIFwiRXJyb3Igd2hpbGUgY2FsbGluZyBhY2NlcHQgaGFuZGxlciBmb3IgbW9kdWxlIFwiICsgaWQgKyBcIjogXCIsXG4gICAgICAgICAgZXJyb3JcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBuZWVkIHRvIGhhdmUgaW52ZXJzZURlcGVuZGVuY2llcyB0byBidWJibGUgdXAgYWNjZXB0XG4gICAgaWYgKCFpbnZlcnNlRGVwZW5kZW5jaWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmRlZmluZWQgYGludmVyc2VEZXBlbmRlbmNpZXNgXCIpO1xuICAgIH1cblxuICAgIC8vIGFjY2VwdCBwYXJlbnQgbW9kdWxlcyByZWN1cnNpdmVseSB1cCB1bnRpbCBhbGwgc2libGluZ3MgYXJlIGFjY2VwdGVkXG4gICAgcmV0dXJuIG1ldHJvQWNjZXB0QWxsKFxuICAgICAgaW52ZXJzZURlcGVuZGVuY2llc1tpZF0sXG4gICAgICBpbnZlcnNlRGVwZW5kZW5jaWVzLFxuICAgICAgcGF0Y2hlZE1vZHVsZXNcbiAgICApO1xuICB9O1xuXG4gIGdsb2JhbC5fX2FjY2VwdCA9IG1ldHJvQWNjZXB0O1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxOC1wcmVzZW50IEZhY2Vib29rLlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKiBAZm9ybWF0XG4gKi9cblxuaW1wb3J0IHR5cGUge1xuICBFbGVtZW50SUQsXG4gIEVsZW1lbnQsXG4gIEVsZW1lbnRTZWFyY2hSZXN1bHRTZXQsXG4gIE1pZGRsZXdhcmVBUEksXG4gIFBsdWdpbkNsaWVudCxcbn0gZnJvbSAnZmxpcHBlcic7XG5cbmltcG9ydCB7XG4gIEZsZXhDb2x1bW4sXG4gIEZsZXhSb3csXG4gIEZsaXBwZXJQbHVnaW4sXG4gIFRvb2xiYXIsXG4gIFNpZGViYXIsXG4gIExpbmssXG4gIEdseXBoLFxuICBEZXRhaWxTaWRlYmFyLFxuICBzdHlsZWQsXG59IGZyb20gJ2ZsaXBwZXInO1xuaW1wb3J0IEluc3BlY3RvciBmcm9tICcuL0luc3BlY3Rvcic7XG5pbXBvcnQgVG9vbGJhckljb24gZnJvbSAnLi9Ub29sYmFySWNvbic7XG5pbXBvcnQgSW5zcGVjdG9yU2lkZWJhciBmcm9tICcuL0luc3BlY3RvclNpZGViYXInO1xuaW1wb3J0IFNlYXJjaCBmcm9tICcuL1NlYXJjaCc7XG5pbXBvcnQgUHJveHlBcmNoaXZlQ2xpZW50IGZyb20gJy4vUHJveHlBcmNoaXZlQ2xpZW50JztcblxudHlwZSBTdGF0ZSA9IHt8XG4gIGluaXQ6IGJvb2xlYW4sXG4gIGluVGFyZ2V0TW9kZTogYm9vbGVhbixcbiAgaW5BWE1vZGU6IGJvb2xlYW4sXG4gIGluQWxpZ25tZW50TW9kZTogYm9vbGVhbixcbiAgc2VsZWN0ZWRFbGVtZW50OiA/RWxlbWVudElELFxuICBzZWxlY3RlZEFYRWxlbWVudDogP0VsZW1lbnRJRCxcbiAgc2VhcmNoUmVzdWx0czogP0VsZW1lbnRTZWFyY2hSZXN1bHRTZXQsXG58fTtcblxuZXhwb3J0IHR5cGUgRWxlbWVudE1hcCA9IHtba2V5OiBFbGVtZW50SURdOiBFbGVtZW50fTtcblxuZXhwb3J0IHR5cGUgUGVyc2lzdGVkU3RhdGUgPSB7fFxuICByb290RWxlbWVudDogP0VsZW1lbnRJRCxcbiAgcm9vdEFYRWxlbWVudDogP0VsZW1lbnRJRCxcbiAgZWxlbWVudHM6IEVsZW1lbnRNYXAsXG4gIEFYZWxlbWVudHM6IEVsZW1lbnRNYXAsXG58fTtcblxuY29uc3QgQmV0YUJhciA9IHN0eWxlZChUb29sYmFyKSh7XG4gIGRpc3BsYXk6ICdibG9jaycsXG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgbGluZUhlaWdodDogJzE1cHgnLFxuICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExheW91dCBleHRlbmRzIEZsaXBwZXJQbHVnaW48U3RhdGUsIHZvaWQsIFBlcnNpc3RlZFN0YXRlPiB7XG4gIHN0YXRpYyBleHBvcnRQZXJzaXN0ZWRTdGF0ZSA9IChcbiAgICBjYWxsQ2xpZW50OiAoc3RyaW5nLCA/T2JqZWN0KSA9PiBQcm9taXNlPE9iamVjdD4sXG4gICAgcGVyc2lzdGVkU3RhdGU6ID9QZXJzaXN0ZWRTdGF0ZSxcbiAgICBzdG9yZTogP01pZGRsZXdhcmVBUEksXG4gICk6IFByb21pc2U8P1BlcnNpc3RlZFN0YXRlPiA9PiB7XG4gICAgY29uc3QgZGVmYXVsdFByb21pc2UgPSBQcm9taXNlLnJlc29sdmUocGVyc2lzdGVkU3RhdGUpO1xuICAgIGlmICghc3RvcmUpIHtcbiAgICAgIHJldHVybiBkZWZhdWx0UHJvbWlzZTtcbiAgICB9XG4gICAgcmV0dXJuIGNhbGxDbGllbnQoJ2dldEFsbE5vZGVzJykudGhlbigoe2FsbE5vZGVzfSkgPT4gYWxsTm9kZXMpO1xuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UGVyc2lzdGVkU3RhdGUgPSB7XG4gICAgcm9vdEVsZW1lbnQ6IG51bGwsXG4gICAgcm9vdEFYRWxlbWVudDogbnVsbCxcbiAgICBlbGVtZW50czoge30sXG4gICAgQVhlbGVtZW50czoge30sXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgaW5pdDogZmFsc2UsXG4gICAgaW5UYXJnZXRNb2RlOiBmYWxzZSxcbiAgICBpbkFYTW9kZTogZmFsc2UsXG4gICAgaW5BbGlnbm1lbnRNb2RlOiBmYWxzZSxcbiAgICBzZWxlY3RlZEVsZW1lbnQ6IG51bGwsXG4gICAgc2VsZWN0ZWRBWEVsZW1lbnQ6IG51bGwsXG4gICAgc2VhcmNoUmVzdWx0czogbnVsbCxcbiAgfTtcblxuICBpbml0KCkge1xuICAgIGlmICghdGhpcy5wcm9wcy5wZXJzaXN0ZWRTdGF0ZSkge1xuICAgICAgLy8gSWYgdGhlIHNlbGVjdGVkIHBsdWdpbiBmcm9tIHRoZSBwcmV2aW91cyBzZXNzaW9uIHdhcyBsYXlvdXQsIHRoZW4gd2hpbGUgaW1wb3J0aW5nIHRoZSBmbGlwcGVyIHRyYWNlLCB0aGUgcmVkdXggc3RvcmUgZG9lc24ndCBnZXQgdXBkYXRlZCBpbiB0aGUgZmlyc3QgcmVuZGVyLCBkdWUgdG8gd2hpY2ggdGhlIHBsdWdpbiBjcmFzaGVzLCBhcyBpdCBoYXMgbm8gcGVyc2lzdGVkIHN0YXRlXG4gICAgICB0aGlzLnByb3BzLnNldFBlcnNpc3RlZFN0YXRlKHRoaXMuY29uc3RydWN0b3IuZGVmYXVsdFBlcnNpc3RlZFN0YXRlKTtcbiAgICB9XG4gICAgLy8gcGVyc2lzdCBzZWFyY2hBY3RpdmUgc3RhdGUgd2hlbiBtb3ZpbmcgYmV0d2VlbiBwbHVnaW5zIHRvIHByZXZlbnQgbXVsdGlwbGVcbiAgICAvLyBUb3VjaE92ZXJsYXlWaWV3cyBzaW5jZSB3ZSBjYW4ndCBlZGl0IHRoZSB2aWV3IGhlaXJhcmNoeSBpbiBvbkRpc2Nvbm5lY3RcbiAgICB0aGlzLmNsaWVudC5jYWxsKCdpc1NlYXJjaEFjdGl2ZScpLnRoZW4oKHtpc1NlYXJjaEFjdGl2ZX0pID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2luVGFyZ2V0TW9kZTogaXNTZWFyY2hBY3RpdmV9KTtcbiAgICB9KTtcblxuICAgIC8vIGRpc2FibGUgdGFyZ2V0IG1vZGUgYWZ0ZXJcbiAgICB0aGlzLmNsaWVudC5zdWJzY3JpYmUoJ3NlbGVjdCcsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnN0YXRlLmluVGFyZ2V0TW9kZSkge1xuICAgICAgICB0aGlzLm9uVG9nZ2xlVGFyZ2V0TW9kZSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7aW5pdDogdHJ1ZX0pO1xuICB9XG5cbiAgb25Ub2dnbGVUYXJnZXRNb2RlID0gKCkgPT4ge1xuICAgIGNvbnN0IGluVGFyZ2V0TW9kZSA9ICF0aGlzLnN0YXRlLmluVGFyZ2V0TW9kZTtcbiAgICB0aGlzLnNldFN0YXRlKHtpblRhcmdldE1vZGV9KTtcbiAgICB0aGlzLmNsaWVudC5zZW5kKCdzZXRTZWFyY2hBY3RpdmUnLCB7YWN0aXZlOiBpblRhcmdldE1vZGV9KTtcbiAgfTtcblxuICBvblRvZ2dsZUFYTW9kZSA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtpbkFYTW9kZTogIXRoaXMuc3RhdGUuaW5BWE1vZGV9KTtcbiAgfTtcblxuICBnZXRDbGllbnQoKTogUGx1Z2luQ2xpZW50IHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5pc0FyY2hpdmVkRGV2aWNlXG4gICAgICA/IG5ldyBQcm94eUFyY2hpdmVDbGllbnQodGhpcy5wcm9wcy5wZXJzaXN0ZWRTdGF0ZSlcbiAgICAgIDogdGhpcy5jbGllbnQ7XG4gIH1cbiAgb25Ub2dnbGVBbGlnbm1lbnRNb2RlID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkRWxlbWVudCkge1xuICAgICAgdGhpcy5jbGllbnQuc2VuZCgnc2V0SGlnaGxpZ2h0ZWQnLCB7XG4gICAgICAgIGlkOiB0aGlzLnN0YXRlLnNlbGVjdGVkRWxlbWVudCxcbiAgICAgICAgaW5BbGlnbm1lbnRNb2RlOiAhdGhpcy5zdGF0ZS5pbkFsaWdubWVudE1vZGUsXG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7aW5BbGlnbm1lbnRNb2RlOiAhdGhpcy5zdGF0ZS5pbkFsaWdubWVudE1vZGV9KTtcbiAgfTtcblxuICBvbkRhdGFWYWx1ZUNoYW5nZWQgPSAocGF0aDogQXJyYXk8c3RyaW5nPiwgdmFsdWU6IGFueSkgPT4ge1xuICAgIGNvbnN0IGlkID0gdGhpcy5zdGF0ZS5pbkFYTW9kZVxuICAgICAgPyB0aGlzLnN0YXRlLnNlbGVjdGVkQVhFbGVtZW50XG4gICAgICA6IHRoaXMuc3RhdGUuc2VsZWN0ZWRFbGVtZW50O1xuICAgIHRoaXMuY2xpZW50LmNhbGwoJ3NldERhdGEnLCB7XG4gICAgICBpZCxcbiAgICAgIHBhdGgsXG4gICAgICB2YWx1ZSxcbiAgICAgIGF4OiB0aGlzLnN0YXRlLmluQVhNb2RlLFxuICAgIH0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBpbnNwZWN0b3JQcm9wcyA9IHtcbiAgICAgIGNsaWVudDogdGhpcy5nZXRDbGllbnQoKSxcbiAgICAgIGluQWxpZ25tZW50TW9kZTogdGhpcy5zdGF0ZS5pbkFsaWdubWVudE1vZGUsXG4gICAgICBzZWxlY3RlZEVsZW1lbnQ6IHRoaXMuc3RhdGUuc2VsZWN0ZWRFbGVtZW50LFxuICAgICAgc2VsZWN0ZWRBWEVsZW1lbnQ6IHRoaXMuc3RhdGUuc2VsZWN0ZWRBWEVsZW1lbnQsXG4gICAgICBzZXRQZXJzaXN0ZWRTdGF0ZTogdGhpcy5wcm9wcy5zZXRQZXJzaXN0ZWRTdGF0ZSxcbiAgICAgIHBlcnNpc3RlZFN0YXRlOiB0aGlzLnByb3BzLnBlcnNpc3RlZFN0YXRlLFxuICAgICAgb25EYXRhVmFsdWVDaGFuZ2VkOiB0aGlzLm9uRGF0YVZhbHVlQ2hhbmdlZCxcbiAgICAgIHNlYXJjaFJlc3VsdHM6IHRoaXMuc3RhdGUuc2VhcmNoUmVzdWx0cyxcbiAgICB9O1xuXG4gICAgbGV0IGVsZW1lbnQ7XG4gICAgaWYgKHRoaXMuc3RhdGUuaW5BWE1vZGUgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZEFYRWxlbWVudCkge1xuICAgICAgZWxlbWVudCA9IHRoaXMucHJvcHMucGVyc2lzdGVkU3RhdGUuQVhlbGVtZW50c1tcbiAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZEFYRWxlbWVudFxuICAgICAgXTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWRFbGVtZW50KSB7XG4gICAgICBlbGVtZW50ID0gdGhpcy5wcm9wcy5wZXJzaXN0ZWRTdGF0ZS5lbGVtZW50c1t0aGlzLnN0YXRlLnNlbGVjdGVkRWxlbWVudF07XG4gICAgfVxuXG4gICAgY29uc3QgaW5zcGVjdG9yID0gKFxuICAgICAgPEluc3BlY3RvclxuICAgICAgICB7Li4uaW5zcGVjdG9yUHJvcHN9XG4gICAgICAgIG9uU2VsZWN0PXtzZWxlY3RlZEVsZW1lbnQgPT4gdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRFbGVtZW50fSl9XG4gICAgICAgIHNob3dzU2lkZWJhcj17IXRoaXMuc3RhdGUuaW5BWE1vZGV9XG4gICAgICAvPlxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPEZsZXhDb2x1bW4gZ3Jvdz17dHJ1ZX0+XG4gICAgICAgIHt0aGlzLnN0YXRlLmluaXQgJiYgKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICA8VG9vbGJhcj5cbiAgICAgICAgICAgICAgeyF0aGlzLnByb3BzLmlzQXJjaGl2ZWREZXZpY2UgJiYgKFxuICAgICAgICAgICAgICAgIDxUb29sYmFySWNvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vblRvZ2dsZVRhcmdldE1vZGV9XG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIlRvZ2dsZSB0YXJnZXQgbW9kZVwiXG4gICAgICAgICAgICAgICAgICBpY29uPVwidGFyZ2V0XCJcbiAgICAgICAgICAgICAgICAgIGFjdGl2ZT17dGhpcy5zdGF0ZS5pblRhcmdldE1vZGV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAge3RoaXMucmVhbENsaWVudC5xdWVyeS5vcyA9PT0gJ0FuZHJvaWQnICYmIChcbiAgICAgICAgICAgICAgICA8VG9vbGJhckljb25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25Ub2dnbGVBWE1vZGV9XG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIlRvZ2dsZSB0byBzZWUgdGhlIGFjY2Vzc2liaWxpdHkgaGllcmFyY2h5XCJcbiAgICAgICAgICAgICAgICAgIGljb249XCJhY2Nlc3NpYmlsaXR5XCJcbiAgICAgICAgICAgICAgICAgIGFjdGl2ZT17dGhpcy5zdGF0ZS5pbkFYTW9kZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICB7IXRoaXMucHJvcHMuaXNBcmNoaXZlZERldmljZSAmJiAoXG4gICAgICAgICAgICAgICAgPFRvb2xiYXJJY29uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uVG9nZ2xlQWxpZ25tZW50TW9kZX1cbiAgICAgICAgICAgICAgICAgIHRpdGxlPVwiVG9nZ2xlIEFsaWdubWVudE1vZGUgdG8gc2hvdyBhbGlnbm1lbnQgbGluZXNcIlxuICAgICAgICAgICAgICAgICAgaWNvbj1cImJvcmRlcnNcIlxuICAgICAgICAgICAgICAgICAgYWN0aXZlPXt0aGlzLnN0YXRlLmluQWxpZ25tZW50TW9kZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgIDxTZWFyY2hcbiAgICAgICAgICAgICAgICBjbGllbnQ9e3RoaXMuZ2V0Q2xpZW50KCl9XG4gICAgICAgICAgICAgICAgc2V0UGVyc2lzdGVkU3RhdGU9e3RoaXMucHJvcHMuc2V0UGVyc2lzdGVkU3RhdGV9XG4gICAgICAgICAgICAgICAgcGVyc2lzdGVkU3RhdGU9e3RoaXMucHJvcHMucGVyc2lzdGVkU3RhdGV9XG4gICAgICAgICAgICAgICAgb25TZWFyY2hSZXN1bHRzPXtzZWFyY2hSZXN1bHRzID0+XG4gICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWFyY2hSZXN1bHRzfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5BWE1vZGU9e3RoaXMuc3RhdGUuaW5BWE1vZGV9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L1Rvb2xiYXI+XG5cbiAgICAgICAgICAgIDxGbGV4Um93IGdyb3c9e3RydWV9PlxuICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5pbkFYTW9kZSA/IChcbiAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgPFNpZGViYXIgcG9zaXRpb249XCJsZWZ0XCIgbWF4V2lkdGg9e0luZmluaXR5fT5cbiAgICAgICAgICAgICAgICAgICAge2luc3BlY3Rvcn1cbiAgICAgICAgICAgICAgICAgIDwvU2lkZWJhcj5cbiAgICAgICAgICAgICAgICAgIDxJbnNwZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgey4uLmluc3BlY3RvclByb3BzfVxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17c2VsZWN0ZWRBWEVsZW1lbnQgPT5cbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZEFYRWxlbWVudH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2hvd3NTaWRlYmFyPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBheFxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICBpbnNwZWN0b3JcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvRmxleFJvdz5cbiAgICAgICAgICAgIDxEZXRhaWxTaWRlYmFyPlxuICAgICAgICAgICAgICA8SW5zcGVjdG9yU2lkZWJhclxuICAgICAgICAgICAgICAgIGNsaWVudD17dGhpcy5nZXRDbGllbnQoKX1cbiAgICAgICAgICAgICAgICByZWFsQ2xpZW50PXt0aGlzLnJlYWxDbGllbnR9XG4gICAgICAgICAgICAgICAgZWxlbWVudD17ZWxlbWVudH1cbiAgICAgICAgICAgICAgICBvblZhbHVlQ2hhbmdlZD17dGhpcy5vbkRhdGFWYWx1ZUNoYW5nZWR9XG4gICAgICAgICAgICAgICAgbG9nZ2VyPXt0aGlzLnByb3BzLmxvZ2dlcn1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvRGV0YWlsU2lkZWJhcj5cbiAgICAgICAgICA8Lz5cbiAgICAgICAgKX1cbiAgICAgICAgey8qIFRPRE86IFJlbW92ZSB0aGlzIHdoZW4gcm9sbGluZyBvdXQgcHVibGljbHkgKi99XG4gICAgICAgIDxCZXRhQmFyIHBvc2l0aW9uPVwiYm90dG9tXCIgY29tcGFjdD5cbiAgICAgICAgICA8R2x5cGggbmFtZT1cImJldGFcIiBjb2xvcj1cIiM4MTU3QzdcIiAvPlxuICAgICAgICAgICZuYnNwO1xuICAgICAgICAgIDxzdHJvbmc+VmVyc2lvbiAyLjA6PC9zdHJvbmc+Jm5ic3A7IFByb3ZpZGUgZmVlZGJhY2sgYWJvdXQgdGhpcyBwbHVnaW5cbiAgICAgICAgICBpbiBvdXImbmJzcDtcbiAgICAgICAgICA8TGluayBocmVmPVwiaHR0cHM6Ly9mYi53b3JrcGxhY2UuY29tL2dyb3Vwcy8yNDYwMzUzMjI5NDc2NTMvXCI+XG4gICAgICAgICAgICBmZWVkYmFjayBncm91cFxuICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAuXG4gICAgICAgIDwvQmV0YUJhcj5cbiAgICAgIDwvRmxleENvbHVtbj5cbiAgICApO1xuICB9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE4LXByZXNlbnQgRmFjZWJvb2suXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqIEBmb3JtYXRcbiAqL1xuXG5pbXBvcnQgdHlwZSB7XG4gIEVsZW1lbnRJRCxcbiAgRWxlbWVudCxcbiAgUGx1Z2luQ2xpZW50LFxuICBFbGVtZW50U2VhcmNoUmVzdWx0U2V0LFxufSBmcm9tICdmbGlwcGVyJztcbmltcG9ydCB7RWxlbWVudHNJbnNwZWN0b3J9IGZyb20gJ2ZsaXBwZXInO1xuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBkZWJvdW5jZSBmcm9tICdsb2Rhc2guZGVib3VuY2UnO1xuXG5pbXBvcnQgdHlwZSB7UGVyc2lzdGVkU3RhdGV9IGZyb20gJy4vJztcblxudHlwZSBHZXROb2Rlc09wdGlvbnMgPSB7XG4gIGZvcmNlPzogYm9vbGVhbixcbiAgYXg/OiBib29sZWFuLFxuICBmb3JBY2Nlc3NpYmlsaXR5RXZlbnQ/OiBib29sZWFuLFxufTtcblxudHlwZSBQcm9wcyA9IHtcbiAgYXg/OiBib29sZWFuLFxuICBjbGllbnQ6IFBsdWdpbkNsaWVudCxcbiAgc2hvd3NTaWRlYmFyOiBib29sZWFuLFxuICBpbkFsaWdubWVudE1vZGU/OiBib29sZWFuLFxuICBzZWxlY3RlZEVsZW1lbnQ6ID9FbGVtZW50SUQsXG4gIHNlbGVjdGVkQVhFbGVtZW50OiA/RWxlbWVudElELFxuICBvblNlbGVjdDogKGlkczogP0VsZW1lbnRJRCkgPT4gdm9pZCxcbiAgb25EYXRhVmFsdWVDaGFuZ2VkOiAocGF0aDogQXJyYXk8c3RyaW5nPiwgdmFsdWU6IGFueSkgPT4gdm9pZCxcbiAgc2V0UGVyc2lzdGVkU3RhdGU6IChzdGF0ZTogJFNoYXBlPFBlcnNpc3RlZFN0YXRlPikgPT4gdm9pZCxcbiAgcGVyc2lzdGVkU3RhdGU6IFBlcnNpc3RlZFN0YXRlLFxuICBzZWFyY2hSZXN1bHRzOiA/RWxlbWVudFNlYXJjaFJlc3VsdFNldCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluc3BlY3RvciBleHRlbmRzIENvbXBvbmVudDxQcm9wcz4ge1xuICBjYWxsKCkge1xuICAgIHJldHVybiB7XG4gICAgICBHRVRfUk9PVDogdGhpcy5wcm9wcy5heCA/ICdnZXRBWFJvb3QnIDogJ2dldFJvb3QnLFxuICAgICAgSU5WQUxJREFURTogdGhpcy5wcm9wcy5heCA/ICdpbnZhbGlkYXRlQVgnIDogJ2ludmFsaWRhdGUnLFxuICAgICAgR0VUX05PREVTOiB0aGlzLnByb3BzLmF4ID8gJ2dldEFYTm9kZXMnIDogJ2dldE5vZGVzJyxcbiAgICAgIFNFVF9ISUdITElHSFRFRDogJ3NldEhpZ2hsaWdodGVkJyxcbiAgICAgIFNFTEVDVDogdGhpcy5wcm9wcy5heCA/ICdzZWxlY3RBWCcgOiAnc2VsZWN0JyxcbiAgICB9O1xuICB9XG5cbiAgc2VsZWN0ZWQgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuYXhcbiAgICAgID8gdGhpcy5wcm9wcy5zZWxlY3RlZEFYRWxlbWVudFxuICAgICAgOiB0aGlzLnByb3BzLnNlbGVjdGVkRWxlbWVudDtcbiAgfTtcblxuICByb290ID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmF4XG4gICAgICA/IHRoaXMucHJvcHMucGVyc2lzdGVkU3RhdGUucm9vdEFYRWxlbWVudFxuICAgICAgOiB0aGlzLnByb3BzLnBlcnNpc3RlZFN0YXRlLnJvb3RFbGVtZW50O1xuICB9O1xuXG4gIGVsZW1lbnRzID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmF4XG4gICAgICA/IHRoaXMucHJvcHMucGVyc2lzdGVkU3RhdGUuQVhlbGVtZW50c1xuICAgICAgOiB0aGlzLnByb3BzLnBlcnNpc3RlZFN0YXRlLmVsZW1lbnRzO1xuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMucHJvcHMuY2xpZW50LmNhbGwodGhpcy5jYWxsKCkuR0VUX1JPT1QpLnRoZW4oKHJvb3Q6IEVsZW1lbnQpID0+IHtcbiAgICAgIHRoaXMucHJvcHMuc2V0UGVyc2lzdGVkU3RhdGUoe1xuICAgICAgICBbdGhpcy5wcm9wcy5heCA/ICdyb290QVhFbGVtZW50JyA6ICdyb290RWxlbWVudCddOiByb290LmlkLFxuICAgICAgfSk7XG4gICAgICB0aGlzLnVwZGF0ZUVsZW1lbnQocm9vdC5pZCwgey4uLnJvb3QsIGV4cGFuZGVkOiB0cnVlfSk7XG4gICAgICB0aGlzLnBlcmZvcm1Jbml0aWFsRXhwYW5kKHJvb3QpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5wcm9wcy5jbGllbnQuc3Vic2NyaWJlKFxuICAgICAgdGhpcy5jYWxsKCkuSU5WQUxJREFURSxcbiAgICAgICh7XG4gICAgICAgIG5vZGVzLFxuICAgICAgfToge1xuICAgICAgICBub2RlczogQXJyYXk8e2lkOiBFbGVtZW50SUQsIGNoaWxkcmVuOiBBcnJheTxFbGVtZW50SUQ+fT4sXG4gICAgICB9KSA9PiB7XG4gICAgICAgIHRoaXMuZ2V0Tm9kZXMoXG4gICAgICAgICAgbm9kZXNcbiAgICAgICAgICAgIC5tYXAobiA9PiBbbi5pZCwgLi4uKG4uY2hpbGRyZW4gfHwgW10pXSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKGFjYywgY3YpID0+IGFjYy5jb25jYXQoY3YpLCBbXSksXG4gICAgICAgICAge30sXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICk7XG5cbiAgICB0aGlzLnByb3BzLmNsaWVudC5zdWJzY3JpYmUoXG4gICAgICB0aGlzLmNhbGwoKS5TRUxFQ1QsXG4gICAgICAoe3BhdGh9OiB7cGF0aDogQXJyYXk8RWxlbWVudElEPn0pID0+IHtcbiAgICAgICAgdGhpcy5nZXRBbmRFeHBhbmRQYXRoKHBhdGgpO1xuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wczogUHJvcHMpIHtcbiAgICBjb25zdCB7YXgsIHNlbGVjdGVkRWxlbWVudCwgc2VsZWN0ZWRBWEVsZW1lbnR9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChcbiAgICAgIGF4ICYmXG4gICAgICBzZWxlY3RlZEVsZW1lbnQgIT09IHByZXZQcm9wcy5zZWxlY3RlZEVsZW1lbnQgJiZcbiAgICAgIHNlbGVjdGVkRWxlbWVudFxuICAgICkge1xuICAgICAgLy8gc2VsZWN0ZWQgZWxlbWVudCBjaGFuZ2VkLCBmaW5kIGxpbmtlZCBBWCBlbGVtZW50XG4gICAgICBjb25zdCBsaW5rZWRBWE5vZGU6ID9FbGVtZW50SUQgPSB0aGlzLnByb3BzLnBlcnNpc3RlZFN0YXRlLmVsZW1lbnRzW1xuICAgICAgICBzZWxlY3RlZEVsZW1lbnRcbiAgICAgIF0/LmV4dHJhSW5mbz8ubGlua2VkQVhOb2RlO1xuICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdChsaW5rZWRBWE5vZGUpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICAhYXggJiZcbiAgICAgIHNlbGVjdGVkQVhFbGVtZW50ICE9PSBwcmV2UHJvcHMuc2VsZWN0ZWRBWEVsZW1lbnQgJiZcbiAgICAgIHNlbGVjdGVkQVhFbGVtZW50XG4gICAgKSB7XG4gICAgICAvLyBzZWxlY3RlZCBBWCBlbGVtZW50IGNoYW5nZWQsIGZpbmQgbGlua2VkIGVsZW1lbnRcbiAgICAgIC8vICRGbG93Rml4TWUgT2JqZWN0LnZhbHVlcyByZXR1bmVzIG1peGVkIHR5cGVcbiAgICAgIGNvbnN0IGxpbmtlZE5vZGU6ID9FbGVtZW50ID0gT2JqZWN0LnZhbHVlcyhcbiAgICAgICAgdGhpcy5wcm9wcy5wZXJzaXN0ZWRTdGF0ZS5lbGVtZW50cyxcbiAgICAgICAgLy8gJEZsb3dGaXhNZSBpdCdzIGFuIEVsZW1lbnQgbm90IG1peGVkXG4gICAgICApLmZpbmQoKGU6IEVsZW1lbnQpID0+IGUuZXh0cmFJbmZvPy5saW5rZWRBWE5vZGUgPT09IHNlbGVjdGVkQVhFbGVtZW50KTtcbiAgICAgIHRoaXMucHJvcHMub25TZWxlY3QobGlua2VkTm9kZT8uaWQpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUVsZW1lbnQoaWQ6IEVsZW1lbnRJRCwgZGF0YTogT2JqZWN0KSB7XG4gICAgdGhpcy5wcm9wcy5zZXRQZXJzaXN0ZWRTdGF0ZSh7XG4gICAgICBbdGhpcy5wcm9wcy5heCA/ICdBWGVsZW1lbnRzJyA6ICdlbGVtZW50cyddOiB7XG4gICAgICAgIC4uLnRoaXMuZWxlbWVudHMoKSxcbiAgICAgICAgW2lkXToge1xuICAgICAgICAgIC4uLnRoaXMuZWxlbWVudHMoKVtpZF0sXG4gICAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvLyBXaGVuIG9wZW5pbmcgdGhlIGluc3BlY3RvciBmb3IgdGhlIGZpcnN0IHRpbWUsIGV4cGFuZCBhbGwgZWxlbWVudHMgdGhhdFxuICAvLyBjb250YWluIG9ubHkgMSBjaGlsZCByZWN1cnNpdmVseS5cbiAgYXN5bmMgcGVyZm9ybUluaXRpYWxFeHBhbmQoZWxlbWVudDogRWxlbWVudCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghZWxlbWVudC5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgIC8vIGVsZW1lbnQgaGFzIG5vIGNoaWxkcmVuIHNvIHdlJ3JlIGFzIGRlZXAgYXMgd2UgY2FuIGJlXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldENoaWxkcmVuKGVsZW1lbnQuaWQsIHt9KS50aGVuKChlbGVtZW50czogQXJyYXk8RWxlbWVudD4pID0+IHtcbiAgICAgIGlmIChlbGVtZW50LmNoaWxkcmVuLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgIC8vIGVsZW1lbnQgaGFzIHR3byBvciBtb3JlIGNoaWxkcmVuIHNvIHdlIGNhbiBzdG9wIGV4cGFuZGluZ1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5wZXJmb3JtSW5pdGlhbEV4cGFuZCh0aGlzLmVsZW1lbnRzKClbZWxlbWVudC5jaGlsZHJlblswXV0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZ2V0Q2hpbGRyZW4oXG4gICAgaWQ6IEVsZW1lbnRJRCxcbiAgICBvcHRpb25zOiBHZXROb2Rlc09wdGlvbnMsXG4gICk6IFByb21pc2U8QXJyYXk8RWxlbWVudD4+IHtcbiAgICBpZiAoIXRoaXMuZWxlbWVudHMoKVtpZF0pIHtcbiAgICAgIGF3YWl0IHRoaXMuZ2V0Tm9kZXMoW2lkXSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlRWxlbWVudChpZCwge2V4cGFuZGVkOiB0cnVlfSk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZXModGhpcy5lbGVtZW50cygpW2lkXS5jaGlsZHJlbiwgb3B0aW9ucyk7XG4gIH1cblxuICBnZXROb2RlcyhcbiAgICBpZHM6IEFycmF5PEVsZW1lbnRJRD4gPSBbXSxcbiAgICBvcHRpb25zOiBHZXROb2Rlc09wdGlvbnMsXG4gICk6IFByb21pc2U8QXJyYXk8RWxlbWVudD4+IHtcbiAgICBjb25zdCB7Zm9yQWNjZXNzaWJpbGl0eUV2ZW50fSA9IG9wdGlvbnM7XG5cbiAgICBpZiAoaWRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmNsaWVudFxuICAgICAgICAuY2FsbCh0aGlzLmNhbGwoKS5HRVRfTk9ERVMsIHtcbiAgICAgICAgICBpZHMsXG4gICAgICAgICAgZm9yQWNjZXNzaWJpbGl0eUV2ZW50LFxuICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHtlbGVtZW50c30pID0+IHtcbiAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGUgPT4gdGhpcy51cGRhdGVFbGVtZW50KGUuaWQsIGUpKTtcbiAgICAgICAgICByZXR1cm4gZWxlbWVudHM7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFtdKTtcbiAgICB9XG4gIH1cblxuICBnZXRBbmRFeHBhbmRQYXRoKHBhdGg6IEFycmF5PEVsZW1lbnRJRD4pIHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocGF0aC5tYXAoaWQgPT4gdGhpcy5nZXRDaGlsZHJlbihpZCwge30pKSkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLm9uRWxlbWVudFNlbGVjdGVkKHBhdGhbcGF0aC5sZW5ndGggLSAxXSk7XG4gICAgfSk7XG4gIH1cblxuICBvbkVsZW1lbnRTZWxlY3RlZCA9IGRlYm91bmNlKChzZWxlY3RlZEtleTogRWxlbWVudElEKSA9PiB7XG4gICAgdGhpcy5vbkVsZW1lbnRIb3ZlcmVkKHNlbGVjdGVkS2V5KTtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KHNlbGVjdGVkS2V5KTtcbiAgfSk7XG5cbiAgb25FbGVtZW50SG92ZXJlZCA9IGRlYm91bmNlKChrZXk6ID9FbGVtZW50SUQpID0+XG4gICAgdGhpcy5wcm9wcy5jbGllbnQuY2FsbCh0aGlzLmNhbGwoKS5TRVRfSElHSExJR0hURUQsIHtcbiAgICAgIGlkOiBrZXksXG4gICAgICBpc0FsaWdubWVudE1vZGU6IHRoaXMucHJvcHMuaW5BbGlnbm1lbnRNb2RlLFxuICAgIH0pLFxuICApO1xuXG4gIG9uRWxlbWVudEV4cGFuZGVkID0gKGlkOiBFbGVtZW50SUQsIGRlZXA6IGJvb2xlYW4pID0+IHtcbiAgICBjb25zdCBleHBhbmRlZCA9ICF0aGlzLmVsZW1lbnRzKClbaWRdLmV4cGFuZGVkO1xuICAgIHRoaXMudXBkYXRlRWxlbWVudChpZCwge2V4cGFuZGVkfSk7XG4gICAgaWYgKGV4cGFuZGVkKSB7XG4gICAgICB0aGlzLmdldENoaWxkcmVuKGlkLCB7fSkudGhlbihjaGlsZHJlbiA9PiB7XG4gICAgICAgIGlmIChkZWVwKSB7XG4gICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB0aGlzLm9uRWxlbWVudEV4cGFuZGVkKGNoaWxkLmlkLCBkZWVwKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdCgpID8gKFxuICAgICAgPEVsZW1lbnRzSW5zcGVjdG9yXG4gICAgICAgIG9uRWxlbWVudFNlbGVjdGVkPXt0aGlzLm9uRWxlbWVudFNlbGVjdGVkfVxuICAgICAgICBvbkVsZW1lbnRIb3ZlcmVkPXt0aGlzLm9uRWxlbWVudEhvdmVyZWR9XG4gICAgICAgIG9uRWxlbWVudEV4cGFuZGVkPXt0aGlzLm9uRWxlbWVudEV4cGFuZGVkfVxuICAgICAgICBvblZhbHVlQ2hhbmdlZD17dGhpcy5wcm9wcy5vbkRhdGFWYWx1ZUNoYW5nZWR9XG4gICAgICAgIHNlYXJjaFJlc3VsdHM9e3RoaXMucHJvcHMuc2VhcmNoUmVzdWx0c31cbiAgICAgICAgc2VsZWN0ZWQ9e3RoaXMuc2VsZWN0ZWQoKX1cbiAgICAgICAgcm9vdD17dGhpcy5yb290KCl9XG4gICAgICAgIGVsZW1lbnRzPXt0aGlzLmVsZW1lbnRzKCl9XG4gICAgICAvPlxuICAgICkgOiBudWxsO1xuICB9XG59XG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE5BTiA9IDAgLyAwO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltID0gL15cXHMrfFxccyskL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JhZEhleCA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG9jdGFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VJbnQgPSBwYXJzZUludDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4LFxuICAgIG5hdGl2ZU1pbiA9IE1hdGgubWluO1xuXG4vKipcbiAqIEdldHMgdGhlIHRpbWVzdGFtcCBvZiB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IGhhdmUgZWxhcHNlZCBzaW5jZVxuICogdGhlIFVuaXggZXBvY2ggKDEgSmFudWFyeSAxOTcwIDAwOjAwOjAwIFVUQykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IERhdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHRpbWVzdGFtcC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWZlcihmdW5jdGlvbihzdGFtcCkge1xuICogICBjb25zb2xlLmxvZyhfLm5vdygpIC0gc3RhbXApO1xuICogfSwgXy5ub3coKSk7XG4gKiAvLyA9PiBMb2dzIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGl0IHRvb2sgZm9yIHRoZSBkZWZlcnJlZCBpbnZvY2F0aW9uLlxuICovXG52YXIgbm93ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiByb290LkRhdGUubm93KCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBkZWJvdW5jZWQgZnVuY3Rpb24gdGhhdCBkZWxheXMgaW52b2tpbmcgYGZ1bmNgIHVudGlsIGFmdGVyIGB3YWl0YFxuICogbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gd2FzXG4gKiBpbnZva2VkLiBUaGUgZGVib3VuY2VkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYCBtZXRob2QgdG8gY2FuY2VsXG4gKiBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0byBpbW1lZGlhdGVseSBpbnZva2UgdGhlbS5cbiAqIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgIHNob3VsZCBiZSBpbnZva2VkIG9uIHRoZVxuICogbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgIHRpbWVvdXQuIFRoZSBgZnVuY2AgaXMgaW52b2tlZFxuICogd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbi4gU3Vic2VxdWVudFxuICogY2FsbHMgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbiByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2BcbiAqIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8uZGVib3VuY2VgIGFuZCBgXy50aHJvdHRsZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWJvdW5jZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBkZWxheS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPWZhbHNlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhXYWl0XVxuICogIFRoZSBtYXhpbXVtIHRpbWUgYGZ1bmNgIGlzIGFsbG93ZWQgdG8gYmUgZGVsYXllZCBiZWZvcmUgaXQncyBpbnZva2VkLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBkZWJvdW5jZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGNvc3RseSBjYWxjdWxhdGlvbnMgd2hpbGUgdGhlIHdpbmRvdyBzaXplIGlzIGluIGZsdXguXG4gKiBqUXVlcnkod2luZG93KS5vbigncmVzaXplJywgXy5kZWJvdW5jZShjYWxjdWxhdGVMYXlvdXQsIDE1MCkpO1xuICpcbiAqIC8vIEludm9rZSBgc2VuZE1haWxgIHdoZW4gY2xpY2tlZCwgZGVib3VuY2luZyBzdWJzZXF1ZW50IGNhbGxzLlxuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIF8uZGVib3VuY2Uoc2VuZE1haWwsIDMwMCwge1xuICogICAnbGVhZGluZyc6IHRydWUsXG4gKiAgICd0cmFpbGluZyc6IGZhbHNlXG4gKiB9KSk7XG4gKlxuICogLy8gRW5zdXJlIGBiYXRjaExvZ2AgaXMgaW52b2tlZCBvbmNlIGFmdGVyIDEgc2Vjb25kIG9mIGRlYm91bmNlZCBjYWxscy5cbiAqIHZhciBkZWJvdW5jZWQgPSBfLmRlYm91bmNlKGJhdGNoTG9nLCAyNTAsIHsgJ21heFdhaXQnOiAxMDAwIH0pO1xuICogdmFyIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL3N0cmVhbScpO1xuICogalF1ZXJ5KHNvdXJjZSkub24oJ21lc3NhZ2UnLCBkZWJvdW5jZWQpO1xuICpcbiAqIC8vIENhbmNlbCB0aGUgdHJhaWxpbmcgZGVib3VuY2VkIGludm9jYXRpb24uXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCBkZWJvdW5jZWQuY2FuY2VsKTtcbiAqL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgbGFzdEFyZ3MsXG4gICAgICBsYXN0VGhpcyxcbiAgICAgIG1heFdhaXQsXG4gICAgICByZXN1bHQsXG4gICAgICB0aW1lcklkLFxuICAgICAgbGFzdENhbGxUaW1lLFxuICAgICAgbGFzdEludm9rZVRpbWUgPSAwLFxuICAgICAgbGVhZGluZyA9IGZhbHNlLFxuICAgICAgbWF4aW5nID0gZmFsc2UsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgd2FpdCA9IHRvTnVtYmVyKHdhaXQpIHx8IDA7XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAhIW9wdGlvbnMubGVhZGluZztcbiAgICBtYXhpbmcgPSAnbWF4V2FpdCcgaW4gb3B0aW9ucztcbiAgICBtYXhXYWl0ID0gbWF4aW5nID8gbmF0aXZlTWF4KHRvTnVtYmVyKG9wdGlvbnMubWF4V2FpdCkgfHwgMCwgd2FpdCkgOiBtYXhXYWl0O1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBpbnZva2VGdW5jKHRpbWUpIHtcbiAgICB2YXIgYXJncyA9IGxhc3RBcmdzLFxuICAgICAgICB0aGlzQXJnID0gbGFzdFRoaXM7XG5cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBsZWFkaW5nRWRnZSh0aW1lKSB7XG4gICAgLy8gUmVzZXQgYW55IGBtYXhXYWl0YCB0aW1lci5cbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgLy8gU3RhcnQgdGhlIHRpbWVyIGZvciB0aGUgdHJhaWxpbmcgZWRnZS5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIC8vIEludm9rZSB0aGUgbGVhZGluZyBlZGdlLlxuICAgIHJldHVybiBsZWFkaW5nID8gaW52b2tlRnVuYyh0aW1lKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbWFpbmluZ1dhaXQodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWUsXG4gICAgICAgIHJlc3VsdCA9IHdhaXQgLSB0aW1lU2luY2VMYXN0Q2FsbDtcblxuICAgIHJldHVybiBtYXhpbmcgPyBuYXRpdmVNaW4ocmVzdWx0LCBtYXhXYWl0IC0gdGltZVNpbmNlTGFzdEludm9rZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRJbnZva2UodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWU7XG5cbiAgICAvLyBFaXRoZXIgdGhpcyBpcyB0aGUgZmlyc3QgY2FsbCwgYWN0aXZpdHkgaGFzIHN0b3BwZWQgYW5kIHdlJ3JlIGF0IHRoZVxuICAgIC8vIHRyYWlsaW5nIGVkZ2UsIHRoZSBzeXN0ZW0gdGltZSBoYXMgZ29uZSBiYWNrd2FyZHMgYW5kIHdlJ3JlIHRyZWF0aW5nXG4gICAgLy8gaXQgYXMgdGhlIHRyYWlsaW5nIGVkZ2UsIG9yIHdlJ3ZlIGhpdCB0aGUgYG1heFdhaXRgIGxpbWl0LlxuICAgIHJldHVybiAobGFzdENhbGxUaW1lID09PSB1bmRlZmluZWQgfHwgKHRpbWVTaW5jZUxhc3RDYWxsID49IHdhaXQpIHx8XG4gICAgICAodGltZVNpbmNlTGFzdENhbGwgPCAwKSB8fCAobWF4aW5nICYmIHRpbWVTaW5jZUxhc3RJbnZva2UgPj0gbWF4V2FpdCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGltZXJFeHBpcmVkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCk7XG4gICAgaWYgKHNob3VsZEludm9rZSh0aW1lKSkge1xuICAgICAgcmV0dXJuIHRyYWlsaW5nRWRnZSh0aW1lKTtcbiAgICB9XG4gICAgLy8gUmVzdGFydCB0aGUgdGltZXIuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCByZW1haW5pbmdXYWl0KHRpbWUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYWlsaW5nRWRnZSh0aW1lKSB7XG4gICAgdGltZXJJZCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIE9ubHkgaW52b2tlIGlmIHdlIGhhdmUgYGxhc3RBcmdzYCB3aGljaCBtZWFucyBgZnVuY2AgaGFzIGJlZW5cbiAgICAvLyBkZWJvdW5jZWQgYXQgbGVhc3Qgb25jZS5cbiAgICBpZiAodHJhaWxpbmcgJiYgbGFzdEFyZ3MpIHtcbiAgICAgIHJldHVybiBpbnZva2VGdW5jKHRpbWUpO1xuICAgIH1cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWYgKHRpbWVySWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuICAgIH1cbiAgICBsYXN0SW52b2tlVGltZSA9IDA7XG4gICAgbGFzdEFyZ3MgPSBsYXN0Q2FsbFRpbWUgPSBsYXN0VGhpcyA9IHRpbWVySWQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICByZXR1cm4gdGltZXJJZCA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogdHJhaWxpbmdFZGdlKG5vdygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlYm91bmNlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpLFxuICAgICAgICBpc0ludm9raW5nID0gc2hvdWxkSW52b2tlKHRpbWUpO1xuXG4gICAgbGFzdEFyZ3MgPSBhcmd1bWVudHM7XG4gICAgbGFzdFRoaXMgPSB0aGlzO1xuICAgIGxhc3RDYWxsVGltZSA9IHRpbWU7XG5cbiAgICBpZiAoaXNJbnZva2luZykge1xuICAgICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbGVhZGluZ0VkZ2UobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChtYXhpbmcpIHtcbiAgICAgICAgLy8gSGFuZGxlIGludm9jYXRpb25zIGluIGEgdGlnaHQgbG9vcC5cbiAgICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAgICAgcmV0dXJuIGludm9rZUZ1bmMobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBkZWJvdW5jZWQuY2FuY2VsID0gY2FuY2VsO1xuICBkZWJvdW5jZWQuZmx1c2ggPSBmbHVzaDtcbiAgcmV0dXJuIGRlYm91bmNlZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9OdW1iZXIoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9OdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvTnVtYmVyKEluZmluaXR5KTtcbiAqIC8vID0+IEluZmluaXR5XG4gKlxuICogXy50b051bWJlcignMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIE5BTjtcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgdmFyIG90aGVyID0gdHlwZW9mIHZhbHVlLnZhbHVlT2YgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLnZhbHVlT2YoKSA6IHZhbHVlO1xuICAgIHZhbHVlID0gaXNPYmplY3Qob3RoZXIpID8gKG90aGVyICsgJycpIDogb3RoZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogK3ZhbHVlO1xuICB9XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZVRyaW0sICcnKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVib3VuY2U7XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE4LXByZXNlbnQgRmFjZWJvb2suXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqIEBmb3JtYXRcbiAqL1xuXG5pbXBvcnQge0dseXBoLCBzdHlsZWQsIGNvbG9yc30gZnJvbSAnZmxpcHBlcic7XG5cbnR5cGUgUHJvcHMgPSB7fFxuICB0aXRsZTogc3RyaW5nLFxuICBpY29uOiBzdHJpbmcsXG4gIGFjdGl2ZTogYm9vbGVhbixcbiAgb25DbGljazogKCkgPT4gdm9pZCxcbnx9O1xuXG5jb25zdCBUb29sYmFySWNvbiA9IHN0eWxlZCgnZGl2Jykoe1xuICBtYXJnaW5SaWdodDogOSxcbiAgbWFyZ2luVG9wOiAtMyxcbiAgbWFyZ2luTGVmdDogNCxcbiAgcG9zaXRpb246ICdyZWxhdGl2ZScsIC8vIGZvciBzZXR0aW5ncyBwb3BvdmVyIHBvc2l0aW9uaW5nXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocHJvcHM6IFByb3BzKSB7XG4gIHJldHVybiAoXG4gICAgPFRvb2xiYXJJY29uIG9uQ2xpY2s9e3Byb3BzLm9uQ2xpY2t9IHRpdGxlPXtwcm9wcy50aXRsZX0+XG4gICAgICA8R2x5cGhcbiAgICAgICAgbmFtZT17cHJvcHMuaWNvbn1cbiAgICAgICAgc2l6ZT17MTZ9XG4gICAgICAgIGNvbG9yPXtcbiAgICAgICAgICBwcm9wcy5hY3RpdmVcbiAgICAgICAgICAgID8gY29sb3JzLm1hY09TVGl0bGVCYXJJY29uU2VsZWN0ZWRcbiAgICAgICAgICAgIDogY29sb3JzLm1hY09TVGl0bGVCYXJJY29uQWN0aXZlXG4gICAgICAgIH1cbiAgICAgIC8+XG4gICAgPC9Ub29sYmFySWNvbj5cbiAgKTtcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTgtcHJlc2VudCBGYWNlYm9vay5cbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICogQGZvcm1hdFxuICovXG5cbmltcG9ydCB0eXBlIHtFbGVtZW50fSBmcm9tICdmbGlwcGVyJztcbmltcG9ydCB0eXBlIHtQbHVnaW5DbGllbnR9IGZyb20gJ2ZsaXBwZXInO1xuaW1wb3J0IHR5cGUgQ2xpZW50IGZyb20gJy4uLy4uL0NsaWVudC5qcyc7XG5pbXBvcnQgdHlwZSB7TG9nZ2VyfSBmcm9tICcuLi8uLi9mYi1pbnRlcmZhY2VzL0xvZ2dlci5qcyc7XG5cbmltcG9ydCB7XG4gIEdLLFxuICBNYW5hZ2VkRGF0YUluc3BlY3RvcixcbiAgQ29uc29sZSxcbiAgUGFuZWwsXG4gIEZsZXhDZW50ZXIsXG4gIHN0eWxlZCxcbiAgY29sb3JzLFxuICBTaWRlYmFyRXh0ZW5zaW9ucyxcbn0gZnJvbSAnZmxpcHBlcic7XG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuXG5jb25zdCBkZWVwRXF1YWwgPSByZXF1aXJlKCdkZWVwLWVxdWFsJyk7XG5cbmNvbnN0IE5vRGF0YSA9IHN0eWxlZChGbGV4Q2VudGVyKSh7XG4gIGZvbnRTaXplOiAxOCxcbiAgY29sb3I6IGNvbG9ycy5tYWNPU1RpdGxlQmFySWNvbixcbn0pO1xuXG50eXBlIE9uVmFsdWVDaGFuZ2VkID0gKHBhdGg6IEFycmF5PHN0cmluZz4sIHZhbDogYW55KSA9PiB2b2lkO1xuXG50eXBlIEluc3BlY3RvclNpZGViYXJTZWN0aW9uUHJvcHMgPSB7XG4gIGRhdGE6IGFueSxcbiAgaWQ6IHN0cmluZyxcbiAgb25WYWx1ZUNoYW5nZWQ6ID9PblZhbHVlQ2hhbmdlZCxcbiAgdG9vbHRpcHM/OiBPYmplY3QsXG59O1xuXG5jbGFzcyBJbnNwZWN0b3JTaWRlYmFyU2VjdGlvbiBleHRlbmRzIENvbXBvbmVudDxJbnNwZWN0b3JTaWRlYmFyU2VjdGlvblByb3BzPiB7XG4gIHNldFZhbHVlID0gKHBhdGg6IEFycmF5PHN0cmluZz4sIHZhbHVlOiBhbnkpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vblZhbHVlQ2hhbmdlZCkge1xuICAgICAgdGhpcy5wcm9wcy5vblZhbHVlQ2hhbmdlZChbdGhpcy5wcm9wcy5pZCwgLi4ucGF0aF0sIHZhbHVlKTtcbiAgICB9XG4gIH07XG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wczogSW5zcGVjdG9yU2lkZWJhclNlY3Rpb25Qcm9wcykge1xuICAgIHJldHVybiAoXG4gICAgICAhZGVlcEVxdWFsKG5leHRQcm9wcywgdGhpcy5wcm9wcykgfHxcbiAgICAgIHRoaXMucHJvcHMuaWQgIT09IG5leHRQcm9wcy5pZCB8fFxuICAgICAgdGhpcy5wcm9wcy5vblZhbHVlQ2hhbmdlZCAhPT0gbmV4dFByb3BzLm9uVmFsdWVDaGFuZ2VkXG4gICAgKTtcbiAgfVxuXG4gIGV4dHJhY3RWYWx1ZSA9ICh2YWw6IGFueSwgZGVwdGg6IG51bWJlcikgPT4ge1xuICAgIGlmICh2YWwgJiYgdmFsLl9fdHlwZV9fKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtdXRhYmxlOiBCb29sZWFuKHZhbC5fX211dGFibGVfXyksXG4gICAgICAgIHR5cGU6IHZhbC5fX3R5cGVfXyA9PT0gJ2F1dG8nID8gdHlwZW9mIHZhbC52YWx1ZSA6IHZhbC5fX3R5cGVfXyxcbiAgICAgICAgdmFsdWU6IHZhbC52YWx1ZSxcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG11dGFibGU6IHR5cGVvZiB2YWwgPT09ICdvYmplY3QnLFxuICAgICAgICB0eXBlOiB0eXBlb2YgdmFsLFxuICAgICAgICB2YWx1ZTogdmFsLFxuICAgICAgfTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtpZH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8UGFuZWwgaGVhZGluZz17aWR9IGZsb2F0aW5nPXtmYWxzZX0gZ3Jvdz17ZmFsc2V9PlxuICAgICAgICA8TWFuYWdlZERhdGFJbnNwZWN0b3JcbiAgICAgICAgICBkYXRhPXt0aGlzLnByb3BzLmRhdGF9XG4gICAgICAgICAgc2V0VmFsdWU9e3RoaXMucHJvcHMub25WYWx1ZUNoYW5nZWQgPyB0aGlzLnNldFZhbHVlIDogdW5kZWZpbmVkfVxuICAgICAgICAgIGV4dHJhY3RWYWx1ZT17dGhpcy5leHRyYWN0VmFsdWV9XG4gICAgICAgICAgZXhwYW5kUm9vdD17dHJ1ZX1cbiAgICAgICAgICBjb2xsYXBzZWQ9e3RydWV9XG4gICAgICAgICAgdG9vbHRpcHM9e3RoaXMucHJvcHMudG9vbHRpcHN9XG4gICAgICAgIC8+XG4gICAgICA8L1BhbmVsPlxuICAgICk7XG4gIH1cbn1cblxudHlwZSBQcm9wcyA9IHt8XG4gIGVsZW1lbnQ6ID9FbGVtZW50LFxuICB0b29sdGlwcz86IE9iamVjdCxcbiAgb25WYWx1ZUNoYW5nZWQ6ID9PblZhbHVlQ2hhbmdlZCxcbiAgY2xpZW50OiBQbHVnaW5DbGllbnQsXG4gIHJlYWxDbGllbnQ6IENsaWVudCxcbiAgbG9nZ2VyOiBMb2dnZXIsXG58fTtcblxudHlwZSBTdGF0ZSA9IHt8XG4gIGlzQ29uc29sZUVuYWJsZWQ6IGJvb2xlYW4sXG58fTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2lkZWJhciBleHRlbmRzIENvbXBvbmVudDxQcm9wcywgU3RhdGU+IHtcbiAgc3RhdGUgPSB7XG4gICAgaXNDb25zb2xlRW5hYmxlZDogZmFsc2UsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHM6IFByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuY2hlY2tJZkNvbnNvbGVJc0VuYWJsZWQoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHM6IFByb3BzLCBwcmV2U3RhdGU6IFN0YXRlKSB7XG4gICAgaWYgKHByZXZQcm9wcy5jbGllbnQgIT09IHRoaXMucHJvcHMuY2xpZW50KSB7XG4gICAgICB0aGlzLmNoZWNrSWZDb25zb2xlSXNFbmFibGVkKCk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tJZkNvbnNvbGVJc0VuYWJsZWQoKSB7XG4gICAgdGhpcy5wcm9wcy5jbGllbnRcbiAgICAgIC5jYWxsKCdpc0NvbnNvbGVFbmFibGVkJylcbiAgICAgIC50aGVuKChyZXN1bHQ6IHtpc0VuYWJsZWQ6IGJvb2xlYW59KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzQ29uc29sZUVuYWJsZWQ6IHJlc3VsdC5pc0VuYWJsZWR9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtlbGVtZW50fSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFlbGVtZW50IHx8ICFlbGVtZW50LmRhdGEpIHtcbiAgICAgIHJldHVybiA8Tm9EYXRhIGdyb3c+Tm8gZGF0YTwvTm9EYXRhPjtcbiAgICB9XG5cbiAgICBjb25zdCBzZWN0aW9uczogQXJyYXk8YW55PiA9XG4gICAgICAoU2lkZWJhckV4dGVuc2lvbnMgJiZcbiAgICAgICAgU2lkZWJhckV4dGVuc2lvbnMubWFwKGV4dCA9PlxuICAgICAgICAgIGV4dChcbiAgICAgICAgICAgIHRoaXMucHJvcHMuY2xpZW50LFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5yZWFsQ2xpZW50LFxuICAgICAgICAgICAgZWxlbWVudC5pZCxcbiAgICAgICAgICAgIHRoaXMucHJvcHMubG9nZ2VyLFxuICAgICAgICAgICksXG4gICAgICAgICkpIHx8XG4gICAgICBbXTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIGVsZW1lbnQuZGF0YSkge1xuICAgICAgaWYgKGtleSA9PT0gJ0V4dHJhIFNlY3Rpb25zJykge1xuICAgICAgICBmb3IgKGNvbnN0IGV4dHJhU2VjdGlvbiBpbiBlbGVtZW50LmRhdGFba2V5XSkge1xuICAgICAgICAgIGxldCBkYXRhID0gZWxlbWVudC5kYXRhW2tleV1bZXh0cmFTZWN0aW9uXTtcblxuICAgICAgICAgIC8vIGRhdGEgbWlnaHQgYmUgc2VudCBhcyBzdHJpbmdpZmllZCBKU09OLCB3ZSB3YW50IHRvIHBhcnNlIGl0IGZvciBhIG5pY2VyIHBlcnNlbnRhdGlvbi5cbiAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgLy8gZGF0YSB3YXMgbm90IGEgdmFsaWQgSlNPTiwgdHlwZSBpcyByZXF1aXJlZCB0byBiZSBhbiBvYmplY3RcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICBgRWxlbWVudHNJbnNwZWN0b3IgdW5hYmxlIHRvIHBhcnNlIGV4dHJhIHNlY3Rpb246ICR7ZXh0cmFTZWN0aW9ufWAsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGRhdGEgPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgc2VjdGlvbnMucHVzaChcbiAgICAgICAgICAgIDxJbnNwZWN0b3JTaWRlYmFyU2VjdGlvblxuICAgICAgICAgICAgICB0b29sdGlwcz17dGhpcy5wcm9wcy50b29sdGlwc31cbiAgICAgICAgICAgICAga2V5PXtleHRyYVNlY3Rpb259XG4gICAgICAgICAgICAgIGlkPXtleHRyYVNlY3Rpb259XG4gICAgICAgICAgICAgIGRhdGE9e2RhdGF9XG4gICAgICAgICAgICAgIG9uVmFsdWVDaGFuZ2VkPXt0aGlzLnByb3BzLm9uVmFsdWVDaGFuZ2VkfVxuICAgICAgICAgICAgLz4sXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VjdGlvbnMucHVzaChcbiAgICAgICAgICA8SW5zcGVjdG9yU2lkZWJhclNlY3Rpb25cbiAgICAgICAgICAgIHRvb2x0aXBzPXt0aGlzLnByb3BzLnRvb2x0aXBzfVxuICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICBpZD17a2V5fVxuICAgICAgICAgICAgZGF0YT17ZWxlbWVudC5kYXRhW2tleV19XG4gICAgICAgICAgICBvblZhbHVlQ2hhbmdlZD17dGhpcy5wcm9wcy5vblZhbHVlQ2hhbmdlZH1cbiAgICAgICAgICAvPixcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoR0suZ2V0KCdzb25hcl9zaG93X2NvbnNvbGVfcGx1Z2luJykgJiYgdGhpcy5zdGF0ZS5pc0NvbnNvbGVFbmFibGVkKSB7XG4gICAgICBzZWN0aW9ucy5wdXNoKFxuICAgICAgICA8UGFuZWwgaGVhZGluZz1cIkpTIENvbnNvbGVcIiBmbG9hdGluZz17ZmFsc2V9IGdyb3c9e2ZhbHNlfT5cbiAgICAgICAgICA8Q29uc29sZSBjbGllbnQ9e3RoaXMucHJvcHMuY2xpZW50fSBnZXRDb250ZXh0PXsoKSA9PiBlbGVtZW50LmlkfSAvPlxuICAgICAgICA8L1BhbmVsPixcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBzZWN0aW9ucztcbiAgfVxufVxuIiwidmFyIHBTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi9saWIva2V5cy5qcycpO1xudmFyIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9saWIvaXNfYXJndW1lbnRzLmpzJyk7XG5cbnZhciBkZWVwRXF1YWwgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhY3R1YWwsIGV4cGVjdGVkLCBvcHRzKSB7XG4gIGlmICghb3B0cykgb3B0cyA9IHt9O1xuICAvLyA3LjEuIEFsbCBpZGVudGljYWwgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBhcyBkZXRlcm1pbmVkIGJ5ID09PS5cbiAgaWYgKGFjdHVhbCA9PT0gZXhwZWN0ZWQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcblxuICB9IGVsc2UgaWYgKGFjdHVhbCBpbnN0YW5jZW9mIERhdGUgJiYgZXhwZWN0ZWQgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIGFjdHVhbC5nZXRUaW1lKCkgPT09IGV4cGVjdGVkLmdldFRpbWUoKTtcblxuICAvLyA3LjMuIE90aGVyIHBhaXJzIHRoYXQgZG8gbm90IGJvdGggcGFzcyB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcsXG4gIC8vIGVxdWl2YWxlbmNlIGlzIGRldGVybWluZWQgYnkgPT0uXG4gIH0gZWxzZSBpZiAoIWFjdHVhbCB8fCAhZXhwZWN0ZWQgfHwgdHlwZW9mIGFjdHVhbCAhPSAnb2JqZWN0JyAmJiB0eXBlb2YgZXhwZWN0ZWQgIT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gb3B0cy5zdHJpY3QgPyBhY3R1YWwgPT09IGV4cGVjdGVkIDogYWN0dWFsID09IGV4cGVjdGVkO1xuXG4gIC8vIDcuNC4gRm9yIGFsbCBvdGhlciBPYmplY3QgcGFpcnMsIGluY2x1ZGluZyBBcnJheSBvYmplY3RzLCBlcXVpdmFsZW5jZSBpc1xuICAvLyBkZXRlcm1pbmVkIGJ5IGhhdmluZyB0aGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgcHJvcGVydGllcyAoYXMgdmVyaWZpZWRcbiAgLy8gd2l0aCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwpLCB0aGUgc2FtZSBzZXQgb2Yga2V5c1xuICAvLyAoYWx0aG91Z2ggbm90IG5lY2Vzc2FyaWx5IHRoZSBzYW1lIG9yZGVyKSwgZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5XG4gIC8vIGNvcnJlc3BvbmRpbmcga2V5LCBhbmQgYW4gaWRlbnRpY2FsICdwcm90b3R5cGUnIHByb3BlcnR5LiBOb3RlOiB0aGlzXG4gIC8vIGFjY291bnRzIGZvciBib3RoIG5hbWVkIGFuZCBpbmRleGVkIHByb3BlcnRpZXMgb24gQXJyYXlzLlxuICB9IGVsc2Uge1xuICAgIHJldHVybiBvYmpFcXVpdihhY3R1YWwsIGV4cGVjdGVkLCBvcHRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZE9yTnVsbCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaXNCdWZmZXIgKHgpIHtcbiAgaWYgKCF4IHx8IHR5cGVvZiB4ICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgeC5sZW5ndGggIT09ICdudW1iZXInKSByZXR1cm4gZmFsc2U7XG4gIGlmICh0eXBlb2YgeC5jb3B5ICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiB4LnNsaWNlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh4Lmxlbmd0aCA+IDAgJiYgdHlwZW9mIHhbMF0gIT09ICdudW1iZXInKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBvYmpFcXVpdihhLCBiLCBvcHRzKSB7XG4gIHZhciBpLCBrZXk7XG4gIGlmIChpc1VuZGVmaW5lZE9yTnVsbChhKSB8fCBpc1VuZGVmaW5lZE9yTnVsbChiKSlcbiAgICByZXR1cm4gZmFsc2U7XG4gIC8vIGFuIGlkZW50aWNhbCAncHJvdG90eXBlJyBwcm9wZXJ0eS5cbiAgaWYgKGEucHJvdG90eXBlICE9PSBiLnByb3RvdHlwZSkgcmV0dXJuIGZhbHNlO1xuICAvL35+fkkndmUgbWFuYWdlZCB0byBicmVhayBPYmplY3Qua2V5cyB0aHJvdWdoIHNjcmV3eSBhcmd1bWVudHMgcGFzc2luZy5cbiAgLy8gICBDb252ZXJ0aW5nIHRvIGFycmF5IHNvbHZlcyB0aGUgcHJvYmxlbS5cbiAgaWYgKGlzQXJndW1lbnRzKGEpKSB7XG4gICAgaWYgKCFpc0FyZ3VtZW50cyhiKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBhID0gcFNsaWNlLmNhbGwoYSk7XG4gICAgYiA9IHBTbGljZS5jYWxsKGIpO1xuICAgIHJldHVybiBkZWVwRXF1YWwoYSwgYiwgb3B0cyk7XG4gIH1cbiAgaWYgKGlzQnVmZmVyKGEpKSB7XG4gICAgaWYgKCFpc0J1ZmZlcihiKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgZm9yIChpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhW2ldICE9PSBiW2ldKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHRyeSB7XG4gICAgdmFyIGthID0gb2JqZWN0S2V5cyhhKSxcbiAgICAgICAga2IgPSBvYmplY3RLZXlzKGIpO1xuICB9IGNhdGNoIChlKSB7Ly9oYXBwZW5zIHdoZW4gb25lIGlzIGEgc3RyaW5nIGxpdGVyYWwgYW5kIHRoZSBvdGhlciBpc24ndFxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBoYXZpbmcgdGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIHByb3BlcnRpZXMgKGtleXMgaW5jb3Jwb3JhdGVzXG4gIC8vIGhhc093blByb3BlcnR5KVxuICBpZiAoa2EubGVuZ3RoICE9IGtiLmxlbmd0aClcbiAgICByZXR1cm4gZmFsc2U7XG4gIC8vdGhlIHNhbWUgc2V0IG9mIGtleXMgKGFsdGhvdWdoIG5vdCBuZWNlc3NhcmlseSB0aGUgc2FtZSBvcmRlciksXG4gIGthLnNvcnQoKTtcbiAga2Iuc29ydCgpO1xuICAvL35+fmNoZWFwIGtleSB0ZXN0XG4gIGZvciAoaSA9IGthLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYgKGthW2ldICE9IGtiW2ldKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5IGNvcnJlc3BvbmRpbmcga2V5LCBhbmRcbiAgLy9+fn5wb3NzaWJseSBleHBlbnNpdmUgZGVlcCB0ZXN0XG4gIGZvciAoaSA9IGthLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAga2V5ID0ga2FbaV07XG4gICAgaWYgKCFkZWVwRXF1YWwoYVtrZXldLCBiW2tleV0sIG9wdHMpKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHR5cGVvZiBhID09PSB0eXBlb2YgYjtcbn1cbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBPYmplY3Qua2V5cyA9PT0gJ2Z1bmN0aW9uJ1xuICA/IE9iamVjdC5rZXlzIDogc2hpbTtcblxuZXhwb3J0cy5zaGltID0gc2hpbTtcbmZ1bmN0aW9uIHNoaW0gKG9iaikge1xuICB2YXIga2V5cyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSBrZXlzLnB1c2goa2V5KTtcbiAgcmV0dXJuIGtleXM7XG59XG4iLCJ2YXIgc3VwcG9ydHNBcmd1bWVudHNDbGFzcyA9IChmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50cylcbn0pKCkgPT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHN1cHBvcnRzQXJndW1lbnRzQ2xhc3MgPyBzdXBwb3J0ZWQgOiB1bnN1cHBvcnRlZDtcblxuZXhwb3J0cy5zdXBwb3J0ZWQgPSBzdXBwb3J0ZWQ7XG5mdW5jdGlvbiBzdXBwb3J0ZWQob2JqZWN0KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PSAnW29iamVjdCBBcmd1bWVudHNdJztcbn07XG5cbmV4cG9ydHMudW5zdXBwb3J0ZWQgPSB1bnN1cHBvcnRlZDtcbmZ1bmN0aW9uIHVuc3VwcG9ydGVkKG9iamVjdCl7XG4gIHJldHVybiBvYmplY3QgJiZcbiAgICB0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnICYmXG4gICAgdHlwZW9mIG9iamVjdC5sZW5ndGggPT0gJ251bWJlcicgJiZcbiAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCAnY2FsbGVlJykgJiZcbiAgICAhT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKG9iamVjdCwgJ2NhbGxlZScpIHx8XG4gICAgZmFsc2U7XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxOC1wcmVzZW50IEZhY2Vib29rLlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKiBAZm9ybWF0XG4gKi9cblxuaW1wb3J0IHR5cGUge1BsdWdpbkNsaWVudCwgRWxlbWVudFNlYXJjaFJlc3VsdFNldCwgRWxlbWVudH0gZnJvbSAnZmxpcHBlcic7XG5pbXBvcnQgdHlwZSB7UGVyc2lzdGVkU3RhdGUsIEVsZW1lbnRNYXB9IGZyb20gJy4vJztcblxuaW1wb3J0IHtcbiAgU2VhcmNoSW5wdXQsXG4gIFNlYXJjaEJveCxcbiAgU2VhcmNoSWNvbixcbiAgTG9hZGluZ0luZGljYXRvcixcbiAgc3R5bGVkLFxuICBjb2xvcnMsXG59IGZyb20gJ2ZsaXBwZXInO1xuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IHR5cGUgU2VhcmNoUmVzdWx0VHJlZSA9IHt8XG4gIGlkOiBzdHJpbmcsXG4gIGlzTWF0Y2g6IGJvb2xlYW4sXG4gIGhhc0NoaWxkcmVuOiBib29sZWFuLFxuICBjaGlsZHJlbjogP0FycmF5PFNlYXJjaFJlc3VsdFRyZWU+LFxuICBlbGVtZW50OiBFbGVtZW50LFxuICBheEVsZW1lbnQ6ID9FbGVtZW50LCAvLyBOb3Qgc3VwcG9ydGVkIGluIGlPU1xufH07XG5cbnR5cGUgUHJvcHMgPSB7XG4gIGNsaWVudDogUGx1Z2luQ2xpZW50LFxuICBpbkFYTW9kZTogYm9vbGVhbixcbiAgb25TZWFyY2hSZXN1bHRzOiAoc2VhcmNoUmVzdWx0czogRWxlbWVudFNlYXJjaFJlc3VsdFNldCkgPT4gdm9pZCxcbiAgc2V0UGVyc2lzdGVkU3RhdGU6IChzdGF0ZTogJFNoYXBlPFBlcnNpc3RlZFN0YXRlPikgPT4gdm9pZCxcbiAgcGVyc2lzdGVkU3RhdGU6IFBlcnNpc3RlZFN0YXRlLFxufTtcblxudHlwZSBTdGF0ZSA9IHtcbiAgdmFsdWU6IHN0cmluZyxcbiAgb3V0c3RhbmRpbmdTZWFyY2hRdWVyeTogP3N0cmluZyxcbn07XG5cbmNvbnN0IExvYWRpbmdTcGlubmVyID0gc3R5bGVkKExvYWRpbmdJbmRpY2F0b3IpKHtcbiAgbWFyZ2luUmlnaHQ6IDQsXG4gIG1hcmdpbkxlZnQ6IDMsXG4gIG1hcmdpblRvcDogLTEsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNoIGV4dGVuZHMgQ29tcG9uZW50PFByb3BzLCBTdGF0ZT4ge1xuICBzdGF0ZSA9IHtcbiAgICB2YWx1ZTogJycsXG4gICAgb3V0c3RhbmRpbmdTZWFyY2hRdWVyeTogbnVsbCxcbiAgfTtcblxuICB0aW1lcjogVGltZW91dElEO1xuXG4gIG9uQ2hhbmdlID0gKGU6IFN5bnRoZXRpY0lucHV0RXZlbnQ8PikgPT4ge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgICBjb25zdCB7dmFsdWV9ID0gZS50YXJnZXQ7XG4gICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWV9KTtcbiAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLnBlcmZvcm1TZWFyY2godmFsdWUpLCAyMDApO1xuICB9O1xuXG4gIG9uS2V5RG93biA9IChlOiBTeW50aGV0aWNLZXlib2FyZEV2ZW50PD4pID0+IHtcbiAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgIHRoaXMucGVyZm9ybVNlYXJjaCh0aGlzLnN0YXRlLnZhbHVlKTtcbiAgICB9XG4gIH07XG5cbiAgcGVyZm9ybVNlYXJjaChxdWVyeTogc3RyaW5nKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBvdXRzdGFuZGluZ1NlYXJjaFF1ZXJ5OiBxdWVyeSxcbiAgICB9KTtcblxuICAgIGlmICghcXVlcnkpIHtcbiAgICAgIHRoaXMuZGlzcGxheVNlYXJjaFJlc3VsdHMoXG4gICAgICAgIHtxdWVyeTogJycsIHJlc3VsdHM6IG51bGx9LFxuICAgICAgICB0aGlzLnByb3BzLmluQVhNb2RlLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9wcy5jbGllbnRcbiAgICAgICAgLmNhbGwoJ2dldFNlYXJjaFJlc3VsdHMnLCB7cXVlcnksIGF4RW5hYmxlZDogdGhpcy5wcm9wcy5pbkFYTW9kZX0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+XG4gICAgICAgICAgdGhpcy5kaXNwbGF5U2VhcmNoUmVzdWx0cyhyZXNwb25zZSwgdGhpcy5wcm9wcy5pbkFYTW9kZSksXG4gICAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgZGlzcGxheVNlYXJjaFJlc3VsdHMoXG4gICAge1xuICAgICAgcmVzdWx0cyxcbiAgICAgIHF1ZXJ5LFxuICAgIH06IHtcbiAgICAgIHJlc3VsdHM6ID9TZWFyY2hSZXN1bHRUcmVlLFxuICAgICAgcXVlcnk6IHN0cmluZyxcbiAgICB9LFxuICAgIGF4TW9kZTogYm9vbGVhbixcbiAgKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBvdXRzdGFuZGluZ1NlYXJjaFF1ZXJ5OlxuICAgICAgICBxdWVyeSA9PT0gdGhpcy5zdGF0ZS5vdXRzdGFuZGluZ1NlYXJjaFF1ZXJ5XG4gICAgICAgICAgPyBudWxsXG4gICAgICAgICAgOiB0aGlzLnN0YXRlLm91dHN0YW5kaW5nU2VhcmNoUXVlcnksXG4gICAgfSk7XG5cbiAgICBjb25zdCBzZWFyY2hSZXN1bHRzID0gdGhpcy5nZXRFbGVtZW50c0Zyb21TZWFyY2hSZXN1bHRUcmVlKHJlc3VsdHMpO1xuICAgIGNvbnN0IHNlYXJjaFJlc3VsdElEcyA9IG5ldyBTZXQoc2VhcmNoUmVzdWx0cy5tYXAociA9PiByLmVsZW1lbnQuaWQpKTtcbiAgICBjb25zdCBlbGVtZW50czogRWxlbWVudE1hcCA9IHNlYXJjaFJlc3VsdHMucmVkdWNlKFxuICAgICAgKGFjYzogRWxlbWVudE1hcCwge2VsZW1lbnR9OiBTZWFyY2hSZXN1bHRUcmVlKSA9PiAoe1xuICAgICAgICAuLi5hY2MsXG4gICAgICAgIFtlbGVtZW50LmlkXToge1xuICAgICAgICAgIC4uLmVsZW1lbnQsXG4gICAgICAgICAgLy8gZXhwYW5kIGFsbCBzZWFyY2ggcmVzdWx0cywgdGhhdCB3ZSBoYXZlIGhhdmUgY2hpbGRyZW4gZm9yXG4gICAgICAgICAgZXhwYW5kZWQ6IGVsZW1lbnQuY2hpbGRyZW4uc29tZShjID0+IHNlYXJjaFJlc3VsdElEcy5oYXMoYykpLFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICB0aGlzLnByb3BzLnBlcnNpc3RlZFN0YXRlLmVsZW1lbnRzLFxuICAgICk7XG5cbiAgICBsZXQge0FYZWxlbWVudHN9ID0gdGhpcy5wcm9wcy5wZXJzaXN0ZWRTdGF0ZTtcbiAgICBpZiAoYXhNb2RlKSB7XG4gICAgICBBWGVsZW1lbnRzID0gc2VhcmNoUmVzdWx0cy5yZWR1Y2UoXG4gICAgICAgIChhY2M6IEVsZW1lbnRNYXAsIHtheEVsZW1lbnR9OiBTZWFyY2hSZXN1bHRUcmVlKSA9PiB7XG4gICAgICAgICAgaWYgKCFheEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5hY2MsXG4gICAgICAgICAgICBbYXhFbGVtZW50LmlkXToge1xuICAgICAgICAgICAgICAuLi5heEVsZW1lbnQsXG4gICAgICAgICAgICAgIC8vIGV4cGFuZCBhbGwgc2VhcmNoIHJlc3VsdHMsIHRoYXQgd2UgaGF2ZSBoYXZlIGNoaWxkcmVuIGZvclxuICAgICAgICAgICAgICBleHBhbmRlZDogYXhFbGVtZW50LmNoaWxkcmVuLnNvbWUoYyA9PiBzZWFyY2hSZXN1bHRJRHMuaGFzKGMpKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgdGhpcy5wcm9wcy5wZXJzaXN0ZWRTdGF0ZS5BWGVsZW1lbnRzLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLnNldFBlcnNpc3RlZFN0YXRlKHtlbGVtZW50cywgQVhlbGVtZW50c30pO1xuXG4gICAgdGhpcy5wcm9wcy5vblNlYXJjaFJlc3VsdHMoe1xuICAgICAgbWF0Y2hlczogbmV3IFNldChcbiAgICAgICAgc2VhcmNoUmVzdWx0cy5maWx0ZXIoeCA9PiB4LmlzTWF0Y2gpLm1hcCh4ID0+IHguZWxlbWVudC5pZCksXG4gICAgICApLFxuICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0RWxlbWVudHNGcm9tU2VhcmNoUmVzdWx0VHJlZShcbiAgICB0cmVlOiA/U2VhcmNoUmVzdWx0VHJlZSxcbiAgKTogQXJyYXk8U2VhcmNoUmVzdWx0VHJlZT4ge1xuICAgIGlmICghdHJlZSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBsZXQgZWxlbWVudHMgPSBbXG4gICAgICB7XG4gICAgICAgIGlkOiB0cmVlLmlkLFxuICAgICAgICBpc01hdGNoOiB0cmVlLmlzTWF0Y2gsXG4gICAgICAgIGhhc0NoaWxkcmVuOiBCb29sZWFuKHRyZWUuY2hpbGRyZW4pLFxuICAgICAgICBlbGVtZW50OiB0cmVlLmVsZW1lbnQsXG4gICAgICAgIGF4RWxlbWVudDogdHJlZS5heEVsZW1lbnQsXG4gICAgICB9LFxuICAgIF07XG4gICAgaWYgKHRyZWUuY2hpbGRyZW4pIHtcbiAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgdHJlZS5jaGlsZHJlbikge1xuICAgICAgICBlbGVtZW50cyA9IGVsZW1lbnRzLmNvbmNhdCh0aGlzLmdldEVsZW1lbnRzRnJvbVNlYXJjaFJlc3VsdFRyZWUoY2hpbGQpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnRzO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8U2VhcmNoQm94IHRhYkluZGV4PXstMX0+XG4gICAgICAgIDxTZWFyY2hJY29uXG4gICAgICAgICAgbmFtZT1cIm1hZ25pZnlpbmctZ2xhc3NcIlxuICAgICAgICAgIGNvbG9yPXtjb2xvcnMubWFjT1NUaXRsZUJhckljb259XG4gICAgICAgICAgc2l6ZT17MTZ9XG4gICAgICAgIC8+XG4gICAgICAgIDxTZWFyY2hJbnB1dFxuICAgICAgICAgIHBsYWNlaG9sZGVyPXsnU2VhcmNoJ31cbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgICAgICBvbktleURvd249e3RoaXMub25LZXlEb3dufVxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxuICAgICAgICAvPlxuICAgICAgICB7dGhpcy5zdGF0ZS5vdXRzdGFuZGluZ1NlYXJjaFF1ZXJ5ICYmIDxMb2FkaW5nU3Bpbm5lciBzaXplPXsxNn0gLz59XG4gICAgICA8L1NlYXJjaEJveD5cbiAgICApO1xuICB9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE4LXByZXNlbnQgRmFjZWJvb2suXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqIEBmb3JtYXRcbiAqL1xuXG5pbXBvcnQgdHlwZSB7RWxlbWVudCwgRWxlbWVudElEfSBmcm9tICdmbGlwcGVyJztcbmltcG9ydCB0eXBlIHtQZXJzaXN0ZWRTdGF0ZX0gZnJvbSAnLi9pbmRleCc7XG5pbXBvcnQgdHlwZSB7U2VhcmNoUmVzdWx0VHJlZX0gZnJvbSAnLi9TZWFyY2gnO1xuLy8gJEZsb3dGaXhNZVxuaW1wb3J0IGNsb25lRGVlcCBmcm9tICdsb2Rhc2guY2xvbmVkZWVwJztcblxuY29uc3QgcHJvcHNGb3JQZXJzaXN0ZWRTdGF0ZSA9IChcbiAgQVhNb2RlOiBib29sZWFuLFxuKToge1JPT1Q6IHN0cmluZywgRUxFTUVOVFM6IHN0cmluZywgRUxFTUVOVDogc3RyaW5nfSA9PiB7XG4gIHJldHVybiB7XG4gICAgUk9PVDogQVhNb2RlID8gJ3Jvb3RBWEVsZW1lbnQnIDogJ3Jvb3RFbGVtZW50JyxcbiAgICBFTEVNRU5UUzogQVhNb2RlID8gJ0FYZWxlbWVudHMnIDogJ2VsZW1lbnRzJyxcbiAgICBFTEVNRU5UOiBBWE1vZGUgPyAnYXhFbGVtZW50JyA6ICdlbGVtZW50JyxcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdFNlYXJjaFJlc3VsdFRyZWUoXG4gIG5vZGU6IEVsZW1lbnQsXG4gIGlzTWF0Y2g6IGJvb2xlYW4sXG4gIGNoaWxkcmVuOiBBcnJheTxTZWFyY2hSZXN1bHRUcmVlPixcbiAgQVhNb2RlOiBib29sZWFuLFxuICBBWE5vZGU6ID9FbGVtZW50LFxuKTogU2VhcmNoUmVzdWx0VHJlZSB7XG4gIGxldCBzZWFyY2hSZXN1bHQgPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgaXNNYXRjaCxcbiAgICBoYXNDaGlsZHJlbjogY2hpbGRyZW4ubGVuZ3RoID4gMCxcbiAgICBjaGlsZHJlbjogY2hpbGRyZW4ubGVuZ3RoID4gMCA/IGNoaWxkcmVuIDogbnVsbCxcbiAgICBlbGVtZW50OiBub2RlLFxuICAgIGF4RWxlbWVudDogQVhOb2RlLFxuICB9O1xuICByZXR1cm4gc2VhcmNoUmVzdWx0O1xufVxuXG5mdW5jdGlvbiBpc01hdGNoKGVsZW1lbnQ6IEVsZW1lbnQsIHF1ZXJ5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgY29uc3QgbmFtZU1hdGNoID0gZWxlbWVudC5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnkudG9Mb3dlckNhc2UoKSk7XG4gIHJldHVybiBuYW1lTWF0Y2ggfHwgZWxlbWVudC5pZCA9PT0gcXVlcnk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hOb2RlcyhcbiAgbm9kZTogRWxlbWVudCxcbiAgcXVlcnk6IHN0cmluZyxcbiAgQVhNb2RlOiBib29sZWFuLFxuICBzdGF0ZTogUGVyc2lzdGVkU3RhdGUsXG4pOiA/U2VhcmNoUmVzdWx0VHJlZSB7XG4gIC8vIEV2ZW4gaWYgdGhlIGF4TW9kZSBpcyB0cnVlLCB3ZSB3aWxsIGhhdmUgdG8gc2VhcmNoIHRoZSBub3JtYWwgZWxlbWVudHMgdG9vLlxuICAvLyBUaGUgQVhFZWxlbWVudHMgd2lsbCBhdXRvbWF0aWNhbGx5IHBvcHVsYXRlZCBpbiBjb25zdHJ1Y3RTZWFyY2hSZXN1bHRUcmVlXG4gIGNvbnN0IGVsZW1lbnRzID0gc3RhdGVbcHJvcHNGb3JQZXJzaXN0ZWRTdGF0ZShmYWxzZSkuRUxFTUVOVFNdO1xuICBjb25zdCBjaGlsZHJlbjogQXJyYXk8U2VhcmNoUmVzdWx0VHJlZT4gPSBbXTtcbiAgY29uc3QgbWF0Y2ggPSBpc01hdGNoKG5vZGUsIHF1ZXJ5KTtcblxuICBmb3IgKGNvbnN0IGNoaWxkSUQgb2Ygbm9kZS5jaGlsZHJlbikge1xuICAgIGNvbnN0IGNoaWxkID0gZWxlbWVudHNbY2hpbGRJRF07XG4gICAgY29uc3QgdHJlZSA9IHNlYXJjaE5vZGVzKGNoaWxkLCBxdWVyeSwgQVhNb2RlLCBzdGF0ZSk7XG4gICAgaWYgKHRyZWUpIHtcbiAgICAgIGNoaWxkcmVuLnB1c2godHJlZSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG1hdGNoIHx8IGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gY2xvbmVEZWVwKFxuICAgICAgY29uc3RydWN0U2VhcmNoUmVzdWx0VHJlZShcbiAgICAgICAgbm9kZSxcbiAgICAgICAgbWF0Y2gsXG4gICAgICAgIGNoaWxkcmVuLFxuICAgICAgICBBWE1vZGUsXG4gICAgICAgIEFYTW9kZSA/IHN0YXRlLkFYZWxlbWVudHNbbm9kZS5pZF0gOiBudWxsLFxuICAgICAgKSxcbiAgICApO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5jbGFzcyBQcm94eUFyY2hpdmVDbGllbnQge1xuICBjb25zdHJ1Y3RvcihwZXJzaXN0ZWRTdGF0ZTogUGVyc2lzdGVkU3RhdGUpIHtcbiAgICB0aGlzLnBlcnNpc3RlZFN0YXRlID0gY2xvbmVEZWVwKHBlcnNpc3RlZFN0YXRlKTtcbiAgfVxuICBwZXJzaXN0ZWRTdGF0ZTogUGVyc2lzdGVkU3RhdGU7XG4gIHN1YnNjcmliZShtZXRob2Q6IHN0cmluZywgY2FsbGJhY2s6IChwYXJhbXM6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHN1cHBvcnRzTWV0aG9kKG1ldGhvZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XG4gIH1cblxuICBzZW5kKG1ldGhvZDogc3RyaW5nLCBwYXJhbXM/OiBPYmplY3QpOiB2b2lkIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjYWxsKG1ldGhvZDogc3RyaW5nLCBwYXJhbXM/OiBPYmplY3QpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHBhcmFtYXRlcnMgPSBwYXJhbXM7XG4gICAgc3dpdGNoIChtZXRob2QpIHtcbiAgICAgIGNhc2UgJ2dldFJvb3QnOiB7XG4gICAgICAgIGNvbnN0IHtyb290RWxlbWVudH0gPSB0aGlzLnBlcnNpc3RlZFN0YXRlO1xuICAgICAgICBpZiAoIXJvb3RFbGVtZW50KSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMucGVyc2lzdGVkU3RhdGUuZWxlbWVudHNbcm9vdEVsZW1lbnRdKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ2dldEFYUm9vdCc6IHtcbiAgICAgICAgY29uc3Qge3Jvb3RBWEVsZW1lbnR9ID0gdGhpcy5wZXJzaXN0ZWRTdGF0ZTtcbiAgICAgICAgaWYgKCFyb290QVhFbGVtZW50KSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMucGVyc2lzdGVkU3RhdGUuQVhlbGVtZW50c1tyb290QVhFbGVtZW50XSk7XG4gICAgICB9XG4gICAgICBjYXNlICdnZXROb2Rlcyc6IHtcbiAgICAgICAgaWYgKCFwYXJhbWF0ZXJzKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignQ2FsbGVkIGdldE5vZGVzIHdpdGggbm8gcGFyYW1zJykpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHtpZHN9ID0gcGFyYW1hdGVycztcbiAgICAgICAgY29uc3QgYXJyOiBBcnJheTxFbGVtZW50PiA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpZDogRWxlbWVudElEIG9mIGlkcykge1xuICAgICAgICAgIGFyci5wdXNoKHRoaXMucGVyc2lzdGVkU3RhdGUuZWxlbWVudHNbaWRdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtlbGVtZW50czogYXJyfSk7XG4gICAgICB9XG4gICAgICBjYXNlICdnZXRBWE5vZGVzJzoge1xuICAgICAgICBpZiAoIXBhcmFtYXRlcnMpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdDYWxsZWQgZ2V0QVhOb2RlcyB3aXRoIG5vIHBhcmFtcycpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7aWRzfSA9IHBhcmFtYXRlcnM7XG4gICAgICAgIGNvbnN0IGFycjogQXJyYXk8RWxlbWVudD4gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaWQ6IEVsZW1lbnRJRCBvZiBpZHMpIHtcbiAgICAgICAgICBhcnIucHVzaCh0aGlzLnBlcnNpc3RlZFN0YXRlLkFYZWxlbWVudHNbaWRdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtlbGVtZW50czogYXJyfSk7XG4gICAgICB9XG4gICAgICBjYXNlICdnZXRTZWFyY2hSZXN1bHRzJzoge1xuICAgICAgICBjb25zdCB7cm9vdEVsZW1lbnQsIHJvb3RBWEVsZW1lbnR9ID0gdGhpcy5wZXJzaXN0ZWRTdGF0ZTtcblxuICAgICAgICBpZiAoIXBhcmFtYXRlcnMpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXG4gICAgICAgICAgICBuZXcgRXJyb3IoJ0NhbGxlZCBnZXRTZWFyY2hSZXN1bHRzIHdpdGggbm8gcGFyYW1zJyksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7cXVlcnksIGF4RW5hYmxlZH0gPSBwYXJhbWF0ZXJzO1xuICAgICAgICBpZiAoIXF1ZXJ5KSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFxuICAgICAgICAgICAgbmV3IEVycm9yKCdxdWVyeSBpcyBub3QgcGFzc2VkIGFzIGEgcGFyYW1zIHRvIGdldFNlYXJjaFJlc3VsdHMnKSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGxldCBlbGVtZW50ID0ge307XG4gICAgICAgIGlmIChheEVuYWJsZWQpIHtcbiAgICAgICAgICBpZiAoIXJvb3RBWEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ3Jvb3RBWEVsZW1lbnQgaXMgdW5kZWZpbmVkJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50ID0gdGhpcy5wZXJzaXN0ZWRTdGF0ZS5BWGVsZW1lbnRzW3Jvb3RBWEVsZW1lbnRdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICghcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ3Jvb3RFbGVtZW50IGlzIHVuZGVmaW5lZCcpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudCA9IHRoaXMucGVyc2lzdGVkU3RhdGUuZWxlbWVudHNbcm9vdEVsZW1lbnRdO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG91dHB1dCA9IHNlYXJjaE5vZGVzKFxuICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgcXVlcnksXG4gICAgICAgICAgYXhFbmFibGVkLFxuICAgICAgICAgIHRoaXMucGVyc2lzdGVkU3RhdGUsXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoe3Jlc3VsdHM6IG91dHB1dCwgcXVlcnl9KTtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ2lzQ29uc29sZUVuYWJsZWQnOiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBQcm94eUFyY2hpdmVDbGllbnQ7XG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIHNpemUgdG8gZW5hYmxlIGxhcmdlIGFycmF5IG9wdGltaXphdGlvbnMuICovXG52YXIgTEFSR0VfQVJSQVlfU0laRSA9IDIwMDtcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHByb21pc2VUYWcgPSAnW29iamVjdCBQcm9taXNlXScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBkYXRhVmlld1RhZyA9ICdbb2JqZWN0IERhdGFWaWV3XScsXG4gICAgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJyxcbiAgICBpbnQ4VGFnID0gJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgdWludDhUYWcgPSAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgIHVpbnQzMlRhZyA9ICdbb2JqZWN0IFVpbnQzMkFycmF5XSc7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgIGZsYWdzIGZyb20gdGhlaXIgY29lcmNlZCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlRmxhZ3MgPSAvXFx3KiQvO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgc3VwcG9ydGVkIGJ5IGBfLmNsb25lYC4gKi9cbnZhciBjbG9uZWFibGVUYWdzID0ge307XG5jbG9uZWFibGVUYWdzW2FyZ3NUYWddID0gY2xvbmVhYmxlVGFnc1thcnJheVRhZ10gPVxuY2xvbmVhYmxlVGFnc1thcnJheUJ1ZmZlclRhZ10gPSBjbG9uZWFibGVUYWdzW2RhdGFWaWV3VGFnXSA9XG5jbG9uZWFibGVUYWdzW2Jvb2xUYWddID0gY2xvbmVhYmxlVGFnc1tkYXRlVGFnXSA9XG5jbG9uZWFibGVUYWdzW2Zsb2F0MzJUYWddID0gY2xvbmVhYmxlVGFnc1tmbG9hdDY0VGFnXSA9XG5jbG9uZWFibGVUYWdzW2ludDhUYWddID0gY2xvbmVhYmxlVGFnc1tpbnQxNlRhZ10gPVxuY2xvbmVhYmxlVGFnc1tpbnQzMlRhZ10gPSBjbG9uZWFibGVUYWdzW21hcFRhZ10gPVxuY2xvbmVhYmxlVGFnc1tudW1iZXJUYWddID0gY2xvbmVhYmxlVGFnc1tvYmplY3RUYWddID1cbmNsb25lYWJsZVRhZ3NbcmVnZXhwVGFnXSA9IGNsb25lYWJsZVRhZ3Nbc2V0VGFnXSA9XG5jbG9uZWFibGVUYWdzW3N0cmluZ1RhZ10gPSBjbG9uZWFibGVUYWdzW3N5bWJvbFRhZ10gPVxuY2xvbmVhYmxlVGFnc1t1aW50OFRhZ10gPSBjbG9uZWFibGVUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPVxuY2xvbmVhYmxlVGFnc1t1aW50MTZUYWddID0gY2xvbmVhYmxlVGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbmNsb25lYWJsZVRhZ3NbZXJyb3JUYWddID0gY2xvbmVhYmxlVGFnc1tmdW5jVGFnXSA9XG5jbG9uZWFibGVUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKipcbiAqIEFkZHMgdGhlIGtleS12YWx1ZSBgcGFpcmAgdG8gYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fSBwYWlyIFRoZSBrZXktdmFsdWUgcGFpciB0byBhZGQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBtYXBgLlxuICovXG5mdW5jdGlvbiBhZGRNYXBFbnRyeShtYXAsIHBhaXIpIHtcbiAgLy8gRG9uJ3QgcmV0dXJuIGBtYXAuc2V0YCBiZWNhdXNlIGl0J3Mgbm90IGNoYWluYWJsZSBpbiBJRSAxMS5cbiAgbWFwLnNldChwYWlyWzBdLCBwYWlyWzFdKTtcbiAgcmV0dXJuIG1hcDtcbn1cblxuLyoqXG4gKiBBZGRzIGB2YWx1ZWAgdG8gYHNldGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgVGhlIHNldCB0byBtb2RpZnkuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhZGQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBzZXRgLlxuICovXG5mdW5jdGlvbiBhZGRTZXRFbnRyeShzZXQsIHZhbHVlKSB7XG4gIC8vIERvbid0IHJldHVybiBgc2V0LmFkZGAgYmVjYXVzZSBpdCdzIG5vdCBjaGFpbmFibGUgaW4gSUUgMTEuXG4gIHNldC5hZGQodmFsdWUpO1xuICByZXR1cm4gc2V0O1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5mb3JFYWNoYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlFYWNoKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkgPT09IGZhbHNlKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4vKipcbiAqIEFwcGVuZHMgdGhlIGVsZW1lbnRzIG9mIGB2YWx1ZXNgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIHZhbHVlcyB0byBhcHBlbmQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlQdXNoKGFycmF5LCB2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMubGVuZ3RoLFxuICAgICAgb2Zmc2V0ID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbb2Zmc2V0ICsgaW5kZXhdID0gdmFsdWVzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLnJlZHVjZWAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHsqfSBbYWNjdW11bGF0b3JdIFRoZSBpbml0aWFsIHZhbHVlLlxuICogQHBhcmFtIHtib29sZWFufSBbaW5pdEFjY3VtXSBTcGVjaWZ5IHVzaW5nIHRoZSBmaXJzdCBlbGVtZW50IG9mIGBhcnJheWAgYXNcbiAqICB0aGUgaW5pdGlhbCB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBhY2N1bXVsYXRlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlSZWR1Y2UoYXJyYXksIGl0ZXJhdGVlLCBhY2N1bXVsYXRvciwgaW5pdEFjY3VtKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gIGlmIChpbml0QWNjdW0gJiYgbGVuZ3RoKSB7XG4gICAgYWNjdW11bGF0b3IgPSBhcnJheVsrK2luZGV4XTtcbiAgfVxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFjY3VtdWxhdG9yID0gaXRlcmF0ZWUoYWNjdW11bGF0b3IsIGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgfVxuICByZXR1cm4gYWNjdW11bGF0b3I7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udGltZXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kc1xuICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoaW5kZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGdldFZhbHVlKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QgaW4gSUUgPCA5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNIb3N0T2JqZWN0KHZhbHVlKSB7XG4gIC8vIE1hbnkgaG9zdCBvYmplY3RzIGFyZSBgT2JqZWN0YCBvYmplY3RzIHRoYXQgY2FuIGNvZXJjZSB0byBzdHJpbmdzXG4gIC8vIGRlc3BpdGUgaGF2aW5nIGltcHJvcGVybHkgZGVmaW5lZCBgdG9TdHJpbmdgIG1ldGhvZHMuXG4gIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgaWYgKHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlLnRvU3RyaW5nICE9ICdmdW5jdGlvbicpIHtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gISEodmFsdWUgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBtYXBgIHRvIGl0cyBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBrZXktdmFsdWUgcGFpcnMuXG4gKi9cbmZ1bmN0aW9uIG1hcFRvQXJyYXkobWFwKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobWFwLnNpemUpO1xuXG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSBba2V5LCB2YWx1ZV07XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB1bmFyeSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBmdW5jKHRyYW5zZm9ybShhcmcpKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgc2V0YCB0byBhbiBhcnJheSBvZiBpdHMgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBzZXRUb0FycmF5KHNldCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KHNldC5zaXplKTtcblxuICBzZXQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsXG4gICAgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgQnVmZmVyID0gbW9kdWxlRXhwb3J0cyA/IHJvb3QuQnVmZmVyIDogdW5kZWZpbmVkLFxuICAgIFN5bWJvbCA9IHJvb3QuU3ltYm9sLFxuICAgIFVpbnQ4QXJyYXkgPSByb290LlVpbnQ4QXJyYXksXG4gICAgZ2V0UHJvdG90eXBlID0gb3ZlckFyZyhPYmplY3QuZ2V0UHJvdG90eXBlT2YsIE9iamVjdCksXG4gICAgb2JqZWN0Q3JlYXRlID0gT2JqZWN0LmNyZWF0ZSxcbiAgICBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlLFxuICAgIHNwbGljZSA9IGFycmF5UHJvdG8uc3BsaWNlO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlR2V0U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsXG4gICAgbmF0aXZlSXNCdWZmZXIgPSBCdWZmZXIgPyBCdWZmZXIuaXNCdWZmZXIgOiB1bmRlZmluZWQsXG4gICAgbmF0aXZlS2V5cyA9IG92ZXJBcmcoT2JqZWN0LmtleXMsIE9iamVjdCk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBEYXRhVmlldyA9IGdldE5hdGl2ZShyb290LCAnRGF0YVZpZXcnKSxcbiAgICBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpLFxuICAgIFByb21pc2UgPSBnZXROYXRpdmUocm9vdCwgJ1Byb21pc2UnKSxcbiAgICBTZXQgPSBnZXROYXRpdmUocm9vdCwgJ1NldCcpLFxuICAgIFdlYWtNYXAgPSBnZXROYXRpdmUocm9vdCwgJ1dlYWtNYXAnKSxcbiAgICBuYXRpdmVDcmVhdGUgPSBnZXROYXRpdmUoT2JqZWN0LCAnY3JlYXRlJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtYXBzLCBzZXRzLCBhbmQgd2Vha21hcHMuICovXG52YXIgZGF0YVZpZXdDdG9yU3RyaW5nID0gdG9Tb3VyY2UoRGF0YVZpZXcpLFxuICAgIG1hcEN0b3JTdHJpbmcgPSB0b1NvdXJjZShNYXApLFxuICAgIHByb21pc2VDdG9yU3RyaW5nID0gdG9Tb3VyY2UoUHJvbWlzZSksXG4gICAgc2V0Q3RvclN0cmluZyA9IHRvU291cmNlKFNldCksXG4gICAgd2Vha01hcEN0b3JTdHJpbmcgPSB0b1NvdXJjZShXZWFrTWFwKTtcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFZhbHVlT2YgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnZhbHVlT2YgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGhhc2ggb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBIYXNoKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKi9cbmZ1bmN0aW9uIGhhc2hDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5hdGl2ZUNyZWF0ZSA/IG5hdGl2ZUNyZWF0ZShudWxsKSA6IHt9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge09iamVjdH0gaGFzaCBUaGUgaGFzaCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaERlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIHRoaXMuaGFzKGtleSkgJiYgZGVsZXRlIHRoaXMuX19kYXRhX19ba2V5XTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBoYXNoIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGhhc2hHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKG5hdGl2ZUNyZWF0ZSkge1xuICAgIHZhciByZXN1bHQgPSBkYXRhW2tleV07XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gSEFTSF9VTkRFRklORUQgPyB1bmRlZmluZWQgOiByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSA/IGRhdGFba2V5XSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBoYXNoIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoSGFzKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHJldHVybiBuYXRpdmVDcmVhdGUgPyBkYXRhW2tleV0gIT09IHVuZGVmaW5lZCA6IGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBoYXNoIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaGFzaCBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gaGFzaFNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgZGF0YVtrZXldID0gKG5hdGl2ZUNyZWF0ZSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IEhBU0hfVU5ERUZJTkVEIDogdmFsdWU7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgSGFzaGAuXG5IYXNoLnByb3RvdHlwZS5jbGVhciA9IGhhc2hDbGVhcjtcbkhhc2gucHJvdG90eXBlWydkZWxldGUnXSA9IGhhc2hEZWxldGU7XG5IYXNoLnByb3RvdHlwZS5nZXQgPSBoYXNoR2V0O1xuSGFzaC5wcm90b3R5cGUuaGFzID0gaGFzaEhhcztcbkhhc2gucHJvdG90eXBlLnNldCA9IGhhc2hTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBsaXN0IGNhY2hlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTGlzdENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBbXTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGRhdGEucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgcmV0dXJuIGluZGV4IDwgMCA/IHVuZGVmaW5lZCA6IGRhdGFbaW5kZXhdWzFdO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gYXNzb2NJbmRleE9mKHRoaXMuX19kYXRhX18sIGtleSkgPiAtMTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBsaXN0IGNhY2hlIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBsaXN0IGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICBkYXRhLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhW2luZGV4XVsxXSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTGlzdENhY2hlYC5cbkxpc3RDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBsaXN0Q2FjaGVDbGVhcjtcbkxpc3RDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbGlzdENhY2hlRGVsZXRlO1xuTGlzdENhY2hlLnByb3RvdHlwZS5nZXQgPSBsaXN0Q2FjaGVHZXQ7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmhhcyA9IGxpc3RDYWNoZUhhcztcbkxpc3RDYWNoZS5wcm90b3R5cGUuc2V0ID0gbGlzdENhY2hlU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXAgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTWFwQ2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IHtcbiAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVEZWxldGUoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSlbJ2RlbGV0ZSddKGtleSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbWFwIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUdldChrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5nZXQoa2V5KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBtYXAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBtYXAgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbWFwIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIGdldE1hcERhdGEodGhpcywga2V5KS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTWFwQ2FjaGVgLlxuTWFwQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gbWFwQ2FjaGVDbGVhcjtcbk1hcENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBtYXBDYWNoZURlbGV0ZTtcbk1hcENhY2hlLnByb3RvdHlwZS5nZXQgPSBtYXBDYWNoZUdldDtcbk1hcENhY2hlLnByb3RvdHlwZS5oYXMgPSBtYXBDYWNoZUhhcztcbk1hcENhY2hlLnByb3RvdHlwZS5zZXQgPSBtYXBDYWNoZVNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RhY2sgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU3RhY2soZW50cmllcykge1xuICB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZShlbnRyaWVzKTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBTdGFja1xuICovXG5mdW5jdGlvbiBzdGFja0NsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tEZWxldGUoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fWydkZWxldGUnXShrZXkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHN0YWNrIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBzdGFja0dldChrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uZ2V0KGtleSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgc3RhY2sgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0hhcyhrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgc3RhY2sgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgc3RhY2sgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGNhY2hlID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKGNhY2hlIGluc3RhbmNlb2YgTGlzdENhY2hlKSB7XG4gICAgdmFyIHBhaXJzID0gY2FjaGUuX19kYXRhX187XG4gICAgaWYgKCFNYXAgfHwgKHBhaXJzLmxlbmd0aCA8IExBUkdFX0FSUkFZX1NJWkUgLSAxKSkge1xuICAgICAgcGFpcnMucHVzaChba2V5LCB2YWx1ZV0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNhY2hlID0gdGhpcy5fX2RhdGFfXyA9IG5ldyBNYXBDYWNoZShwYWlycyk7XG4gIH1cbiAgY2FjaGUuc2V0KGtleSwgdmFsdWUpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYFN0YWNrYC5cblN0YWNrLnByb3RvdHlwZS5jbGVhciA9IHN0YWNrQ2xlYXI7XG5TdGFjay5wcm90b3R5cGVbJ2RlbGV0ZSddID0gc3RhY2tEZWxldGU7XG5TdGFjay5wcm90b3R5cGUuZ2V0ID0gc3RhY2tHZXQ7XG5TdGFjay5wcm90b3R5cGUuaGFzID0gc3RhY2tIYXM7XG5TdGFjay5wcm90b3R5cGUuc2V0ID0gc3RhY2tTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiB0aGUgYXJyYXktbGlrZSBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5oZXJpdGVkIFNwZWNpZnkgcmV0dXJuaW5nIGluaGVyaXRlZCBwcm9wZXJ0eSBuYW1lcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TGlrZUtleXModmFsdWUsIGluaGVyaXRlZCkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICAvLyBTYWZhcmkgOSBtYWtlcyBgYXJndW1lbnRzLmxlbmd0aGAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgdmFyIHJlc3VsdCA9IChpc0FycmF5KHZhbHVlKSB8fCBpc0FyZ3VtZW50cyh2YWx1ZSkpXG4gICAgPyBiYXNlVGltZXModmFsdWUubGVuZ3RoLCBTdHJpbmcpXG4gICAgOiBbXTtcblxuICB2YXIgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aCxcbiAgICAgIHNraXBJbmRleGVzID0gISFsZW5ndGg7XG5cbiAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgaWYgKChpbmhlcml0ZWQgfHwgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkgJiZcbiAgICAgICAgIShza2lwSW5kZXhlcyAmJiAoa2V5ID09ICdsZW5ndGgnIHx8IGlzSW5kZXgoa2V5LCBsZW5ndGgpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQXNzaWducyBgdmFsdWVgIHRvIGBrZXlgIG9mIGBvYmplY3RgIGlmIHRoZSBleGlzdGluZyB2YWx1ZSBpcyBub3QgZXF1aXZhbGVudFxuICogdXNpbmcgW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGZvciBlcXVhbGl0eSBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV07XG4gIGlmICghKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGVxKG9ialZhbHVlLCB2YWx1ZSkpIHx8XG4gICAgICAodmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIH1cbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgYGtleWAgaXMgZm91bmQgaW4gYGFycmF5YCBvZiBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKGVxKGFycmF5W2xlbmd0aF1bMF0sIGtleSkpIHtcbiAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5hc3NpZ25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgbXVsdGlwbGUgc291cmNlc1xuICogb3IgYGN1c3RvbWl6ZXJgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VBc3NpZ24ob2JqZWN0LCBzb3VyY2UpIHtcbiAgcmV0dXJuIG9iamVjdCAmJiBjb3B5T2JqZWN0KHNvdXJjZSwga2V5cyhzb3VyY2UpLCBvYmplY3QpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNsb25lYCBhbmQgYF8uY2xvbmVEZWVwYCB3aGljaCB0cmFja3NcbiAqIHRyYXZlcnNlZCBvYmplY3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0Z1bGxdIFNwZWNpZnkgYSBjbG9uZSBpbmNsdWRpbmcgc3ltYm9scy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNsb25pbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2tleV0gVGhlIGtleSBvZiBgdmFsdWVgLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBwYXJlbnQgb2JqZWN0IG9mIGB2YWx1ZWAuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIG9iamVjdHMgYW5kIHRoZWlyIGNsb25lIGNvdW50ZXJwYXJ0cy5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBjbG9uZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VDbG9uZSh2YWx1ZSwgaXNEZWVwLCBpc0Z1bGwsIGN1c3RvbWl6ZXIsIGtleSwgb2JqZWN0LCBzdGFjaykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoY3VzdG9taXplcikge1xuICAgIHJlc3VsdCA9IG9iamVjdCA/IGN1c3RvbWl6ZXIodmFsdWUsIGtleSwgb2JqZWN0LCBzdGFjaykgOiBjdXN0b21pemVyKHZhbHVlKTtcbiAgfVxuICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZhciBpc0FyciA9IGlzQXJyYXkodmFsdWUpO1xuICBpZiAoaXNBcnIpIHtcbiAgICByZXN1bHQgPSBpbml0Q2xvbmVBcnJheSh2YWx1ZSk7XG4gICAgaWYgKCFpc0RlZXApIHtcbiAgICAgIHJldHVybiBjb3B5QXJyYXkodmFsdWUsIHJlc3VsdCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciB0YWcgPSBnZXRUYWcodmFsdWUpLFxuICAgICAgICBpc0Z1bmMgPSB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xuXG4gICAgaWYgKGlzQnVmZmVyKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGNsb25lQnVmZmVyKHZhbHVlLCBpc0RlZXApO1xuICAgIH1cbiAgICBpZiAodGFnID09IG9iamVjdFRhZyB8fCB0YWcgPT0gYXJnc1RhZyB8fCAoaXNGdW5jICYmICFvYmplY3QpKSB7XG4gICAgICBpZiAoaXNIb3N0T2JqZWN0KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gb2JqZWN0ID8gdmFsdWUgOiB7fTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9IGluaXRDbG9uZU9iamVjdChpc0Z1bmMgPyB7fSA6IHZhbHVlKTtcbiAgICAgIGlmICghaXNEZWVwKSB7XG4gICAgICAgIHJldHVybiBjb3B5U3ltYm9scyh2YWx1ZSwgYmFzZUFzc2lnbihyZXN1bHQsIHZhbHVlKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghY2xvbmVhYmxlVGFnc1t0YWddKSB7XG4gICAgICAgIHJldHVybiBvYmplY3QgPyB2YWx1ZSA6IHt9O1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gaW5pdENsb25lQnlUYWcodmFsdWUsIHRhZywgYmFzZUNsb25lLCBpc0RlZXApO1xuICAgIH1cbiAgfVxuICAvLyBDaGVjayBmb3IgY2lyY3VsYXIgcmVmZXJlbmNlcyBhbmQgcmV0dXJuIGl0cyBjb3JyZXNwb25kaW5nIGNsb25lLlxuICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldCh2YWx1ZSk7XG4gIGlmIChzdGFja2VkKSB7XG4gICAgcmV0dXJuIHN0YWNrZWQ7XG4gIH1cbiAgc3RhY2suc2V0KHZhbHVlLCByZXN1bHQpO1xuXG4gIGlmICghaXNBcnIpIHtcbiAgICB2YXIgcHJvcHMgPSBpc0Z1bGwgPyBnZXRBbGxLZXlzKHZhbHVlKSA6IGtleXModmFsdWUpO1xuICB9XG4gIGFycmF5RWFjaChwcm9wcyB8fCB2YWx1ZSwgZnVuY3Rpb24oc3ViVmFsdWUsIGtleSkge1xuICAgIGlmIChwcm9wcykge1xuICAgICAga2V5ID0gc3ViVmFsdWU7XG4gICAgICBzdWJWYWx1ZSA9IHZhbHVlW2tleV07XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IHBvcHVsYXRlIGNsb25lIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgYXNzaWduVmFsdWUocmVzdWx0LCBrZXksIGJhc2VDbG9uZShzdWJWYWx1ZSwgaXNEZWVwLCBpc0Z1bGwsIGN1c3RvbWl6ZXIsIGtleSwgdmFsdWUsIHN0YWNrKSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNyZWF0ZWAgd2l0aG91dCBzdXBwb3J0IGZvciBhc3NpZ25pbmdcbiAqIHByb3BlcnRpZXMgdG8gdGhlIGNyZWF0ZWQgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvdG90eXBlIFRoZSBvYmplY3QgdG8gaW5oZXJpdCBmcm9tLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYmFzZUNyZWF0ZShwcm90bykge1xuICByZXR1cm4gaXNPYmplY3QocHJvdG8pID8gb2JqZWN0Q3JlYXRlKHByb3RvKSA6IHt9O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRBbGxLZXlzYCBhbmQgYGdldEFsbEtleXNJbmAgd2hpY2ggdXNlc1xuICogYGtleXNGdW5jYCBhbmQgYHN5bWJvbHNGdW5jYCB0byBnZXQgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgYW5kXG4gKiBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3ltYm9sc0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRBbGxLZXlzKG9iamVjdCwga2V5c0Z1bmMsIHN5bWJvbHNGdW5jKSB7XG4gIHZhciByZXN1bHQgPSBrZXlzRnVuYyhvYmplY3QpO1xuICByZXR1cm4gaXNBcnJheShvYmplY3QpID8gcmVzdWx0IDogYXJyYXlQdXNoKHJlc3VsdCwgc3ltYm9sc0Z1bmMob2JqZWN0KSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICByZXR1cm4gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IChpc0Z1bmN0aW9uKHZhbHVlKSB8fCBpc0hvc3RPYmplY3QodmFsdWUpKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzKG9iamVjdCkge1xuICBpZiAoIWlzUHJvdG90eXBlKG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5cyhvYmplY3QpO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGtleSAhPSAnY29uc3RydWN0b3InKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiAgYGJ1ZmZlcmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZmZXIgVGhlIGJ1ZmZlciB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7QnVmZmVyfSBSZXR1cm5zIHRoZSBjbG9uZWQgYnVmZmVyLlxuICovXG5mdW5jdGlvbiBjbG9uZUJ1ZmZlcihidWZmZXIsIGlzRGVlcCkge1xuICBpZiAoaXNEZWVwKSB7XG4gICAgcmV0dXJuIGJ1ZmZlci5zbGljZSgpO1xuICB9XG4gIHZhciByZXN1bHQgPSBuZXcgYnVmZmVyLmNvbnN0cnVjdG9yKGJ1ZmZlci5sZW5ndGgpO1xuICBidWZmZXIuY29weShyZXN1bHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgYXJyYXlCdWZmZXJgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBhcnJheUJ1ZmZlciBUaGUgYXJyYXkgYnVmZmVyIHRvIGNsb25lLlxuICogQHJldHVybnMge0FycmF5QnVmZmVyfSBSZXR1cm5zIHRoZSBjbG9uZWQgYXJyYXkgYnVmZmVyLlxuICovXG5mdW5jdGlvbiBjbG9uZUFycmF5QnVmZmVyKGFycmF5QnVmZmVyKSB7XG4gIHZhciByZXN1bHQgPSBuZXcgYXJyYXlCdWZmZXIuY29uc3RydWN0b3IoYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCk7XG4gIG5ldyBVaW50OEFycmF5KHJlc3VsdCkuc2V0KG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyKSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBkYXRhVmlld2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhVmlldyBUaGUgZGF0YSB2aWV3IHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBkYXRhIHZpZXcuXG4gKi9cbmZ1bmN0aW9uIGNsb25lRGF0YVZpZXcoZGF0YVZpZXcsIGlzRGVlcCkge1xuICB2YXIgYnVmZmVyID0gaXNEZWVwID8gY2xvbmVBcnJheUJ1ZmZlcihkYXRhVmlldy5idWZmZXIpIDogZGF0YVZpZXcuYnVmZmVyO1xuICByZXR1cm4gbmV3IGRhdGFWaWV3LmNvbnN0cnVjdG9yKGJ1ZmZlciwgZGF0YVZpZXcuYnl0ZU9mZnNldCwgZGF0YVZpZXcuYnl0ZUxlbmd0aCk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBtYXBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjbG9uZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNsb25lIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgbWFwLlxuICovXG5mdW5jdGlvbiBjbG9uZU1hcChtYXAsIGlzRGVlcCwgY2xvbmVGdW5jKSB7XG4gIHZhciBhcnJheSA9IGlzRGVlcCA/IGNsb25lRnVuYyhtYXBUb0FycmF5KG1hcCksIHRydWUpIDogbWFwVG9BcnJheShtYXApO1xuICByZXR1cm4gYXJyYXlSZWR1Y2UoYXJyYXksIGFkZE1hcEVudHJ5LCBuZXcgbWFwLmNvbnN0cnVjdG9yKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYHJlZ2V4cGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSByZWdleHAgVGhlIHJlZ2V4cCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCByZWdleHAuXG4gKi9cbmZ1bmN0aW9uIGNsb25lUmVnRXhwKHJlZ2V4cCkge1xuICB2YXIgcmVzdWx0ID0gbmV3IHJlZ2V4cC5jb25zdHJ1Y3RvcihyZWdleHAuc291cmNlLCByZUZsYWdzLmV4ZWMocmVnZXhwKSk7XG4gIHJlc3VsdC5sYXN0SW5kZXggPSByZWdleHAubGFzdEluZGV4O1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgc2V0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIGNsb25lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2xvbmVGdW5jIFRoZSBmdW5jdGlvbiB0byBjbG9uZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIHNldC5cbiAqL1xuZnVuY3Rpb24gY2xvbmVTZXQoc2V0LCBpc0RlZXAsIGNsb25lRnVuYykge1xuICB2YXIgYXJyYXkgPSBpc0RlZXAgPyBjbG9uZUZ1bmMoc2V0VG9BcnJheShzZXQpLCB0cnVlKSA6IHNldFRvQXJyYXkoc2V0KTtcbiAgcmV0dXJuIGFycmF5UmVkdWNlKGFycmF5LCBhZGRTZXRFbnRyeSwgbmV3IHNldC5jb25zdHJ1Y3Rvcik7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIHRoZSBgc3ltYm9sYCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzeW1ib2wgVGhlIHN5bWJvbCBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgc3ltYm9sIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gY2xvbmVTeW1ib2woc3ltYm9sKSB7XG4gIHJldHVybiBzeW1ib2xWYWx1ZU9mID8gT2JqZWN0KHN5bWJvbFZhbHVlT2YuY2FsbChzeW1ib2wpKSA6IHt9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgdHlwZWRBcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSB0eXBlZEFycmF5IFRoZSB0eXBlZCBhcnJheSB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgdHlwZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGNsb25lVHlwZWRBcnJheSh0eXBlZEFycmF5LCBpc0RlZXApIHtcbiAgdmFyIGJ1ZmZlciA9IGlzRGVlcCA/IGNsb25lQXJyYXlCdWZmZXIodHlwZWRBcnJheS5idWZmZXIpIDogdHlwZWRBcnJheS5idWZmZXI7XG4gIHJldHVybiBuZXcgdHlwZWRBcnJheS5jb25zdHJ1Y3RvcihidWZmZXIsIHR5cGVkQXJyYXkuYnl0ZU9mZnNldCwgdHlwZWRBcnJheS5sZW5ndGgpO1xufVxuXG4vKipcbiAqIENvcGllcyB0aGUgdmFsdWVzIG9mIGBzb3VyY2VgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IHNvdXJjZSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheT1bXV0gVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIHRvLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGNvcHlBcnJheShzb3VyY2UsIGFycmF5KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gc291cmNlLmxlbmd0aDtcblxuICBhcnJheSB8fCAoYXJyYXkgPSBBcnJheShsZW5ndGgpKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtpbmRleF0gPSBzb3VyY2VbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBDb3BpZXMgcHJvcGVydGllcyBvZiBgc291cmNlYCB0byBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IGlkZW50aWZpZXJzIHRvIGNvcHkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgdG8uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb3BpZWQgdmFsdWVzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gY29weU9iamVjdChzb3VyY2UsIHByb3BzLCBvYmplY3QsIGN1c3RvbWl6ZXIpIHtcbiAgb2JqZWN0IHx8IChvYmplY3QgPSB7fSk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuXG4gICAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgICAgPyBjdXN0b21pemVyKG9iamVjdFtrZXldLCBzb3VyY2Vba2V5XSwga2V5LCBvYmplY3QsIHNvdXJjZSlcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgYXNzaWduVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlID09PSB1bmRlZmluZWQgPyBzb3VyY2Vba2V5XSA6IG5ld1ZhbHVlKTtcbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG4vKipcbiAqIENvcGllcyBvd24gc3ltYm9sIHByb3BlcnRpZXMgb2YgYHNvdXJjZWAgdG8gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCB0byBjb3B5IHN5bWJvbHMgZnJvbS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0PXt9XSBUaGUgb2JqZWN0IHRvIGNvcHkgc3ltYm9scyB0by5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGNvcHlTeW1ib2xzKHNvdXJjZSwgb2JqZWN0KSB7XG4gIHJldHVybiBjb3B5T2JqZWN0KHNvdXJjZSwgZ2V0U3ltYm9scyhzb3VyY2UpLCBvYmplY3QpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2Ygb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGdldEFsbEtleXMob2JqZWN0KSB7XG4gIHJldHVybiBiYXNlR2V0QWxsS2V5cyhvYmplY3QsIGtleXMsIGdldFN5bWJvbHMpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGRhdGEgZm9yIGBtYXBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSByZWZlcmVuY2Uga2V5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG1hcCBkYXRhLlxuICovXG5mdW5jdGlvbiBnZXRNYXBEYXRhKG1hcCwga2V5KSB7XG4gIHZhciBkYXRhID0gbWFwLl9fZGF0YV9fO1xuICByZXR1cm4gaXNLZXlhYmxlKGtleSlcbiAgICA/IGRhdGFbdHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/ICdzdHJpbmcnIDogJ2hhc2gnXVxuICAgIDogZGF0YS5tYXA7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShvYmplY3QsIGtleSk7XG4gIHJldHVybiBiYXNlSXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgc3ltYm9sIHByb3BlcnRpZXMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2Ygc3ltYm9scy5cbiAqL1xudmFyIGdldFN5bWJvbHMgPSBuYXRpdmVHZXRTeW1ib2xzID8gb3ZlckFyZyhuYXRpdmVHZXRTeW1ib2xzLCBPYmplY3QpIDogc3R1YkFycmF5O1xuXG4vKipcbiAqIEdldHMgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG52YXIgZ2V0VGFnID0gYmFzZUdldFRhZztcblxuLy8gRmFsbGJhY2sgZm9yIGRhdGEgdmlld3MsIG1hcHMsIHNldHMsIGFuZCB3ZWFrIG1hcHMgaW4gSUUgMTEsXG4vLyBmb3IgZGF0YSB2aWV3cyBpbiBFZGdlIDwgMTQsIGFuZCBwcm9taXNlcyBpbiBOb2RlLmpzLlxuaWYgKChEYXRhVmlldyAmJiBnZXRUYWcobmV3IERhdGFWaWV3KG5ldyBBcnJheUJ1ZmZlcigxKSkpICE9IGRhdGFWaWV3VGFnKSB8fFxuICAgIChNYXAgJiYgZ2V0VGFnKG5ldyBNYXApICE9IG1hcFRhZykgfHxcbiAgICAoUHJvbWlzZSAmJiBnZXRUYWcoUHJvbWlzZS5yZXNvbHZlKCkpICE9IHByb21pc2VUYWcpIHx8XG4gICAgKFNldCAmJiBnZXRUYWcobmV3IFNldCkgIT0gc2V0VGFnKSB8fFxuICAgIChXZWFrTWFwICYmIGdldFRhZyhuZXcgV2Vha01hcCkgIT0gd2Vha01hcFRhZykpIHtcbiAgZ2V0VGFnID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgcmVzdWx0ID0gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSksXG4gICAgICAgIEN0b3IgPSByZXN1bHQgPT0gb2JqZWN0VGFnID8gdmFsdWUuY29uc3RydWN0b3IgOiB1bmRlZmluZWQsXG4gICAgICAgIGN0b3JTdHJpbmcgPSBDdG9yID8gdG9Tb3VyY2UoQ3RvcikgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoY3RvclN0cmluZykge1xuICAgICAgc3dpdGNoIChjdG9yU3RyaW5nKSB7XG4gICAgICAgIGNhc2UgZGF0YVZpZXdDdG9yU3RyaW5nOiByZXR1cm4gZGF0YVZpZXdUYWc7XG4gICAgICAgIGNhc2UgbWFwQ3RvclN0cmluZzogcmV0dXJuIG1hcFRhZztcbiAgICAgICAgY2FzZSBwcm9taXNlQ3RvclN0cmluZzogcmV0dXJuIHByb21pc2VUYWc7XG4gICAgICAgIGNhc2Ugc2V0Q3RvclN0cmluZzogcmV0dXJuIHNldFRhZztcbiAgICAgICAgY2FzZSB3ZWFrTWFwQ3RvclN0cmluZzogcmV0dXJuIHdlYWtNYXBUYWc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gYXJyYXkgY2xvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZUFycmF5KGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBhcnJheS5jb25zdHJ1Y3RvcihsZW5ndGgpO1xuXG4gIC8vIEFkZCBwcm9wZXJ0aWVzIGFzc2lnbmVkIGJ5IGBSZWdFeHAjZXhlY2AuXG4gIGlmIChsZW5ndGggJiYgdHlwZW9mIGFycmF5WzBdID09ICdzdHJpbmcnICYmIGhhc093blByb3BlcnR5LmNhbGwoYXJyYXksICdpbmRleCcpKSB7XG4gICAgcmVzdWx0LmluZGV4ID0gYXJyYXkuaW5kZXg7XG4gICAgcmVzdWx0LmlucHV0ID0gYXJyYXkuaW5wdXQ7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyBhbiBvYmplY3QgY2xvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGluaXRpYWxpemVkIGNsb25lLlxuICovXG5mdW5jdGlvbiBpbml0Q2xvbmVPYmplY3Qob2JqZWN0KSB7XG4gIHJldHVybiAodHlwZW9mIG9iamVjdC5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmICFpc1Byb3RvdHlwZShvYmplY3QpKVxuICAgID8gYmFzZUNyZWF0ZShnZXRQcm90b3R5cGUob2JqZWN0KSlcbiAgICA6IHt9O1xufVxuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIG9iamVjdCBjbG9uZSBiYXNlZCBvbiBpdHMgYHRvU3RyaW5nVGFnYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBvbmx5IHN1cHBvcnRzIGNsb25pbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICogYEJvb2xlYW5gLCBgRGF0ZWAsIGBFcnJvcmAsIGBOdW1iZXJgLCBgUmVnRXhwYCwgb3IgYFN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGB0b1N0cmluZ1RhZ2Agb2YgdGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNsb25lRnVuYyBUaGUgZnVuY3Rpb24gdG8gY2xvbmUgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGluaXRpYWxpemVkIGNsb25lLlxuICovXG5mdW5jdGlvbiBpbml0Q2xvbmVCeVRhZyhvYmplY3QsIHRhZywgY2xvbmVGdW5jLCBpc0RlZXApIHtcbiAgdmFyIEN0b3IgPSBvYmplY3QuY29uc3RydWN0b3I7XG4gIHN3aXRjaCAodGFnKSB7XG4gICAgY2FzZSBhcnJheUJ1ZmZlclRhZzpcbiAgICAgIHJldHVybiBjbG9uZUFycmF5QnVmZmVyKG9iamVjdCk7XG5cbiAgICBjYXNlIGJvb2xUYWc6XG4gICAgY2FzZSBkYXRlVGFnOlxuICAgICAgcmV0dXJuIG5ldyBDdG9yKCtvYmplY3QpO1xuXG4gICAgY2FzZSBkYXRhVmlld1RhZzpcbiAgICAgIHJldHVybiBjbG9uZURhdGFWaWV3KG9iamVjdCwgaXNEZWVwKTtcblxuICAgIGNhc2UgZmxvYXQzMlRhZzogY2FzZSBmbG9hdDY0VGFnOlxuICAgIGNhc2UgaW50OFRhZzogY2FzZSBpbnQxNlRhZzogY2FzZSBpbnQzMlRhZzpcbiAgICBjYXNlIHVpbnQ4VGFnOiBjYXNlIHVpbnQ4Q2xhbXBlZFRhZzogY2FzZSB1aW50MTZUYWc6IGNhc2UgdWludDMyVGFnOlxuICAgICAgcmV0dXJuIGNsb25lVHlwZWRBcnJheShvYmplY3QsIGlzRGVlcCk7XG5cbiAgICBjYXNlIG1hcFRhZzpcbiAgICAgIHJldHVybiBjbG9uZU1hcChvYmplY3QsIGlzRGVlcCwgY2xvbmVGdW5jKTtcblxuICAgIGNhc2UgbnVtYmVyVGFnOlxuICAgIGNhc2Ugc3RyaW5nVGFnOlxuICAgICAgcmV0dXJuIG5ldyBDdG9yKG9iamVjdCk7XG5cbiAgICBjYXNlIHJlZ2V4cFRhZzpcbiAgICAgIHJldHVybiBjbG9uZVJlZ0V4cChvYmplY3QpO1xuXG4gICAgY2FzZSBzZXRUYWc6XG4gICAgICByZXR1cm4gY2xvbmVTZXQob2JqZWN0LCBpc0RlZXAsIGNsb25lRnVuYyk7XG5cbiAgICBjYXNlIHN5bWJvbFRhZzpcbiAgICAgIHJldHVybiBjbG9uZVN5bWJvbChvYmplY3QpO1xuICB9XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgJiZcbiAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHVzZSBhcyB1bmlxdWUgb2JqZWN0IGtleS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleWFibGUodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAodHlwZSA9PSAnc3RyaW5nJyB8fCB0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicpXG4gICAgPyAodmFsdWUgIT09ICdfX3Byb3RvX18nKVxuICAgIDogKHZhbHVlID09PSBudWxsKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYGZ1bmNgIGhhcyBpdHMgc291cmNlIG1hc2tlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGZ1bmNgIGlzIG1hc2tlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc01hc2tlZChmdW5jKSB7XG4gIHJldHVybiAhIW1hc2tTcmNLZXkgJiYgKG1hc2tTcmNLZXkgaW4gZnVuYyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGEgcHJvdG90eXBlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3RvdHlwZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1Byb3RvdHlwZSh2YWx1ZSkge1xuICB2YXIgQ3RvciA9IHZhbHVlICYmIHZhbHVlLmNvbnN0cnVjdG9yLFxuICAgICAgcHJvdG8gPSAodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSkgfHwgb2JqZWN0UHJvdG87XG5cbiAgcmV0dXJuIHZhbHVlID09PSBwcm90bztcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgZnVuY2AgdG8gaXRzIHNvdXJjZSBjb2RlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmZ1bmN0aW9uIHRvU291cmNlKGZ1bmMpIHtcbiAgaWYgKGZ1bmMgIT0gbnVsbCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnVuY1RvU3RyaW5nLmNhbGwoZnVuYyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChmdW5jICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uY2xvbmVgIGV4Y2VwdCB0aGF0IGl0IHJlY3Vyc2l2ZWx5IGNsb25lcyBgdmFsdWVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMS4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byByZWN1cnNpdmVseSBjbG9uZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBkZWVwIGNsb25lZCB2YWx1ZS5cbiAqIEBzZWUgXy5jbG9uZVxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0cyA9IFt7ICdhJzogMSB9LCB7ICdiJzogMiB9XTtcbiAqXG4gKiB2YXIgZGVlcCA9IF8uY2xvbmVEZWVwKG9iamVjdHMpO1xuICogY29uc29sZS5sb2coZGVlcFswXSA9PT0gb2JqZWN0c1swXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBjbG9uZURlZXAodmFsdWUpIHtcbiAgcmV0dXJuIGJhc2VDbG9uZSh2YWx1ZSwgdHJ1ZSwgdHJ1ZSk7XG59XG5cbi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICByZXR1cm4gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICghcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpIHx8IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWcpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LWxpa2Ugb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMy4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlciwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBCdWZmZXIoMikpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IFVpbnQ4QXJyYXkoMikpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQnVmZmVyID0gbmF0aXZlSXNCdWZmZXIgfHwgc3R1YkZhbHNlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDgtOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xuZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCkgOiBiYXNlS2V5cyhvYmplY3QpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgYSBuZXcgZW1wdHkgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEzLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBlbXB0eSBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIGFycmF5cyA9IF8udGltZXMoMiwgXy5zdHViQXJyYXkpO1xuICpcbiAqIGNvbnNvbGUubG9nKGFycmF5cyk7XG4gKiAvLyA9PiBbW10sIFtdXVxuICpcbiAqIGNvbnNvbGUubG9nKGFycmF5c1swXSA9PT0gYXJyYXlzWzFdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIHN0dWJBcnJheSgpIHtcbiAgcmV0dXJuIFtdO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgYGZhbHNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udGltZXMoMiwgXy5zdHViRmFsc2UpO1xuICogLy8gPT4gW2ZhbHNlLCBmYWxzZV1cbiAqL1xuZnVuY3Rpb24gc3R1YkZhbHNlKCkge1xuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xvbmVEZWVwO1xuIl0sIm5hbWVzIjpbImdsb2JhbCIsIl9fciIsIm1ldHJvUmVxdWlyZSIsIl9fZCIsImRlZmluZSIsIl9fYyIsImNsZWFyIiwibW9kdWxlcyIsIkVNUFRZIiwiX3JlZiIsImhhc093blByb3BlcnR5IiwiX19OVU1fTU9EVUxFU19fIiwiQXJyYXkiLCJPYmplY3QiLCJjcmVhdGUiLCJmYWN0b3J5IiwibW9kdWxlSWQiLCJkZXBlbmRlbmN5TWFwIiwiaGFzRXJyb3IiLCJpbXBvcnRlZEFsbCIsImltcG9ydGVkRGVmYXVsdCIsImlzSW5pdGlhbGl6ZWQiLCJwdWJsaWNNb2R1bGUiLCJleHBvcnRzIiwibW9kdWxlSWRSZWFsbHlJc051bWJlciIsIm1vZHVsZSIsImd1YXJkZWRMb2FkTW9kdWxlIiwibWV0cm9JbXBvcnREZWZhdWx0IiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJtZXRyb0ltcG9ydEFsbCIsIl9rZXkiLCJjYWxsIiwiaW5HdWFyZCIsIkVycm9yVXRpbHMiLCJyZXR1cm5WYWx1ZSIsImxvYWRNb2R1bGVJbXBsZW1lbnRhdGlvbiIsImUiLCJyZXBvcnRGYXRhbEVycm9yIiwiSURfTUFTS19TSElGVCIsIkxPQ0FMX0lEX01BU0siLCJ1bnBhY2tNb2R1bGVJZCIsInNlZ21lbnRJZCIsImxvY2FsSWQiLCJwYWNrTW9kdWxlSWQiLCJ2YWx1ZSIsImhvb2tzIiwicmVnaXN0ZXJIb29rIiwiY2IiLCJob29rIiwicHVzaCIsInJlbGVhc2UiLCJpIiwibGVuZ3RoIiwic3BsaWNlIiwiX19kZWZpbmVNb2R1bGUiLCJuYXRpdmVSZXF1aXJlIiwiX3VucGFja01vZHVsZUlkIiwiX3NlZ21lbnRJZCIsIl9sb2NhbElkIiwidW5rbm93bk1vZHVsZUVycm9yIiwibW9kdWxlVGhyZXdFcnJvciIsImVycm9yIiwiX21vZHVsZSIsIl9tb2R1bGVPYmplY3QiLCJpZCIsInVuZGVmaW5lZCIsIm1lc3NhZ2UiLCJFcnJvciIsImRpc3BsYXlOYW1lIiwiQmV0YUJhciIsIlRvb2xiYXIiLCJkaXNwbGF5Iiwib3ZlcmZsb3ciLCJsaW5lSGVpZ2h0Iiwid2hpdGVTcGFjZSIsInRleHRPdmVyZmxvdyIsIkxheW91dCIsIkZsaXBwZXJQbHVnaW4iLCJpbml0IiwiaW5UYXJnZXRNb2RlIiwiaW5BWE1vZGUiLCJpbkFsaWdubWVudE1vZGUiLCJzZWxlY3RlZEVsZW1lbnQiLCJzZWxlY3RlZEFYRWxlbWVudCIsInNlYXJjaFJlc3VsdHMiLCJzdGF0ZSIsInNldFN0YXRlIiwiY2xpZW50Iiwic2VuZCIsImFjdGl2ZSIsInBhdGgiLCJheCIsInByb3BzIiwicGVyc2lzdGVkU3RhdGUiLCJzZXRQZXJzaXN0ZWRTdGF0ZSIsImNvbnN0cnVjdG9yIiwiZGVmYXVsdFBlcnNpc3RlZFN0YXRlIiwidGhlbiIsImlzU2VhcmNoQWN0aXZlIiwic3Vic2NyaWJlIiwib25Ub2dnbGVUYXJnZXRNb2RlIiwiZ2V0Q2xpZW50IiwiaXNBcmNoaXZlZERldmljZSIsIlByb3h5QXJjaGl2ZUNsaWVudCIsInJlbmRlciIsImluc3BlY3RvclByb3BzIiwib25EYXRhVmFsdWVDaGFuZ2VkIiwiZWxlbWVudCIsIkFYZWxlbWVudHMiLCJlbGVtZW50cyIsImluc3BlY3RvciIsInJlYWxDbGllbnQiLCJxdWVyeSIsIm9zIiwib25Ub2dnbGVBWE1vZGUiLCJvblRvZ2dsZUFsaWdubWVudE1vZGUiLCJJbmZpbml0eSIsImxvZ2dlciIsImNhbGxDbGllbnQiLCJzdG9yZSIsImRlZmF1bHRQcm9taXNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJhbGxOb2RlcyIsInJvb3RFbGVtZW50Iiwicm9vdEFYRWxlbWVudCIsIkluc3BlY3RvciIsIkNvbXBvbmVudCIsInNlbGVjdGVkS2V5Iiwib25FbGVtZW50SG92ZXJlZCIsIm9uU2VsZWN0Iiwia2V5IiwiU0VUX0hJR0hMSUdIVEVEIiwiaXNBbGlnbm1lbnRNb2RlIiwiZGVlcCIsImV4cGFuZGVkIiwidXBkYXRlRWxlbWVudCIsImdldENoaWxkcmVuIiwiY2hpbGRyZW4iLCJmb3JFYWNoIiwiY2hpbGQiLCJvbkVsZW1lbnRFeHBhbmRlZCIsIkdFVF9ST09UIiwiSU5WQUxJREFURSIsIkdFVF9OT0RFUyIsIlNFTEVDVCIsImNvbXBvbmVudERpZE1vdW50Iiwicm9vdCIsInBlcmZvcm1Jbml0aWFsRXhwYW5kIiwibm9kZXMiLCJnZXROb2RlcyIsIm1hcCIsIm4iLCJyZWR1Y2UiLCJhY2MiLCJjdiIsImNvbmNhdCIsImdldEFuZEV4cGFuZFBhdGgiLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJsaW5rZWRBWE5vZGUiLCJleHRyYUluZm8iLCJsaW5rZWROb2RlIiwidmFsdWVzIiwiZmluZCIsImRhdGEiLCJvcHRpb25zIiwiaWRzIiwiZm9yQWNjZXNzaWJpbGl0eUV2ZW50Iiwic2VsZWN0ZWQiLCJhbGwiLCJvbkVsZW1lbnRTZWxlY3RlZCIsIkZVTkNfRVJST1JfVEVYVCIsIk5BTiIsInN5bWJvbFRhZyIsInJlVHJpbSIsInJlSXNCYWRIZXgiLCJyZUlzQmluYXJ5IiwicmVJc09jdGFsIiwiZnJlZVBhcnNlSW50IiwicGFyc2VJbnQiLCJmcmVlR2xvYmFsIiwiZnJlZVNlbGYiLCJzZWxmIiwiRnVuY3Rpb24iLCJvYmplY3RQcm90byIsInByb3RvdHlwZSIsIm9iamVjdFRvU3RyaW5nIiwidG9TdHJpbmciLCJuYXRpdmVNYXgiLCJNYXRoIiwibWF4IiwibmF0aXZlTWluIiwibWluIiwibm93IiwiRGF0ZSIsImRlYm91bmNlIiwiZnVuYyIsIndhaXQiLCJsYXN0QXJncyIsImxhc3RUaGlzIiwibWF4V2FpdCIsInJlc3VsdCIsInRpbWVySWQiLCJsYXN0Q2FsbFRpbWUiLCJsYXN0SW52b2tlVGltZSIsImxlYWRpbmciLCJtYXhpbmciLCJ0cmFpbGluZyIsIlR5cGVFcnJvciIsInRvTnVtYmVyIiwiaXNPYmplY3QiLCJpbnZva2VGdW5jIiwidGltZSIsImFyZ3MiLCJ0aGlzQXJnIiwiYXBwbHkiLCJsZWFkaW5nRWRnZSIsInNldFRpbWVvdXQiLCJ0aW1lckV4cGlyZWQiLCJyZW1haW5pbmdXYWl0IiwidGltZVNpbmNlTGFzdENhbGwiLCJ0aW1lU2luY2VMYXN0SW52b2tlIiwic2hvdWxkSW52b2tlIiwidHJhaWxpbmdFZGdlIiwiY2FuY2VsIiwiY2xlYXJUaW1lb3V0IiwiZmx1c2giLCJkZWJvdW5jZWQiLCJpc0ludm9raW5nIiwiYXJndW1lbnRzIiwidHlwZSIsImlzT2JqZWN0TGlrZSIsImlzU3ltYm9sIiwib3RoZXIiLCJ2YWx1ZU9mIiwicmVwbGFjZSIsImlzQmluYXJ5IiwidGVzdCIsInNsaWNlIiwiVG9vbGJhckljb24iLCJtYXJnaW5SaWdodCIsIm1hcmdpblRvcCIsIm1hcmdpbkxlZnQiLCJwb3NpdGlvbiIsIm9uQ2xpY2siLCJ0aXRsZSIsImljb24iLCJjb2xvcnMiLCJtYWNPU1RpdGxlQmFySWNvblNlbGVjdGVkIiwibWFjT1NUaXRsZUJhckljb25BY3RpdmUiLCJkZWVwRXF1YWwiLCJyZXF1aXJlIiwiTm9EYXRhIiwiRmxleENlbnRlciIsImZvbnRTaXplIiwiY29sb3IiLCJtYWNPU1RpdGxlQmFySWNvbiIsIkluc3BlY3RvclNpZGViYXJTZWN0aW9uIiwib25WYWx1ZUNoYW5nZWQiLCJ2YWwiLCJkZXB0aCIsIl9fdHlwZV9fIiwibXV0YWJsZSIsIkJvb2xlYW4iLCJfX211dGFibGVfXyIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsIm5leHRQcm9wcyIsInNldFZhbHVlIiwiZXh0cmFjdFZhbHVlIiwidG9vbHRpcHMiLCJTaWRlYmFyIiwiaXNDb25zb2xlRW5hYmxlZCIsImNoZWNrSWZDb25zb2xlSXNFbmFibGVkIiwicHJldlN0YXRlIiwiaXNFbmFibGVkIiwic2VjdGlvbnMiLCJTaWRlYmFyRXh0ZW5zaW9ucyIsImV4dCIsImV4dHJhU2VjdGlvbiIsIkpTT04iLCJwYXJzZSIsImNvbnNvbGUiLCJHSyIsImdldCIsInBTbGljZSIsIm9iamVjdEtleXMiLCJpc0FyZ3VtZW50cyIsImFjdHVhbCIsImV4cGVjdGVkIiwib3B0cyIsImdldFRpbWUiLCJzdHJpY3QiLCJvYmpFcXVpdiIsImlzVW5kZWZpbmVkT3JOdWxsIiwiaXNCdWZmZXIiLCJ4IiwiY29weSIsImEiLCJiIiwia2EiLCJrYiIsInNvcnQiLCJrZXlzIiwic2hpbSIsIm9iaiIsInN1cHBvcnRzQXJndW1lbnRzQ2xhc3MiLCJzdXBwb3J0ZWQiLCJ1bnN1cHBvcnRlZCIsIm9iamVjdCIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwiTG9hZGluZ1NwaW5uZXIiLCJMb2FkaW5nSW5kaWNhdG9yIiwiU2VhcmNoIiwib3V0c3RhbmRpbmdTZWFyY2hRdWVyeSIsInRpbWVyIiwidGFyZ2V0IiwicGVyZm9ybVNlYXJjaCIsImRpc3BsYXlTZWFyY2hSZXN1bHRzIiwicmVzdWx0cyIsImF4RW5hYmxlZCIsInJlc3BvbnNlIiwiYXhNb2RlIiwiZ2V0RWxlbWVudHNGcm9tU2VhcmNoUmVzdWx0VHJlZSIsInNlYXJjaFJlc3VsdElEcyIsIlNldCIsInIiLCJzb21lIiwiYyIsImhhcyIsImF4RWxlbWVudCIsIm9uU2VhcmNoUmVzdWx0cyIsIm1hdGNoZXMiLCJmaWx0ZXIiLCJpc01hdGNoIiwidHJlZSIsImhhc0NoaWxkcmVuIiwib25DaGFuZ2UiLCJvbktleURvd24iLCJwcm9wc0ZvclBlcnNpc3RlZFN0YXRlIiwiQVhNb2RlIiwiUk9PVCIsIkVMRU1FTlRTIiwiRUxFTUVOVCIsImNvbnN0cnVjdFNlYXJjaFJlc3VsdFRyZWUiLCJub2RlIiwiQVhOb2RlIiwic2VhcmNoUmVzdWx0IiwibmFtZU1hdGNoIiwibmFtZSIsInRvTG93ZXJDYXNlIiwiaW5jbHVkZXMiLCJzZWFyY2hOb2RlcyIsIm1hdGNoIiwiY2hpbGRJRCIsIm1ldGhvZCIsImNhbGxiYWNrIiwic3VwcG9ydHNNZXRob2QiLCJwYXJhbXMiLCJwYXJhbWF0ZXJzIiwicmVqZWN0IiwiYXJyIiwib3V0cHV0IiwiTEFSR0VfQVJSQVlfU0laRSIsIkhBU0hfVU5ERUZJTkVEIiwiTUFYX1NBRkVfSU5URUdFUiIsImFyZ3NUYWciLCJhcnJheVRhZyIsImJvb2xUYWciLCJkYXRlVGFnIiwiZXJyb3JUYWciLCJmdW5jVGFnIiwiZ2VuVGFnIiwibWFwVGFnIiwibnVtYmVyVGFnIiwib2JqZWN0VGFnIiwicHJvbWlzZVRhZyIsInJlZ2V4cFRhZyIsInNldFRhZyIsInN0cmluZ1RhZyIsIndlYWtNYXBUYWciLCJhcnJheUJ1ZmZlclRhZyIsImRhdGFWaWV3VGFnIiwiZmxvYXQzMlRhZyIsImZsb2F0NjRUYWciLCJpbnQ4VGFnIiwiaW50MTZUYWciLCJpbnQzMlRhZyIsInVpbnQ4VGFnIiwidWludDhDbGFtcGVkVGFnIiwidWludDE2VGFnIiwidWludDMyVGFnIiwicmVSZWdFeHBDaGFyIiwicmVGbGFncyIsInJlSXNIb3N0Q3RvciIsInJlSXNVaW50IiwiY2xvbmVhYmxlVGFncyIsImZyZWVFeHBvcnRzIiwibm9kZVR5cGUiLCJmcmVlTW9kdWxlIiwibW9kdWxlRXhwb3J0cyIsImFkZE1hcEVudHJ5IiwicGFpciIsInNldCIsImFkZFNldEVudHJ5IiwiYWRkIiwiYXJyYXlFYWNoIiwiYXJyYXkiLCJpdGVyYXRlZSIsImluZGV4IiwiYXJyYXlQdXNoIiwib2Zmc2V0IiwiYXJyYXlSZWR1Y2UiLCJhY2N1bXVsYXRvciIsImluaXRBY2N1bSIsImJhc2VUaW1lcyIsImdldFZhbHVlIiwiaXNIb3N0T2JqZWN0IiwibWFwVG9BcnJheSIsInNpemUiLCJvdmVyQXJnIiwidHJhbnNmb3JtIiwiYXJnIiwic2V0VG9BcnJheSIsImFycmF5UHJvdG8iLCJmdW5jUHJvdG8iLCJjb3JlSnNEYXRhIiwibWFza1NyY0tleSIsInVpZCIsImV4ZWMiLCJJRV9QUk9UTyIsImZ1bmNUb1N0cmluZyIsInJlSXNOYXRpdmUiLCJSZWdFeHAiLCJCdWZmZXIiLCJTeW1ib2wiLCJVaW50OEFycmF5IiwiZ2V0UHJvdG90eXBlIiwiZ2V0UHJvdG90eXBlT2YiLCJvYmplY3RDcmVhdGUiLCJuYXRpdmVHZXRTeW1ib2xzIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwibmF0aXZlSXNCdWZmZXIiLCJuYXRpdmVLZXlzIiwiRGF0YVZpZXciLCJnZXROYXRpdmUiLCJNYXAiLCJXZWFrTWFwIiwibmF0aXZlQ3JlYXRlIiwiZGF0YVZpZXdDdG9yU3RyaW5nIiwidG9Tb3VyY2UiLCJtYXBDdG9yU3RyaW5nIiwicHJvbWlzZUN0b3JTdHJpbmciLCJzZXRDdG9yU3RyaW5nIiwid2Vha01hcEN0b3JTdHJpbmciLCJzeW1ib2xQcm90byIsInN5bWJvbFZhbHVlT2YiLCJIYXNoIiwiZW50cmllcyIsImVudHJ5IiwiaGFzaENsZWFyIiwiX19kYXRhX18iLCJoYXNoRGVsZXRlIiwiaGFzaEdldCIsImhhc2hIYXMiLCJoYXNoU2V0IiwiTGlzdENhY2hlIiwibGlzdENhY2hlQ2xlYXIiLCJsaXN0Q2FjaGVEZWxldGUiLCJhc3NvY0luZGV4T2YiLCJsYXN0SW5kZXgiLCJwb3AiLCJsaXN0Q2FjaGVHZXQiLCJsaXN0Q2FjaGVIYXMiLCJsaXN0Q2FjaGVTZXQiLCJNYXBDYWNoZSIsIm1hcENhY2hlQ2xlYXIiLCJtYXBDYWNoZURlbGV0ZSIsImdldE1hcERhdGEiLCJtYXBDYWNoZUdldCIsIm1hcENhY2hlSGFzIiwibWFwQ2FjaGVTZXQiLCJTdGFjayIsInN0YWNrQ2xlYXIiLCJzdGFja0RlbGV0ZSIsInN0YWNrR2V0Iiwic3RhY2tIYXMiLCJzdGFja1NldCIsImNhY2hlIiwicGFpcnMiLCJhcnJheUxpa2VLZXlzIiwiaW5oZXJpdGVkIiwiaXNBcnJheSIsIlN0cmluZyIsInNraXBJbmRleGVzIiwiaXNJbmRleCIsImFzc2lnblZhbHVlIiwib2JqVmFsdWUiLCJlcSIsImJhc2VBc3NpZ24iLCJzb3VyY2UiLCJjb3B5T2JqZWN0IiwiYmFzZUNsb25lIiwiaXNEZWVwIiwiaXNGdWxsIiwiY3VzdG9taXplciIsInN0YWNrIiwiaXNBcnIiLCJpbml0Q2xvbmVBcnJheSIsImNvcHlBcnJheSIsInRhZyIsImdldFRhZyIsImlzRnVuYyIsImNsb25lQnVmZmVyIiwiaW5pdENsb25lT2JqZWN0IiwiY29weVN5bWJvbHMiLCJpbml0Q2xvbmVCeVRhZyIsInN0YWNrZWQiLCJnZXRBbGxLZXlzIiwic3ViVmFsdWUiLCJiYXNlQ3JlYXRlIiwicHJvdG8iLCJiYXNlR2V0QWxsS2V5cyIsImtleXNGdW5jIiwic3ltYm9sc0Z1bmMiLCJiYXNlR2V0VGFnIiwiYmFzZUlzTmF0aXZlIiwiaXNNYXNrZWQiLCJwYXR0ZXJuIiwiaXNGdW5jdGlvbiIsImJhc2VLZXlzIiwiaXNQcm90b3R5cGUiLCJidWZmZXIiLCJjbG9uZUFycmF5QnVmZmVyIiwiYXJyYXlCdWZmZXIiLCJieXRlTGVuZ3RoIiwiY2xvbmVEYXRhVmlldyIsImRhdGFWaWV3IiwiYnl0ZU9mZnNldCIsImNsb25lTWFwIiwiY2xvbmVGdW5jIiwiY2xvbmVSZWdFeHAiLCJyZWdleHAiLCJjbG9uZVNldCIsImNsb25lU3ltYm9sIiwic3ltYm9sIiwiY2xvbmVUeXBlZEFycmF5IiwidHlwZWRBcnJheSIsIm5ld1ZhbHVlIiwiZ2V0U3ltYm9scyIsImlzS2V5YWJsZSIsInN0dWJBcnJheSIsIkFycmF5QnVmZmVyIiwiQ3RvciIsImN0b3JTdHJpbmciLCJpbnB1dCIsImNsb25lRGVlcCIsImlzQXJyYXlMaWtlT2JqZWN0IiwiaXNBcnJheUxpa2UiLCJpc0xlbmd0aCIsInN0dWJGYWxzZSJdLCJtYXBwaW5ncyI6Ijs7QUNXQTs7QUFJQUEsRUFBQUEsTUFBTSxDQUFDQyxHQUFQLEdBQWFDLFlBQWI7QUFDQUYsRUFBQUEsTUFBTSxDQUFDRyxHQUFQLEdBQWFDLE1BQWI7QUFDQUosRUFBQUEsTUFBTSxDQUFDSyxHQUFQLEdBQWFDLEtBQWI7QUFFQSxNQUFJQyxPQUFPLEdBQUdELEtBQUssRUFBbkI7QUFJQSxNQUFJRSxLQUFLLEdBQUcsRUFBWjtBQUNBLE1BQUlDLElBQUksR0FBRyxFQUFYO0FBQUEsTUFDRUMsY0FBYyxHQUFHRCxJQUFJLENBQUNDLGNBRHhCOztBQUdBLFdBQVNKLEtBQVQsR0FBaUI7QUFDZkMsSUFBQUEsT0FBTyxHQUNMLE9BQU9JLGVBQVAsS0FBMkIsUUFBM0IsR0FDSUMsS0FBSyxDQUFDRCxlQUFlLEdBQUcsQ0FBbkIsQ0FEVCxHQUVJRSxNQUFNLENBQUNDLE1BQVAsQ0FBYyxJQUFkLENBSE47QUFRQSxXQUFPUCxPQUFQO0FBQ0Q7O0FBT0QsV0FBU0gsTUFBVCxDQUFnQlcsT0FBaEIsRUFBeUJDLFFBQXpCLEVBQW1DQyxhQUFuQyxFQUFrRDtBQUNoRCxRQUFJVixPQUFPLENBQUNTLFFBQUQsQ0FBUCxJQUFxQixJQUF6QixFQUErQjtBQW1CN0I7QUFDRDs7QUFDRFQsSUFBQUEsT0FBTyxDQUFDUyxRQUFELENBQVAsR0FBb0I7QUFDbEJDLE1BQUFBLGFBQWEsRUFBRUEsYUFERztBQUVsQkYsTUFBQUEsT0FBTyxFQUFFQSxPQUZTO0FBR2xCRyxNQUFBQSxRQUFRLEVBQUUsS0FI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