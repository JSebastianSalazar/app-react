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
  exports.processLeaks = processLeaks;

  function getElementSimple(str, id) {
    const match = str.match(/\* (GC ROOT )?(\u21B3 )?([a-z]* )?([^A-Z]*.)?([A-Z].*)/);
    let name = 'N/A';

    if (match) {
      name = match[5];
    }

    return {
      id: id,
      name: name,
      expanded: true,
      children: [],
      attributes: [],
      data: {},
      decoration: '',
      extraInfo: {}
    };
  }

  const BEGIN_DETAILS_SECTION_INDICATOR = '* Details:';
  const END_DETAILS_SECTION_INDICATOR = '* Excluded Refs:';
  const STATIC_PREFIX = 'static ';
  const LEAK_BEGIN_INDICATOR = 'has leaked:';
  const RETAINED_SIZE_INDICATOR = '* Retaining: ';

  function generateFieldsList(lines, i) {
    let staticFields = {};
    let instanceFields = {};
    let staticValues = {};
    let instanceValues = {};
    let elementId = -1;
    let elementIdStr = String(-1);
    let packages = {};

    while (i < lines.length && !lines[i].startsWith(END_DETAILS_SECTION_INDICATOR)) {
      const line = lines[i];

      if (line.startsWith('*')) {
        if (elementId != -1) {
          staticFields[elementIdStr] = staticValues;
          instanceFields[elementIdStr] = instanceValues;
          staticValues = {};
          instanceValues = {};
        }

        elementId++;
        elementIdStr = String(elementId);
        let pkg = 'unknown';
        const match = line.match(/\* (.*)(of|Class) (.*)/);

        if (match) {
          pkg = match[3];
        }

        packages[elementIdStr] = pkg;
      } else {
        const match = line.match(/\|\s+(.*) = (.*)/);

        if (match) {
          const fieldName = match[1];
          const fieldValue = match[2];

          if (fieldName.startsWith(STATIC_PREFIX)) {
            const strippedFieldName = fieldName.substr(7);
            staticValues[strippedFieldName] = fieldValue;
          } else {
            instanceValues[fieldName] = fieldValue;
          }
        }
      }

      i++;
    }

    staticFields[elementIdStr] = staticValues;
    instanceFields[elementIdStr] = instanceValues;
    return {
      staticFields: staticFields,
      instanceFields: instanceFields,
      packages: packages
    };
  }

  function processLeak(output, leakInfo) {
    const lines = leakInfo.split('\n');
    let elements = {};
    let elementsSimple = {};
    let rootElementId = '';
    let i = 0;

    while (i < lines.length && !lines[i].endsWith(LEAK_BEGIN_INDICATOR)) {
      i++;
    }

    i++;

    if (i >= lines.length) {
      return output;
    }

    let elementId = 0;
    let elementIdStr = '';

    while (i < lines.length && lines[i].startsWith('*')) {
      const line = lines[i];
      elementIdStr = String(elementId);
      const prevIdStr = String(elementId - 1);

      if (elementId !== 0) {
        elements[prevIdStr].children.push(elementIdStr);
        elementsSimple[prevIdStr].children.push(elementIdStr);
      } else {
        rootElementId = elementIdStr;
      }

      elements[elementIdStr] = getElementSimple(line, elementIdStr);
      elementsSimple[elementIdStr] = getElementSimple(line, elementIdStr);
      i++;
      elementId++;
    }

    const leakedObjName = elements[elementIdStr].name;

    while (i < lines.length && !lines[i].startsWith(RETAINED_SIZE_INDICATOR) && !lines[i].startsWith(BEGIN_DETAILS_SECTION_INDICATOR)) {
      i++;
    }

    let retainedSize = 'unknown size';

    if (lines[i].startsWith(RETAINED_SIZE_INDICATOR)) {
      const match = lines[i].match(/\* Retaining: (.*)./);

      if (match) {
        retainedSize = match[1];
      }
    }

    while (i < lines.length && !lines[i].startsWith(BEGIN_DETAILS_SECTION_INDICATOR)) {
      i++;
    }

    i++;
    const {
      staticFields,
      instanceFields,
      packages
    } = generateFieldsList(lines, i);
    Object.keys(packages).forEach(elementId => {
      const pkg = packages[elementId];
      const simpleName = elements[elementId].name;
      const match = simpleName.match(/([^\. ]*)(.*)/);

      if (match) {
        elements[elementId].name = pkg + match[2];
      }
    });
    output.push({
      root: rootElementId,
      elements: elements,
      elementsSimple: elementsSimple,
      staticFields: staticFields,
      instanceFields: instanceFields,
      title: leakedObjName,
      retainedSize: retainedSize
    });
    return output;
  }

  function processLeaks(leakInfos) {
    const newLeaks = leakInfos.reduce(processLeak, []);
    return newLeaks;
  }
},-411303564,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _flipper = global.Flipper;

  var _processLeakString = _$$_REQUIRE(_dependencyMap[0]);

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  const Window = (0, _flipper.styled)(_flipper.FlexRow)({
    height: '100%',
    flex: 1
  });
  const ToolbarItem = (0, _flipper.styled)(_flipper.FlexRow)({
    alignItems: 'center',
    marginLeft: '8px'
  });

  class LeakCanary extends _flipper.FlipperPlugin {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "state", {
        leaks: [],
        selectedIdx: null,
        selectedEid: null,
        showFullClassPaths: false,
        leaksCount: 0
      });

      _defineProperty(this, "_clearLeaks", () => {
        this.setState({
          leaks: [],
          leaksCount: 0,
          selectedIdx: null,
          selectedEid: null
        });
        this.client.call('clear');
      });

      _defineProperty(this, "_selectElement", (leakIdx, eid) => {
        this.setState({
          selectedIdx: leakIdx,
          selectedEid: eid
        });
      });

      _defineProperty(this, "_toggleElement", (leakIdx, eid) => {
        const leaks = this.state.leaks;
        const leak = leaks[leakIdx];
        const element = leak.elements[eid];
        element.expanded = !element.expanded;
        const elementSimple = leak.elementsSimple[eid];
        elementSimple.expanded = !elementSimple.expanded;
        this.setState({
          leaks: leaks
        });
      });
    }

    init() {
      this.client.subscribe('reportLeak', results => {
        const newLeaks = (0, _processLeakString.processLeaks)(results.leaks.slice(this.state.leaksCount));
        let leaks = this.state.leaks;

        for (let i = 0; i < newLeaks.length; i++) {
          leaks.push(newLeaks[i]);
        }

        this.setState({
          leaks: leaks,
          leaksCount: results.leaks.length
        });
      });
    }

    _extractValue(value, depth) {
      if (!isNaN(value)) {
        return {
          mutable: false,
          type: 'number',
          value: value
        };
      } else if (value == 'true' || value == 'false') {
        return {
          mutable: false,
          type: 'boolean',
          value: value
        };
      } else if (value == 'null') {
        return {
          mutable: false,
          type: 'null',
          value: value
        };
      }

      return {
        mutable: false,
        type: 'enum',
        value: value
      };
    }

    renderSidebar() {
      const {
        selectedIdx,
        selectedEid,
        leaks
      } = this.state;

      if (selectedIdx == null || selectedEid == null) {
        return null;
      }

      const leak = leaks[selectedIdx];
      const staticFields = leak.staticFields[selectedEid];
      const instanceFields = leak.instanceFields[selectedEid];
      return global.React.createElement(_flipper.Sidebar, {
        position: "right",
        width: 600,
        minWidth: 300,
        maxWidth: 900
      }, global.React.createElement(_flipper.Panel, {
        heading: 'Instance',
        floating: false,
        grow: false
      }, global.React.createElement(_flipper.ManagedDataInspector, {
        data: instanceFields,
        expandRoot: true,
        extractValue: this._extractValue
      })), global.React.createElement(_flipper.Panel, {
        heading: 'Static',
        floating: false,
        grow: false
      }, global.React.createElement(_flipper.ManagedDataInspector, {
        data: staticFields,
        expandRoot: true,
        extractValue: this._extractValue
      })));
    }

    render() {
      const {
        selectedIdx,
        selectedEid,
        showFullClassPaths
      } = this.state;
      const sidebar = this.renderSidebar();
      return global.React.createElement(Window, null, global.React.createElement(_flipper.FlexColumn, {
        grow: true
      }, global.React.createElement(_flipper.FlexColumn, {
        grow: true,
        scrollable: true
      }, this.state.leaks.map((leak, idx) => {
        const elements = showFullClassPaths ? leak.elements : leak.elementsSimple;
        const selected = selectedIdx == idx ? selectedEid : null;
        return global.React.createElement(_flipper.Panel, {
          collapsable: false,
          padded: false,
          heading: leak.title,
          floating: false,
          accessory: leak.retainedSize
        }, global.React.createElement(_flipper.ElementsInspector, {
          onElementSelected: eid => {
            this._selectElement(idx, eid);
          },
          onElementHovered: () => {},
          onElementExpanded: (eid, deep) => {
            this._toggleElement(idx, eid);
          },
          onValueChanged: () => {},
          selected: selected,
          searchResults: null,
          root: leak.root,
          elements: elements
        }));
      })), global.React.createElement(_flipper.Toolbar, null, global.React.createElement(ToolbarItem, null, global.React.createElement(_flipper.Button, {
        onClick: this._clearLeaks
      }, "Clear")), global.React.createElement(ToolbarItem, null, global.React.createElement(_flipper.Checkbox, {
        checked: showFullClassPaths,
        onChange: checked => {
          this.setState({
            showFullClassPaths: checked
          });
        }
      }), "Show full class path"))), sidebar);
    }

  }

  exports.default = LeakCanary;
},34461541,[-411303564]);
module.exports = global.__r(34461541).default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9fcHJlbHVkZV9fIiwiL2RhdGEvc2FuZGNhc3RsZS9ib3hlcy90cnVuay1oZy1mYmNvZGUtZmJzb3VyY2UveHBsYXQvZmxpcHBlci1wdWJsaWMvc3RhdGljL25vZGVfbW9kdWxlcy9tZXRyby9zcmMvbGliL3BvbHlmaWxscy9yZXF1aXJlLmpzIiwiL2RhdGEvc2FuZGNhc3RsZS9ib3hlcy90cnVuay1oZy1mYmNvZGUtZmJzb3VyY2UveHBsYXQvZmxpcHBlci1wdWJsaWMvc3JjL3BsdWdpbnMvbGVha19jYW5hcnkvaW5kZXguanMiLCIvZGF0YS9zYW5kY2FzdGxlL2JveGVzL3RydW5rLWhnLWZiY29kZS1mYnNvdXJjZS94cGxhdC9mbGlwcGVyLXB1YmxpYy9zcmMvcGx1Z2lucy9sZWFrX2NhbmFyeS9wcm9jZXNzTGVha1N0cmluZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19ERVZfXz1mYWxzZSxfX0JVTkRMRV9TVEFSVF9USU1FX189dGhpcy5uYXRpdmVQZXJmb3JtYW5jZU5vdz9uYXRpdmVQZXJmb3JtYW5jZU5vdygpOkRhdGUubm93KCkscHJvY2Vzcz10aGlzLnByb2Nlc3N8fHt9O3Byb2Nlc3MuZW52PXByb2Nlc3MuZW52fHx7fTtwcm9jZXNzLmVudi5OT0RFX0VOVj1cInByb2R1Y3Rpb25cIjsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBwb2x5ZmlsbFxuICpcbiAqIEBmb3JtYXRcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLyogZXNsaW50LWRpc2FibGUgbm8tYml0d2lzZSAqL1xuXG5nbG9iYWwuX19yID0gbWV0cm9SZXF1aXJlO1xuZ2xvYmFsLl9fZCA9IGRlZmluZTtcbmdsb2JhbC5fX2MgPSBjbGVhcjtcblxudmFyIG1vZHVsZXMgPSBjbGVhcigpO1xuXG4vLyBEb24ndCB1c2UgYSBTeW1ib2wgaGVyZSwgaXQgd291bGQgcHVsbCBpbiBhbiBleHRyYSBwb2x5ZmlsbCB3aXRoIGFsbCBzb3J0cyBvZlxuLy8gYWRkaXRpb25hbCBzdHVmZiAoZS5nLiBBcnJheS5mcm9tKS5cbnZhciBFTVBUWSA9IHt9O1xudmFyIF9yZWYgPSB7fSxcbiAgaGFzT3duUHJvcGVydHkgPSBfcmVmLmhhc093blByb3BlcnR5O1xuXG5mdW5jdGlvbiBjbGVhcigpIHtcbiAgbW9kdWxlcyA9XG4gICAgdHlwZW9mIF9fTlVNX01PRFVMRVNfXyA9PT0gXCJudW1iZXJcIlxuICAgICAgPyBBcnJheShfX05VTV9NT0RVTEVTX18gfCAwKVxuICAgICAgOiBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIC8vIFdlIHJldHVybiBtb2R1bGVzIGhlcmUgc28gdGhhdCB3ZSBjYW4gYXNzaWduIGFuIGluaXRpYWwgdmFsdWUgdG8gbW9kdWxlc1xuICAvLyB3aGVuIGRlZmluaW5nIGl0LiBPdGhlcndpc2UsIHdlIHdvdWxkIGhhdmUgdG8gZG8gXCJsZXQgbW9kdWxlcyA9IG51bGxcIixcbiAgLy8gd2hpY2ggd2lsbCBmb3JjZSB1cyB0byBhZGQgXCJudWxsdGhyb3dzXCIgZXZlcnl3aGVyZS5cbiAgcmV0dXJuIG1vZHVsZXM7XG59XG5cbmlmIChfX0RFVl9fKSB7XG4gIHZhciB2ZXJib3NlTmFtZXNUb01vZHVsZUlkcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHZhciBpbml0aWFsaXppbmdNb2R1bGVJZHMgPSBbXTtcbn1cblxuZnVuY3Rpb24gZGVmaW5lKGZhY3RvcnksIG1vZHVsZUlkLCBkZXBlbmRlbmN5TWFwKSB7XG4gIGlmIChtb2R1bGVzW21vZHVsZUlkXSAhPSBudWxsKSB7XG4gICAgaWYgKF9fREVWX18pIHtcbiAgICAgIC8vIChXZSB0YWtlIGBpbnZlcnNlRGVwZW5kZW5jaWVzYCBmcm9tIGBhcmd1bWVudHNgIHRvIGF2b2lkIGFuIHVudXNlZFxuICAgICAgLy8gbmFtZWQgcGFyYW1ldGVyIGluIGBkZWZpbmVgIGluIHByb2R1Y3Rpb24uXG4gICAgICB2YXIgaW52ZXJzZURlcGVuZGVuY2llcyA9IGFyZ3VtZW50c1s0XTtcblxuICAgICAgLy8gSWYgdGhlIG1vZHVsZSBoYXMgYWxyZWFkeSBiZWVuIGRlZmluZWQgYW5kIHRoZSBkZWZpbmUgbWV0aG9kIGhhcyBiZWVuXG4gICAgICAvLyBjYWxsZWQgd2l0aCBpbnZlcnNlRGVwZW5kZW5jaWVzLCB3ZSBjYW4gaG90IHJlbG9hZCBpdC5cbiAgICAgIGlmIChpbnZlcnNlRGVwZW5kZW5jaWVzKSB7XG4gICAgICAgIGdsb2JhbC5fX2FjY2VwdChtb2R1bGVJZCwgZmFjdG9yeSwgZGVwZW5kZW5jeU1hcCwgaW52ZXJzZURlcGVuZGVuY2llcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgXCJUcnlpbmcgdG8gZGVmaW5lIHR3aWNlIG1vZHVsZSBJRCBcIiArIG1vZHVsZUlkICsgXCIgaW4gdGhlIHNhbWUgYnVuZGxlXCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwcmV2ZW50IHJlcGVhdGVkIGNhbGxzIHRvIGBnbG9iYWwubmF0aXZlUmVxdWlyZWAgdG8gb3ZlcndyaXRlIG1vZHVsZXNcbiAgICAvLyB0aGF0IGFyZSBhbHJlYWR5IGxvYWRlZFxuICAgIHJldHVybjtcbiAgfVxuICBtb2R1bGVzW21vZHVsZUlkXSA9IHtcbiAgICBkZXBlbmRlbmN5TWFwOiBkZXBlbmRlbmN5TWFwLFxuICAgIGZhY3Rvcnk6IGZhY3RvcnksXG4gICAgaGFzRXJyb3I6IGZhbHNlLFxuICAgIGltcG9ydGVkQWxsOiBFTVBUWSxcbiAgICBpbXBvcnRlZERlZmF1bHQ6IEVNUFRZLFxuICAgIGlzSW5pdGlhbGl6ZWQ6IGZhbHNlLFxuICAgIHB1YmxpY01vZHVsZTogeyBleHBvcnRzOiB7fSB9XG4gIH07XG4gIGlmIChfX0RFVl9fKSB7XG4gICAgLy8gSE1SXG4gICAgbW9kdWxlc1ttb2R1bGVJZF0uaG90ID0gY3JlYXRlSG90UmVsb2FkaW5nT2JqZWN0KCk7XG5cbiAgICAvLyBERUJVR0dBQkxFIE1PRFVMRVMgTkFNRVNcbiAgICAvLyB3ZSB0YWtlIGB2ZXJib3NlTmFtZWAgZnJvbSBgYXJndW1lbnRzYCB0byBhdm9pZCBhbiB1bnVzZWQgbmFtZWQgcGFyYW1ldGVyXG4gICAgLy8gaW4gYGRlZmluZWAgaW4gcHJvZHVjdGlvbi5cbiAgICB2YXIgX3ZlcmJvc2VOYW1lID0gYXJndW1lbnRzWzNdO1xuICAgIGlmIChfdmVyYm9zZU5hbWUpIHtcbiAgICAgIG1vZHVsZXNbbW9kdWxlSWRdLnZlcmJvc2VOYW1lID0gX3ZlcmJvc2VOYW1lO1xuICAgICAgdmVyYm9zZU5hbWVzVG9Nb2R1bGVJZHNbX3ZlcmJvc2VOYW1lXSA9IG1vZHVsZUlkO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBtZXRyb1JlcXVpcmUobW9kdWxlSWQpIHtcbiAgaWYgKF9fREVWX18gJiYgdHlwZW9mIG1vZHVsZUlkID09PSBcInN0cmluZ1wiKSB7XG4gICAgdmFyIF92ZXJib3NlTmFtZTIgPSBtb2R1bGVJZDtcbiAgICBtb2R1bGVJZCA9IHZlcmJvc2VOYW1lc1RvTW9kdWxlSWRzW192ZXJib3NlTmFtZTJdO1xuICAgIGlmIChtb2R1bGVJZCA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gbmFtZWQgbW9kdWxlOiBcIicgKyBfdmVyYm9zZU5hbWUyICsgJ1wiJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ1JlcXVpcmluZyBtb2R1bGUgXCInICtcbiAgICAgICAgICBfdmVyYm9zZU5hbWUyICtcbiAgICAgICAgICAnXCIgYnkgbmFtZSBpcyBvbmx5IHN1cHBvcnRlZCBmb3IgJyArXG4gICAgICAgICAgXCJkZWJ1Z2dpbmcgcHVycG9zZXMgYW5kIHdpbGwgQlJFQUsgSU4gUFJPRFVDVElPTiFcIlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvLyRGbG93Rml4TWU6IGF0IHRoaXMgcG9pbnQgd2Uga25vdyB0aGF0IG1vZHVsZUlkIGlzIGEgbnVtYmVyXG4gIHZhciBtb2R1bGVJZFJlYWxseUlzTnVtYmVyID0gbW9kdWxlSWQ7XG5cbiAgaWYgKF9fREVWX18pIHtcbiAgICB2YXIgaW5pdGlhbGl6aW5nSW5kZXggPSBpbml0aWFsaXppbmdNb2R1bGVJZHMuaW5kZXhPZihcbiAgICAgIG1vZHVsZUlkUmVhbGx5SXNOdW1iZXJcbiAgICApO1xuICAgIGlmIChpbml0aWFsaXppbmdJbmRleCAhPT0gLTEpIHtcbiAgICAgIHZhciBjeWNsZSA9IGluaXRpYWxpemluZ01vZHVsZUlkc1xuICAgICAgICAuc2xpY2UoaW5pdGlhbGl6aW5nSW5kZXgpXG4gICAgICAgIC5tYXAoZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICByZXR1cm4gbW9kdWxlc1tpZF0udmVyYm9zZU5hbWU7XG4gICAgICAgIH0pO1xuICAgICAgLy8gV2Ugd2FudCB0byBzaG93IEEgLT4gQiAtPiBBOlxuICAgICAgY3ljbGUucHVzaChjeWNsZVswXSk7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIFwiUmVxdWlyZSBjeWNsZTogXCIgK1xuICAgICAgICAgIGN5Y2xlLmpvaW4oXCIgLT4gXCIpICtcbiAgICAgICAgICBcIlxcblxcblwiICtcbiAgICAgICAgICBcIlJlcXVpcmUgY3ljbGVzIGFyZSBhbGxvd2VkLCBidXQgY2FuIHJlc3VsdCBpbiB1bmluaXRpYWxpemVkIHZhbHVlcy4gXCIgK1xuICAgICAgICAgIFwiQ29uc2lkZXIgcmVmYWN0b3JpbmcgdG8gcmVtb3ZlIHRoZSBuZWVkIGZvciBhIGN5Y2xlLlwiXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHZhciBtb2R1bGUgPSBtb2R1bGVzW21vZHVsZUlkUmVhbGx5SXNOdW1iZXJdO1xuXG4gIHJldHVybiBtb2R1bGUgJiYgbW9kdWxlLmlzSW5pdGlhbGl6ZWRcbiAgICA/IG1vZHVsZS5wdWJsaWNNb2R1bGUuZXhwb3J0c1xuICAgIDogZ3VhcmRlZExvYWRNb2R1bGUobW9kdWxlSWRSZWFsbHlJc051bWJlciwgbW9kdWxlKTtcbn1cblxuZnVuY3Rpb24gbWV0cm9JbXBvcnREZWZhdWx0KG1vZHVsZUlkKSB7XG4gIGlmIChfX0RFVl9fICYmIHR5cGVvZiBtb2R1bGVJZCA9PT0gXCJzdHJpbmdcIikge1xuICAgIHZhciBfdmVyYm9zZU5hbWUzID0gbW9kdWxlSWQ7XG4gICAgbW9kdWxlSWQgPSB2ZXJib3NlTmFtZXNUb01vZHVsZUlkc1tfdmVyYm9zZU5hbWUzXTtcbiAgfVxuXG4gIC8vJEZsb3dGaXhNZTogYXQgdGhpcyBwb2ludCB3ZSBrbm93IHRoYXQgbW9kdWxlSWQgaXMgYSBudW1iZXJcbiAgdmFyIG1vZHVsZUlkUmVhbGx5SXNOdW1iZXIgPSBtb2R1bGVJZDtcblxuICBpZiAoXG4gICAgbW9kdWxlc1ttb2R1bGVJZFJlYWxseUlzTnVtYmVyXSAmJlxuICAgIG1vZHVsZXNbbW9kdWxlSWRSZWFsbHlJc051bWJlcl0uaW1wb3J0ZWREZWZhdWx0ICE9PSBFTVBUWVxuICApIHtcbiAgICByZXR1cm4gbW9kdWxlc1ttb2R1bGVJZFJlYWxseUlzTnVtYmVyXS5pbXBvcnRlZERlZmF1bHQ7XG4gIH1cblxuICB2YXIgZXhwb3J0cyA9IG1ldHJvUmVxdWlyZShtb2R1bGVJZFJlYWxseUlzTnVtYmVyKTtcbiAgdmFyIGltcG9ydGVkRGVmYXVsdCA9XG4gICAgZXhwb3J0cyAmJiBleHBvcnRzLl9fZXNNb2R1bGUgPyBleHBvcnRzLmRlZmF1bHQgOiBleHBvcnRzO1xuXG4gIHJldHVybiAobW9kdWxlc1ttb2R1bGVJZFJlYWxseUlzTnVtYmVyXS5pbXBvcnRlZERlZmF1bHQgPSBpbXBvcnRlZERlZmF1bHQpO1xufVxuXG5mdW5jdGlvbiBtZXRyb0ltcG9ydEFsbChtb2R1bGVJZCkge1xuICBpZiAoX19ERVZfXyAmJiB0eXBlb2YgbW9kdWxlSWQgPT09IFwic3RyaW5nXCIpIHtcbiAgICB2YXIgX3ZlcmJvc2VOYW1lNCA9IG1vZHVsZUlkO1xuICAgIG1vZHVsZUlkID0gdmVyYm9zZU5hbWVzVG9Nb2R1bGVJZHNbX3ZlcmJvc2VOYW1lNF07XG4gIH1cblxuICAvLyRGbG93Rml4TWU6IGF0IHRoaXMgcG9pbnQgd2Uga25vdyB0aGF0IG1vZHVsZUlkIGlzIGEgbnVtYmVyXG4gIHZhciBtb2R1bGVJZFJlYWxseUlzTnVtYmVyID0gbW9kdWxlSWQ7XG5cbiAgaWYgKFxuICAgIG1vZHVsZXNbbW9kdWxlSWRSZWFsbHlJc051bWJlcl0gJiZcbiAgICBtb2R1bGVzW21vZHVsZUlkUmVhbGx5SXNOdW1iZXJdLmltcG9ydGVkQWxsICE9PSBFTVBUWVxuICApIHtcbiAgICByZXR1cm4gbW9kdWxlc1ttb2R1bGVJZFJlYWxseUlzTnVtYmVyXS5pbXBvcnRlZEFsbDtcbiAgfVxuXG4gIHZhciBleHBvcnRzID0gbWV0cm9SZXF1aXJlKG1vZHVsZUlkUmVhbGx5SXNOdW1iZXIpO1xuICB2YXIgaW1wb3J0ZWRBbGwgPSB2b2lkIDA7XG5cbiAgaWYgKGV4cG9ydHMgJiYgZXhwb3J0cy5fX2VzTW9kdWxlKSB7XG4gICAgaW1wb3J0ZWRBbGwgPSBleHBvcnRzO1xuICB9IGVsc2Uge1xuICAgIGltcG9ydGVkQWxsID0ge307XG5cbiAgICAvLyBSZWZyYWluIGZyb20gdXNpbmcgT2JqZWN0LmFzc2lnbiwgaXQgaGFzIHRvIHdvcmsgaW4gRVMzIGVudmlyb25tZW50cy5cbiAgICBpZiAoZXhwb3J0cykge1xuICAgICAgZm9yICh2YXIgX2tleSBpbiBleHBvcnRzKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIF9rZXkpKSB7XG4gICAgICAgICAgaW1wb3J0ZWRBbGxbX2tleV0gPSBleHBvcnRzW19rZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaW1wb3J0ZWRBbGwuZGVmYXVsdCA9IGV4cG9ydHM7XG4gIH1cblxuICByZXR1cm4gKG1vZHVsZXNbbW9kdWxlSWRSZWFsbHlJc051bWJlcl0uaW1wb3J0ZWRBbGwgPSBpbXBvcnRlZEFsbCk7XG59XG5cbnZhciBpbkd1YXJkID0gZmFsc2U7XG5mdW5jdGlvbiBndWFyZGVkTG9hZE1vZHVsZShtb2R1bGVJZCwgbW9kdWxlKSB7XG4gIGlmICghaW5HdWFyZCAmJiBnbG9iYWwuRXJyb3JVdGlscykge1xuICAgIGluR3VhcmQgPSB0cnVlO1xuICAgIHZhciByZXR1cm5WYWx1ZSA9IHZvaWQgMDtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuVmFsdWUgPSBsb2FkTW9kdWxlSW1wbGVtZW50YXRpb24obW9kdWxlSWQsIG1vZHVsZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZ2xvYmFsLkVycm9yVXRpbHMucmVwb3J0RmF0YWxFcnJvcihlKTtcbiAgICB9XG4gICAgaW5HdWFyZCA9IGZhbHNlO1xuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbG9hZE1vZHVsZUltcGxlbWVudGF0aW9uKG1vZHVsZUlkLCBtb2R1bGUpO1xuICB9XG59XG5cbnZhciBJRF9NQVNLX1NISUZUID0gMTY7XG52YXIgTE9DQUxfSURfTUFTSyA9IH4wID4+PiBJRF9NQVNLX1NISUZUO1xuXG5mdW5jdGlvbiB1bnBhY2tNb2R1bGVJZChtb2R1bGVJZCkge1xuICB2YXIgc2VnbWVudElkID0gbW9kdWxlSWQgPj4+IElEX01BU0tfU0hJRlQ7XG4gIHZhciBsb2NhbElkID0gbW9kdWxlSWQgJiBMT0NBTF9JRF9NQVNLO1xuICByZXR1cm4geyBzZWdtZW50SWQ6IHNlZ21lbnRJZCwgbG9jYWxJZDogbG9jYWxJZCB9O1xufVxubWV0cm9SZXF1aXJlLnVucGFja01vZHVsZUlkID0gdW5wYWNrTW9kdWxlSWQ7XG5cbmZ1bmN0aW9uIHBhY2tNb2R1bGVJZCh2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlLnNlZ21lbnRJZCA8PCBJRF9NQVNLX1NISUZUKSArIHZhbHVlLmxvY2FsSWQ7XG59XG5tZXRyb1JlcXVpcmUucGFja01vZHVsZUlkID0gcGFja01vZHVsZUlkO1xuXG52YXIgaG9va3MgPSBbXTtcbmZ1bmN0aW9uIHJlZ2lzdGVySG9vayhjYikge1xuICB2YXIgaG9vayA9IHsgY2I6IGNiIH07XG4gIGhvb2tzLnB1c2goaG9vayk7XG4gIHJldHVybiB7XG4gICAgcmVsZWFzZTogZnVuY3Rpb24gcmVsZWFzZSgpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaG9va3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKGhvb2tzW2ldID09PSBob29rKSB7XG4gICAgICAgICAgaG9va3Muc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxubWV0cm9SZXF1aXJlLnJlZ2lzdGVySG9vayA9IHJlZ2lzdGVySG9vaztcblxuZnVuY3Rpb24gbG9hZE1vZHVsZUltcGxlbWVudGF0aW9uKG1vZHVsZUlkLCBtb2R1bGUpIHtcbiAgaWYgKCFtb2R1bGUgJiYgZ2xvYmFsLl9fZGVmaW5lTW9kdWxlKSB7XG4gICAgZ2xvYmFsLl9fZGVmaW5lTW9kdWxlKG1vZHVsZUlkKTtcbiAgICBtb2R1bGUgPSBtb2R1bGVzW21vZHVsZUlkXTtcbiAgfVxuXG4gIHZhciBuYXRpdmVSZXF1aXJlID0gZ2xvYmFsLm5hdGl2ZVJlcXVpcmU7XG4gIGlmICghbW9kdWxlICYmIG5hdGl2ZVJlcXVpcmUpIHtcbiAgICB2YXIgX3VucGFja01vZHVsZUlkID0gdW5wYWNrTW9kdWxlSWQobW9kdWxlSWQpLFxuICAgICAgX3NlZ21lbnRJZCA9IF91bnBhY2tNb2R1bGVJZC5zZWdtZW50SWQsXG4gICAgICBfbG9jYWxJZCA9IF91bnBhY2tNb2R1bGVJZC5sb2NhbElkO1xuXG4gICAgbmF0aXZlUmVxdWlyZShfbG9jYWxJZCwgX3NlZ21lbnRJZCk7XG4gICAgbW9kdWxlID0gbW9kdWxlc1ttb2R1bGVJZF07XG4gIH1cblxuICBpZiAoIW1vZHVsZSkge1xuICAgIHRocm93IHVua25vd25Nb2R1bGVFcnJvcihtb2R1bGVJZCk7XG4gIH1cblxuICBpZiAobW9kdWxlLmhhc0Vycm9yKSB7XG4gICAgdGhyb3cgbW9kdWxlVGhyZXdFcnJvcihtb2R1bGVJZCwgbW9kdWxlLmVycm9yKTtcbiAgfVxuXG4gIC8vIGBtZXRyb1JlcXVpcmVgIGNhbGxzIGludG8gdGhlIHJlcXVpcmUgcG9seWZpbGwgaXRzZWxmIGFyZSBub3QgYW5hbHl6ZWQgYW5kXG4gIC8vIHJlcGxhY2VkIHNvIHRoYXQgdGhleSB1c2UgbnVtZXJpYyBtb2R1bGUgSURzLlxuICAvLyBUaGUgc3lzdHJhY2UgbW9kdWxlIHdpbGwgZXhwb3NlIGl0c2VsZiBvbiB0aGUgbWV0cm9SZXF1aXJlIGZ1bmN0aW9uIHNvIHRoYXRcbiAgLy8gaXQgY2FuIGJlIHVzZWQgaGVyZS5cbiAgLy8gVE9ETyhkYXZpZGF1cmVsaW8pIFNjYW4gcG9seWZpbGxzIGZvciBkZXBlbmRlbmNpZXMsIHRvbyAodDk3NTk2ODYpXG4gIGlmIChfX0RFVl9fKSB7XG4gICAgdmFyIFN5c3RyYWNlID0gbWV0cm9SZXF1aXJlLlN5c3RyYWNlO1xuICB9XG5cbiAgLy8gV2UgbXVzdCBvcHRpbWlzdGljYWxseSBtYXJrIG1vZHVsZSBhcyBpbml0aWFsaXplZCBiZWZvcmUgcnVubmluZyB0aGVcbiAgLy8gZmFjdG9yeSB0byBrZWVwIGFueSByZXF1aXJlIGN5Y2xlcyBpbnNpZGUgdGhlIGZhY3RvcnkgZnJvbSBjYXVzaW5nIGFuXG4gIC8vIGluZmluaXRlIHJlcXVpcmUgbG9vcC5cbiAgbW9kdWxlLmlzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gIHZhciBfbW9kdWxlID0gbW9kdWxlLFxuICAgIGZhY3RvcnkgPSBfbW9kdWxlLmZhY3RvcnksXG4gICAgZGVwZW5kZW5jeU1hcCA9IF9tb2R1bGUuZGVwZW5kZW5jeU1hcDtcblxuICBpZiAoX19ERVZfXykge1xuICAgIGluaXRpYWxpemluZ01vZHVsZUlkcy5wdXNoKG1vZHVsZUlkKTtcbiAgfVxuICB0cnkge1xuICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICAvLyAkRmxvd0ZpeE1lOiB3ZSBrbm93IHRoYXQgX19ERVZfXyBpcyBjb25zdCBhbmQgYFN5c3RyYWNlYCBleGlzdHNcbiAgICAgIFN5c3RyYWNlLmJlZ2luRXZlbnQoXCJKU19yZXF1aXJlX1wiICsgKG1vZHVsZS52ZXJib3NlTmFtZSB8fCBtb2R1bGVJZCkpO1xuICAgIH1cblxuICAgIHZhciBfbW9kdWxlT2JqZWN0ID0gbW9kdWxlLnB1YmxpY01vZHVsZTtcblxuICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICBpZiAobW9kdWxlLmhvdCkge1xuICAgICAgICBfbW9kdWxlT2JqZWN0LmhvdCA9IG1vZHVsZS5ob3Q7XG4gICAgICB9XG4gICAgfVxuICAgIF9tb2R1bGVPYmplY3QuaWQgPSBtb2R1bGVJZDtcblxuICAgIGlmIChob29rcy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhvb2tzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGhvb2tzW2ldLmNiKG1vZHVsZUlkLCBfbW9kdWxlT2JqZWN0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBrZWVwIGFyZ3MgaW4gc3luYyB3aXRoIHdpdGggZGVmaW5lTW9kdWxlQ29kZSBpblxuICAgIC8vIG1ldHJvL3NyYy9SZXNvbHZlci9pbmRleC5qc1xuICAgIC8vIGFuZCBtZXRyby9zcmMvTW9kdWxlR3JhcGgvd29ya2VyLmpzXG4gICAgZmFjdG9yeShcbiAgICAgIGdsb2JhbCxcbiAgICAgIG1ldHJvUmVxdWlyZSxcbiAgICAgIG1ldHJvSW1wb3J0RGVmYXVsdCxcbiAgICAgIG1ldHJvSW1wb3J0QWxsLFxuICAgICAgX21vZHVsZU9iamVjdCxcbiAgICAgIF9tb2R1bGVPYmplY3QuZXhwb3J0cyxcbiAgICAgIGRlcGVuZGVuY3lNYXBcbiAgICApO1xuXG4gICAgLy8gYXZvaWQgcmVtb3ZpbmcgZmFjdG9yeSBpbiBERVYgbW9kZSBhcyBpdCBicmVha3MgSE1SXG4gICAgaWYgKCFfX0RFVl9fKSB7XG4gICAgICAvLyAkRmxvd0ZpeE1lOiBUaGlzIGlzIG9ubHkgc291bmQgYmVjYXVzZSB3ZSBuZXZlciBhY2Nlc3MgYGZhY3RvcnlgIGFnYWluXG4gICAgICBtb2R1bGUuZmFjdG9yeSA9IHVuZGVmaW5lZDtcbiAgICAgIG1vZHVsZS5kZXBlbmRlbmN5TWFwID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICAvLyAkRmxvd0ZpeE1lOiB3ZSBrbm93IHRoYXQgX19ERVZfXyBpcyBjb25zdCBhbmQgYFN5c3RyYWNlYCBleGlzdHNcbiAgICAgIFN5c3RyYWNlLmVuZEV2ZW50KCk7XG4gICAgfVxuICAgIHJldHVybiBfbW9kdWxlT2JqZWN0LmV4cG9ydHM7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBtb2R1bGUuaGFzRXJyb3IgPSB0cnVlO1xuICAgIG1vZHVsZS5lcnJvciA9IGU7XG4gICAgbW9kdWxlLmlzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICBtb2R1bGUucHVibGljTW9kdWxlLmV4cG9ydHMgPSB1bmRlZmluZWQ7XG4gICAgdGhyb3cgZTtcbiAgfSBmaW5hbGx5IHtcbiAgICBpZiAoX19ERVZfXykge1xuICAgICAgaWYgKGluaXRpYWxpemluZ01vZHVsZUlkcy5wb3AoKSAhPT0gbW9kdWxlSWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIFwiaW5pdGlhbGl6aW5nTW9kdWxlSWRzIGlzIGNvcnJ1cHQ7IHNvbWV0aGluZyBpcyB0ZXJyaWJseSB3cm9uZ1wiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHVua25vd25Nb2R1bGVFcnJvcihpZCkge1xuICB2YXIgbWVzc2FnZSA9ICdSZXF1aXJpbmcgdW5rbm93biBtb2R1bGUgXCInICsgaWQgKyAnXCIuJztcbiAgaWYgKF9fREVWX18pIHtcbiAgICBtZXNzYWdlICs9XG4gICAgICBcIklmIHlvdSBhcmUgc3VyZSB0aGUgbW9kdWxlIGlzIHRoZXJlLCB0cnkgcmVzdGFydGluZyBNZXRybyBCdW5kbGVyLiBcIiArXG4gICAgICBcIllvdSBtYXkgYWxzbyB3YW50IHRvIHJ1biBgeWFybmAsIG9yIGBucG0gaW5zdGFsbGAgKGRlcGVuZGluZyBvbiB5b3VyIGVudmlyb25tZW50KS5cIjtcbiAgfVxuICByZXR1cm4gRXJyb3IobWVzc2FnZSk7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZVRocmV3RXJyb3IoaWQsIGVycm9yKSB7XG4gIHZhciBkaXNwbGF5TmFtZSA9IChfX0RFVl9fICYmIG1vZHVsZXNbaWRdICYmIG1vZHVsZXNbaWRdLnZlcmJvc2VOYW1lKSB8fCBpZDtcbiAgcmV0dXJuIEVycm9yKFxuICAgICdSZXF1aXJpbmcgbW9kdWxlIFwiJyArIGRpc3BsYXlOYW1lICsgJ1wiLCB3aGljaCB0aHJldyBhbiBleGNlcHRpb246ICcgKyBlcnJvclxuICApO1xufVxuXG5pZiAoX19ERVZfXykge1xuICBtZXRyb1JlcXVpcmUuU3lzdHJhY2UgPSB7XG4gICAgYmVnaW5FdmVudDogZnVuY3Rpb24gYmVnaW5FdmVudCgpIHt9LFxuICAgIGVuZEV2ZW50OiBmdW5jdGlvbiBlbmRFdmVudCgpIHt9XG4gIH07XG5cbiAgbWV0cm9SZXF1aXJlLmdldE1vZHVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbW9kdWxlcztcbiAgfTtcblxuICAvLyBIT1QgTU9EVUxFIFJFTE9BRElOR1xuICB2YXIgY3JlYXRlSG90UmVsb2FkaW5nT2JqZWN0ID0gZnVuY3Rpb24gY3JlYXRlSG90UmVsb2FkaW5nT2JqZWN0KCkge1xuICAgIHZhciBob3QgPSB7XG4gICAgICBhY2NlcHRDYWxsYmFjazogbnVsbCxcbiAgICAgIGFjY2VwdDogZnVuY3Rpb24gYWNjZXB0KGNhbGxiYWNrKSB7XG4gICAgICAgIGhvdC5hY2NlcHRDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgfSxcbiAgICAgIGRpc3Bvc2VDYWxsYmFjazogbnVsbCxcbiAgICAgIGRpc3Bvc2U6IGZ1bmN0aW9uIGRpc3Bvc2UoY2FsbGJhY2spIHtcbiAgICAgICAgaG90LmRpc3Bvc2VDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGhvdDtcbiAgfTtcblxuICB2YXIgbWV0cm9BY2NlcHRBbGwgPSBmdW5jdGlvbiBtZXRyb0FjY2VwdEFsbChcbiAgICBkZXBlbmRlbnRNb2R1bGVzLFxuICAgIGludmVyc2VEZXBlbmRlbmNpZXMsXG4gICAgcGF0Y2hlZE1vZHVsZXNcbiAgKSB7XG4gICAgaWYgKCFkZXBlbmRlbnRNb2R1bGVzIHx8IGRlcGVuZGVudE1vZHVsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgbm90QWNjZXB0ZWQgPSBkZXBlbmRlbnRNb2R1bGVzLmZpbHRlcihmdW5jdGlvbihtb2R1bGUpIHtcbiAgICAgIHJldHVybiAhbWV0cm9BY2NlcHQoXG4gICAgICAgIG1vZHVsZSxcbiAgICAgICAgLypmYWN0b3J5Ki8gdW5kZWZpbmVkLFxuICAgICAgICAvKmRlcGVuZGVuY3lNYXAqLyB1bmRlZmluZWQsXG4gICAgICAgIGludmVyc2VEZXBlbmRlbmNpZXMsXG4gICAgICAgIHBhdGNoZWRNb2R1bGVzXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgdmFyIHBhcmVudHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vdEFjY2VwdGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBpZiB0aGUgbW9kdWxlIGhhcyBubyBwYXJlbnRzIHRoZW4gdGhlIGNoYW5nZSBjYW5ub3QgYmUgaG90IGxvYWRlZFxuICAgICAgaWYgKGludmVyc2VEZXBlbmRlbmNpZXNbbm90QWNjZXB0ZWRbaV1dLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHBhcmVudHMucHVzaC5hcHBseShwYXJlbnRzLCBpbnZlcnNlRGVwZW5kZW5jaWVzW25vdEFjY2VwdGVkW2ldXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmVudHMubGVuZ3RoID09IDA7XG4gIH07XG5cbiAgdmFyIG1ldHJvQWNjZXB0ID0gZnVuY3Rpb24gbWV0cm9BY2NlcHQoXG4gICAgaWQsXG4gICAgZmFjdG9yeSxcbiAgICBkZXBlbmRlbmN5TWFwLFxuICAgIGludmVyc2VEZXBlbmRlbmNpZXNcbiAgKSB7XG4gICAgdmFyIHBhdGNoZWRNb2R1bGVzID1cbiAgICAgIGFyZ3VtZW50cy5sZW5ndGggPiA0ICYmIGFyZ3VtZW50c1s0XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzRdIDoge307XG5cbiAgICBpZiAoaWQgaW4gcGF0Y2hlZE1vZHVsZXMpIHtcbiAgICAgIC8vIERvIG5vdCBwYXRjaCB0aGUgc2FtZSBtb2R1bGUgbW9yZSB0aGF0IG9uY2UgZHVyaW5nIGFuIHVwZGF0ZS5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBwYXRjaGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXG4gICAgdmFyIG1vZCA9IG1vZHVsZXNbaWRdO1xuXG4gICAgaWYgKCFtb2QgJiYgZmFjdG9yeSkge1xuICAgICAgLy8gTmV3IG1vZHVsZXMgYXJlIGdvaW5nIHRvIGJlIGhhbmRsZWQgYnkgdGhlIGRlZmluZSgpIG1ldGhvZC5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhciBob3QgPSBtb2QuaG90O1xuXG4gICAgaWYgKCFob3QpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgXCJDYW5ub3QgYWNjZXB0IG1vZHVsZSBiZWNhdXNlIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnQgXCIgK1xuICAgICAgICAgIFwiQVBJIHdhcyBub3QgaW5zdGFsbGVkLlwiXG4gICAgICApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChob3QuZGlzcG9zZUNhbGxiYWNrKSB7XG4gICAgICB0cnkge1xuICAgICAgICBob3QuZGlzcG9zZUNhbGxiYWNrKCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIFwiRXJyb3Igd2hpbGUgY2FsbGluZyBkaXNwb3NlIGhhbmRsZXIgZm9yIG1vZHVsZSBcIiArIGlkICsgXCI6IFwiLFxuICAgICAgICAgIGVycm9yXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmVwbGFjZSBhbmQgaW5pdGlhbGl6ZSBmYWN0b3J5XG4gICAgaWYgKGZhY3RvcnkpIHtcbiAgICAgIG1vZC5mYWN0b3J5ID0gZmFjdG9yeTtcbiAgICB9XG4gICAgaWYgKGRlcGVuZGVuY3lNYXApIHtcbiAgICAgIG1vZC5kZXBlbmRlbmN5TWFwID0gZGVwZW5kZW5jeU1hcDtcbiAgICB9XG4gICAgbW9kLmhhc0Vycm9yID0gZmFsc2U7XG4gICAgbW9kLmlzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICBtZXRyb1JlcXVpcmUoaWQpO1xuXG4gICAgaWYgKGhvdC5hY2NlcHRDYWxsYmFjaykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaG90LmFjY2VwdENhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBcIkVycm9yIHdoaWxlIGNhbGxpbmcgYWNjZXB0IGhhbmRsZXIgZm9yIG1vZHVsZSBcIiArIGlkICsgXCI6IFwiLFxuICAgICAgICAgIGVycm9yXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gbmVlZCB0byBoYXZlIGludmVyc2VEZXBlbmRlbmNpZXMgdG8gYnViYmxlIHVwIGFjY2VwdFxuICAgIGlmICghaW52ZXJzZURlcGVuZGVuY2llcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5kZWZpbmVkIGBpbnZlcnNlRGVwZW5kZW5jaWVzYFwiKTtcbiAgICB9XG5cbiAgICAvLyBhY2NlcHQgcGFyZW50IG1vZHVsZXMgcmVjdXJzaXZlbHkgdXAgdW50aWwgYWxsIHNpYmxpbmdzIGFyZSBhY2NlcHRlZFxuICAgIHJldHVybiBtZXRyb0FjY2VwdEFsbChcbiAgICAgIGludmVyc2VEZXBlbmRlbmNpZXNbaWRdLFxuICAgICAgaW52ZXJzZURlcGVuZGVuY2llcyxcbiAgICAgIHBhdGNoZWRNb2R1bGVzXG4gICAgKTtcbiAgfTtcblxuICBnbG9iYWwuX19hY2NlcHQgPSBtZXRyb0FjY2VwdDtcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTgtcHJlc2VudCBGYWNlYm9vay5cbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICogQGZvcm1hdFxuICovXG5cbmltcG9ydCB7XG4gIFBhbmVsLFxuICBGbGV4Um93LFxuICBFbGVtZW50c0luc3BlY3RvcixcbiAgRmxleENvbHVtbixcbiAgTWFuYWdlZERhdGFJbnNwZWN0b3IsXG4gIFNpZGViYXIsXG4gIFRvb2xiYXIsXG4gIENoZWNrYm94LFxuICBGbGlwcGVyUGx1Z2luLFxuICBCdXR0b24sXG4gIHN0eWxlZCxcbn0gZnJvbSAnZmxpcHBlcic7XG5pbXBvcnQgdHlwZSB7RWxlbWVudElELCBFbGVtZW50fSBmcm9tICdmbGlwcGVyJztcbmltcG9ydCB7cHJvY2Vzc0xlYWtzfSBmcm9tICcuL3Byb2Nlc3NMZWFrU3RyaW5nJztcblxudHlwZSBTdGF0ZSA9IHtcbiAgbGVha3M6IExlYWtbXSxcbiAgc2VsZWN0ZWRJZHg6ID9udW1iZXIsXG4gIHNlbGVjdGVkRWlkOiA/c3RyaW5nLFxuICBzaG93RnVsbENsYXNzUGF0aHM6IGJvb2xlYW4sXG4gIGxlYWtzQ291bnQ6IG51bWJlcixcbn07XG5cbnR5cGUgTGVha1JlcG9ydCA9IHtcbiAgbGVha3M6IHN0cmluZ1tdLFxufTtcblxuZXhwb3J0IHR5cGUgTGVhayA9IHtcbiAgdGl0bGU6IHN0cmluZyxcbiAgcm9vdDogc3RyaW5nLFxuICBlbGVtZW50czoge1trZXk6IEVsZW1lbnRJRF06IEVsZW1lbnR9LFxuICBlbGVtZW50c1NpbXBsZToge1trZXk6IEVsZW1lbnRJRF06IEVsZW1lbnR9LFxuICBpbnN0YW5jZUZpZWxkczoge30sXG4gIHN0YXRpY0ZpZWxkczoge30sXG4gIHJldGFpbmVkU2l6ZTogc3RyaW5nLFxufTtcblxuY29uc3QgV2luZG93ID0gc3R5bGVkKEZsZXhSb3cpKHtcbiAgaGVpZ2h0OiAnMTAwJScsXG4gIGZsZXg6IDEsXG59KTtcblxuY29uc3QgVG9vbGJhckl0ZW0gPSBzdHlsZWQoRmxleFJvdykoe1xuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgbWFyZ2luTGVmdDogJzhweCcsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGVha0NhbmFyeSBleHRlbmRzIEZsaXBwZXJQbHVnaW48U3RhdGU+IHtcbiAgc3RhdGUgPSB7XG4gICAgbGVha3M6IFtdLFxuICAgIHNlbGVjdGVkSWR4OiBudWxsLFxuICAgIHNlbGVjdGVkRWlkOiBudWxsLFxuICAgIHNob3dGdWxsQ2xhc3NQYXRoczogZmFsc2UsXG4gICAgbGVha3NDb3VudDogMCxcbiAgfTtcblxuICBpbml0KCkge1xuICAgIHRoaXMuY2xpZW50LnN1YnNjcmliZSgncmVwb3J0TGVhaycsIChyZXN1bHRzOiBMZWFrUmVwb3J0KSA9PiB7XG4gICAgICAvLyBXZSBvbmx5IHByb2Nlc3MgbmV3IGxlYWtzIGluc3RlYWQgb2YgcmVwbGFjaW5nIHRoZSB3aG9sZSBsaXN0IGluIG9yZGVyXG4gICAgICAvLyB0byBib3RoIGF2b2lkIHJlZHVuZGFudCBwcm9jZXNzaW5nIGFuZCB0byBwcmVzZXJ2ZSB0aGUgZXhwYW5kZWQvXG4gICAgICAvLyBjb2xsYXBzZWQgc3RhdGUgb2YgdGhlIHRyZWUgdmlld1xuICAgICAgY29uc3QgbmV3TGVha3MgPSBwcm9jZXNzTGVha3MocmVzdWx0cy5sZWFrcy5zbGljZSh0aGlzLnN0YXRlLmxlYWtzQ291bnQpKTtcblxuICAgICAgbGV0IGxlYWtzID0gdGhpcy5zdGF0ZS5sZWFrcztcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3TGVha3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGVha3MucHVzaChuZXdMZWFrc1tpXSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBsZWFrczogbGVha3MsXG4gICAgICAgIGxlYWtzQ291bnQ6IHJlc3VsdHMubGVha3MubGVuZ3RoLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBfY2xlYXJMZWFrcyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGxlYWtzOiBbXSxcbiAgICAgIGxlYWtzQ291bnQ6IDAsXG4gICAgICBzZWxlY3RlZElkeDogbnVsbCxcbiAgICAgIHNlbGVjdGVkRWlkOiBudWxsLFxuICAgIH0pO1xuICAgIHRoaXMuY2xpZW50LmNhbGwoJ2NsZWFyJyk7XG4gIH07XG5cbiAgX3NlbGVjdEVsZW1lbnQgPSAobGVha0lkeDogbnVtYmVyLCBlaWQ6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRJZHg6IGxlYWtJZHgsXG4gICAgICBzZWxlY3RlZEVpZDogZWlkLFxuICAgIH0pO1xuICB9O1xuXG4gIF90b2dnbGVFbGVtZW50ID0gKGxlYWtJZHg6IG51bWJlciwgZWlkOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBsZWFrcyA9IHRoaXMuc3RhdGUubGVha3M7XG4gICAgY29uc3QgbGVhayA9IGxlYWtzW2xlYWtJZHhdO1xuXG4gICAgY29uc3QgZWxlbWVudCA9IGxlYWsuZWxlbWVudHNbZWlkXTtcbiAgICBlbGVtZW50LmV4cGFuZGVkID0gIWVsZW1lbnQuZXhwYW5kZWQ7XG5cbiAgICBjb25zdCBlbGVtZW50U2ltcGxlID0gbGVhay5lbGVtZW50c1NpbXBsZVtlaWRdO1xuICAgIGVsZW1lbnRTaW1wbGUuZXhwYW5kZWQgPSAhZWxlbWVudFNpbXBsZS5leHBhbmRlZDtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbGVha3M6IGxlYWtzLFxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHaXZlbiBhIHNwZWNpZmljIHN0cmluZyB2YWx1ZSwgZGV0ZXJtaW5lcyB3aGF0IERhdGFJbnNwZWN0b3IgdHlwZSB0byB0cmVhdFxuICAgKiBpdCBhcy4gRW5zdXJlcyB0aGF0IG51bWJlcnMsIGJvb2xzLCBldGMgcmVuZGVyIGNvcnJlY3RseS5cbiAgICovXG4gIF9leHRyYWN0VmFsdWUoXG4gICAgdmFsdWU6IGFueSxcbiAgICBkZXB0aDogbnVtYmVyLFxuICApOiB7fG11dGFibGU6IGJvb2xlYW4sIHR5cGU6IHN0cmluZywgdmFsdWU6IGFueXx9IHtcbiAgICBpZiAoIWlzTmFOKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHttdXRhYmxlOiBmYWxzZSwgdHlwZTogJ251bWJlcicsIHZhbHVlOiB2YWx1ZX07XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PSAndHJ1ZScgfHwgdmFsdWUgPT0gJ2ZhbHNlJykge1xuICAgICAgcmV0dXJuIHttdXRhYmxlOiBmYWxzZSwgdHlwZTogJ2Jvb2xlYW4nLCB2YWx1ZTogdmFsdWV9O1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPT0gJ251bGwnKSB7XG4gICAgICByZXR1cm4ge211dGFibGU6IGZhbHNlLCB0eXBlOiAnbnVsbCcsIHZhbHVlOiB2YWx1ZX07XG4gICAgfVxuICAgIHJldHVybiB7bXV0YWJsZTogZmFsc2UsIHR5cGU6ICdlbnVtJywgdmFsdWU6IHZhbHVlfTtcbiAgfVxuXG4gIHJlbmRlclNpZGViYXIoKSB7XG4gICAgY29uc3Qge3NlbGVjdGVkSWR4LCBzZWxlY3RlZEVpZCwgbGVha3N9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGlmIChzZWxlY3RlZElkeCA9PSBudWxsIHx8IHNlbGVjdGVkRWlkID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGxlYWsgPSBsZWFrc1tzZWxlY3RlZElkeF07XG4gICAgY29uc3Qgc3RhdGljRmllbGRzID0gbGVhay5zdGF0aWNGaWVsZHNbc2VsZWN0ZWRFaWRdO1xuICAgIGNvbnN0IGluc3RhbmNlRmllbGRzID0gbGVhay5pbnN0YW5jZUZpZWxkc1tzZWxlY3RlZEVpZF07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFNpZGViYXIgcG9zaXRpb249XCJyaWdodFwiIHdpZHRoPXs2MDB9IG1pbldpZHRoPXszMDB9IG1heFdpZHRoPXs5MDB9PlxuICAgICAgICA8UGFuZWwgaGVhZGluZz17J0luc3RhbmNlJ30gZmxvYXRpbmc9e2ZhbHNlfSBncm93PXtmYWxzZX0+XG4gICAgICAgICAgPE1hbmFnZWREYXRhSW5zcGVjdG9yXG4gICAgICAgICAgICBkYXRhPXtpbnN0YW5jZUZpZWxkc31cbiAgICAgICAgICAgIGV4cGFuZFJvb3Q9e3RydWV9XG4gICAgICAgICAgICBleHRyYWN0VmFsdWU9e3RoaXMuX2V4dHJhY3RWYWx1ZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L1BhbmVsPlxuICAgICAgICA8UGFuZWwgaGVhZGluZz17J1N0YXRpYyd9IGZsb2F0aW5nPXtmYWxzZX0gZ3Jvdz17ZmFsc2V9PlxuICAgICAgICAgIDxNYW5hZ2VkRGF0YUluc3BlY3RvclxuICAgICAgICAgICAgZGF0YT17c3RhdGljRmllbGRzfVxuICAgICAgICAgICAgZXhwYW5kUm9vdD17dHJ1ZX1cbiAgICAgICAgICAgIGV4dHJhY3RWYWx1ZT17dGhpcy5fZXh0cmFjdFZhbHVlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvUGFuZWw+XG4gICAgICA8L1NpZGViYXI+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7c2VsZWN0ZWRJZHgsIHNlbGVjdGVkRWlkLCBzaG93RnVsbENsYXNzUGF0aHN9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBzaWRlYmFyID0gdGhpcy5yZW5kZXJTaWRlYmFyKCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFdpbmRvdz5cbiAgICAgICAgPEZsZXhDb2x1bW4gZ3Jvdz17dHJ1ZX0+XG4gICAgICAgICAgPEZsZXhDb2x1bW4gZ3Jvdz17dHJ1ZX0gc2Nyb2xsYWJsZT17dHJ1ZX0+XG4gICAgICAgICAgICB7dGhpcy5zdGF0ZS5sZWFrcy5tYXAoKGxlYWs6IExlYWssIGlkeDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRzID0gc2hvd0Z1bGxDbGFzc1BhdGhzXG4gICAgICAgICAgICAgICAgPyBsZWFrLmVsZW1lbnRzXG4gICAgICAgICAgICAgICAgOiBsZWFrLmVsZW1lbnRzU2ltcGxlO1xuICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHNlbGVjdGVkSWR4ID09IGlkeCA/IHNlbGVjdGVkRWlkIDogbnVsbDtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8UGFuZWxcbiAgICAgICAgICAgICAgICAgIGNvbGxhcHNhYmxlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgIHBhZGRlZD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICBoZWFkaW5nPXtsZWFrLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgZmxvYXRpbmc9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgYWNjZXNzb3J5PXtsZWFrLnJldGFpbmVkU2l6ZX0+XG4gICAgICAgICAgICAgICAgICA8RWxlbWVudHNJbnNwZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgb25FbGVtZW50U2VsZWN0ZWQ9e2VpZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0RWxlbWVudChpZHgsIGVpZCk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIG9uRWxlbWVudEhvdmVyZWQ9eygpID0+IHt9fVxuICAgICAgICAgICAgICAgICAgICBvbkVsZW1lbnRFeHBhbmRlZD17KGVpZCwgZGVlcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3RvZ2dsZUVsZW1lbnQoaWR4LCBlaWQpO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICBvblZhbHVlQ2hhbmdlZD17KCkgPT4ge319XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtzZWxlY3RlZH1cbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0cz17bnVsbH1cbiAgICAgICAgICAgICAgICAgICAgcm9vdD17bGVhay5yb290fVxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50cz17ZWxlbWVudHN9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvUGFuZWw+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L0ZsZXhDb2x1bW4+XG4gICAgICAgICAgPFRvb2xiYXI+XG4gICAgICAgICAgICA8VG9vbGJhckl0ZW0+XG4gICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5fY2xlYXJMZWFrc30+Q2xlYXI8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvVG9vbGJhckl0ZW0+XG4gICAgICAgICAgICA8VG9vbGJhckl0ZW0+XG4gICAgICAgICAgICAgIDxDaGVja2JveFxuICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3Nob3dGdWxsQ2xhc3NQYXRoc31cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGNoZWNrZWQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dGdWxsQ2xhc3NQYXRoczogY2hlY2tlZH0pO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIFNob3cgZnVsbCBjbGFzcyBwYXRoXG4gICAgICAgICAgICA8L1Rvb2xiYXJJdGVtPlxuICAgICAgICAgIDwvVG9vbGJhcj5cbiAgICAgICAgPC9GbGV4Q29sdW1uPlxuICAgICAgICB7c2lkZWJhcn1cbiAgICAgIDwvV2luZG93PlxuICAgICk7XG4gIH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTgtcHJlc2VudCBGYWNlYm9vay5cbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICogQGZvcm1hdFxuICogQGZsb3dcbiAqL1xuXG5pbXBvcnQgdHlwZSB7TGVha30gZnJvbSAnLi9pbmRleC5qcyc7XG5pbXBvcnQgdHlwZSB7RWxlbWVudH0gZnJvbSAnZmxpcHBlcic7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBFbGVtZW50IChmb3IgRWxlbWVudHNJbnNwZWN0b3IpIHJlcHJlc2VudGluZyBhIHNpbmdsZSBPYmplY3QgaW5cbiAqIHRoZSBwYXRoIHRvIEdDIHJvb3Qgdmlldy5cbiAqL1xuZnVuY3Rpb24gZ2V0RWxlbWVudFNpbXBsZShzdHI6IHN0cmluZywgaWQ6IHN0cmluZyk6IEVsZW1lbnQge1xuICAvLyBCZWxvdyByZWdleCBjYW4gaGFuZGxlIGJvdGggb2xkZXIgYW5kIG5ld2VyIHZlcnNpb25zIG9mIExlYWtDYW5hcnlcbiAgY29uc3QgbWF0Y2ggPSBzdHIubWF0Y2goXG4gICAgL1xcKiAoR0MgUk9PVCApPyhcXHUyMUIzICk/KFthLXpdKiApPyhbXkEtWl0qLik/KFtBLVpdLiopLyxcbiAgKTtcbiAgbGV0IG5hbWUgPSAnTi9BJztcbiAgaWYgKG1hdGNoKSB7XG4gICAgbmFtZSA9IG1hdGNoWzVdO1xuICB9XG4gIHJldHVybiB7XG4gICAgaWQ6IGlkLFxuICAgIG5hbWU6IG5hbWUsXG4gICAgZXhwYW5kZWQ6IHRydWUsXG4gICAgY2hpbGRyZW46IFtdLFxuICAgIGF0dHJpYnV0ZXM6IFtdLFxuICAgIGRhdGE6IHt9LFxuICAgIGRlY29yYXRpb246ICcnLFxuICAgIGV4dHJhSW5mbzoge30sXG4gIH07XG59XG5cbi8vIExpbmUgbWFya2luZyB0aGUgc3RhcnQgb2YgRGV0YWlscyBzZWN0aW9uXG5jb25zdCBCRUdJTl9ERVRBSUxTX1NFQ1RJT05fSU5ESUNBVE9SID0gJyogRGV0YWlsczonO1xuLy8gTGluZSBmb2xsb3dpbmcgdGhlIGVuZCBvZiB0aGUgRGV0YWlscyBzZWN0aW9uXG5jb25zdCBFTkRfREVUQUlMU19TRUNUSU9OX0lORElDQVRPUiA9ICcqIEV4Y2x1ZGVkIFJlZnM6JztcbmNvbnN0IFNUQVRJQ19QUkVGSVggPSAnc3RhdGljICc7XG4vLyBUZXh0IHRoYXQgYmVnaW5zIHRoZSBsaW5lIG9mIHRoZSBPYmplY3QgYXQgR0Mgcm9vdFxuY29uc3QgTEVBS19CRUdJTl9JTkRJQ0FUT1IgPSAnaGFzIGxlYWtlZDonO1xuY29uc3QgUkVUQUlORURfU0laRV9JTkRJQ0FUT1IgPSAnKiBSZXRhaW5pbmc6ICc7XG5cbi8qKlxuICogUGFyc2VzIHRoZSBsaW5lcyBnaXZlbiAoYXQgdGhlIGdpdmVuIGluZGV4KSB0byBleHRyYWN0IGluZm9ybWF0aW9uIGFib3V0IGJvdGhcbiAqIHN0YXRpYyBhbmQgaW5zdGFuY2UgZmllbGRzIG9mIGVhY2ggY2xhc3MgaW4gdGhlIHBhdGggdG8gR0Mgcm9vdC4gUmV0dXJucyB0aHJlZVxuICogb2JqZWN0cywgZWFjaCBvbmUgbWFwcGluZyB0aGUgZWxlbWVudCBJRCBvZiBhIHNwZWNpZmljIGVsZW1lbnQgdG8gdGhlXG4gKiBjb3JyZXNwb25kaW5nIHN0YXRpYyBmaWVsZHMsIGluc3RhbmNlIGZpZWxkcywgb3IgcGFja2FnZSBuYW1lIG9mIHRoZSBjbGFzc1xuICovXG5mdW5jdGlvbiBnZW5lcmF0ZUZpZWxkc0xpc3QoXG4gIGxpbmVzOiBzdHJpbmdbXSxcbiAgaTogbnVtYmVyLFxuKToge3xzdGF0aWNGaWVsZHM6IHt9LCBpbnN0YW5jZUZpZWxkczoge30sIHBhY2thZ2VzOiB7fXx9IHtcbiAgbGV0IHN0YXRpY0ZpZWxkcyA9IHt9O1xuICBsZXQgaW5zdGFuY2VGaWVsZHMgPSB7fTtcblxuICBsZXQgc3RhdGljVmFsdWVzID0ge307XG4gIGxldCBpbnN0YW5jZVZhbHVlcyA9IHt9O1xuXG4gIGxldCBlbGVtZW50SWQgPSAtMTtcbiAgbGV0IGVsZW1lbnRJZFN0ciA9IFN0cmluZygtMSk7XG5cbiAgbGV0IHBhY2thZ2VzID0ge307XG5cbiAgLy8gUHJvY2VzcyBldmVyeXRoaW5nIGJldHdlZW4gRGV0YWlscyBhbmQgRXhjbHVkZWQgUmVmc1xuICB3aGlsZSAoXG4gICAgaSA8IGxpbmVzLmxlbmd0aCAmJlxuICAgICFsaW5lc1tpXS5zdGFydHNXaXRoKEVORF9ERVRBSUxTX1NFQ1RJT05fSU5ESUNBVE9SKVxuICApIHtcbiAgICBjb25zdCBsaW5lID0gbGluZXNbaV07XG4gICAgaWYgKGxpbmUuc3RhcnRzV2l0aCgnKicpKSB7XG4gICAgICBpZiAoZWxlbWVudElkICE9IC0xKSB7XG4gICAgICAgIHN0YXRpY0ZpZWxkc1tlbGVtZW50SWRTdHJdID0gc3RhdGljVmFsdWVzO1xuICAgICAgICBpbnN0YW5jZUZpZWxkc1tlbGVtZW50SWRTdHJdID0gaW5zdGFuY2VWYWx1ZXM7XG4gICAgICAgIHN0YXRpY1ZhbHVlcyA9IHt9O1xuICAgICAgICBpbnN0YW5jZVZhbHVlcyA9IHt9O1xuICAgICAgfVxuICAgICAgZWxlbWVudElkKys7XG4gICAgICBlbGVtZW50SWRTdHIgPSBTdHJpbmcoZWxlbWVudElkKTtcblxuICAgICAgLy8gRXh0cmFjdCBwYWNrYWdlIGZvciBlYWNoIGNsYXNzXG4gICAgICBsZXQgcGtnID0gJ3Vua25vd24nO1xuICAgICAgY29uc3QgbWF0Y2ggPSBsaW5lLm1hdGNoKC9cXCogKC4qKShvZnxDbGFzcykgKC4qKS8pO1xuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIHBrZyA9IG1hdGNoWzNdO1xuICAgICAgfVxuICAgICAgcGFja2FnZXNbZWxlbWVudElkU3RyXSA9IHBrZztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRmllbGQvdmFsdWUgcGFpcnMgcmVwcmVzZW50ZWQgaW4gaW5wdXQgbGluZXMgYXNcbiAgICAgIC8vIHwgZmllbGROYW1lID0gdmFsdWVcbiAgICAgIGNvbnN0IG1hdGNoID0gbGluZS5tYXRjaCgvXFx8XFxzKyguKikgPSAoLiopLyk7XG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgY29uc3QgZmllbGROYW1lID0gbWF0Y2hbMV07XG4gICAgICAgIGNvbnN0IGZpZWxkVmFsdWUgPSBtYXRjaFsyXTtcblxuICAgICAgICBpZiAoZmllbGROYW1lLnN0YXJ0c1dpdGgoU1RBVElDX1BSRUZJWCkpIHtcbiAgICAgICAgICBjb25zdCBzdHJpcHBlZEZpZWxkTmFtZSA9IGZpZWxkTmFtZS5zdWJzdHIoNyk7XG4gICAgICAgICAgc3RhdGljVmFsdWVzW3N0cmlwcGVkRmllbGROYW1lXSA9IGZpZWxkVmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5zdGFuY2VWYWx1ZXNbZmllbGROYW1lXSA9IGZpZWxkVmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaSsrO1xuICB9XG4gIHN0YXRpY0ZpZWxkc1tlbGVtZW50SWRTdHJdID0gc3RhdGljVmFsdWVzO1xuICBpbnN0YW5jZUZpZWxkc1tlbGVtZW50SWRTdHJdID0gaW5zdGFuY2VWYWx1ZXM7XG5cbiAgcmV0dXJuIHtcbiAgICBzdGF0aWNGaWVsZHM6IHN0YXRpY0ZpZWxkcyxcbiAgICBpbnN0YW5jZUZpZWxkczogaW5zdGFuY2VGaWVsZHMsXG4gICAgcGFja2FnZXM6IHBhY2thZ2VzLFxuICB9O1xufVxuXG4vKipcbiAqIFByb2Nlc3NlcyBhIExlYWtDYW5hcnkgc3RyaW5nIGNvbnRhaW5pbmcgZGF0YSBmcm9tIGEgc2luZ2xlIGxlYWsuIElmIHRoZVxuICogc3RyaW5nIHJlcHJlc2VudHMgYSB2YWxpZCBsZWFrLCB0aGUgZnVuY3Rpb24gYXBwZW5kcyBwYXJzZWQgZGF0YSB0byB0aGUgZ2l2ZW5cbiAqIG91dHB1dCBsaXN0LiBJZiBub3QsIHRoZSBsaXN0IGlzIHJldHVybmVkIGFzLWlzLiBUaGlzIHBhcnNlZCBkYXRhIGNvbnRhaW5zXG4gKiB0aGUgcGF0aCB0byBHQyByb290LCBzdGF0aWMvaW5zdGFuY2UgZmllbGRzIGZvciBlYWNoIE9iamVjdCBpbiB0aGUgcGF0aCwgdGhlXG4gKiBsZWFrJ3MgcmV0YWluZWQgc2l6ZSwgYW5kIGEgdGl0bGUgZm9yIHRoZSBsZWFrLlxuICovXG5mdW5jdGlvbiBwcm9jZXNzTGVhayhvdXRwdXQ6IExlYWtbXSwgbGVha0luZm86IHN0cmluZyk6IExlYWtbXSB7XG4gIGNvbnN0IGxpbmVzID0gbGVha0luZm8uc3BsaXQoJ1xcbicpO1xuXG4gIC8vIEVsZW1lbnRzIHNob3dzIGEgT2JqZWN0J3MgY2xhc3NuYW1lIGFuZCBwYWNrYWdlLCB3aGVyYXMgZWxlbWVudHNTaW1wbGUgc2hvd3NcbiAgLy8ganVzdCBpdHMgY2xhc3NuYW1lXG4gIGxldCBlbGVtZW50cyA9IHt9O1xuICBsZXQgZWxlbWVudHNTaW1wbGUgPSB7fTtcblxuICBsZXQgcm9vdEVsZW1lbnRJZCA9ICcnO1xuXG4gIGxldCBpID0gMDtcbiAgd2hpbGUgKGkgPCBsaW5lcy5sZW5ndGggJiYgIWxpbmVzW2ldLmVuZHNXaXRoKExFQUtfQkVHSU5fSU5ESUNBVE9SKSkge1xuICAgIGkrKztcbiAgfVxuICBpKys7XG5cbiAgaWYgKGkgPj0gbGluZXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuXG4gIGxldCBlbGVtZW50SWQgPSAwO1xuICBsZXQgZWxlbWVudElkU3RyID0gJyc7XG4gIHdoaWxlIChpIDwgbGluZXMubGVuZ3RoICYmIGxpbmVzW2ldLnN0YXJ0c1dpdGgoJyonKSkge1xuICAgIGNvbnN0IGxpbmUgPSBsaW5lc1tpXTtcblxuICAgIGVsZW1lbnRJZFN0ciA9IFN0cmluZyhlbGVtZW50SWQpO1xuICAgIGNvbnN0IHByZXZJZFN0ciA9IFN0cmluZyhlbGVtZW50SWQgLSAxKTtcbiAgICBpZiAoZWxlbWVudElkICE9PSAwKSB7XG4gICAgICAvLyBBZGQgZWxlbWVudCB0byBwcmV2aW91cyBlbGVtZW50J3MgY2hpbGRyZW5cbiAgICAgIGVsZW1lbnRzW3ByZXZJZFN0cl0uY2hpbGRyZW4ucHVzaChlbGVtZW50SWRTdHIpO1xuICAgICAgZWxlbWVudHNTaW1wbGVbcHJldklkU3RyXS5jaGlsZHJlbi5wdXNoKGVsZW1lbnRJZFN0cik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3RFbGVtZW50SWQgPSBlbGVtZW50SWRTdHI7XG4gICAgfVxuICAgIGVsZW1lbnRzW2VsZW1lbnRJZFN0cl0gPSBnZXRFbGVtZW50U2ltcGxlKGxpbmUsIGVsZW1lbnRJZFN0cik7XG4gICAgZWxlbWVudHNTaW1wbGVbZWxlbWVudElkU3RyXSA9IGdldEVsZW1lbnRTaW1wbGUobGluZSwgZWxlbWVudElkU3RyKTtcblxuICAgIGkrKztcbiAgICBlbGVtZW50SWQrKztcbiAgfVxuICAvLyBMYXN0IGVsZW1lbnQgaXMgbGVha2VkIG9iamVjdFxuICBjb25zdCBsZWFrZWRPYmpOYW1lID0gZWxlbWVudHNbZWxlbWVudElkU3RyXS5uYW1lO1xuXG4gIHdoaWxlIChcbiAgICBpIDwgbGluZXMubGVuZ3RoICYmXG4gICAgIWxpbmVzW2ldLnN0YXJ0c1dpdGgoUkVUQUlORURfU0laRV9JTkRJQ0FUT1IpICYmXG4gICAgIWxpbmVzW2ldLnN0YXJ0c1dpdGgoQkVHSU5fREVUQUlMU19TRUNUSU9OX0lORElDQVRPUilcbiAgKSB7XG4gICAgaSsrO1xuICB9XG5cbiAgbGV0IHJldGFpbmVkU2l6ZSA9ICd1bmtub3duIHNpemUnO1xuXG4gIGlmIChsaW5lc1tpXS5zdGFydHNXaXRoKFJFVEFJTkVEX1NJWkVfSU5ESUNBVE9SKSkge1xuICAgIGNvbnN0IG1hdGNoID0gbGluZXNbaV0ubWF0Y2goL1xcKiBSZXRhaW5pbmc6ICguKikuLyk7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICByZXRhaW5lZFNpemUgPSBtYXRjaFsxXTtcbiAgICB9XG4gIH1cblxuICB3aGlsZSAoXG4gICAgaSA8IGxpbmVzLmxlbmd0aCAmJlxuICAgICFsaW5lc1tpXS5zdGFydHNXaXRoKEJFR0lOX0RFVEFJTFNfU0VDVElPTl9JTkRJQ0FUT1IpXG4gICkge1xuICAgIGkrKztcbiAgfVxuICBpKys7XG5cbiAgLy8gUGFyc2UgaW5mb3JtYXRpb24gb24gZWFjaCBvYmplY3QncyBmaWVsZHMsIHBhY2thZ2VcbiAgY29uc3Qge3N0YXRpY0ZpZWxkcywgaW5zdGFuY2VGaWVsZHMsIHBhY2thZ2VzfSA9IGdlbmVyYXRlRmllbGRzTGlzdChsaW5lcywgaSk7XG5cbiAgLy8gV2hpbGUgZWxlbWVudHNTaW1wbGUgcmVtYWlucyBhcy1pcywgZWxlbWVudHMgaGFzIHRoZSBwYWNrYWdlIG9mIGVhY2ggY2xhc3NcbiAgLy8gaW5zZXJ0ZWQsIGluIG9yZGVyIHRvIGVuYWJsZSAnU2hvdyBmdWxsIGNsYXNzIHBhdGgnXG4gIE9iamVjdC5rZXlzKHBhY2thZ2VzKS5mb3JFYWNoKGVsZW1lbnRJZCA9PiB7XG4gICAgY29uc3QgcGtnID0gcGFja2FnZXNbZWxlbWVudElkXTtcbiAgICBjb25zdCBzaW1wbGVOYW1lID0gZWxlbWVudHNbZWxlbWVudElkXS5uYW1lO1xuICAgIC8vIEdldHMgZXZlcnl0aGluZyBiZWZvcmUgdGhlIGZpZWxkIG5hbWUsIHdoaWNoIGlzIHJlcGxhY2VkIGJ5IHRoZSBwYWNrYWdlXG4gICAgY29uc3QgbWF0Y2ggPSBzaW1wbGVOYW1lLm1hdGNoKC8oW15cXC4gXSopKC4qKS8pO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgZWxlbWVudHNbZWxlbWVudElkXS5uYW1lID0gcGtnICsgbWF0Y2hbMl07XG4gICAgfVxuICB9KTtcblxuICBvdXRwdXQucHVzaCh7XG4gICAgcm9vdDogcm9vdEVsZW1lbnRJZCxcbiAgICBlbGVtZW50czogZWxlbWVudHMsXG4gICAgZWxlbWVudHNTaW1wbGU6IGVsZW1lbnRzU2ltcGxlLFxuICAgIHN0YXRpY0ZpZWxkczogc3RhdGljRmllbGRzLFxuICAgIGluc3RhbmNlRmllbGRzOiBpbnN0YW5jZUZpZWxkcyxcbiAgICB0aXRsZTogbGVha2VkT2JqTmFtZSxcbiAgICByZXRhaW5lZFNpemU6IHJldGFpbmVkU2l6ZSxcbiAgfSk7XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbi8qKlxuICogUHJvY2Vzc2VzIGEgc2V0IG9mIExlYWtDYW5hcnkgc3RyaW5ncywgaWdub3Jpbmcgbm9uLWxlYWtzIC0gc2VlIHByb2Nlc3NMZWFrIGFib3ZlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc0xlYWtzKGxlYWtJbmZvczogc3RyaW5nW10pOiBMZWFrW10ge1xuICBjb25zdCBuZXdMZWFrcyA9IGxlYWtJbmZvcy5yZWR1Y2UocHJvY2Vzc0xlYWssIFtdKTtcbiAgcmV0dXJuIG5ld0xlYWtzO1xufVxuIl0sIm5hbWVzIjpbImdsb2JhbCIsIl9fciIsIm1ldHJvUmVxdWlyZSIsIl9fZCIsImRlZmluZSIsIl9fYyIsImNsZWFyIiwibW9kdWxlcyIsIkVNUFRZIiwiX3JlZiIsImhhc093blByb3BlcnR5IiwiX19OVU1fTU9EVUxFU19fIiwiQXJyYXkiLCJPYmplY3QiLCJjcmVhdGUiLCJmYWN0b3J5IiwibW9kdWxlSWQiLCJkZXBlbmRlbmN5TWFwIiwiaGFzRXJyb3IiLCJpbXBvcnRlZEFsbCIsImltcG9ydGVkRGVmYXVsdCIsImlzSW5pdGlhbGl6ZWQiLCJwdWJsaWNNb2R1bGUiLCJleHBvcnRzIiwibW9kdWxlSWRSZWFsbHlJc051bWJlciIsIm1vZHVsZSIsImd1YXJkZWRMb2FkTW9kdWxlIiwibWV0cm9JbXBvcnREZWZhdWx0IiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJtZXRyb0ltcG9ydEFsbCIsIl9rZXkiLCJjYWxsIiwiaW5HdWFyZCIsIkVycm9yVXRpbHMiLCJyZXR1cm5WYWx1ZSIsImxvYWRNb2R1bGVJbXBsZW1lbnRhdGlvbiIsImUiLCJyZXBvcnRGYXRhbEVycm9yIiwiSURfTUFTS19TSElGVCIsIkxPQ0FMX0lEX01BU0siLCJ1bnBhY2tNb2R1bGVJZCIsInNlZ21lbnRJZCIsImxvY2FsSWQiLCJwYWNrTW9kdWxlSWQiLCJ2YWx1ZSIsImhvb2tzIiwicmVnaXN0ZXJIb29rIiwiY2IiLCJob29rIiwicHVzaCIsInJlbGVhc2UiLCJpIiwibGVuZ3RoIiwic3BsaWNlIiwiX19kZWZpbmVNb2R1bGUiLCJuYXRpdmVSZXF1aXJlIiwiX3VucGFja01vZHVsZUlkIiwiX3NlZ21lbnRJZCIsIl9sb2NhbElkIiwidW5rbm93bk1vZHVsZUVycm9yIiwibW9kdWxlVGhyZXdFcnJvciIsImVycm9yIiwiX21vZHVsZSIsIl9tb2R1bGVPYmplY3QiLCJpZCIsInVuZGVmaW5lZCIsIm1lc3NhZ2UiLCJFcnJvciIsImRpc3BsYXlOYW1lIiwiV2luZG93IiwiRmxleFJvdyIsImhlaWdodCIsImZsZXgiLCJUb29sYmFySXRlbSIsImFsaWduSXRlbXMiLCJtYXJnaW5MZWZ0IiwiTGVha0NhbmFyeSIsIkZsaXBwZXJQbHVnaW4iLCJsZWFrcyIsInNlbGVjdGVkSWR4Iiwic2VsZWN0ZWRFaWQiLCJzaG93RnVsbENsYXNzUGF0aHMiLCJsZWFrc0NvdW50Iiwic2V0U3RhdGUiLCJjbGllbnQiLCJsZWFrSWR4IiwiZWlkIiwic3RhdGUiLCJsZWFrIiwiZWxlbWVudCIsImVsZW1lbnRzIiwiZXhwYW5kZWQiLCJlbGVtZW50U2ltcGxlIiwiZWxlbWVudHNTaW1wbGUiLCJpbml0Iiwic3Vic2NyaWJlIiwicmVzdWx0cyIsIm5ld0xlYWtzIiwic2xpY2UiLCJfZXh0cmFjdFZhbHVlIiwiZGVwdGgiLCJpc05hTiIsIm11dGFibGUiLCJ0eXBlIiwicmVuZGVyU2lkZWJhciIsInN0YXRpY0ZpZWxkcyIsImluc3RhbmNlRmllbGRzIiwicmVuZGVyIiwic2lkZWJhciIsIm1hcCIsImlkeCIsInNlbGVjdGVkIiwidGl0bGUiLCJyZXRhaW5lZFNpemUiLCJfc2VsZWN0RWxlbWVudCIsImRlZXAiLCJfdG9nZ2xlRWxlbWVudCIsInJvb3QiLCJfY2xlYXJMZWFrcyIsImNoZWNrZWQiLCJnZXRFbGVtZW50U2ltcGxlIiwic3RyIiwibWF0Y2giLCJuYW1lIiwiY2hpbGRyZW4iLCJhdHRyaWJ1dGVzIiwiZGF0YSIsImRlY29yYXRpb24iLCJleHRyYUluZm8iLCJCRUdJTl9ERVRBSUxTX1NFQ1RJT05fSU5ESUNBVE9SIiwiRU5EX0RFVEFJTFNfU0VDVElPTl9JTkRJQ0FUT1IiLCJTVEFUSUNfUFJFRklYIiwiTEVBS19CRUdJTl9JTkRJQ0FUT1IiLCJSRVRBSU5FRF9TSVpFX0lORElDQVRPUiIsImdlbmVyYXRlRmllbGRzTGlzdCIsImxpbmVzIiwic3RhdGljVmFsdWVzIiwiaW5zdGFuY2VWYWx1ZXMiLCJlbGVtZW50SWQiLCJlbGVtZW50SWRTdHIiLCJTdHJpbmciLCJwYWNrYWdlcyIsInN0YXJ0c1dpdGgiLCJsaW5lIiwicGtnIiwiZmllbGROYW1lIiwiZmllbGRWYWx1ZSIsInN0cmlwcGVkRmllbGROYW1lIiwic3Vic3RyIiwicHJvY2Vzc0xlYWsiLCJvdXRwdXQiLCJsZWFrSW5mbyIsInNwbGl0Iiwicm9vdEVsZW1lbnRJZCIsImVuZHNXaXRoIiwicHJldklkU3RyIiwibGVha2VkT2JqTmFtZSIsImtleXMiLCJmb3JFYWNoIiwic2ltcGxlTmFtZSIsInByb2Nlc3NMZWFrcyIsImxlYWtJbmZvcyIsInJlZHVjZSJdLCJtYXBwaW5ncyI6Ijs7QUNXQTs7QUFJQUEsRUFBQUEsTUFBTSxDQUFDQyxHQUFQLEdBQWFDLFlBQWI7QUFDQUYsRUFBQUEsTUFBTSxDQUFDRyxHQUFQLEdBQWFDLE1BQWI7QUFDQUosRUFBQUEsTUFBTSxDQUFDSyxHQUFQLEdBQWFDLEtBQWI7QUFFQSxNQUFJQyxPQUFPLEdBQUdELEtBQUssRUFBbkI7QUFJQSxNQUFJRSxLQUFLLEdBQUcsRUFBWjtBQUNBLE1BQUlDLElBQUksR0FBRyxFQUFYO0FBQUEsTUFDRUMsY0FBYyxHQUFHRCxJQUFJLENBQUNDLGNBRHhCOztBQUdBLFdBQVNKLEtBQVQs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