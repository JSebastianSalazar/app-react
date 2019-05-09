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

  function charAt(string, index) {
    var first = string.charCodeAt(index);
    var second;

    if (first >= 0xD800 && first <= 0xDBFF && string.length > index + 1) {
      second = string.charCodeAt(index + 1);

      if (second >= 0xDC00 && second <= 0xDFFF) {
        return string.substring(index, index + 2);
      }
    }

    return string[index];
  }

  function slice(string, start, end) {
    var accumulator = "";
    var character;
    var stringIndex = 0;
    var unicodeIndex = 0;
    var length = string.length;

    while (stringIndex < length) {
      character = charAt(string, stringIndex);

      if (unicodeIndex >= start && unicodeIndex < end) {
        accumulator += character;
      }

      stringIndex += character.length;
      unicodeIndex += 1;
    }

    return accumulator;
  }

  function toNumber(value, fallback) {
    if (value === undefined) {
      return fallback;
    } else {
      return Number(value);
    }
  }

  module.exports = function (string, start, end) {
    var realStart = toNumber(start, 0);
    var realEnd = toNumber(end, string.length);

    if (realEnd == realStart) {
      return "";
    } else if (realEnd > realStart) {
      return slice(string, realStart, realEnd);
    } else {
      return slice(string, realEnd, realStart);
    }
  };
},-1252901977,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getNewPersisitedStateFromCrashLog = getNewPersisitedStateFromCrashLog;
  exports.parseCrashLogAndUpdateState = parseCrashLogAndUpdateState;
  exports.shouldShowCrashNotification = shouldShowCrashNotification;
  exports.parseCrashLog = parseCrashLog;
  exports.parsePath = parsePath;
  exports.default = undefined;
  var _flipper = global.Flipper;

  var _unicodeSubstring = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[0]));

  var _fs = _interopRequireDefault(electronRequire("fs"));

  var _os = _interopRequireDefault(electronRequire("os"));

  var _util = _interopRequireDefault(electronRequire("util"));

  var _path = _interopRequireDefault(electronRequire("path"));

  var _react = global.React;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  const Padder = (0, _flipper.styled)('div')(({
    paddingLeft,
    paddingRight,
    paddingBottom,
    paddingTop
  }) => ({
    paddingLeft: paddingLeft || 0,
    paddingRight: paddingRight || 0,
    paddingBottom: paddingBottom || 0,
    paddingTop: paddingTop || 0
  }));
  const Title = (0, _flipper.styled)(_flipper.Text)({
    fontWeight: 'bold',
    color: _flipper.colors.greyTint3,
    height: 'auto',
    width: 200,
    textOverflow: 'ellipsis'
  });
  const Line = (0, _flipper.styled)(_flipper.View)({
    backgroundColor: _flipper.colors.greyTint2,
    height: 1,
    width: 'auto',
    marginTop: 2,
    flexShrink: 0
  });
  const Container = (0, _flipper.styled)(_flipper.FlexColumn)({
    overflow: 'hidden',
    flexShrink: 0
  });
  const Value = (0, _flipper.styled)(Title)({
    maxHeight: 200,
    height: 'auto',
    flexGrow: 1
  });
  const FlexGrowColumn = (0, _flipper.styled)(_flipper.FlexColumn)({
    flexGrow: 1
  });
  const ScrollableColumn = (0, _flipper.styled)(FlexGrowColumn)({
    overflow: 'scroll',
    height: 'auto'
  });
  const StyledFlexGrowColumn = (0, _flipper.styled)(_flipper.FlexColumn)({
    flexGrow: 1
  });
  const StyledFlexRowColumn = (0, _flipper.styled)(_flipper.FlexRow)({
    aligItems: 'center',
    justifyContent: 'center',
    height: '100%'
  });
  const StyledFlexColumn = (0, _flipper.styled)(StyledFlexGrowColumn)({
    justifyContent: 'center',
    alignItems: 'center'
  });
  const MatchParentHeightComponent = (0, _flipper.styled)(_flipper.FlexRow)({
    height: '100%'
  });
  const ButtonGroupContainer = (0, _flipper.styled)(_flipper.FlexRow)({
    paddingLeft: 4,
    paddingTop: 2,
    paddingBottom: 2,
    height: '100%'
  });
  const StyledSelectContainer = (0, _flipper.styled)(_flipper.FlexRow)({
    paddingLeft: 8,
    paddingTop: 2,
    paddingBottom: 2,
    height: '100%'
  });
  const StyledSelect = (0, _flipper.styled)(_flipper.Select)({
    height: '100%',
    maxWidth: 200
  });

  function getNewPersisitedStateFromCrashLog(persistedState, persistingPlugin, content, os, logDate) {
    const persistedStateReducer = persistingPlugin.persistedStateReducer;

    if (!os || !persistedStateReducer) {
      return null;
    }

    const crash = parseCrashLog(content, os, logDate);
    const newPluginState = persistedStateReducer(persistedState, 'crash-report', crash);
    return newPluginState;
  }

  function parseCrashLogAndUpdateState(store, content, setPersistedState, logDate) {
    var _store$getState$conne;

    const os = (_store$getState$conne = store.getState().connections.selectedDevice) === null || _store$getState$conne === undefined ? undefined : _store$getState$conne.os;

    if (!shouldShowCrashNotification(store.getState().connections.selectedDevice, content, os)) {
      return;
    }

    const pluginID = CrashReporterPlugin.id;
    const pluginKey = (0, _flipper.getPluginKey)(null, store.getState().connections.selectedDevice, pluginID);
    const persistingPlugin = store.getState().plugins.devicePlugins.get(CrashReporterPlugin.id);

    if (!persistingPlugin) {
      return;
    }

    const pluginStates = store.getState().pluginStates;
    const persistedState = (0, _flipper.getPersistedState)(pluginKey, persistingPlugin, pluginStates);
    const newPluginState = getNewPersisitedStateFromCrashLog(persistedState, persistingPlugin, content, os, logDate);
    setPersistedState(pluginKey, newPluginState);
  }

  function shouldShowCrashNotification(baseDevice, content, os) {
    if (os && os === 'Android') {
      return true;
    }

    const appPath = parsePath(content);
    const serial = (baseDevice === null || baseDevice === undefined ? undefined : baseDevice.serial) || 'unknown';

    if (!appPath || !appPath.includes(serial)) {
      return false;
    }

    return true;
  }

  function parseCrashLog(content, os, logDate) {
    const stubString = 'Cannot figure out the cause';

    switch (os) {
      case 'iOS':
        {
          const regex = /Exception Type: *[\w]*/;
          const arr = regex.exec(content);
          const exceptionString = arr ? arr[0] : '';
          const exceptionRegex = /[\w]*$/;
          const tmp = exceptionRegex.exec(exceptionString);
          const exception = tmp && tmp[0].length ? tmp[0] : 'Cannot figure out the cause';
          let date = logDate;

          if (!date) {
            const dateRegex = /Date\/Time: *[\w\s\.:-]*/;
            const dateArr = dateRegex.exec(content);
            const dateString = dateArr ? dateArr[0] : '';
            const dateRegex2 = /[\w\s\.:-]*$/;
            const tmp1 = dateRegex2.exec(dateString);
            const extractedDateString = tmp1 && tmp1[0].length ? tmp1[0] : null;
            date = extractedDateString ? new Date(extractedDateString) : logDate;
          }

          const crash = {
            callstack: content,
            name: exception,
            reason: exception,
            date
          };
          return crash;
        }

      case 'Android':
        {
          const regForName = /.*\n/;
          const nameRegArr = regForName.exec(content);
          let name = nameRegArr ? nameRegArr[0] : stubString;
          const regForCallStack = /\tat[\w\s\n.$&+,:;=?@#|'<>.^*()%!-]*$/;
          const callStackArray = regForCallStack.exec(content);
          const callStack = callStackArray ? callStackArray[0] : '';
          let remainingString = callStack.length > 0 ? content.replace(callStack, '') : '';

          if (remainingString[remainingString.length - 1] === '\n') {
            remainingString = remainingString.slice(0, -1);
          }

          const reason = remainingString.length > 0 ? remainingString.split('\n').pop() : stubString;

          if (name[name.length - 1] === '\n') {
            name = name.slice(0, -1);
          }

          const crash = {
            callstack: content,
            name: name,
            reason: reason,
            date: logDate
          };
          return crash;
        }

      default:
        {
          throw new Error('Unsupported OS');
        }
    }
  }

  function truncate(baseString, numOfChars) {
    if (baseString.length <= numOfChars) {
      return baseString;
    }

    const truncated_string = (0, _unicodeSubstring.default)(baseString, 0, numOfChars - 1);
    return truncated_string + '\u2026';
  }

  function parsePath(content) {
    const regex = /Path: *[\w\-\/\.\t\ \_\%]*\n/;
    const arr = regex.exec(content);

    if (!arr || arr.length <= 0) {
      return null;
    }

    const pathString = arr[0];
    const pathRegex = /[\w\-\/\.\t\ \_\%]*\n/;
    const tmp = pathRegex.exec(pathString);

    if (!tmp || tmp.length == 0) {
      return null;
    }

    const path = tmp[0];
    return path.trim();
  }

  function addFileWatcherForiOSCrashLogs(store, setPersistedState) {
    const dir = _path.default.join(_os.default.homedir(), 'Library', 'Logs', 'DiagnosticReports');

    if (!_fs.default.existsSync(dir)) {
      return;
    }

    _fs.default.watch(dir, (eventType, filename) => {
      const checkFileExtension = /.crash$/.exec(filename);

      if (!filename || !checkFileExtension) {
        return;
      }

      _fs.default.readFile(_path.default.join(dir, filename), 'utf8', function (err, data) {
        var _store$getState$conne2;

        if (((_store$getState$conne2 = store.getState().connections.selectedDevice) === null || _store$getState$conne2 === undefined ? undefined : _store$getState$conne2.os) != 'iOS') {
          return;
        }

        if (err) {
          console.error(err);
          return;
        }

        parseCrashLogAndUpdateState(store, _util.default.format(data), setPersistedState);
      });
    });
  }

  class CrashSelector extends _react.Component {
    render() {
      const {
        crashes,
        selectedCrashID,
        orderedIDs,
        onCrashChange
      } = this.props;
      return global.React.createElement(StyledFlexRowColumn, null, global.React.createElement(ButtonGroupContainer, null, global.React.createElement(MatchParentHeightComponent, null, global.React.createElement(_flipper.Button, {
        disabled: Boolean(!orderedIDs || orderedIDs.length <= 1),
        compact: true,
        onClick: () => {
          if (onCrashChange && orderedIDs) {
            const index = orderedIDs.indexOf(selectedCrashID);
            const nextIndex = index < 1 ? orderedIDs.length - 1 : index - 1;
            const nextID = orderedIDs[nextIndex];
            onCrashChange(nextID);
          }
        },
        icon: "chevron-left",
        iconSize: 12,
        title: "Previous Crash"
      })), global.React.createElement(MatchParentHeightComponent, null, global.React.createElement(_flipper.Button, {
        disabled: Boolean(!orderedIDs || orderedIDs.length <= 1),
        compact: true,
        onClick: () => {
          if (onCrashChange && orderedIDs) {
            const index = orderedIDs.indexOf(selectedCrashID);
            const nextIndex = index >= orderedIDs.length - 1 ? 0 : index + 1;
            const nextID = orderedIDs[nextIndex];
            onCrashChange(nextID);
          }
        },
        icon: "chevron-right",
        iconSize: 12,
        title: "Next Crash"
      }))), global.React.createElement(StyledSelectContainer, null, global.React.createElement(StyledSelect, {
        grow: true,
        selected: selectedCrashID || 'NoCrashID',
        options: crashes || {
          NoCrashID: 'No Crash'
        },
        onChange: title => {
          for (const key in crashes) {
            if (crashes[key] === title && onCrashChange) {
              onCrashChange(key);
              return;
            }
          }
        }
      })));
    }

  }

  class CrashReporterBar extends _react.Component {
    render() {
      const {
        openLogsCallback,
        crashSelector
      } = this.props;
      return global.React.createElement(_flipper.Toolbar, null, global.React.createElement(CrashSelector, crashSelector), global.React.createElement(_flipper.Spacer, null), global.React.createElement(_flipper.Button, {
        disabled: Boolean(!openLogsCallback),
        onClick: openLogsCallback
      }, "Open In Logs"));
    }

  }

  class HeaderRow extends _react.Component {
    render() {
      const {
        title,
        value
      } = this.props;
      return global.React.createElement(Padder, {
        paddingTop: 8,
        paddingBottom: 2
      }, global.React.createElement(Container, null, global.React.createElement(Padder, {
        paddingLeft: 8
      }, global.React.createElement(_flipper.FlexRow, null, global.React.createElement(Title, null, title), global.React.createElement(_flipper.ContextMenu, {
        items: [{
          label: 'copy',
          click: () => {
            _flipper.clipboard.writeText(value);
          }
        }]
      }, global.React.createElement(Value, {
        code: true
      }, value)))), global.React.createElement(Line, null)));
    }

  }

  class CrashReporterPlugin extends _flipper.FlipperDevicePlugin {
    static supportsDevice(device) {
      return device.os === 'iOS' || device.os === 'Android';
    }

    constructor(props) {
      super(props);

      _defineProperty(this, "openInLogs", callstack => {
        this.props.selectPlugin('DeviceLogs', callstack);
      });

      let crash = null;

      if (this.props.persistedState.crashes && this.props.persistedState.crashes.length > 0) {
        crash = this.props.persistedState.crashes[this.props.persistedState.crashes.length - 1];
      }

      let deeplinkedCrash = null;

      if (this.props.deepLinkPayload) {
        const id = this.props.deepLinkPayload;
        const index = this.props.persistedState.crashes.findIndex(elem => {
          return elem.notificationID === id;
        });

        if (index >= 0) {
          deeplinkedCrash = this.props.persistedState.crashes[index];
        }
      }

      this.state = {
        crash: deeplinkedCrash || crash
      };
    }

    render() {
      let crashToBeInspected = this.state.crash;

      if (!crashToBeInspected && this.props.persistedState.crashes.length > 0) {
        crashToBeInspected = this.props.persistedState.crashes[this.props.persistedState.crashes.length - 1];
      }

      const crash = crashToBeInspected;

      if (crash) {
        const {
          crashes
        } = this.props.persistedState;
        const crashMap = crashes.reduce((acc, persistedCrash) => {
          const {
            notificationID,
            date
          } = persistedCrash;
          const name = 'Crash at ' + date.toLocaleString();
          acc[notificationID] = name;
          return acc;
        }, {});
        const orderedIDs = crashes.map(persistedCrash => persistedCrash.notificationID);
        const selectedCrashID = crash.notificationID;

        const onCrashChange = id => {
          const newSelectedCrash = crashes.find(element => {
            return element.notificationID === id;
          });
          this.setState({
            crash: newSelectedCrash
          });
          console.log('onCrashChange called', id);
        };

        const callstackString = crash.callstack;
        const children = crash.callstack.split('\n').map(str => {
          return {
            message: str
          };
        });
        const crashSelector = {
          crashes: crashMap,
          orderedIDs,
          selectedCrashID,
          onCrashChange
        };
        return global.React.createElement(_flipper.FlexColumn, null, this.device.os == 'Android' ? global.React.createElement(CrashReporterBar, {
          crashSelector: crashSelector,
          openLogsCallback: () => {
            this.openInLogs(crash.callstack);
          }
        }) : global.React.createElement(CrashReporterBar, {
          crashSelector: crashSelector
        }), global.React.createElement(ScrollableColumn, null, global.React.createElement(HeaderRow, {
          title: "Name",
          value: crash.name
        }), global.React.createElement(HeaderRow, {
          title: "Reason",
          value: crash.reason
        }), global.React.createElement(Padder, {
          paddingLeft: 8,
          paddingTop: 4,
          paddingBottom: 2
        }, global.React.createElement(Title, null, " Stacktrace ")), global.React.createElement(_flipper.ContextMenu, {
          items: [{
            label: 'copy',
            click: () => {
              _flipper.clipboard.writeText(callstackString);
            }
          }]
        }, global.React.createElement(Line, null), global.React.createElement(_flipper.StackTrace, {
          children: children,
          isCrash: false,
          padded: false,
          backgroundColor: _flipper.colors.greyStackTraceTint
        }))));
      }

      const crashSelector = {
        crashes: null,
        orderedIDs: null,
        selectedCrashID: null,
        onCrashChange: null
      };
      return global.React.createElement(StyledFlexGrowColumn, null, global.React.createElement(CrashReporterBar, {
        crashSelector: crashSelector
      }), global.React.createElement(StyledFlexColumn, null, global.React.createElement(Padder, {
        paddingBottom: 8
      }, global.React.createElement(Title, null, "No Crashes Logged"))));
    }

  }

  exports.default = CrashReporterPlugin;

  _defineProperty(CrashReporterPlugin, "defaultPersistedState", {
    crashes: []
  });

  _defineProperty(CrashReporterPlugin, "notificationID", 0);

  _defineProperty(CrashReporterPlugin, "persistedStateReducer", (persistedState, method, payload) => {
    if (method === 'crash-report' || method === 'flipper-crash-report') {
      CrashReporterPlugin.notificationID++;
      const mergedState = {
        crashes: persistedState.crashes.concat([{
          notificationID: CrashReporterPlugin.notificationID.toString(),
          callstack: payload.callstack,
          name: payload.name,
          reason: payload.reason,
          date: payload.date || new Date()
        }])
      };
      return mergedState;
    }

    return persistedState;
  });

  _defineProperty(CrashReporterPlugin, "trimCallStackIfPossible", callstack => {
    let regex = /Application Specific Information:/;
    const query = regex.exec(callstack);
    return query ? callstack.substring(0, query.index) : callstack;
  });

  _defineProperty(CrashReporterPlugin, "getActiveNotifications", persistedState => {
    return persistedState.crashes.map(crash => {
      const id = crash.notificationID;
      const title = `CRASH: ${truncate(crash.name, 50)} Reason: ${truncate(crash.reason, 50)}`;
      const callstack = CrashReporterPlugin.trimCallStackIfPossible(crash.callstack);
      const msg = `Callstack: ${truncate(callstack, 200)}`;
      return {
        id,
        message: msg,
        severity: 'error',
        title: title,
        action: id
      };
    });
  });

  _defineProperty(CrashReporterPlugin, "onRegisterDevice", (store, baseDevice, setPersistedState) => {
    if (baseDevice.os.includes('iOS')) {
      addFileWatcherForiOSCrashLogs(store, setPersistedState);
    } else {
      const referenceDate = new Date();

      (function (store, date, setPersistedState) {
        let androidLog = '';
        let androidLogUnderProcess = false;
        let timer = null;
        baseDevice.addLogListener(entry => {
          if ((0, _flipper.shouldParseAndroidLog)(entry, referenceDate)) {
            if (androidLogUnderProcess) {
              androidLog += '\n' + entry.message;
              androidLog = androidLog.trim();

              if (timer) {
                clearTimeout(timer);
              }
            } else {
              androidLog = entry.message;
              androidLogUnderProcess = true;
            }

            timer = setTimeout(() => {
              if (androidLog.length > 0) {
                parseCrashLogAndUpdateState(store, androidLog, setPersistedState, entry.date);
              }

              androidLogUnderProcess = false;
              androidLog = '';
            }, 50);
          }
        });
      })(store, referenceDate, setPersistedState);
    }
  });
},-166513706,[-1252901977]);
module.exports = global.__r(-166513706).default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9fcHJlbHVkZV9fIiwiL2RhdGEvc2FuZGNhc3RsZS9ib3hlcy90cnVuay1oZy1mYmNvZGUtZmJzb3VyY2UveHBsYXQvZmxpcHBlci1wdWJsaWMvc3RhdGljL25vZGVfbW9kdWxlcy9tZXRyby9zcmMvbGliL3BvbHlmaWxscy9yZXF1aXJlLmpzIiwiL2RhdGEvc2FuZGNhc3RsZS9ib3hlcy90cnVuay1oZy1mYmNvZGUtZmJzb3VyY2UveHBsYXQvZmxpcHBlci1wdWJsaWMvc3JjL3BsdWdpbnMvY3Jhc2hfcmVwb3J0ZXIvaW5kZXguanMiLCIvZGF0YS9zYW5kY2FzdGxlL2JveGVzL3RydW5rLWhnLWZiY29kZS1mYnNvdXJjZS94cGxhdC9mbGlwcGVyLXB1YmxpYy9zcmMvcGx1Z2lucy9jcmFzaF9yZXBvcnRlci9ub2RlX21vZHVsZXMvdW5pY29kZS1zdWJzdHJpbmcvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fREVWX189ZmFsc2UsX19CVU5ETEVfU1RBUlRfVElNRV9fPXRoaXMubmF0aXZlUGVyZm9ybWFuY2VOb3c/bmF0aXZlUGVyZm9ybWFuY2VOb3coKTpEYXRlLm5vdygpLHByb2Nlc3M9dGhpcy5wcm9jZXNzfHx7fTtwcm9jZXNzLmVudj1wcm9jZXNzLmVudnx8e307cHJvY2Vzcy5lbnYuTk9ERV9FTlY9XCJwcm9kdWN0aW9uXCI7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIEZhY2Vib29rLCBJbmMuIGFuZCBpdHMgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAcG9seWZpbGxcbiAqXG4gKiBAZm9ybWF0XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UgKi9cblxuZ2xvYmFsLl9fciA9IG1ldHJvUmVxdWlyZTtcbmdsb2JhbC5fX2QgPSBkZWZpbmU7XG5nbG9iYWwuX19jID0gY2xlYXI7XG5cbnZhciBtb2R1bGVzID0gY2xlYXIoKTtcblxuLy8gRG9uJ3QgdXNlIGEgU3ltYm9sIGhlcmUsIGl0IHdvdWxkIHB1bGwgaW4gYW4gZXh0cmEgcG9seWZpbGwgd2l0aCBhbGwgc29ydHMgb2Zcbi8vIGFkZGl0aW9uYWwgc3R1ZmYgKGUuZy4gQXJyYXkuZnJvbSkuXG52YXIgRU1QVFkgPSB7fTtcbnZhciBfcmVmID0ge30sXG4gIGhhc093blByb3BlcnR5ID0gX3JlZi5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gY2xlYXIoKSB7XG4gIG1vZHVsZXMgPVxuICAgIHR5cGVvZiBfX05VTV9NT0RVTEVTX18gPT09IFwibnVtYmVyXCJcbiAgICAgID8gQXJyYXkoX19OVU1fTU9EVUxFU19fIHwgMClcbiAgICAgIDogT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAvLyBXZSByZXR1cm4gbW9kdWxlcyBoZXJlIHNvIHRoYXQgd2UgY2FuIGFzc2lnbiBhbiBpbml0aWFsIHZhbHVlIHRvIG1vZHVsZXNcbiAgLy8gd2hlbiBkZWZpbmluZyBpdC4gT3RoZXJ3aXNlLCB3ZSB3b3VsZCBoYXZlIHRvIGRvIFwibGV0IG1vZHVsZXMgPSBudWxsXCIsXG4gIC8vIHdoaWNoIHdpbGwgZm9yY2UgdXMgdG8gYWRkIFwibnVsbHRocm93c1wiIGV2ZXJ5d2hlcmUuXG4gIHJldHVybiBtb2R1bGVzO1xufVxuXG5pZiAoX19ERVZfXykge1xuICB2YXIgdmVyYm9zZU5hbWVzVG9Nb2R1bGVJZHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB2YXIgaW5pdGlhbGl6aW5nTW9kdWxlSWRzID0gW107XG59XG5cbmZ1bmN0aW9uIGRlZmluZShmYWN0b3J5LCBtb2R1bGVJZCwgZGVwZW5kZW5jeU1hcCkge1xuICBpZiAobW9kdWxlc1ttb2R1bGVJZF0gIT0gbnVsbCkge1xuICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICAvLyAoV2UgdGFrZSBgaW52ZXJzZURlcGVuZGVuY2llc2AgZnJvbSBgYXJndW1lbnRzYCB0byBhdm9pZCBhbiB1bnVzZWRcbiAgICAgIC8vIG5hbWVkIHBhcmFtZXRlciBpbiBgZGVmaW5lYCBpbiBwcm9kdWN0aW9uLlxuICAgICAgdmFyIGludmVyc2VEZXBlbmRlbmNpZXMgPSBhcmd1bWVudHNbNF07XG5cbiAgICAgIC8vIElmIHRoZSBtb2R1bGUgaGFzIGFscmVhZHkgYmVlbiBkZWZpbmVkIGFuZCB0aGUgZGVmaW5lIG1ldGhvZCBoYXMgYmVlblxuICAgICAgLy8gY2FsbGVkIHdpdGggaW52ZXJzZURlcGVuZGVuY2llcywgd2UgY2FuIGhvdCByZWxvYWQgaXQuXG4gICAgICBpZiAoaW52ZXJzZURlcGVuZGVuY2llcykge1xuICAgICAgICBnbG9iYWwuX19hY2NlcHQobW9kdWxlSWQsIGZhY3RvcnksIGRlcGVuZGVuY3lNYXAsIGludmVyc2VEZXBlbmRlbmNpZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIFwiVHJ5aW5nIHRvIGRlZmluZSB0d2ljZSBtb2R1bGUgSUQgXCIgKyBtb2R1bGVJZCArIFwiIGluIHRoZSBzYW1lIGJ1bmRsZVwiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcHJldmVudCByZXBlYXRlZCBjYWxscyB0byBgZ2xvYmFsLm5hdGl2ZVJlcXVpcmVgIHRvIG92ZXJ3cml0ZSBtb2R1bGVzXG4gICAgLy8gdGhhdCBhcmUgYWxyZWFkeSBsb2FkZWRcbiAgICByZXR1cm47XG4gIH1cbiAgbW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gICAgZGVwZW5kZW5jeU1hcDogZGVwZW5kZW5jeU1hcCxcbiAgICBmYWN0b3J5OiBmYWN0b3J5LFxuICAgIGhhc0Vycm9yOiBmYWxzZSxcbiAgICBpbXBvcnRlZEFsbDogRU1QVFksXG4gICAgaW1wb3J0ZWREZWZhdWx0OiBFTVBUWSxcbiAgICBpc0luaXRpYWxpemVkOiBmYWxzZSxcbiAgICBwdWJsaWNNb2R1bGU6IHsgZXhwb3J0czoge30gfVxuICB9O1xuICBpZiAoX19ERVZfXykge1xuICAgIC8vIEhNUlxuICAgIG1vZHVsZXNbbW9kdWxlSWRdLmhvdCA9IGNyZWF0ZUhvdFJlbG9hZGluZ09iamVjdCgpO1xuXG4gICAgLy8gREVCVUdHQUJMRSBNT0RVTEVTIE5BTUVTXG4gICAgLy8gd2UgdGFrZSBgdmVyYm9zZU5hbWVgIGZyb20gYGFyZ3VtZW50c2AgdG8gYXZvaWQgYW4gdW51c2VkIG5hbWVkIHBhcmFtZXRlclxuICAgIC8vIGluIGBkZWZpbmVgIGluIHByb2R1Y3Rpb24uXG4gICAgdmFyIF92ZXJib3NlTmFtZSA9IGFyZ3VtZW50c1szXTtcbiAgICBpZiAoX3ZlcmJvc2VOYW1lKSB7XG4gICAgICBtb2R1bGVzW21vZHVsZUlkXS52ZXJib3NlTmFtZSA9IF92ZXJib3NlTmFtZTtcbiAgICAgIHZlcmJvc2VOYW1lc1RvTW9kdWxlSWRzW192ZXJib3NlTmFtZV0gPSBtb2R1bGVJZDtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbWV0cm9SZXF1aXJlKG1vZHVsZUlkKSB7XG4gIGlmIChfX0RFVl9fICYmIHR5cGVvZiBtb2R1bGVJZCA9PT0gXCJzdHJpbmdcIikge1xuICAgIHZhciBfdmVyYm9zZU5hbWUyID0gbW9kdWxlSWQ7XG4gICAgbW9kdWxlSWQgPSB2ZXJib3NlTmFtZXNUb01vZHVsZUlkc1tfdmVyYm9zZU5hbWUyXTtcbiAgICBpZiAobW9kdWxlSWQgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIG5hbWVkIG1vZHVsZTogXCInICsgX3ZlcmJvc2VOYW1lMiArICdcIicpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdSZXF1aXJpbmcgbW9kdWxlIFwiJyArXG4gICAgICAgICAgX3ZlcmJvc2VOYW1lMiArXG4gICAgICAgICAgJ1wiIGJ5IG5hbWUgaXMgb25seSBzdXBwb3J0ZWQgZm9yICcgK1xuICAgICAgICAgIFwiZGVidWdnaW5nIHB1cnBvc2VzIGFuZCB3aWxsIEJSRUFLIElOIFBST0RVQ1RJT04hXCJcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLy8kRmxvd0ZpeE1lOiBhdCB0aGlzIHBvaW50IHdlIGtub3cgdGhhdCBtb2R1bGVJZCBpcyBhIG51bWJlclxuICB2YXIgbW9kdWxlSWRSZWFsbHlJc051bWJlciA9IG1vZHVsZUlkO1xuXG4gIGlmIChfX0RFVl9fKSB7XG4gICAgdmFyIGluaXRpYWxpemluZ0luZGV4ID0gaW5pdGlhbGl6aW5nTW9kdWxlSWRzLmluZGV4T2YoXG4gICAgICBtb2R1bGVJZFJlYWxseUlzTnVtYmVyXG4gICAgKTtcbiAgICBpZiAoaW5pdGlhbGl6aW5nSW5kZXggIT09IC0xKSB7XG4gICAgICB2YXIgY3ljbGUgPSBpbml0aWFsaXppbmdNb2R1bGVJZHNcbiAgICAgICAgLnNsaWNlKGluaXRpYWxpemluZ0luZGV4KVxuICAgICAgICAubWFwKGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgICAgcmV0dXJuIG1vZHVsZXNbaWRdLnZlcmJvc2VOYW1lO1xuICAgICAgICB9KTtcbiAgICAgIC8vIFdlIHdhbnQgdG8gc2hvdyBBIC0+IEIgLT4gQTpcbiAgICAgIGN5Y2xlLnB1c2goY3ljbGVbMF0pO1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBcIlJlcXVpcmUgY3ljbGU6IFwiICtcbiAgICAgICAgICBjeWNsZS5qb2luKFwiIC0+IFwiKSArXG4gICAgICAgICAgXCJcXG5cXG5cIiArXG4gICAgICAgICAgXCJSZXF1aXJlIGN5Y2xlcyBhcmUgYWxsb3dlZCwgYnV0IGNhbiByZXN1bHQgaW4gdW5pbml0aWFsaXplZCB2YWx1ZXMuIFwiICtcbiAgICAgICAgICBcIkNvbnNpZGVyIHJlZmFjdG9yaW5nIHRvIHJlbW92ZSB0aGUgbmVlZCBmb3IgYSBjeWNsZS5cIlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICB2YXIgbW9kdWxlID0gbW9kdWxlc1ttb2R1bGVJZFJlYWxseUlzTnVtYmVyXTtcblxuICByZXR1cm4gbW9kdWxlICYmIG1vZHVsZS5pc0luaXRpYWxpemVkXG4gICAgPyBtb2R1bGUucHVibGljTW9kdWxlLmV4cG9ydHNcbiAgICA6IGd1YXJkZWRMb2FkTW9kdWxlKG1vZHVsZUlkUmVhbGx5SXNOdW1iZXIsIG1vZHVsZSk7XG59XG5cbmZ1bmN0aW9uIG1ldHJvSW1wb3J0RGVmYXVsdChtb2R1bGVJZCkge1xuICBpZiAoX19ERVZfXyAmJiB0eXBlb2YgbW9kdWxlSWQgPT09IFwic3RyaW5nXCIpIHtcbiAgICB2YXIgX3ZlcmJvc2VOYW1lMyA9IG1vZHVsZUlkO1xuICAgIG1vZHVsZUlkID0gdmVyYm9zZU5hbWVzVG9Nb2R1bGVJZHNbX3ZlcmJvc2VOYW1lM107XG4gIH1cblxuICAvLyRGbG93Rml4TWU6IGF0IHRoaXMgcG9pbnQgd2Uga25vdyB0aGF0IG1vZHVsZUlkIGlzIGEgbnVtYmVyXG4gIHZhciBtb2R1bGVJZFJlYWxseUlzTnVtYmVyID0gbW9kdWxlSWQ7XG5cbiAgaWYgKFxuICAgIG1vZHVsZXNbbW9kdWxlSWRSZWFsbHlJc051bWJlcl0gJiZcbiAgICBtb2R1bGVzW21vZHVsZUlkUmVhbGx5SXNOdW1iZXJdLmltcG9ydGVkRGVmYXVsdCAhPT0gRU1QVFlcbiAgKSB7XG4gICAgcmV0dXJuIG1vZHVsZXNbbW9kdWxlSWRSZWFsbHlJc051bWJlcl0uaW1wb3J0ZWREZWZhdWx0O1xuICB9XG5cbiAgdmFyIGV4cG9ydHMgPSBtZXRyb1JlcXVpcmUobW9kdWxlSWRSZWFsbHlJc051bWJlcik7XG4gIHZhciBpbXBvcnRlZERlZmF1bHQgPVxuICAgIGV4cG9ydHMgJiYgZXhwb3J0cy5fX2VzTW9kdWxlID8gZXhwb3J0cy5kZWZhdWx0IDogZXhwb3J0cztcblxuICByZXR1cm4gKG1vZHVsZXNbbW9kdWxlSWRSZWFsbHlJc051bWJlcl0uaW1wb3J0ZWREZWZhdWx0ID0gaW1wb3J0ZWREZWZhdWx0KTtcbn1cblxuZnVuY3Rpb24gbWV0cm9JbXBvcnRBbGwobW9kdWxlSWQpIHtcbiAgaWYgKF9fREVWX18gJiYgdHlwZW9mIG1vZHVsZUlkID09PSBcInN0cmluZ1wiKSB7XG4gICAgdmFyIF92ZXJib3NlTmFtZTQgPSBtb2R1bGVJZDtcbiAgICBtb2R1bGVJZCA9IHZlcmJvc2VOYW1lc1RvTW9kdWxlSWRzW192ZXJib3NlTmFtZTRdO1xuICB9XG5cbiAgLy8kRmxvd0ZpeE1lOiBhdCB0aGlzIHBvaW50IHdlIGtub3cgdGhhdCBtb2R1bGVJZCBpcyBhIG51bWJlclxuICB2YXIgbW9kdWxlSWRSZWFsbHlJc051bWJlciA9IG1vZHVsZUlkO1xuXG4gIGlmIChcbiAgICBtb2R1bGVzW21vZHVsZUlkUmVhbGx5SXNOdW1iZXJdICYmXG4gICAgbW9kdWxlc1ttb2R1bGVJZFJlYWxseUlzTnVtYmVyXS5pbXBvcnRlZEFsbCAhPT0gRU1QVFlcbiAgKSB7XG4gICAgcmV0dXJuIG1vZHVsZXNbbW9kdWxlSWRSZWFsbHlJc051bWJlcl0uaW1wb3J0ZWRBbGw7XG4gIH1cblxuICB2YXIgZXhwb3J0cyA9IG1ldHJvUmVxdWlyZShtb2R1bGVJZFJlYWxseUlzTnVtYmVyKTtcbiAgdmFyIGltcG9ydGVkQWxsID0gdm9pZCAwO1xuXG4gIGlmIChleHBvcnRzICYmIGV4cG9ydHMuX19lc01vZHVsZSkge1xuICAgIGltcG9ydGVkQWxsID0gZXhwb3J0cztcbiAgfSBlbHNlIHtcbiAgICBpbXBvcnRlZEFsbCA9IHt9O1xuXG4gICAgLy8gUmVmcmFpbiBmcm9tIHVzaW5nIE9iamVjdC5hc3NpZ24sIGl0IGhhcyB0byB3b3JrIGluIEVTMyBlbnZpcm9ubWVudHMuXG4gICAgaWYgKGV4cG9ydHMpIHtcbiAgICAgIGZvciAodmFyIF9rZXkgaW4gZXhwb3J0cykge1xuICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBfa2V5KSkge1xuICAgICAgICAgIGltcG9ydGVkQWxsW19rZXldID0gZXhwb3J0c1tfa2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGltcG9ydGVkQWxsLmRlZmF1bHQgPSBleHBvcnRzO1xuICB9XG5cbiAgcmV0dXJuIChtb2R1bGVzW21vZHVsZUlkUmVhbGx5SXNOdW1iZXJdLmltcG9ydGVkQWxsID0gaW1wb3J0ZWRBbGwpO1xufVxuXG52YXIgaW5HdWFyZCA9IGZhbHNlO1xuZnVuY3Rpb24gZ3VhcmRlZExvYWRNb2R1bGUobW9kdWxlSWQsIG1vZHVsZSkge1xuICBpZiAoIWluR3VhcmQgJiYgZ2xvYmFsLkVycm9yVXRpbHMpIHtcbiAgICBpbkd1YXJkID0gdHJ1ZTtcbiAgICB2YXIgcmV0dXJuVmFsdWUgPSB2b2lkIDA7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVyblZhbHVlID0gbG9hZE1vZHVsZUltcGxlbWVudGF0aW9uKG1vZHVsZUlkLCBtb2R1bGUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGdsb2JhbC5FcnJvclV0aWxzLnJlcG9ydEZhdGFsRXJyb3IoZSk7XG4gICAgfVxuICAgIGluR3VhcmQgPSBmYWxzZTtcbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxvYWRNb2R1bGVJbXBsZW1lbnRhdGlvbihtb2R1bGVJZCwgbW9kdWxlKTtcbiAgfVxufVxuXG52YXIgSURfTUFTS19TSElGVCA9IDE2O1xudmFyIExPQ0FMX0lEX01BU0sgPSB+MCA+Pj4gSURfTUFTS19TSElGVDtcblxuZnVuY3Rpb24gdW5wYWNrTW9kdWxlSWQobW9kdWxlSWQpIHtcbiAgdmFyIHNlZ21lbnRJZCA9IG1vZHVsZUlkID4+PiBJRF9NQVNLX1NISUZUO1xuICB2YXIgbG9jYWxJZCA9IG1vZHVsZUlkICYgTE9DQUxfSURfTUFTSztcbiAgcmV0dXJuIHsgc2VnbWVudElkOiBzZWdtZW50SWQsIGxvY2FsSWQ6IGxvY2FsSWQgfTtcbn1cbm1ldHJvUmVxdWlyZS51bnBhY2tNb2R1bGVJZCA9IHVucGFja01vZHVsZUlkO1xuXG5mdW5jdGlvbiBwYWNrTW9kdWxlSWQodmFsdWUpIHtcbiAgcmV0dXJuICh2YWx1ZS5zZWdtZW50SWQgPDwgSURfTUFTS19TSElGVCkgKyB2YWx1ZS5sb2NhbElkO1xufVxubWV0cm9SZXF1aXJlLnBhY2tNb2R1bGVJZCA9IHBhY2tNb2R1bGVJZDtcblxudmFyIGhvb2tzID0gW107XG5mdW5jdGlvbiByZWdpc3Rlckhvb2soY2IpIHtcbiAgdmFyIGhvb2sgPSB7IGNiOiBjYiB9O1xuICBob29rcy5wdXNoKGhvb2spO1xuICByZXR1cm4ge1xuICAgIHJlbGVhc2U6IGZ1bmN0aW9uIHJlbGVhc2UoKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhvb2tzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChob29rc1tpXSA9PT0gaG9vaykge1xuICAgICAgICAgIGhvb2tzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbm1ldHJvUmVxdWlyZS5yZWdpc3Rlckhvb2sgPSByZWdpc3Rlckhvb2s7XG5cbmZ1bmN0aW9uIGxvYWRNb2R1bGVJbXBsZW1lbnRhdGlvbihtb2R1bGVJZCwgbW9kdWxlKSB7XG4gIGlmICghbW9kdWxlICYmIGdsb2JhbC5fX2RlZmluZU1vZHVsZSkge1xuICAgIGdsb2JhbC5fX2RlZmluZU1vZHVsZShtb2R1bGVJZCk7XG4gICAgbW9kdWxlID0gbW9kdWxlc1ttb2R1bGVJZF07XG4gIH1cblxuICB2YXIgbmF0aXZlUmVxdWlyZSA9IGdsb2JhbC5uYXRpdmVSZXF1aXJlO1xuICBpZiAoIW1vZHVsZSAmJiBuYXRpdmVSZXF1aXJlKSB7XG4gICAgdmFyIF91bnBhY2tNb2R1bGVJZCA9IHVucGFja01vZHVsZUlkKG1vZHVsZUlkKSxcbiAgICAgIF9zZWdtZW50SWQgPSBfdW5wYWNrTW9kdWxlSWQuc2VnbWVudElkLFxuICAgICAgX2xvY2FsSWQgPSBfdW5wYWNrTW9kdWxlSWQubG9jYWxJZDtcblxuICAgIG5hdGl2ZVJlcXVpcmUoX2xvY2FsSWQsIF9zZWdtZW50SWQpO1xuICAgIG1vZHVsZSA9IG1vZHVsZXNbbW9kdWxlSWRdO1xuICB9XG5cbiAgaWYgKCFtb2R1bGUpIHtcbiAgICB0aHJvdyB1bmtub3duTW9kdWxlRXJyb3IobW9kdWxlSWQpO1xuICB9XG5cbiAgaWYgKG1vZHVsZS5oYXNFcnJvcikge1xuICAgIHRocm93IG1vZHVsZVRocmV3RXJyb3IobW9kdWxlSWQsIG1vZHVsZS5lcnJvcik7XG4gIH1cblxuICAvLyBgbWV0cm9SZXF1aXJlYCBjYWxscyBpbnRvIHRoZSByZXF1aXJlIHBvbHlmaWxsIGl0c2VsZiBhcmUgbm90IGFuYWx5emVkIGFuZFxuICAvLyByZXBsYWNlZCBzbyB0aGF0IHRoZXkgdXNlIG51bWVyaWMgbW9kdWxlIElEcy5cbiAgLy8gVGhlIHN5c3RyYWNlIG1vZHVsZSB3aWxsIGV4cG9zZSBpdHNlbGYgb24gdGhlIG1ldHJvUmVxdWlyZSBmdW5jdGlvbiBzbyB0aGF0XG4gIC8vIGl0IGNhbiBiZSB1c2VkIGhlcmUuXG4gIC8vIFRPRE8oZGF2aWRhdXJlbGlvKSBTY2FuIHBvbHlmaWxscyBmb3IgZGVwZW5kZW5jaWVzLCB0b28gKHQ5NzU5Njg2KVxuICBpZiAoX19ERVZfXykge1xuICAgIHZhciBTeXN0cmFjZSA9IG1ldHJvUmVxdWlyZS5TeXN0cmFjZTtcbiAgfVxuXG4gIC8vIFdlIG11c3Qgb3B0aW1pc3RpY2FsbHkgbWFyayBtb2R1bGUgYXMgaW5pdGlhbGl6ZWQgYmVmb3JlIHJ1bm5pbmcgdGhlXG4gIC8vIGZhY3RvcnkgdG8ga2VlcCBhbnkgcmVxdWlyZSBjeWNsZXMgaW5zaWRlIHRoZSBmYWN0b3J5IGZyb20gY2F1c2luZyBhblxuICAvLyBpbmZpbml0ZSByZXF1aXJlIGxvb3AuXG4gIG1vZHVsZS5pc0luaXRpYWxpemVkID0gdHJ1ZTtcblxuICB2YXIgX21vZHVsZSA9IG1vZHVsZSxcbiAgICBmYWN0b3J5ID0gX21vZHVsZS5mYWN0b3J5LFxuICAgIGRlcGVuZGVuY3lNYXAgPSBfbW9kdWxlLmRlcGVuZGVuY3lNYXA7XG5cbiAgaWYgKF9fREVWX18pIHtcbiAgICBpbml0aWFsaXppbmdNb2R1bGVJZHMucHVzaChtb2R1bGVJZCk7XG4gIH1cbiAgdHJ5IHtcbiAgICBpZiAoX19ERVZfXykge1xuICAgICAgLy8gJEZsb3dGaXhNZTogd2Uga25vdyB0aGF0IF9fREVWX18gaXMgY29uc3QgYW5kIGBTeXN0cmFjZWAgZXhpc3RzXG4gICAgICBTeXN0cmFjZS5iZWdpbkV2ZW50KFwiSlNfcmVxdWlyZV9cIiArIChtb2R1bGUudmVyYm9zZU5hbWUgfHwgbW9kdWxlSWQpKTtcbiAgICB9XG5cbiAgICB2YXIgX21vZHVsZU9iamVjdCA9IG1vZHVsZS5wdWJsaWNNb2R1bGU7XG5cbiAgICBpZiAoX19ERVZfXykge1xuICAgICAgaWYgKG1vZHVsZS5ob3QpIHtcbiAgICAgICAgX21vZHVsZU9iamVjdC5ob3QgPSBtb2R1bGUuaG90O1xuICAgICAgfVxuICAgIH1cbiAgICBfbW9kdWxlT2JqZWN0LmlkID0gbW9kdWxlSWQ7XG5cbiAgICBpZiAoaG9va3MubGVuZ3RoID4gMCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBob29rcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBob29rc1tpXS5jYihtb2R1bGVJZCwgX21vZHVsZU9iamVjdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8ga2VlcCBhcmdzIGluIHN5bmMgd2l0aCB3aXRoIGRlZmluZU1vZHVsZUNvZGUgaW5cbiAgICAvLyBtZXRyby9zcmMvUmVzb2x2ZXIvaW5kZXguanNcbiAgICAvLyBhbmQgbWV0cm8vc3JjL01vZHVsZUdyYXBoL3dvcmtlci5qc1xuICAgIGZhY3RvcnkoXG4gICAgICBnbG9iYWwsXG4gICAgICBtZXRyb1JlcXVpcmUsXG4gICAgICBtZXRyb0ltcG9ydERlZmF1bHQsXG4gICAgICBtZXRyb0ltcG9ydEFsbCxcbiAgICAgIF9tb2R1bGVPYmplY3QsXG4gICAgICBfbW9kdWxlT2JqZWN0LmV4cG9ydHMsXG4gICAgICBkZXBlbmRlbmN5TWFwXG4gICAgKTtcblxuICAgIC8vIGF2b2lkIHJlbW92aW5nIGZhY3RvcnkgaW4gREVWIG1vZGUgYXMgaXQgYnJlYWtzIEhNUlxuICAgIGlmICghX19ERVZfXykge1xuICAgICAgLy8gJEZsb3dGaXhNZTogVGhpcyBpcyBvbmx5IHNvdW5kIGJlY2F1c2Ugd2UgbmV2ZXIgYWNjZXNzIGBmYWN0b3J5YCBhZ2FpblxuICAgICAgbW9kdWxlLmZhY3RvcnkgPSB1bmRlZmluZWQ7XG4gICAgICBtb2R1bGUuZGVwZW5kZW5jeU1hcCA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAoX19ERVZfXykge1xuICAgICAgLy8gJEZsb3dGaXhNZTogd2Uga25vdyB0aGF0IF9fREVWX18gaXMgY29uc3QgYW5kIGBTeXN0cmFjZWAgZXhpc3RzXG4gICAgICBTeXN0cmFjZS5lbmRFdmVudCgpO1xuICAgIH1cbiAgICByZXR1cm4gX21vZHVsZU9iamVjdC5leHBvcnRzO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbW9kdWxlLmhhc0Vycm9yID0gdHJ1ZTtcbiAgICBtb2R1bGUuZXJyb3IgPSBlO1xuICAgIG1vZHVsZS5pc0luaXRpYWxpemVkID0gZmFsc2U7XG4gICAgbW9kdWxlLnB1YmxpY01vZHVsZS5leHBvcnRzID0gdW5kZWZpbmVkO1xuICAgIHRocm93IGU7XG4gIH0gZmluYWxseSB7XG4gICAgaWYgKF9fREVWX18pIHtcbiAgICAgIGlmIChpbml0aWFsaXppbmdNb2R1bGVJZHMucG9wKCkgIT09IG1vZHVsZUlkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBcImluaXRpYWxpemluZ01vZHVsZUlkcyBpcyBjb3JydXB0OyBzb21ldGhpbmcgaXMgdGVycmlibHkgd3JvbmdcIlxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB1bmtub3duTW9kdWxlRXJyb3IoaWQpIHtcbiAgdmFyIG1lc3NhZ2UgPSAnUmVxdWlyaW5nIHVua25vd24gbW9kdWxlIFwiJyArIGlkICsgJ1wiLic7XG4gIGlmIChfX0RFVl9fKSB7XG4gICAgbWVzc2FnZSArPVxuICAgICAgXCJJZiB5b3UgYXJlIHN1cmUgdGhlIG1vZHVsZSBpcyB0aGVyZSwgdHJ5IHJlc3RhcnRpbmcgTWV0cm8gQnVuZGxlci4gXCIgK1xuICAgICAgXCJZb3UgbWF5IGFsc28gd2FudCB0byBydW4gYHlhcm5gLCBvciBgbnBtIGluc3RhbGxgIChkZXBlbmRpbmcgb24geW91ciBlbnZpcm9ubWVudCkuXCI7XG4gIH1cbiAgcmV0dXJuIEVycm9yKG1lc3NhZ2UpO1xufVxuXG5mdW5jdGlvbiBtb2R1bGVUaHJld0Vycm9yKGlkLCBlcnJvcikge1xuICB2YXIgZGlzcGxheU5hbWUgPSAoX19ERVZfXyAmJiBtb2R1bGVzW2lkXSAmJiBtb2R1bGVzW2lkXS52ZXJib3NlTmFtZSkgfHwgaWQ7XG4gIHJldHVybiBFcnJvcihcbiAgICAnUmVxdWlyaW5nIG1vZHVsZSBcIicgKyBkaXNwbGF5TmFtZSArICdcIiwgd2hpY2ggdGhyZXcgYW4gZXhjZXB0aW9uOiAnICsgZXJyb3JcbiAgKTtcbn1cblxuaWYgKF9fREVWX18pIHtcbiAgbWV0cm9SZXF1aXJlLlN5c3RyYWNlID0ge1xuICAgIGJlZ2luRXZlbnQ6IGZ1bmN0aW9uIGJlZ2luRXZlbnQoKSB7fSxcbiAgICBlbmRFdmVudDogZnVuY3Rpb24gZW5kRXZlbnQoKSB7fVxuICB9O1xuXG4gIG1ldHJvUmVxdWlyZS5nZXRNb2R1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG1vZHVsZXM7XG4gIH07XG5cbiAgLy8gSE9UIE1PRFVMRSBSRUxPQURJTkdcbiAgdmFyIGNyZWF0ZUhvdFJlbG9hZGluZ09iamVjdCA9IGZ1bmN0aW9uIGNyZWF0ZUhvdFJlbG9hZGluZ09iamVjdCgpIHtcbiAgICB2YXIgaG90ID0ge1xuICAgICAgYWNjZXB0Q2FsbGJhY2s6IG51bGwsXG4gICAgICBhY2NlcHQ6IGZ1bmN0aW9uIGFjY2VwdChjYWxsYmFjaykge1xuICAgICAgICBob3QuYWNjZXB0Q2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgIH0sXG4gICAgICBkaXNwb3NlQ2FsbGJhY2s6IG51bGwsXG4gICAgICBkaXNwb3NlOiBmdW5jdGlvbiBkaXNwb3NlKGNhbGxiYWNrKSB7XG4gICAgICAgIGhvdC5kaXNwb3NlQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBob3Q7XG4gIH07XG5cbiAgdmFyIG1ldHJvQWNjZXB0QWxsID0gZnVuY3Rpb24gbWV0cm9BY2NlcHRBbGwoXG4gICAgZGVwZW5kZW50TW9kdWxlcyxcbiAgICBpbnZlcnNlRGVwZW5kZW5jaWVzLFxuICAgIHBhdGNoZWRNb2R1bGVzXG4gICkge1xuICAgIGlmICghZGVwZW5kZW50TW9kdWxlcyB8fCBkZXBlbmRlbnRNb2R1bGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFyIG5vdEFjY2VwdGVkID0gZGVwZW5kZW50TW9kdWxlcy5maWx0ZXIoZnVuY3Rpb24obW9kdWxlKSB7XG4gICAgICByZXR1cm4gIW1ldHJvQWNjZXB0KFxuICAgICAgICBtb2R1bGUsXG4gICAgICAgIC8qZmFjdG9yeSovIHVuZGVmaW5lZCxcbiAgICAgICAgLypkZXBlbmRlbmN5TWFwKi8gdW5kZWZpbmVkLFxuICAgICAgICBpbnZlcnNlRGVwZW5kZW5jaWVzLFxuICAgICAgICBwYXRjaGVkTW9kdWxlc1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHZhciBwYXJlbnRzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub3RBY2NlcHRlZC5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gaWYgdGhlIG1vZHVsZSBoYXMgbm8gcGFyZW50cyB0aGVuIHRoZSBjaGFuZ2UgY2Fubm90IGJlIGhvdCBsb2FkZWRcbiAgICAgIGlmIChpbnZlcnNlRGVwZW5kZW5jaWVzW25vdEFjY2VwdGVkW2ldXS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBwYXJlbnRzLnB1c2guYXBwbHkocGFyZW50cywgaW52ZXJzZURlcGVuZGVuY2llc1tub3RBY2NlcHRlZFtpXV0pO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJlbnRzLmxlbmd0aCA9PSAwO1xuICB9O1xuXG4gIHZhciBtZXRyb0FjY2VwdCA9IGZ1bmN0aW9uIG1ldHJvQWNjZXB0KFxuICAgIGlkLFxuICAgIGZhY3RvcnksXG4gICAgZGVwZW5kZW5jeU1hcCxcbiAgICBpbnZlcnNlRGVwZW5kZW5jaWVzXG4gICkge1xuICAgIHZhciBwYXRjaGVkTW9kdWxlcyA9XG4gICAgICBhcmd1bWVudHMubGVuZ3RoID4gNCAmJiBhcmd1bWVudHNbNF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s0XSA6IHt9O1xuXG4gICAgaWYgKGlkIGluIHBhdGNoZWRNb2R1bGVzKSB7XG4gICAgICAvLyBEbyBub3QgcGF0Y2ggdGhlIHNhbWUgbW9kdWxlIG1vcmUgdGhhdCBvbmNlIGR1cmluZyBhbiB1cGRhdGUuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcGF0Y2hlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblxuICAgIHZhciBtb2QgPSBtb2R1bGVzW2lkXTtcblxuICAgIGlmICghbW9kICYmIGZhY3RvcnkpIHtcbiAgICAgIC8vIE5ldyBtb2R1bGVzIGFyZSBnb2luZyB0byBiZSBoYW5kbGVkIGJ5IHRoZSBkZWZpbmUoKSBtZXRob2QuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgaG90ID0gbW9kLmhvdDtcblxuICAgIGlmICghaG90KSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIFwiQ2Fubm90IGFjY2VwdCBtb2R1bGUgYmVjYXVzZSBIb3QgTW9kdWxlIFJlcGxhY2VtZW50IFwiICtcbiAgICAgICAgICBcIkFQSSB3YXMgbm90IGluc3RhbGxlZC5cIlxuICAgICAgKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoaG90LmRpc3Bvc2VDYWxsYmFjaykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaG90LmRpc3Bvc2VDYWxsYmFjaygpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBcIkVycm9yIHdoaWxlIGNhbGxpbmcgZGlzcG9zZSBoYW5kbGVyIGZvciBtb2R1bGUgXCIgKyBpZCArIFwiOiBcIixcbiAgICAgICAgICBlcnJvclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJlcGxhY2UgYW5kIGluaXRpYWxpemUgZmFjdG9yeVxuICAgIGlmIChmYWN0b3J5KSB7XG4gICAgICBtb2QuZmFjdG9yeSA9IGZhY3Rvcnk7XG4gICAgfVxuICAgIGlmIChkZXBlbmRlbmN5TWFwKSB7XG4gICAgICBtb2QuZGVwZW5kZW5jeU1hcCA9IGRlcGVuZGVuY3lNYXA7XG4gICAgfVxuICAgIG1vZC5oYXNFcnJvciA9IGZhbHNlO1xuICAgIG1vZC5pc0luaXRpYWxpemVkID0gZmFsc2U7XG4gICAgbWV0cm9SZXF1aXJlKGlkKTtcblxuICAgIGlmIChob3QuYWNjZXB0Q2FsbGJhY2spIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGhvdC5hY2NlcHRDYWxsYmFjaygpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgXCJFcnJvciB3aGlsZSBjYWxsaW5nIGFjY2VwdCBoYW5kbGVyIGZvciBtb2R1bGUgXCIgKyBpZCArIFwiOiBcIixcbiAgICAgICAgICBlcnJvclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIG5lZWQgdG8gaGF2ZSBpbnZlcnNlRGVwZW5kZW5jaWVzIHRvIGJ1YmJsZSB1cCBhY2NlcHRcbiAgICBpZiAoIWludmVyc2VEZXBlbmRlbmNpZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZGVmaW5lZCBgaW52ZXJzZURlcGVuZGVuY2llc2BcIik7XG4gICAgfVxuXG4gICAgLy8gYWNjZXB0IHBhcmVudCBtb2R1bGVzIHJlY3Vyc2l2ZWx5IHVwIHVudGlsIGFsbCBzaWJsaW5ncyBhcmUgYWNjZXB0ZWRcbiAgICByZXR1cm4gbWV0cm9BY2NlcHRBbGwoXG4gICAgICBpbnZlcnNlRGVwZW5kZW5jaWVzW2lkXSxcbiAgICAgIGludmVyc2VEZXBlbmRlbmNpZXMsXG4gICAgICBwYXRjaGVkTW9kdWxlc1xuICAgICk7XG4gIH07XG5cbiAgZ2xvYmFsLl9fYWNjZXB0ID0gbWV0cm9BY2NlcHQ7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE4LXByZXNlbnQgRmFjZWJvb2suXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqIEBmb3JtYXRcbiAqIEBmbG93XG4gKi9cblxuaW1wb3J0IHtcbiAgRmxpcHBlckRldmljZVBsdWdpbixcbiAgRGV2aWNlLFxuICBWaWV3LFxuICBzdHlsZWQsXG4gIEZsZXhDb2x1bW4sXG4gIEZsZXhSb3csXG4gIENvbnRleHRNZW51LFxuICBjbGlwYm9hcmQsXG4gIEJ1dHRvbixcbiAgRmxpcHBlclBsdWdpbixcbiAgZ2V0UGx1Z2luS2V5LFxuICBnZXRQZXJzaXN0ZWRTdGF0ZSxcbiAgQmFzZURldmljZSxcbiAgc2hvdWxkUGFyc2VBbmRyb2lkTG9nLFxuICBTdGFja1RyYWNlLFxuICBUZXh0LFxuICBjb2xvcnMsXG4gIFRvb2xiYXIsXG4gIFNwYWNlcixcbiAgU2VsZWN0LFxufSBmcm9tICdmbGlwcGVyJztcbmltcG9ydCB1bmljb2RlU3Vic3RyaW5nIGZyb20gJ3VuaWNvZGUtc3Vic3RyaW5nJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgb3MgZnJvbSAnb3MnO1xuaW1wb3J0IHV0aWwgZnJvbSAndXRpbCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB0eXBlIHtOb3RpZmljYXRpb259IGZyb20gJy4uLy4uL3BsdWdpbic7XG5pbXBvcnQgdHlwZSB7U3RvcmUsIERldmljZUxvZ0VudHJ5LCBPUywgUHJvcHN9IGZyb20gJ2ZsaXBwZXInO1xuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcblxudHlwZSBIZWFkZXJSb3dQcm9wcyA9IHtcbiAgdGl0bGU6IHN0cmluZyxcbiAgdmFsdWU6IHN0cmluZyxcbn07XG50eXBlIG9wZW5Mb2dzQ2FsbGJhY2tUeXBlID0gKCkgPT4gdm9pZDtcblxudHlwZSBDcmFzaFJlcG9ydGVyQmFyUHJvcHMgPSB7fFxuICBvcGVuTG9nc0NhbGxiYWNrPzogb3BlbkxvZ3NDYWxsYmFja1R5cGUsXG4gIGNyYXNoU2VsZWN0b3I6IENyYXNoU2VsZWN0b3JQcm9wcyxcbnx9O1xuXG50eXBlIENyYXNoU2VsZWN0b3JQcm9wcyA9IHt8XG4gIGNyYXNoZXM6ID97W2tleTogc3RyaW5nXTogc3RyaW5nfSxcbiAgb3JkZXJlZElEczogP0FycmF5PHN0cmluZz4sXG4gIHNlbGVjdGVkQ3Jhc2hJRDogP3N0cmluZyxcbiAgb25DcmFzaENoYW5nZTogPyhzdHJpbmcpID0+IHZvaWQsXG58fTtcblxuZXhwb3J0IHR5cGUgQ3Jhc2ggPSB7fFxuICBub3RpZmljYXRpb25JRDogc3RyaW5nLFxuICBjYWxsc3RhY2s6IHN0cmluZyxcbiAgcmVhc29uOiBzdHJpbmcsXG4gIG5hbWU6IHN0cmluZyxcbiAgZGF0ZTogRGF0ZSxcbnx9O1xuXG5leHBvcnQgdHlwZSBDcmFzaExvZyA9IHt8XG4gIGNhbGxzdGFjazogc3RyaW5nLFxuICByZWFzb246IHN0cmluZyxcbiAgbmFtZTogc3RyaW5nLFxuICBkYXRlOiA/RGF0ZSxcbnx9O1xuXG5leHBvcnQgdHlwZSBQZXJzaXN0ZWRTdGF0ZSA9IHtcbiAgY3Jhc2hlczogQXJyYXk8Q3Jhc2g+LFxufTtcblxudHlwZSBTdGF0ZSA9IHtcbiAgY3Jhc2g6ID9DcmFzaCxcbn07XG5cbmNvbnN0IFBhZGRlciA9IHN0eWxlZCgnZGl2JykoXG4gICh7cGFkZGluZ0xlZnQsIHBhZGRpbmdSaWdodCwgcGFkZGluZ0JvdHRvbSwgcGFkZGluZ1RvcH0pID0+ICh7XG4gICAgcGFkZGluZ0xlZnQ6IHBhZGRpbmdMZWZ0IHx8IDAsXG4gICAgcGFkZGluZ1JpZ2h0OiBwYWRkaW5nUmlnaHQgfHwgMCxcbiAgICBwYWRkaW5nQm90dG9tOiBwYWRkaW5nQm90dG9tIHx8IDAsXG4gICAgcGFkZGluZ1RvcDogcGFkZGluZ1RvcCB8fCAwLFxuICB9KSxcbik7XG5cbmNvbnN0IFRpdGxlID0gc3R5bGVkKFRleHQpKHtcbiAgZm9udFdlaWdodDogJ2JvbGQnLFxuICBjb2xvcjogY29sb3JzLmdyZXlUaW50MyxcbiAgaGVpZ2h0OiAnYXV0bycsXG4gIHdpZHRoOiAyMDAsXG4gIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbn0pO1xuXG5jb25zdCBMaW5lID0gc3R5bGVkKFZpZXcpKHtcbiAgYmFja2dyb3VuZENvbG9yOiBjb2xvcnMuZ3JleVRpbnQyLFxuICBoZWlnaHQ6IDEsXG4gIHdpZHRoOiAnYXV0bycsXG4gIG1hcmdpblRvcDogMixcbiAgZmxleFNocmluazogMCxcbn0pO1xuXG5jb25zdCBDb250YWluZXIgPSBzdHlsZWQoRmxleENvbHVtbikoe1xuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIGZsZXhTaHJpbms6IDAsXG59KTtcblxuY29uc3QgVmFsdWUgPSBzdHlsZWQoVGl0bGUpKHtcbiAgbWF4SGVpZ2h0OiAyMDAsXG4gIGhlaWdodDogJ2F1dG8nLFxuICBmbGV4R3JvdzogMSxcbn0pO1xuXG5jb25zdCBGbGV4R3Jvd0NvbHVtbiA9IHN0eWxlZChGbGV4Q29sdW1uKSh7XG4gIGZsZXhHcm93OiAxLFxufSk7XG5cbmNvbnN0IFNjcm9sbGFibGVDb2x1bW4gPSBzdHlsZWQoRmxleEdyb3dDb2x1bW4pKHtcbiAgb3ZlcmZsb3c6ICdzY3JvbGwnLFxuICBoZWlnaHQ6ICdhdXRvJyxcbn0pO1xuXG5jb25zdCBTdHlsZWRGbGV4R3Jvd0NvbHVtbiA9IHN0eWxlZChGbGV4Q29sdW1uKSh7XG4gIGZsZXhHcm93OiAxLFxufSk7XG5cbmNvbnN0IFN0eWxlZEZsZXhSb3dDb2x1bW4gPSBzdHlsZWQoRmxleFJvdykoe1xuICBhbGlnSXRlbXM6ICdjZW50ZXInLFxuICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gIGhlaWdodDogJzEwMCUnLFxufSk7XG5cbmNvbnN0IFN0eWxlZEZsZXhDb2x1bW4gPSBzdHlsZWQoU3R5bGVkRmxleEdyb3dDb2x1bW4pKHtcbiAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbn0pO1xuXG5jb25zdCBNYXRjaFBhcmVudEhlaWdodENvbXBvbmVudCA9IHN0eWxlZChGbGV4Um93KSh7XG4gIGhlaWdodDogJzEwMCUnLFxufSk7XG5cbmNvbnN0IEJ1dHRvbkdyb3VwQ29udGFpbmVyID0gc3R5bGVkKEZsZXhSb3cpKHtcbiAgcGFkZGluZ0xlZnQ6IDQsXG4gIHBhZGRpbmdUb3A6IDIsXG4gIHBhZGRpbmdCb3R0b206IDIsXG4gIGhlaWdodDogJzEwMCUnLFxufSk7XG5cbmNvbnN0IFN0eWxlZFNlbGVjdENvbnRhaW5lciA9IHN0eWxlZChGbGV4Um93KSh7XG4gIHBhZGRpbmdMZWZ0OiA4LFxuICBwYWRkaW5nVG9wOiAyLFxuICBwYWRkaW5nQm90dG9tOiAyLFxuICBoZWlnaHQ6ICcxMDAlJyxcbn0pO1xuXG5jb25zdCBTdHlsZWRTZWxlY3QgPSBzdHlsZWQoU2VsZWN0KSh7XG4gIGhlaWdodDogJzEwMCUnLFxuICBtYXhXaWR0aDogMjAwLFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROZXdQZXJzaXNpdGVkU3RhdGVGcm9tQ3Jhc2hMb2coXG4gIHBlcnNpc3RlZFN0YXRlOiA/UGVyc2lzdGVkU3RhdGUsXG4gIHBlcnNpc3RpbmdQbHVnaW46IENsYXNzPEZsaXBwZXJEZXZpY2VQbHVnaW48PiB8IEZsaXBwZXJQbHVnaW48Pj4sXG4gIGNvbnRlbnQ6IHN0cmluZyxcbiAgb3M6ID9PUyxcbiAgbG9nRGF0ZTogP0RhdGUsXG4pOiA/UGVyc2lzdGVkU3RhdGUge1xuICBjb25zdCBwZXJzaXN0ZWRTdGF0ZVJlZHVjZXIgPSBwZXJzaXN0aW5nUGx1Z2luLnBlcnNpc3RlZFN0YXRlUmVkdWNlcjtcbiAgaWYgKCFvcyB8fCAhcGVyc2lzdGVkU3RhdGVSZWR1Y2VyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgY29uc3QgY3Jhc2ggPSBwYXJzZUNyYXNoTG9nKGNvbnRlbnQsIG9zLCBsb2dEYXRlKTtcbiAgY29uc3QgbmV3UGx1Z2luU3RhdGUgPSBwZXJzaXN0ZWRTdGF0ZVJlZHVjZXIoXG4gICAgcGVyc2lzdGVkU3RhdGUsXG4gICAgJ2NyYXNoLXJlcG9ydCcsXG4gICAgY3Jhc2gsXG4gICk7XG4gIHJldHVybiBuZXdQbHVnaW5TdGF0ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ3Jhc2hMb2dBbmRVcGRhdGVTdGF0ZShcbiAgc3RvcmU6IFN0b3JlLFxuICBjb250ZW50OiBzdHJpbmcsXG4gIHNldFBlcnNpc3RlZFN0YXRlOiAoXG4gICAgcGx1Z2luS2V5OiBzdHJpbmcsXG4gICAgbmV3UGx1Z2luU3RhdGU6ID9QZXJzaXN0ZWRTdGF0ZSxcbiAgKSA9PiB2b2lkLFxuICBsb2dEYXRlOiA/RGF0ZSxcbikge1xuICBjb25zdCBvcyA9IHN0b3JlLmdldFN0YXRlKCkuY29ubmVjdGlvbnMuc2VsZWN0ZWREZXZpY2U/Lm9zO1xuICBpZiAoXG4gICAgIXNob3VsZFNob3dDcmFzaE5vdGlmaWNhdGlvbihcbiAgICAgIHN0b3JlLmdldFN0YXRlKCkuY29ubmVjdGlvbnMuc2VsZWN0ZWREZXZpY2UsXG4gICAgICBjb250ZW50LFxuICAgICAgb3MsXG4gICAgKVxuICApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgcGx1Z2luSUQgPSBDcmFzaFJlcG9ydGVyUGx1Z2luLmlkO1xuICBjb25zdCBwbHVnaW5LZXkgPSBnZXRQbHVnaW5LZXkoXG4gICAgbnVsbCxcbiAgICBzdG9yZS5nZXRTdGF0ZSgpLmNvbm5lY3Rpb25zLnNlbGVjdGVkRGV2aWNlLFxuICAgIHBsdWdpbklELFxuICApO1xuICBjb25zdCBwZXJzaXN0aW5nUGx1Z2luOiA/Q2xhc3M8XG4gICAgRmxpcHBlckRldmljZVBsdWdpbjw+IHwgRmxpcHBlclBsdWdpbjw+LFxuICA+ID0gc3RvcmUuZ2V0U3RhdGUoKS5wbHVnaW5zLmRldmljZVBsdWdpbnMuZ2V0KENyYXNoUmVwb3J0ZXJQbHVnaW4uaWQpO1xuICBpZiAoIXBlcnNpc3RpbmdQbHVnaW4pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgcGx1Z2luU3RhdGVzID0gc3RvcmUuZ2V0U3RhdGUoKS5wbHVnaW5TdGF0ZXM7XG4gIGNvbnN0IHBlcnNpc3RlZFN0YXRlID0gZ2V0UGVyc2lzdGVkU3RhdGUoXG4gICAgcGx1Z2luS2V5LFxuICAgIHBlcnNpc3RpbmdQbHVnaW4sXG4gICAgcGx1Z2luU3RhdGVzLFxuICApO1xuICBjb25zdCBuZXdQbHVnaW5TdGF0ZSA9IGdldE5ld1BlcnNpc2l0ZWRTdGF0ZUZyb21DcmFzaExvZyhcbiAgICBwZXJzaXN0ZWRTdGF0ZSxcbiAgICBwZXJzaXN0aW5nUGx1Z2luLFxuICAgIGNvbnRlbnQsXG4gICAgb3MsXG4gICAgbG9nRGF0ZSxcbiAgKTtcbiAgc2V0UGVyc2lzdGVkU3RhdGUocGx1Z2luS2V5LCBuZXdQbHVnaW5TdGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG91bGRTaG93Q3Jhc2hOb3RpZmljYXRpb24oXG4gIGJhc2VEZXZpY2U6ID9CYXNlRGV2aWNlLFxuICBjb250ZW50OiBzdHJpbmcsXG4gIG9zOiA/T1MsXG4pOiBib29sZWFuIHtcbiAgaWYgKG9zICYmIG9zID09PSAnQW5kcm9pZCcpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBjb25zdCBhcHBQYXRoID0gcGFyc2VQYXRoKGNvbnRlbnQpO1xuICBjb25zdCBzZXJpYWw6IHN0cmluZyA9IGJhc2VEZXZpY2U/LnNlcmlhbCB8fCAndW5rbm93bic7XG4gIGlmICghYXBwUGF0aCB8fCAhYXBwUGF0aC5pbmNsdWRlcyhzZXJpYWwpKSB7XG4gICAgLy8gRG8gbm90IHNob3cgbm90aWZpY2F0aW9ucyBmb3IgdGhlIGFwcCB3aGljaCBhcmUgbm90IHRoZSBzZWxlY3RlZCBvbmVcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUNyYXNoTG9nKFxuICBjb250ZW50OiBzdHJpbmcsXG4gIG9zOiBPUyxcbiAgbG9nRGF0ZTogP0RhdGUsXG4pOiBDcmFzaExvZyB7XG4gIGNvbnN0IHN0dWJTdHJpbmcgPSAnQ2Fubm90IGZpZ3VyZSBvdXQgdGhlIGNhdXNlJztcbiAgc3dpdGNoIChvcykge1xuICAgIGNhc2UgJ2lPUyc6IHtcbiAgICAgIGNvbnN0IHJlZ2V4ID0gL0V4Y2VwdGlvbiBUeXBlOiAqW1xcd10qLztcbiAgICAgIGNvbnN0IGFyciA9IHJlZ2V4LmV4ZWMoY29udGVudCk7XG4gICAgICBjb25zdCBleGNlcHRpb25TdHJpbmcgPSBhcnIgPyBhcnJbMF0gOiAnJztcbiAgICAgIGNvbnN0IGV4Y2VwdGlvblJlZ2V4ID0gL1tcXHddKiQvO1xuICAgICAgY29uc3QgdG1wID0gZXhjZXB0aW9uUmVnZXguZXhlYyhleGNlcHRpb25TdHJpbmcpO1xuICAgICAgY29uc3QgZXhjZXB0aW9uID1cbiAgICAgICAgdG1wICYmIHRtcFswXS5sZW5ndGggPyB0bXBbMF0gOiAnQ2Fubm90IGZpZ3VyZSBvdXQgdGhlIGNhdXNlJztcblxuICAgICAgbGV0IGRhdGUgPSBsb2dEYXRlO1xuICAgICAgaWYgKCFkYXRlKSB7XG4gICAgICAgIGNvbnN0IGRhdGVSZWdleCA9IC9EYXRlXFwvVGltZTogKltcXHdcXHNcXC46LV0qLztcbiAgICAgICAgY29uc3QgZGF0ZUFyciA9IGRhdGVSZWdleC5leGVjKGNvbnRlbnQpO1xuICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gZGF0ZUFyciA/IGRhdGVBcnJbMF0gOiAnJztcbiAgICAgICAgY29uc3QgZGF0ZVJlZ2V4MiA9IC9bXFx3XFxzXFwuOi1dKiQvO1xuICAgICAgICBjb25zdCB0bXAxID0gZGF0ZVJlZ2V4Mi5leGVjKGRhdGVTdHJpbmcpO1xuICAgICAgICBjb25zdCBleHRyYWN0ZWREYXRlU3RyaW5nOiA/c3RyaW5nID1cbiAgICAgICAgICB0bXAxICYmIHRtcDFbMF0ubGVuZ3RoID8gdG1wMVswXSA6IG51bGw7XG4gICAgICAgIGRhdGUgPSBleHRyYWN0ZWREYXRlU3RyaW5nID8gbmV3IERhdGUoZXh0cmFjdGVkRGF0ZVN0cmluZykgOiBsb2dEYXRlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjcmFzaCA9IHtcbiAgICAgICAgY2FsbHN0YWNrOiBjb250ZW50LFxuICAgICAgICBuYW1lOiBleGNlcHRpb24sXG4gICAgICAgIHJlYXNvbjogZXhjZXB0aW9uLFxuICAgICAgICBkYXRlLFxuICAgICAgfTtcbiAgICAgIHJldHVybiBjcmFzaDtcbiAgICB9XG4gICAgY2FzZSAnQW5kcm9pZCc6IHtcbiAgICAgIGNvbnN0IHJlZ0Zvck5hbWUgPSAvLipcXG4vO1xuICAgICAgY29uc3QgbmFtZVJlZ0FyciA9IHJlZ0Zvck5hbWUuZXhlYyhjb250ZW50KTtcbiAgICAgIGxldCBuYW1lID0gbmFtZVJlZ0FyciA/IG5hbWVSZWdBcnJbMF0gOiBzdHViU3RyaW5nO1xuICAgICAgY29uc3QgcmVnRm9yQ2FsbFN0YWNrID0gL1xcdGF0W1xcd1xcc1xcbi4kJissOjs9P0AjfCc8Pi5eKigpJSEtXSokLztcbiAgICAgIGNvbnN0IGNhbGxTdGFja0FycmF5ID0gcmVnRm9yQ2FsbFN0YWNrLmV4ZWMoY29udGVudCk7XG4gICAgICBjb25zdCBjYWxsU3RhY2sgPSBjYWxsU3RhY2tBcnJheSA/IGNhbGxTdGFja0FycmF5WzBdIDogJyc7XG4gICAgICBsZXQgcmVtYWluaW5nU3RyaW5nID1cbiAgICAgICAgY2FsbFN0YWNrLmxlbmd0aCA+IDAgPyBjb250ZW50LnJlcGxhY2UoY2FsbFN0YWNrLCAnJykgOiAnJztcbiAgICAgIGlmIChyZW1haW5pbmdTdHJpbmdbcmVtYWluaW5nU3RyaW5nLmxlbmd0aCAtIDFdID09PSAnXFxuJykge1xuICAgICAgICByZW1haW5pbmdTdHJpbmcgPSByZW1haW5pbmdTdHJpbmcuc2xpY2UoMCwgLTEpO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVhc29uID1cbiAgICAgICAgcmVtYWluaW5nU3RyaW5nLmxlbmd0aCA+IDBcbiAgICAgICAgICA/IHJlbWFpbmluZ1N0cmluZy5zcGxpdCgnXFxuJykucG9wKClcbiAgICAgICAgICA6IHN0dWJTdHJpbmc7XG4gICAgICBpZiAobmFtZVtuYW1lLmxlbmd0aCAtIDFdID09PSAnXFxuJykge1xuICAgICAgICBuYW1lID0gbmFtZS5zbGljZSgwLCAtMSk7XG4gICAgICB9XG4gICAgICBjb25zdCBjcmFzaCA9IHtcbiAgICAgICAgY2FsbHN0YWNrOiBjb250ZW50LFxuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICByZWFzb246IHJlYXNvbixcbiAgICAgICAgZGF0ZTogbG9nRGF0ZSxcbiAgICAgIH07XG4gICAgICByZXR1cm4gY3Jhc2g7XG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgT1MnKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdHJ1bmNhdGUoYmFzZVN0cmluZzogc3RyaW5nLCBudW1PZkNoYXJzOiBudW1iZXIpOiBzdHJpbmcge1xuICBpZiAoYmFzZVN0cmluZy5sZW5ndGggPD0gbnVtT2ZDaGFycykge1xuICAgIHJldHVybiBiYXNlU3RyaW5nO1xuICB9XG4gIGNvbnN0IHRydW5jYXRlZF9zdHJpbmcgPSB1bmljb2RlU3Vic3RyaW5nKGJhc2VTdHJpbmcsIDAsIG51bU9mQ2hhcnMgLSAxKTtcbiAgcmV0dXJuIHRydW5jYXRlZF9zdHJpbmcgKyAnXFx1MjAyNic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVBhdGgoY29udGVudDogc3RyaW5nKTogP3N0cmluZyB7XG4gIGNvbnN0IHJlZ2V4ID0gL1BhdGg6ICpbXFx3XFwtXFwvXFwuXFx0XFwgXFxfXFwlXSpcXG4vO1xuICBjb25zdCBhcnIgPSByZWdleC5leGVjKGNvbnRlbnQpO1xuICBpZiAoIWFyciB8fCBhcnIubGVuZ3RoIDw9IDApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBjb25zdCBwYXRoU3RyaW5nID0gYXJyWzBdO1xuICBjb25zdCBwYXRoUmVnZXggPSAvW1xcd1xcLVxcL1xcLlxcdFxcIFxcX1xcJV0qXFxuLztcbiAgY29uc3QgdG1wID0gcGF0aFJlZ2V4LmV4ZWMocGF0aFN0cmluZyk7XG4gIGlmICghdG1wIHx8IHRtcC5sZW5ndGggPT0gMCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGNvbnN0IHBhdGggPSB0bXBbMF07XG4gIHJldHVybiBwYXRoLnRyaW0oKTtcbn1cblxuZnVuY3Rpb24gYWRkRmlsZVdhdGNoZXJGb3JpT1NDcmFzaExvZ3MoXG4gIHN0b3JlOiBTdG9yZSxcbiAgc2V0UGVyc2lzdGVkU3RhdGU6IChcbiAgICBwbHVnaW5LZXk6IHN0cmluZyxcbiAgICBuZXdQbHVnaW5TdGF0ZTogP1BlcnNpc3RlZFN0YXRlLFxuICApID0+IHZvaWQsXG4pIHtcbiAgY29uc3QgZGlyID0gcGF0aC5qb2luKG9zLmhvbWVkaXIoKSwgJ0xpYnJhcnknLCAnTG9ncycsICdEaWFnbm9zdGljUmVwb3J0cycpO1xuICBpZiAoIWZzLmV4aXN0c1N5bmMoZGlyKSkge1xuICAgIC8vIERpcmVjdG9yeSBkb2Vzbid0IGV4aXN0XG4gICAgcmV0dXJuO1xuICB9XG4gIGZzLndhdGNoKGRpciwgKGV2ZW50VHlwZSwgZmlsZW5hbWUpID0+IHtcbiAgICAvLyBXZSBqdXN0IHBhcnNlIHRoZSBjcmFzaCBsb2dzIHdpdGggZXh0ZW5zaW9uIGAuY3Jhc2hgXG4gICAgY29uc3QgY2hlY2tGaWxlRXh0ZW5zaW9uID0gLy5jcmFzaCQvLmV4ZWMoZmlsZW5hbWUpO1xuICAgIGlmICghZmlsZW5hbWUgfHwgIWNoZWNrRmlsZUV4dGVuc2lvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmcy5yZWFkRmlsZShwYXRoLmpvaW4oZGlyLCBmaWxlbmFtZSksICd1dGY4JywgZnVuY3Rpb24oZXJyLCBkYXRhKSB7XG4gICAgICBpZiAoc3RvcmUuZ2V0U3RhdGUoKS5jb25uZWN0aW9ucy5zZWxlY3RlZERldmljZT8ub3MgIT0gJ2lPUycpIHtcbiAgICAgICAgLy8gSWYgdGhlIHNlbGVjdGVkIGRldmljZSBpcyBub3QgaU9TIGRvbid0IHNob3cgY3Jhc2ggbm90aWZpY2F0aW9uc1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcGFyc2VDcmFzaExvZ0FuZFVwZGF0ZVN0YXRlKHN0b3JlLCB1dGlsLmZvcm1hdChkYXRhKSwgc2V0UGVyc2lzdGVkU3RhdGUpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuY2xhc3MgQ3Jhc2hTZWxlY3RvciBleHRlbmRzIENvbXBvbmVudDxDcmFzaFNlbGVjdG9yUHJvcHM+IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtjcmFzaGVzLCBzZWxlY3RlZENyYXNoSUQsIG9yZGVyZWRJRHMsIG9uQ3Jhc2hDaGFuZ2V9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZEZsZXhSb3dDb2x1bW4+XG4gICAgICAgIDxCdXR0b25Hcm91cENvbnRhaW5lcj5cbiAgICAgICAgICA8TWF0Y2hQYXJlbnRIZWlnaHRDb21wb25lbnQ+XG4gICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtCb29sZWFuKCFvcmRlcmVkSURzIHx8IG9yZGVyZWRJRHMubGVuZ3RoIDw9IDEpfVxuICAgICAgICAgICAgICBjb21wYWN0PXt0cnVlfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9uQ3Jhc2hDaGFuZ2UgJiYgb3JkZXJlZElEcykge1xuICAgICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBvcmRlcmVkSURzLmluZGV4T2Yoc2VsZWN0ZWRDcmFzaElEKTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRJbmRleCA9XG4gICAgICAgICAgICAgICAgICAgIGluZGV4IDwgMSA/IG9yZGVyZWRJRHMubGVuZ3RoIC0gMSA6IGluZGV4IC0gMTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRJRCA9IG9yZGVyZWRJRHNbbmV4dEluZGV4XTtcbiAgICAgICAgICAgICAgICAgIG9uQ3Jhc2hDaGFuZ2UobmV4dElEKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGljb249XCJjaGV2cm9uLWxlZnRcIlxuICAgICAgICAgICAgICBpY29uU2l6ZT17MTJ9XG4gICAgICAgICAgICAgIHRpdGxlPVwiUHJldmlvdXMgQ3Jhc2hcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L01hdGNoUGFyZW50SGVpZ2h0Q29tcG9uZW50PlxuICAgICAgICAgIDxNYXRjaFBhcmVudEhlaWdodENvbXBvbmVudD5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e0Jvb2xlYW4oIW9yZGVyZWRJRHMgfHwgb3JkZXJlZElEcy5sZW5ndGggPD0gMSl9XG4gICAgICAgICAgICAgIGNvbXBhY3Q9e3RydWV9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob25DcmFzaENoYW5nZSAmJiBvcmRlcmVkSURzKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IG9yZGVyZWRJRHMuaW5kZXhPZihzZWxlY3RlZENyYXNoSUQpO1xuICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dEluZGV4ID1cbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPj0gb3JkZXJlZElEcy5sZW5ndGggLSAxID8gMCA6IGluZGV4ICsgMTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRJRCA9IG9yZGVyZWRJRHNbbmV4dEluZGV4XTtcbiAgICAgICAgICAgICAgICAgIG9uQ3Jhc2hDaGFuZ2UobmV4dElEKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGljb249XCJjaGV2cm9uLXJpZ2h0XCJcbiAgICAgICAgICAgICAgaWNvblNpemU9ezEyfVxuICAgICAgICAgICAgICB0aXRsZT1cIk5leHQgQ3Jhc2hcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L01hdGNoUGFyZW50SGVpZ2h0Q29tcG9uZW50PlxuICAgICAgICA8L0J1dHRvbkdyb3VwQ29udGFpbmVyPlxuICAgICAgICA8U3R5bGVkU2VsZWN0Q29udGFpbmVyPlxuICAgICAgICAgIDxTdHlsZWRTZWxlY3RcbiAgICAgICAgICAgIGdyb3c9e3RydWV9XG4gICAgICAgICAgICBzZWxlY3RlZD17c2VsZWN0ZWRDcmFzaElEIHx8ICdOb0NyYXNoSUQnfVxuICAgICAgICAgICAgb3B0aW9ucz17Y3Jhc2hlcyB8fCB7Tm9DcmFzaElEOiAnTm8gQ3Jhc2gnfX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsodGl0bGU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBjcmFzaGVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNyYXNoZXNba2V5XSA9PT0gdGl0bGUgJiYgb25DcmFzaENoYW5nZSkge1xuICAgICAgICAgICAgICAgICAgb25DcmFzaENoYW5nZShrZXkpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L1N0eWxlZFNlbGVjdENvbnRhaW5lcj5cbiAgICAgIDwvU3R5bGVkRmxleFJvd0NvbHVtbj5cbiAgICApO1xuICB9XG59XG5cbmNsYXNzIENyYXNoUmVwb3J0ZXJCYXIgZXh0ZW5kcyBDb21wb25lbnQ8Q3Jhc2hSZXBvcnRlckJhclByb3BzPiB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7b3BlbkxvZ3NDYWxsYmFjaywgY3Jhc2hTZWxlY3Rvcn0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8VG9vbGJhcj5cbiAgICAgICAgPENyYXNoU2VsZWN0b3Igey4uLmNyYXNoU2VsZWN0b3J9IC8+XG4gICAgICAgIDxTcGFjZXIgLz5cbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGRpc2FibGVkPXtCb29sZWFuKCFvcGVuTG9nc0NhbGxiYWNrKX1cbiAgICAgICAgICBvbkNsaWNrPXtvcGVuTG9nc0NhbGxiYWNrfT5cbiAgICAgICAgICBPcGVuIEluIExvZ3NcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L1Rvb2xiYXI+XG4gICAgKTtcbiAgfVxufVxuXG5jbGFzcyBIZWFkZXJSb3cgZXh0ZW5kcyBDb21wb25lbnQ8SGVhZGVyUm93UHJvcHM+IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHt0aXRsZSwgdmFsdWV9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPFBhZGRlciBwYWRkaW5nVG9wPXs4fSBwYWRkaW5nQm90dG9tPXsyfT5cbiAgICAgICAgPENvbnRhaW5lcj5cbiAgICAgICAgICA8UGFkZGVyIHBhZGRpbmdMZWZ0PXs4fT5cbiAgICAgICAgICAgIDxGbGV4Um93PlxuICAgICAgICAgICAgICA8VGl0bGU+e3RpdGxlfTwvVGl0bGU+XG4gICAgICAgICAgICAgIDxDb250ZXh0TWVudVxuICAgICAgICAgICAgICAgIGl0ZW1zPXtbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnY29weScsXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY2xpcGJvYXJkLndyaXRlVGV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF19PlxuICAgICAgICAgICAgICAgIDxWYWx1ZSBjb2RlPXt0cnVlfT57dmFsdWV9PC9WYWx1ZT5cbiAgICAgICAgICAgICAgPC9Db250ZXh0TWVudT5cbiAgICAgICAgICAgIDwvRmxleFJvdz5cbiAgICAgICAgICA8L1BhZGRlcj5cbiAgICAgICAgICA8TGluZSAvPlxuICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgIDwvUGFkZGVyPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3Jhc2hSZXBvcnRlclBsdWdpbiBleHRlbmRzIEZsaXBwZXJEZXZpY2VQbHVnaW48XG4gIFN0YXRlLFxuICB2b2lkLFxuICBQZXJzaXN0ZWRTdGF0ZSxcbj4ge1xuICBzdGF0aWMgZGVmYXVsdFBlcnNpc3RlZFN0YXRlID0ge2NyYXNoZXM6IFtdfTtcblxuICBzdGF0aWMgc3VwcG9ydHNEZXZpY2UoZGV2aWNlOiBEZXZpY2UpIHtcbiAgICByZXR1cm4gZGV2aWNlLm9zID09PSAnaU9TJyB8fCBkZXZpY2Uub3MgPT09ICdBbmRyb2lkJztcbiAgfVxuXG4gIHN0YXRpYyBub3RpZmljYXRpb25JRDogbnVtYmVyID0gMDtcbiAgLypcbiAgICogUmVkdWNlciB0byBwcm9jZXNzIGluY29taW5nIFwic2VuZFwiIG1lc3NhZ2VzIGZyb20gdGhlIG1vYmlsZSBjb3VudGVycGFydC5cbiAgICovXG4gIHN0YXRpYyBwZXJzaXN0ZWRTdGF0ZVJlZHVjZXIgPSAoXG4gICAgcGVyc2lzdGVkU3RhdGU6IFBlcnNpc3RlZFN0YXRlLFxuICAgIG1ldGhvZDogc3RyaW5nLFxuICAgIHBheWxvYWQ6IE9iamVjdCxcbiAgKTogUGVyc2lzdGVkU3RhdGUgPT4ge1xuICAgIGlmIChtZXRob2QgPT09ICdjcmFzaC1yZXBvcnQnIHx8IG1ldGhvZCA9PT0gJ2ZsaXBwZXItY3Jhc2gtcmVwb3J0Jykge1xuICAgICAgQ3Jhc2hSZXBvcnRlclBsdWdpbi5ub3RpZmljYXRpb25JRCsrO1xuICAgICAgY29uc3QgbWVyZ2VkU3RhdGU6IFBlcnNpc3RlZFN0YXRlID0ge1xuICAgICAgICBjcmFzaGVzOiBwZXJzaXN0ZWRTdGF0ZS5jcmFzaGVzLmNvbmNhdChbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbm90aWZpY2F0aW9uSUQ6IENyYXNoUmVwb3J0ZXJQbHVnaW4ubm90aWZpY2F0aW9uSUQudG9TdHJpbmcoKSwgLy8gQWxsIG5vdGlmaWNhdGlvbnMgYXJlIHVuaXF1ZVxuICAgICAgICAgICAgY2FsbHN0YWNrOiBwYXlsb2FkLmNhbGxzdGFjayxcbiAgICAgICAgICAgIG5hbWU6IHBheWxvYWQubmFtZSxcbiAgICAgICAgICAgIHJlYXNvbjogcGF5bG9hZC5yZWFzb24sXG4gICAgICAgICAgICBkYXRlOiBwYXlsb2FkLmRhdGUgfHwgbmV3IERhdGUoKSxcbiAgICAgICAgICB9LFxuICAgICAgICBdKSxcbiAgICAgIH07XG4gICAgICByZXR1cm4gbWVyZ2VkU3RhdGU7XG4gICAgfVxuICAgIHJldHVybiBwZXJzaXN0ZWRTdGF0ZTtcbiAgfTtcblxuICBzdGF0aWMgdHJpbUNhbGxTdGFja0lmUG9zc2libGUgPSAoY2FsbHN0YWNrOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIGxldCByZWdleCA9IC9BcHBsaWNhdGlvbiBTcGVjaWZpYyBJbmZvcm1hdGlvbjovO1xuICAgIGNvbnN0IHF1ZXJ5ID0gcmVnZXguZXhlYyhjYWxsc3RhY2spO1xuICAgIHJldHVybiBxdWVyeSA/IGNhbGxzdGFjay5zdWJzdHJpbmcoMCwgcXVlcnkuaW5kZXgpIDogY2FsbHN0YWNrO1xuICB9O1xuICAvKlxuICAgKiBDYWxsYmFjayB0byBwcm92aWRlIHRoZSBjdXJyZW50bHkgYWN0aXZlIG5vdGlmaWNhdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgZ2V0QWN0aXZlTm90aWZpY2F0aW9ucyA9IChcbiAgICBwZXJzaXN0ZWRTdGF0ZTogUGVyc2lzdGVkU3RhdGUsXG4gICk6IEFycmF5PE5vdGlmaWNhdGlvbj4gPT4ge1xuICAgIHJldHVybiBwZXJzaXN0ZWRTdGF0ZS5jcmFzaGVzLm1hcCgoY3Jhc2g6IENyYXNoKSA9PiB7XG4gICAgICBjb25zdCBpZCA9IGNyYXNoLm5vdGlmaWNhdGlvbklEO1xuICAgICAgY29uc3QgdGl0bGUgPSBgQ1JBU0g6ICR7dHJ1bmNhdGUoY3Jhc2gubmFtZSwgNTApfSBSZWFzb246ICR7dHJ1bmNhdGUoXG4gICAgICAgIGNyYXNoLnJlYXNvbixcbiAgICAgICAgNTAsXG4gICAgICApfWA7XG4gICAgICBjb25zdCBjYWxsc3RhY2sgPSBDcmFzaFJlcG9ydGVyUGx1Z2luLnRyaW1DYWxsU3RhY2tJZlBvc3NpYmxlKFxuICAgICAgICBjcmFzaC5jYWxsc3RhY2ssXG4gICAgICApO1xuICAgICAgY29uc3QgbXNnID0gYENhbGxzdGFjazogJHt0cnVuY2F0ZShjYWxsc3RhY2ssIDIwMCl9YDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkLFxuICAgICAgICBtZXNzYWdlOiBtc2csXG4gICAgICAgIHNldmVyaXR5OiAnZXJyb3InLFxuICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgIGFjdGlvbjogaWQsXG4gICAgICB9O1xuICAgIH0pO1xuICB9O1xuXG4gIC8qXG4gICAqIFRoaXMgZnVuY3Rpb24gZ2V0cyBjYWxsZWQgd2hlbmV2ZXIgdGhlIGRldmljZSBpcyByZWdpc3RlcmVkXG4gICAqL1xuICBzdGF0aWMgb25SZWdpc3RlckRldmljZSA9IChcbiAgICBzdG9yZTogU3RvcmUsXG4gICAgYmFzZURldmljZTogQmFzZURldmljZSxcbiAgICBzZXRQZXJzaXN0ZWRTdGF0ZTogKFxuICAgICAgcGx1Z2luS2V5OiBzdHJpbmcsXG4gICAgICBuZXdQbHVnaW5TdGF0ZTogP1BlcnNpc3RlZFN0YXRlLFxuICAgICkgPT4gdm9pZCxcbiAgKTogdm9pZCA9PiB7XG4gICAgaWYgKGJhc2VEZXZpY2Uub3MuaW5jbHVkZXMoJ2lPUycpKSB7XG4gICAgICBhZGRGaWxlV2F0Y2hlckZvcmlPU0NyYXNoTG9ncyhzdG9yZSwgc2V0UGVyc2lzdGVkU3RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCByZWZlcmVuY2VEYXRlID0gbmV3IERhdGUoKTtcbiAgICAgIChmdW5jdGlvbihcbiAgICAgICAgc3RvcmU6IFN0b3JlLFxuICAgICAgICBkYXRlOiBEYXRlLFxuICAgICAgICBzZXRQZXJzaXN0ZWRTdGF0ZTogKFxuICAgICAgICAgIHBsdWdpbktleTogc3RyaW5nLFxuICAgICAgICAgIG5ld1BsdWdpblN0YXRlOiA/UGVyc2lzdGVkU3RhdGUsXG4gICAgICAgICkgPT4gdm9pZCxcbiAgICAgICkge1xuICAgICAgICBsZXQgYW5kcm9pZExvZzogc3RyaW5nID0gJyc7XG4gICAgICAgIGxldCBhbmRyb2lkTG9nVW5kZXJQcm9jZXNzID0gZmFsc2U7XG4gICAgICAgIGxldCB0aW1lciA9IG51bGw7XG4gICAgICAgIGJhc2VEZXZpY2UuYWRkTG9nTGlzdGVuZXIoKGVudHJ5OiBEZXZpY2VMb2dFbnRyeSkgPT4ge1xuICAgICAgICAgIGlmIChzaG91bGRQYXJzZUFuZHJvaWRMb2coZW50cnksIHJlZmVyZW5jZURhdGUpKSB7XG4gICAgICAgICAgICBpZiAoYW5kcm9pZExvZ1VuZGVyUHJvY2Vzcykge1xuICAgICAgICAgICAgICBhbmRyb2lkTG9nICs9ICdcXG4nICsgZW50cnkubWVzc2FnZTtcbiAgICAgICAgICAgICAgYW5kcm9pZExvZyA9IGFuZHJvaWRMb2cudHJpbSgpO1xuICAgICAgICAgICAgICBpZiAodGltZXIpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBhbmRyb2lkTG9nID0gZW50cnkubWVzc2FnZTtcbiAgICAgICAgICAgICAgYW5kcm9pZExvZ1VuZGVyUHJvY2VzcyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoYW5kcm9pZExvZy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VDcmFzaExvZ0FuZFVwZGF0ZVN0YXRlKFxuICAgICAgICAgICAgICAgICAgc3RvcmUsXG4gICAgICAgICAgICAgICAgICBhbmRyb2lkTG9nLFxuICAgICAgICAgICAgICAgICAgc2V0UGVyc2lzdGVkU3RhdGUsXG4gICAgICAgICAgICAgICAgICBlbnRyeS5kYXRlLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYW5kcm9pZExvZ1VuZGVyUHJvY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICBhbmRyb2lkTG9nID0gJyc7XG4gICAgICAgICAgICB9LCA1MCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pKHN0b3JlLCByZWZlcmVuY2VEYXRlLCBzZXRQZXJzaXN0ZWRTdGF0ZSk7XG4gICAgfVxuICB9O1xuICBvcGVuSW5Mb2dzID0gKGNhbGxzdGFjazogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5zZWxlY3RQbHVnaW4oJ0RldmljZUxvZ3MnLCBjYWxsc3RhY2spO1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBQcm9wczxQZXJzaXN0ZWRTdGF0ZT4pIHtcbiAgICAvLyBSZXF1aXJlZCBzdGVwOiBhbHdheXMgY2FsbCB0aGUgcGFyZW50IGNsYXNzJyBjb25zdHJ1Y3RvclxuICAgIHN1cGVyKHByb3BzKTtcbiAgICBsZXQgY3Jhc2g6ID9DcmFzaCA9IG51bGw7XG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5wZXJzaXN0ZWRTdGF0ZS5jcmFzaGVzICYmXG4gICAgICB0aGlzLnByb3BzLnBlcnNpc3RlZFN0YXRlLmNyYXNoZXMubGVuZ3RoID4gMFxuICAgICkge1xuICAgICAgY3Jhc2ggPSB0aGlzLnByb3BzLnBlcnNpc3RlZFN0YXRlLmNyYXNoZXNbXG4gICAgICAgIHRoaXMucHJvcHMucGVyc2lzdGVkU3RhdGUuY3Jhc2hlcy5sZW5ndGggLSAxXG4gICAgICBdO1xuICAgIH1cblxuICAgIGxldCBkZWVwbGlua2VkQ3Jhc2ggPSBudWxsO1xuICAgIGlmICh0aGlzLnByb3BzLmRlZXBMaW5rUGF5bG9hZCkge1xuICAgICAgY29uc3QgaWQgPSB0aGlzLnByb3BzLmRlZXBMaW5rUGF5bG9hZDtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wcm9wcy5wZXJzaXN0ZWRTdGF0ZS5jcmFzaGVzLmZpbmRJbmRleChlbGVtID0+IHtcbiAgICAgICAgcmV0dXJuIGVsZW0ubm90aWZpY2F0aW9uSUQgPT09IGlkO1xuICAgICAgfSk7XG4gICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICBkZWVwbGlua2VkQ3Jhc2ggPSB0aGlzLnByb3BzLnBlcnNpc3RlZFN0YXRlLmNyYXNoZXNbaW5kZXhdO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBTZXQgdGhlIHN0YXRlIGRpcmVjdGx5LiBVc2UgcHJvcHMgaWYgbmVjZXNzYXJ5LlxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjcmFzaDogZGVlcGxpbmtlZENyYXNoIHx8IGNyYXNoLFxuICAgIH07XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGNyYXNoVG9CZUluc3BlY3RlZCA9IHRoaXMuc3RhdGUuY3Jhc2g7XG5cbiAgICBpZiAoIWNyYXNoVG9CZUluc3BlY3RlZCAmJiB0aGlzLnByb3BzLnBlcnNpc3RlZFN0YXRlLmNyYXNoZXMubGVuZ3RoID4gMCkge1xuICAgICAgY3Jhc2hUb0JlSW5zcGVjdGVkID0gdGhpcy5wcm9wcy5wZXJzaXN0ZWRTdGF0ZS5jcmFzaGVzW1xuICAgICAgICB0aGlzLnByb3BzLnBlcnNpc3RlZFN0YXRlLmNyYXNoZXMubGVuZ3RoIC0gMVxuICAgICAgXTtcbiAgICB9XG4gICAgY29uc3QgY3Jhc2ggPSBjcmFzaFRvQmVJbnNwZWN0ZWQ7XG4gICAgaWYgKGNyYXNoKSB7XG4gICAgICBjb25zdCB7Y3Jhc2hlc30gPSB0aGlzLnByb3BzLnBlcnNpc3RlZFN0YXRlO1xuICAgICAgY29uc3QgY3Jhc2hNYXAgPSBjcmFzaGVzLnJlZHVjZShcbiAgICAgICAgKGFjYzoge1trZXk6IHN0cmluZ106IHN0cmluZ30sIHBlcnNpc3RlZENyYXNoOiBDcmFzaCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHtub3RpZmljYXRpb25JRCwgZGF0ZX0gPSBwZXJzaXN0ZWRDcmFzaDtcbiAgICAgICAgICBjb25zdCBuYW1lID0gJ0NyYXNoIGF0ICcgKyBkYXRlLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgICAgICAgYWNjW25vdGlmaWNhdGlvbklEXSA9IG5hbWU7XG4gICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSxcbiAgICAgICAge30sXG4gICAgICApO1xuXG4gICAgICBjb25zdCBvcmRlcmVkSURzID0gY3Jhc2hlcy5tYXAoXG4gICAgICAgIHBlcnNpc3RlZENyYXNoID0+IHBlcnNpc3RlZENyYXNoLm5vdGlmaWNhdGlvbklELFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHNlbGVjdGVkQ3Jhc2hJRCA9IGNyYXNoLm5vdGlmaWNhdGlvbklEO1xuICAgICAgY29uc3Qgb25DcmFzaENoYW5nZSA9IGlkID0+IHtcbiAgICAgICAgY29uc3QgbmV3U2VsZWN0ZWRDcmFzaCA9IGNyYXNoZXMuZmluZChlbGVtZW50ID0+IHtcbiAgICAgICAgICByZXR1cm4gZWxlbWVudC5ub3RpZmljYXRpb25JRCA9PT0gaWQ7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtjcmFzaDogbmV3U2VsZWN0ZWRDcmFzaH0pO1xuICAgICAgICBjb25zb2xlLmxvZygnb25DcmFzaENoYW5nZSBjYWxsZWQnLCBpZCk7XG4gICAgICB9O1xuICAgICAgY29uc3QgY2FsbHN0YWNrU3RyaW5nID0gY3Jhc2guY2FsbHN0YWNrO1xuXG4gICAgICBjb25zdCBjaGlsZHJlbiA9IGNyYXNoLmNhbGxzdGFjay5zcGxpdCgnXFxuJykubWFwKHN0ciA9PiB7XG4gICAgICAgIHJldHVybiB7bWVzc2FnZTogc3RyfTtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgY3Jhc2hTZWxlY3RvcjogQ3Jhc2hTZWxlY3RvclByb3BzID0ge1xuICAgICAgICBjcmFzaGVzOiBjcmFzaE1hcCxcbiAgICAgICAgb3JkZXJlZElEcyxcbiAgICAgICAgc2VsZWN0ZWRDcmFzaElELFxuICAgICAgICBvbkNyYXNoQ2hhbmdlLFxuICAgICAgfTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxGbGV4Q29sdW1uPlxuICAgICAgICAgIHt0aGlzLmRldmljZS5vcyA9PSAnQW5kcm9pZCcgPyAoXG4gICAgICAgICAgICA8Q3Jhc2hSZXBvcnRlckJhclxuICAgICAgICAgICAgICBjcmFzaFNlbGVjdG9yPXtjcmFzaFNlbGVjdG9yfVxuICAgICAgICAgICAgICBvcGVuTG9nc0NhbGxiYWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuSW5Mb2dzKGNyYXNoLmNhbGxzdGFjayk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8Q3Jhc2hSZXBvcnRlckJhciBjcmFzaFNlbGVjdG9yPXtjcmFzaFNlbGVjdG9yfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAgPFNjcm9sbGFibGVDb2x1bW4+XG4gICAgICAgICAgICA8SGVhZGVyUm93IHRpdGxlPVwiTmFtZVwiIHZhbHVlPXtjcmFzaC5uYW1lfSAvPlxuICAgICAgICAgICAgPEhlYWRlclJvdyB0aXRsZT1cIlJlYXNvblwiIHZhbHVlPXtjcmFzaC5yZWFzb259IC8+XG4gICAgICAgICAgICA8UGFkZGVyIHBhZGRpbmdMZWZ0PXs4fSBwYWRkaW5nVG9wPXs0fSBwYWRkaW5nQm90dG9tPXsyfT5cbiAgICAgICAgICAgICAgPFRpdGxlPiBTdGFja3RyYWNlIDwvVGl0bGU+XG4gICAgICAgICAgICA8L1BhZGRlcj5cbiAgICAgICAgICAgIDxDb250ZXh0TWVudVxuICAgICAgICAgICAgICBpdGVtcz17W1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiAnY29weScsXG4gICAgICAgICAgICAgICAgICBjbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjbGlwYm9hcmQud3JpdGVUZXh0KGNhbGxzdGFja1N0cmluZyk7XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF19PlxuICAgICAgICAgICAgICA8TGluZSAvPlxuICAgICAgICAgICAgICA8U3RhY2tUcmFjZVxuICAgICAgICAgICAgICAgIGNoaWxkcmVuPXtjaGlsZHJlbn1cbiAgICAgICAgICAgICAgICBpc0NyYXNoPXtmYWxzZX1cbiAgICAgICAgICAgICAgICBwYWRkZWQ9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcj17Y29sb3JzLmdyZXlTdGFja1RyYWNlVGludH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvQ29udGV4dE1lbnU+XG4gICAgICAgICAgPC9TY3JvbGxhYmxlQ29sdW1uPlxuICAgICAgICA8L0ZsZXhDb2x1bW4+XG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBjcmFzaFNlbGVjdG9yID0ge1xuICAgICAgY3Jhc2hlczogbnVsbCxcbiAgICAgIG9yZGVyZWRJRHM6IG51bGwsXG4gICAgICBzZWxlY3RlZENyYXNoSUQ6IG51bGwsXG4gICAgICBvbkNyYXNoQ2hhbmdlOiBudWxsLFxuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxTdHlsZWRGbGV4R3Jvd0NvbHVtbj5cbiAgICAgICAgPENyYXNoUmVwb3J0ZXJCYXIgY3Jhc2hTZWxlY3Rvcj17Y3Jhc2hTZWxlY3Rvcn0gLz5cbiAgICAgICAgPFN0eWxlZEZsZXhDb2x1bW4+XG4gICAgICAgICAgPFBhZGRlciBwYWRkaW5nQm90dG9tPXs4fT5cbiAgICAgICAgICAgIDxUaXRsZT5ObyBDcmFzaGVzIExvZ2dlZDwvVGl0bGU+XG4gICAgICAgICAgPC9QYWRkZXI+XG4gICAgICAgIDwvU3R5bGVkRmxleENvbHVtbj5cbiAgICAgIDwvU3R5bGVkRmxleEdyb3dDb2x1bW4+XG4gICAgKTtcbiAgfVxufVxuIiwiZnVuY3Rpb24gY2hhckF0KHN0cmluZywgaW5kZXgpIHtcbiAgdmFyIGZpcnN0ID0gc3RyaW5nLmNoYXJDb2RlQXQoaW5kZXgpO1xuICB2YXIgc2Vjb25kO1xuICBpZiAoZmlyc3QgPj0gMHhEODAwICYmIGZpcnN0IDw9IDB4REJGRiAmJiBzdHJpbmcubGVuZ3RoID4gaW5kZXggKyAxKSB7XG4gICAgc2Vjb25kID0gc3RyaW5nLmNoYXJDb2RlQXQoaW5kZXggKyAxKTtcbiAgICBpZiAoc2Vjb25kID49IDB4REMwMCAmJiBzZWNvbmQgPD0gMHhERkZGKSB7XG4gICAgICByZXR1cm4gc3RyaW5nLnN1YnN0cmluZyhpbmRleCwgaW5kZXggKyAyKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0cmluZ1tpbmRleF07XG59XG5cbmZ1bmN0aW9uIHNsaWNlKHN0cmluZywgc3RhcnQsIGVuZCkge1xuICB2YXIgYWNjdW11bGF0b3IgPSBcIlwiO1xuICB2YXIgY2hhcmFjdGVyO1xuICB2YXIgc3RyaW5nSW5kZXggPSAwO1xuICB2YXIgdW5pY29kZUluZGV4ID0gMDtcbiAgdmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGg7XG5cbiAgd2hpbGUgKHN0cmluZ0luZGV4IDwgbGVuZ3RoKSB7XG4gICAgY2hhcmFjdGVyID0gY2hhckF0KHN0cmluZywgc3RyaW5nSW5kZXgpO1xuICAgIGlmICh1bmljb2RlSW5kZXggPj0gc3RhcnQgJiYgdW5pY29kZUluZGV4IDwgZW5kKSB7XG4gICAgICBhY2N1bXVsYXRvciArPSBjaGFyYWN0ZXI7XG4gICAgfVxuICAgIHN0cmluZ0luZGV4ICs9IGNoYXJhY3Rlci5sZW5ndGg7XG4gICAgdW5pY29kZUluZGV4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIGFjY3VtdWxhdG9yO1xufVxuXG5mdW5jdGlvbiB0b051bWJlcih2YWx1ZSwgZmFsbGJhY2spIHtcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZmFsbGJhY2s7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIE51bWJlcih2YWx1ZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZWFsU3RhcnQgPSB0b051bWJlcihzdGFydCwgMCk7XG4gIHZhciByZWFsRW5kID0gdG9OdW1iZXIoZW5kLCBzdHJpbmcubGVuZ3RoKTtcbiAgaWYgKHJlYWxFbmQgPT0gcmVhbFN0YXJ0KSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH0gZWxzZSBpZiAocmVhbEVuZCA+IHJlYWxTdGFydCkge1xuICAgIHJldHVybiBzbGljZShzdHJpbmcsIHJlYWxTdGFydCwgcmVhbEVuZCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHNsaWNlKHN0cmluZywgcmVhbEVuZCwgcmVhbFN0YXJ0KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbImdsb2JhbCIsIl9fciIsIm1ldHJvUmVxdWlyZSIsIl9fZCIsImRlZmluZSIsIl9fYyIsImNsZWFyIiwibW9kdWxlcyIsIkVNUFRZIiwiX3JlZiIsImhhc093blByb3BlcnR5IiwiX19OVU1fTU9EVUxFU19fIiwiQXJyYXkiLCJPYmplY3QiLCJjcmVhdGUiLCJmYWN0b3J5IiwibW9kdWxlSWQiLCJkZXBlbmRlbmN5TWFwIiwiaGFzRXJyb3IiLCJpbXBvcnRlZEFsbCIsImltcG9ydGVkRGVmYXVsdCIsImlzSW5pdGlhbGl6ZWQiLCJwdWJsaWNNb2R1bGUiLCJleHBvcnRzIiwibW9kdWxlSWRSZWFsbHlJc051bWJlciIsIm1vZHVsZSIsImd1YXJkZWRMb2FkTW9kdWxlIiwibWV0cm9JbXBvcnREZWZhdWx0IiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJtZXRyb0ltcG9ydEFsbCIsIl9rZXkiLCJjYWxsIiwiaW5HdWFyZCIsIkVycm9yVXRpbHMiLCJyZXR1cm5WYWx1ZSIsImxvYWRNb2R1bGVJbXBsZW1lbnRhdGlvbiIsImUiLCJyZXBvcnRGYXRhbEVycm9yIiwiSURfTUFTS19TSElGVCIsIkxPQ0FMX0lEX01BU0siLCJ1bnBhY2tNb2R1bGVJZCIsInNlZ21lbnRJZCIsImxvY2FsSWQiLCJwYWNrTW9kdWxlSWQiLCJ2YWx1ZSIsImhvb2tzIiwicmVnaXN0ZXJIb29rIiwiY2IiLCJob29rIiwicHVzaCIsInJlbGVhc2UiLCJpIiwibGVuZ3RoIiwic3BsaWNlIiwiX19kZWZpbmVNb2R1bGUiLCJuYXRpdmVSZXF1aXJlIiwiX3VucGFja01vZHVsZUlkIiwiX3NlZ21lbnRJZCIsIl9sb2NhbElkIiwidW5rbm93bk1vZHVsZUVycm9yIiwibW9kdWxlVGhyZXdFcnJvciIsImVycm9yIiwiX21vZHVsZSIsIl9tb2R1bGVPYmplY3QiLCJpZCIsInVuZGVmaW5lZCIsIm1lc3NhZ2UiLCJFcnJvciIsImRpc3BsYXlOYW1lIiwiUGFkZGVyIiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nUmlnaHQiLCJwYWRkaW5nQm90dG9tIiwicGFkZGluZ1RvcCIsIlRpdGxlIiwiVGV4dCIsImZvbnRXZWlnaHQiLCJjb2xvciIsImNvbG9ycyIsImdyZXlUaW50MyIsImhlaWdodCIsIndpZHRoIiwidGV4dE92ZXJmbG93IiwiTGluZSIsIlZpZXciLCJiYWNrZ3JvdW5kQ29sb3IiLCJncmV5VGludDIiLCJtYXJnaW5Ub3AiLCJmbGV4U2hyaW5rIiwiQ29udGFpbmVyIiwiRmxleENvbHVtbiIsIm92ZXJmbG93IiwiVmFsdWUiLCJtYXhIZWlnaHQiLCJmbGV4R3JvdyIsIkZsZXhHcm93Q29sdW1uIiwiU2Nyb2xsYWJsZUNvbHVtbiIsIlN0eWxlZEZsZXhHcm93Q29sdW1uIiwiU3R5bGVkRmxleFJvd0NvbHVtbiIsIkZsZXhSb3ciLCJhbGlnSXRlbXMiLCJqdXN0aWZ5Q29udGVudCIsIlN0eWxlZEZsZXhDb2x1bW4iLCJhbGlnbkl0ZW1zIiwiTWF0Y2hQYXJlbnRIZWlnaHRDb21wb25lbnQiLCJCdXR0b25Hcm91cENvbnRhaW5lciIsIlN0eWxlZFNlbGVjdENvbnRhaW5lciIsIlN0eWxlZFNlbGVjdCIsIlNlbGVjdCIsIm1heFdpZHRoIiwiZ2V0TmV3UGVyc2lzaXRlZFN0YXRlRnJvbUNyYXNoTG9nIiwicGVyc2lzdGVkU3RhdGUiLCJwZXJzaXN0aW5nUGx1Z2luIiwiY29udGVudCIsIm9zIiwibG9nRGF0ZSIsInBlcnNpc3RlZFN0YXRlUmVkdWNlciIsImNyYXNoIiwicGFyc2VDcmFzaExvZyIsIm5ld1BsdWdpblN0YXRlIiwicGFyc2VDcmFzaExvZ0FuZFVwZGF0ZVN0YXRlIiwic3RvcmUiLCJzZXRQZXJzaXN0ZWRTdGF0ZSIsImdldFN0YXRlIiwiY29ubmVjdGlvbnMiLCJzZWxlY3RlZERldmljZSIsInNob3VsZFNob3dDcmFzaE5vdGlmaWNhdGlvbiIsInBsdWdpbklEIiwiQ3Jhc2hSZXBvcnRlclBsdWdpbiIsInBsdWdpbktleSIsInBsdWdpbnMiLCJkZXZpY2VQbHVnaW5zIiwiZ2V0IiwicGx1Z2luU3RhdGVzIiwiYmFzZURldmljZSIsImFwcFBhdGgiLCJwYXJzZVBhdGgiLCJzZXJpYWwiLCJpbmNsdWRlcyIsInN0dWJTdHJpbmciLCJyZWdleCIsImFyciIsImV4ZWMiLCJleGNlcHRpb25TdHJpbmciLCJleGNlcHRpb25SZWdleCIsInRtcCIsImV4Y2VwdGlvbiIsImRhdGUiLCJkYXRlUmVnZXgiLCJkYXRlQXJyIiwiZGF0ZVN0cmluZyIsImRhdGVSZWdleDIiLCJ0bXAxIiwiZXh0cmFjdGVkRGF0ZVN0cmluZyIsIkRhdGUiLCJjYWxsc3RhY2siLCJuYW1lIiwicmVhc29uIiwicmVnRm9yTmFtZSIsIm5hbWVSZWdBcnIiLCJyZWdGb3JDYWxsU3RhY2siLCJjYWxsU3RhY2tBcnJheSIsImNhbGxTdGFjayIsInJlbWFpbmluZ1N0cmluZyIsInJlcGxhY2UiLCJzbGljZSIsInNwbGl0IiwicG9wIiwidHJ1bmNhdGUiLCJiYXNlU3RyaW5nIiwibnVtT2ZDaGFycyIsInRydW5jYXRlZF9zdHJpbmciLCJwYXRoU3RyaW5nIiwicGF0aFJlZ2V4IiwicGF0aCIsInRyaW0iLCJhZGRGaWxlV2F0Y2hlckZvcmlPU0NyYXNoTG9ncyIsImRpciIsImpvaW4iLCJob21lZGlyIiwiZnMiLCJleGlzdHNTeW5jIiwid2F0Y2giLCJldmVudFR5cGUiLCJmaWxlbmFtZSIsImNoZWNrRmlsZUV4dGVuc2lvbiIsInJlYWRGaWxlIiwiZXJyIiwiZGF0YSIsImNvbnNvbGUiLCJ1dGlsIiwiZm9ybWF0IiwiQ3Jhc2hTZWxlY3RvciIsIkNvbXBvbmVudCIsInJlbmRlciIsImNyYXNoZXMiLCJzZWxlY3RlZENyYXNoSUQiLCJvcmRlcmVkSURzIiwib25DcmFzaENoYW5nZSIsInByb3BzIiwiQm9vbGVhbiIsImluZGV4IiwiaW5kZXhPZiIsIm5leHRJbmRleCIsIm5leHRJRCIsIk5vQ3Jhc2hJRCIsInRpdGxlIiwia2V5IiwiQ3Jhc2hSZXBvcnRlckJhciIsIm9wZW5Mb2dzQ2FsbGJhY2siLCJjcmFzaFNlbGVjdG9yIiwiSGVhZGVyUm93IiwibGFiZWwiLCJjbGljayIsImNsaXBib2FyZCIsIndyaXRlVGV4dCIsIkZsaXBwZXJEZXZpY2VQbHVnaW4iLCJzdXBwb3J0c0RldmljZSIsImRldmljZSIsImNvbnN0cnVjdG9yIiwic2VsZWN0UGx1Z2luIiwiZGVlcGxpbmtlZENyYXNoIiwiZGVlcExpbmtQYXlsb2FkIiwiZmluZEluZGV4IiwiZWxlbSIsIm5vdGlmaWNhdGlvbklEIiwic3RhdGUiLCJjcmFzaFRvQmVJbnNwZWN0ZWQiLCJjcmFzaE1hcCIsInJlZHVjZSIsImFjYyIsInBlcnNpc3RlZENyYXNoIiwidG9Mb2NhbGVTdHJpbmciLCJtYXAiLCJuZXdTZWxlY3RlZENyYXNoIiwiZmluZCIsImVsZW1lbnQiLCJzZXRTdGF0ZSIsImxvZyIsImNhbGxzdGFja1N0cmluZyIsImNoaWxkcmVuIiwic3RyIiwib3BlbkluTG9ncyIsImdyZXlTdGFja1RyYWNlVGludCIsIm1ldGhvZCIsInBheWxvYWQiLCJtZXJnZWRTdGF0ZSIsImNvbmNhdCIsInRvU3RyaW5nIiwicXVlcnkiLCJzdWJzdHJpbmciLCJ0cmltQ2FsbFN0YWNrSWZQb3NzaWJsZSIsIm1zZyIsInNldmVyaXR5IiwiYWN0aW9uIiwicmVmZXJlbmNlRGF0ZSIsImFuZHJvaWRMb2ciLCJhbmRyb2lkTG9nVW5kZXJQcm9jZXNzIiwidGltZXIiLCJhZGRMb2dMaXN0ZW5lciIsImVudHJ5IiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImNoYXJBdCIsInN0cmluZyIsImZpcnN0IiwiY2hhckNvZGVBdCIsInNlY29uZCIsInN0YXJ0IiwiZW5kIiwiYWNjdW11bGF0b3IiLCJjaGFyYWN0ZXIiLCJzdHJpbmdJbmRleCIsInVuaWNvZGVJbmRleCIsInRvTnVtYmVyIiwiZmFsbGJhY2siLCJOdW1iZXIiLCJyZWFsU3RhcnQiLCJyZWFsRW5kIl0sIm1hcHBpbmdzIjoiOztBQ1dBOztBQUlBQSxFQUFBQSxNQUFNLENBQUNDLEdBQVAsR0FBYUMsWUFBYjtBQUNBRixFQUFBQSxNQUFNLENBQUNHLEdBQVAsR0FBYUMsTUFBYjtBQUNBSixFQUFBQSxNQUFNLENBQUNLLEdBQVAsR0FBYUMsS0FBYjtBQUVBLE1BQUlDLE9BQU8sR0FBR0QsS0FBSyxFQUFuQjtBQUlBLE1BQUlFLEtBQUssR0FBRyxFQUFaO0FBQ0EsTUFBSUMsSUFBSSxHQUFHLEVBQVg7QUFBQSxNQUNFQyxjQUFjLEdBQUdELElBQUksQ0FBQ0MsY0FEeEI7O0FBR0EsV0FBU0osS0FBVCxHQUFpQjtBQUNmQyxJQUFBQSxPQUFPLEdBQ0wsT0FBT0ksZUFBUCxLQUEyQixRQUEzQixHQUNJQyxLQUFLLENBQUNELGVBQWUsR0FBRyxDQUFuQixDQURULEdBRUlFLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLElBQWQsQ0FITjtBQVFBLFdBQU9QLE9BQVA7QUFDRDs7QUFPRCxXQUFTSCxNQUFULENBQWdCVyxPQUFoQixFQUF5QkMsUUFBekIsRUFBbUNDLGFBQW5DLEVBQWtEO0FBQ2hELFFBQUlWLE9BQU8sQ0FBQ1MsUUFBRCxDQUFQLElBQXFCLElBQXpCLEVBQStCO0FBbUI3QjtBQUNEOztBQUNEVCxJQUFBQSxPQUFPLENBQUNTLFFBQUQsQ0FBUCxHQUFvQjtBQUNsQkMsTUFBQUEsYUFBYSxFQUFFQSxhQURHO0FBRWxCRixNQUFBQSxPQUFPLEVBQUVBLE9BRlM7QUFHbEJHLE1BQUFBLFFBQVEsRUFBRSxLQUhRO0FBSWxCQyxNQUFBQSxXQUFXLEVBQUVYLEtBSks7QUFLbEJZLE1BQUFBLGVBQWUsRUFBRVosS0FMQztBQU1sQmEsTUFBQUEsYUFBYSxFQUFFLEtBTkc7QUFPbEJDLE1BQUFBLFlBQVksRUFBRTtBQUFFQyxRQUFBQSxPQUFPLEVBQUU7QUFBWDtBQVBJLEtBQXBCO0FBc0JEOztBQUVELFdBQVNyQixZQUFULENBQXNCYyxRQUF0QixFQUFnQztBQWlCOUIsUUFBSVEsc0JBQXNCLEdBQUdSLFFBQTdCO0FBd0JBLFFBQUlTLE1BQU0sR0FBR2xCLE9BQU8sQ0FBQ2lCLHNCQUFELENBQXBCO0FBRUEsV0FBT0MsTUFBTSxJQUFJQSxNQUFNLENBQUNKLGFBQWpCLEdBQ0hJLE1BQU0sQ0FBQ0gsWUFBUCxDQUFvQkMsT0FEakIsR0FFSEcsaUJBQWlCLENBQUNGLHNCQUFELEVBQXlCQyxNQUF6QixDQUZyQjtBQUdEOztBQUVELFdBQVNFLGtCQUFULENBQTRCWCxRQUE1QixFQUFzQztBQU9wQyxRQUFJUSxzQkFBc0IsR0FBR1IsUUFBN0I7O0FBRUEsUUFDRVQsT0FBTyxDQUFDaUIsc0JBQUQsQ0FBUCxJQUNBakIsT0FBTyxDQUFDaUIsc0JBQUQsQ0FBUCxDQUFnQ0osZUFBaEMsS0FBb0RaLEtBRnRELEVBR0U7QUFDQSxhQUFPRCxPQUFPLENBQUNpQixzQkFBRCxDQUFQLENBQWdDSixlQUF2QztBQUNEOztBQUVELFFBQUlHLE9BQU8sR0FBR3JCLFlBQVksQ0FBQ3NCLHNCQUFELENBQTFCO0FBQ0EsUUFBSUosZUFBZSxHQUNqQkcsT0FBTyxJQUFJQSxPQUFPLENBQUNLLFVBQW5CLEdBQWdDTCxPQUFPLENBQUNNLE9BQXhDLEdBQWtETixPQURwRDtBQUdBLFdBQVFoQixPQUFPLENBQUNpQixzQkFBRCxDQUFQLENBQWdDSixlQUFoQyxHQUFrREEsZUFBMUQ7QUFDRDs7QUFFRCxXQUFTVSxjQUFULENBQXdCZCxRQUF4QixFQUFrQztBQU9oQyxRQUFJUSxzQkFBc0IsR0FBR1IsUUFBN0I7O0FBRUEsUUFDRVQsT0FBTyxDQUFDaUIsc0JBQUQsQ0FBUCxJQUNBakIsT0FBTyxDQUFDaUIsc0JBQUQsQ0FBUCxDQUFnQ0wsV0FBaEMsS0FBZ0RYLEtBRmxELEVBR0U7QUFDQSxhQUFPRCxPQUFPLENBQUNpQixzQkFBRCxDQUFQLENBQWdDTCxXQUF2QztBQUNEOztBQUVELFFBQUlJLE9BQU8sR0FBR3JCLFlBQVksQ0FBQ3NCLHNCQUFELENBQTFCO0FBQ0EsUUFBSUwsV0FBVyxZQUFmOztBQUVBLFFBQUlJLE9BQU8sSUFBSUEsT0FBTyxDQUFDSyxVQUF2QixFQUFtQztBQUNqQ1QsTUFBQUEsV0FBVyxHQUFHSSxPQUFkO0FBQ0QsS0FGRCxNQUVPO0FBQ0xKLE1BQUFBLFdBQVcsR0FBRyxFQUFkOztBQUdBLFVBQUlJLE9BQUosRUFBYTtBQUNYLGFBQUssSUFBSVEsSUFBVCxJQUFpQlIsT0FBakIsRUFBMEI7QUFDeEIsY0FBSWIsY0FBYyxDQUFDc0IsSUFBZixDQUFvQlQsT0FBcEIsRUFBNkJRLElBQTdCLENBQUosRUFBd0M7QUFDdENaLFlBQUFBLFdBQVcsQ0FBQ1ksSUFBRCxDQUFYLEdBQW9CUixPQUFPLENBQUNRLElBQUQsQ0FBM0I7QUFDRDtBQUNGO0FBQ0Y7O0FBRURaLE1BQUFBLFdBQVcsQ0FBQ1UsT0FBWixHQUFzQk4sT0FBdEI7QUFDRDs7QUFFRCxXQUFRaEIsT0FBTyxDQUFDaUIsc0JBQUQsQ0FBUCxDQUFnQ0wsV0FBaEMsR0FBOENBLFdBQXREO0FBQ0Q7O0FBRUQsTUFBSWMsT0FBTyxHQUFHLEtBQWQ7O0FBQ0EsV0FBU1AsaUJBQVQsQ0FBMkJWLFFBQTNCLEVBQXFDUyxNQUFyQyxFQUE2QztBQUMzQyxRQUFJLENBQUNRLE9BQUQsSUFBWWpDLE1BQU0sQ0FBQ2tDLFVBQXZCLEVBQW1DO0FBQ2pDRCxNQUFBQSxPQUFPLEdBQUcsSUFBVjtBQUNBLFVBQUlFLFdBQVcsWUFBZjs7QUFDQSxVQUFJO0FBQ0ZBLFFBQUFBLFdBQVcsR0FBR0Msd0JBQXdCLENBQUNwQixRQUFELEVBQVdTLE1BQVgsQ0FBdEM7QUFDRCxPQUZELENBRUUsT0FBT1ksQ0FBUCxFQUFVO0FBQ1ZyQyxRQUFBQSxNQUFNLENBQUNrQyxVQUFQLENBQWtCSSxnQkFBbEIsQ0FBbUNELENBQW5DO0FBQ0Q7O0FBQ0RKLE1BQUFBLE9BQU8sR0FBRyxLQUFWO0FBQ0EsYUFBT0UsV0FBUDtBQUNELEtBVkQsTUFVTztBQUNMLGFBQU9DLHdCQUF3QixDQUFDcEIsUUFBRCxFQUFXUyxNQUFYLENBQS9CO0FBQ0Q7QUFDRjs7QUFFRCxNQUFJYyxhQUFhLEdBQUcsRUFBcEI7QUFDQSxNQUFJQyxhQUFhLFFBQWpCOztBQUVBLFdBQVNDLGNBQVQsQ0FBd0J6QixRQUF4QixFQUFrQztBQUNoQyxRQUFJMEIsU0FBUyxHQUFHMUIsUUFBUSxLQUFLdUIsYUFBN0I7QUFDQSxRQUFJSSxPQUFPLEdBQUczQixRQUFRLEdBQUd3QixhQUF6QjtBQUNBLFdBQU87QUFBRUUsTUFBQUEsU0FBUyxFQUFFQSxTQUFiO0FBQXdCQyxNQUFBQSxPQUFPLEVBQUVBO0FBQWpDLEtBQVA7QUFDRDs7QUFDRHpDLEVBQUFBLFlBQVksQ0FBQ3VDLGNBQWIsR0FBOEJBLGNBQTlCOztBQUVBLFdBQVNHLFlBQVQsQ0FBc0JDLEtBQXRCLEVBQTZCO0FBQzNCLFdBQU8sQ0FBQ0EsS0FBSyxDQUFDSCxTQUFOLElBQW1CSCxhQUFwQixJQUFxQ00sS0FBSyxDQUFDRixPQUFsRDtBQUNEOztBQUNEekMsRUFBQUEsWUFBWSxDQUFDMEMsWUFBYixHQUE0QkEsWUFBNUI7QUFFQSxNQUFJRSxLQUFLLEdBQUcsRUFBWjs7QUFDQSxXQUFTQyxZQUFULENBQXNCQyxFQUF0QixFQUEwQjtBQUN4QixRQUFJQyxJQUFJLEdBQUc7QUFBRUQsTUFBQUEsRUFBRSxFQUFFQTtBQUFOLEtBQVg7QUFDQUYsSUFBQUEsS0FBSyxDQUFDSSxJQUFOLENBQVdELElBQVg7QUFDQSxXQUFPO0FBQ0xFLE1BQUFBLE9BQU8sRUFBRSxTQUFTQSxPQUFULEdBQW1CO0FBQzFCLGFBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR04sS0FBSyxDQUFDTyxNQUExQixFQUFrQyxFQUFFRCxDQUFwQyxFQUF1QztBQUNyQyxjQUFJTixLQUFLLENBQUNNLENBQUQsQ0FBTCxLQUFhSCxJQUFqQixFQUF1QjtBQUNyQkgsWUFBQUEsS0FBSyxDQUFDUSxNQUFOLENBQWFGLENBQWIsRUFBZ0IsQ0FBaEI7QUFDQTtBQUNEO0FBQ0Y7QUFDRjtBQVJJLEtBQVA7QUFVRDs7QUFDRGxELEVBQUFBLFlBQVksQ0FBQzZDLFlBQWIsR0FBNEJBLFlBQTVCOztBQUVBLFdBQVNYLHdCQUFULENBQWtDcEIsUUFBbEMsRUFBNENTLE1BQTVDLEVBQW9EO0FBQ2xELFFBQUksQ0FBQ0EsTUFBRCxJQUFXekIsTUFBTSxDQUFDdUQsY0FBdEIsRUFBc0M7QUFDcEN2RCxNQUFBQSxNQUFNLENBQUN1RCxjQUFQLENBQXNCdkMsUUFBdEI7O0FBQ0FTLE1BQUFBLE1BQU0sR0FBR2xCLE9BQU8sQ0FBQ1MsUUFBRCxDQUFoQjtBQUNEOztBQUVELFFBQUl3QyxhQUFhLEdBQUd4RCxNQUFNLENBQUN3RCxhQUEzQjs7QUFDQSxRQUFJLENBQUMvQixNQUFELElBQVcrQixhQUFmLEVBQThCO0FBQzVCLFVBQUlDLGVBQWUsR0FBR2hCLGNBQWMsQ0FBQ3pCLFFBQUQsQ0FBcEM7QUFBQSxVQUNFMEMsVUFBVSxHQUFHRCxlQUFlLENBQUNmLFNBRC9CO0FBQUEsVUFFRWlCLFFBQVEsR0FBR0YsZUFBZSxDQUFDZCxPQUY3Qjs7QUFJQWEsTUFBQUEsYUFBYSxDQUFDRyxRQUFELEVBQVdELFVBQVgsQ0FBYjtBQUNBakMsTUFBQUEsTUFBTSxHQUFHbEIsT0FBTyxDQUFDUyxRQUFELENBQWhCO0FBQ0Q7O0FBRUQsUUFBSSxDQUFDUyxNQUFMLEVBQWE7QUFDWCxZQUFNbUMsa0JBQWtCLENBQUM1QyxRQUFELENBQXhCO0FBQ0Q7O0FBRUQsUUFBSVMsTUFBTSxDQUFDUCxRQUFYLEVBQXFCO0FBQ25CLFlBQU0yQyxnQkFBZ0IsQ0FBQzdDLFFBQUQsRUFBV1MsTUFBTSxDQUFDcUMsS0FBbEIsQ0FBdEI7QUFDRDs7QUFjRHJDLElBQUFBLE1BQU0sQ0FBQ0osYUFBUCxHQUF1QixJQUF2QjtBQUVBLFFBQUkwQyxPQUFPLEdBQUd0QyxNQUFkO0FBQUEsUUFDRVYsT0FBTyxHQUFHZ0QsT0FBTyxDQUFDaEQsT0FEcEI7QUFBQSxRQUVFRSxhQUFhLEdBQUc4QyxPQUFPLENBQUM5QyxhQUYxQjs7QUFPQSxRQUFJO0FBTUYsVUFBSStDLGFBQWEsR0FBR3ZDLE1BQU0sQ0FBQ0gsWUFBM0I7QUFPQTBDLE1BQUFBLGFBQWEsQ0FBQ0MsRUFBZCxHQUFtQmpELFFBQW5COztBQUVBLFVBQUk4QixLQUFLLENBQUNPLE1BQU4sR0FBZSxDQUFuQixFQUFzQjtBQUNwQixhQUFLLElBQUlELENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdOLEtBQUssQ0FBQ08sTUFBMUIsRUFBa0MsRUFBRUQsQ0FBcEMsRUFBdUM7QUFDckNOLFVBQUFBLEtBQUssQ0FBQ00sQ0FBRCxDQUFMLENBQVNKLEVBQVQsQ0FBWWhDLFFBQVosRUFBc0JnRCxhQUF0QjtBQUNEO0FBQ0Y7O0FBS0RqRCxNQUFBQSxPQUFPLENBQ0xmLE1BREssRUFFTEUsWUFGSyxFQUdMeUIsa0JBSEssRUFJTEcsY0FKSyxFQUtMa0MsYUFMSyxFQU1MQSxhQUFhLENBQUN6QyxPQU5ULEVBT0xOLGFBUEssQ0FBUDtBQVdjO0FBRVpRLFFBQUFBLE1BQU0sQ0FBQ1YsT0FBUCxHQUFpQm1ELFNBQWpCO0FBQ0F6QyxRQUFBQSxNQUFNLENBQUNSLGFBQVAsR0FBdUJpRCxTQUF2QjtBQUNEO0FBTUQsYUFBT0YsYUFBYSxDQUFDekMsT0FBckI7QUFDRCxLQTlDRCxDQThDRSxPQUFPYyxDQUFQLEVBQVU7QUFDVlosTUFBQUEsTUFBTSxDQUFDUCxRQUFQLEdBQWtCLElBQWxCO0FBQ0FPLE1BQUFBLE1BQU0sQ0FBQ3FDLEtBQVAsR0FBZXpCLENBQWY7QUFDQVosTUFBQUEsTUFBTSxDQUFDSixhQUFQLEdBQXVCLEtBQXZCO0FBQ0FJLE1BQUFBLE1BQU0sQ0FBQ0gsWUFBUCxDQUFvQkMsT0FBcEIsR0FBOEIyQyxTQUE5QjtBQUNBLFlBQU03QixDQUFOO0FBQ0QsS0FwREQsU0FvRFUsQ0FRVDtBQUNGOztBQUVELFdBQVN1QixrQkFBVCxDQUE0QkssRUFBNUIsRUFBZ0M7QUFDOUIsUUFBSUUsT0FBTyxHQUFHLCtCQUErQkYsRUFBL0IsR0FBb0MsSUFBbEQ7QUFNQSxXQUFPRyxLQUFLLENBQUNELE9BQUQsQ0FBWjtBQUNEOztBQUVELFdBQVNOLGdCQUFULENBQTBCSSxFQUExQixFQUE4QkgsS0FBOUIsRUFBcUM7QUFDbkMsUUFBSU8sV0FBVyxHQUEwREosRUFBekU7QUFDQSxXQUFPRyxLQUFLLENBQ1YsdUJBQXVCQyxXQUF2QixHQUFxQywrQkFBckMsR0FBdUVQLEtBRDdELENBQVo7QUFHRDs7Ozs7Ozs7Ozs7Ozs7QUM1V0Q7O0FBc0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUdBOzs7Ozs7QUEyQ0EsUUFBTVEsTUFBTSxHQUFHLHFCQUFPLEtBQVAsRUFDYixDQUFDO0FBQUNDLElBQUFBLFdBQUQ7QUFBY0MsSUFBQUEsWUFBZDtBQUE0QkMsSUFBQUEsYUFBNUI7QUFBMkNDLElBQUFBO0FBQTNDLEdBQUQsTUFBNkQ7QUFDM0RILElBQUFBLFdBQVcsRUFBRUEsV0FBVyxJQUFJLENBRCtCO0FBRTNEQyxJQUFBQSxZQUFZLEVBQUVBLFlBQVksSUFBSSxDQUY2QjtBQUczREMsSUFBQUEsYUFBYSxFQUFFQSxhQUFhLElBQUksQ0FIMkI7QUFJM0RDLElBQUFBLFVBQVUsRUFBRUEsVUFBVSxJQUFJO0FBSmlDLEdBQTdELENBRGEsQ0FBZjtBQVNBLFFBQU1DLEtBQUssR0FBRyxxQkFBT0MsYUFBUCxFQUFhO0FBQ3pCQyxJQUFBQSxVQUFVLEVBQUUsTUFEYTtBQUV6QkMsSUFBQUEsS0FBSyxFQUFFQyxnQkFBT0MsU0FGVztBQUd6QkMsSUFBQUEsTUFBTSxFQUFFLE1BSGlCO0FBSXpCQyxJQUFBQSxLQUFLLEVBQUUsR0FKa0I7QUFLekJDLElBQUFBLFlBQVksRUFBRTtBQUxXLEdBQWIsQ0FBZDtBQVFBLFFBQU1DLElBQUksR0FBRyxxQkFBT0MsYUFBUCxFQUFhO0FBQ3hCQyxJQUFBQSxlQUFlLEVBQUVQLGdCQUFPUSxTQURBO0FBRXhCTixJQUFBQSxNQUFNLEVBQUUsQ0FGZ0I7QUFHeEJDLElBQUFBLEtBQUssRUFBRSxNQUhpQjtBQUl4Qk0sSUFBQUEsU0FBUyxFQUFFLENBSmE7QUFLeEJDLElBQUFBLFVBQVUsRUFBRTtBQUxZLEdBQWIsQ0FBYjtBQVFBLFFBQU1DLFNBQVMsR0FBRyxxQkFBT0MsbUJBQVAsRUFBbUI7QUFDbkNDLElBQUFBLFFBQVEsRUFBRSxRQUR5QjtBQUVuQ0gsSUFBQUEsVUFBVSxFQUFFO0FBRnVCLEdBQW5CLENBQWxCO0FBS0EsUUFBTUksS0FBSyxHQUFHLHFCQUFPbEIsS0FBUCxFQUFjO0FBQzFCbUIsSUFBQUEsU0FBUyxFQUFFLEdBRGU7QUFFMUJiLElBQUFBLE1BQU0sRUFBRSxNQUZrQjtBQUcxQmMsSUFBQUEsUUFBUSxFQUFFO0FBSGdCLEdBQWQsQ0FBZDtBQU1BLFFBQU1DLGNBQWMsR0FBRyxxQkFBT0wsbUJBQVAsRUFBbUI7QUFDeENJLElBQUFBLFFBQVEsRUFBRTtBQUQ4QixHQUFuQixDQUF2QjtBQUlBLFFBQU1FLGdCQUFnQixHQUFHLHFCQUFPRCxjQUFQLEVBQXVCO0FBQzlDSixJQUFBQSxRQUFRLEVBQUUsUUFEb0M7QUFFOUNYLElBQUFBLE1BQU0sRUFBRTtBQUZzQyxHQUF2QixDQUF6QjtBQUtBLFFBQU1pQixvQkFBb0IsR0FBRyxxQkFBT1AsbUJBQVAsRUFBbUI7QUFDOUNJLElBQUFBLFFBQVEsRUFBRTtBQURvQyxHQUFuQixDQUE3QjtBQUlBLFFBQU1JLG1CQUFtQixHQUFHLHFCQUFPQyxnQkFBUCxFQUFnQjtBQUMxQ0MsSUFBQUEsU0FBUyxFQUFFLFFBRCtCO0FBRTFDQyxJQUFBQSxjQUFjLEVBQUUsUUFGMEI7QUFHMUNyQixJQUFBQSxNQUFNLEVBQUU7QUFIa0MsR0FBaEIsQ0FBNUI7QUFNQSxRQUFNc0IsZ0JBQWdCLEdBQUcscUJBQU9MLG9CQUFQLEVBQTZCO0FBQ3BESSxJQUFBQSxjQUFjLEVBQUUsUUFEb0M7QUFFcERFLElBQUFBLFVBQVUsRUFBRTtBQUZ3QyxHQUE3QixDQUF6QjtBQUtBLFFBQU1DLDBCQUEwQixHQUFHLHFCQUFPTCxnQkFBUCxFQUFnQjtBQUNqRG5CLElBQUFBLE1BQU0sRUFBRTtBQUR5QyxHQUFoQixDQUFuQztBQUlBLFFBQU15QixvQkFBb0IsR0FBRyxxQkFBT04sZ0JBQVAsRUFBZ0I7QUFDM0M3QixJQUFBQSxXQUFXLEVBQUUsQ0FEOEI7QUFFM0NHLElBQUFBLFVBQVUsRUFBRSxDQUYrQjtBQUczQ0QsSUFBQUEsYUFBYSxFQUFFLENBSDRCO0FBSTNDUSxJQUFBQSxNQUFNLEVBQUU7QUFKbUMsR0FBaEIsQ0FBN0I7QUFPQSxRQUFNMEIscUJBQXFCLEdBQUcscUJBQU9QLGdCQUFQLEVBQWdCO0FBQzVDN0IsSUFBQUEsV0FBVyxFQUFFLENBRCtCO0FBRTVDRyxJQUFBQSxVQUFVLEVBQUUsQ0FGZ0M7QUFHNUNELElBQUFBLGFBQWEsRUFBRSxDQUg2QjtBQUk1Q1EsSUFBQUEsTUFBTSxFQUFFO0FBSm9DLEdBQWhCLENBQTlCO0FBT0EsUUFBTTJCLFlBQVksR0FBRyxxQkFBT0MsZUFBUCxFQUFlO0FBQ2xDNUIsSUFBQUEsTUFBTSxFQUFFLE1BRDBCO0FBRWxDNkIsSUFBQUEsUUFBUSxFQUFFO0FBRndCLEdBQWYsQ0FBckI7O0FBS08sV0FBU0MsaUNBQVQsQ0FDTEMsY0FESyxFQUVMQyxnQkFGSyxFQUdMQyxPQUhLLEVBSUxDLEVBSkssRUFLTEMsT0FMSyxFQU1ZO0FBQ2pCLFVBQU1DLHFCQUFxQixHQUFHSixnQkFBZ0IsQ0FBQ0kscUJBQS9DOztBQUNBLFFBQUksQ0FBQ0YsRUFBRCxJQUFPLENBQUNFLHFCQUFaLEVBQW1DO0FBQ2pDLGFBQU8sSUFBUDtBQUNEOztBQUNELFVBQU1DLEtBQUssR0FBR0MsYUFBYSxDQUFDTCxPQUFELEVBQVVDLEVBQVYsRUFBY0MsT0FBZCxDQUEzQjtBQUNBLFVBQU1JLGNBQWMsR0FBR0gscUJBQXFCLENBQzFDTCxjQUQwQyxFQUUxQyxjQUYwQyxFQUcxQ00sS0FIMEMsQ0FBNUM7QUFLQSxXQUFPRSxjQUFQO0FBQ0Q7O0FBRU0sV0FBU0MsMkJBQVQsQ0FDTEMsS0FESyxFQUVMUixPQUZLLEVBR0xTLGlCQUhLLEVBT0xQLE9BUEssRUFRTDtBQUFBOztBQUNBLFVBQU1ELEVBQUUsNEJBQUdPLEtBQUssQ0FBQ0UsUUFBTixHQUFpQkMsV0FBakIsQ0FBNkJDLGNBQWhDLGdFQUFHLHNCQUE2Q1gsRUFBeEQ7O0FBQ0EsUUFDRSxDQUFDWSwyQkFBMkIsQ0FDMUJMLEtBQUssQ0FBQ0UsUUFBTixHQUFpQkMsV0FBakIsQ0FBNkJDLGNBREgsRUFFMUJaLE9BRjBCLEVBRzFCQyxFQUgwQixDQUQ5QixFQU1FO0FBQ0E7QUFDRDs7QUFDRCxVQUFNYSxRQUFRLEdBQUdDLG1CQUFtQixDQUFDaEUsRUFBckM7QUFDQSxVQUFNaUUsU0FBUyxHQUFHLDJCQUNoQixJQURnQixFQUVoQlIsS0FBSyxDQUFDRSxRQUFOLEdBQWlCQyxXQUFqQixDQUE2QkMsY0FGYixFQUdoQkUsUUFIZ0IsQ0FBbEI7QUFLQSxVQUFNZixnQkFFTCxHQUFHUyxLQUFLLENBQUNFLFFBQU4sR0FBaUJPLE9BQWpCLENBQXlCQyxhQUF6QixDQUF1Q0MsR0FBdkMsQ0FBMkNKLG1CQUFtQixDQUFDaEUsRUFBL0QsQ0FGSjs7QUFHQSxRQUFJLENBQUNnRCxnQkFBTCxFQUF1QjtBQUNyQjtBQUNEOztBQUNELFVBQU1xQixZQUFZLEdBQUdaLEtBQUssQ0FBQ0UsUUFBTixHQUFpQlUsWUFBdEM7QUFDQSxVQUFNdEIsY0FBYyxHQUFHLGdDQUNyQmtCLFNBRHFCLEVBRXJCakIsZ0JBRnFCLEVBR3JCcUIsWUFIcUIsQ0FBdkI7QUFLQSxVQUFNZCxjQUFjLEdBQUdULGlDQUFpQyxDQUN0REMsY0FEc0QsRUFFdERDLGdCQUZzRCxFQUd0REMsT0FIc0QsRUFJdERDLEVBSnNELEVBS3REQyxPQUxzRCxDQUF4RDtBQU9BTyxJQUFBQSxpQkFBaUIsQ0FBQ08sU0FBRCxFQUFZVixjQUFaLENBQWpCO0FBQ0Q7O0FBRU0sV0FBU08sMkJBQVQsQ0FDTFEsVUFESyxFQUVMckIsT0FGSyxFQUdMQyxFQUhLLEVBSUk7QUFDVCxRQUFJQSxFQUFFLElBQUlBLEVBQUUsS0FBSyxTQUFqQixFQUE0QjtBQUMxQixhQUFPLElBQVA7QUFDRDs7QUFDRCxVQUFNcUIsT0FBTyxHQUFHQyxTQUFTLENBQUN2QixPQUFELENBQXpCO0FBQ0EsVUFBTXdCLE1BQWMsR0FBRyxDQUFBSCxVQUFVLFNBQVYsSUFBQUEsVUFBVSxjQUFWLGVBQUFBLFVBQVUsQ0FBRUcsTUFBWixLQUFzQixTQUE3Qzs7QUFDQSxRQUFJLENBQUNGLE9BQUQsSUFBWSxDQUFDQSxPQUFPLENBQUNHLFFBQVIsQ0FBaUJELE1BQWpCLENBQWpCLEVBQTJDO0FBRXpDLGFBQU8sS0FBUDtBQUNEOztBQUNELFdBQU8sSUFBUDtBQUNEOztBQUVNLFdBQVNuQixhQUFULENBQ0xMLE9BREssRUFFTEMsRUFGSyxFQUdMQyxPQUhLLEVBSUs7QUFDVixVQUFNd0IsVUFBVSxHQUFHLDZCQUFuQjs7QUFDQSxZQUFRekIsRUFBUjtBQUNFLFdBQUssS0FBTDtBQUFZO0FBQ1YsZ0JBQU0wQixLQUFLLEdBQUcsd0JBQWQ7QUFDQSxnQkFBTUMsR0FBRyxHQUFHRCxLQUFLLENBQUNFLElBQU4sQ0FBVzdCLE9BQVgsQ0FBWjtBQUNBLGdCQUFNOEIsZUFBZSxHQUFHRixHQUFHLEdBQUdBLEdBQUcsQ0FBQyxDQUFELENBQU4sR0FBWSxFQUF2QztBQUNBLGdCQUFNRyxjQUFjLEdBQUcsUUFBdkI7QUFDQSxnQkFBTUMsR0FBRyxHQUFHRCxjQUFjLENBQUNGLElBQWYsQ0FBb0JDLGVBQXBCLENBQVo7QUFDQSxnQkFBTUcsU0FBUyxHQUNiRCxHQUFHLElBQUlBLEdBQUcsQ0FBQyxDQUFELENBQUgsQ0FBTzdGLE1BQWQsR0FBdUI2RixHQUFHLENBQUMsQ0FBRCxDQUExQixHQUFnQyw2QkFEbEM7QUFHQSxjQUFJRSxJQUFJLEdBQUdoQyxPQUFYOztBQUNBLGNBQUksQ0FBQ2dDLElBQUwsRUFBVztBQUNULGtCQUFNQyxTQUFTLEdBQUcsMEJBQWxCO0FBQ0Esa0JBQU1DLE9BQU8sR0FBR0QsU0FBUyxDQUFDTixJQUFWLENBQWU3QixPQUFmLENBQWhCO0FBQ0Esa0JBQU1xQyxVQUFVLEdBQUdELE9BQU8sR0FBR0EsT0FBTyxDQUFDLENBQUQsQ0FBVixHQUFnQixFQUExQztBQUNBLGtCQUFNRSxVQUFVLEdBQUcsY0FBbkI7QUFDQSxrQkFBTUMsSUFBSSxHQUFHRCxVQUFVLENBQUNULElBQVgsQ0FBZ0JRLFVBQWhCLENBQWI7QUFDQSxrQkFBTUcsbUJBQTRCLEdBQ2hDRCxJQUFJLElBQUlBLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUXBHLE1BQWhCLEdBQXlCb0csSUFBSSxDQUFDLENBQUQsQ0FBN0IsR0FBbUMsSUFEckM7QUFFQUwsWUFBQUEsSUFBSSxHQUFHTSxtQkFBbUIsR0FBRyxJQUFJQyxJQUFKLENBQVNELG1CQUFULENBQUgsR0FBbUN0QyxPQUE3RDtBQUNEOztBQUVELGdCQUFNRSxLQUFLLEdBQUc7QUFDWnNDLFlBQUFBLFNBQVMsRUFBRTFDLE9BREM7QUFFWjJDLFlBQUFBLElBQUksRUFBRVYsU0FGTTtBQUdaVyxZQUFBQSxNQUFNLEVBQUVYLFNBSEk7QUFJWkMsWUFBQUE7QUFKWSxXQUFkO0FBTUEsaUJBQU85QixLQUFQO0FBQ0Q7O0FBQ0QsV0FBSyxTQUFMO0FBQWdCO0FBQ2QsZ0JBQU15QyxVQUFVLEdBQUcsTUFBbkI7QUFDQSxnQkFBTUMsVUFBVSxHQUFHRCxVQUFVLENBQUNoQixJQUFYLENBQWdCN0IsT0FBaEIsQ0FBbkI7QUFDQSxjQUFJMkMsSUFBSSxHQUFHRyxVQUFVLEdBQUdBLFVBQVUsQ0FBQyxDQUFELENBQWIsR0FBbUJwQixVQUF4QztBQUNBLGdCQUFNcUIsZUFBZSxHQUFHLHVDQUF4QjtBQUNBLGdCQUFNQyxjQUFjLEdBQUdELGVBQWUsQ0FBQ2xCLElBQWhCLENBQXFCN0IsT0FBckIsQ0FBdkI7QUFDQSxnQkFBTWlELFNBQVMsR0FBR0QsY0FBYyxHQUFHQSxjQUFjLENBQUMsQ0FBRCxDQUFqQixHQUF1QixFQUF2RDtBQUNBLGNBQUlFLGVBQWUsR0FDakJELFNBQVMsQ0FBQzlHLE1BQVYsR0FBbUIsQ0FBbkIsR0FBdUI2RCxPQUFPLENBQUNtRCxPQUFSLENBQWdCRixTQUFoQixFQUEyQixFQUEzQixDQUF2QixHQUF3RCxFQUQxRDs7QUFFQSxjQUFJQyxlQUFlLENBQUNBLGVBQWUsQ0FBQy9HLE1BQWhCLEdBQXlCLENBQTFCLENBQWYsS0FBZ0QsSUFBcEQsRUFBMEQ7QUFDeEQrRyxZQUFBQSxlQUFlLEdBQUdBLGVBQWUsQ0FBQ0UsS0FBaEIsQ0FBc0IsQ0FBdEIsS0FBbEI7QUFDRDs7QUFDRCxnQkFBTVIsTUFBTSxHQUNWTSxlQUFlLENBQUMvRyxNQUFoQixHQUF5QixDQUF6QixHQUNJK0csZUFBZSxDQUFDRyxLQUFoQixDQUFzQixJQUF0QixFQUE0QkMsR0FBNUIsRUFESixHQUVJNUIsVUFITjs7QUFJQSxjQUFJaUIsSUFBSSxDQUFDQSxJQUFJLENBQUN4RyxNQUFMLEdBQWMsQ0FBZixDQUFKLEtBQTBCLElBQTlCLEVBQW9DO0FBQ2xDd0csWUFBQUEsSUFBSSxHQUFHQSxJQUFJLENBQUNTLEtBQUwsQ0FBVyxDQUFYLEtBQVA7QUFDRDs7QUFDRCxnQkFBTWhELEtBQUssR0FBRztBQUNac0MsWUFBQUEsU0FBUyxFQUFFMUMsT0FEQztBQUVaMkMsWUFBQUEsSUFBSSxFQUFFQSxJQUZNO0FBR1pDLFlBQUFBLE1BQU0sRUFBRUEsTUFISTtBQUlaVixZQUFBQSxJQUFJLEVBQUVoQztBQUpNLFdBQWQ7QUFNQSxpQkFBT0UsS0FBUDtBQUNEOztBQUNEO0FBQVM7QUFDUCxnQkFBTSxJQUFJbEQsS0FBSixDQUFVLGdCQUFWLENBQU47QUFDRDtBQTNESDtBQTZERDs7QUFFRCxXQUFTcUcsUUFBVCxDQUFrQkMsVUFBbEIsRUFBc0NDLFVBQXRDLEVBQWtFO0FBQ2hFLFFBQUlELFVBQVUsQ0FBQ3JILE1BQVgsSUFBcUJzSCxVQUF6QixFQUFxQztBQUNuQyxhQUFPRCxVQUFQO0FBQ0Q7O0FBQ0QsVUFBTUUsZ0JBQWdCLEdBQUcsK0JBQWlCRixVQUFqQixFQUE2QixDQUE3QixFQUFnQ0MsVUFBVSxHQUFHLENBQTdDLENBQXpCO0FBQ0EsV0FBT0MsZ0JBQWdCLEdBQUcsUUFBMUI7QUFDRDs7QUFFTSxXQUFTbkMsU0FBVCxDQUFtQnZCLE9BQW5CLEVBQTZDO0FBQ2xELFVBQU0yQixLQUFLLEdBQUcsOEJBQWQ7QUFDQSxVQUFNQyxHQUFHLEdBQUdELEtBQUssQ0FBQ0UsSUFBTixDQUFXN0IsT0FBWCxDQUFaOztBQUNBLFFBQUksQ0FBQzRCLEdBQUQsSUFBUUEsR0FBRyxDQUFDekYsTUFBSixJQUFjLENBQTFCLEVBQTZCO0FBQzNCLGFBQU8sSUFBUDtBQUNEOztBQUNELFVBQU13SCxVQUFVLEdBQUcvQixHQUFHLENBQUMsQ0FBRCxDQUF0QjtBQUNBLFVBQU1nQyxTQUFTLEdBQUcsdUJBQWxCO0FBQ0EsVUFBTTVCLEdBQUcsR0FBRzRCLFNBQVMsQ0FBQy9CLElBQVYsQ0FBZThCLFVBQWYsQ0FBWjs7QUFDQSxRQUFJLENBQUMzQixHQUFELElBQVFBLEdBQUcsQ0FBQzdGLE1BQUosSUFBYyxDQUExQixFQUE2QjtBQUMzQixhQUFPLElBQVA7QUFDRDs7QUFDRCxVQUFNMEgsSUFBSSxHQUFHN0IsR0FBRyxDQUFDLENBQUQsQ0FBaEI7QUFDQSxXQUFPNkIsSUFBSSxDQUFDQyxJQUFMLEVBQVA7QUFDRDs7QUFFRCxXQUFTQyw2QkFBVCxDQUNFdkQsS0FERixFQUVFQyxpQkFGRixFQU1FO0FBQ0EsVUFBTXVELEdBQUcsR0FBR0gsY0FBS0ksSUFBTCxDQUFVaEUsWUFBR2lFLE9BQUgsRUFBVixFQUF3QixTQUF4QixFQUFtQyxNQUFuQyxFQUEyQyxtQkFBM0MsQ0FBWjs7QUFDQSxRQUFJLENBQUNDLFlBQUdDLFVBQUgsQ0FBY0osR0FBZCxDQUFMLEVBQXlCO0FBRXZCO0FBQ0Q7O0FBQ0RHLGdCQUFHRSxLQUFILENBQVNMLEdBQVQsRUFBYyxDQUFDTSxTQUFELEVBQVlDLFFBQVosS0FBeUI7QUFFckMsWUFBTUMsa0JBQWtCLEdBQUcsVUFBVTNDLElBQVYsQ0FBZTBDLFFBQWYsQ0FBM0I7O0FBQ0EsVUFBSSxDQUFDQSxRQUFELElBQWEsQ0FBQ0Msa0JBQWxCLEVBQXNDO0FBQ3BDO0FBQ0Q7O0FBQ0RMLGtCQUFHTSxRQUFILENBQVlaLGNBQUtJLElBQUwsQ0FBVUQsR0FBVixFQUFlTyxRQUFmLENBQVosRUFBc0MsTUFBdEMsRUFBOEMsVUFBU0csR0FBVCxFQUFjQyxJQUFkLEVBQW9CO0FBQUE7O0FBQ2hFLFlBQUksMkJBQUFuRSxLQUFLLENBQUNFLFFBQU4sR0FBaUJDLFdBQWpCLENBQTZCQyxjQUE3Qix3RkFBNkNYLEVBQTdDLEtBQW1ELEtBQXZELEVBQThEO0FBRTVEO0FBQ0Q7O0FBQ0QsWUFBSXlFLEdBQUosRUFBUztBQUNQRSxVQUFBQSxPQUFPLENBQUNoSSxLQUFSLENBQWM4SCxHQUFkO0FBQ0E7QUFDRDs7QUFDRG5FLFFBQUFBLDJCQUEyQixDQUFDQyxLQUFELEVBQVFxRSxjQUFLQyxNQUFMLENBQVlILElBQVosQ0FBUixFQUEyQmxFLGlCQUEzQixDQUEzQjtBQUNELE9BVkQ7QUFXRCxLQWpCRDtBQWtCRDs7QUFFRCxRQUFNc0UsYUFBTixTQUE0QkMsZ0JBQTVCLENBQTBEO0FBQ3hEQyxJQUFBQSxNQUFNLEdBQUc7QUFDUCxZQUFNO0FBQUNDLFFBQUFBLE9BQUQ7QUFBVUMsUUFBQUEsZUFBVjtBQUEyQkMsUUFBQUEsVUFBM0I7QUFBdUNDLFFBQUFBO0FBQXZDLFVBQXdELEtBQUtDLEtBQW5FO0FBQ0EsYUFDRSwyQkFBQyxtQkFBRCxRQUNFLDJCQUFDLG9CQUFELFFBQ0UsMkJBQUMsMEJBQUQsUUFDRSwyQkFBQyxlQUFEO0FBQ0UsUUFBQSxRQUFRLEVBQUVDLE9BQU8sQ0FBQyxDQUFDSCxVQUFELElBQWVBLFVBQVUsQ0FBQ2pKLE1BQVgsSUFBcUIsQ0FBckMsQ0FEbkI7QUFFRSxRQUFBLE9BQU8sRUFBRSxJQUZYO0FBR0UsUUFBQSxPQUFPLEVBQUUsTUFBTTtBQUNiLGNBQUlrSixhQUFhLElBQUlELFVBQXJCLEVBQWlDO0FBQy9CLGtCQUFNSSxLQUFLLEdBQUdKLFVBQVUsQ0FBQ0ssT0FBWCxDQUFtQk4sZUFBbkIsQ0FBZDtBQUNBLGtCQUFNTyxTQUFTLEdBQ2JGLEtBQUssR0FBRyxDQUFSLEdBQVlKLFVBQVUsQ0FBQ2pKLE1BQVgsR0FBb0IsQ0FBaEMsR0FBb0NxSixLQUFLLEdBQUcsQ0FEOUM7QUFFQSxrQkFBTUcsTUFBTSxHQUFHUCxVQUFVLENBQUNNLFNBQUQsQ0FBekI7QUFDQUwsWUFBQUEsYUFBYSxDQUFDTSxNQUFELENBQWI7QUFDRDtBQUNGLFNBWEg7QUFZRSxRQUFBLElBQUksRUFBQyxjQVpQO0FBYUUsUUFBQSxRQUFRLEVBQUUsRUFiWjtBQWNFLFFBQUEsS0FBSyxFQUFDO0FBZFIsUUFERixDQURGLEVBbUJFLDJCQUFDLDBCQUFELFFBQ0UsMkJBQUMsZUFBRDtBQUNFLFFBQUEsUUFBUSxFQUFFSixPQUFPLENBQUMsQ0FBQ0gsVUFBRCxJQUFlQSxVQUFVLENBQUNqSixNQUFYLElBQXFCLENBQXJDLENBRG5CO0FBRUUsUUFBQSxPQUFPLEVBQUUsSUFGWDtBQUdFLFFBQUEsT0FBTyxFQUFFLE1BQU07QUFDYixjQUFJa0osYUFBYSxJQUFJRCxVQUFyQixFQUFpQztBQUMvQixrQkFBTUksS0FBSyxHQUFHSixVQUFVLENBQUNLLE9BQVgsQ0FBbUJOLGVBQW5CLENBQWQ7QUFDQSxrQkFBTU8sU0FBUyxHQUNiRixLQUFLLElBQUlKLFVBQVUsQ0FBQ2pKLE1BQVgsR0FBb0IsQ0FBN0IsR0FBaUMsQ0FBakMsR0FBcUNxSixLQUFLLEdBQUcsQ0FEL0M7QUFFQSxrQkFBTUcsTUFBTSxHQUFHUCxVQUFVLENBQUNNLFNBQUQsQ0FBekI7QUFDQUwsWUFBQUEsYUFBYSxDQUFDTSxNQUFELENBQWI7QUFDRDtBQUNGLFNBWEg7QUFZRSxRQUFBLElBQUksRUFBQyxlQVpQO0FBYUUsUUFBQSxRQUFRLEVBQUUsRUFiWjtBQWNFLFFBQUEsS0FBSyxFQUFDO0FBZFIsUUFERixDQW5CRixDQURGLEVBdUNFLDJCQUFDLHFCQUFELFFBQ0UsMkJBQUMsWUFBRDtBQUNFLFFBQUEsSUFBSSxFQUFFLElBRFI7QUFFRSxRQUFBLFFBQVEsRUFBRVIsZUFBZSxJQUFJLFdBRi9CO0FBR0UsUUFBQSxPQUFPLEVBQUVELE9BQU8sSUFBSTtBQUFDVSxVQUFBQSxTQUFTLEVBQUU7QUFBWixTQUh0QjtBQUlFLFFBQUEsUUFBUSxFQUFHQyxLQUFELElBQW1CO0FBQzNCLGVBQUssTUFBTUMsR0FBWCxJQUFrQlosT0FBbEIsRUFBMkI7QUFDekIsZ0JBQUlBLE9BQU8sQ0FBQ1ksR0FBRCxDQUFQLEtBQWlCRCxLQUFqQixJQUEwQlIsYUFBOUIsRUFBNkM7QUFDM0NBLGNBQUFBLGFBQWEsQ0FBQ1MsR0FBRCxDQUFiO0FBQ0E7QUFDRDtBQUNGO0FBQ0Y7QUFYSCxRQURGLENBdkNGLENBREY7QUF5REQ7O0FBNUR1RDs7QUErRDFELFFBQU1DLGdCQUFOLFNBQStCZixnQkFBL0IsQ0FBZ0U7QUFDOURDLElBQUFBLE1BQU0sR0FBRztBQUNQLFlBQU07QUFBQ2UsUUFBQUEsZ0JBQUQ7QUFBbUJDLFFBQUFBO0FBQW5CLFVBQW9DLEtBQUtYLEtBQS9DO0FBQ0EsYUFDRSwyQkFBQyxnQkFBRCxRQUNFLDJCQUFDLGFBQUQsRUFBbUJXLGFBQW5CLENBREYsRUFFRSwyQkFBQyxlQUFELE9BRkYsRUFHRSwyQkFBQyxlQUFEO0FBQ0UsUUFBQSxRQUFRLEVBQUVWLE9BQU8sQ0FBQyxDQUFDUyxnQkFBRixDQURuQjtBQUVFLFFBQUEsT0FBTyxFQUFFQTtBQUZYLHdCQUhGLENBREY7QUFXRDs7QUFkNkQ7O0FBaUJoRSxRQUFNRSxTQUFOLFNBQXdCbEIsZ0JBQXhCLENBQWtEO0FBQ2hEQyxJQUFBQSxNQUFNLEdBQUc7QUFDUCxZQUFNO0FBQUNZLFFBQUFBLEtBQUQ7QUFBUWxLLFFBQUFBO0FBQVIsVUFBaUIsS0FBSzJKLEtBQTVCO0FBQ0EsYUFDRSwyQkFBQyxNQUFEO0FBQVEsUUFBQSxVQUFVLEVBQUUsQ0FBcEI7QUFBdUIsUUFBQSxhQUFhLEVBQUU7QUFBdEMsU0FDRSwyQkFBQyxTQUFELFFBQ0UsMkJBQUMsTUFBRDtBQUFRLFFBQUEsV0FBVyxFQUFFO0FBQXJCLFNBQ0UsMkJBQUMsZ0JBQUQsUUFDRSwyQkFBQyxLQUFELFFBQVFPLEtBQVIsQ0FERixFQUVFLDJCQUFDLG9CQUFEO0FBQ0UsUUFBQSxLQUFLLEVBQUUsQ0FDTDtBQUNFTSxVQUFBQSxLQUFLLEVBQUUsTUFEVDtBQUVFQyxVQUFBQSxLQUFLLEVBQUUsTUFBTTtBQUNYQywrQkFBVUMsU0FBVixDQUFvQjNLLEtBQXBCO0FBQ0Q7QUFKSCxTQURLO0FBRFQsU0FTRSwyQkFBQyxLQUFEO0FBQU8sUUFBQSxJQUFJLEVBQUU7QUFBYixTQUFvQkEsS0FBcEIsQ0FURixDQUZGLENBREYsQ0FERixFQWlCRSwyQkFBQyxJQUFELE9BakJGLENBREYsQ0FERjtBQXVCRDs7QUExQitDOztBQTZCbkMsUUFBTW9GLG1CQUFOLFNBQWtDd0YsNEJBQWxDLENBSWI7QUFHQSxXQUFPQyxjQUFQLENBQXNCQyxNQUF0QixFQUFzQztBQUNwQyxhQUFPQSxNQUFNLENBQUN4RyxFQUFQLEtBQWMsS0FBZCxJQUF1QndHLE1BQU0sQ0FBQ3hHLEVBQVAsS0FBYyxTQUE1QztBQUNEOztBQXVIRHlHLElBQUFBLFdBQVcsQ0FBQ3BCLEtBQUQsRUFBK0I7QUFFeEMsWUFBTUEsS0FBTjs7QUFGd0MsMENBSjVCNUMsU0FBRCxJQUF1QjtBQUNsQyxhQUFLNEMsS0FBTCxDQUFXcUIsWUFBWCxDQUF3QixZQUF4QixFQUFzQ2pFLFNBQXRDO0FBQ0QsT0FFeUM7O0FBR3hDLFVBQUl0QyxLQUFhLEdBQUcsSUFBcEI7O0FBQ0EsVUFDRSxLQUFLa0YsS0FBTCxDQUFXeEYsY0FBWCxDQUEwQm9GLE9BQTFCLElBQ0EsS0FBS0ksS0FBTCxDQUFXeEYsY0FBWCxDQUEwQm9GLE9BQTFCLENBQWtDL0ksTUFBbEMsR0FBMkMsQ0FGN0MsRUFHRTtBQUNBaUUsUUFBQUEsS0FBSyxHQUFHLEtBQUtrRixLQUFMLENBQVd4RixjQUFYLENBQTBCb0YsT0FBMUIsQ0FDTixLQUFLSSxLQUFMLENBQVd4RixjQUFYLENBQTBCb0YsT0FBMUIsQ0FBa0MvSSxNQUFsQyxHQUEyQyxDQURyQyxDQUFSO0FBR0Q7O0FBRUQsVUFBSXlLLGVBQWUsR0FBRyxJQUF0Qjs7QUFDQSxVQUFJLEtBQUt0QixLQUFMLENBQVd1QixlQUFmLEVBQWdDO0FBQzlCLGNBQU05SixFQUFFLEdBQUcsS0FBS3VJLEtBQUwsQ0FBV3VCLGVBQXRCO0FBQ0EsY0FBTXJCLEtBQUssR0FBRyxLQUFLRixLQUFMLENBQVd4RixjQUFYLENBQTBCb0YsT0FBMUIsQ0FBa0M0QixTQUFsQyxDQUE0Q0MsSUFBSSxJQUFJO0FBQ2hFLGlCQUFPQSxJQUFJLENBQUNDLGNBQUwsS0FBd0JqSyxFQUEvQjtBQUNELFNBRmEsQ0FBZDs7QUFHQSxZQUFJeUksS0FBSyxJQUFJLENBQWIsRUFBZ0I7QUFDZG9CLFVBQUFBLGVBQWUsR0FBRyxLQUFLdEIsS0FBTCxDQUFXeEYsY0FBWCxDQUEwQm9GLE9BQTFCLENBQWtDTSxLQUFsQyxDQUFsQjtBQUNEO0FBQ0Y7O0FBRUQsV0FBS3lCLEtBQUwsR0FBYTtBQUNYN0csUUFBQUEsS0FBSyxFQUFFd0csZUFBZSxJQUFJeEc7QUFEZixPQUFiO0FBR0Q7O0FBRUQ2RSxJQUFBQSxNQUFNLEdBQUc7QUFDUCxVQUFJaUMsa0JBQWtCLEdBQUcsS0FBS0QsS0FBTCxDQUFXN0csS0FBcEM7O0FBRUEsVUFBSSxDQUFDOEcsa0JBQUQsSUFBdUIsS0FBSzVCLEtBQUwsQ0FBV3hGLGNBQVgsQ0FBMEJvRixPQUExQixDQUFrQy9JLE1BQWxDLEdBQTJDLENBQXRFLEVBQXlFO0FBQ3ZFK0ssUUFBQUEsa0JBQWtCLEdBQUcsS0FBSzVCLEtBQUwsQ0FBV3hGLGNBQVgsQ0FBMEJvRixPQUExQixDQUNuQixLQUFLSSxLQUFMLENBQVd4RixjQUFYLENBQTBCb0YsT0FBMUIsQ0FBa0MvSSxNQUFsQyxHQUEyQyxDQUR4QixDQUFyQjtBQUdEOztBQUNELFlBQU1pRSxLQUFLLEdBQUc4RyxrQkFBZDs7QUFDQSxVQUFJOUcsS0FBSixFQUFXO0FBQ1QsY0FBTTtBQUFDOEUsVUFBQUE7QUFBRCxZQUFZLEtBQUtJLEtBQUwsQ0FBV3hGLGNBQTdCO0FBQ0EsY0FBTXFILFFBQVEsR0FBR2pDLE9BQU8sQ0FBQ2tDLE1BQVIsQ0FDZixDQUFDQyxHQUFELEVBQStCQyxjQUEvQixLQUF5RDtBQUN2RCxnQkFBTTtBQUFDTixZQUFBQSxjQUFEO0FBQWlCOUUsWUFBQUE7QUFBakIsY0FBeUJvRixjQUEvQjtBQUNBLGdCQUFNM0UsSUFBSSxHQUFHLGNBQWNULElBQUksQ0FBQ3FGLGNBQUwsRUFBM0I7QUFDQUYsVUFBQUEsR0FBRyxDQUFDTCxjQUFELENBQUgsR0FBc0JyRSxJQUF0QjtBQUNBLGlCQUFPMEUsR0FBUDtBQUNELFNBTmMsRUFPZixFQVBlLENBQWpCO0FBVUEsY0FBTWpDLFVBQVUsR0FBR0YsT0FBTyxDQUFDc0MsR0FBUixDQUNqQkYsY0FBYyxJQUFJQSxjQUFjLENBQUNOLGNBRGhCLENBQW5CO0FBR0EsY0FBTTdCLGVBQWUsR0FBRy9FLEtBQUssQ0FBQzRHLGNBQTlCOztBQUNBLGNBQU0zQixhQUFhLEdBQUd0SSxFQUFFLElBQUk7QUFDMUIsZ0JBQU0wSyxnQkFBZ0IsR0FBR3ZDLE9BQU8sQ0FBQ3dDLElBQVIsQ0FBYUMsT0FBTyxJQUFJO0FBQy9DLG1CQUFPQSxPQUFPLENBQUNYLGNBQVIsS0FBMkJqSyxFQUFsQztBQUNELFdBRndCLENBQXpCO0FBR0EsZUFBSzZLLFFBQUwsQ0FBYztBQUFDeEgsWUFBQUEsS0FBSyxFQUFFcUg7QUFBUixXQUFkO0FBQ0E3QyxVQUFBQSxPQUFPLENBQUNpRCxHQUFSLENBQVksc0JBQVosRUFBb0M5SyxFQUFwQztBQUNELFNBTkQ7O0FBT0EsY0FBTStLLGVBQWUsR0FBRzFILEtBQUssQ0FBQ3NDLFNBQTlCO0FBRUEsY0FBTXFGLFFBQVEsR0FBRzNILEtBQUssQ0FBQ3NDLFNBQU4sQ0FBZ0JXLEtBQWhCLENBQXNCLElBQXRCLEVBQTRCbUUsR0FBNUIsQ0FBZ0NRLEdBQUcsSUFBSTtBQUN0RCxpQkFBTztBQUFDL0ssWUFBQUEsT0FBTyxFQUFFK0s7QUFBVixXQUFQO0FBQ0QsU0FGZ0IsQ0FBakI7QUFHQSxjQUFNL0IsYUFBaUMsR0FBRztBQUN4Q2YsVUFBQUEsT0FBTyxFQUFFaUMsUUFEK0I7QUFFeEMvQixVQUFBQSxVQUZ3QztBQUd4Q0QsVUFBQUEsZUFId0M7QUFJeENFLFVBQUFBO0FBSndDLFNBQTFDO0FBTUEsZUFDRSwyQkFBQyxtQkFBRCxRQUNHLEtBQUtvQixNQUFMLENBQVl4RyxFQUFaLElBQWtCLFNBQWxCLEdBQ0MsMkJBQUMsZ0JBQUQ7QUFDRSxVQUFBLGFBQWEsRUFBRWdHLGFBRGpCO0FBRUUsVUFBQSxnQkFBZ0IsRUFBRSxNQUFNO0FBQ3RCLGlCQUFLZ0MsVUFBTCxDQUFnQjdILEtBQUssQ0FBQ3NDLFNBQXRCO0FBQ0Q7QUFKSCxVQURELEdBUUMsMkJBQUMsZ0JBQUQ7QUFBa0IsVUFBQSxhQUFhLEVBQUV1RDtBQUFqQyxVQVRKLEVBV0UsMkJBQUMsZ0JBQUQsUUFDRSwyQkFBQyxTQUFEO0FBQVcsVUFBQSxLQUFLLEVBQUMsTUFBakI7QUFBd0IsVUFBQSxLQUFLLEVBQUU3RixLQUFLLENBQUN1QztBQUFyQyxVQURGLEVBRUUsMkJBQUMsU0FBRDtBQUFXLFVBQUEsS0FBSyxFQUFDLFFBQWpCO0FBQTBCLFVBQUEsS0FBSyxFQUFFdkMsS0FBSyxDQUFDd0M7QUFBdkMsVUFGRixFQUdFLDJCQUFDLE1BQUQ7QUFBUSxVQUFBLFdBQVcsRUFBRSxDQUFyQjtBQUF3QixVQUFBLFVBQVUsRUFBRSxDQUFwQztBQUF1QyxVQUFBLGFBQWEsRUFBRTtBQUF0RCxXQUNFLDJCQUFDLEtBQUQsdUJBREYsQ0FIRixFQU1FLDJCQUFDLG9CQUFEO0FBQ0UsVUFBQSxLQUFLLEVBQUUsQ0FDTDtBQUNFdUQsWUFBQUEsS0FBSyxFQUFFLE1BRFQ7QUFFRUMsWUFBQUEsS0FBSyxFQUFFLE1BQU07QUFDWEMsaUNBQVVDLFNBQVYsQ0FBb0J3QixlQUFwQjtBQUNEO0FBSkgsV0FESztBQURULFdBU0UsMkJBQUMsSUFBRCxPQVRGLEVBVUUsMkJBQUMsbUJBQUQ7QUFDRSxVQUFBLFFBQVEsRUFBRUMsUUFEWjtBQUVFLFVBQUEsT0FBTyxFQUFFLEtBRlg7QUFHRSxVQUFBLE1BQU0sRUFBRSxLQUhWO0FBSUUsVUFBQSxlQUFlLEVBQUVsSyxnQkFBT3FLO0FBSjFCLFVBVkYsQ0FORixDQVhGLENBREY7QUFzQ0Q7O0FBQ0QsWUFBTWpDLGFBQWEsR0FBRztBQUNwQmYsUUFBQUEsT0FBTyxFQUFFLElBRFc7QUFFcEJFLFFBQUFBLFVBQVUsRUFBRSxJQUZRO0FBR3BCRCxRQUFBQSxlQUFlLEVBQUUsSUFIRztBQUlwQkUsUUFBQUEsYUFBYSxFQUFFO0FBSkssT0FBdEI7QUFNQSxhQUNFLDJCQUFDLG9CQUFELFFBQ0UsMkJBQUMsZ0JBQUQ7QUFBa0IsUUFBQSxhQUFhLEVBQUVZO0FBQWpDLFFBREYsRUFFRSwyQkFBQyxnQkFBRCxRQUNFLDJCQUFDLE1BQUQ7QUFBUSxRQUFBLGFBQWEsRUFBRTtBQUF2QixTQUNFLDJCQUFDLEtBQUQsNEJBREYsQ0FERixDQUZGLENBREY7QUFVRDs7QUEzUEQ7Ozs7a0JBSm1CbEYsbUIsMkJBS1k7QUFBQ21FLElBQUFBLE9BQU8sRUFBRTtBQUFWLEc7O2tCQUxabkUsbUIsb0JBV2EsQzs7a0JBWGJBLG1CLDJCQWVZLENBQzdCakIsY0FENkIsRUFFN0JxSSxNQUY2QixFQUc3QkMsT0FINkIsS0FJVjtBQUNuQixRQUFJRCxNQUFNLEtBQUssY0FBWCxJQUE2QkEsTUFBTSxLQUFLLHNCQUE1QyxFQUFvRTtBQUNsRXBILE1BQUFBLG1CQUFtQixDQUFDaUcsY0FBcEI7QUFDQSxZQUFNcUIsV0FBMkIsR0FBRztBQUNsQ25ELFFBQUFBLE9BQU8sRUFBRXBGLGNBQWMsQ0FBQ29GLE9BQWYsQ0FBdUJvRCxNQUF2QixDQUE4QixDQUNyQztBQUNFdEIsVUFBQUEsY0FBYyxFQUFFakcsbUJBQW1CLENBQUNpRyxjQUFwQixDQUFtQ3VCLFFBQW5DLEVBRGxCO0FBRUU3RixVQUFBQSxTQUFTLEVBQUUwRixPQUFPLENBQUMxRixTQUZyQjtBQUdFQyxVQUFBQSxJQUFJLEVBQUV5RixPQUFPLENBQUN6RixJQUhoQjtBQUlFQyxVQUFBQSxNQUFNLEVBQUV3RixPQUFPLENBQUN4RixNQUpsQjtBQUtFVixVQUFBQSxJQUFJLEVBQUVrRyxPQUFPLENBQUNsRyxJQUFSLElBQWdCLElBQUlPLElBQUo7QUFMeEIsU0FEcUMsQ0FBOUI7QUFEeUIsT0FBcEM7QUFXQSxhQUFPNEYsV0FBUDtBQUNEOztBQUNELFdBQU92SSxjQUFQO0FBQ0QsRzs7a0JBcENrQmlCLG1CLDZCQXNDZTJCLFNBQUQsSUFBK0I7QUFDOUQsUUFBSWYsS0FBSyxHQUFHLG1DQUFaO0FBQ0EsVUFBTTZHLEtBQUssR0FBRzdHLEtBQUssQ0FBQ0UsSUFBTixDQUFXYSxTQUFYLENBQWQ7QUFDQSxXQUFPOEYsS0FBSyxHQUFHOUYsU0FBUyxDQUFDK0YsU0FBVixDQUFvQixDQUFwQixFQUF1QkQsS0FBSyxDQUFDaEQsS0FBN0IsQ0FBSCxHQUF5QzlDLFNBQXJEO0FBQ0QsRzs7a0JBMUNrQjNCLG1CLDRCQStDakJqQixjQUQ4QixJQUVOO0FBQ3hCLFdBQU9BLGNBQWMsQ0FBQ29GLE9BQWYsQ0FBdUJzQyxHQUF2QixDQUE0QnBILEtBQUQsSUFBa0I7QUFDbEQsWUFBTXJELEVBQUUsR0FBR3FELEtBQUssQ0FBQzRHLGNBQWpCO0FBQ0EsWUFBTW5CLEtBQUssR0FBSSxVQUFTdEMsUUFBUSxDQUFDbkQsS0FBSyxDQUFDdUMsSUFBUCxFQUFhLEVBQWIsQ0FBaUIsWUFBV1ksUUFBUSxDQUNsRW5ELEtBQUssQ0FBQ3dDLE1BRDRELEVBRWxFLEVBRmtFLENBR2xFLEVBSEY7QUFJQSxZQUFNRixTQUFTLEdBQUczQixtQkFBbUIsQ0FBQzJILHVCQUFwQixDQUNoQnRJLEtBQUssQ0FBQ3NDLFNBRFUsQ0FBbEI7QUFHQSxZQUFNaUcsR0FBRyxHQUFJLGNBQWFwRixRQUFRLENBQUNiLFNBQUQsRUFBWSxHQUFaLENBQWlCLEVBQW5EO0FBQ0EsYUFBTztBQUNMM0YsUUFBQUEsRUFESztBQUVMRSxRQUFBQSxPQUFPLEVBQUUwTCxHQUZKO0FBR0xDLFFBQUFBLFFBQVEsRUFBRSxPQUhMO0FBSUwvQyxRQUFBQSxLQUFLLEVBQUVBLEtBSkY7QUFLTGdELFFBQUFBLE1BQU0sRUFBRTlMO0FBTEgsT0FBUDtBQU9ELEtBakJNLENBQVA7QUFrQkQsRzs7a0JBbkVrQmdFLG1CLHNCQXdFTyxDQUN4QlAsS0FEd0IsRUFFeEJhLFVBRndCLEVBR3hCWixpQkFId0IsS0FPZjtBQUNULFFBQUlZLFVBQVUsQ0FBQ3BCLEVBQVgsQ0FBY3dCLFFBQWQsQ0FBdUIsS0FBdkIsQ0FBSixFQUFtQztBQUNqQ3NDLE1BQUFBLDZCQUE2QixDQUFDdkQsS0FBRCxFQUFRQyxpQkFBUixDQUE3QjtBQUNELEtBRkQsTUFFTztBQUNMLFlBQU1xSSxhQUFhLEdBQUcsSUFBSXJHLElBQUosRUFBdEI7O0FBQ0EsT0FBQyxVQUNDakMsS0FERCxFQUVDMEIsSUFGRCxFQUdDekIsaUJBSEQsRUFPQztBQUNBLFlBQUlzSSxVQUFrQixHQUFHLEVBQXpCO0FBQ0EsWUFBSUMsc0JBQXNCLEdBQUcsS0FBN0I7QUFDQSxZQUFJQyxLQUFLLEdBQUcsSUFBWjtBQUNBNUgsUUFBQUEsVUFBVSxDQUFDNkgsY0FBWCxDQUEyQkMsS0FBRCxJQUEyQjtBQUNuRCxjQUFJLG9DQUFzQkEsS0FBdEIsRUFBNkJMLGFBQTdCLENBQUosRUFBaUQ7QUFDL0MsZ0JBQUlFLHNCQUFKLEVBQTRCO0FBQzFCRCxjQUFBQSxVQUFVLElBQUksT0FBT0ksS0FBSyxDQUFDbE0sT0FBM0I7QUFDQThMLGNBQUFBLFVBQVUsR0FBR0EsVUFBVSxDQUFDakYsSUFBWCxFQUFiOztBQUNBLGtCQUFJbUYsS0FBSixFQUFXO0FBQ1RHLGdCQUFBQSxZQUFZLENBQUNILEtBQUQsQ0FBWjtBQUNEO0FBQ0YsYUFORCxNQU1PO0FBQ0xGLGNBQUFBLFVBQVUsR0FBR0ksS0FBSyxDQUFDbE0sT0FBbkI7QUFDQStMLGNBQUFBLHNCQUFzQixHQUFHLElBQXpCO0FBQ0Q7O0FBQ0RDLFlBQUFBLEtBQUssR0FBR0ksVUFBVSxDQUFDLE1BQU07QUFDdkIsa0JBQUlOLFVBQVUsQ0FBQzVNLE1BQVgsR0FBb0IsQ0FBeEIsRUFBMkI7QUFDekJvRSxnQkFBQUEsMkJBQTJCLENBQ3pCQyxLQUR5QixFQUV6QnVJLFVBRnlCLEVBR3pCdEksaUJBSHlCLEVBSXpCMEksS0FBSyxDQUFDakgsSUFKbUIsQ0FBM0I7QUFNRDs7QUFDRDhHLGNBQUFBLHNCQUFzQixHQUFHLEtBQXpCO0FBQ0FELGNBQUFBLFVBQVUsR0FBRyxFQUFiO0FBQ0QsYUFYaUIsRUFXZixFQVhlLENBQWxCO0FBWUQ7QUFDRixTQXpCRDtBQTBCRCxPQXJDRCxFQXFDR3ZJLEtBckNILEVBcUNVc0ksYUFyQ1YsRUFxQ3lCckksaUJBckN6QjtBQXNDRDtBQUNGLEc7Ozs7O0FDNWxCSCxXQUFTNkksTUFBVCxDQUFnQkMsTUFBaEIsRUFBd0IvRCxLQUF4QixFQUErQjtBQUM3QixRQUFJZ0UsS0FBSyxHQUFHRCxNQUFNLENBQUNFLFVBQVAsQ0FBa0JqRSxLQUFsQixDQUFaO0FBQ0EsUUFBSWtFLE1BQUo7O0FBQ0EsUUFBSUYsS0FBSyxJQUFJLE1BQVQsSUFBbUJBLEtBQUssSUFBSSxNQUE1QixJQUFzQ0QsTUFBTSxDQUFDcE4sTUFBUCxHQUFnQnFKLEtBQUssR0FBRyxDQUFsRSxFQUFxRTtBQUNuRWtFLE1BQUFBLE1BQU0sR0FBR0gsTUFBTSxDQUFDRSxVQUFQLENBQWtCakUsS0FBSyxHQUFHLENBQTFCLENBQVQ7O0FBQ0EsVUFBSWtFLE1BQU0sSUFBSSxNQUFWLElBQW9CQSxNQUFNLElBQUksTUFBbEMsRUFBMEM7QUFDeEMsZUFBT0gsTUFBTSxDQUFDZCxTQUFQLENBQWlCakQsS0FBakIsRUFBd0JBLEtBQUssR0FBRyxDQUFoQyxDQUFQO0FBQ0Q7QUFDRjs7QUFDRCxXQUFPK0QsTUFBTSxDQUFDL0QsS0FBRCxDQUFiO0FBQ0Q7O0FBRUQsV0FBU3BDLEtBQVQsQ0FBZW1HLE1BQWYsRUFBdUJJLEtBQXZCLEVBQThCQyxHQUE5QixFQUFtQztBQUNqQyxRQUFJQyxXQUFXLEdBQUcsRUFBbEI7QUFDQSxRQUFJQyxTQUFKO0FBQ0EsUUFBSUMsV0FBVyxHQUFHLENBQWxCO0FBQ0EsUUFBSUMsWUFBWSxHQUFHLENBQW5CO0FBQ0EsUUFBSTdOLE1BQU0sR0FBR29OLE1BQU0sQ0FBQ3BOLE1BQXBCOztBQUVBLFdBQU80TixXQUFXLEdBQUc1TixNQUFyQixFQUE2QjtBQUMzQjJOLE1BQUFBLFNBQVMsR0FBR1IsTUFBTSxDQUFDQyxNQUFELEVBQVNRLFdBQVQsQ0FBbEI7O0FBQ0EsVUFBSUMsWUFBWSxJQUFJTCxLQUFoQixJQUF5QkssWUFBWSxHQUFHSixHQUE1QyxFQUFpRDtBQUMvQ0MsUUFBQUEsV0FBVyxJQUFJQyxTQUFmO0FBQ0Q7O0FBQ0RDLE1BQUFBLFdBQVcsSUFBSUQsU0FBUyxDQUFDM04sTUFBekI7QUFDQTZOLE1BQUFBLFlBQVksSUFBSSxDQUFoQjtBQUNEOztBQUNELFdBQU9ILFdBQVA7QUFDRDs7QUFFRCxXQUFTSSxRQUFULENBQWtCdE8sS0FBbEIsRUFBeUJ1TyxRQUF6QixFQUFtQztBQUNqQyxRQUFJdk8sS0FBSyxLQUFLcUIsU0FBZCxFQUF5QjtBQUN2QixhQUFPa04sUUFBUDtBQUNELEtBRkQsTUFFTztBQUNMLGFBQU9DLE1BQU0sQ0FBQ3hPLEtBQUQsQ0FBYjtBQUNEO0FBQ0Y7O0FBRURwQixFQUFBQSxNQUFNLENBQUNGLE9BQVAsR0FBaUIsVUFBVWtQLE1BQVYsRUFBa0JJLEtBQWxCLEVBQXlCQyxHQUF6QixFQUE4QjtBQUM3QyxRQUFJUSxTQUFTLEdBQUdILFFBQVEsQ0FBQ04sS0FBRCxFQUFRLENBQVIsQ0FBeEI7QUFDQSxRQUFJVSxPQUFPLEdBQUdKLFFBQVEsQ0FBQ0wsR0FBRCxFQUFNTCxNQUFNLENBQUNwTixNQUFiLENBQXRCOztBQUNBLFFBQUlrTyxPQUFPLElBQUlELFNBQWYsRUFBMEI7QUFDeEIsYUFBTyxFQUFQO0FBQ0QsS0FGRCxNQUVPLElBQUlDLE9BQU8sR0FBR0QsU0FBZCxFQUF5QjtBQUM5QixhQUFPaEgsS0FBSyxDQUFDbUcsTUFBRCxFQUFTYSxTQUFULEVBQW9CQyxPQUFwQixDQUFaO0FBQ0QsS0FGTSxNQUVBO0FBQ0wsYUFBT2pILEtBQUssQ0FBQ21HLE1BQUQsRUFBU2MsT0FBVCxFQUFrQkQsU0FBbEIsQ0FBWjtBQUNEO0FBQ0YsR0FWRCJ9