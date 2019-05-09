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
  exports.default = undefined;
  var _flipper = global.Flipper;

  var _electron = electronRequire("electron");

  var _react = global.React;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function formatMB(bytes) {
    return Math.floor(bytes / 1048576) + 'MB';
  }

  function formatKB(bytes) {
    return Math.floor(bytes / 1024) + 'KB';
  }

  const StyledSelect = (0, _flipper.styled)(_flipper.Select)(props => ({
    marginLeft: 6,
    marginRight: 6,
    height: '100%'
  }));
  const StyledCheckbox = (0, _flipper.styled)(_flipper.Checkbox)(props => ({
    marginLeft: 6,
    marginRight: 6,
    height: '100%'
  }));

  class ImagesCacheOverview extends _react.PureComponent {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "state", {
        selectedImage: undefined,
        size: 150
      });

      _defineProperty(this, "onImageSelected", selectedImage => {
        this.setState({
          selectedImage
        });
        this.props.onImageSelected(selectedImage);
      });

      _defineProperty(this, "onKeyDown", e => {
        const selectedImage = this.state.selectedImage;
        const imagesMap = this.props.imagesMap;

        if (selectedImage) {
          if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
            _electron.clipboard.writeText(String(imagesMap[selectedImage]));

            e.preventDefault();
          }
        }
      });

      _defineProperty(this, "onEnableDebugOverlayToggled", () => {
        this.props.onEnableDebugOverlay(!this.props.isDebugOverlayEnabled);
      });

      _defineProperty(this, "onEnableAutoRefreshToggled", () => {
        this.props.onEnableAutoRefresh(!this.props.isAutoRefreshEnabled);
      });

      _defineProperty(this, "onChangeSize", e => this.setState({
        size: parseInt(e.target.value, 10)
      }));
    }

    render() {
      const hasImages = this.props.images.reduce((c, cacheInfo) => c + cacheInfo.imageIds.length, 0) > 0;
      return global.React.createElement(ImagesCacheOverview.Container, {
        grow: true,
        onKeyDown: this.onKeyDown,
        tabIndex: "0"
      }, global.React.createElement(_flipper.Toolbar, {
        position: "top"
      }, global.React.createElement(_flipper.Button, {
        icon: "cross-outline",
        onClick: this.props.onTrimMemory
      }, "Trim Memory"), global.React.createElement(_flipper.Button, {
        onClick: this.onEnableDebugOverlayToggled
      }, "DebugOverlay ", this.props.isDebugOverlayEnabled ? 'ON' : 'OFF'), global.React.createElement(_flipper.Button, {
        onClick: this.props.onRefresh
      }, "Refresh"), global.React.createElement(_flipper.Button, {
        onClick: this.onEnableAutoRefreshToggled
      }, "Auto Refresh ", this.props.isAutoRefreshEnabled ? 'ON' : 'OFF'), global.React.createElement(StyledSelect, {
        options: this.props.surfaceOptions,
        selected: this.props.selectedSurface,
        onChange: this.props.onChangeSurface
      }), global.React.createElement(StyledCheckbox, {
        checked: this.props.coldStartFilter,
        onChange: this.props.onColdStartChange
      }), "Show ColdStart Images", global.React.createElement(_flipper.Spacer, null), global.React.createElement("input", {
        type: "range",
        onChange: this.onChangeSize,
        min: 50,
        max: 150,
        value: this.state.size
      })), !hasImages ? global.React.createElement(ImagesCacheOverview.Empty, null, global.React.createElement(_flipper.LoadingIndicator, null)) : global.React.createElement(ImagesCacheOverview.Content, null, this.props.images.map(data => {
        const maxSize = data.maxSizeBytes;
        const subtitle = maxSize ? formatMB(data.sizeBytes) + ' / ' + formatMB(maxSize) : formatMB(data.sizeBytes);
        const onClear = data.clearKey ? () => this.props.onClear(data.clearKey) : null;
        return global.React.createElement(ImageGrid, {
          title: data.cacheType,
          subtitle: subtitle,
          images: data.imageIds,
          onImageSelected: this.onImageSelected,
          selectedImage: this.state.selectedImage,
          imagesMap: this.props.imagesMap,
          size: this.state.size,
          events: this.props.events,
          onClear: onClear
        });
      })));
    }

  }

  exports.default = ImagesCacheOverview;

  _defineProperty(ImagesCacheOverview, "Container", (0, _flipper.styled)(_flipper.FlexColumn)({
    backgroundColor: _flipper.colors.white
  }));

  _defineProperty(ImagesCacheOverview, "Content", (0, _flipper.styled)(_flipper.FlexColumn)({
    flex: 1,
    overflow: 'auto'
  }));

  _defineProperty(ImagesCacheOverview, "Empty", (0, _flipper.styled)(_flipper.FlexBox)({
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  }));

  class ImageGrid extends _react.PureComponent {
    render() {
      const {
        images,
        onImageSelected,
        selectedImage
      } = this.props;

      if (images.length === 0) {
        return null;
      }

      return [global.React.createElement(ImageGridHeader, {
        key: "header",
        title: this.props.title,
        subtitle: this.props.subtitle,
        onClear: this.props.onClear
      }), global.React.createElement(ImageGrid.Content, {
        key: "content"
      }, images.map(imageId => global.React.createElement(ImageItem, {
        imageId: imageId,
        image: this.props.imagesMap[imageId],
        key: imageId,
        selected: selectedImage != null && selectedImage === imageId,
        onSelected: onImageSelected,
        size: this.props.size,
        numberOfRequests: this.props.events.filter(e => e.imageIds.includes(imageId)).length
      })))];
    }

  }

  _defineProperty(ImageGrid, "Content", (0, _flipper.styled)('div')({
    paddingLeft: 15
  }));

  class ImageGridHeader extends _react.PureComponent {
    render() {
      return global.React.createElement(ImageGridHeader.Container, null, global.React.createElement(ImageGridHeader.Heading, null, this.props.title), global.React.createElement(ImageGridHeader.Subtitle, null, this.props.subtitle), global.React.createElement(_flipper.Spacer, null), this.props.onClear ? global.React.createElement(ImageGridHeader.ClearButton, {
        onClick: this.props.onClear
      }, "Clear Cache") : null);
    }

  }

  _defineProperty(ImageGridHeader, "Container", (0, _flipper.styled)(_flipper.FlexRow)({
    color: _flipper.colors.dark70,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    borderBottom: `1px solid ${_flipper.colors.light10}`,
    flexShrink: 0,
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: _flipper.colors.white,
    zIndex: 3
  }));

  _defineProperty(ImageGridHeader, "Heading", (0, _flipper.styled)('span')({
    fontSize: 22,
    fontWeight: 600
  }));

  _defineProperty(ImageGridHeader, "Subtitle", (0, _flipper.styled)('span')({
    fontSize: 22,
    fontWeight: 300,
    marginLeft: 15
  }));

  _defineProperty(ImageGridHeader, "ClearButton", (0, _flipper.styled)(_flipper.Button)({
    alignSelf: 'center',
    height: 30,
    marginLeft: 'auto',
    width: 100
  }));

  class ImageItem extends _react.PureComponent {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "onClick", () => {
        this.props.onSelected(this.props.imageId);
      });
    }

    render() {
      const {
        image,
        selected,
        size,
        numberOfRequests
      } = this.props;
      return global.React.createElement(ImageItem.Container, {
        onClick: this.onClick,
        size: size
      }, numberOfRequests > 0 && image != null && global.React.createElement(ImageItem.Events, null, numberOfRequests), image != null ? global.React.createElement(ImageItem.Image, {
        src: image.data
      }) : global.React.createElement(_flipper.LoadingIndicator, {
        size: 25
      }), global.React.createElement(ImageItem.SelectedHighlight, {
        selected: selected
      }), image != null && global.React.createElement(ImageItem.HoverOverlay, {
        selected: selected,
        size: size
      }, global.React.createElement(ImageItem.MemoryLabel, null, formatKB(image.sizeBytes)), global.React.createElement(ImageItem.SizeLabel, null, image.width, "\xD7", image.height)));
    }

  }

  _defineProperty(ImageItem, "Container", (0, _flipper.styled)(_flipper.FlexBox)(({
    size
  }) => ({
    float: 'left',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    height: size,
    width: size,
    borderRadius: 4,
    marginRight: 15,
    marginBottom: 15,
    backgroundColor: _flipper.colors.light02
  })));

  _defineProperty(ImageItem, "Image", (0, _flipper.styled)('img')({
    borderRadius: 4,
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'contain'
  }));

  _defineProperty(ImageItem, "Loading", (0, _flipper.styled)('span')({
    padding: '0 0'
  }));

  _defineProperty(ImageItem, "SelectedHighlight", (0, _flipper.styled)('div')(props => ({
    borderColor: _flipper.colors.highlight,
    borderStyle: 'solid',
    borderWidth: props.selected ? 3 : 0,
    borderRadius: 4,
    boxShadow: props.selected ? `inset 0 0 0 1px ${_flipper.colors.white}` : 'none',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  })));

  _defineProperty(ImageItem, "HoverOverlay", (0, _flipper.styled)(_flipper.FlexColumn)(props => ({
    alignItems: 'center',
    backgroundColor: _flipper.colors.whiteAlpha80,
    bottom: props.selected ? 4 : 0,
    fontSize: props.size > 100 ? 16 : 11,
    justifyContent: 'center',
    left: props.selected ? 4 : 0,
    opacity: 0,
    position: 'absolute',
    right: props.selected ? 4 : 0,
    top: props.selected ? 4 : 0,
    overflow: 'hidden',
    transition: '.1s opacity',
    '&:hover': {
      opacity: 1
    }
  })));

  _defineProperty(ImageItem, "MemoryLabel", (0, _flipper.styled)('span')({
    fontWeight: 600,
    marginBottom: 6
  }));

  _defineProperty(ImageItem, "SizeLabel", (0, _flipper.styled)('span')({
    fontWeight: 300
  }));

  _defineProperty(ImageItem, "Events", (0, _flipper.styled)('div')({
    position: 'absolute',
    top: -5,
    right: -5,
    color: _flipper.colors.white,
    backgroundColor: _flipper.colors.highlight,
    fontWeight: 600,
    borderRadius: 10,
    fontSize: '0.85em',
    zIndex: 2,
    lineHeight: '20px',
    width: 20,
    textAlign: 'center'
  }));

  _defineProperty(ImageItem, "defaultProps", {
    size: 150
  });
},-1606035368,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  const maxInflightRequests = 10;

  class ImagePool {
    constructor(fetchImage, onPoolUpdated) {
      _defineProperty(this, "cache", {});

      _defineProperty(this, "requested", {});

      _defineProperty(this, "queued", []);

      _defineProperty(this, "inFlightRequests", 0);

      _defineProperty(this, "fetchImage", undefined);

      _defineProperty(this, "updateNotificationScheduled", false);

      _defineProperty(this, "onPoolUpdated", undefined);

      _defineProperty(this, "_notify", () => {
        this.updateNotificationScheduled = false;
        this.onPoolUpdated(this.getImages());
      });

      this.fetchImage = fetchImage;
      this.onPoolUpdated = onPoolUpdated;
    }

    getImages() {
      return _objectSpread({}, this.cache);
    }

    fetchImages(ids) {
      for (const id of ids) {
        if (!this.cache[id] && !this.requested[id]) {
          this.requested[id] = true;

          if (this.inFlightRequests < maxInflightRequests) {
            this.inFlightRequests++;
            this.fetchImage(id);
          } else {
            this.queued.unshift(id);
          }
        }
      }
    }

    clear() {
      this.cache = {};
      this.requested = {};
    }

    _fetchCompleted(image) {
      this.cache[image.imageId] = image;
      delete this.requested[image.imageId];

      if (this.queued.length > 0) {
        this.fetchImage(this.queued.pop());
      } else {
        this.inFlightRequests--;
      }

      if (!this.updateNotificationScheduled) {
        this.updateNotificationScheduled = true;
        window.setTimeout(this._notify, 1000);
      }
    }

  }

  exports.default = ImagePool;
},-1596996540,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _flipper = global.Flipper;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  const DataDescriptionKey = (0, _flipper.styled)('span')({
    color: _flipper.colors.grapeDark1
  });

  class ImagesSidebar extends _flipper.Component {
    render() {
      return global.React.createElement("div", null, this.renderUri(), this.props.events.map(e => global.React.createElement(EventDetails, {
        key: e.eventId,
        event: e
      })));
    }

    renderUri() {
      if (!this.props.image) {
        return null;
      }

      if (!this.props.image.uri) {
        return null;
      }

      return global.React.createElement("p", null, global.React.createElement(DataDescriptionKey, null, "URI"), global.React.createElement("span", {
        key: "sep"
      }, ": "), global.React.createElement(_flipper.DataDescription, {
        type: "string",
        value: this.props.image.uri,
        setValue: function (path, val) {}
      }));
    }

  }

  exports.default = ImagesSidebar;

  class EventDetails extends _flipper.Component {
    render() {
      const {
        event
      } = this.props;
      return global.React.createElement(EventDetails.Container, {
        heading: global.React.createElement(RequestHeader, {
          event: event
        }),
        floating: false,
        padded: false,
        grow: false,
        collapsed: false
      }, global.React.createElement("p", null, global.React.createElement(DataDescriptionKey, null, "Attribution"), global.React.createElement("span", {
        key: "sep"
      }, ": "), global.React.createElement(_flipper.ManagedDataInspector, {
        data: event.attribution
      })), global.React.createElement("p", null, global.React.createElement(DataDescriptionKey, null, "Time start"), global.React.createElement("span", {
        key: "sep"
      }, ": "), global.React.createElement(_flipper.DataDescription, {
        type: "number",
        value: event.startTime,
        setValue: function (path, val) {}
      })), global.React.createElement("p", null, global.React.createElement(DataDescriptionKey, null, "Time end"), global.React.createElement("span", {
        key: "sep"
      }, ": "), global.React.createElement(_flipper.DataDescription, {
        type: "number",
        value: event.endTime,
        setValue: function (path, val) {}
      })), global.React.createElement("p", null, global.React.createElement(DataDescriptionKey, null, "Source"), global.React.createElement("span", {
        key: "sep"
      }, ": "), global.React.createElement(_flipper.DataDescription, {
        type: "string",
        value: event.source,
        setValue: function (path, val) {}
      })), global.React.createElement("p", null, global.React.createElement(DataDescriptionKey, null, "Requested on cold start"), global.React.createElement("span", {
        key: "sep"
      }, ": "), global.React.createElement(_flipper.DataDescription, {
        type: "boolean",
        value: event.coldStart,
        setValue: null
      })), this.renderViewportData());
    }

    renderViewportData() {
      const viewport = this.props.event.viewport;

      if (!viewport) {
        return null;
      }

      return global.React.createElement("p", null, global.React.createElement(DataDescriptionKey, null, "Viewport"), global.React.createElement("span", {
        key: "sep"
      }, ": "), global.React.createElement(_flipper.DataDescription, {
        type: "string",
        value: viewport.width + 'x' + viewport.height,
        setValue: function (path, val) {}
      }));
    }

  }

  _defineProperty(EventDetails, "Container", (0, _flipper.styled)(_flipper.Panel)({
    flexShrink: 0,
    marginTop: '15px'
  }));

  class RequestHeader extends _flipper.Component {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "dateString", timestamp => {
        const date = new Date(timestamp);
        return `${date.toTimeString().split(' ')[0]}.${('000' + date.getMilliseconds()).substr(-3)}`;
      });
    }

    render() {
      const {
        event
      } = this.props;
      const durationMs = event.endTime - event.startTime;
      return global.React.createElement(_flipper.Text, null, event.viewport ? 'Request' : 'Prefetch', " at", ' ', this.dateString(event.startTime), " (", durationMs, "ms)");
    }

  }
},-1465193097,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _react = _interopRequireDefault(global.React);

  var _ImagesCacheOverview = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[0]));

  var _flipper = global.Flipper;

  var _ImagesSidebar = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _ImagePool = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  const EmptySidebar = (0, _flipper.styled)(_flipper.FlexRow)({
    alignItems: 'center',
    justifyContent: 'center',
    color: _flipper.colors.light30,
    padding: 15,
    fontSize: 16
  });
  const DEBUG = false;
  const surfaceDefaultText = 'SELECT ALL SURFACES';

  class _class extends _flipper.FlipperPlugin {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "state", undefined);

      _defineProperty(this, "imagePool", undefined);

      _defineProperty(this, "nextEventId", 1);

      _defineProperty(this, "state", {
        selectedSurface: surfaceDefaultText,
        selectedImage: null,
        isDebugOverlayEnabled: false,
        isAutoRefreshEnabled: false,
        images: [],
        coldStartFilter: false
      });

      _defineProperty(this, "filterImages", (images, events, surface, coldStart) => {
        if (!surface || surface === surfaceDefaultText && !coldStart) {
          return images;
        }

        const imageList = images.map(image => {
          const imageIdList = image.imageIds.filter(imageID => {
            const filteredEvents = events.filter(event => {
              const output = event.attribution && event.attribution.length > 0 && event.imageIds && event.imageIds.includes(imageID);

              if (surface === surfaceDefaultText) {
                return output && coldStart && event.coldStart;
              }

              return (!coldStart || coldStart && event.coldStart) && output && event.attribution[0] == surface;
            });
            return filteredEvents.length > 0;
          });
          return _objectSpread({}, image, {
            imageIds: imageIdList
          });
        });
        return imageList;
      });

      _defineProperty(this, "updateImagesOnUI", (images, surface, coldStart) => {
        const filteredImages = this.filterImages(images, this.props.persistedState.events, surface, coldStart);
        this.setState({
          selectedSurface: surface,
          images: filteredImages,
          coldStartFilter: coldStart
        });
      });

      _defineProperty(this, "updateCaches", reason => {
        this.client.call('listImages').then(response => {
          response.levels.forEach(data => this.imagePool.fetchImages(data.imageIds));
          this.props.setPersistedState({
            images: response.levels
          });
          this.updateImagesOnUI(this.props.persistedState.images, this.state.selectedSurface, this.state.coldStartFilter);
        });
      });

      _defineProperty(this, "onClear", type => {
        this.client.call('clear', {
          type
        });
        setTimeout(() => this.updateCaches('onClear'), 1000);
      });

      _defineProperty(this, "onTrimMemory", () => {
        this.client.call('trimMemory', {});
        setTimeout(() => this.updateCaches('onTrimMemory'), 1000);
      });

      _defineProperty(this, "onEnableDebugOverlay", enabled => {
        this.client.call('enableDebugOverlay', {
          enabled
        });
      });

      _defineProperty(this, "onEnableAutoRefresh", enabled => {
        this.setState({
          isAutoRefreshEnabled: enabled
        });

        if (enabled) {
          setTimeout(() => this.onAutoRefresh());
        }
      });

      _defineProperty(this, "onAutoRefresh", () => {
        this.updateCaches('auto-refresh');

        if (this.state.isAutoRefreshEnabled) {
          setTimeout(() => this.onAutoRefresh(), 1000);
        }
      });

      _defineProperty(this, "getImage", imageId => {
        this.client.call('getImage', {
          imageId
        }).then(image => {
          this.imagePool._fetchCompleted(image);
        });
      });

      _defineProperty(this, "onImageSelected", selectedImage => this.setState({
        selectedImage
      }));

      _defineProperty(this, "renderSidebar", () => {
        const {
          selectedImage
        } = this.state;

        if (selectedImage == null) {
          return _react.default.createElement(EmptySidebar, {
            grow: true
          }, _react.default.createElement(_flipper.Text, {
            align: "center"
          }, "Select an image to see the events associated with it."));
        }

        const maybeImage = this.props.persistedState.imagesMap[selectedImage];
        const events = this.props.persistedState.events.filter(e => e.imageIds.includes(selectedImage));
        return _react.default.createElement(_ImagesSidebar.default, {
          image: maybeImage,
          events: events
        });
      });

      _defineProperty(this, "onSurfaceChange", surface => {
        this.updateImagesOnUI(this.props.persistedState.images, surface, this.state.coldStartFilter);
      });

      _defineProperty(this, "onColdStartChange", checked => {
        this.updateImagesOnUI(this.props.persistedState.images, this.state.selectedSurface, checked);
      });
    }

    init() {
      this.updateCaches('init');
      this.client.subscribe('events', event => {
        const {
          surfaceList
        } = this.props.persistedState;
        const {
          attribution
        } = event;

        if (attribution instanceof Array && attribution.length > 0) {
          const surface = attribution[0].trim();

          if (surface.length > 0) {
            surfaceList.add(surface);
          }
        }

        this.props.setPersistedState({
          events: [_objectSpread({
            eventId: this.nextEventId
          }, event), ...this.props.persistedState.events]
        });
        this.nextEventId++;
      });
      this.client.subscribe('debug_overlay_event', event => {
        this.setState({
          isDebugOverlayEnabled: event.enabled
        });
      });
      this.imagePool = new _ImagePool.default(this.getImage, images => this.props.setPersistedState({
        imagesMap: images
      }));
    }

    teardown() {
      this.imagePool.clear();
    }

    render() {
      const options = [...this.props.persistedState.surfaceList].reduce((acc, item) => {
        return _objectSpread({}, acc, {
          [item]: item
        });
      }, {
        [surfaceDefaultText]: surfaceDefaultText
      });
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ImagesCacheOverview.default, {
        surfaceOptions: options,
        selectedSurface: this.state.selectedSurface,
        onChangeSurface: this.onSurfaceChange,
        coldStartFilter: this.state.coldStartFilter,
        onColdStartChange: this.onColdStartChange,
        images: this.state.images,
        onClear: this.onClear,
        onTrimMemory: this.onTrimMemory,
        onRefresh: () => this.updateCaches('refresh'),
        onEnableDebugOverlay: this.onEnableDebugOverlay,
        onEnableAutoRefresh: this.onEnableAutoRefresh,
        isDebugOverlayEnabled: this.state.isDebugOverlayEnabled,
        isAutoRefreshEnabled: this.state.isAutoRefreshEnabled,
        onImageSelected: this.onImageSelected,
        imagesMap: this.props.persistedState.imagesMap,
        events: this.props.persistedState.events
      }), _react.default.createElement(_flipper.DetailSidebar, null, this.renderSidebar()));
    }

  }

  exports.default = _class;

  _defineProperty(_class, "defaultPersistedState", {
    images: [],
    events: [],
    imagesMap: {},
    surfaceList: new Set()
  });
},376458121,[-1606035368,-1465193097,-1596996540]);
module.exports = global.__r(376458121).default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9fcHJlbHVkZV9fIiwiL2RhdGEvc2FuZGNhc3RsZS9ib3hlcy90cnVuay1oZy1mYmNvZGUtZmJzb3VyY2UveHBsYXQvZmxpcHBlci1wdWJsaWMvc3RhdGljL25vZGVfbW9kdWxlcy9tZXRyby9zcmMvbGliL3BvbHlmaWxscy9yZXF1aXJlLmpzIiwiL2RhdGEvc2FuZGNhc3RsZS9ib3hlcy90cnVuay1oZy1mYmNvZGUtZmJzb3VyY2UveHBsYXQvZmxpcHBlci1wdWJsaWMvc3JjL3BsdWdpbnMvZnJlc2NvL2luZGV4LmpzIiwiL2RhdGEvc2FuZGNhc3RsZS9ib3hlcy90cnVuay1oZy1mYmNvZGUtZmJzb3VyY2UveHBsYXQvZmxpcHBlci1wdWJsaWMvc3JjL3BsdWdpbnMvZnJlc2NvL0ltYWdlc0NhY2hlT3ZlcnZpZXcuanMiLCIvZGF0YS9zYW5kY2FzdGxlL2JveGVzL3RydW5rLWhnLWZiY29kZS1mYnNvdXJjZS94cGxhdC9mbGlwcGVyLXB1YmxpYy9zcmMvcGx1Z2lucy9mcmVzY28vSW1hZ2VzU2lkZWJhci5qcyIsIi9kYXRhL3NhbmRjYXN0bGUvYm94ZXMvdHJ1bmstaGctZmJjb2RlLWZic291cmNlL3hwbGF0L2ZsaXBwZXItcHVibGljL3NyYy9wbHVnaW5zL2ZyZXNjby9JbWFnZVBvb2wuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fREVWX189ZmFsc2UsX19CVU5ETEVfU1RBUlRfVElNRV9fPXRoaXMubmF0aXZlUGVyZm9ybWFuY2VOb3c/bmF0aXZlUGVyZm9ybWFuY2VOb3coKTpEYXRlLm5vdygpLHByb2Nlc3M9dGhpcy5wcm9jZXNzfHx7fTtwcm9jZXNzLmVudj1wcm9jZXNzLmVudnx8e307cHJvY2Vzcy5lbnYuTk9ERV9FTlY9XCJwcm9kdWN0aW9uXCI7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIEZhY2Vib29rLCBJbmMuIGFuZCBpdHMgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAcG9seWZpbGxcbiAqXG4gKiBAZm9ybWF0XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UgKi9cblxuZ2xvYmFsLl9fciA9IG1ldHJvUmVxdWlyZTtcbmdsb2JhbC5fX2QgPSBkZWZpbmU7XG5nbG9iYWwuX19jID0gY2xlYXI7XG5cbnZhciBtb2R1bGVzID0gY2xlYXIoKTtcblxuLy8gRG9uJ3QgdXNlIGEgU3ltYm9sIGhlcmUsIGl0IHdvdWxkIHB1bGwgaW4gYW4gZXh0cmEgcG9seWZpbGwgd2l0aCBhbGwgc29ydHMgb2Zcbi8vIGFkZGl0aW9uYWwgc3R1ZmYgKGUuZy4gQXJyYXkuZnJvbSkuXG52YXIgRU1QVFkgPSB7fTtcbnZhciBfcmVmID0ge30sXG4gIGhhc093blByb3BlcnR5ID0gX3JlZi5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gY2xlYXIoKSB7XG4gIG1vZHVsZXMgPVxuICAgIHR5cGVvZiBfX05VTV9NT0RVTEVTX18gPT09IFwibnVtYmVyXCJcbiAgICAgID8gQXJyYXkoX19OVU1fTU9EVUxFU19fIHwgMClcbiAgICAgIDogT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAvLyBXZSByZXR1cm4gbW9kdWxlcyBoZXJlIHNvIHRoYXQgd2UgY2FuIGFzc2lnbiBhbiBpbml0aWFsIHZhbHVlIHRvIG1vZHVsZXNcbiAgLy8gd2hlbiBkZWZpbmluZyBpdC4gT3RoZXJ3aXNlLCB3ZSB3b3VsZCBoYXZlIHRvIGRvIFwibGV0IG1vZHVsZXMgPSBudWxsXCIsXG4gIC8vIHdoaWNoIHdpbGwgZm9yY2UgdXMgdG8gYWRkIFwibnVsbHRocm93c1wiIGV2ZXJ5d2hlcmUuXG4gIHJldHVybiBtb2R1bGVzO1xufVxuXG5pZiAoX19ERVZfXykge1xuICB2YXIgdmVyYm9zZU5hbWVzVG9Nb2R1bGVJZHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB2YXIgaW5pdGlhbGl6aW5nTW9kdWxlSWRzID0gW107XG59XG5cbmZ1bmN0aW9uIGRlZmluZShmYWN0b3J5LCBtb2R1bGVJZCwgZGVwZW5kZW5jeU1hcCkge1xuICBpZiAobW9kdWxlc1ttb2R1bGVJZF0gIT0gbnVsbCkge1xuICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICAvLyAoV2UgdGFrZSBgaW52ZXJzZURlcGVuZGVuY2llc2AgZnJvbSBgYXJndW1lbnRzYCB0byBhdm9pZCBhbiB1bnVzZWRcbiAgICAgIC8vIG5hbWVkIHBhcmFtZXRlciBpbiBgZGVmaW5lYCBpbiBwcm9kdWN0aW9uLlxuICAgICAgdmFyIGludmVyc2VEZXBlbmRlbmNpZXMgPSBhcmd1bWVudHNbNF07XG5cbiAgICAgIC8vIElmIHRoZSBtb2R1bGUgaGFzIGFscmVhZHkgYmVlbiBkZWZpbmVkIGFuZCB0aGUgZGVmaW5lIG1ldGhvZCBoYXMgYmVlblxuICAgICAgLy8gY2FsbGVkIHdpdGggaW52ZXJzZURlcGVuZGVuY2llcywgd2UgY2FuIGhvdCByZWxvYWQgaXQuXG4gICAgICBpZiAoaW52ZXJzZURlcGVuZGVuY2llcykge1xuICAgICAgICBnbG9iYWwuX19hY2NlcHQobW9kdWxlSWQsIGZhY3RvcnksIGRlcGVuZGVuY3lNYXAsIGludmVyc2VEZXBlbmRlbmNpZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIFwiVHJ5aW5nIHRvIGRlZmluZSB0d2ljZSBtb2R1bGUgSUQgXCIgKyBtb2R1bGVJZCArIFwiIGluIHRoZSBzYW1lIGJ1bmRsZVwiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcHJldmVudCByZXBlYXRlZCBjYWxscyB0byBgZ2xvYmFsLm5hdGl2ZVJlcXVpcmVgIHRvIG92ZXJ3cml0ZSBtb2R1bGVzXG4gICAgLy8gdGhhdCBhcmUgYWxyZWFkeSBsb2FkZWRcbiAgICByZXR1cm47XG4gIH1cbiAgbW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gICAgZGVwZW5kZW5jeU1hcDogZGVwZW5kZW5jeU1hcCxcbiAgICBmYWN0b3J5OiBmYWN0b3J5LFxuICAgIGhhc0Vycm9yOiBmYWxzZSxcbiAgICBpbXBvcnRlZEFsbDogRU1QVFksXG4gICAgaW1wb3J0ZWREZWZhdWx0OiBFTVBUWSxcbiAgICBpc0luaXRpYWxpemVkOiBmYWxzZSxcbiAgICBwdWJsaWNNb2R1bGU6IHsgZXhwb3J0czoge30gfVxuICB9O1xuICBpZiAoX19ERVZfXykge1xuICAgIC8vIEhNUlxuICAgIG1vZHVsZXNbbW9kdWxlSWRdLmhvdCA9IGNyZWF0ZUhvdFJlbG9hZGluZ09iamVjdCgpO1xuXG4gICAgLy8gREVCVUdHQUJMRSBNT0RVTEVTIE5BTUVTXG4gICAgLy8gd2UgdGFrZSBgdmVyYm9zZU5hbWVgIGZyb20gYGFyZ3VtZW50c2AgdG8gYXZvaWQgYW4gdW51c2VkIG5hbWVkIHBhcmFtZXRlclxuICAgIC8vIGluIGBkZWZpbmVgIGluIHByb2R1Y3Rpb24uXG4gICAgdmFyIF92ZXJib3NlTmFtZSA9IGFyZ3VtZW50c1szXTtcbiAgICBpZiAoX3ZlcmJvc2VOYW1lKSB7XG4gICAgICBtb2R1bGVzW21vZHVsZUlkXS52ZXJib3NlTmFtZSA9IF92ZXJib3NlTmFtZTtcbiAgICAgIHZlcmJvc2VOYW1lc1RvTW9kdWxlSWRzW192ZXJib3NlTmFtZV0gPSBtb2R1bGVJZDtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbWV0cm9SZXF1aXJlKG1vZHVsZUlkKSB7XG4gIGlmIChfX0RFVl9fICYmIHR5cGVvZiBtb2R1bGVJZCA9PT0gXCJzdHJpbmdcIikge1xuICAgIHZhciBfdmVyYm9zZU5hbWUyID0gbW9kdWxlSWQ7XG4gICAgbW9kdWxlSWQgPSB2ZXJib3NlTmFtZXNUb01vZHVsZUlkc1tfdmVyYm9zZU5hbWUyXTtcbiAgICBpZiAobW9kdWxlSWQgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIG5hbWVkIG1vZHVsZTogXCInICsgX3ZlcmJvc2VOYW1lMiArICdcIicpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdSZXF1aXJpbmcgbW9kdWxlIFwiJyArXG4gICAgICAgICAgX3ZlcmJvc2VOYW1lMiArXG4gICAgICAgICAgJ1wiIGJ5IG5hbWUgaXMgb25seSBzdXBwb3J0ZWQgZm9yICcgK1xuICAgICAgICAgIFwiZGVidWdnaW5nIHB1cnBvc2VzIGFuZCB3aWxsIEJSRUFLIElOIFBST0RVQ1RJT04hXCJcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLy8kRmxvd0ZpeE1lOiBhdCB0aGlzIHBvaW50IHdlIGtub3cgdGhhdCBtb2R1bGVJZCBpcyBhIG51bWJlclxuICB2YXIgbW9kdWxlSWRSZWFsbHlJc051bWJlciA9IG1vZHVsZUlkO1xuXG4gIGlmIChfX0RFVl9fKSB7XG4gICAgdmFyIGluaXRpYWxpemluZ0luZGV4ID0gaW5pdGlhbGl6aW5nTW9kdWxlSWRzLmluZGV4T2YoXG4gICAgICBtb2R1bGVJZFJlYWxseUlzTnVtYmVyXG4gICAgKTtcbiAgICBpZiAoaW5pdGlhbGl6aW5nSW5kZXggIT09IC0xKSB7XG4gICAgICB2YXIgY3ljbGUgPSBpbml0aWFsaXppbmdNb2R1bGVJZHNcbiAgICAgICAgLnNsaWNlKGluaXRpYWxpemluZ0luZGV4KVxuICAgICAgICAubWFwKGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgICAgcmV0dXJuIG1vZHVsZXNbaWRdLnZlcmJvc2VOYW1lO1xuICAgICAgICB9KTtcbiAgICAgIC8vIFdlIHdhbnQgdG8gc2hvdyBBIC0+IEIgLT4gQTpcbiAgICAgIGN5Y2xlLnB1c2goY3ljbGVbMF0pO1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBcIlJlcXVpcmUgY3ljbGU6IFwiICtcbiAgICAgICAgICBjeWNsZS5qb2luKFwiIC0+IFwiKSArXG4gICAgICAgICAgXCJcXG5cXG5cIiArXG4gICAgICAgICAgXCJSZXF1aXJlIGN5Y2xlcyBhcmUgYWxsb3dlZCwgYnV0IGNhbiByZXN1bHQgaW4gdW5pbml0aWFsaXplZCB2YWx1ZXMuIFwiICtcbiAgICAgICAgICBcIkNvbnNpZGVyIHJlZmFjdG9yaW5nIHRvIHJlbW92ZSB0aGUgbmVlZCBmb3IgYSBjeWNsZS5cIlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICB2YXIgbW9kdWxlID0gbW9kdWxlc1ttb2R1bGVJZFJlYWxseUlzTnVtYmVyXTtcblxuICByZXR1cm4gbW9kdWxlICYmIG1vZHVsZS5pc0luaXRpYWxpemVkXG4gICAgPyBtb2R1bGUucHVibGljTW9kdWxlLmV4cG9ydHNcbiAgICA6IGd1YXJkZWRMb2FkTW9kdWxlKG1vZHVsZUlkUmVhbGx5SXNOdW1iZXIsIG1vZHVsZSk7XG59XG5cbmZ1bmN0aW9uIG1ldHJvSW1wb3J0RGVmYXVsdChtb2R1bGVJZCkge1xuICBpZiAoX19ERVZfXyAmJiB0eXBlb2YgbW9kdWxlSWQgPT09IFwic3RyaW5nXCIpIHtcbiAgICB2YXIgX3ZlcmJvc2VOYW1lMyA9IG1vZHVsZUlkO1xuICAgIG1vZHVsZUlkID0gdmVyYm9zZU5hbWVzVG9Nb2R1bGVJZHNbX3ZlcmJvc2VOYW1lM107XG4gIH1cblxuICAvLyRGbG93Rml4TWU6IGF0IHRoaXMgcG9pbnQgd2Uga25vdyB0aGF0IG1vZHVsZUlkIGlzIGEgbnVtYmVyXG4gIHZhciBtb2R1bGVJZFJlYWxseUlzTnVtYmVyID0gbW9kdWxlSWQ7XG5cbiAgaWYgKFxuICAgIG1vZHVsZXNbbW9kdWxlSWRSZWFsbHlJc051bWJlcl0gJiZcbiAgICBtb2R1bGVzW21vZHVsZUlkUmVhbGx5SXNOdW1iZXJdLmltcG9ydGVkRGVmYXVsdCAhPT0gRU1QVFlcbiAgKSB7XG4gICAgcmV0dXJuIG1vZHVsZXNbbW9kdWxlSWRSZWFsbHlJc051bWJlcl0uaW1wb3J0ZWREZWZhdWx0O1xuICB9XG5cbiAgdmFyIGV4cG9ydHMgPSBtZXRyb1JlcXVpcmUobW9kdWxlSWRSZWFsbHlJc051bWJlcik7XG4gIHZhciBpbXBvcnRlZERlZmF1bHQgPVxuICAgIGV4cG9ydHMgJiYgZXhwb3J0cy5fX2VzTW9kdWxlID8gZXhwb3J0cy5kZWZhdWx0IDogZXhwb3J0cztcblxuICByZXR1cm4gKG1vZHVsZXNbbW9kdWxlSWRSZWFsbHlJc051bWJlcl0uaW1wb3J0ZWREZWZhdWx0ID0gaW1wb3J0ZWREZWZhdWx0KTtcbn1cblxuZnVuY3Rpb24gbWV0cm9JbXBvcnRBbGwobW9kdWxlSWQpIHtcbiAgaWYgKF9fREVWX18gJiYgdHlwZW9mIG1vZHVsZUlkID09PSBcInN0cmluZ1wiKSB7XG4gICAgdmFyIF92ZXJib3NlTmFtZTQgPSBtb2R1bGVJZDtcbiAgICBtb2R1bGVJZCA9IHZlcmJvc2VOYW1lc1RvTW9kdWxlSWRzW192ZXJib3NlTmFtZTRdO1xuICB9XG5cbiAgLy8kRmxvd0ZpeE1lOiBhdCB0aGlzIHBvaW50IHdlIGtub3cgdGhhdCBtb2R1bGVJZCBpcyBhIG51bWJlclxuICB2YXIgbW9kdWxlSWRSZWFsbHlJc051bWJlciA9IG1vZHVsZUlkO1xuXG4gIGlmIChcbiAgICBtb2R1bGVzW21vZHVsZUlkUmVhbGx5SXNOdW1iZXJdICYmXG4gICAgbW9kdWxlc1ttb2R1bGVJZFJlYWxseUlzTnVtYmVyXS5pbXBvcnRlZEFsbCAhPT0gRU1QVFlcbiAgKSB7XG4gICAgcmV0dXJuIG1vZHVsZXNbbW9kdWxlSWRSZWFsbHlJc051bWJlcl0uaW1wb3J0ZWRBbGw7XG4gIH1cblxuICB2YXIgZXhwb3J0cyA9IG1ldHJvUmVxdWlyZShtb2R1bGVJZFJlYWxseUlzTnVtYmVyKTtcbiAgdmFyIGltcG9ydGVkQWxsID0gdm9pZCAwO1xuXG4gIGlmIChleHBvcnRzICYmIGV4cG9ydHMuX19lc01vZHVsZSkge1xuICAgIGltcG9ydGVkQWxsID0gZXhwb3J0cztcbiAgfSBlbHNlIHtcbiAgICBpbXBvcnRlZEFsbCA9IHt9O1xuXG4gICAgLy8gUmVmcmFpbiBmcm9tIHVzaW5nIE9iamVjdC5hc3NpZ24sIGl0IGhhcyB0byB3b3JrIGluIEVTMyBlbnZpcm9ubWVudHMuXG4gICAgaWYgKGV4cG9ydHMpIHtcbiAgICAgIGZvciAodmFyIF9rZXkgaW4gZXhwb3J0cykge1xuICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBfa2V5KSkge1xuICAgICAgICAgIGltcG9ydGVkQWxsW19rZXldID0gZXhwb3J0c1tfa2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGltcG9ydGVkQWxsLmRlZmF1bHQgPSBleHBvcnRzO1xuICB9XG5cbiAgcmV0dXJuIChtb2R1bGVzW21vZHVsZUlkUmVhbGx5SXNOdW1iZXJdLmltcG9ydGVkQWxsID0gaW1wb3J0ZWRBbGwpO1xufVxuXG52YXIgaW5HdWFyZCA9IGZhbHNlO1xuZnVuY3Rpb24gZ3VhcmRlZExvYWRNb2R1bGUobW9kdWxlSWQsIG1vZHVsZSkge1xuICBpZiAoIWluR3VhcmQgJiYgZ2xvYmFsLkVycm9yVXRpbHMpIHtcbiAgICBpbkd1YXJkID0gdHJ1ZTtcbiAgICB2YXIgcmV0dXJuVmFsdWUgPSB2b2lkIDA7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVyblZhbHVlID0gbG9hZE1vZHVsZUltcGxlbWVudGF0aW9uKG1vZHVsZUlkLCBtb2R1bGUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGdsb2JhbC5FcnJvclV0aWxzLnJlcG9ydEZhdGFsRXJyb3IoZSk7XG4gICAgfVxuICAgIGluR3VhcmQgPSBmYWxzZTtcbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxvYWRNb2R1bGVJbXBsZW1lbnRhdGlvbihtb2R1bGVJZCwgbW9kdWxlKTtcbiAgfVxufVxuXG52YXIgSURfTUFTS19TSElGVCA9IDE2O1xudmFyIExPQ0FMX0lEX01BU0sgPSB+MCA+Pj4gSURfTUFTS19TSElGVDtcblxuZnVuY3Rpb24gdW5wYWNrTW9kdWxlSWQobW9kdWxlSWQpIHtcbiAgdmFyIHNlZ21lbnRJZCA9IG1vZHVsZUlkID4+PiBJRF9NQVNLX1NISUZUO1xuICB2YXIgbG9jYWxJZCA9IG1vZHVsZUlkICYgTE9DQUxfSURfTUFTSztcbiAgcmV0dXJuIHsgc2VnbWVudElkOiBzZWdtZW50SWQsIGxvY2FsSWQ6IGxvY2FsSWQgfTtcbn1cbm1ldHJvUmVxdWlyZS51bnBhY2tNb2R1bGVJZCA9IHVucGFja01vZHVsZUlkO1xuXG5mdW5jdGlvbiBwYWNrTW9kdWxlSWQodmFsdWUpIHtcbiAgcmV0dXJuICh2YWx1ZS5zZWdtZW50SWQgPDwgSURfTUFTS19TSElGVCkgKyB2YWx1ZS5sb2NhbElkO1xufVxubWV0cm9SZXF1aXJlLnBhY2tNb2R1bGVJZCA9IHBhY2tNb2R1bGVJZDtcblxudmFyIGhvb2tzID0gW107XG5mdW5jdGlvbiByZWdpc3Rlckhvb2soY2IpIHtcbiAgdmFyIGhvb2sgPSB7IGNiOiBjYiB9O1xuICBob29rcy5wdXNoKGhvb2spO1xuICByZXR1cm4ge1xuICAgIHJlbGVhc2U6IGZ1bmN0aW9uIHJlbGVhc2UoKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhvb2tzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChob29rc1tpXSA9PT0gaG9vaykge1xuICAgICAgICAgIGhvb2tzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbm1ldHJvUmVxdWlyZS5yZWdpc3Rlckhvb2sgPSByZWdpc3Rlckhvb2s7XG5cbmZ1bmN0aW9uIGxvYWRNb2R1bGVJbXBsZW1lbnRhdGlvbihtb2R1bGVJZCwgbW9kdWxlKSB7XG4gIGlmICghbW9kdWxlICYmIGdsb2JhbC5fX2RlZmluZU1vZHVsZSkge1xuICAgIGdsb2JhbC5fX2RlZmluZU1vZHVsZShtb2R1bGVJZCk7XG4gICAgbW9kdWxlID0gbW9kdWxlc1ttb2R1bGVJZF07XG4gIH1cblxuICB2YXIgbmF0aXZlUmVxdWlyZSA9IGdsb2JhbC5uYXRpdmVSZXF1aXJlO1xuICBpZiAoIW1vZHVsZSAmJiBuYXRpdmVSZXF1aXJlKSB7XG4gICAgdmFyIF91bnBhY2tNb2R1bGVJZCA9IHVucGFja01vZHVsZUlkKG1vZHVsZUlkKSxcbiAgICAgIF9zZWdtZW50SWQgPSBfdW5wYWNrTW9kdWxlSWQuc2VnbWVudElkLFxuICAgICAgX2xvY2FsSWQgPSBfdW5wYWNrTW9kdWxlSWQubG9jYWxJZDtcblxuICAgIG5hdGl2ZVJlcXVpcmUoX2xvY2FsSWQsIF9zZWdtZW50SWQpO1xuICAgIG1vZHVsZSA9IG1vZHVsZXNbbW9kdWxlSWRdO1xuICB9XG5cbiAgaWYgKCFtb2R1bGUpIHtcbiAgICB0aHJvdyB1bmtub3duTW9kdWxlRXJyb3IobW9kdWxlSWQpO1xuICB9XG5cbiAgaWYgKG1vZHVsZS5oYXNFcnJvcikge1xuICAgIHRocm93IG1vZHVsZVRocmV3RXJyb3IobW9kdWxlSWQsIG1vZHVsZS5lcnJvcik7XG4gIH1cblxuICAvLyBgbWV0cm9SZXF1aXJlYCBjYWxscyBpbnRvIHRoZSByZXF1aXJlIHBvbHlmaWxsIGl0c2VsZiBhcmUgbm90IGFuYWx5emVkIGFuZFxuICAvLyByZXBsYWNlZCBzbyB0aGF0IHRoZXkgdXNlIG51bWVyaWMgbW9kdWxlIElEcy5cbiAgLy8gVGhlIHN5c3RyYWNlIG1vZHVsZSB3aWxsIGV4cG9zZSBpdHNlbGYgb24gdGhlIG1ldHJvUmVxdWlyZSBmdW5jdGlvbiBzbyB0aGF0XG4gIC8vIGl0IGNhbiBiZSB1c2VkIGhlcmUuXG4gIC8vIFRPRE8oZGF2aWRhdXJlbGlvKSBTY2FuIHBvbHlmaWxscyBmb3IgZGVwZW5kZW5jaWVzLCB0b28gKHQ5NzU5Njg2KVxuICBpZiAoX19ERVZfXykge1xuICAgIHZhciBTeXN0cmFjZSA9IG1ldHJvUmVxdWlyZS5TeXN0cmFjZTtcbiAgfVxuXG4gIC8vIFdlIG11c3Qgb3B0aW1pc3RpY2FsbHkgbWFyayBtb2R1bGUgYXMgaW5pdGlhbGl6ZWQgYmVmb3JlIHJ1bm5pbmcgdGhlXG4gIC8vIGZhY3RvcnkgdG8ga2VlcCBhbnkgcmVxdWlyZSBjeWNsZXMgaW5zaWRlIHRoZSBmYWN0b3J5IGZyb20gY2F1c2luZyBhblxuICAvLyBpbmZpbml0ZSByZXF1aXJlIGxvb3AuXG4gIG1vZHVsZS5pc0luaXRpYWxpemVkID0gdHJ1ZTtcblxuICB2YXIgX21vZHVsZSA9IG1vZHVsZSxcbiAgICBmYWN0b3J5ID0gX21vZHVsZS5mYWN0b3J5LFxuICAgIGRlcGVuZGVuY3lNYXAgPSBfbW9kdWxlLmRlcGVuZGVuY3lNYXA7XG5cbiAgaWYgKF9fREVWX18pIHtcbiAgICBpbml0aWFsaXppbmdNb2R1bGVJZHMucHVzaChtb2R1bGVJZCk7XG4gIH1cbiAgdHJ5IHtcbiAgICBpZiAoX19ERVZfXykge1xuICAgICAgLy8gJEZsb3dGaXhNZTogd2Uga25vdyB0aGF0IF9fREVWX18gaXMgY29uc3QgYW5kIGBTeXN0cmFjZWAgZXhpc3RzXG4gICAgICBTeXN0cmFjZS5iZWdpbkV2ZW50KFwiSlNfcmVxdWlyZV9cIiArIChtb2R1bGUudmVyYm9zZU5hbWUgfHwgbW9kdWxlSWQpKTtcbiAgICB9XG5cbiAgICB2YXIgX21vZHVsZU9iamVjdCA9IG1vZHVsZS5wdWJsaWNNb2R1bGU7XG5cbiAgICBpZiAoX19ERVZfXykge1xuICAgICAgaWYgKG1vZHVsZS5ob3QpIHtcbiAgICAgICAgX21vZHVsZU9iamVjdC5ob3QgPSBtb2R1bGUuaG90O1xuICAgICAgfVxuICAgIH1cbiAgICBfbW9kdWxlT2JqZWN0LmlkID0gbW9kdWxlSWQ7XG5cbiAgICBpZiAoaG9va3MubGVuZ3RoID4gMCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBob29rcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBob29rc1tpXS5jYihtb2R1bGVJZCwgX21vZHVsZU9iamVjdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8ga2VlcCBhcmdzIGluIHN5bmMgd2l0aCB3aXRoIGRlZmluZU1vZHVsZUNvZGUgaW5cbiAgICAvLyBtZXRyby9zcmMvUmVzb2x2ZXIvaW5kZXguanNcbiAgICAvLyBhbmQgbWV0cm8vc3JjL01vZHVsZUdyYXBoL3dvcmtlci5qc1xuICAgIGZhY3RvcnkoXG4gICAgICBnbG9iYWwsXG4gICAgICBtZXRyb1JlcXVpcmUsXG4gICAgICBtZXRyb0ltcG9ydERlZmF1bHQsXG4gICAgICBtZXRyb0ltcG9ydEFsbCxcbiAgICAgIF9tb2R1bGVPYmplY3QsXG4gICAgICBfbW9kdWxlT2JqZWN0LmV4cG9ydHMsXG4gICAgICBkZXBlbmRlbmN5TWFwXG4gICAgKTtcblxuICAgIC8vIGF2b2lkIHJlbW92aW5nIGZhY3RvcnkgaW4gREVWIG1vZGUgYXMgaXQgYnJlYWtzIEhNUlxuICAgIGlmICghX19ERVZfXykge1xuICAgICAgLy8gJEZsb3dGaXhNZTogVGhpcyBpcyBvbmx5IHNvdW5kIGJlY2F1c2Ugd2UgbmV2ZXIgYWNjZXNzIGBmYWN0b3J5YCBhZ2FpblxuICAgICAgbW9kdWxlLmZhY3RvcnkgPSB1bmRlZmluZWQ7XG4gICAgICBtb2R1bGUuZGVwZW5kZW5jeU1hcCA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAoX19ERVZfXykge1xuICAgICAgLy8gJEZsb3dGaXhNZTogd2Uga25vdyB0aGF0IF9fREVWX18gaXMgY29uc3QgYW5kIGBTeXN0cmFjZWAgZXhpc3RzXG4gICAgICBTeXN0cmFjZS5lbmRFdmVudCgpO1xuICAgIH1cbiAgICByZXR1cm4gX21vZHVsZU9iamVjdC5leHBvcnRzO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbW9kdWxlLmhhc0Vycm9yID0gdHJ1ZTtcbiAgICBtb2R1bGUuZXJyb3IgPSBlO1xuICAgIG1vZHVsZS5pc0luaXRpYWxpemVkID0gZmFsc2U7XG4gICAgbW9kdWxlLnB1YmxpY01vZHVsZS5leHBvcnRzID0gdW5kZWZpbmVkO1xuICAgIHRocm93IGU7XG4gIH0gZmluYWxseSB7XG4gICAgaWYgKF9fREVWX18pIHtcbiAgICAgIGlmIChpbml0aWFsaXppbmdNb2R1bGVJZHMucG9wKCkgIT09IG1vZHVsZUlkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBcImluaXRpYWxpemluZ01vZHVsZUlkcyBpcyBjb3JydXB0OyBzb21ldGhpbmcgaXMgdGVycmlibHkgd3JvbmdcIlxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB1bmtub3duTW9kdWxlRXJyb3IoaWQpIHtcbiAgdmFyIG1lc3NhZ2UgPSAnUmVxdWlyaW5nIHVua25vd24gbW9kdWxlIFwiJyArIGlkICsgJ1wiLic7XG4gIGlmIChfX0RFVl9fKSB7XG4gICAgbWVzc2FnZSArPVxuICAgICAgXCJJZiB5b3UgYXJlIHN1cmUgdGhlIG1vZHVsZSBpcyB0aGVyZSwgdHJ5IHJlc3RhcnRpbmcgTWV0cm8gQnVuZGxlci4gXCIgK1xuICAgICAgXCJZb3UgbWF5IGFsc28gd2FudCB0byBydW4gYHlhcm5gLCBvciBgbnBtIGluc3RhbGxgIChkZXBlbmRpbmcgb24geW91ciBlbnZpcm9ubWVudCkuXCI7XG4gIH1cbiAgcmV0dXJuIEVycm9yKG1lc3NhZ2UpO1xufVxuXG5mdW5jdGlvbiBtb2R1bGVUaHJld0Vycm9yKGlkLCBlcnJvcikge1xuICB2YXIgZGlzcGxheU5hbWUgPSAoX19ERVZfXyAmJiBtb2R1bGVzW2lkXSAmJiBtb2R1bGVzW2lkXS52ZXJib3NlTmFtZSkgfHwgaWQ7XG4gIHJldHVybiBFcnJvcihcbiAgICAnUmVxdWlyaW5nIG1vZHVsZSBcIicgKyBkaXNwbGF5TmFtZSArICdcIiwgd2hpY2ggdGhyZXcgYW4gZXhjZXB0aW9uOiAnICsgZXJyb3JcbiAgKTtcbn1cblxuaWYgKF9fREVWX18pIHtcbiAgbWV0cm9SZXF1aXJlLlN5c3RyYWNlID0ge1xuICAgIGJlZ2luRXZlbnQ6IGZ1bmN0aW9uIGJlZ2luRXZlbnQoKSB7fSxcbiAgICBlbmRFdmVudDogZnVuY3Rpb24gZW5kRXZlbnQoKSB7fVxuICB9O1xuXG4gIG1ldHJvUmVxdWlyZS5nZXRNb2R1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG1vZHVsZXM7XG4gIH07XG5cbiAgLy8gSE9UIE1PRFVMRSBSRUxPQURJTkdcbiAgdmFyIGNyZWF0ZUhvdFJlbG9hZGluZ09iamVjdCA9IGZ1bmN0aW9uIGNyZWF0ZUhvdFJlbG9hZGluZ09iamVjdCgpIHtcbiAgICB2YXIgaG90ID0ge1xuICAgICAgYWNjZXB0Q2FsbGJhY2s6IG51bGwsXG4gICAgICBhY2NlcHQ6IGZ1bmN0aW9uIGFjY2VwdChjYWxsYmFjaykge1xuICAgICAgICBob3QuYWNjZXB0Q2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgIH0sXG4gICAgICBkaXNwb3NlQ2FsbGJhY2s6IG51bGwsXG4gICAgICBkaXNwb3NlOiBmdW5jdGlvbiBkaXNwb3NlKGNhbGxiYWNrKSB7XG4gICAgICAgIGhvdC5kaXNwb3NlQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBob3Q7XG4gIH07XG5cbiAgdmFyIG1ldHJvQWNjZXB0QWxsID0gZnVuY3Rpb24gbWV0cm9BY2NlcHRBbGwoXG4gICAgZGVwZW5kZW50TW9kdWxlcyxcbiAgICBpbnZlcnNlRGVwZW5kZW5jaWVzLFxuICAgIHBhdGNoZWRNb2R1bGVzXG4gICkge1xuICAgIGlmICghZGVwZW5kZW50TW9kdWxlcyB8fCBkZXBlbmRlbnRNb2R1bGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFyIG5vdEFjY2VwdGVkID0gZGVwZW5kZW50TW9kdWxlcy5maWx0ZXIoZnVuY3Rpb24obW9kdWxlKSB7XG4gICAgICByZXR1cm4gIW1ldHJvQWNjZXB0KFxuICAgICAgICBtb2R1bGUsXG4gICAgICAgIC8qZmFjdG9yeSovIHVuZGVmaW5lZCxcbiAgICAgICAgLypkZXBlbmRlbmN5TWFwKi8gdW5kZWZpbmVkLFxuICAgICAgICBpbnZlcnNlRGVwZW5kZW5jaWVzLFxuICAgICAgICBwYXRjaGVkTW9kdWxlc1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHZhciBwYXJlbnRzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub3RBY2NlcHRlZC5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gaWYgdGhlIG1vZHVsZSBoYXMgbm8gcGFyZW50cyB0aGVuIHRoZSBjaGFuZ2UgY2Fubm90IGJlIGhvdCBsb2FkZWRcbiAgICAgIGlmIChpbnZlcnNlRGVwZW5kZW5jaWVzW25vdEFjY2VwdGVkW2ldXS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBwYXJlbnRzLnB1c2guYXBwbHkocGFyZW50cywgaW52ZXJzZURlcGVuZGVuY2llc1tub3RBY2NlcHRlZFtpXV0pO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJlbnRzLmxlbmd0aCA9PSAwO1xuICB9O1xuXG4gIHZhciBtZXRyb0FjY2VwdCA9IGZ1bmN0aW9uIG1ldHJvQWNjZXB0KFxuICAgIGlkLFxuICAgIGZhY3RvcnksXG4gICAgZGVwZW5kZW5jeU1hcCxcbiAgICBpbnZlcnNlRGVwZW5kZW5jaWVzXG4gICkge1xuICAgIHZhciBwYXRjaGVkTW9kdWxlcyA9XG4gICAgICBhcmd1bWVudHMubGVuZ3RoID4gNCAmJiBhcmd1bWVudHNbNF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s0XSA6IHt9O1xuXG4gICAgaWYgKGlkIGluIHBhdGNoZWRNb2R1bGVzKSB7XG4gICAgICAvLyBEbyBub3QgcGF0Y2ggdGhlIHNhbWUgbW9kdWxlIG1vcmUgdGhhdCBvbmNlIGR1cmluZyBhbiB1cGRhdGUuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcGF0Y2hlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblxuICAgIHZhciBtb2QgPSBtb2R1bGVzW2lkXTtcblxuICAgIGlmICghbW9kICYmIGZhY3RvcnkpIHtcbiAgICAgIC8vIE5ldyBtb2R1bGVzIGFyZSBnb2luZyB0byBiZSBoYW5kbGVkIGJ5IHRoZSBkZWZpbmUoKSBtZXRob2QuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgaG90ID0gbW9kLmhvdDtcblxuICAgIGlmICghaG90KSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIFwiQ2Fubm90IGFjY2VwdCBtb2R1bGUgYmVjYXVzZSBIb3QgTW9kdWxlIFJlcGxhY2VtZW50IFwiICtcbiAgICAgICAgICBcIkFQSSB3YXMgbm90IGluc3RhbGxlZC5cIlxuICAgICAgKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoaG90LmRpc3Bvc2VDYWxsYmFjaykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaG90LmRpc3Bvc2VDYWxsYmFjaygpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBcIkVycm9yIHdoaWxlIGNhbGxpbmcgZGlzcG9zZSBoYW5kbGVyIGZvciBtb2R1bGUgXCIgKyBpZCArIFwiOiBcIixcbiAgICAgICAgICBlcnJvclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJlcGxhY2UgYW5kIGluaXRpYWxpemUgZmFjdG9yeVxuICAgIGlmIChmYWN0b3J5KSB7XG4gICAgICBtb2QuZmFjdG9yeSA9IGZhY3Rvcnk7XG4gICAgfVxuICAgIGlmIChkZXBlbmRlbmN5TWFwKSB7XG4gICAgICBtb2QuZGVwZW5kZW5jeU1hcCA9IGRlcGVuZGVuY3lNYXA7XG4gICAgfVxuICAgIG1vZC5oYXNFcnJvciA9IGZhbHNlO1xuICAgIG1vZC5pc0luaXRpYWxpemVkID0gZmFsc2U7XG4gICAgbWV0cm9SZXF1aXJlKGlkKTtcblxuICAgIGlmIChob3QuYWNjZXB0Q2FsbGJhY2spIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGhvdC5hY2NlcHRDYWxsYmFjaygpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgXCJFcnJvciB3aGlsZSBjYWxsaW5nIGFjY2VwdCBoYW5kbGVyIGZvciBtb2R1bGUgXCIgKyBpZCArIFwiOiBcIixcbiAgICAgICAgICBlcnJvclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIG5lZWQgdG8gaGF2ZSBpbnZlcnNlRGVwZW5kZW5jaWVzIHRvIGJ1YmJsZSB1cCBhY2NlcHRcbiAgICBpZiAoIWludmVyc2VEZXBlbmRlbmNpZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZGVmaW5lZCBgaW52ZXJzZURlcGVuZGVuY2llc2BcIik7XG4gICAgfVxuXG4gICAgLy8gYWNjZXB0IHBhcmVudCBtb2R1bGVzIHJlY3Vyc2l2ZWx5IHVwIHVudGlsIGFsbCBzaWJsaW5ncyBhcmUgYWNjZXB0ZWRcbiAgICByZXR1cm4gbWV0cm9BY2NlcHRBbGwoXG4gICAgICBpbnZlcnNlRGVwZW5kZW5jaWVzW2lkXSxcbiAgICAgIGludmVyc2VEZXBlbmRlbmNpZXMsXG4gICAgICBwYXRjaGVkTW9kdWxlc1xuICAgICk7XG4gIH07XG5cbiAgZ2xvYmFsLl9fYWNjZXB0ID0gbWV0cm9BY2NlcHQ7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE4LXByZXNlbnQgRmFjZWJvb2suXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqIEBmb3JtYXRcbiAqL1xuXG5pbXBvcnQgdHlwZSB7XG4gIEltYWdlSWQsXG4gIEltYWdlRGF0YSxcbiAgSW1hZ2VzTGlzdCxcbiAgSW1hZ2VzTGlzdFJlc3BvbnNlLFxuICBJbWFnZUV2ZW50LFxuICBGcmVzY29EZWJ1Z092ZXJsYXlFdmVudCxcbiAgQ2FjaGVJbmZvLFxufSBmcm9tICcuL2FwaS5qcyc7XG5pbXBvcnQgdHlwZSB7SW1hZ2VzTWFwfSBmcm9tICcuL0ltYWdlUG9vbC5qcyc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSW1hZ2VzQ2FjaGVPdmVydmlldyBmcm9tICcuL0ltYWdlc0NhY2hlT3ZlcnZpZXcuanMnO1xuaW1wb3J0IHtcbiAgRmxpcHBlclBsdWdpbixcbiAgRmxleFJvdyxcbiAgVGV4dCxcbiAgRGV0YWlsU2lkZWJhcixcbiAgY29sb3JzLFxuICBzdHlsZWQsXG59IGZyb20gJ2ZsaXBwZXInO1xuaW1wb3J0IEltYWdlc1NpZGViYXIgZnJvbSAnLi9JbWFnZXNTaWRlYmFyLmpzJztcbmltcG9ydCBJbWFnZVBvb2wgZnJvbSAnLi9JbWFnZVBvb2wuanMnO1xuXG5leHBvcnQgdHlwZSBJbWFnZUV2ZW50V2l0aElkID0gSW1hZ2VFdmVudCAmIHtldmVudElkOiBudW1iZXJ9O1xuXG50eXBlIFBlcnNpc3RlZFN0YXRlID0ge1xuICBzdXJmYWNlTGlzdDogU2V0PHN0cmluZz4sXG4gIGltYWdlczogSW1hZ2VzTGlzdCxcbiAgZXZlbnRzOiBBcnJheTxJbWFnZUV2ZW50V2l0aElkPixcbiAgaW1hZ2VzTWFwOiBJbWFnZXNNYXAsXG59O1xuXG50eXBlIFBsdWdpblN0YXRlID0ge1xuICBzZWxlY3RlZFN1cmZhY2U6IHN0cmluZyxcbiAgc2VsZWN0ZWRJbWFnZTogP0ltYWdlSWQsXG4gIGlzRGVidWdPdmVybGF5RW5hYmxlZDogYm9vbGVhbixcbiAgaXNBdXRvUmVmcmVzaEVuYWJsZWQ6IGJvb2xlYW4sXG4gIGltYWdlczogSW1hZ2VzTGlzdCxcbiAgY29sZFN0YXJ0RmlsdGVyOiBib29sZWFuLFxufTtcblxuY29uc3QgRW1wdHlTaWRlYmFyID0gc3R5bGVkKEZsZXhSb3cpKHtcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgY29sb3I6IGNvbG9ycy5saWdodDMwLFxuICBwYWRkaW5nOiAxNSxcbiAgZm9udFNpemU6IDE2LFxufSk7XG5cbmNvbnN0IERFQlVHID0gZmFsc2U7XG5jb25zdCBzdXJmYWNlRGVmYXVsdFRleHQgPSAnU0VMRUNUIEFMTCBTVVJGQUNFUyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgRmxpcHBlclBsdWdpbjxQbHVnaW5TdGF0ZSwgKiwgUGVyc2lzdGVkU3RhdGU+IHtcbiAgc3RhdGljIGRlZmF1bHRQZXJzaXN0ZWRTdGF0ZTogUGVyc2lzdGVkU3RhdGUgPSB7XG4gICAgaW1hZ2VzOiBbXSxcbiAgICBldmVudHM6IFtdLFxuICAgIGltYWdlc01hcDoge30sXG4gICAgc3VyZmFjZUxpc3Q6IG5ldyBTZXQoKSxcbiAgfTtcblxuICBzdGF0ZTogUGx1Z2luU3RhdGU7XG4gIGltYWdlUG9vbDogSW1hZ2VQb29sO1xuICBuZXh0RXZlbnRJZDogbnVtYmVyID0gMTtcblxuICBzdGF0ZSA9IHtcbiAgICBzZWxlY3RlZFN1cmZhY2U6IHN1cmZhY2VEZWZhdWx0VGV4dCxcbiAgICBzZWxlY3RlZEltYWdlOiBudWxsLFxuICAgIGlzRGVidWdPdmVybGF5RW5hYmxlZDogZmFsc2UsXG4gICAgaXNBdXRvUmVmcmVzaEVuYWJsZWQ6IGZhbHNlLFxuICAgIGltYWdlczogW10sXG4gICAgY29sZFN0YXJ0RmlsdGVyOiBmYWxzZSxcbiAgfTtcblxuICBpbml0KCkge1xuICAgIGlmIChERUJVRykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUubG9nKCdpbml0KCknKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVDYWNoZXMoJ2luaXQnKTtcbiAgICB0aGlzLmNsaWVudC5zdWJzY3JpYmUoJ2V2ZW50cycsIChldmVudDogSW1hZ2VFdmVudCkgPT4ge1xuICAgICAgY29uc3Qge3N1cmZhY2VMaXN0fSA9IHRoaXMucHJvcHMucGVyc2lzdGVkU3RhdGU7XG4gICAgICBjb25zdCB7YXR0cmlidXRpb259ID0gZXZlbnQ7XG4gICAgICBpZiAoYXR0cmlidXRpb24gaW5zdGFuY2VvZiBBcnJheSAmJiBhdHRyaWJ1dGlvbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IHN1cmZhY2UgPSBhdHRyaWJ1dGlvblswXS50cmltKCk7XG4gICAgICAgIGlmIChzdXJmYWNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBzdXJmYWNlTGlzdC5hZGQoc3VyZmFjZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMucHJvcHMuc2V0UGVyc2lzdGVkU3RhdGUoe1xuICAgICAgICBldmVudHM6IFtcbiAgICAgICAgICB7ZXZlbnRJZDogdGhpcy5uZXh0RXZlbnRJZCwgLi4uZXZlbnR9LFxuICAgICAgICAgIC4uLnRoaXMucHJvcHMucGVyc2lzdGVkU3RhdGUuZXZlbnRzLFxuICAgICAgICBdLFxuICAgICAgfSk7XG4gICAgICB0aGlzLm5leHRFdmVudElkKys7XG4gICAgfSk7XG4gICAgdGhpcy5jbGllbnQuc3Vic2NyaWJlKFxuICAgICAgJ2RlYnVnX292ZXJsYXlfZXZlbnQnLFxuICAgICAgKGV2ZW50OiBGcmVzY29EZWJ1Z092ZXJsYXlFdmVudCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0RlYnVnT3ZlcmxheUVuYWJsZWQ6IGV2ZW50LmVuYWJsZWR9KTtcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIHRoaXMuaW1hZ2VQb29sID0gbmV3IEltYWdlUG9vbCh0aGlzLmdldEltYWdlLCAoaW1hZ2VzOiBJbWFnZXNNYXApID0+XG4gICAgICB0aGlzLnByb3BzLnNldFBlcnNpc3RlZFN0YXRlKHtpbWFnZXNNYXA6IGltYWdlc30pLFxuICAgICk7XG4gIH1cblxuICB0ZWFyZG93bigpIHtcbiAgICB0aGlzLmltYWdlUG9vbC5jbGVhcigpO1xuICB9XG5cbiAgZmlsdGVySW1hZ2VzID0gKFxuICAgIGltYWdlczogSW1hZ2VzTGlzdCxcbiAgICBldmVudHM6IEFycmF5PEltYWdlRXZlbnRXaXRoSWQ+LFxuICAgIHN1cmZhY2U6IHN0cmluZyxcbiAgICBjb2xkU3RhcnQ6IGJvb2xlYW4sXG4gICk6IEltYWdlc0xpc3QgPT4ge1xuICAgIGlmICghc3VyZmFjZSB8fCAoc3VyZmFjZSA9PT0gc3VyZmFjZURlZmF1bHRUZXh0ICYmICFjb2xkU3RhcnQpKSB7XG4gICAgICByZXR1cm4gaW1hZ2VzO1xuICAgIH1cbiAgICBjb25zdCBpbWFnZUxpc3QgPSBpbWFnZXMubWFwKChpbWFnZTogQ2FjaGVJbmZvKSA9PiB7XG4gICAgICBjb25zdCBpbWFnZUlkTGlzdCA9IGltYWdlLmltYWdlSWRzLmZpbHRlcihpbWFnZUlEID0+IHtcbiAgICAgICAgY29uc3QgZmlsdGVyZWRFdmVudHMgPSBldmVudHMuZmlsdGVyKChldmVudDogSW1hZ2VFdmVudFdpdGhJZCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG91dHB1dCA9XG4gICAgICAgICAgICBldmVudC5hdHRyaWJ1dGlvbiAmJlxuICAgICAgICAgICAgZXZlbnQuYXR0cmlidXRpb24ubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgZXZlbnQuaW1hZ2VJZHMgJiZcbiAgICAgICAgICAgIGV2ZW50LmltYWdlSWRzLmluY2x1ZGVzKGltYWdlSUQpO1xuXG4gICAgICAgICAgaWYgKHN1cmZhY2UgPT09IHN1cmZhY2VEZWZhdWx0VGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIG91dHB1dCAmJiBjb2xkU3RhcnQgJiYgZXZlbnQuY29sZFN0YXJ0O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgKCFjb2xkU3RhcnQgfHwgKGNvbGRTdGFydCAmJiBldmVudC5jb2xkU3RhcnQpKSAmJlxuICAgICAgICAgICAgb3V0cHV0ICYmXG4gICAgICAgICAgICBldmVudC5hdHRyaWJ1dGlvblswXSA9PSBzdXJmYWNlXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmaWx0ZXJlZEV2ZW50cy5sZW5ndGggPiAwO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gey4uLmltYWdlLCBpbWFnZUlkczogaW1hZ2VJZExpc3R9O1xuICAgIH0pO1xuICAgIHJldHVybiBpbWFnZUxpc3Q7XG4gIH07XG5cbiAgdXBkYXRlSW1hZ2VzT25VSSA9IChcbiAgICBpbWFnZXM6IEltYWdlc0xpc3QsXG4gICAgc3VyZmFjZTogc3RyaW5nLFxuICAgIGNvbGRTdGFydDogYm9vbGVhbixcbiAgKSA9PiB7XG4gICAgY29uc3QgZmlsdGVyZWRJbWFnZXMgPSB0aGlzLmZpbHRlckltYWdlcyhcbiAgICAgIGltYWdlcyxcbiAgICAgIHRoaXMucHJvcHMucGVyc2lzdGVkU3RhdGUuZXZlbnRzLFxuICAgICAgc3VyZmFjZSxcbiAgICAgIGNvbGRTdGFydCxcbiAgICApO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRTdXJmYWNlOiBzdXJmYWNlLFxuICAgICAgaW1hZ2VzOiBmaWx0ZXJlZEltYWdlcyxcbiAgICAgIGNvbGRTdGFydEZpbHRlcjogY29sZFN0YXJ0LFxuICAgIH0pO1xuICB9O1xuICB1cGRhdGVDYWNoZXMgPSAocmVhc29uOiBzdHJpbmcpID0+IHtcbiAgICBpZiAoREVCVUcpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLmxvZygnUmVxdWVzdGluZyBpbWFnZXMgbGlzdCAocmVhc29uPScgKyByZWFzb24gKyAnKScpO1xuICAgIH1cbiAgICB0aGlzLmNsaWVudC5jYWxsKCdsaXN0SW1hZ2VzJykudGhlbigocmVzcG9uc2U6IEltYWdlc0xpc3RSZXNwb25zZSkgPT4ge1xuICAgICAgcmVzcG9uc2UubGV2ZWxzLmZvckVhY2goZGF0YSA9PlxuICAgICAgICB0aGlzLmltYWdlUG9vbC5mZXRjaEltYWdlcyhkYXRhLmltYWdlSWRzKSxcbiAgICAgICk7XG4gICAgICB0aGlzLnByb3BzLnNldFBlcnNpc3RlZFN0YXRlKHtpbWFnZXM6IHJlc3BvbnNlLmxldmVsc30pO1xuICAgICAgdGhpcy51cGRhdGVJbWFnZXNPblVJKFxuICAgICAgICB0aGlzLnByb3BzLnBlcnNpc3RlZFN0YXRlLmltYWdlcyxcbiAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZFN1cmZhY2UsXG4gICAgICAgIHRoaXMuc3RhdGUuY29sZFN0YXJ0RmlsdGVyLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICBvbkNsZWFyID0gKHR5cGU6IHN0cmluZykgPT4ge1xuICAgIHRoaXMuY2xpZW50LmNhbGwoJ2NsZWFyJywge3R5cGV9KTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlQ2FjaGVzKCdvbkNsZWFyJyksIDEwMDApO1xuICB9O1xuXG4gIG9uVHJpbU1lbW9yeSA9ICgpID0+IHtcbiAgICB0aGlzLmNsaWVudC5jYWxsKCd0cmltTWVtb3J5Jywge30pO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVDYWNoZXMoJ29uVHJpbU1lbW9yeScpLCAxMDAwKTtcbiAgfTtcblxuICBvbkVuYWJsZURlYnVnT3ZlcmxheSA9IChlbmFibGVkOiBib29sZWFuKSA9PiB7XG4gICAgdGhpcy5jbGllbnQuY2FsbCgnZW5hYmxlRGVidWdPdmVybGF5Jywge2VuYWJsZWR9KTtcbiAgfTtcblxuICBvbkVuYWJsZUF1dG9SZWZyZXNoID0gKGVuYWJsZWQ6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtpc0F1dG9SZWZyZXNoRW5hYmxlZDogZW5hYmxlZH0pO1xuICAgIGlmIChlbmFibGVkKSB7XG4gICAgICAvLyBEZWxheSB0aGUgY2FsbCBqdXN0IGVub3VnaCB0byBhbGxvdyB0aGUgc3RhdGUgY2hhbmdlIHRvIGNvbXBsZXRlLlxuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLm9uQXV0b1JlZnJlc2goKSk7XG4gICAgfVxuICB9O1xuXG4gIG9uQXV0b1JlZnJlc2ggPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVDYWNoZXMoJ2F1dG8tcmVmcmVzaCcpO1xuICAgIGlmICh0aGlzLnN0YXRlLmlzQXV0b1JlZnJlc2hFbmFibGVkKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMub25BdXRvUmVmcmVzaCgpLCAxMDAwKTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0SW1hZ2UgPSAoaW1hZ2VJZDogc3RyaW5nKSA9PiB7XG4gICAgaWYgKERFQlVHKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS5sb2coJzwtIGdldEltYWdlIHJlcXVlc3RlZCBmb3IgJyArIGltYWdlSWQpO1xuICAgIH1cbiAgICB0aGlzLmNsaWVudC5jYWxsKCdnZXRJbWFnZScsIHtpbWFnZUlkfSkudGhlbigoaW1hZ2U6IEltYWdlRGF0YSkgPT4ge1xuICAgICAgaWYgKERFQlVHKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUubG9nKCctPiBnZXRJbWFnZSAnICsgaW1hZ2VJZCArICcgcmV0dXJuZWQnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaW1hZ2VQb29sLl9mZXRjaENvbXBsZXRlZChpbWFnZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgb25JbWFnZVNlbGVjdGVkID0gKHNlbGVjdGVkSW1hZ2U6IEltYWdlSWQpID0+IHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkSW1hZ2V9KTtcblxuICByZW5kZXJTaWRlYmFyID0gKCkgPT4ge1xuICAgIGNvbnN0IHtzZWxlY3RlZEltYWdlfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBpZiAoc2VsZWN0ZWRJbWFnZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8RW1wdHlTaWRlYmFyIGdyb3c9e3RydWV9PlxuICAgICAgICAgIDxUZXh0IGFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgICAgICBTZWxlY3QgYW4gaW1hZ2UgdG8gc2VlIHRoZSBldmVudHMgYXNzb2NpYXRlZCB3aXRoIGl0LlxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgPC9FbXB0eVNpZGViYXI+XG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IG1heWJlSW1hZ2UgPSB0aGlzLnByb3BzLnBlcnNpc3RlZFN0YXRlLmltYWdlc01hcFtzZWxlY3RlZEltYWdlXTtcbiAgICBjb25zdCBldmVudHMgPSB0aGlzLnByb3BzLnBlcnNpc3RlZFN0YXRlLmV2ZW50cy5maWx0ZXIoZSA9PlxuICAgICAgZS5pbWFnZUlkcy5pbmNsdWRlcyhzZWxlY3RlZEltYWdlKSxcbiAgICApO1xuICAgIHJldHVybiA8SW1hZ2VzU2lkZWJhciBpbWFnZT17bWF5YmVJbWFnZX0gZXZlbnRzPXtldmVudHN9IC8+O1xuICB9O1xuXG4gIG9uU3VyZmFjZUNoYW5nZSA9IChzdXJmYWNlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnVwZGF0ZUltYWdlc09uVUkoXG4gICAgICB0aGlzLnByb3BzLnBlcnNpc3RlZFN0YXRlLmltYWdlcyxcbiAgICAgIHN1cmZhY2UsXG4gICAgICB0aGlzLnN0YXRlLmNvbGRTdGFydEZpbHRlcixcbiAgICApO1xuICB9O1xuXG4gIG9uQ29sZFN0YXJ0Q2hhbmdlID0gKGNoZWNrZWQ6IGJvb2xlYW4pID0+IHtcbiAgICB0aGlzLnVwZGF0ZUltYWdlc09uVUkoXG4gICAgICB0aGlzLnByb3BzLnBlcnNpc3RlZFN0YXRlLmltYWdlcyxcbiAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRTdXJmYWNlLFxuICAgICAgY2hlY2tlZCxcbiAgICApO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBvcHRpb25zID0gWy4uLnRoaXMucHJvcHMucGVyc2lzdGVkU3RhdGUuc3VyZmFjZUxpc3RdLnJlZHVjZShcbiAgICAgIChhY2MsIGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIHsuLi5hY2MsIFtpdGVtXTogaXRlbX07XG4gICAgICB9LFxuICAgICAge1tzdXJmYWNlRGVmYXVsdFRleHRdOiBzdXJmYWNlRGVmYXVsdFRleHR9LFxuICAgICk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgPEltYWdlc0NhY2hlT3ZlcnZpZXdcbiAgICAgICAgICBzdXJmYWNlT3B0aW9ucz17b3B0aW9uc31cbiAgICAgICAgICBzZWxlY3RlZFN1cmZhY2U9e3RoaXMuc3RhdGUuc2VsZWN0ZWRTdXJmYWNlfVxuICAgICAgICAgIG9uQ2hhbmdlU3VyZmFjZT17dGhpcy5vblN1cmZhY2VDaGFuZ2V9XG4gICAgICAgICAgY29sZFN0YXJ0RmlsdGVyPXt0aGlzLnN0YXRlLmNvbGRTdGFydEZpbHRlcn1cbiAgICAgICAgICBvbkNvbGRTdGFydENoYW5nZT17dGhpcy5vbkNvbGRTdGFydENoYW5nZX1cbiAgICAgICAgICBpbWFnZXM9e3RoaXMuc3RhdGUuaW1hZ2VzfVxuICAgICAgICAgIG9uQ2xlYXI9e3RoaXMub25DbGVhcn1cbiAgICAgICAgICBvblRyaW1NZW1vcnk9e3RoaXMub25UcmltTWVtb3J5fVxuICAgICAgICAgIG9uUmVmcmVzaD17KCkgPT4gdGhpcy51cGRhdGVDYWNoZXMoJ3JlZnJlc2gnKX1cbiAgICAgICAgICBvbkVuYWJsZURlYnVnT3ZlcmxheT17dGhpcy5vbkVuYWJsZURlYnVnT3ZlcmxheX1cbiAgICAgICAgICBvbkVuYWJsZUF1dG9SZWZyZXNoPXt0aGlzLm9uRW5hYmxlQXV0b1JlZnJlc2h9XG4gICAgICAgICAgaXNEZWJ1Z092ZXJsYXlFbmFibGVkPXt0aGlzLnN0YXRlLmlzRGVidWdPdmVybGF5RW5hYmxlZH1cbiAgICAgICAgICBpc0F1dG9SZWZyZXNoRW5hYmxlZD17dGhpcy5zdGF0ZS5pc0F1dG9SZWZyZXNoRW5hYmxlZH1cbiAgICAgICAgICBvbkltYWdlU2VsZWN0ZWQ9e3RoaXMub25JbWFnZVNlbGVjdGVkfVxuICAgICAgICAgIGltYWdlc01hcD17dGhpcy5wcm9wcy5wZXJzaXN0ZWRTdGF0ZS5pbWFnZXNNYXB9XG4gICAgICAgICAgZXZlbnRzPXt0aGlzLnByb3BzLnBlcnNpc3RlZFN0YXRlLmV2ZW50c31cbiAgICAgICAgLz5cbiAgICAgICAgPERldGFpbFNpZGViYXI+e3RoaXMucmVuZGVyU2lkZWJhcigpfTwvRGV0YWlsU2lkZWJhcj5cbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgKTtcbiAgfVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxOC1wcmVzZW50IEZhY2Vib29rLlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKiBAZm9ybWF0XG4gKi9cblxuaW1wb3J0IHR5cGUge0ltYWdlSWQsIEltYWdlRGF0YSwgSW1hZ2VzTGlzdH0gZnJvbSAnLi9hcGkuanMnO1xuaW1wb3J0IHR5cGUge0ltYWdlRXZlbnRXaXRoSWR9IGZyb20gJy4vaW5kZXguanMnO1xuXG5pbXBvcnQge1xuICBUb29sYmFyLFxuICBCdXR0b24sXG4gIFNwYWNlcixcbiAgY29sb3JzLFxuICBGbGV4Qm94LFxuICBGbGV4Um93LFxuICBGbGV4Q29sdW1uLFxuICBMb2FkaW5nSW5kaWNhdG9yLFxuICBzdHlsZWQsXG4gIFNlbGVjdCxcbiAgQ2hlY2tib3gsXG59IGZyb20gJ2ZsaXBwZXInO1xuaW1wb3J0IHR5cGUge0ltYWdlc01hcH0gZnJvbSAnLi9JbWFnZVBvb2wuanMnO1xuaW1wb3J0IHtjbGlwYm9hcmR9IGZyb20gJ2VsZWN0cm9uJztcbmltcG9ydCB7UHVyZUNvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuXG5mdW5jdGlvbiBmb3JtYXRNQihieXRlczogbnVtYmVyKSB7XG4gIHJldHVybiBNYXRoLmZsb29yKGJ5dGVzIC8gKDEwMjQgKiAxMDI0KSkgKyAnTUInO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRLQihieXRlczogbnVtYmVyKSB7XG4gIHJldHVybiBNYXRoLmZsb29yKGJ5dGVzIC8gMTAyNCkgKyAnS0InO1xufVxuXG50eXBlIEltYWdlc0NhY2hlT3ZlcnZpZXdQcm9wcyA9IHtcbiAgb25Db2xkU3RhcnRDaGFuZ2U6IChjaGVja2VkOiBib29sZWFuKSA9PiB2b2lkLFxuICBjb2xkU3RhcnRGaWx0ZXI6IGJvb2xlYW4sXG4gIHN1cmZhY2VPcHRpb25zOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSxcbiAgc2VsZWN0ZWRTdXJmYWNlOiBzdHJpbmcsXG4gIG9uQ2hhbmdlU3VyZmFjZTogKGtleTogc3RyaW5nKSA9PiB2b2lkLFxuICBpbWFnZXM6IEltYWdlc0xpc3QsXG4gIG9uQ2xlYXI6ICh0eXBlOiBzdHJpbmcpID0+IHZvaWQsXG4gIG9uVHJpbU1lbW9yeTogKCkgPT4gdm9pZCxcbiAgb25SZWZyZXNoOiAoKSA9PiB2b2lkLFxuICBvbkVuYWJsZURlYnVnT3ZlcmxheTogKGVuYWJsZWQ6IGJvb2xlYW4pID0+IHZvaWQsXG4gIGlzRGVidWdPdmVybGF5RW5hYmxlZDogYm9vbGVhbixcbiAgb25FbmFibGVBdXRvUmVmcmVzaDogKGVuYWJsZWQ6IGJvb2xlYW4pID0+IHZvaWQsXG4gIGlzQXV0b1JlZnJlc2hFbmFibGVkOiBib29sZWFuLFxuICBvbkltYWdlU2VsZWN0ZWQ6IChzZWxlY3RlZEltYWdlOiBJbWFnZUlkKSA9PiB2b2lkLFxuICBpbWFnZXNNYXA6IEltYWdlc01hcCxcbiAgZXZlbnRzOiBBcnJheTxJbWFnZUV2ZW50V2l0aElkPixcbn07XG5cbnR5cGUgSW1hZ2VzQ2FjaGVPdmVydmlld1N0YXRlID0ge3xcbiAgc2VsZWN0ZWRJbWFnZTogP0ltYWdlSWQsXG4gIHNpemU6IG51bWJlcixcbnx9O1xuXG5jb25zdCBTdHlsZWRTZWxlY3QgPSBzdHlsZWQoU2VsZWN0KShwcm9wcyA9PiAoe1xuICBtYXJnaW5MZWZ0OiA2LFxuICBtYXJnaW5SaWdodDogNixcbiAgaGVpZ2h0OiAnMTAwJScsXG59KSk7XG5cbmNvbnN0IFN0eWxlZENoZWNrYm94ID0gc3R5bGVkKENoZWNrYm94KShwcm9wcyA9PiAoe1xuICBtYXJnaW5MZWZ0OiA2LFxuICBtYXJnaW5SaWdodDogNixcbiAgaGVpZ2h0OiAnMTAwJScsXG59KSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlc0NhY2hlT3ZlcnZpZXcgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PFxuICBJbWFnZXNDYWNoZU92ZXJ2aWV3UHJvcHMsXG4gIEltYWdlc0NhY2hlT3ZlcnZpZXdTdGF0ZSxcbj4ge1xuICBzdGF0aWMgQ29udGFpbmVyID0gc3R5bGVkKEZsZXhDb2x1bW4pKHtcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9ycy53aGl0ZSxcbiAgfSk7XG5cbiAgc3RhdGljIENvbnRlbnQgPSBzdHlsZWQoRmxleENvbHVtbikoe1xuICAgIGZsZXg6IDEsXG4gICAgb3ZlcmZsb3c6ICdhdXRvJyxcbiAgfSk7XG5cbiAgc3RhdGljIEVtcHR5ID0gc3R5bGVkKEZsZXhCb3gpKHtcbiAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgd2lkdGg6ICcxMDAlJyxcbiAgfSk7XG5cbiAgc3RhdGUgPSB7XG4gICAgc2VsZWN0ZWRJbWFnZTogdW5kZWZpbmVkLFxuICAgIHNpemU6IDE1MCxcbiAgfTtcblxuICBvbkltYWdlU2VsZWN0ZWQgPSAoc2VsZWN0ZWRJbWFnZTogSW1hZ2VJZCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkSW1hZ2V9KTtcbiAgICB0aGlzLnByb3BzLm9uSW1hZ2VTZWxlY3RlZChzZWxlY3RlZEltYWdlKTtcbiAgfTtcblxuICBvbktleURvd24gPSAoZTogU3ludGhldGljS2V5Ym9hcmRFdmVudDwqPikgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkSW1hZ2UgPSB0aGlzLnN0YXRlLnNlbGVjdGVkSW1hZ2U7XG4gICAgY29uc3QgaW1hZ2VzTWFwID0gdGhpcy5wcm9wcy5pbWFnZXNNYXA7XG5cbiAgICBpZiAoc2VsZWN0ZWRJbWFnZSkge1xuICAgICAgaWYgKChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSAmJiBlLmtleSA9PT0gJ2MnKSB7XG4gICAgICAgIGNsaXBib2FyZC53cml0ZVRleHQoU3RyaW5nKGltYWdlc01hcFtzZWxlY3RlZEltYWdlXSkpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIG9uRW5hYmxlRGVidWdPdmVybGF5VG9nZ2xlZCA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uRW5hYmxlRGVidWdPdmVybGF5KCF0aGlzLnByb3BzLmlzRGVidWdPdmVybGF5RW5hYmxlZCk7XG4gIH07XG5cbiAgb25FbmFibGVBdXRvUmVmcmVzaFRvZ2dsZWQgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkVuYWJsZUF1dG9SZWZyZXNoKCF0aGlzLnByb3BzLmlzQXV0b1JlZnJlc2hFbmFibGVkKTtcbiAgfTtcblxuICBvbkNoYW5nZVNpemUgPSAoZTogU3ludGhldGljSW5wdXRFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT5cbiAgICB0aGlzLnNldFN0YXRlKHtzaXplOiBwYXJzZUludChlLnRhcmdldC52YWx1ZSwgMTApfSk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGhhc0ltYWdlcyA9XG4gICAgICB0aGlzLnByb3BzLmltYWdlcy5yZWR1Y2UoXG4gICAgICAgIChjLCBjYWNoZUluZm8pID0+IGMgKyBjYWNoZUluZm8uaW1hZ2VJZHMubGVuZ3RoLFxuICAgICAgICAwLFxuICAgICAgKSA+IDA7XG4gICAgcmV0dXJuIChcbiAgICAgIDxJbWFnZXNDYWNoZU92ZXJ2aWV3LkNvbnRhaW5lclxuICAgICAgICBncm93PXt0cnVlfVxuICAgICAgICBvbktleURvd249e3RoaXMub25LZXlEb3dufVxuICAgICAgICB0YWJJbmRleD1cIjBcIj5cbiAgICAgICAgPFRvb2xiYXIgcG9zaXRpb249XCJ0b3BcIj5cbiAgICAgICAgICA8QnV0dG9uIGljb249XCJjcm9zcy1vdXRsaW5lXCIgb25DbGljaz17dGhpcy5wcm9wcy5vblRyaW1NZW1vcnl9PlxuICAgICAgICAgICAgVHJpbSBNZW1vcnlcbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMub25FbmFibGVEZWJ1Z092ZXJsYXlUb2dnbGVkfT5cbiAgICAgICAgICAgIERlYnVnT3ZlcmxheSB7dGhpcy5wcm9wcy5pc0RlYnVnT3ZlcmxheUVuYWJsZWQgPyAnT04nIDogJ09GRid9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uUmVmcmVzaH0+UmVmcmVzaDwvQnV0dG9uPlxuICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5vbkVuYWJsZUF1dG9SZWZyZXNoVG9nZ2xlZH0+XG4gICAgICAgICAgICBBdXRvIFJlZnJlc2gge3RoaXMucHJvcHMuaXNBdXRvUmVmcmVzaEVuYWJsZWQgPyAnT04nIDogJ09GRid9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPFN0eWxlZFNlbGVjdFxuICAgICAgICAgICAgb3B0aW9ucz17dGhpcy5wcm9wcy5zdXJmYWNlT3B0aW9uc31cbiAgICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkU3VyZmFjZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uQ2hhbmdlU3VyZmFjZX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxTdHlsZWRDaGVja2JveFxuICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5wcm9wcy5jb2xkU3RhcnRGaWx0ZXJ9XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5wcm9wcy5vbkNvbGRTdGFydENoYW5nZX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIFNob3cgQ29sZFN0YXJ0IEltYWdlc1xuICAgICAgICAgIDxTcGFjZXIgLz5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZVNpemV9XG4gICAgICAgICAgICBtaW49ezUwfVxuICAgICAgICAgICAgbWF4PXsxNTB9XG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zaXplfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvVG9vbGJhcj5cbiAgICAgICAgeyFoYXNJbWFnZXMgPyAoXG4gICAgICAgICAgPEltYWdlc0NhY2hlT3ZlcnZpZXcuRW1wdHk+XG4gICAgICAgICAgICA8TG9hZGluZ0luZGljYXRvciAvPlxuICAgICAgICAgIDwvSW1hZ2VzQ2FjaGVPdmVydmlldy5FbXB0eT5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8SW1hZ2VzQ2FjaGVPdmVydmlldy5Db250ZW50PlxuICAgICAgICAgICAge3RoaXMucHJvcHMuaW1hZ2VzLm1hcChkYXRhID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgbWF4U2l6ZSA9IGRhdGEubWF4U2l6ZUJ5dGVzO1xuICAgICAgICAgICAgICBjb25zdCBzdWJ0aXRsZSA9IG1heFNpemVcbiAgICAgICAgICAgICAgICA/IGZvcm1hdE1CKGRhdGEuc2l6ZUJ5dGVzKSArICcgLyAnICsgZm9ybWF0TUIobWF4U2l6ZSlcbiAgICAgICAgICAgICAgICA6IGZvcm1hdE1CKGRhdGEuc2l6ZUJ5dGVzKTtcbiAgICAgICAgICAgICAgY29uc3Qgb25DbGVhciA9IGRhdGEuY2xlYXJLZXlcbiAgICAgICAgICAgICAgICA/ICgpID0+IHRoaXMucHJvcHMub25DbGVhcihkYXRhLmNsZWFyS2V5KVxuICAgICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8SW1hZ2VHcmlkXG4gICAgICAgICAgICAgICAgICB0aXRsZT17ZGF0YS5jYWNoZVR5cGV9XG4gICAgICAgICAgICAgICAgICBzdWJ0aXRsZT17c3VidGl0bGV9XG4gICAgICAgICAgICAgICAgICBpbWFnZXM9e2RhdGEuaW1hZ2VJZHN9XG4gICAgICAgICAgICAgICAgICBvbkltYWdlU2VsZWN0ZWQ9e3RoaXMub25JbWFnZVNlbGVjdGVkfVxuICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJbWFnZT17dGhpcy5zdGF0ZS5zZWxlY3RlZEltYWdlfVxuICAgICAgICAgICAgICAgICAgaW1hZ2VzTWFwPXt0aGlzLnByb3BzLmltYWdlc01hcH1cbiAgICAgICAgICAgICAgICAgIHNpemU9e3RoaXMuc3RhdGUuc2l6ZX1cbiAgICAgICAgICAgICAgICAgIGV2ZW50cz17dGhpcy5wcm9wcy5ldmVudHN9XG4gICAgICAgICAgICAgICAgICBvbkNsZWFyPXtvbkNsZWFyfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L0ltYWdlc0NhY2hlT3ZlcnZpZXcuQ29udGVudD5cbiAgICAgICAgKX1cbiAgICAgIDwvSW1hZ2VzQ2FjaGVPdmVydmlldy5Db250YWluZXI+XG4gICAgKTtcbiAgfVxufVxuXG5jbGFzcyBJbWFnZUdyaWQgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PHtcbiAgdGl0bGU6IHN0cmluZyxcbiAgc3VidGl0bGU6IHN0cmluZyxcbiAgaW1hZ2VzOiBBcnJheTxJbWFnZUlkPixcbiAgc2VsZWN0ZWRJbWFnZTogP0ltYWdlSWQsXG4gIG9uSW1hZ2VTZWxlY3RlZDogKGltYWdlOiBJbWFnZUlkKSA9PiB2b2lkLFxuICBvbkNsZWFyOiA/KCkgPT4gdm9pZCxcbiAgaW1hZ2VzTWFwOiBJbWFnZXNNYXAsXG4gIHNpemU6IG51bWJlcixcbiAgZXZlbnRzOiBBcnJheTxJbWFnZUV2ZW50V2l0aElkPixcbn0+IHtcbiAgc3RhdGljIENvbnRlbnQgPSBzdHlsZWQoJ2RpdicpKHtcbiAgICBwYWRkaW5nTGVmdDogMTUsXG4gIH0pO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7aW1hZ2VzLCBvbkltYWdlU2VsZWN0ZWQsIHNlbGVjdGVkSW1hZ2V9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChpbWFnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gW1xuICAgICAgPEltYWdlR3JpZEhlYWRlclxuICAgICAgICBrZXk9XCJoZWFkZXJcIlxuICAgICAgICB0aXRsZT17dGhpcy5wcm9wcy50aXRsZX1cbiAgICAgICAgc3VidGl0bGU9e3RoaXMucHJvcHMuc3VidGl0bGV9XG4gICAgICAgIG9uQ2xlYXI9e3RoaXMucHJvcHMub25DbGVhcn1cbiAgICAgIC8+LFxuICAgICAgPEltYWdlR3JpZC5Db250ZW50IGtleT1cImNvbnRlbnRcIj5cbiAgICAgICAge2ltYWdlcy5tYXAoaW1hZ2VJZCA9PiAoXG4gICAgICAgICAgPEltYWdlSXRlbVxuICAgICAgICAgICAgaW1hZ2VJZD17aW1hZ2VJZH1cbiAgICAgICAgICAgIGltYWdlPXt0aGlzLnByb3BzLmltYWdlc01hcFtpbWFnZUlkXX1cbiAgICAgICAgICAgIGtleT17aW1hZ2VJZH1cbiAgICAgICAgICAgIHNlbGVjdGVkPXtzZWxlY3RlZEltYWdlICE9IG51bGwgJiYgc2VsZWN0ZWRJbWFnZSA9PT0gaW1hZ2VJZH1cbiAgICAgICAgICAgIG9uU2VsZWN0ZWQ9e29uSW1hZ2VTZWxlY3RlZH1cbiAgICAgICAgICAgIHNpemU9e3RoaXMucHJvcHMuc2l6ZX1cbiAgICAgICAgICAgIG51bWJlck9mUmVxdWVzdHM9e1xuICAgICAgICAgICAgICB0aGlzLnByb3BzLmV2ZW50cy5maWx0ZXIoZSA9PiBlLmltYWdlSWRzLmluY2x1ZGVzKGltYWdlSWQpKS5sZW5ndGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAvPlxuICAgICAgICApKX1cbiAgICAgIDwvSW1hZ2VHcmlkLkNvbnRlbnQ+LFxuICAgIF07XG4gIH1cbn1cblxuY2xhc3MgSW1hZ2VHcmlkSGVhZGVyIGV4dGVuZHMgUHVyZUNvbXBvbmVudDx7XG4gIHRpdGxlOiBzdHJpbmcsXG4gIHN1YnRpdGxlOiBzdHJpbmcsXG4gIG9uQ2xlYXI6ID8oKSA9PiB2b2lkLFxufT4ge1xuICBzdGF0aWMgQ29udGFpbmVyID0gc3R5bGVkKEZsZXhSb3cpKHtcbiAgICBjb2xvcjogY29sb3JzLmRhcms3MCxcbiAgICBwYWRkaW5nVG9wOiAxMCxcbiAgICBwYWRkaW5nQm90dG9tOiAxMCxcbiAgICBtYXJnaW5MZWZ0OiAxNSxcbiAgICBtYXJnaW5SaWdodDogMTUsXG4gICAgbWFyZ2luQm90dG9tOiAxNSxcbiAgICBib3JkZXJCb3R0b206IGAxcHggc29saWQgJHtjb2xvcnMubGlnaHQxMH1gLFxuICAgIGZsZXhTaHJpbms6IDAsXG4gICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgcG9zaXRpb246ICdzdGlja3knLFxuICAgIHRvcDogMCxcbiAgICBsZWZ0OiAwLFxuICAgIHJpZ2h0OiAwLFxuICAgIGJhY2tncm91bmRDb2xvcjogY29sb3JzLndoaXRlLFxuICAgIHpJbmRleDogMyxcbiAgfSk7XG5cbiAgc3RhdGljIEhlYWRpbmcgPSBzdHlsZWQoJ3NwYW4nKSh7XG4gICAgZm9udFNpemU6IDIyLFxuICAgIGZvbnRXZWlnaHQ6IDYwMCxcbiAgfSk7XG5cbiAgc3RhdGljIFN1YnRpdGxlID0gc3R5bGVkKCdzcGFuJykoe1xuICAgIGZvbnRTaXplOiAyMixcbiAgICBmb250V2VpZ2h0OiAzMDAsXG4gICAgbWFyZ2luTGVmdDogMTUsXG4gIH0pO1xuXG4gIHN0YXRpYyBDbGVhckJ1dHRvbiA9IHN0eWxlZChCdXR0b24pKHtcbiAgICBhbGlnblNlbGY6ICdjZW50ZXInLFxuICAgIGhlaWdodDogMzAsXG4gICAgbWFyZ2luTGVmdDogJ2F1dG8nLFxuICAgIHdpZHRoOiAxMDAsXG4gIH0pO1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEltYWdlR3JpZEhlYWRlci5Db250YWluZXI+XG4gICAgICAgIDxJbWFnZUdyaWRIZWFkZXIuSGVhZGluZz57dGhpcy5wcm9wcy50aXRsZX08L0ltYWdlR3JpZEhlYWRlci5IZWFkaW5nPlxuICAgICAgICA8SW1hZ2VHcmlkSGVhZGVyLlN1YnRpdGxlPlxuICAgICAgICAgIHt0aGlzLnByb3BzLnN1YnRpdGxlfVxuICAgICAgICA8L0ltYWdlR3JpZEhlYWRlci5TdWJ0aXRsZT5cbiAgICAgICAgPFNwYWNlciAvPlxuICAgICAgICB7dGhpcy5wcm9wcy5vbkNsZWFyID8gKFxuICAgICAgICAgIDxJbWFnZUdyaWRIZWFkZXIuQ2xlYXJCdXR0b24gb25DbGljaz17dGhpcy5wcm9wcy5vbkNsZWFyfT5cbiAgICAgICAgICAgIENsZWFyIENhY2hlXG4gICAgICAgICAgPC9JbWFnZUdyaWRIZWFkZXIuQ2xlYXJCdXR0b24+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgPC9JbWFnZUdyaWRIZWFkZXIuQ29udGFpbmVyPlxuICAgICk7XG4gIH1cbn1cblxuY2xhc3MgSW1hZ2VJdGVtIGV4dGVuZHMgUHVyZUNvbXBvbmVudDx7XG4gIGltYWdlSWQ6IEltYWdlSWQsXG4gIGltYWdlOiA/SW1hZ2VEYXRhLFxuICBzZWxlY3RlZDogYm9vbGVhbixcbiAgb25TZWxlY3RlZDogKGltYWdlOiBJbWFnZUlkKSA9PiB2b2lkLFxuICBzaXplOiBudW1iZXIsXG4gIG51bWJlck9mUmVxdWVzdHM6IG51bWJlcixcbn0+IHtcbiAgc3RhdGljIENvbnRhaW5lciA9IHN0eWxlZChGbGV4Qm94KSgoe3NpemV9KSA9PiAoe1xuICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgIGZsZXhTaHJpbms6IDAsXG4gICAgaGVpZ2h0OiBzaXplLFxuICAgIHdpZHRoOiBzaXplLFxuICAgIGJvcmRlclJhZGl1czogNCxcbiAgICBtYXJnaW5SaWdodDogMTUsXG4gICAgbWFyZ2luQm90dG9tOiAxNSxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9ycy5saWdodDAyLFxuICB9KSk7XG5cbiAgc3RhdGljIEltYWdlID0gc3R5bGVkKCdpbWcnKSh7XG4gICAgYm9yZGVyUmFkaXVzOiA0LFxuICAgIG1heEhlaWdodDogJzEwMCUnLFxuICAgIG1heFdpZHRoOiAnMTAwJScsXG4gICAgb2JqZWN0Rml0OiAnY29udGFpbicsXG4gIH0pO1xuXG4gIHN0YXRpYyBMb2FkaW5nID0gc3R5bGVkKCdzcGFuJykoe1xuICAgIHBhZGRpbmc6ICcwIDAnLFxuICB9KTtcblxuICBzdGF0aWMgU2VsZWN0ZWRIaWdobGlnaHQgPSBzdHlsZWQoJ2RpdicpKHByb3BzID0+ICh7XG4gICAgYm9yZGVyQ29sb3I6IGNvbG9ycy5oaWdobGlnaHQsXG4gICAgYm9yZGVyU3R5bGU6ICdzb2xpZCcsXG4gICAgYm9yZGVyV2lkdGg6IHByb3BzLnNlbGVjdGVkID8gMyA6IDAsXG4gICAgYm9yZGVyUmFkaXVzOiA0LFxuICAgIGJveFNoYWRvdzogcHJvcHMuc2VsZWN0ZWQgPyBgaW5zZXQgMCAwIDAgMXB4ICR7Y29sb3JzLndoaXRlfWAgOiAnbm9uZScsXG4gICAgYm90dG9tOiAwLFxuICAgIGxlZnQ6IDAsXG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgcmlnaHQ6IDAsXG4gICAgdG9wOiAwLFxuICB9KSk7XG5cbiAgc3RhdGljIEhvdmVyT3ZlcmxheSA9IHN0eWxlZChGbGV4Q29sdW1uKShwcm9wcyA9PiAoe1xuICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgIGJhY2tncm91bmRDb2xvcjogY29sb3JzLndoaXRlQWxwaGE4MCxcbiAgICBib3R0b206IHByb3BzLnNlbGVjdGVkID8gNCA6IDAsXG4gICAgZm9udFNpemU6IHByb3BzLnNpemUgPiAxMDAgPyAxNiA6IDExLFxuICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICBsZWZ0OiBwcm9wcy5zZWxlY3RlZCA/IDQgOiAwLFxuICAgIG9wYWNpdHk6IDAsXG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgcmlnaHQ6IHByb3BzLnNlbGVjdGVkID8gNCA6IDAsXG4gICAgdG9wOiBwcm9wcy5zZWxlY3RlZCA/IDQgOiAwLFxuICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICB0cmFuc2l0aW9uOiAnLjFzIG9wYWNpdHknLFxuICAgICcmOmhvdmVyJzoge1xuICAgICAgb3BhY2l0eTogMSxcbiAgICB9LFxuICB9KSk7XG5cbiAgc3RhdGljIE1lbW9yeUxhYmVsID0gc3R5bGVkKCdzcGFuJykoe1xuICAgIGZvbnRXZWlnaHQ6IDYwMCxcbiAgICBtYXJnaW5Cb3R0b206IDYsXG4gIH0pO1xuXG4gIHN0YXRpYyBTaXplTGFiZWwgPSBzdHlsZWQoJ3NwYW4nKSh7XG4gICAgZm9udFdlaWdodDogMzAwLFxuICB9KTtcblxuICBzdGF0aWMgRXZlbnRzID0gc3R5bGVkKCdkaXYnKSh7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgdG9wOiAtNSxcbiAgICByaWdodDogLTUsXG4gICAgY29sb3I6IGNvbG9ycy53aGl0ZSxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9ycy5oaWdobGlnaHQsXG4gICAgZm9udFdlaWdodDogNjAwLFxuICAgIGJvcmRlclJhZGl1czogMTAsXG4gICAgZm9udFNpemU6ICcwLjg1ZW0nLFxuICAgIHpJbmRleDogMixcbiAgICBsaW5lSGVpZ2h0OiAnMjBweCcsXG4gICAgd2lkdGg6IDIwLFxuICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gIH0pO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgc2l6ZTogMTUwLFxuICB9O1xuXG4gIG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdGVkKHRoaXMucHJvcHMuaW1hZ2VJZCk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtpbWFnZSwgc2VsZWN0ZWQsIHNpemUsIG51bWJlck9mUmVxdWVzdHN9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8SW1hZ2VJdGVtLkNvbnRhaW5lciBvbkNsaWNrPXt0aGlzLm9uQ2xpY2t9IHNpemU9e3NpemV9PlxuICAgICAgICB7bnVtYmVyT2ZSZXF1ZXN0cyA+IDAgJiYgaW1hZ2UgIT0gbnVsbCAmJiAoXG4gICAgICAgICAgPEltYWdlSXRlbS5FdmVudHM+e251bWJlck9mUmVxdWVzdHN9PC9JbWFnZUl0ZW0uRXZlbnRzPlxuICAgICAgICApfVxuICAgICAgICB7aW1hZ2UgIT0gbnVsbCA/IChcbiAgICAgICAgICA8SW1hZ2VJdGVtLkltYWdlIHNyYz17aW1hZ2UuZGF0YX0gLz5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8TG9hZGluZ0luZGljYXRvciBzaXplPXsyNX0gLz5cbiAgICAgICAgKX1cbiAgICAgICAgPEltYWdlSXRlbS5TZWxlY3RlZEhpZ2hsaWdodCBzZWxlY3RlZD17c2VsZWN0ZWR9IC8+XG4gICAgICAgIHtpbWFnZSAhPSBudWxsICYmIChcbiAgICAgICAgICA8SW1hZ2VJdGVtLkhvdmVyT3ZlcmxheSBzZWxlY3RlZD17c2VsZWN0ZWR9IHNpemU9e3NpemV9PlxuICAgICAgICAgICAgPEltYWdlSXRlbS5NZW1vcnlMYWJlbD5cbiAgICAgICAgICAgICAge2Zvcm1hdEtCKGltYWdlLnNpemVCeXRlcyl9XG4gICAgICAgICAgICA8L0ltYWdlSXRlbS5NZW1vcnlMYWJlbD5cbiAgICAgICAgICAgIDxJbWFnZUl0ZW0uU2l6ZUxhYmVsPlxuICAgICAgICAgICAgICB7aW1hZ2Uud2lkdGh9JnRpbWVzO3tpbWFnZS5oZWlnaHR9XG4gICAgICAgICAgICA8L0ltYWdlSXRlbS5TaXplTGFiZWw+XG4gICAgICAgICAgPC9JbWFnZUl0ZW0uSG92ZXJPdmVybGF5PlxuICAgICAgICApfVxuICAgICAgPC9JbWFnZUl0ZW0uQ29udGFpbmVyPlxuICAgICk7XG4gIH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTgtcHJlc2VudCBGYWNlYm9vay5cbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICogQGZvcm1hdFxuICovXG5cbmltcG9ydCB0eXBlIHtJbWFnZURhdGF9IGZyb20gJy4vYXBpLmpzJztcbmltcG9ydCB0eXBlIHtJbWFnZUV2ZW50V2l0aElkfSBmcm9tICcuL2luZGV4LmpzJztcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRGF0YURlc2NyaXB0aW9uLFxuICBUZXh0LFxuICBQYW5lbCxcbiAgTWFuYWdlZERhdGFJbnNwZWN0b3IsXG4gIGNvbG9ycyxcbiAgc3R5bGVkLFxufSBmcm9tICdmbGlwcGVyJztcblxudHlwZSBJbWFnZXNTaWRlYmFyUHJvcHMgPSB7XG4gIGltYWdlOiA/SW1hZ2VEYXRhLFxuICBldmVudHM6IEFycmF5PEltYWdlRXZlbnRXaXRoSWQ+LFxufTtcblxudHlwZSBJbWFnZXNTaWRlYmFyU3RhdGUgPSB7fTtcblxuY29uc3QgRGF0YURlc2NyaXB0aW9uS2V5ID0gc3R5bGVkKCdzcGFuJykoe1xuICBjb2xvcjogY29sb3JzLmdyYXBlRGFyazEsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1hZ2VzU2lkZWJhciBleHRlbmRzIENvbXBvbmVudDxcbiAgSW1hZ2VzU2lkZWJhclByb3BzLFxuICBJbWFnZXNTaWRlYmFyU3RhdGUsXG4+IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7dGhpcy5yZW5kZXJVcmkoKX1cbiAgICAgICAge3RoaXMucHJvcHMuZXZlbnRzLm1hcChlID0+IChcbiAgICAgICAgICA8RXZlbnREZXRhaWxzIGtleT17ZS5ldmVudElkfSBldmVudD17ZX0gLz5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyVXJpKCkge1xuICAgIGlmICghdGhpcy5wcm9wcy5pbWFnZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmICghdGhpcy5wcm9wcy5pbWFnZS51cmkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPHA+XG4gICAgICAgIDxEYXRhRGVzY3JpcHRpb25LZXk+VVJJPC9EYXRhRGVzY3JpcHRpb25LZXk+XG4gICAgICAgIDxzcGFuIGtleT1cInNlcFwiPjogPC9zcGFuPlxuICAgICAgICA8RGF0YURlc2NyaXB0aW9uXG4gICAgICAgICAgdHlwZT1cInN0cmluZ1wiXG4gICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuaW1hZ2UudXJpfVxuICAgICAgICAgIHNldFZhbHVlPXtmdW5jdGlvbihwYXRoOiBBcnJheTxzdHJpbmc+LCB2YWw6IGFueSkge319XG4gICAgICAgIC8+XG4gICAgICA8L3A+XG4gICAgKTtcbiAgfVxufVxuXG5jbGFzcyBFdmVudERldGFpbHMgZXh0ZW5kcyBDb21wb25lbnQ8e1xuICBldmVudDogSW1hZ2VFdmVudFdpdGhJZCxcbn0+IHtcbiAgc3RhdGljIENvbnRhaW5lciA9IHN0eWxlZChQYW5lbCkoe1xuICAgIGZsZXhTaHJpbms6IDAsXG4gICAgbWFyZ2luVG9wOiAnMTVweCcsXG4gIH0pO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7ZXZlbnR9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8RXZlbnREZXRhaWxzLkNvbnRhaW5lclxuICAgICAgICBoZWFkaW5nPXs8UmVxdWVzdEhlYWRlciBldmVudD17ZXZlbnR9IC8+fVxuICAgICAgICBmbG9hdGluZz17ZmFsc2V9XG4gICAgICAgIHBhZGRlZD17ZmFsc2V9XG4gICAgICAgIGdyb3c9e2ZhbHNlfVxuICAgICAgICBjb2xsYXBzZWQ9e2ZhbHNlfT5cbiAgICAgICAgPHA+XG4gICAgICAgICAgPERhdGFEZXNjcmlwdGlvbktleT5BdHRyaWJ1dGlvbjwvRGF0YURlc2NyaXB0aW9uS2V5PlxuICAgICAgICAgIDxzcGFuIGtleT1cInNlcFwiPjogPC9zcGFuPlxuICAgICAgICAgIDxNYW5hZ2VkRGF0YUluc3BlY3RvciBkYXRhPXtldmVudC5hdHRyaWJ1dGlvbn0gLz5cbiAgICAgICAgPC9wPlxuICAgICAgICA8cD5cbiAgICAgICAgICA8RGF0YURlc2NyaXB0aW9uS2V5PlRpbWUgc3RhcnQ8L0RhdGFEZXNjcmlwdGlvbktleT5cbiAgICAgICAgICA8c3BhbiBrZXk9XCJzZXBcIj46IDwvc3Bhbj5cbiAgICAgICAgICA8RGF0YURlc2NyaXB0aW9uXG4gICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgIHZhbHVlPXtldmVudC5zdGFydFRpbWV9XG4gICAgICAgICAgICBzZXRWYWx1ZT17ZnVuY3Rpb24ocGF0aDogQXJyYXk8c3RyaW5nPiwgdmFsOiBhbnkpIHt9fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvcD5cbiAgICAgICAgPHA+XG4gICAgICAgICAgPERhdGFEZXNjcmlwdGlvbktleT5UaW1lIGVuZDwvRGF0YURlc2NyaXB0aW9uS2V5PlxuICAgICAgICAgIDxzcGFuIGtleT1cInNlcFwiPjogPC9zcGFuPlxuICAgICAgICAgIDxEYXRhRGVzY3JpcHRpb25cbiAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgdmFsdWU9e2V2ZW50LmVuZFRpbWV9XG4gICAgICAgICAgICBzZXRWYWx1ZT17ZnVuY3Rpb24ocGF0aDogQXJyYXk8c3RyaW5nPiwgdmFsOiBhbnkpIHt9fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvcD5cbiAgICAgICAgPHA+XG4gICAgICAgICAgPERhdGFEZXNjcmlwdGlvbktleT5Tb3VyY2U8L0RhdGFEZXNjcmlwdGlvbktleT5cbiAgICAgICAgICA8c3BhbiBrZXk9XCJzZXBcIj46IDwvc3Bhbj5cbiAgICAgICAgICA8RGF0YURlc2NyaXB0aW9uXG4gICAgICAgICAgICB0eXBlPVwic3RyaW5nXCJcbiAgICAgICAgICAgIHZhbHVlPXtldmVudC5zb3VyY2V9XG4gICAgICAgICAgICBzZXRWYWx1ZT17ZnVuY3Rpb24ocGF0aDogQXJyYXk8c3RyaW5nPiwgdmFsOiBhbnkpIHt9fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvcD5cbiAgICAgICAgPHA+XG4gICAgICAgICAgPERhdGFEZXNjcmlwdGlvbktleT5SZXF1ZXN0ZWQgb24gY29sZCBzdGFydDwvRGF0YURlc2NyaXB0aW9uS2V5PlxuICAgICAgICAgIDxzcGFuIGtleT1cInNlcFwiPjogPC9zcGFuPlxuICAgICAgICAgIDxEYXRhRGVzY3JpcHRpb25cbiAgICAgICAgICAgIHR5cGU9XCJib29sZWFuXCJcbiAgICAgICAgICAgIHZhbHVlPXtldmVudC5jb2xkU3RhcnR9XG4gICAgICAgICAgICBzZXRWYWx1ZT17bnVsbH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L3A+XG4gICAgICAgIHt0aGlzLnJlbmRlclZpZXdwb3J0RGF0YSgpfVxuICAgICAgPC9FdmVudERldGFpbHMuQ29udGFpbmVyPlxuICAgICk7XG4gIH1cblxuICByZW5kZXJWaWV3cG9ydERhdGEoKSB7XG4gICAgY29uc3Qgdmlld3BvcnQgPSB0aGlzLnByb3BzLmV2ZW50LnZpZXdwb3J0O1xuICAgIGlmICghdmlld3BvcnQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPHA+XG4gICAgICAgIDxEYXRhRGVzY3JpcHRpb25LZXk+Vmlld3BvcnQ8L0RhdGFEZXNjcmlwdGlvbktleT5cbiAgICAgICAgPHNwYW4ga2V5PVwic2VwXCI+OiA8L3NwYW4+XG4gICAgICAgIDxEYXRhRGVzY3JpcHRpb25cbiAgICAgICAgICB0eXBlPVwic3RyaW5nXCJcbiAgICAgICAgICB2YWx1ZT17dmlld3BvcnQud2lkdGggKyAneCcgKyB2aWV3cG9ydC5oZWlnaHR9XG4gICAgICAgICAgc2V0VmFsdWU9e2Z1bmN0aW9uKHBhdGg6IEFycmF5PHN0cmluZz4sIHZhbDogYW55KSB7fX1cbiAgICAgICAgLz5cbiAgICAgIDwvcD5cbiAgICApO1xuICAgIC8vIFRPRE8gKHQzMTk0Nzc0Nik6IGdyZXkgYm94IHRpbWUsIG4tdGggc2NhbiB0aW1lXG4gIH1cbn1cblxuY2xhc3MgUmVxdWVzdEhlYWRlciBleHRlbmRzIENvbXBvbmVudDx7XG4gIGV2ZW50OiBJbWFnZUV2ZW50V2l0aElkLFxufT4ge1xuICBkYXRlU3RyaW5nID0gdGltZXN0YW1wID0+IHtcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodGltZXN0YW1wKTtcbiAgICByZXR1cm4gYCR7ZGF0ZS50b1RpbWVTdHJpbmcoKS5zcGxpdCgnICcpWzBdfS4keyhcbiAgICAgICcwMDAnICsgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKVxuICAgICkuc3Vic3RyKC0zKX1gO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7ZXZlbnR9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBkdXJhdGlvbk1zID0gZXZlbnQuZW5kVGltZSAtIGV2ZW50LnN0YXJ0VGltZTtcbiAgICByZXR1cm4gKFxuICAgICAgPFRleHQ+XG4gICAgICAgIHtldmVudC52aWV3cG9ydCA/ICdSZXF1ZXN0JyA6ICdQcmVmZXRjaCd9IGF0eycgJ31cbiAgICAgICAge3RoaXMuZGF0ZVN0cmluZyhldmVudC5zdGFydFRpbWUpfSAoe2R1cmF0aW9uTXN9bXMpXG4gICAgICA8L1RleHQ+XG4gICAgKTtcbiAgfVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxOC1wcmVzZW50IEZhY2Vib29rLlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKiBAZm9ybWF0XG4gKi9cblxuaW1wb3J0IHR5cGUge0ltYWdlSWQsIEltYWdlRGF0YX0gZnJvbSAnLi9hcGkuanMnO1xuXG5leHBvcnQgdHlwZSBJbWFnZXNNYXAgPSB7W2ltYWdlSWQ6IEltYWdlSWRdOiBJbWFnZURhdGF9O1xuXG5jb25zdCBtYXhJbmZsaWdodFJlcXVlc3RzID0gMTA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlUG9vbCB7XG4gIGNhY2hlOiBJbWFnZXNNYXAgPSB7fTtcbiAgcmVxdWVzdGVkOiB7W2ltYWdlSWQ6IEltYWdlSWRdOiBib29sZWFufSA9IHt9O1xuICBxdWV1ZWQ6IEFycmF5PEltYWdlSWQ+ID0gW107XG4gIGluRmxpZ2h0UmVxdWVzdHM6IG51bWJlciA9IDA7XG4gIGZldGNoSW1hZ2U6IChpbWFnZUlkOiBJbWFnZUlkKSA9PiB2b2lkO1xuICB1cGRhdGVOb3RpZmljYXRpb25TY2hlZHVsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgb25Qb29sVXBkYXRlZDogKGltYWdlczogSW1hZ2VzTWFwKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGZldGNoSW1hZ2U6IChpbWFnZUlkOiBJbWFnZUlkKSA9PiB2b2lkLFxuICAgIG9uUG9vbFVwZGF0ZWQ6IChpbWFnZXM6IEltYWdlc01hcCkgPT4gdm9pZCxcbiAgKSB7XG4gICAgdGhpcy5mZXRjaEltYWdlID0gZmV0Y2hJbWFnZTtcbiAgICB0aGlzLm9uUG9vbFVwZGF0ZWQgPSBvblBvb2xVcGRhdGVkO1xuICB9XG5cbiAgZ2V0SW1hZ2VzKCk6IEltYWdlc01hcCB7XG4gICAgcmV0dXJuIHsuLi50aGlzLmNhY2hlfTtcbiAgfVxuXG4gIGZldGNoSW1hZ2VzKGlkczogQXJyYXk8c3RyaW5nPikge1xuICAgIGZvciAoY29uc3QgaWQgb2YgaWRzKSB7XG4gICAgICBpZiAoIXRoaXMuY2FjaGVbaWRdICYmICF0aGlzLnJlcXVlc3RlZFtpZF0pIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ZWRbaWRdID0gdHJ1ZTtcblxuICAgICAgICBpZiAodGhpcy5pbkZsaWdodFJlcXVlc3RzIDwgbWF4SW5mbGlnaHRSZXF1ZXN0cykge1xuICAgICAgICAgIHRoaXMuaW5GbGlnaHRSZXF1ZXN0cysrO1xuICAgICAgICAgIHRoaXMuZmV0Y2hJbWFnZShpZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5xdWV1ZWQudW5zaGlmdChpZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLmNhY2hlID0ge307XG4gICAgdGhpcy5yZXF1ZXN0ZWQgPSB7fTtcbiAgfVxuXG4gIF9mZXRjaENvbXBsZXRlZChpbWFnZTogSW1hZ2VEYXRhKTogdm9pZCB7XG4gICAgdGhpcy5jYWNoZVtpbWFnZS5pbWFnZUlkXSA9IGltYWdlO1xuICAgIGRlbGV0ZSB0aGlzLnJlcXVlc3RlZFtpbWFnZS5pbWFnZUlkXTtcblxuICAgIGlmICh0aGlzLnF1ZXVlZC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmZldGNoSW1hZ2UodGhpcy5xdWV1ZWQucG9wKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluRmxpZ2h0UmVxdWVzdHMtLTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMudXBkYXRlTm90aWZpY2F0aW9uU2NoZWR1bGVkKSB7XG4gICAgICB0aGlzLnVwZGF0ZU5vdGlmaWNhdGlvblNjaGVkdWxlZCA9IHRydWU7XG4gICAgICB3aW5kb3cuc2V0VGltZW91dCh0aGlzLl9ub3RpZnksIDEwMDApO1xuICAgIH1cbiAgfVxuXG4gIF9ub3RpZnkgPSAoKSA9PiB7XG4gICAgdGhpcy51cGRhdGVOb3RpZmljYXRpb25TY2hlZHVsZWQgPSBmYWxzZTtcbiAgICB0aGlzLm9uUG9vbFVwZGF0ZWQodGhpcy5nZXRJbWFnZXMoKSk7XG4gIH07XG59XG4iXSwibmFtZXMiOlsiZ2xvYmFsIiwiX19yIiwibWV0cm9SZXF1aXJlIiwiX19kIiwiZGVmaW5lIiwiX19jIiwiY2xlYXIiLCJtb2R1bGVzIiwiRU1QVFkiLCJfcmVmIiwiaGFzT3duUHJvcGVydHkiLCJfX05VTV9NT0RVTEVTX18iLCJBcnJheSIsIk9iamVjdCIsImNyZWF0ZSIsImZhY3RvcnkiLCJtb2R1bGVJZCIsImRlcGVuZGVuY3lNYXAiLCJoYXNFcnJvciIsImltcG9ydGVkQWxsIiwiaW1wb3J0ZWREZWZhdWx0IiwiaXNJbml0aWFsaXplZCIsInB1YmxpY01vZHVsZSIsImV4cG9ydHMiLCJtb2R1bGVJZFJlYWxseUlzTnVtYmVyIiwibW9kdWxlIiwiZ3VhcmRlZExvYWRNb2R1bGUiLCJtZXRyb0ltcG9ydERlZmF1bHQiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsIm1ldHJvSW1wb3J0QWxsIiwiX2tleSIsImNhbGwiLCJpbkd1YXJkIiwiRXJyb3JVdGlscyIsInJldHVyblZhbHVlIiwibG9hZE1vZHVsZUltcGxlbWVudGF0aW9uIiwiZSIsInJlcG9ydEZhdGFsRXJyb3IiLCJJRF9NQVNLX1NISUZUIiwiTE9DQUxfSURfTUFTSyIsInVucGFja01vZHVsZUlkIiwic2VnbWVudElkIiwibG9jYWxJZCIsInBhY2tNb2R1bGVJZCIsInZhbHVlIiwiaG9va3MiLCJyZWdpc3Rlckhvb2siLCJjYiIsImhvb2siLCJwdXNoIiwicmVsZWFzZSIsImkiLCJsZW5ndGgiLCJzcGxpY2UiLCJfX2RlZmluZU1vZHVsZSIsIm5hdGl2ZVJlcXVpcmUiLCJfdW5wYWNrTW9kdWxlSWQiLCJfc2VnbWVudElkIiwiX2xvY2FsSWQiLCJ1bmtub3duTW9kdWxlRXJyb3IiLCJtb2R1bGVUaHJld0Vycm9yIiwiZXJyb3IiLCJfbW9kdWxlIiwiX21vZHVsZU9iamVjdCIsImlkIiwidW5kZWZpbmVkIiwibWVzc2FnZSIsIkVycm9yIiwiZGlzcGxheU5hbWUiLCJFbXB0eVNpZGViYXIiLCJGbGV4Um93IiwiYWxpZ25JdGVtcyIsImp1c3RpZnlDb250ZW50IiwiY29sb3IiLCJjb2xvcnMiLCJsaWdodDMwIiwicGFkZGluZyIsImZvbnRTaXplIiwiREVCVUciLCJzdXJmYWNlRGVmYXVsdFRleHQiLCJGbGlwcGVyUGx1Z2luIiwic2VsZWN0ZWRTdXJmYWNlIiwic2VsZWN0ZWRJbWFnZSIsImlzRGVidWdPdmVybGF5RW5hYmxlZCIsImlzQXV0b1JlZnJlc2hFbmFibGVkIiwiaW1hZ2VzIiwiY29sZFN0YXJ0RmlsdGVyIiwiZXZlbnRzIiwic3VyZmFjZSIsImNvbGRTdGFydCIsImltYWdlTGlzdCIsIm1hcCIsImltYWdlIiwiaW1hZ2VJZExpc3QiLCJpbWFnZUlkcyIsImZpbHRlciIsImltYWdlSUQiLCJmaWx0ZXJlZEV2ZW50cyIsImV2ZW50Iiwib3V0cHV0IiwiYXR0cmlidXRpb24iLCJpbmNsdWRlcyIsImZpbHRlcmVkSW1hZ2VzIiwiZmlsdGVySW1hZ2VzIiwicHJvcHMiLCJwZXJzaXN0ZWRTdGF0ZSIsInNldFN0YXRlIiwicmVhc29uIiwiY2xpZW50IiwidGhlbiIsInJlc3BvbnNlIiwibGV2ZWxzIiwiZm9yRWFjaCIsImRhdGEiLCJpbWFnZVBvb2wiLCJmZXRjaEltYWdlcyIsInNldFBlcnNpc3RlZFN0YXRlIiwidXBkYXRlSW1hZ2VzT25VSSIsInN0YXRlIiwidHlwZSIsInNldFRpbWVvdXQiLCJ1cGRhdGVDYWNoZXMiLCJlbmFibGVkIiwib25BdXRvUmVmcmVzaCIsImltYWdlSWQiLCJfZmV0Y2hDb21wbGV0ZWQiLCJtYXliZUltYWdlIiwiaW1hZ2VzTWFwIiwiY2hlY2tlZCIsImluaXQiLCJzdWJzY3JpYmUiLCJzdXJmYWNlTGlzdCIsInRyaW0iLCJhZGQiLCJldmVudElkIiwibmV4dEV2ZW50SWQiLCJJbWFnZVBvb2wiLCJnZXRJbWFnZSIsInRlYXJkb3duIiwicmVuZGVyIiwib3B0aW9ucyIsInJlZHVjZSIsImFjYyIsIml0ZW0iLCJvblN1cmZhY2VDaGFuZ2UiLCJvbkNvbGRTdGFydENoYW5nZSIsIm9uQ2xlYXIiLCJvblRyaW1NZW1vcnkiLCJvbkVuYWJsZURlYnVnT3ZlcmxheSIsIm9uRW5hYmxlQXV0b1JlZnJlc2giLCJvbkltYWdlU2VsZWN0ZWQiLCJyZW5kZXJTaWRlYmFyIiwiU2V0IiwiZm9ybWF0TUIiLCJieXRlcyIsIk1hdGgiLCJmbG9vciIsImZvcm1hdEtCIiwiU3R5bGVkU2VsZWN0IiwiU2VsZWN0IiwibWFyZ2luTGVmdCIsIm1hcmdpblJpZ2h0IiwiaGVpZ2h0IiwiU3R5bGVkQ2hlY2tib3giLCJDaGVja2JveCIsIkltYWdlc0NhY2hlT3ZlcnZpZXciLCJQdXJlQ29tcG9uZW50Iiwic2l6ZSIsImN0cmxLZXkiLCJtZXRhS2V5Iiwia2V5IiwiY2xpcGJvYXJkIiwid3JpdGVUZXh0IiwiU3RyaW5nIiwicHJldmVudERlZmF1bHQiLCJwYXJzZUludCIsInRhcmdldCIsImhhc0ltYWdlcyIsImMiLCJjYWNoZUluZm8iLCJvbktleURvd24iLCJvbkVuYWJsZURlYnVnT3ZlcmxheVRvZ2dsZWQiLCJvblJlZnJlc2giLCJvbkVuYWJsZUF1dG9SZWZyZXNoVG9nZ2xlZCIsInN1cmZhY2VPcHRpb25zIiwib25DaGFuZ2VTdXJmYWNlIiwib25DaGFuZ2VTaXplIiwibWF4U2l6ZSIsIm1heFNpemVCeXRlcyIsInN1YnRpdGxlIiwic2l6ZUJ5dGVzIiwiY2xlYXJLZXkiLCJjYWNoZVR5cGUiLCJGbGV4Q29sdW1uIiwiYmFja2dyb3VuZENvbG9yIiwid2hpdGUiLCJmbGV4Iiwib3ZlcmZsb3ciLCJGbGV4Qm94Iiwid2lkdGgiLCJJbWFnZUdyaWQiLCJ0aXRsZSIsInBhZGRpbmdMZWZ0IiwiSW1hZ2VHcmlkSGVhZGVyIiwiZGFyazcwIiwicGFkZGluZ1RvcCIsInBhZGRpbmdCb3R0b20iLCJtYXJnaW5Cb3R0b20iLCJib3JkZXJCb3R0b20iLCJsaWdodDEwIiwiZmxleFNocmluayIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsInJpZ2h0IiwiekluZGV4IiwiZm9udFdlaWdodCIsIkJ1dHRvbiIsImFsaWduU2VsZiIsIkltYWdlSXRlbSIsIm9uU2VsZWN0ZWQiLCJzZWxlY3RlZCIsIm51bWJlck9mUmVxdWVzdHMiLCJvbkNsaWNrIiwiZmxvYXQiLCJib3JkZXJSYWRpdXMiLCJsaWdodDAyIiwibWF4SGVpZ2h0IiwibWF4V2lkdGgiLCJvYmplY3RGaXQiLCJib3JkZXJDb2xvciIsImhpZ2hsaWdodCIsImJvcmRlclN0eWxlIiwiYm9yZGVyV2lkdGgiLCJib3hTaGFkb3ciLCJib3R0b20iLCJ3aGl0ZUFscGhhODAiLCJvcGFjaXR5IiwidHJhbnNpdGlvbiIsImxpbmVIZWlnaHQiLCJ0ZXh0QWxpZ24iLCJEYXRhRGVzY3JpcHRpb25LZXkiLCJncmFwZURhcmsxIiwiSW1hZ2VzU2lkZWJhciIsIkNvbXBvbmVudCIsInJlbmRlclVyaSIsInVyaSIsInBhdGgiLCJ2YWwiLCJFdmVudERldGFpbHMiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwic291cmNlIiwicmVuZGVyVmlld3BvcnREYXRhIiwidmlld3BvcnQiLCJQYW5lbCIsIm1hcmdpblRvcCIsIlJlcXVlc3RIZWFkZXIiLCJ0aW1lc3RhbXAiLCJkYXRlIiwiRGF0ZSIsInRvVGltZVN0cmluZyIsInNwbGl0IiwiZ2V0TWlsbGlzZWNvbmRzIiwic3Vic3RyIiwiZHVyYXRpb25NcyIsImRhdGVTdHJpbmciLCJtYXhJbmZsaWdodFJlcXVlc3RzIiwiY29uc3RydWN0b3IiLCJmZXRjaEltYWdlIiwib25Qb29sVXBkYXRlZCIsInVwZGF0ZU5vdGlmaWNhdGlvblNjaGVkdWxlZCIsImdldEltYWdlcyIsImNhY2hlIiwiaWRzIiwicmVxdWVzdGVkIiwiaW5GbGlnaHRSZXF1ZXN0cyIsInF1ZXVlZCIsInVuc2hpZnQiLCJwb3AiLCJ3aW5kb3ciLCJfbm90aWZ5Il0sIm1hcHBpbmdzIjoiOztBQ1dBOztBQUlBQSxFQUFBQSxNQUFNLENBQUNDLEdBQVAsR0FBYUMsWUFBYjtBQUNBRixFQUFBQSxNQUFNLENBQUNHLEdBQVAsR0FBYUMsTUFBYjtBQUNBSixFQUFBQSxNQUFNLENBQUNLLEdBQVAsR0FBYUMsS0FBYjtBQUVBLE1BQUlDLE9BQU8sR0FBR0QsS0FBSyxFQUFuQjtBQUlBLE1BQUlFLEtBQUssR0FBRyxFQUFaO0FBQ0EsTUFBSUMsSUFBSSxHQUFHLEVBQVg7QUFBQSxNQUNFQyxjQUFjLEdBQUdELElBQUksQ0FBQ0MsY0FEeEI7O0FBR0EsV0FBU0osS0FBVCxHQUFpQjtBQUNmQyxJQUFBQSxPQUFPLEdBQ0wsT0FBT0ksZUFBUCxLQUEyQixRQUEzQixHQUNJQyxLQUFLLENBQUNELGVBQWUsR0FBRyxDQUFuQixDQURULEdBRUlFLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLElBQWQsQ0FITjtBQVFBLFdBQU9QLE9BQVA7QUFDRDs7QUFPRCxXQUFTSCxNQUFULENBQWdCVyxP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