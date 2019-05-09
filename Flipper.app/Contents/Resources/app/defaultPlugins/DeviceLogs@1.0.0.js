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

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.addEntriesToState = addEntriesToState;
  exports.addRowIfNeeded = addRowIfNeeded;
  exports.processEntry = processEntry;
  exports.default = undefined;
  var _flipper = global.Flipper;

  var _LogWatcher = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[0]));

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  const LOG_WATCHER_LOCAL_STORAGE_KEY = 'LOG_WATCHER_LOCAL_STORAGE_KEY';
  const Icon = (0, _flipper.styled)(_flipper.Glyph)({
    marginTop: 5
  });

  function getLineCount(str) {
    let count = 1;

    for (let i = 0; i < str.length; i++) {
      if (str[i] === '\n') {
        count++;
      }
    }

    return count;
  }

  function keepKeys(obj, keys) {
    const result = {};

    for (const key in obj) {
      if (keys.includes(key)) {
        result[key] = obj[key];
      }
    }

    return result;
  }

  const COLUMN_SIZE = {
    type: 40,
    time: 120,
    pid: 60,
    tid: 60,
    tag: 120,
    app: 200,
    message: 'flex'
  };
  const COLUMNS = {
    type: {
      value: ''
    },
    time: {
      value: 'Time'
    },
    pid: {
      value: 'PID'
    },
    tid: {
      value: 'TID'
    },
    tag: {
      value: 'Tag'
    },
    app: {
      value: 'App'
    },
    message: {
      value: 'Message'
    }
  };
  const INITIAL_COLUMN_ORDER = [{
    key: 'type',
    visible: true
  }, {
    key: 'time',
    visible: false
  }, {
    key: 'pid',
    visible: false
  }, {
    key: 'tid',
    visible: false
  }, {
    key: 'tag',
    visible: true
  }, {
    key: 'app',
    visible: true
  }, {
    key: 'message',
    visible: true
  }];
  const LOG_TYPES = {
    verbose: {
      label: 'Verbose',
      color: _flipper.colors.purple
    },
    debug: {
      label: 'Debug',
      color: _flipper.colors.grey
    },
    info: {
      label: 'Info',
      icon: global.React.createElement(Icon, {
        name: "info-circle",
        color: _flipper.colors.cyan
      }),
      color: _flipper.colors.cyan
    },
    warn: {
      label: 'Warn',
      style: {
        backgroundColor: _flipper.colors.yellowTint,
        color: _flipper.colors.yellow,
        fontWeight: 500
      },
      icon: global.React.createElement(Icon, {
        name: "caution-triangle",
        color: _flipper.colors.yellow
      }),
      color: _flipper.colors.yellow
    },
    error: {
      label: 'Error',
      style: {
        backgroundColor: _flipper.colors.redTint,
        color: _flipper.colors.red,
        fontWeight: 500
      },
      icon: global.React.createElement(Icon, {
        name: "caution-octagon",
        color: _flipper.colors.red
      }),
      color: _flipper.colors.red
    },
    fatal: {
      label: 'Fatal',
      style: {
        backgroundColor: _flipper.colors.redTint,
        color: _flipper.colors.red,
        fontWeight: 700
      },
      icon: global.React.createElement(Icon, {
        name: "stop",
        color: _flipper.colors.red
      }),
      color: _flipper.colors.red
    }
  };
  const DEFAULT_FILTERS = [{
    type: 'enum',
    enum: Object.keys(LOG_TYPES).map(value => ({
      label: LOG_TYPES[value].label,
      value
    })),
    key: 'type',
    value: [],
    persistent: true
  }];
  const HiddenScrollText = (0, _flipper.styled)(_flipper.Text)({
    alignSelf: 'baseline',
    userSelect: 'none',
    lineHeight: '130%',
    marginTop: 5,
    paddingBottom: 3,
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  });
  const LogCount = (0, _flipper.styled)('div')(({
    backgroundColor
  }) => ({
    backgroundColor,
    borderRadius: '999em',
    fontSize: 11,
    marginTop: 4,
    minWidth: 16,
    height: 16,
    color: _flipper.colors.white,
    textAlign: 'center',
    lineHeight: '16px',
    paddingLeft: 4,
    paddingRight: 4,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }));

  function pad(chunk, len) {
    let str = String(chunk);

    while (str.length < len) {
      str = `0${str}`;
    }

    return str;
  }

  function addEntriesToState(items, state = {
    rows: [],
    entries: [],
    key2entry: {}
  }) {
    const rows = [...state.rows];
    const entries = [...state.entries];

    const key2entry = _objectSpread({}, state.key2entry);

    for (let i = 0; i < items.length; i++) {
      const {
        entry,
        row
      } = items[i];
      entries.push({
        row,
        entry
      });
      key2entry[row.key] = entry;
      let previousEntry = null;

      if (i > 0) {
        previousEntry = items[i - 1].entry;
      } else if (state.rows.length > 0 && state.entries.length > 0) {
        previousEntry = state.entries[state.entries.length - 1].entry;
      }

      addRowIfNeeded(rows, row, entry, previousEntry);
    }

    return {
      entries,
      rows,
      key2entry
    };
  }

  function addRowIfNeeded(rows, row, entry, previousEntry) {
    const previousRow = rows.length > 0 ? rows[rows.length - 1] : null;

    if (previousRow && previousEntry && entry.message === previousEntry.message && entry.tag === previousEntry.tag && previousRow.type != null) {
      const count = previousRow.columns.type.value && previousRow.columns.type.value.props && typeof previousRow.columns.type.value.props.children === 'number' ? previousRow.columns.type.value.props.children + 1 : 2;
      const type = LOG_TYPES[previousRow.type] || LOG_TYPES.debug;
      previousRow.columns.type.value = global.React.createElement(LogCount, {
        backgroundColor: type.color
      }, count);
    } else {
      rows.push(row);
    }
  }

  function processEntry(entry, key) {
    const {
      icon,
      style
    } = LOG_TYPES[entry.type] || LOG_TYPES.debug;
    return {
      entry,
      row: {
        columns: {
          type: {
            value: icon,
            align: 'center'
          },
          time: {
            value: global.React.createElement(HiddenScrollText, {
              code: true
            }, entry.date.toTimeString().split(' ')[0] + '.' + pad(entry.date.getMilliseconds(), 3))
          },
          message: {
            value: global.React.createElement(HiddenScrollText, {
              code: true
            }, entry.message)
          },
          tag: {
            value: global.React.createElement(HiddenScrollText, {
              code: true
            }, entry.tag),
            isFilterable: true
          },
          pid: {
            value: global.React.createElement(HiddenScrollText, {
              code: true
            }, String(entry.pid)),
            isFilterable: true
          },
          tid: {
            value: global.React.createElement(HiddenScrollText, {
              code: true
            }, String(entry.tid)),
            isFilterable: true
          },
          app: {
            value: global.React.createElement(HiddenScrollText, {
              code: true
            }, entry.app),
            isFilterable: true
          }
        },
        height: getLineCount(entry.message) * 15 + 10,
        style,
        type: entry.type,
        filterValue: entry.message,
        key
      }
    };
  }

  class LogTable extends _flipper.FlipperDevicePlugin {
    static supportsDevice(device) {
      return device.os === 'iOS' || device.os === 'Android';
    }

    constructor(props) {
      super(props);

      _defineProperty(this, "initTimer", undefined);

      _defineProperty(this, "batchTimer", undefined);

      _defineProperty(this, "onKeyboardAction", action => {
        if (action === 'clear') {
          this.clearLogs();
        } else if (action === 'goToBottom') {
          this.goToBottom();
        } else if (action === 'createPaste') {
          this.createPaste();
        }
      });

      _defineProperty(this, "restoreSavedCounters", () => {
        const savedCounters = window.localStorage.getItem(LOG_WATCHER_LOCAL_STORAGE_KEY) || '[]';
        return JSON.parse(savedCounters).map(counter => _objectSpread({}, counter, {
          expression: new RegExp(counter.label, 'gi'),
          count: 0
        }));
      });

      _defineProperty(this, "calculateHighlightedRows", (deepLinkPayload, rows) => {
        const highlightedRows = new Set();

        if (!deepLinkPayload) {
          return highlightedRows;
        }

        for (let i = rows.length - 1; i >= 0; i--) {
          if (rows[i].filterValue && rows[i].filterValue.includes(deepLinkPayload)) {
            highlightedRows.add(rows[i].key);
            break;
          }
        }

        return highlightedRows;
      });

      _defineProperty(this, "tableRef", undefined);

      _defineProperty(this, "columns", undefined);

      _defineProperty(this, "columnSizes", undefined);

      _defineProperty(this, "columnOrder", undefined);

      _defineProperty(this, "logListener", undefined);

      _defineProperty(this, "batch", []);

      _defineProperty(this, "queued", false);

      _defineProperty(this, "counter", 0);

      _defineProperty(this, "incrementCounterIfNeeded", entry => {
        let counterUpdated = false;
        const counters = this.state.counters.map(counter => {
          if (entry.message.match(counter.expression)) {
            counterUpdated = true;

            if (counter.notify) {
              new window.Notification(`${counter.label}`, {
                body: 'The watched log message appeared'
              });
            }

            return _objectSpread({}, counter, {
              count: counter.count + 1
            });
          } else {
            return counter;
          }
        });

        if (counterUpdated) {
          this.setState({
            counters
          });
        }
      });

      _defineProperty(this, "scheudleEntryForBatch", item => {
        this.batch.push(item);

        if (!this.queued) {
          this.queued = true;
          this.batchTimer = setTimeout(() => {
            const thisBatch = this.batch;
            this.batch = [];
            this.queued = false;
            this.setState(state => addEntriesToState(thisBatch, state));
          }, 100);
        }
      });

      _defineProperty(this, "clearLogs", () => {
        this.device.clearLogs().catch(e => {
          console.error('Failed to clear logs: ', e);
        });
        this.setState({
          entries: [],
          rows: [],
          highlightedRows: new Set(),
          key2entry: {},
          counters: this.state.counters.map(counter => _objectSpread({}, counter, {
            count: 0
          }))
        });
      });

      _defineProperty(this, "createPaste", () => {
        let paste = '';

        const mapFn = row => Object.keys(COLUMNS).map(key => (0, _flipper.textContent)(row.columns[key].value)).join('\t');

        if (this.state.highlightedRows.size > 0) {
          paste = this.state.rows.filter(row => this.state.highlightedRows.has(row.key)).map(mapFn).join('\n');
        } else {
          paste = this.state.rows.map(mapFn).join('\n');
        }

        (0, _flipper.createPaste)(paste);
      });

      _defineProperty(this, "setTableRef", ref => {
        this.tableRef = ref;
      });

      _defineProperty(this, "goToBottom", () => {
        if (this.tableRef != null) {
          this.tableRef.scrollToBottom();
        }
      });

      _defineProperty(this, "onRowHighlighted", highlightedRows => {
        this.setState(_objectSpread({}, this.state, {
          highlightedRows: new Set(highlightedRows)
        }));
      });

      _defineProperty(this, "renderSidebar", () => {
        return global.React.createElement(_LogWatcher.default, {
          counters: this.state.counters,
          onChange: counters => this.setState({
            counters
          }, () => window.localStorage.setItem(LOG_WATCHER_LOCAL_STORAGE_KEY, JSON.stringify(this.state.counters)))
        });
      });

      _defineProperty(this, "buildContextMenuItems", () => [{
        type: 'separator'
      }, {
        label: 'Clear all',
        click: this.clearLogs
      }]);

      const supportedColumns = this.device.supportedColumns();
      this.columns = keepKeys(COLUMNS, supportedColumns);
      this.columnSizes = keepKeys(COLUMN_SIZE, supportedColumns);
      this.columnOrder = INITIAL_COLUMN_ORDER.filter(obj => supportedColumns.includes(obj.key));
      const initialState = addEntriesToState(this.device.getLogs().map(log => processEntry(log, String(this.counter++))));
      this.state = _objectSpread({}, initialState, {
        highlightedRows: this.calculateHighlightedRows(props.deepLinkPayload, initialState.rows),
        counters: this.restoreSavedCounters()
      });
      this.logListener = this.device.addLogListener(entry => {
        const processedEntry = processEntry(entry, String(this.counter++));
        this.incrementCounterIfNeeded(processedEntry.entry);
        this.scheudleEntryForBatch(processedEntry);
      });
    }

    componentWillUnmount() {
      if (this.batchTimer) {
        clearTimeout(this.batchTimer);
      }

      if (this.logListener) {
        this.device.removeLogListener(this.logListener);
      }
    }

    render() {
      return global.React.createElement(LogTable.ContextMenu, {
        buildItems: this.buildContextMenuItems,
        component: _flipper.FlexColumn
      }, global.React.createElement(_flipper.SearchableTable, {
        innerRef: this.setTableRef,
        floating: false,
        multiline: true,
        columnSizes: this.columnSizes,
        columnOrder: this.columnOrder,
        columns: this.columns,
        rows: this.state.rows,
        highlightedRows: this.state.highlightedRows,
        onRowHighlighted: this.onRowHighlighted,
        multiHighlight: true,
        defaultFilters: DEFAULT_FILTERS,
        zebra: false,
        actions: global.React.createElement(_flipper.Button, {
          onClick: this.clearLogs
        }, "Clear Logs"),
        stickyBottom: !(this.props.deepLinkPayload && this.state.highlightedRows.size > 0)
      }), global.React.createElement(_flipper.DetailSidebar, null, this.renderSidebar()));
    }

  }

  exports.default = LogTable;

  _defineProperty(LogTable, "keyboardActions", ['clear', 'goToBottom', 'createPaste']);

  _defineProperty(LogTable, "ContextMenu", (0, _flipper.styled)(_flipper.ContextMenu)({
    flex: 1
  }));
},-30564576,[1522259620]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _flipper = global.Flipper;

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  const ColumnSizes = {
    expression: '70%',
    count: '15%',
    notify: 'flex'
  };
  const Columns = {
    expression: {
      value: 'Expression',
      resizable: false
    },
    count: {
      value: 'Count',
      resizable: false
    },
    notify: {
      value: 'Notify',
      resizable: false
    }
  };
  const Count = (0, _flipper.styled)(_flipper.Text)({
    alignSelf: 'center',
    background: _flipper.colors.macOSHighlightActive,
    color: _flipper.colors.white,
    fontSize: 12,
    fontWeight: 500,
    textAlign: 'center',
    borderRadius: '999em',
    padding: '4px 9px 3px',
    lineHeight: '100%',
    marginLeft: 'auto'
  });
  const Checkbox = (0, _flipper.styled)(_flipper.Input)({
    lineHeight: '100%',
    padding: 0,
    margin: 0,
    height: 'auto',
    alignSelf: 'center'
  });
  const ExpressionInput = (0, _flipper.styled)(_flipper.Input)({
    flexGrow: 1
  });
  const WatcherPanel = (0, _flipper.styled)(_flipper.Panel)({
    minHeight: 200
  });

  class LogWatcher extends _flipper.PureComponent {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "state", {
        input: '',
        highlightedRow: null
      });

      _defineProperty(this, "_inputRef", undefined);

      _defineProperty(this, "onAdd", () => {
        if (this.props.counters.findIndex(({
          label
        }) => label === this.state.input) > -1 || this.state.input.length === 0) {
          return;
        }

        this.props.onChange([...this.props.counters, {
          label: this.state.input,
          expression: new RegExp(this.state.input, 'gi'),
          notify: false,
          count: 0
        }]);
        this.setState({
          input: ''
        });
      });

      _defineProperty(this, "onChange", e => {
        this.setState({
          input: e.target.value
        });
      });

      _defineProperty(this, "resetCount", index => {
        const newCounters = [...this.props.counters];
        newCounters[index] = _objectSpread({}, newCounters[index], {
          count: 0
        });
        this.props.onChange(newCounters);
      });

      _defineProperty(this, "buildRows", () => {
        return this.props.counters.map(({
          label,
          count,
          notify
        }, i) => ({
          columns: {
            expression: {
              value: global.React.createElement(_flipper.Text, {
                code: true
              }, label)
            },
            count: {
              value: global.React.createElement(Count, {
                onClick: () => this.resetCount(i)
              }, count)
            },
            notify: {
              value: global.React.createElement(Checkbox, {
                type: "checkbox",
                checked: notify,
                onChange: () => this.setNotification(i, !notify)
              })
            }
          },
          key: label
        }));
      });

      _defineProperty(this, "setNotification", (index, notify) => {
        const newCounters = [...this.props.counters];
        newCounters[index] = _objectSpread({}, newCounters[index], {
          notify
        });
        this.props.onChange(newCounters);
      });

      _defineProperty(this, "onRowHighlighted", rows => {
        this.setState({
          highlightedRow: rows.length === 1 ? rows[0] : null
        });
      });

      _defineProperty(this, "onKeyDown", e => {
        if ((e.key === 'Delete' || e.key === 'Backspace') && this.state.highlightedRow != null) {
          this.props.onChange(this.props.counters.filter(({
            label
          }) => label !== this.state.highlightedRow));
        }
      });

      _defineProperty(this, "onSubmit", e => {
        if (e.key === 'Enter') {
          this.onAdd();
        }
      });
    }

    render() {
      return global.React.createElement(_flipper.FlexColumn, {
        grow: true,
        tabIndex: -1,
        onKeyDown: this.onKeyDown
      }, global.React.createElement(WatcherPanel, {
        heading: "Expression Watcher",
        floating: false,
        padded: false
      }, global.React.createElement(_flipper.Toolbar, null, global.React.createElement(ExpressionInput, {
        value: this.state.input,
        placeholder: "Expression...",
        onChange: this.onChange,
        onKeyDown: this.onSubmit
      }), global.React.createElement(_flipper.Button, {
        onClick: this.onAdd,
        disabled: this.state.input.length === 0
      }, "Add counter")), global.React.createElement(_flipper.ManagedTable, {
        onRowHighlighted: this.onRowHighlighted,
        columnSizes: ColumnSizes,
        columns: Columns,
        rows: this.buildRows(),
        autoHeight: true,
        floating: false,
        zebra: false
      })));
    }

  }

  exports.default = LogWatcher;
},1522259620,[]);
module.exports = global.__r(-30564576).default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9fcHJlbHVkZV9fIiwiL2RhdGEvc2FuZGNhc3RsZS9ib3hlcy90cnVuay1oZy1mYmNvZGUtZmJzb3VyY2UveHBsYXQvZmxpcHBlci1wdWJsaWMvc3RhdGljL25vZGVfbW9kdWxlcy9tZXRyby9zcmMvbGliL3BvbHlmaWxscy9yZXF1aXJlLmpzIiwiL2RhdGEvc2FuZGNhc3RsZS9ib3hlcy90cnVuay1oZy1mYmNvZGUtZmJzb3VyY2UveHBsYXQvZmxpcHBlci1wdWJsaWMvc3JjL3BsdWdpbnMvbG9ncy9pbmRleC5qcyIsIi9kYXRhL3NhbmRjYXN0bGUvYm94ZXMvdHJ1bmstaGctZmJjb2RlLWZic291cmNlL3hwbGF0L2ZsaXBwZXItcHVibGljL3NyYy9wbHVnaW5zL2xvZ3MvTG9nV2F0Y2hlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19ERVZfXz1mYWxzZSxfX0JVTkRMRV9TVEFSVF9USU1FX189dGhpcy5uYXRpdmVQZXJmb3JtYW5jZU5vdz9uYXRpdmVQZXJmb3JtYW5jZU5vdygpOkRhdGUubm93KCkscHJvY2Vzcz10aGlzLnByb2Nlc3N8fHt9O3Byb2Nlc3MuZW52PXByb2Nlc3MuZW52fHx7fTtwcm9jZXNzLmVudi5OT0RFX0VOVj1cInByb2R1Y3Rpb25cIjsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBwb2x5ZmlsbFxuICpcbiAqIEBmb3JtYXRcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLyogZXNsaW50LWRpc2FibGUgbm8tYml0d2lzZSAqL1xuXG5nbG9iYWwuX19yID0gbWV0cm9SZXF1aXJlO1xuZ2xvYmFsLl9fZCA9IGRlZmluZTtcbmdsb2JhbC5fX2MgPSBjbGVhcjtcblxudmFyIG1vZHVsZXMgPSBjbGVhcigpO1xuXG4vLyBEb24ndCB1c2UgYSBTeW1ib2wgaGVyZSwgaXQgd291bGQgcHVsbCBpbiBhbiBleHRyYSBwb2x5ZmlsbCB3aXRoIGFsbCBzb3J0cyBvZlxuLy8gYWRkaXRpb25hbCBzdHVmZiAoZS5nLiBBcnJheS5mcm9tKS5cbnZhciBFTVBUWSA9IHt9O1xudmFyIF9yZWYgPSB7fSxcbiAgaGFzT3duUHJvcGVydHkgPSBfcmVmLmhhc093blByb3BlcnR5O1xuXG5mdW5jdGlvbiBjbGVhcigpIHtcbiAgbW9kdWxlcyA9XG4gICAgdHlwZW9mIF9fTlVNX01PRFVMRVNfXyA9PT0gXCJudW1iZXJcIlxuICAgICAgPyBBcnJheShfX05VTV9NT0RVTEVTX18gfCAwKVxuICAgICAgOiBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIC8vIFdlIHJldHVybiBtb2R1bGVzIGhlcmUgc28gdGhhdCB3ZSBjYW4gYXNzaWduIGFuIGluaXRpYWwgdmFsdWUgdG8gbW9kdWxlc1xuICAvLyB3aGVuIGRlZmluaW5nIGl0LiBPdGhlcndpc2UsIHdlIHdvdWxkIGhhdmUgdG8gZG8gXCJsZXQgbW9kdWxlcyA9IG51bGxcIixcbiAgLy8gd2hpY2ggd2lsbCBmb3JjZSB1cyB0byBhZGQgXCJudWxsdGhyb3dzXCIgZXZlcnl3aGVyZS5cbiAgcmV0dXJuIG1vZHVsZXM7XG59XG5cbmlmIChfX0RFVl9fKSB7XG4gIHZhciB2ZXJib3NlTmFtZXNUb01vZHVsZUlkcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHZhciBpbml0aWFsaXppbmdNb2R1bGVJZHMgPSBbXTtcbn1cblxuZnVuY3Rpb24gZGVmaW5lKGZhY3RvcnksIG1vZHVsZUlkLCBkZXBlbmRlbmN5TWFwKSB7XG4gIGlmIChtb2R1bGVzW21vZHVsZUlkXSAhPSBudWxsKSB7XG4gICAgaWYgKF9fREVWX18pIHtcbiAgICAgIC8vIChXZSB0YWtlIGBpbnZlcnNlRGVwZW5kZW5jaWVzYCBmcm9tIGBhcmd1bWVudHNgIHRvIGF2b2lkIGFuIHVudXNlZFxuICAgICAgLy8gbmFtZWQgcGFyYW1ldGVyIGluIGBkZWZpbmVgIGluIHByb2R1Y3Rpb24uXG4gICAgICB2YXIgaW52ZXJzZURlcGVuZGVuY2llcyA9IGFyZ3VtZW50c1s0XTtcblxuICAgICAgLy8gSWYgdGhlIG1vZHVsZSBoYXMgYWxyZWFkeSBiZWVuIGRlZmluZWQgYW5kIHRoZSBkZWZpbmUgbWV0aG9kIGhhcyBiZWVuXG4gICAgICAvLyBjYWxsZWQgd2l0aCBpbnZlcnNlRGVwZW5kZW5jaWVzLCB3ZSBjYW4gaG90IHJlbG9hZCBpdC5cbiAgICAgIGlmIChpbnZlcnNlRGVwZW5kZW5jaWVzKSB7XG4gICAgICAgIGdsb2JhbC5fX2FjY2VwdChtb2R1bGVJZCwgZmFjdG9yeSwgZGVwZW5kZW5jeU1hcCwgaW52ZXJzZURlcGVuZGVuY2llcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgXCJUcnlpbmcgdG8gZGVmaW5lIHR3aWNlIG1vZHVsZSBJRCBcIiArIG1vZHVsZUlkICsgXCIgaW4gdGhlIHNhbWUgYnVuZGxlXCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwcmV2ZW50IHJlcGVhdGVkIGNhbGxzIHRvIGBnbG9iYWwubmF0aXZlUmVxdWlyZWAgdG8gb3ZlcndyaXRlIG1vZHVsZXNcbiAgICAvLyB0aGF0IGFyZSBhbHJlYWR5IGxvYWRlZFxuICAgIHJldHVybjtcbiAgfVxuICBtb2R1bGVzW21vZHVsZUlkXSA9IHtcbiAgICBkZXBlbmRlbmN5TWFwOiBkZXBlbmRlbmN5TWFwLFxuICAgIGZhY3Rvcnk6IGZhY3RvcnksXG4gICAgaGFzRXJyb3I6IGZhbHNlLFxuICAgIGltcG9ydGVkQWxsOiBFTVBUWSxcbiAgICBpbXBvcnRlZERlZmF1bHQ6IEVNUFRZLFxuICAgIGlzSW5pdGlhbGl6ZWQ6IGZhbHNlLFxuICAgIHB1YmxpY01vZHVsZTogeyBleHBvcnRzOiB7fSB9XG4gIH07XG4gIGlmIChfX0RFVl9fKSB7XG4gICAgLy8gSE1SXG4gICAgbW9kdWxlc1ttb2R1bGVJZF0uaG90ID0gY3JlYXRlSG90UmVsb2FkaW5nT2JqZWN0KCk7XG5cbiAgICAvLyBERUJVR0dBQkxFIE1PRFVMRVMgTkFNRVNcbiAgICAvLyB3ZSB0YWtlIGB2ZXJib3NlTmFtZWAgZnJvbSBgYXJndW1lbnRzYCB0byBhdm9pZCBhbiB1bnVzZWQgbmFtZWQgcGFyYW1ldGVyXG4gICAgLy8gaW4gYGRlZmluZWAgaW4gcHJvZHVjdGlvbi5cbiAgICB2YXIgX3ZlcmJvc2VOYW1lID0gYXJndW1lbnRzWzNdO1xuICAgIGlmIChfdmVyYm9zZU5hbWUpIHtcbiAgICAgIG1vZHVsZXNbbW9kdWxlSWRdLnZlcmJvc2VOYW1lID0gX3ZlcmJvc2VOYW1lO1xuICAgICAgdmVyYm9zZU5hbWVzVG9Nb2R1bGVJZHNbX3ZlcmJvc2VOYW1lXSA9IG1vZHVsZUlkO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBtZXRyb1JlcXVpcmUobW9kdWxlSWQpIHtcbiAgaWYgKF9fREVWX18gJiYgdHlwZW9mIG1vZHVsZUlkID09PSBcInN0cmluZ1wiKSB7XG4gICAgdmFyIF92ZXJib3NlTmFtZTIgPSBtb2R1bGVJZDtcbiAgICBtb2R1bGVJZCA9IHZlcmJvc2VOYW1lc1RvTW9kdWxlSWRzW192ZXJib3NlTmFtZTJdO1xuICAgIGlmIChtb2R1bGVJZCA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gbmFtZWQgbW9kdWxlOiBcIicgKyBfdmVyYm9zZU5hbWUyICsgJ1wiJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ1JlcXVpcmluZyBtb2R1bGUgXCInICtcbiAgICAgICAgICBfdmVyYm9zZU5hbWUyICtcbiAgICAgICAgICAnXCIgYnkgbmFtZSBpcyBvbmx5IHN1cHBvcnRlZCBmb3IgJyArXG4gICAgICAgICAgXCJkZWJ1Z2dpbmcgcHVycG9zZXMgYW5kIHdpbGwgQlJFQUsgSU4gUFJPRFVDVElPTiFcIlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvLyRGbG93Rml4TWU6IGF0IHRoaXMgcG9pbnQgd2Uga25vdyB0aGF0IG1vZHVsZUlkIGlzIGEgbnVtYmVyXG4gIHZhciBtb2R1bGVJZFJlYWxseUlzTnVtYmVyID0gbW9kdWxlSWQ7XG5cbiAgaWYgKF9fREVWX18pIHtcbiAgICB2YXIgaW5pdGlhbGl6aW5nSW5kZXggPSBpbml0aWFsaXppbmdNb2R1bGVJZHMuaW5kZXhPZihcbiAgICAgIG1vZHVsZUlkUmVhbGx5SXNOdW1iZXJcbiAgICApO1xuICAgIGlmIChpbml0aWFsaXppbmdJbmRleCAhPT0gLTEpIHtcbiAgICAgIHZhciBjeWNsZSA9IGluaXRpYWxpemluZ01vZHVsZUlkc1xuICAgICAgICAuc2xpY2UoaW5pdGlhbGl6aW5nSW5kZXgpXG4gICAgICAgIC5tYXAoZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICByZXR1cm4gbW9kdWxlc1tpZF0udmVyYm9zZU5hbWU7XG4gICAgICAgIH0pO1xuICAgICAgLy8gV2Ugd2FudCB0byBzaG93IEEgLT4gQiAtPiBBOlxuICAgICAgY3ljbGUucHVzaChjeWNsZVswXSk7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIFwiUmVxdWlyZSBjeWNsZTogXCIgK1xuICAgICAgICAgIGN5Y2xlLmpvaW4oXCIgLT4gXCIpICtcbiAgICAgICAgICBcIlxcblxcblwiICtcbiAgICAgICAgICBcIlJlcXVpcmUgY3ljbGVzIGFyZSBhbGxvd2VkLCBidXQgY2FuIHJlc3VsdCBpbiB1bmluaXRpYWxpemVkIHZhbHVlcy4gXCIgK1xuICAgICAgICAgIFwiQ29uc2lkZXIgcmVmYWN0b3JpbmcgdG8gcmVtb3ZlIHRoZSBuZWVkIGZvciBhIGN5Y2xlLlwiXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHZhciBtb2R1bGUgPSBtb2R1bGVzW21vZHVsZUlkUmVhbGx5SXNOdW1iZXJdO1xuXG4gIHJldHVybiBtb2R1bGUgJiYgbW9kdWxlLmlzSW5pdGlhbGl6ZWRcbiAgICA/IG1vZHVsZS5wdWJsaWNNb2R1bGUuZXhwb3J0c1xuICAgIDogZ3VhcmRlZExvYWRNb2R1bGUobW9kdWxlSWRSZWFsbHlJc051bWJlciwgbW9kdWxlKTtcbn1cblxuZnVuY3Rpb24gbWV0cm9JbXBvcnREZWZhdWx0KG1vZHVsZUlkKSB7XG4gIGlmIChfX0RFVl9fICYmIHR5cGVvZiBtb2R1bGVJZCA9PT0gXCJzdHJpbmdcIikge1xuICAgIHZhciBfdmVyYm9zZU5hbWUzID0gbW9kdWxlSWQ7XG4gICAgbW9kdWxlSWQgPSB2ZXJib3NlTmFtZXNUb01vZHVsZUlkc1tfdmVyYm9zZU5hbWUzXTtcbiAgfVxuXG4gIC8vJEZsb3dGaXhNZTogYXQgdGhpcyBwb2ludCB3ZSBrbm93IHRoYXQgbW9kdWxlSWQgaXMgYSBudW1iZXJcbiAgdmFyIG1vZHVsZUlkUmVhbGx5SXNOdW1iZXIgPSBtb2R1bGVJZDtcblxuICBpZiAoXG4gICAgbW9kdWxlc1ttb2R1bGVJZFJlYWxseUlzTnVtYmVyXSAmJlxuICAgIG1vZHVsZXNbbW9kdWxlSWRSZWFsbHlJc051bWJlcl0uaW1wb3J0ZWREZWZhdWx0ICE9PSBFTVBUWVxuICApIHtcbiAgICByZXR1cm4gbW9kdWxlc1ttb2R1bGVJZFJlYWxseUlzTnVtYmVyXS5pbXBvcnRlZERlZmF1bHQ7XG4gIH1cblxuICB2YXIgZXhwb3J0cyA9IG1ldHJvUmVxdWlyZShtb2R1bGVJZFJlYWxseUlzTnVtYmVyKTtcbiAgdmFyIGltcG9ydGVkRGVmYXVsdCA9XG4gICAgZXhwb3J0cyAmJiBleHBvcnRzLl9fZXNNb2R1bGUgPyBleHBvcnRzLmRlZmF1bHQgOiBleHBvcnRzO1xuXG4gIHJldHVybiAobW9kdWxlc1ttb2R1bGVJZFJlYWxseUlzTnVtYmVyXS5pbXBvcnRlZERlZmF1bHQgPSBpbXBvcnRlZERlZmF1bHQpO1xufVxuXG5mdW5jdGlvbiBtZXRyb0ltcG9ydEFsbChtb2R1bGVJZCkge1xuICBpZiAoX19ERVZfXyAmJiB0eXBlb2YgbW9kdWxlSWQgPT09IFwic3RyaW5nXCIpIHtcbiAgICB2YXIgX3ZlcmJvc2VOYW1lNCA9IG1vZHVsZUlkO1xuICAgIG1vZHVsZUlkID0gdmVyYm9zZU5hbWVzVG9Nb2R1bGVJZHNbX3ZlcmJvc2VOYW1lNF07XG4gIH1cblxuICAvLyRGbG93Rml4TWU6IGF0IHRoaXMgcG9pbnQgd2Uga25vdyB0aGF0IG1vZHVsZUlkIGlzIGEgbnVtYmVyXG4gIHZhciBtb2R1bGVJZFJlYWxseUlzTnVtYmVyID0gbW9kdWxlSWQ7XG5cbiAgaWYgKFxuICAgIG1vZHVsZXNbbW9kdWxlSWRSZWFsbHlJc051bWJlcl0gJiZcbiAgICBtb2R1bGVzW21vZHVsZUlkUmVhbGx5SXNOdW1iZXJdLmltcG9ydGVkQWxsICE9PSBFTVBUWVxuICApIHtcbiAgICByZXR1cm4gbW9kdWxlc1ttb2R1bGVJZFJlYWxseUlzTnVtYmVyXS5pbXBvcnRlZEFsbDtcbiAgfVxuXG4gIHZhciBleHBvcnRzID0gbWV0cm9SZXF1aXJlKG1vZHVsZUlkUmVhbGx5SXNOdW1iZXIpO1xuICB2YXIgaW1wb3J0ZWRBbGwgPSB2b2lkIDA7XG5cbiAgaWYgKGV4cG9ydHMgJiYgZXhwb3J0cy5fX2VzTW9kdWxlKSB7XG4gICAgaW1wb3J0ZWRBbGwgPSBleHBvcnRzO1xuICB9IGVsc2Uge1xuICAgIGltcG9ydGVkQWxsID0ge307XG5cbiAgICAvLyBSZWZyYWluIGZyb20gdXNpbmcgT2JqZWN0LmFzc2lnbiwgaXQgaGFzIHRvIHdvcmsgaW4gRVMzIGVudmlyb25tZW50cy5cbiAgICBpZiAoZXhwb3J0cykge1xuICAgICAgZm9yICh2YXIgX2tleSBpbiBleHBvcnRzKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIF9rZXkpKSB7XG4gICAgICAgICAgaW1wb3J0ZWRBbGxbX2tleV0gPSBleHBvcnRzW19rZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaW1wb3J0ZWRBbGwuZGVmYXVsdCA9IGV4cG9ydHM7XG4gIH1cblxuICByZXR1cm4gKG1vZHVsZXNbbW9kdWxlSWRSZWFsbHlJc051bWJlcl0uaW1wb3J0ZWRBbGwgPSBpbXBvcnRlZEFsbCk7XG59XG5cbnZhciBpbkd1YXJkID0gZmFsc2U7XG5mdW5jdGlvbiBndWFyZGVkTG9hZE1vZHVsZShtb2R1bGVJZCwgbW9kdWxlKSB7XG4gIGlmICghaW5HdWFyZCAmJiBnbG9iYWwuRXJyb3JVdGlscykge1xuICAgIGluR3VhcmQgPSB0cnVlO1xuICAgIHZhciByZXR1cm5WYWx1ZSA9IHZvaWQgMDtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuVmFsdWUgPSBsb2FkTW9kdWxlSW1wbGVtZW50YXRpb24obW9kdWxlSWQsIG1vZHVsZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZ2xvYmFsLkVycm9yVXRpbHMucmVwb3J0RmF0YWxFcnJvcihlKTtcbiAgICB9XG4gICAgaW5HdWFyZCA9IGZhbHNlO1xuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbG9hZE1vZHVsZUltcGxlbWVudGF0aW9uKG1vZHVsZUlkLCBtb2R1bGUpO1xuICB9XG59XG5cbnZhciBJRF9NQVNLX1NISUZUID0gMTY7XG52YXIgTE9DQUxfSURfTUFTSyA9IH4wID4+PiBJRF9NQVNLX1NISUZUO1xuXG5mdW5jdGlvbiB1bnBhY2tNb2R1bGVJZChtb2R1bGVJZCkge1xuICB2YXIgc2VnbWVudElkID0gbW9kdWxlSWQgPj4+IElEX01BU0tfU0hJRlQ7XG4gIHZhciBsb2NhbElkID0gbW9kdWxlSWQgJiBMT0NBTF9JRF9NQVNLO1xuICByZXR1cm4geyBzZWdtZW50SWQ6IHNlZ21lbnRJZCwgbG9jYWxJZDogbG9jYWxJZCB9O1xufVxubWV0cm9SZXF1aXJlLnVucGFja01vZHVsZUlkID0gdW5wYWNrTW9kdWxlSWQ7XG5cbmZ1bmN0aW9uIHBhY2tNb2R1bGVJZCh2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlLnNlZ21lbnRJZCA8PCBJRF9NQVNLX1NISUZUKSArIHZhbHVlLmxvY2FsSWQ7XG59XG5tZXRyb1JlcXVpcmUucGFja01vZHVsZUlkID0gcGFja01vZHVsZUlkO1xuXG52YXIgaG9va3MgPSBbXTtcbmZ1bmN0aW9uIHJlZ2lzdGVySG9vayhjYikge1xuICB2YXIgaG9vayA9IHsgY2I6IGNiIH07XG4gIGhvb2tzLnB1c2goaG9vayk7XG4gIHJldHVybiB7XG4gICAgcmVsZWFzZTogZnVuY3Rpb24gcmVsZWFzZSgpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaG9va3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKGhvb2tzW2ldID09PSBob29rKSB7XG4gICAgICAgICAgaG9va3Muc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxubWV0cm9SZXF1aXJlLnJlZ2lzdGVySG9vayA9IHJlZ2lzdGVySG9vaztcblxuZnVuY3Rpb24gbG9hZE1vZHVsZUltcGxlbWVudGF0aW9uKG1vZHVsZUlkLCBtb2R1bGUpIHtcbiAgaWYgKCFtb2R1bGUgJiYgZ2xvYmFsLl9fZGVmaW5lTW9kdWxlKSB7XG4gICAgZ2xvYmFsLl9fZGVmaW5lTW9kdWxlKG1vZHVsZUlkKTtcbiAgICBtb2R1bGUgPSBtb2R1bGVzW21vZHVsZUlkXTtcbiAgfVxuXG4gIHZhciBuYXRpdmVSZXF1aXJlID0gZ2xvYmFsLm5hdGl2ZVJlcXVpcmU7XG4gIGlmICghbW9kdWxlICYmIG5hdGl2ZVJlcXVpcmUpIHtcbiAgICB2YXIgX3VucGFja01vZHVsZUlkID0gdW5wYWNrTW9kdWxlSWQobW9kdWxlSWQpLFxuICAgICAgX3NlZ21lbnRJZCA9IF91bnBhY2tNb2R1bGVJZC5zZWdtZW50SWQsXG4gICAgICBfbG9jYWxJZCA9IF91bnBhY2tNb2R1bGVJZC5sb2NhbElkO1xuXG4gICAgbmF0aXZlUmVxdWlyZShfbG9jYWxJZCwgX3NlZ21lbnRJZCk7XG4gICAgbW9kdWxlID0gbW9kdWxlc1ttb2R1bGVJZF07XG4gIH1cblxuICBpZiAoIW1vZHVsZSkge1xuICAgIHRocm93IHVua25vd25Nb2R1bGVFcnJvcihtb2R1bGVJZCk7XG4gIH1cblxuICBpZiAobW9kdWxlLmhhc0Vycm9yKSB7XG4gICAgdGhyb3cgbW9kdWxlVGhyZXdFcnJvcihtb2R1bGVJZCwgbW9kdWxlLmVycm9yKTtcbiAgfVxuXG4gIC8vIGBtZXRyb1JlcXVpcmVgIGNhbGxzIGludG8gdGhlIHJlcXVpcmUgcG9seWZpbGwgaXRzZWxmIGFyZSBub3QgYW5hbHl6ZWQgYW5kXG4gIC8vIHJlcGxhY2VkIHNvIHRoYXQgdGhleSB1c2UgbnVtZXJpYyBtb2R1bGUgSURzLlxuICAvLyBUaGUgc3lzdHJhY2UgbW9kdWxlIHdpbGwgZXhwb3NlIGl0c2VsZiBvbiB0aGUgbWV0cm9SZXF1aXJlIGZ1bmN0aW9uIHNvIHRoYXRcbiAgLy8gaXQgY2FuIGJlIHVzZWQgaGVyZS5cbiAgLy8gVE9ETyhkYXZpZGF1cmVsaW8pIFNjYW4gcG9seWZpbGxzIGZvciBkZXBlbmRlbmNpZXMsIHRvbyAodDk3NTk2ODYpXG4gIGlmIChfX0RFVl9fKSB7XG4gICAgdmFyIFN5c3RyYWNlID0gbWV0cm9SZXF1aXJlLlN5c3RyYWNlO1xuICB9XG5cbiAgLy8gV2UgbXVzdCBvcHRpbWlzdGljYWxseSBtYXJrIG1vZHVsZSBhcyBpbml0aWFsaXplZCBiZWZvcmUgcnVubmluZyB0aGVcbiAgLy8gZmFjdG9yeSB0byBrZWVwIGFueSByZXF1aXJlIGN5Y2xlcyBpbnNpZGUgdGhlIGZhY3RvcnkgZnJvbSBjYXVzaW5nIGFuXG4gIC8vIGluZmluaXRlIHJlcXVpcmUgbG9vcC5cbiAgbW9kdWxlLmlzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gIHZhciBfbW9kdWxlID0gbW9kdWxlLFxuICAgIGZhY3RvcnkgPSBfbW9kdWxlLmZhY3RvcnksXG4gICAgZGVwZW5kZW5jeU1hcCA9IF9tb2R1bGUuZGVwZW5kZW5jeU1hcDtcblxuICBpZiAoX19ERVZfXykge1xuICAgIGluaXRpYWxpemluZ01vZHVsZUlkcy5wdXNoKG1vZHVsZUlkKTtcbiAgfVxuICB0cnkge1xuICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICAvLyAkRmxvd0ZpeE1lOiB3ZSBrbm93IHRoYXQgX19ERVZfXyBpcyBjb25zdCBhbmQgYFN5c3RyYWNlYCBleGlzdHNcbiAgICAgIFN5c3RyYWNlLmJlZ2luRXZlbnQoXCJKU19yZXF1aXJlX1wiICsgKG1vZHVsZS52ZXJib3NlTmFtZSB8fCBtb2R1bGVJZCkpO1xuICAgIH1cblxuICAgIHZhciBfbW9kdWxlT2JqZWN0ID0gbW9kdWxlLnB1YmxpY01vZHVsZTtcblxuICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICBpZiAobW9kdWxlLmhvdCkge1xuICAgICAgICBfbW9kdWxlT2JqZWN0LmhvdCA9IG1vZHVsZS5ob3Q7XG4gICAgICB9XG4gICAgfVxuICAgIF9tb2R1bGVPYmplY3QuaWQgPSBtb2R1bGVJZDtcblxuICAgIGlmIChob29rcy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhvb2tzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGhvb2tzW2ldLmNiKG1vZHVsZUlkLCBfbW9kdWxlT2JqZWN0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBrZWVwIGFyZ3MgaW4gc3luYyB3aXRoIHdpdGggZGVmaW5lTW9kdWxlQ29kZSBpblxuICAgIC8vIG1ldHJvL3NyYy9SZXNvbHZlci9pbmRleC5qc1xuICAgIC8vIGFuZCBtZXRyby9zcmMvTW9kdWxlR3JhcGgvd29ya2VyLmpzXG4gICAgZmFjdG9yeShcbiAgICAgIGdsb2JhbCxcbiAgICAgIG1ldHJvUmVxdWlyZSxcbiAgICAgIG1ldHJvSW1wb3J0RGVmYXVsdCxcbiAgICAgIG1ldHJvSW1wb3J0QWxsLFxuICAgICAgX21vZHVsZU9iamVjdCxcbiAgICAgIF9tb2R1bGVPYmplY3QuZXhwb3J0cyxcbiAgICAgIGRlcGVuZGVuY3lNYXBcbiAgICApO1xuXG4gICAgLy8gYXZvaWQgcmVtb3ZpbmcgZmFjdG9yeSBpbiBERVYgbW9kZSBhcyBpdCBicmVha3MgSE1SXG4gICAgaWYgKCFfX0RFVl9fKSB7XG4gICAgICAvLyAkRmxvd0ZpeE1lOiBUaGlzIGlzIG9ubHkgc291bmQgYmVjYXVzZSB3ZSBuZXZlciBhY2Nlc3MgYGZhY3RvcnlgIGFnYWluXG4gICAgICBtb2R1bGUuZmFjdG9yeSA9IHVuZGVmaW5lZDtcbiAgICAgIG1vZHVsZS5kZXBlbmRlbmN5TWFwID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICAvLyAkRmxvd0ZpeE1lOiB3ZSBrbm93IHRoYXQgX19ERVZfXyBpcyBjb25zdCBhbmQgYFN5c3RyYWNlYCBleGlzdHNcbiAgICAgIFN5c3RyYWNlLmVuZEV2ZW50KCk7XG4gICAgfVxuICAgIHJldHVybiBfbW9kdWxlT2JqZWN0LmV4cG9ydHM7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBtb2R1bGUuaGFzRXJyb3IgPSB0cnVlO1xuICAgIG1vZHVsZS5lcnJvciA9IGU7XG4gICAgbW9kdWxlLmlzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICBtb2R1bGUucHVibGljTW9kdWxlLmV4cG9ydHMgPSB1bmRlZmluZWQ7XG4gICAgdGhyb3cgZTtcbiAgfSBmaW5hbGx5IHtcbiAgICBpZiAoX19ERVZfXykge1xuICAgICAgaWYgKGluaXRpYWxpemluZ01vZHVsZUlkcy5wb3AoKSAhPT0gbW9kdWxlSWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIFwiaW5pdGlhbGl6aW5nTW9kdWxlSWRzIGlzIGNvcnJ1cHQ7IHNvbWV0aGluZyBpcyB0ZXJyaWJseSB3cm9uZ1wiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHVua25vd25Nb2R1bGVFcnJvcihpZCkge1xuICB2YXIgbWVzc2FnZSA9ICdSZXF1aXJpbmcgdW5rbm93biBtb2R1bGUgXCInICsgaWQgKyAnXCIuJztcbiAgaWYgKF9fREVWX18pIHtcbiAgICBtZXNzYWdlICs9XG4gICAgICBcIklmIHlvdSBhcmUgc3VyZSB0aGUgbW9kdWxlIGlzIHRoZXJlLCB0cnkgcmVzdGFydGluZyBNZXRybyBCdW5kbGVyLiBcIiArXG4gICAgICBcIllvdSBtYXkgYWxzbyB3YW50IHRvIHJ1biBgeWFybmAsIG9yIGBucG0gaW5zdGFsbGAgKGRlcGVuZGluZyBvbiB5b3VyIGVudmlyb25tZW50KS5cIjtcbiAgfVxuICByZXR1cm4gRXJyb3IobWVzc2FnZSk7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZVRocmV3RXJyb3IoaWQsIGVycm9yKSB7XG4gIHZhciBkaXNwbGF5TmFtZSA9IChfX0RFVl9fICYmIG1vZHVsZXNbaWRdICYmIG1vZHVsZXNbaWRdLnZlcmJvc2VOYW1lKSB8fCBpZDtcbiAgcmV0dXJuIEVycm9yKFxuICAgICdSZXF1aXJpbmcgbW9kdWxlIFwiJyArIGRpc3BsYXlOYW1lICsgJ1wiLCB3aGljaCB0aHJldyBhbiBleGNlcHRpb246ICcgKyBlcnJvclxuICApO1xufVxuXG5pZiAoX19ERVZfXykge1xuICBtZXRyb1JlcXVpcmUuU3lzdHJhY2UgPSB7XG4gICAgYmVnaW5FdmVudDogZnVuY3Rpb24gYmVnaW5FdmVudCgpIHt9LFxuICAgIGVuZEV2ZW50OiBmdW5jdGlvbiBlbmRFdmVudCgpIHt9XG4gIH07XG5cbiAgbWV0cm9SZXF1aXJlLmdldE1vZHVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbW9kdWxlcztcbiAgfTtcblxuICAvLyBIT1QgTU9EVUxFIFJFTE9BRElOR1xuICB2YXIgY3JlYXRlSG90UmVsb2FkaW5nT2JqZWN0ID0gZnVuY3Rpb24gY3JlYXRlSG90UmVsb2FkaW5nT2JqZWN0KCkge1xuICAgIHZhciBob3QgPSB7XG4gICAgICBhY2NlcHRDYWxsYmFjazogbnVsbCxcbiAgICAgIGFjY2VwdDogZnVuY3Rpb24gYWNjZXB0KGNhbGxiYWNrKSB7XG4gICAgICAgIGhvdC5hY2NlcHRDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgfSxcbiAgICAgIGRpc3Bvc2VDYWxsYmFjazogbnVsbCxcbiAgICAgIGRpc3Bvc2U6IGZ1bmN0aW9uIGRpc3Bvc2UoY2FsbGJhY2spIHtcbiAgICAgICAgaG90LmRpc3Bvc2VDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGhvdDtcbiAgfTtcblxuICB2YXIgbWV0cm9BY2NlcHRBbGwgPSBmdW5jdGlvbiBtZXRyb0FjY2VwdEFsbChcbiAgICBkZXBlbmRlbnRNb2R1bGVzLFxuICAgIGludmVyc2VEZXBlbmRlbmNpZXMsXG4gICAgcGF0Y2hlZE1vZHVsZXNcbiAgKSB7XG4gICAgaWYgKCFkZXBlbmRlbnRNb2R1bGVzIHx8IGRlcGVuZGVudE1vZHVsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgbm90QWNjZXB0ZWQgPSBkZXBlbmRlbnRNb2R1bGVzLmZpbHRlcihmdW5jdGlvbihtb2R1bGUpIHtcbiAgICAgIHJldHVybiAhbWV0cm9BY2NlcHQoXG4gICAgICAgIG1vZHVsZSxcbiAgICAgICAgLypmYWN0b3J5Ki8gdW5kZWZpbmVkLFxuICAgICAgICAvKmRlcGVuZGVuY3lNYXAqLyB1bmRlZmluZWQsXG4gICAgICAgIGludmVyc2VEZXBlbmRlbmNpZXMsXG4gICAgICAgIHBhdGNoZWRNb2R1bGVzXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgdmFyIHBhcmVudHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vdEFjY2VwdGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBpZiB0aGUgbW9kdWxlIGhhcyBubyBwYXJlbnRzIHRoZW4gdGhlIGNoYW5nZSBjYW5ub3QgYmUgaG90IGxvYWRlZFxuICAgICAgaWYgKGludmVyc2VEZXBlbmRlbmNpZXNbbm90QWNjZXB0ZWRbaV1dLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHBhcmVudHMucHVzaC5hcHBseShwYXJlbnRzLCBpbnZlcnNlRGVwZW5kZW5jaWVzW25vdEFjY2VwdGVkW2ldXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmVudHMubGVuZ3RoID09IDA7XG4gIH07XG5cbiAgdmFyIG1ldHJvQWNjZXB0ID0gZnVuY3Rpb24gbWV0cm9BY2NlcHQoXG4gICAgaWQsXG4gICAgZmFjdG9yeSxcbiAgICBkZXBlbmRlbmN5TWFwLFxuICAgIGludmVyc2VEZXBlbmRlbmNpZXNcbiAgKSB7XG4gICAgdmFyIHBhdGNoZWRNb2R1bGVzID1cbiAgICAgIGFyZ3VtZW50cy5sZW5ndGggPiA0ICYmIGFyZ3VtZW50c1s0XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzRdIDoge307XG5cbiAgICBpZiAoaWQgaW4gcGF0Y2hlZE1vZHVsZXMpIHtcbiAgICAgIC8vIERvIG5vdCBwYXRjaCB0aGUgc2FtZSBtb2R1bGUgbW9yZSB0aGF0IG9uY2UgZHVyaW5nIGFuIHVwZGF0ZS5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBwYXRjaGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXG4gICAgdmFyIG1vZCA9IG1vZHVsZXNbaWRdO1xuXG4gICAgaWYgKCFtb2QgJiYgZmFjdG9yeSkge1xuICAgICAgLy8gTmV3IG1vZHVsZXMgYXJlIGdvaW5nIHRvIGJlIGhhbmRsZWQgYnkgdGhlIGRlZmluZSgpIG1ldGhvZC5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhciBob3QgPSBtb2QuaG90O1xuXG4gICAgaWYgKCFob3QpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgXCJDYW5ub3QgYWNjZXB0IG1vZHVsZSBiZWNhdXNlIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnQgXCIgK1xuICAgICAgICAgIFwiQVBJIHdhcyBub3QgaW5zdGFsbGVkLlwiXG4gICAgICApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChob3QuZGlzcG9zZUNhbGxiYWNrKSB7XG4gICAgICB0cnkge1xuICAgICAgICBob3QuZGlzcG9zZUNhbGxiYWNrKCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIFwiRXJyb3Igd2hpbGUgY2FsbGluZyBkaXNwb3NlIGhhbmRsZXIgZm9yIG1vZHVsZSBcIiArIGlkICsgXCI6IFwiLFxuICAgICAgICAgIGVycm9yXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmVwbGFjZSBhbmQgaW5pdGlhbGl6ZSBmYWN0b3J5XG4gICAgaWYgKGZhY3RvcnkpIHtcbiAgICAgIG1vZC5mYWN0b3J5ID0gZmFjdG9yeTtcbiAgICB9XG4gICAgaWYgKGRlcGVuZGVuY3lNYXApIHtcbiAgICAgIG1vZC5kZXBlbmRlbmN5TWFwID0gZGVwZW5kZW5jeU1hcDtcbiAgICB9XG4gICAgbW9kLmhhc0Vycm9yID0gZmFsc2U7XG4gICAgbW9kLmlzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICBtZXRyb1JlcXVpcmUoaWQpO1xuXG4gICAgaWYgKGhvdC5hY2NlcHRDYWxsYmFjaykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaG90LmFjY2VwdENhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBcIkVycm9yIHdoaWxlIGNhbGxpbmcgYWNjZXB0IGhhbmRsZXIgZm9yIG1vZHVsZSBcIiArIGlkICsgXCI6IFwiLFxuICAgICAgICAgIGVycm9yXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gbmVlZCB0byBoYXZlIGludmVyc2VEZXBlbmRlbmNpZXMgdG8gYnViYmxlIHVwIGFjY2VwdFxuICAgIGlmICghaW52ZXJzZURlcGVuZGVuY2llcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5kZWZpbmVkIGBpbnZlcnNlRGVwZW5kZW5jaWVzYFwiKTtcbiAgICB9XG5cbiAgICAvLyBhY2NlcHQgcGFyZW50IG1vZHVsZXMgcmVjdXJzaXZlbHkgdXAgdW50aWwgYWxsIHNpYmxpbmdzIGFyZSBhY2NlcHRlZFxuICAgIHJldHVybiBtZXRyb0FjY2VwdEFsbChcbiAgICAgIGludmVyc2VEZXBlbmRlbmNpZXNbaWRdLFxuICAgICAgaW52ZXJzZURlcGVuZGVuY2llcyxcbiAgICAgIHBhdGNoZWRNb2R1bGVzXG4gICAgKTtcbiAgfTtcblxuICBnbG9iYWwuX19hY2NlcHQgPSBtZXRyb0FjY2VwdDtcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTgtcHJlc2VudCBGYWNlYm9vay5cbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICogQGZvcm1hdFxuICovXG5cbmltcG9ydCB0eXBlIHtcbiAgVGFibGVCb2R5Um93LFxuICBUYWJsZUNvbHVtbk9yZGVyLFxuICBUYWJsZUNvbHVtblNpemVzLFxuICBUYWJsZUNvbHVtbnMsXG59IGZyb20gJ2ZsaXBwZXInO1xuaW1wb3J0IHR5cGUge0NvdW50ZXJ9IGZyb20gJy4vTG9nV2F0Y2hlci5qcyc7XG5pbXBvcnQgdHlwZSB7RGV2aWNlTG9nRW50cnl9IGZyb20gJy4uLy4uL2RldmljZXMvQmFzZURldmljZS5qcyc7XG5pbXBvcnQgdHlwZSB7UHJvcHMgYXMgUGx1Z2luUHJvcHN9IGZyb20gJy4uLy4uL3BsdWdpbic7XG5cbmltcG9ydCB7XG4gIFRleHQsXG4gIE1hbmFnZWRUYWJsZSxcbiAgQnV0dG9uLFxuICBjb2xvcnMsXG4gIENvbnRleHRNZW51LFxuICBGbGV4Q29sdW1uLFxuICBHbHlwaCxcbiAgRGV0YWlsU2lkZWJhcixcbiAgRmxpcHBlckRldmljZVBsdWdpbixcbiAgU2VhcmNoYWJsZVRhYmxlLFxuICBzdHlsZWQsXG4gIERldmljZSxcbiAgY3JlYXRlUGFzdGUsXG4gIHRleHRDb250ZW50LFxufSBmcm9tICdmbGlwcGVyJztcbmltcG9ydCBMb2dXYXRjaGVyIGZyb20gJy4vTG9nV2F0Y2hlcic7XG5cbmNvbnN0IExPR19XQVRDSEVSX0xPQ0FMX1NUT1JBR0VfS0VZID0gJ0xPR19XQVRDSEVSX0xPQ0FMX1NUT1JBR0VfS0VZJztcblxudHlwZSBFbnRyaWVzID0gQXJyYXk8e1xuICByb3c6IFRhYmxlQm9keVJvdyxcbiAgZW50cnk6IERldmljZUxvZ0VudHJ5LFxufT47XG5cbnR5cGUgU3RhdGUgPSB7fFxuICByb3dzOiBBcnJheTxUYWJsZUJvZHlSb3c+LFxuICBlbnRyaWVzOiBFbnRyaWVzLFxuICBrZXkyZW50cnk6IHtba2V5OiBzdHJpbmddOiBEZXZpY2VMb2dFbnRyeX0sXG4gIGhpZ2hsaWdodGVkUm93czogU2V0PHN0cmluZz4sXG4gIGNvdW50ZXJzOiBBcnJheTxDb3VudGVyPixcbnx9O1xuXG50eXBlIEFjdGlvbnMgPSB7fHx9O1xuXG50eXBlIFBlcnNpc3RlZFN0YXRlID0ge3x8fTtcblxuY29uc3QgSWNvbiA9IHN0eWxlZChHbHlwaCkoe1xuICBtYXJnaW5Ub3A6IDUsXG59KTtcblxuZnVuY3Rpb24gZ2V0TGluZUNvdW50KHN0cjogc3RyaW5nKTogbnVtYmVyIHtcbiAgbGV0IGNvdW50ID0gMTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3RyW2ldID09PSAnXFxuJykge1xuICAgICAgY291bnQrKztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufVxuXG5mdW5jdGlvbiBrZWVwS2V5cyhvYmosIGtleXMpIHtcbiAgY29uc3QgcmVzdWx0ID0ge307XG4gIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgIGlmIChrZXlzLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gb2JqW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmNvbnN0IENPTFVNTl9TSVpFID0ge1xuICB0eXBlOiA0MCxcbiAgdGltZTogMTIwLFxuICBwaWQ6IDYwLFxuICB0aWQ6IDYwLFxuICB0YWc6IDEyMCxcbiAgYXBwOiAyMDAsXG4gIG1lc3NhZ2U6ICdmbGV4Jyxcbn07XG5cbmNvbnN0IENPTFVNTlMgPSB7XG4gIHR5cGU6IHtcbiAgICB2YWx1ZTogJycsXG4gIH0sXG4gIHRpbWU6IHtcbiAgICB2YWx1ZTogJ1RpbWUnLFxuICB9LFxuICBwaWQ6IHtcbiAgICB2YWx1ZTogJ1BJRCcsXG4gIH0sXG4gIHRpZDoge1xuICAgIHZhbHVlOiAnVElEJyxcbiAgfSxcbiAgdGFnOiB7XG4gICAgdmFsdWU6ICdUYWcnLFxuICB9LFxuICBhcHA6IHtcbiAgICB2YWx1ZTogJ0FwcCcsXG4gIH0sXG4gIG1lc3NhZ2U6IHtcbiAgICB2YWx1ZTogJ01lc3NhZ2UnLFxuICB9LFxufTtcblxuY29uc3QgSU5JVElBTF9DT0xVTU5fT1JERVIgPSBbXG4gIHtcbiAgICBrZXk6ICd0eXBlJyxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICB9LFxuICB7XG4gICAga2V5OiAndGltZScsXG4gICAgdmlzaWJsZTogZmFsc2UsXG4gIH0sXG4gIHtcbiAgICBrZXk6ICdwaWQnLFxuICAgIHZpc2libGU6IGZhbHNlLFxuICB9LFxuICB7XG4gICAga2V5OiAndGlkJyxcbiAgICB2aXNpYmxlOiBmYWxzZSxcbiAgfSxcbiAge1xuICAgIGtleTogJ3RhZycsXG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIGtleTogJ2FwcCcsXG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIGtleTogJ21lc3NhZ2UnLFxuICAgIHZpc2libGU6IHRydWUsXG4gIH0sXG5dO1xuXG5jb25zdCBMT0dfVFlQRVM6IHtcbiAgW2xldmVsOiBzdHJpbmddOiB7XG4gICAgbGFiZWw6IHN0cmluZyxcbiAgICBjb2xvcjogc3RyaW5nLFxuICAgIGljb24/OiBSZWFjdC5Ob2RlLFxuICAgIHN0eWxlPzogT2JqZWN0LFxuICB9LFxufSA9IHtcbiAgdmVyYm9zZToge1xuICAgIGxhYmVsOiAnVmVyYm9zZScsXG4gICAgY29sb3I6IGNvbG9ycy5wdXJwbGUsXG4gIH0sXG4gIGRlYnVnOiB7XG4gICAgbGFiZWw6ICdEZWJ1ZycsXG4gICAgY29sb3I6IGNvbG9ycy5ncmV5LFxuICB9LFxuICBpbmZvOiB7XG4gICAgbGFiZWw6ICdJbmZvJyxcbiAgICBpY29uOiA8SWNvbiBuYW1lPVwiaW5mby1jaXJjbGVcIiBjb2xvcj17Y29sb3JzLmN5YW59IC8+LFxuICAgIGNvbG9yOiBjb2xvcnMuY3lhbixcbiAgfSxcbiAgd2Fybjoge1xuICAgIGxhYmVsOiAnV2FybicsXG4gICAgc3R5bGU6IHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogY29sb3JzLnllbGxvd1RpbnQsXG4gICAgICBjb2xvcjogY29sb3JzLnllbGxvdyxcbiAgICAgIGZvbnRXZWlnaHQ6IDUwMCxcbiAgICB9LFxuICAgIGljb246IDxJY29uIG5hbWU9XCJjYXV0aW9uLXRyaWFuZ2xlXCIgY29sb3I9e2NvbG9ycy55ZWxsb3d9IC8+LFxuICAgIGNvbG9yOiBjb2xvcnMueWVsbG93LFxuICB9LFxuICBlcnJvcjoge1xuICAgIGxhYmVsOiAnRXJyb3InLFxuICAgIHN0eWxlOiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9ycy5yZWRUaW50LFxuICAgICAgY29sb3I6IGNvbG9ycy5yZWQsXG4gICAgICBmb250V2VpZ2h0OiA1MDAsXG4gICAgfSxcbiAgICBpY29uOiA8SWNvbiBuYW1lPVwiY2F1dGlvbi1vY3RhZ29uXCIgY29sb3I9e2NvbG9ycy5yZWR9IC8+LFxuICAgIGNvbG9yOiBjb2xvcnMucmVkLFxuICB9LFxuICBmYXRhbDoge1xuICAgIGxhYmVsOiAnRmF0YWwnLFxuICAgIHN0eWxlOiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9ycy5yZWRUaW50LFxuICAgICAgY29sb3I6IGNvbG9ycy5yZWQsXG4gICAgICBmb250V2VpZ2h0OiA3MDAsXG4gICAgfSxcbiAgICBpY29uOiA8SWNvbiBuYW1lPVwic3RvcFwiIGNvbG9yPXtjb2xvcnMucmVkfSAvPixcbiAgICBjb2xvcjogY29sb3JzLnJlZCxcbiAgfSxcbn07XG5cbmNvbnN0IERFRkFVTFRfRklMVEVSUyA9IFtcbiAge1xuICAgIHR5cGU6ICdlbnVtJyxcbiAgICBlbnVtOiBPYmplY3Qua2V5cyhMT0dfVFlQRVMpLm1hcCh2YWx1ZSA9PiAoe1xuICAgICAgbGFiZWw6IExPR19UWVBFU1t2YWx1ZV0ubGFiZWwsXG4gICAgICB2YWx1ZSxcbiAgICB9KSksXG4gICAga2V5OiAndHlwZScsXG4gICAgdmFsdWU6IFtdLFxuICAgIHBlcnNpc3RlbnQ6IHRydWUsXG4gIH0sXG5dO1xuXG5jb25zdCBIaWRkZW5TY3JvbGxUZXh0ID0gc3R5bGVkKFRleHQpKHtcbiAgYWxpZ25TZWxmOiAnYmFzZWxpbmUnLFxuICB1c2VyU2VsZWN0OiAnbm9uZScsXG4gIGxpbmVIZWlnaHQ6ICcxMzAlJyxcbiAgbWFyZ2luVG9wOiA1LFxuICBwYWRkaW5nQm90dG9tOiAzLFxuICAnJjo6LXdlYmtpdC1zY3JvbGxiYXInOiB7XG4gICAgZGlzcGxheTogJ25vbmUnLFxuICB9LFxufSk7XG5cbmNvbnN0IExvZ0NvdW50ID0gc3R5bGVkKCdkaXYnKSgoe2JhY2tncm91bmRDb2xvcn0pID0+ICh7XG4gIGJhY2tncm91bmRDb2xvcixcbiAgYm9yZGVyUmFkaXVzOiAnOTk5ZW0nLFxuICBmb250U2l6ZTogMTEsXG4gIG1hcmdpblRvcDogNCxcbiAgbWluV2lkdGg6IDE2LFxuICBoZWlnaHQ6IDE2LFxuICBjb2xvcjogY29sb3JzLndoaXRlLFxuICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICBsaW5lSGVpZ2h0OiAnMTZweCcsXG4gIHBhZGRpbmdMZWZ0OiA0LFxuICBwYWRkaW5nUmlnaHQ6IDQsXG4gIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbiAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbn0pKTtcblxuZnVuY3Rpb24gcGFkKGNodW5rOiBtaXhlZCwgbGVuOiBudW1iZXIpOiBzdHJpbmcge1xuICBsZXQgc3RyID0gU3RyaW5nKGNodW5rKTtcbiAgd2hpbGUgKHN0ci5sZW5ndGggPCBsZW4pIHtcbiAgICBzdHIgPSBgMCR7c3RyfWA7XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEVudHJpZXNUb1N0YXRlKFxuICBpdGVtczogRW50cmllcyxcbiAgc3RhdGU6ICRTaGFwZTxTdGF0ZT4gPSB7XG4gICAgcm93czogW10sXG4gICAgZW50cmllczogW10sXG4gICAga2V5MmVudHJ5OiB7fSxcbiAgfSxcbik6ICRTaGFwZTxTdGF0ZT4ge1xuICBjb25zdCByb3dzID0gWy4uLnN0YXRlLnJvd3NdO1xuICBjb25zdCBlbnRyaWVzID0gWy4uLnN0YXRlLmVudHJpZXNdO1xuICBjb25zdCBrZXkyZW50cnkgPSB7Li4uc3RhdGUua2V5MmVudHJ5fTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qge2VudHJ5LCByb3d9ID0gaXRlbXNbaV07XG4gICAgZW50cmllcy5wdXNoKHtyb3csIGVudHJ5fSk7XG4gICAga2V5MmVudHJ5W3Jvdy5rZXldID0gZW50cnk7XG5cbiAgICBsZXQgcHJldmlvdXNFbnRyeTogP0RldmljZUxvZ0VudHJ5ID0gbnVsbDtcblxuICAgIGlmIChpID4gMCkge1xuICAgICAgcHJldmlvdXNFbnRyeSA9IGl0ZW1zW2kgLSAxXS5lbnRyeTtcbiAgICB9IGVsc2UgaWYgKHN0YXRlLnJvd3MubGVuZ3RoID4gMCAmJiBzdGF0ZS5lbnRyaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHByZXZpb3VzRW50cnkgPSBzdGF0ZS5lbnRyaWVzW3N0YXRlLmVudHJpZXMubGVuZ3RoIC0gMV0uZW50cnk7XG4gICAgfVxuXG4gICAgYWRkUm93SWZOZWVkZWQocm93cywgcm93LCBlbnRyeSwgcHJldmlvdXNFbnRyeSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGVudHJpZXMsXG4gICAgcm93cyxcbiAgICBrZXkyZW50cnksXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRSb3dJZk5lZWRlZChcbiAgcm93czogQXJyYXk8VGFibGVCb2R5Um93PixcbiAgcm93OiBUYWJsZUJvZHlSb3csXG4gIGVudHJ5OiBEZXZpY2VMb2dFbnRyeSxcbiAgcHJldmlvdXNFbnRyeTogP0RldmljZUxvZ0VudHJ5LFxuKSB7XG4gIGNvbnN0IHByZXZpb3VzUm93ID0gcm93cy5sZW5ndGggPiAwID8gcm93c1tyb3dzLmxlbmd0aCAtIDFdIDogbnVsbDtcbiAgaWYgKFxuICAgIHByZXZpb3VzUm93ICYmXG4gICAgcHJldmlvdXNFbnRyeSAmJlxuICAgIGVudHJ5Lm1lc3NhZ2UgPT09IHByZXZpb3VzRW50cnkubWVzc2FnZSAmJlxuICAgIGVudHJ5LnRhZyA9PT0gcHJldmlvdXNFbnRyeS50YWcgJiZcbiAgICBwcmV2aW91c1Jvdy50eXBlICE9IG51bGxcbiAgKSB7XG4gICAgLy8gZHVwbGljYXRlIGxvZywgaW5jcmVhc2UgY291bnRlclxuICAgIGNvbnN0IGNvdW50ID1cbiAgICAgIHByZXZpb3VzUm93LmNvbHVtbnMudHlwZS52YWx1ZSAmJlxuICAgICAgcHJldmlvdXNSb3cuY29sdW1ucy50eXBlLnZhbHVlLnByb3BzICYmXG4gICAgICB0eXBlb2YgcHJldmlvdXNSb3cuY29sdW1ucy50eXBlLnZhbHVlLnByb3BzLmNoaWxkcmVuID09PSAnbnVtYmVyJ1xuICAgICAgICA/IHByZXZpb3VzUm93LmNvbHVtbnMudHlwZS52YWx1ZS5wcm9wcy5jaGlsZHJlbiArIDFcbiAgICAgICAgOiAyO1xuICAgIGNvbnN0IHR5cGUgPSBMT0dfVFlQRVNbcHJldmlvdXNSb3cudHlwZV0gfHwgTE9HX1RZUEVTLmRlYnVnO1xuICAgIHByZXZpb3VzUm93LmNvbHVtbnMudHlwZS52YWx1ZSA9IChcbiAgICAgIDxMb2dDb3VudCBiYWNrZ3JvdW5kQ29sb3I9e3R5cGUuY29sb3J9Pntjb3VudH08L0xvZ0NvdW50PlxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgcm93cy5wdXNoKHJvdyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NFbnRyeShcbiAgZW50cnk6IERldmljZUxvZ0VudHJ5LFxuICBrZXk6IHN0cmluZyxcbik6IHtcbiAgcm93OiBUYWJsZUJvZHlSb3csXG4gIGVudHJ5OiBEZXZpY2VMb2dFbnRyeSxcbn0ge1xuICBjb25zdCB7aWNvbiwgc3R5bGV9ID0gTE9HX1RZUEVTWyhlbnRyeS50eXBlOiBzdHJpbmcpXSB8fCBMT0dfVFlQRVMuZGVidWc7XG4gIC8vIGJ1aWxkIHRoZSBpdGVtLCBpdCB3aWxsIGVpdGhlciBiZSBiYXRjaGVkIG9yIGFkZGVkIHN0cmFpZ2h0IGF3YXlcbiAgcmV0dXJuIHtcbiAgICBlbnRyeSxcbiAgICByb3c6IHtcbiAgICAgIGNvbHVtbnM6IHtcbiAgICAgICAgdHlwZToge1xuICAgICAgICAgIHZhbHVlOiBpY29uLFxuICAgICAgICAgIGFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgfSxcbiAgICAgICAgdGltZToge1xuICAgICAgICAgIHZhbHVlOiAoXG4gICAgICAgICAgICA8SGlkZGVuU2Nyb2xsVGV4dCBjb2RlPXt0cnVlfT5cbiAgICAgICAgICAgICAge2VudHJ5LmRhdGUudG9UaW1lU3RyaW5nKCkuc3BsaXQoJyAnKVswXSArXG4gICAgICAgICAgICAgICAgJy4nICtcbiAgICAgICAgICAgICAgICBwYWQoZW50cnkuZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSwgMyl9XG4gICAgICAgICAgICA8L0hpZGRlblNjcm9sbFRleHQ+XG4gICAgICAgICAgKSxcbiAgICAgICAgfSxcbiAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgIHZhbHVlOiAoXG4gICAgICAgICAgICA8SGlkZGVuU2Nyb2xsVGV4dCBjb2RlPXt0cnVlfT57ZW50cnkubWVzc2FnZX08L0hpZGRlblNjcm9sbFRleHQ+XG4gICAgICAgICAgKSxcbiAgICAgICAgfSxcbiAgICAgICAgdGFnOiB7XG4gICAgICAgICAgdmFsdWU6IDxIaWRkZW5TY3JvbGxUZXh0IGNvZGU9e3RydWV9PntlbnRyeS50YWd9PC9IaWRkZW5TY3JvbGxUZXh0PixcbiAgICAgICAgICBpc0ZpbHRlcmFibGU6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIHBpZDoge1xuICAgICAgICAgIHZhbHVlOiAoXG4gICAgICAgICAgICA8SGlkZGVuU2Nyb2xsVGV4dCBjb2RlPXt0cnVlfT57U3RyaW5nKGVudHJ5LnBpZCl9PC9IaWRkZW5TY3JvbGxUZXh0PlxuICAgICAgICAgICksXG4gICAgICAgICAgaXNGaWx0ZXJhYmxlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICB0aWQ6IHtcbiAgICAgICAgICB2YWx1ZTogKFxuICAgICAgICAgICAgPEhpZGRlblNjcm9sbFRleHQgY29kZT17dHJ1ZX0+e1N0cmluZyhlbnRyeS50aWQpfTwvSGlkZGVuU2Nyb2xsVGV4dD5cbiAgICAgICAgICApLFxuICAgICAgICAgIGlzRmlsdGVyYWJsZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgYXBwOiB7XG4gICAgICAgICAgdmFsdWU6IDxIaWRkZW5TY3JvbGxUZXh0IGNvZGU9e3RydWV9PntlbnRyeS5hcHB9PC9IaWRkZW5TY3JvbGxUZXh0PixcbiAgICAgICAgICBpc0ZpbHRlcmFibGU6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgaGVpZ2h0OiBnZXRMaW5lQ291bnQoZW50cnkubWVzc2FnZSkgKiAxNSArIDEwLCAvLyAxNXB4IHBlciBsaW5lIGhlaWdodCArIDhweCBwYWRkaW5nXG4gICAgICBzdHlsZSxcbiAgICAgIHR5cGU6IGVudHJ5LnR5cGUsXG4gICAgICBmaWx0ZXJWYWx1ZTogZW50cnkubWVzc2FnZSxcbiAgICAgIGtleSxcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dUYWJsZSBleHRlbmRzIEZsaXBwZXJEZXZpY2VQbHVnaW48XG4gIFN0YXRlLFxuICBBY3Rpb25zLFxuICBQZXJzaXN0ZWRTdGF0ZSxcbj4ge1xuICBzdGF0aWMga2V5Ym9hcmRBY3Rpb25zID0gWydjbGVhcicsICdnb1RvQm90dG9tJywgJ2NyZWF0ZVBhc3RlJ107XG5cbiAgaW5pdFRpbWVyOiA/VGltZW91dElEO1xuICBiYXRjaFRpbWVyOiA/VGltZW91dElEO1xuXG4gIHN0YXRpYyBzdXBwb3J0c0RldmljZShkZXZpY2U6IERldmljZSkge1xuICAgIHJldHVybiBkZXZpY2Uub3MgPT09ICdpT1MnIHx8IGRldmljZS5vcyA9PT0gJ0FuZHJvaWQnO1xuICB9XG5cbiAgb25LZXlib2FyZEFjdGlvbiA9IChhY3Rpb246IHN0cmluZykgPT4ge1xuICAgIGlmIChhY3Rpb24gPT09ICdjbGVhcicpIHtcbiAgICAgIHRoaXMuY2xlYXJMb2dzKCk7XG4gICAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICdnb1RvQm90dG9tJykge1xuICAgICAgdGhpcy5nb1RvQm90dG9tKCk7XG4gICAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICdjcmVhdGVQYXN0ZScpIHtcbiAgICAgIHRoaXMuY3JlYXRlUGFzdGUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmVzdG9yZVNhdmVkQ291bnRlcnMgPSAoKTogQXJyYXk8Q291bnRlcj4gPT4ge1xuICAgIGNvbnN0IHNhdmVkQ291bnRlcnMgPVxuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKExPR19XQVRDSEVSX0xPQ0FMX1NUT1JBR0VfS0VZKSB8fCAnW10nO1xuICAgIHJldHVybiBKU09OLnBhcnNlKHNhdmVkQ291bnRlcnMpLm1hcCgoY291bnRlcjogQ291bnRlcikgPT4gKHtcbiAgICAgIC4uLmNvdW50ZXIsXG4gICAgICBleHByZXNzaW9uOiBuZXcgUmVnRXhwKGNvdW50ZXIubGFiZWwsICdnaScpLFxuICAgICAgY291bnQ6IDAsXG4gICAgfSkpO1xuICB9O1xuXG4gIGNhbGN1bGF0ZUhpZ2hsaWdodGVkUm93cyA9IChcbiAgICBkZWVwTGlua1BheWxvYWQ6ID9zdHJpbmcsXG4gICAgcm93czogQXJyYXk8VGFibGVCb2R5Um93PixcbiAgKTogU2V0PHN0cmluZz4gPT4ge1xuICAgIGNvbnN0IGhpZ2hsaWdodGVkUm93cyA9IG5ldyBTZXQoKTtcbiAgICBpZiAoIWRlZXBMaW5rUGF5bG9hZCkge1xuICAgICAgcmV0dXJuIGhpZ2hsaWdodGVkUm93cztcbiAgICB9XG5cbiAgICAvLyBSdW4gdGhyb3VnaCBhcnJheSBmcm9tIGxhc3QgdG8gZmlyc3QsIGJlY2F1c2Ugd2Ugd2FudCB0byBzaG93IHRoZSBsYXN0XG4gICAgLy8gdGltZSBpdCB0aGUgbG9nIHdlIGFyZSBsb29raW5nIGZvciBhcHBlYXJlZC5cbiAgICBmb3IgKGxldCBpID0gcm93cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgaWYgKFxuICAgICAgICByb3dzW2ldLmZpbHRlclZhbHVlICYmXG4gICAgICAgIHJvd3NbaV0uZmlsdGVyVmFsdWUuaW5jbHVkZXMoZGVlcExpbmtQYXlsb2FkKVxuICAgICAgKSB7XG4gICAgICAgIGhpZ2hsaWdodGVkUm93cy5hZGQocm93c1tpXS5rZXkpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGhpZ2hsaWdodGVkUm93cztcbiAgfTtcblxuICB0YWJsZVJlZjogP01hbmFnZWRUYWJsZTtcbiAgY29sdW1uczogVGFibGVDb2x1bW5zO1xuICBjb2x1bW5TaXplczogVGFibGVDb2x1bW5TaXplcztcbiAgY29sdW1uT3JkZXI6IFRhYmxlQ29sdW1uT3JkZXI7XG4gIGxvZ0xpc3RlbmVyOiA/U3ltYm9sO1xuXG4gIGJhdGNoOiBFbnRyaWVzID0gW107XG4gIHF1ZXVlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBjb3VudGVyOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBQbHVnaW5Qcm9wczxQZXJzaXN0ZWRTdGF0ZT4pIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3Qgc3VwcG9ydGVkQ29sdW1ucyA9IHRoaXMuZGV2aWNlLnN1cHBvcnRlZENvbHVtbnMoKTtcbiAgICB0aGlzLmNvbHVtbnMgPSBrZWVwS2V5cyhDT0xVTU5TLCBzdXBwb3J0ZWRDb2x1bW5zKTtcbiAgICB0aGlzLmNvbHVtblNpemVzID0ga2VlcEtleXMoQ09MVU1OX1NJWkUsIHN1cHBvcnRlZENvbHVtbnMpO1xuICAgIHRoaXMuY29sdW1uT3JkZXIgPSBJTklUSUFMX0NPTFVNTl9PUkRFUi5maWx0ZXIob2JqID0+XG4gICAgICBzdXBwb3J0ZWRDb2x1bW5zLmluY2x1ZGVzKG9iai5rZXkpLFxuICAgICk7XG5cbiAgICBjb25zdCBpbml0aWFsU3RhdGUgPSBhZGRFbnRyaWVzVG9TdGF0ZShcbiAgICAgIHRoaXMuZGV2aWNlXG4gICAgICAgIC5nZXRMb2dzKClcbiAgICAgICAgLm1hcChsb2cgPT4gcHJvY2Vzc0VudHJ5KGxvZywgU3RyaW5nKHRoaXMuY291bnRlcisrKSkpLFxuICAgICk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIC4uLmluaXRpYWxTdGF0ZSxcbiAgICAgIGhpZ2hsaWdodGVkUm93czogdGhpcy5jYWxjdWxhdGVIaWdobGlnaHRlZFJvd3MoXG4gICAgICAgIHByb3BzLmRlZXBMaW5rUGF5bG9hZCxcbiAgICAgICAgaW5pdGlhbFN0YXRlLnJvd3MsXG4gICAgICApLFxuICAgICAgY291bnRlcnM6IHRoaXMucmVzdG9yZVNhdmVkQ291bnRlcnMoKSxcbiAgICB9O1xuXG4gICAgdGhpcy5sb2dMaXN0ZW5lciA9IHRoaXMuZGV2aWNlLmFkZExvZ0xpc3RlbmVyKChlbnRyeTogRGV2aWNlTG9nRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IHByb2Nlc3NlZEVudHJ5ID0gcHJvY2Vzc0VudHJ5KGVudHJ5LCBTdHJpbmcodGhpcy5jb3VudGVyKyspKTtcbiAgICAgIHRoaXMuaW5jcmVtZW50Q291bnRlcklmTmVlZGVkKHByb2Nlc3NlZEVudHJ5LmVudHJ5KTtcbiAgICAgIHRoaXMuc2NoZXVkbGVFbnRyeUZvckJhdGNoKHByb2Nlc3NlZEVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGluY3JlbWVudENvdW50ZXJJZk5lZWRlZCA9IChlbnRyeTogRGV2aWNlTG9nRW50cnkpID0+IHtcbiAgICBsZXQgY291bnRlclVwZGF0ZWQgPSBmYWxzZTtcbiAgICBjb25zdCBjb3VudGVycyA9IHRoaXMuc3RhdGUuY291bnRlcnMubWFwKGNvdW50ZXIgPT4ge1xuICAgICAgaWYgKGVudHJ5Lm1lc3NhZ2UubWF0Y2goY291bnRlci5leHByZXNzaW9uKSkge1xuICAgICAgICBjb3VudGVyVXBkYXRlZCA9IHRydWU7XG4gICAgICAgIGlmIChjb3VudGVyLm5vdGlmeSkge1xuICAgICAgICAgIG5ldyB3aW5kb3cuTm90aWZpY2F0aW9uKGAke2NvdW50ZXIubGFiZWx9YCwge1xuICAgICAgICAgICAgYm9keTogJ1RoZSB3YXRjaGVkIGxvZyBtZXNzYWdlIGFwcGVhcmVkJyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLmNvdW50ZXIsXG4gICAgICAgICAgY291bnQ6IGNvdW50ZXIuY291bnQgKyAxLFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNvdW50ZXI7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGNvdW50ZXJVcGRhdGVkKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtjb3VudGVyc30pO1xuICAgIH1cbiAgfTtcblxuICBzY2hldWRsZUVudHJ5Rm9yQmF0Y2ggPSAoaXRlbToge1xuICAgIHJvdzogVGFibGVCb2R5Um93LFxuICAgIGVudHJ5OiBEZXZpY2VMb2dFbnRyeSxcbiAgfSkgPT4ge1xuICAgIC8vIGJhdGNoIHVwIGxvZ3MgdG8gYmUgcHJvY2Vzc2VkIGV2ZXJ5IDI1MG1zLCBpZiB3ZSBoYXZlIGxvdHMgb2YgbG9nXG4gICAgLy8gbWVzc2FnZXMgY29taW5nIGluLCB0aGVuIGNhbGxpbmcgYW4gc2V0U3RhdGUgMjAwKyB0aW1lcyBpcyBhY3R1YWxseVxuICAgIC8vIHByZXR0eSBleHBlbnNpdmVcbiAgICB0aGlzLmJhdGNoLnB1c2goaXRlbSk7XG5cbiAgICBpZiAoIXRoaXMucXVldWVkKSB7XG4gICAgICB0aGlzLnF1ZXVlZCA9IHRydWU7XG5cbiAgICAgIHRoaXMuYmF0Y2hUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCB0aGlzQmF0Y2ggPSB0aGlzLmJhdGNoO1xuICAgICAgICB0aGlzLmJhdGNoID0gW107XG4gICAgICAgIHRoaXMucXVldWVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4gYWRkRW50cmllc1RvU3RhdGUodGhpc0JhdGNoLCBzdGF0ZSkpO1xuICAgICAgfSwgMTAwKTtcbiAgICB9XG4gIH07XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgaWYgKHRoaXMuYmF0Y2hUaW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYmF0Y2hUaW1lcik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubG9nTGlzdGVuZXIpIHtcbiAgICAgIHRoaXMuZGV2aWNlLnJlbW92ZUxvZ0xpc3RlbmVyKHRoaXMubG9nTGlzdGVuZXIpO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyTG9ncyA9ICgpID0+IHtcbiAgICB0aGlzLmRldmljZS5jbGVhckxvZ3MoKS5jYXRjaChlID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBjbGVhciBsb2dzOiAnLCBlKTtcbiAgICB9KTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGVudHJpZXM6IFtdLFxuICAgICAgcm93czogW10sXG4gICAgICBoaWdobGlnaHRlZFJvd3M6IG5ldyBTZXQoKSxcbiAgICAgIGtleTJlbnRyeToge30sXG4gICAgICBjb3VudGVyczogdGhpcy5zdGF0ZS5jb3VudGVycy5tYXAoY291bnRlciA9PiAoe1xuICAgICAgICAuLi5jb3VudGVyLFxuICAgICAgICBjb3VudDogMCxcbiAgICAgIH0pKSxcbiAgICB9KTtcbiAgfTtcblxuICBjcmVhdGVQYXN0ZSA9ICgpID0+IHtcbiAgICBsZXQgcGFzdGUgPSAnJztcbiAgICBjb25zdCBtYXBGbiA9IHJvdyA9PlxuICAgICAgT2JqZWN0LmtleXMoQ09MVU1OUylcbiAgICAgICAgLm1hcChrZXkgPT4gdGV4dENvbnRlbnQocm93LmNvbHVtbnNba2V5XS52YWx1ZSkpXG4gICAgICAgIC5qb2luKCdcXHQnKTtcblxuICAgIGlmICh0aGlzLnN0YXRlLmhpZ2hsaWdodGVkUm93cy5zaXplID4gMCkge1xuICAgICAgLy8gY3JlYXRlIHBhc3RlIGZyb20gc2VsZWN0aW9uXG4gICAgICBwYXN0ZSA9IHRoaXMuc3RhdGUucm93c1xuICAgICAgICAuZmlsdGVyKHJvdyA9PiB0aGlzLnN0YXRlLmhpZ2hsaWdodGVkUm93cy5oYXMocm93LmtleSkpXG4gICAgICAgIC5tYXAobWFwRm4pXG4gICAgICAgIC5qb2luKCdcXG4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY3JlYXRlIHBhc3RlIHdpdGggYWxsIHJvd3NcbiAgICAgIHBhc3RlID0gdGhpcy5zdGF0ZS5yb3dzLm1hcChtYXBGbikuam9pbignXFxuJyk7XG4gICAgfVxuICAgIGNyZWF0ZVBhc3RlKHBhc3RlKTtcbiAgfTtcblxuICBzZXRUYWJsZVJlZiA9IChyZWY6IFJlYWN0LkVsZW1lbnRSZWY8dHlwZW9mIE1hbmFnZWRUYWJsZT4pID0+IHtcbiAgICB0aGlzLnRhYmxlUmVmID0gcmVmO1xuICB9O1xuXG4gIGdvVG9Cb3R0b20gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMudGFibGVSZWYgIT0gbnVsbCkge1xuICAgICAgdGhpcy50YWJsZVJlZi5zY3JvbGxUb0JvdHRvbSgpO1xuICAgIH1cbiAgfTtcblxuICBvblJvd0hpZ2hsaWdodGVkID0gKGhpZ2hsaWdodGVkUm93czogQXJyYXk8c3RyaW5nPikgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgLi4udGhpcy5zdGF0ZSxcbiAgICAgIGhpZ2hsaWdodGVkUm93czogbmV3IFNldChoaWdobGlnaHRlZFJvd3MpLFxuICAgIH0pO1xuICB9O1xuXG4gIHJlbmRlclNpZGViYXIgPSAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxMb2dXYXRjaGVyXG4gICAgICAgIGNvdW50ZXJzPXt0aGlzLnN0YXRlLmNvdW50ZXJzfVxuICAgICAgICBvbkNoYW5nZT17Y291bnRlcnMgPT5cbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtjb3VudGVyc30sICgpID0+XG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICAgICAgIExPR19XQVRDSEVSX0xPQ0FMX1NUT1JBR0VfS0VZLFxuICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlLmNvdW50ZXJzKSxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAvPlxuICAgICk7XG4gIH07XG5cbiAgc3RhdGljIENvbnRleHRNZW51ID0gc3R5bGVkKENvbnRleHRNZW51KSh7XG4gICAgZmxleDogMSxcbiAgfSk7XG5cbiAgYnVpbGRDb250ZXh0TWVudUl0ZW1zID0gKCkgPT4gW1xuICAgIHtcbiAgICAgIHR5cGU6ICdzZXBhcmF0b3InLFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdDbGVhciBhbGwnLFxuICAgICAgY2xpY2s6IHRoaXMuY2xlYXJMb2dzLFxuICAgIH0sXG4gIF07XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8TG9nVGFibGUuQ29udGV4dE1lbnVcbiAgICAgICAgYnVpbGRJdGVtcz17dGhpcy5idWlsZENvbnRleHRNZW51SXRlbXN9XG4gICAgICAgIGNvbXBvbmVudD17RmxleENvbHVtbn0+XG4gICAgICAgIDxTZWFyY2hhYmxlVGFibGVcbiAgICAgICAgICBpbm5lclJlZj17dGhpcy5zZXRUYWJsZVJlZn1cbiAgICAgICAgICBmbG9hdGluZz17ZmFsc2V9XG4gICAgICAgICAgbXVsdGlsaW5lPXt0cnVlfVxuICAgICAgICAgIGNvbHVtblNpemVzPXt0aGlzLmNvbHVtblNpemVzfVxuICAgICAgICAgIGNvbHVtbk9yZGVyPXt0aGlzLmNvbHVtbk9yZGVyfVxuICAgICAgICAgIGNvbHVtbnM9e3RoaXMuY29sdW1uc31cbiAgICAgICAgICByb3dzPXt0aGlzLnN0YXRlLnJvd3N9XG4gICAgICAgICAgaGlnaGxpZ2h0ZWRSb3dzPXt0aGlzLnN0YXRlLmhpZ2hsaWdodGVkUm93c31cbiAgICAgICAgICBvblJvd0hpZ2hsaWdodGVkPXt0aGlzLm9uUm93SGlnaGxpZ2h0ZWR9XG4gICAgICAgICAgbXVsdGlIaWdobGlnaHQ9e3RydWV9XG4gICAgICAgICAgZGVmYXVsdEZpbHRlcnM9e0RFRkFVTFRfRklMVEVSU31cbiAgICAgICAgICB6ZWJyYT17ZmFsc2V9XG4gICAgICAgICAgYWN0aW9ucz17PEJ1dHRvbiBvbkNsaWNrPXt0aGlzLmNsZWFyTG9nc30+Q2xlYXIgTG9nczwvQnV0dG9uPn1cbiAgICAgICAgICAvLyBJZiB0aGUgbG9ncyBpcyBvcGVuZWQgdGhyb3VnaCBkZWVwbGluaywgdGhlbiBkb24ndCBzY3JvbGwgYXMgdGhlIHJvdyBpcyBoaWdobGlnaHRlZFxuICAgICAgICAgIHN0aWNreUJvdHRvbT17XG4gICAgICAgICAgICAhKHRoaXMucHJvcHMuZGVlcExpbmtQYXlsb2FkICYmIHRoaXMuc3RhdGUuaGlnaGxpZ2h0ZWRSb3dzLnNpemUgPiAwKVxuICAgICAgICAgIH1cbiAgICAgICAgLz5cbiAgICAgICAgPERldGFpbFNpZGViYXI+e3RoaXMucmVuZGVyU2lkZWJhcigpfTwvRGV0YWlsU2lkZWJhcj5cbiAgICAgIDwvTG9nVGFibGUuQ29udGV4dE1lbnU+XG4gICAgKTtcbiAgfVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxOC1wcmVzZW50IEZhY2Vib29rLlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKiBAZm9ybWF0XG4gKi9cblxuaW1wb3J0IHR5cGUge1RhYmxlQm9keVJvd30gZnJvbSAnZmxpcHBlcic7XG5cbmltcG9ydCB7XG4gIFB1cmVDb21wb25lbnQsXG4gIEZsZXhDb2x1bW4sXG4gIFBhbmVsLFxuICBJbnB1dCxcbiAgVG9vbGJhcixcbiAgVGV4dCxcbiAgTWFuYWdlZFRhYmxlLFxuICBCdXR0b24sXG4gIGNvbG9ycyxcbiAgc3R5bGVkLFxufSBmcm9tICdmbGlwcGVyJztcblxuZXhwb3J0IHR5cGUgQ291bnRlciA9IHtcbiAgZXhwcmVzc2lvbjogUmVnRXhwLFxuICBjb3VudDogbnVtYmVyLFxuICBub3RpZnk6IGJvb2xlYW4sXG4gIGxhYmVsOiBzdHJpbmcsXG59O1xuXG50eXBlIFByb3BzID0ge3xcbiAgb25DaGFuZ2U6IChjb3VudGVyczogQXJyYXk8Q291bnRlcj4pID0+IHZvaWQsXG4gIGNvdW50ZXJzOiBBcnJheTxDb3VudGVyPixcbnx9O1xuXG50eXBlIFN0YXRlID0ge1xuICBpbnB1dDogc3RyaW5nLFxuICBoaWdobGlnaHRlZFJvdzogP3N0cmluZyxcbn07XG5cbmNvbnN0IENvbHVtblNpemVzID0ge1xuICBleHByZXNzaW9uOiAnNzAlJyxcbiAgY291bnQ6ICcxNSUnLFxuICBub3RpZnk6ICdmbGV4Jyxcbn07XG5cbmNvbnN0IENvbHVtbnMgPSB7XG4gIGV4cHJlc3Npb246IHtcbiAgICB2YWx1ZTogJ0V4cHJlc3Npb24nLFxuICAgIHJlc2l6YWJsZTogZmFsc2UsXG4gIH0sXG4gIGNvdW50OiB7XG4gICAgdmFsdWU6ICdDb3VudCcsXG4gICAgcmVzaXphYmxlOiBmYWxzZSxcbiAgfSxcbiAgbm90aWZ5OiB7XG4gICAgdmFsdWU6ICdOb3RpZnknLFxuICAgIHJlc2l6YWJsZTogZmFsc2UsXG4gIH0sXG59O1xuXG5jb25zdCBDb3VudCA9IHN0eWxlZChUZXh0KSh7XG4gIGFsaWduU2VsZjogJ2NlbnRlcicsXG4gIGJhY2tncm91bmQ6IGNvbG9ycy5tYWNPU0hpZ2hsaWdodEFjdGl2ZSxcbiAgY29sb3I6IGNvbG9ycy53aGl0ZSxcbiAgZm9udFNpemU6IDEyLFxuICBmb250V2VpZ2h0OiA1MDAsXG4gIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gIGJvcmRlclJhZGl1czogJzk5OWVtJyxcbiAgcGFkZGluZzogJzRweCA5cHggM3B4JyxcbiAgbGluZUhlaWdodDogJzEwMCUnLFxuICBtYXJnaW5MZWZ0OiAnYXV0bycsXG59KTtcblxuY29uc3QgQ2hlY2tib3ggPSBzdHlsZWQoSW5wdXQpKHtcbiAgbGluZUhlaWdodDogJzEwMCUnLFxuICBwYWRkaW5nOiAwLFxuICBtYXJnaW46IDAsXG4gIGhlaWdodDogJ2F1dG8nLFxuICBhbGlnblNlbGY6ICdjZW50ZXInLFxufSk7XG5cbmNvbnN0IEV4cHJlc3Npb25JbnB1dCA9IHN0eWxlZChJbnB1dCkoe1xuICBmbGV4R3JvdzogMSxcbn0pO1xuXG5jb25zdCBXYXRjaGVyUGFuZWwgPSBzdHlsZWQoUGFuZWwpKHtcbiAgbWluSGVpZ2h0OiAyMDAsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nV2F0Y2hlciBleHRlbmRzIFB1cmVDb21wb25lbnQ8UHJvcHMsIFN0YXRlPiB7XG4gIHN0YXRlID0ge1xuICAgIGlucHV0OiAnJyxcbiAgICBoaWdobGlnaHRlZFJvdzogbnVsbCxcbiAgfTtcblxuICBfaW5wdXRSZWY6ID9IVE1MSW5wdXRFbGVtZW50O1xuXG4gIG9uQWRkID0gKCkgPT4ge1xuICAgIGlmIChcbiAgICAgIHRoaXMucHJvcHMuY291bnRlcnMuZmluZEluZGV4KCh7bGFiZWx9KSA9PiBsYWJlbCA9PT0gdGhpcy5zdGF0ZS5pbnB1dCkgPlxuICAgICAgICAtMSB8fFxuICAgICAgdGhpcy5zdGF0ZS5pbnB1dC5sZW5ndGggPT09IDBcbiAgICApIHtcbiAgICAgIC8vIHByZXZlbnQgZHVwbGljYXRlc1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKFtcbiAgICAgIC4uLnRoaXMucHJvcHMuY291bnRlcnMsXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiB0aGlzLnN0YXRlLmlucHV0LFxuICAgICAgICBleHByZXNzaW9uOiBuZXcgUmVnRXhwKHRoaXMuc3RhdGUuaW5wdXQsICdnaScpLFxuICAgICAgICBub3RpZnk6IGZhbHNlLFxuICAgICAgICBjb3VudDogMCxcbiAgICAgIH0sXG4gICAgXSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXQ6ICcnfSk7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAoZTogU3ludGhldGljSW5wdXRFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaW5wdXQ6IGUudGFyZ2V0LnZhbHVlLFxuICAgIH0pO1xuICB9O1xuXG4gIHJlc2V0Q291bnQgPSAoaW5kZXg6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IG5ld0NvdW50ZXJzID0gWy4uLnRoaXMucHJvcHMuY291bnRlcnNdO1xuICAgIG5ld0NvdW50ZXJzW2luZGV4XSA9IHtcbiAgICAgIC4uLm5ld0NvdW50ZXJzW2luZGV4XSxcbiAgICAgIGNvdW50OiAwLFxuICAgIH07XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShuZXdDb3VudGVycyk7XG4gIH07XG5cbiAgYnVpbGRSb3dzID0gKCk6IEFycmF5PFRhYmxlQm9keVJvdz4gPT4ge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNvdW50ZXJzLm1hcCgoe2xhYmVsLCBjb3VudCwgbm90aWZ5fSwgaSkgPT4gKHtcbiAgICAgIGNvbHVtbnM6IHtcbiAgICAgICAgZXhwcmVzc2lvbjoge1xuICAgICAgICAgIHZhbHVlOiA8VGV4dCBjb2RlPXt0cnVlfT57bGFiZWx9PC9UZXh0PixcbiAgICAgICAgfSxcbiAgICAgICAgY291bnQ6IHtcbiAgICAgICAgICB2YWx1ZTogPENvdW50IG9uQ2xpY2s9eygpID0+IHRoaXMucmVzZXRDb3VudChpKX0+e2NvdW50fTwvQ291bnQ+LFxuICAgICAgICB9LFxuICAgICAgICBub3RpZnk6IHtcbiAgICAgICAgICB2YWx1ZTogKFxuICAgICAgICAgICAgPENoZWNrYm94XG4gICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgIGNoZWNrZWQ9e25vdGlmeX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eygpID0+IHRoaXMuc2V0Tm90aWZpY2F0aW9uKGksICFub3RpZnkpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGtleTogbGFiZWwsXG4gICAgfSkpO1xuICB9O1xuXG4gIHNldE5vdGlmaWNhdGlvbiA9IChpbmRleDogbnVtYmVyLCBub3RpZnk6IGJvb2xlYW4pID0+IHtcbiAgICBjb25zdCBuZXdDb3VudGVyczogQXJyYXk8Q291bnRlcj4gPSBbLi4udGhpcy5wcm9wcy5jb3VudGVyc107XG4gICAgbmV3Q291bnRlcnNbaW5kZXhdID0ge1xuICAgICAgLi4ubmV3Q291bnRlcnNbaW5kZXhdLFxuICAgICAgbm90aWZ5LFxuICAgIH07XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShuZXdDb3VudGVycyk7XG4gIH07XG5cbiAgb25Sb3dIaWdobGlnaHRlZCA9IChyb3dzOiBBcnJheTxzdHJpbmc+KSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBoaWdobGlnaHRlZFJvdzogcm93cy5sZW5ndGggPT09IDEgPyByb3dzWzBdIDogbnVsbCxcbiAgICB9KTtcbiAgfTtcblxuICBvbktleURvd24gPSAoZTogU3ludGhldGljS2V5Ym9hcmRFdmVudDw+KSA9PiB7XG4gICAgaWYgKFxuICAgICAgKGUua2V5ID09PSAnRGVsZXRlJyB8fCBlLmtleSA9PT0gJ0JhY2tzcGFjZScpICYmXG4gICAgICB0aGlzLnN0YXRlLmhpZ2hsaWdodGVkUm93ICE9IG51bGxcbiAgICApIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoXG4gICAgICAgIHRoaXMucHJvcHMuY291bnRlcnMuZmlsdGVyKFxuICAgICAgICAgICh7bGFiZWx9KSA9PiBsYWJlbCAhPT0gdGhpcy5zdGF0ZS5oaWdobGlnaHRlZFJvdyxcbiAgICAgICAgKSxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIG9uU3VibWl0ID0gKGU6IFN5bnRoZXRpY0tleWJvYXJkRXZlbnQ8PikgPT4ge1xuICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgdGhpcy5vbkFkZCgpO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxGbGV4Q29sdW1uIGdyb3c9e3RydWV9IHRhYkluZGV4PXstMX0gb25LZXlEb3duPXt0aGlzLm9uS2V5RG93bn0+XG4gICAgICAgIDxXYXRjaGVyUGFuZWxcbiAgICAgICAgICBoZWFkaW5nPVwiRXhwcmVzc2lvbiBXYXRjaGVyXCJcbiAgICAgICAgICBmbG9hdGluZz17ZmFsc2V9XG4gICAgICAgICAgcGFkZGVkPXtmYWxzZX0+XG4gICAgICAgICAgPFRvb2xiYXI+XG4gICAgICAgICAgICA8RXhwcmVzc2lvbklucHV0XG4gICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmlucHV0fVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkV4cHJlc3Npb24uLi5cIlxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cbiAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uU3VibWl0fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkFkZH1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuc3RhdGUuaW5wdXQubGVuZ3RoID09PSAwfT5cbiAgICAgICAgICAgICAgQWRkIGNvdW50ZXJcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvVG9vbGJhcj5cbiAgICAgICAgICA8TWFuYWdlZFRhYmxlXG4gICAgICAgICAgICBvblJvd0hpZ2hsaWdodGVkPXt0aGlzLm9uUm93SGlnaGxpZ2h0ZWR9XG4gICAgICAgICAgICBjb2x1bW5TaXplcz17Q29sdW1uU2l6ZXN9XG4gICAgICAgICAgICBjb2x1bW5zPXtDb2x1bW5zfVxuICAgICAgICAgICAgcm93cz17dGhpcy5idWlsZFJvd3MoKX1cbiAgICAgICAgICAgIGF1dG9IZWlnaHQ9e3RydWV9XG4gICAgICAgICAgICBmbG9hdGluZz17ZmFsc2V9XG4gICAgICAgICAgICB6ZWJyYT17ZmFsc2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9XYXRjaGVyUGFuZWw+XG4gICAgICA8L0ZsZXhDb2x1bW4+XG4gICAgKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbImdsb2JhbCIsIl9fciIsIm1ldHJvUmVxdWlyZSIsIl9fZCIsImRlZmluZSIsIl9fYyIsImNsZWFyIiwibW9kdWxlcyIsIkVNUFRZIiwiX3JlZiIsImhhc093blByb3BlcnR5IiwiX19OVU1fTU9EVUxFU19fIiwiQXJyYXkiLCJPYmplY3QiLCJjcmVhdGUiLCJmYWN0b3J5IiwibW9kdWxlSWQiLCJkZXBlbmRlbmN5TWFwIiwiaGFzRXJyb3IiLCJpbXBvcnRlZEFsbCIsImltcG9ydGVkRGVmYXVsdCIsImlzSW5pdGlhbGl6ZWQiLCJwdWJsaWNNb2R1bGUiLCJleHBvcnRzIiwibW9kdWxlSWRSZWFsbHlJc051bWJlciIsIm1vZHVsZSIsImd1YXJkZWRMb2FkTW9kdWxlIiwibWV0cm9JbXBvcnREZWZhdWx0IiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJtZXRyb0ltcG9ydEFsbCIsIl9rZXkiLCJjYWxsIiwiaW5HdWFyZCIsIkVycm9yVXRpbHMiLCJyZXR1cm5WYWx1ZSIsImxvYWRNb2R1bGVJbXBsZW1lbnRhdGlvbiIsImUiLCJyZXBvcnRGYXRhbEVycm9yIiwiSURfTUFTS19TSElGVCIsIkxPQ0FMX0lEX01BU0siLCJ1bnBhY2tNb2R1bGVJZCIsInNlZ21lbnRJZCIsImxvY2FsSWQiLCJwYWNrTW9kdWxlSWQiLCJ2YWx1ZSIsImhvb2tzIiwicmVnaXN0ZXJIb29rIiwiY2IiLCJob29rIiwicHVzaCIsInJlbGVhc2UiLCJpIiwibGVuZ3RoIiwic3BsaWNlIiwiX19kZWZpbmVNb2R1bGUiLCJuYXRpdmVSZXF1aXJlIiwiX3VucGFja01vZHVsZUlkIiwiX3NlZ21lbnRJZCIsIl9sb2NhbElkIiwidW5rbm93bk1vZHVsZUVycm9yIiwibW9kdWxlVGhyZXdFcnJvciIsImVycm9yIiwiX21vZHVsZSIsIl9tb2R1bGVPYmplY3QiLCJpZCIsInVuZGVmaW5lZCIsIm1lc3NhZ2UiLCJFcnJvciIsImRpc3BsYXlOYW1lIiwiTE9HX1dBVENIRVJfTE9DQUxfU1RPUkFHRV9LRVkiLCJJY29uIiwiR2x5cGgiLCJtYXJnaW5Ub3AiLCJnZXRMaW5lQ291bnQiLCJzdHIiLCJjb3VudCIsImtlZXBLZXlzIiwib2JqIiwia2V5cyIsInJlc3VsdCIsImtleSIsImluY2x1ZGVzIiwiQ09MVU1OX1NJWkUiLCJ0eXBlIiwidGltZSIsInBpZCIsInRpZCIsInRhZyIsImFwcCIsIkNPTFVNTlMiLCJJTklUSUFMX0NPTFVNTl9PUkRFUiIsInZpc2libGUiLCJMT0dfVFlQRVMiLCJ2ZXJib3NlIiwibGFiZWwiLCJjb2xvciIsImNvbG9ycyIsInB1cnBsZSIsImRlYnVnIiwiZ3JleSIsImluZm8iLCJpY29uIiwiY3lhbiIsIndhcm4iLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsInllbGxvd1RpbnQiLCJ5ZWxsb3ciLCJmb250V2VpZ2h0IiwicmVkVGludCIsInJlZCIsImZhdGFsIiwiREVGQVVMVF9GSUxURVJTIiwiZW51bSIsIm1hcCIsInBlcnNpc3RlbnQiLCJIaWRkZW5TY3JvbGxUZXh0IiwiVGV4dCIsImFsaWduU2VsZiIsInVzZXJTZWxlY3QiLCJsaW5lSGVpZ2h0IiwicGFkZGluZ0JvdHRvbSIsImRpc3BsYXkiLCJMb2dDb3VudCIsImJvcmRlclJhZGl1cyIsImZvbnRTaXplIiwibWluV2lkdGgiLCJoZWlnaHQiLCJ3aGl0ZSIsInRleHRBbGlnbiIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0IiwidGV4dE92ZXJmbG93Iiwib3ZlcmZsb3ciLCJ3aGl0ZVNwYWNlIiwicGFkIiwiY2h1bmsiLCJsZW4iLCJTdHJpbmciLCJhZGRFbnRyaWVzVG9TdGF0ZSIsIml0ZW1zIiwic3RhdGUiLCJyb3dzIiwiZW50cmllcyIsImtleTJlbnRyeSIsImVudHJ5Iiwicm93IiwicHJldmlvdXNFbnRyeSIsImFkZFJvd0lmTmVlZGVkIiwicHJldmlvdXNSb3ciLCJjb2x1bW5zIiwicHJvcHMiLCJjaGlsZHJlbiIsInByb2Nlc3NFbnRyeSIsImFsaWduIiwiZGF0ZSIsInRvVGltZVN0cmluZyIsInNwbGl0IiwiZ2V0TWlsbGlzZWNvbmRzIiwiaXNGaWx0ZXJhYmxlIiwiZmlsdGVyVmFsdWUiLCJMb2dUYWJsZSIsIkZsaXBwZXJEZXZpY2VQbHVnaW4iLCJzdXBwb3J0c0RldmljZSIsImRldmljZSIsIm9zIiwiY29uc3RydWN0b3IiLCJhY3Rpb24iLCJjbGVhckxvZ3MiLCJnb1RvQm90dG9tIiwiY3JlYXRlUGFzdGUiLCJzYXZlZENvdW50ZXJzIiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIkpTT04iLCJwYXJzZSIsImNvdW50ZXIiLCJleHByZXNzaW9uIiwiUmVnRXhwIiwiZGVlcExpbmtQYXlsb2FkIiwiaGlnaGxpZ2h0ZWRSb3dzIiwiU2V0IiwiYWRkIiwiY291bnRlclVwZGF0ZWQiLCJjb3VudGVycyIsIm1hdGNoIiwibm90aWZ5IiwiTm90aWZpY2F0aW9uIiwiYm9keSIsInNldFN0YXRlIiwiaXRlbSIsImJhdGNoIiwicXVldWVkIiwiYmF0Y2hUaW1lciIsInNldFRpbWVvdXQiLCJ0aGlzQmF0Y2giLCJjYXRjaCIsImNvbnNvbGUiLCJwYXN0ZSIsIm1hcEZuIiwiam9pbiIsInNpemUiLCJmaWx0ZXIiLCJoYXMiLCJyZWYiLCJ0YWJsZVJlZiIsInNjcm9sbFRvQm90dG9tIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImNsaWNrIiwic3VwcG9ydGVkQ29sdW1ucyIsImNvbHVtblNpemVzIiwiY29sdW1uT3JkZXIiLCJpbml0aWFsU3RhdGUiLCJnZXRMb2dzIiwibG9nIiwiY2FsY3VsYXRlSGlnaGxpZ2h0ZWRSb3dzIiwicmVzdG9yZVNhdmVkQ291bnRlcnMiLCJsb2dMaXN0ZW5lciIsImFkZExvZ0xpc3RlbmVyIiwicHJvY2Vzc2VkRW50cnkiLCJpbmNyZW1lbnRDb3VudGVySWZOZWVkZWQiLCJzY2hldWRsZUVudHJ5Rm9yQmF0Y2giLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImNsZWFyVGltZW91dCIsInJlbW92ZUxvZ0xpc3RlbmVyIiwicmVuZGVyIiwiYnVpbGRDb250ZXh0TWVudUl0ZW1zIiwiRmxleENvbHVtbiIsInNldFRhYmxlUmVmIiwib25Sb3dIaWdobGlnaHRlZCIsInJlbmRlclNpZGViYXIiLCJDb250ZXh0TWVudSIsImZsZXgiLCJDb2x1bW5TaXplcyIsIkNvbHVtbnMiLCJyZXNpemFibGUiLCJDb3VudCIsImJhY2tncm91bmQiLCJtYWNPU0hpZ2hsaWdodEFjdGl2ZSIsInBhZGRpbmciLCJtYXJnaW5MZWZ0IiwiQ2hlY2tib3giLCJJbnB1dCIsIm1hcmdpbiIsIkV4cHJlc3Npb25JbnB1dCIsImZsZXhHcm93IiwiV2F0Y2hlclBhbmVsIiwiUGFuZWwiLCJtaW5IZWlnaHQiLCJMb2dXYXRjaGVyIiwiUHVyZUNvbXBvbmVudCIsImlucHV0IiwiaGlnaGxpZ2h0ZWRSb3ciLCJmaW5kSW5kZXgiLCJvbkNoYW5nZSIsInRhcmdldCIsImluZGV4IiwibmV3Q291bnRlcnMiLCJyZXNldENvdW50Iiwic2V0Tm90aWZpY2F0aW9uIiwib25BZGQiLCJvbktleURvd24iLCJvblN1Ym1pdCIsImJ1aWxkUm93cyJdLCJtYXBwaW5ncyI6Ijs7QUNXQTs7QUFJQUEsRUFB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