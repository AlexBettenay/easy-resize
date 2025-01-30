"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("../css/styles.css");
class ResizableContainer extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: props.initialWidth || 200,
            height: props.initialHeight || 200,
        };
        this.containerRef = react_1.default.createRef();
        this.moveHandlerRef = null;
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mouseup', this.handleMouseUp);
    }
    componentWillUnmount() {
        document.removeEventListener('mouseup', this.handleMouseUp);
    }
    handleMouseUp() {
        var _a, _b;
        if (this.moveHandlerRef) {
            document.removeEventListener('mousemove', this.moveHandlerRef);
            this.moveHandlerRef = null;
            (_b = (_a = this.props).onChangeFinished) === null || _b === void 0 ? void 0 : _b.call(_a, this.state.width, this.state.height);
        }
    }
    handleMouseMove(direction) {
        return (e) => {
            if (!this.containerRef.current) {
                return;
            }
            const containerRect = this.containerRef.current.getBoundingClientRect();
            switch (direction) {
                case 'w':
                    this.setState({ width: Math.max(this.props.minWidth || 200, containerRect.right - e.clientX) });
                    break;
                case 'e':
                    this.setState({ width: Math.max(this.props.minWidth || 200, e.clientX - containerRect.left) });
                    break;
                case 'n':
                    this.setState({ height: Math.max(this.props.minHeight || 200, containerRect.bottom - e.clientY) });
                    break;
                case 's':
                    this.setState({ height: Math.max(this.props.minHeight || 200, e.clientY - containerRect.top) });
                    break;
                case 'nw':
                    this.setState({ height: Math.max(this.props.minHeight || 200, containerRect.bottom - e.clientY) });
                    this.setState({ width: Math.max(this.props.minWidth || 200, containerRect.right - e.clientX) });
                    break;
                case 'ne':
                    this.setState({ height: Math.max(this.props.minHeight || 200, containerRect.bottom - e.clientY) });
                    this.setState({ width: Math.max(this.props.minWidth || 200, e.clientX - containerRect.left) });
                    break;
                case 'sw':
                    this.setState({ height: Math.max(this.props.minHeight || 200, e.clientY - containerRect.top) });
                    this.setState({ width: Math.max(this.props.minWidth || 200, containerRect.right - e.clientX) });
                    break;
                case 'se':
                    this.setState({ height: Math.max(this.props.minHeight || 200, e.clientY - containerRect.top) });
                    this.setState({ width: Math.max(this.props.minWidth || 200, e.clientX - containerRect.left) });
                    break;
                default:
                    break;
            }
        };
    }
    render() {
        const _a = this.props, { children, resizeHandle, cornerResizeHandle, sx, allowedDirections, minWidth, minHeight, initialWidth, initialHeight, onChangeFinished } = _a, other = __rest(_a, ["children", "resizeHandle", "cornerResizeHandle", "sx", "allowedDirections", "minWidth", "minHeight", "initialWidth", "initialHeight", "onChangeFinished"]);
        const { width, height } = this.state;
        return (react_1.default.createElement("div", Object.assign({ ref: this.containerRef, className: 'parent-container', style: Object.assign(Object.assign({}, sx), { width, height }) }, other),
            children, allowedDirections === null || allowedDirections === void 0 ? void 0 :
            allowedDirections.map((direction) => {
                let dynamicCornerHandleStyle = {};
                if (cornerResizeHandle) {
                    switch (direction) {
                        case 'nw':
                            dynamicCornerHandleStyle = { transform: 'rotate(315deg)' };
                            break;
                        case 'ne':
                            dynamicCornerHandleStyle = { transform: 'rotate(45deg)' };
                            break;
                        case 'sw':
                            dynamicCornerHandleStyle = { transform: 'rotate(225deg)' };
                            break;
                        case 'se':
                            dynamicCornerHandleStyle = { transform: 'rotate(135deg)' };
                            break;
                        default:
                            break;
                    }
                }
                return (react_1.default.createElement("div", { key: direction, className: `easy-resize-handle-container easy-resize-handle-container-${direction}`, style: dynamicCornerHandleStyle, onMouseDown: (e) => {
                        e.preventDefault();
                        this.moveHandlerRef = this.handleMouseMove(direction);
                        document.addEventListener('mousemove', this.moveHandlerRef);
                    } }, direction.length > 1 && cornerResizeHandle ? (cornerResizeHandle) : (resizeHandle)));
            })));
    }
}
ResizableContainer.defaultProps = {
    minWidth: 200,
    minHeight: 200,
    initialWidth: 200,
    initialHeight: 200,
    allowedDirections: ['n', 's', 'w', 'e', 'nw', 'ne', 'sw', 'se'],
    onChangeFinished: () => { },
    resizeHandle: react_1.default.createElement("div", { className: 'easy-resize-handle' }),
    cornerResizeHandle: undefined,
};
exports.default = ResizableContainer;
