import React, { Component } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function styleInject(css, ref) {
  if ( ref === undefined ) ref = {};
  var insertAt = ref.insertAt;

  if (typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".easy-resize-handle-container{display:flex;overflow:visible;position:absolute;z-index:1000}.easy-resize-handle-container-w{cursor:w-resize;left:0;top:50%;transform:rotate(270deg)}.easy-resize-handle-container-e{cursor:e-resize;right:0;top:50%;transform:rotate(90deg)}.easy-resize-handle-container-n{cursor:n-resize;left:50%}.easy-resize-handle-container-s{bottom:0;cursor:s-resize;left:50%;transform:rotate(180deg)}.easy-resize-handle-container-sw{bottom:0;cursor:sw-resize;left:0}.easy-resize-handle-container-nw{cursor:nw-resize;left:0;top:0}.easy-resize-handle-container-ne{cursor:ne-resize;right:0;top:0}.easy-resize-handle-container-se{bottom:0;cursor:se-resize;right:0}.parent-container{display:flex;overflow:visible;position:relative}";
styleInject(css_248z);

class ResizableContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: Math.max((props.initialWidth || 200), (props.minWidth || 0)),
            height: Math.max((props.initialHeight || 200), (props.minHeight || 0)),
        };
        this.containerRef = React.createRef();
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
            (_b = (_a = this.props).onChangeFinished) === null || _b === undefined ? undefined : _b.call(_a, this.state.width, this.state.height);
        }
    }
    handleMouseMove(direction) {
        return (e) => {
            if (!this.containerRef.current) {
                return;
            }
            const containerRect = this.containerRef.current.getBoundingClientRect();
            let width = this.state.width;
            let height = this.state.height;
            const aspectRatio = width / height;
            switch (direction) {
                case 'w':
                    width = Math.max(this.props.minWidth || 200, containerRect.right - e.clientX);
                    this.props.lockAspectRatio && (height = width / aspectRatio);
                    break;
                case 'e':
                    width = Math.max(this.props.minWidth || 200, e.clientX - containerRect.left);
                    this.props.lockAspectRatio && (height = width / aspectRatio);
                    break;
                case 'n':
                    height = Math.max(this.props.minHeight || 200, containerRect.bottom - e.clientY);
                    this.props.lockAspectRatio && (width = height * aspectRatio);
                    break;
                case 's':
                    height = Math.max(this.props.minHeight || 200, e.clientY - containerRect.top);
                    this.props.lockAspectRatio && (width = height * aspectRatio);
                    break;
                case 'nw':
                    width = Math.max(this.props.minWidth || 200, containerRect.right - e.clientX);
                    this.props.lockAspectRatio ? (height = width / aspectRatio) : (height = Math.max(this.props.minHeight || 200, containerRect.bottom - e.clientY));
                    break;
                case 'ne':
                    width = Math.max(this.props.minWidth || 200, e.clientX - containerRect.left);
                    this.props.lockAspectRatio ? (height = width / aspectRatio) : (height = Math.max(this.props.minHeight || 200, containerRect.bottom - e.clientY));
                    break;
                case 'sw':
                    width = Math.max(this.props.minWidth || 200, containerRect.right - e.clientX);
                    this.props.lockAspectRatio ? (height = width / aspectRatio) : (height = Math.max(this.props.minHeight || 200, e.clientY - containerRect.top));
                    break;
                case 'se':
                    width = Math.max(this.props.minWidth || 200, e.clientX - containerRect.left);
                    this.props.lockAspectRatio ? (height = width / aspectRatio) : (height = Math.max(this.props.minHeight || 200, e.clientY - containerRect.top));
                    break;
            }
            this.setState({ width, height });
        };
    }
    render() {
        const _a = this.props, { children, resizeHandle, cornerResizeHandle, sx, allowedDirections, minWidth, minHeight, initialWidth, initialHeight, lockAspectRatio, onChangeStarted, onChangeFinished } = _a, other = __rest(_a, ["children", "resizeHandle", "cornerResizeHandle", "sx", "allowedDirections", "minWidth", "minHeight", "initialWidth", "initialHeight", "lockAspectRatio", "onChangeStarted", "onChangeFinished"]);
        const { width, height } = this.state;
        return (React.createElement("div", Object.assign({ ref: this.containerRef, className: 'parent-container', style: Object.assign(Object.assign({}, sx), { width, height }) }, other),
            children, allowedDirections === null || allowedDirections === undefined ? undefined :
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
                    }
                }
                return (React.createElement("div", { key: direction, className: `easy-resize-handle-container easy-resize-handle-container-${direction}`, style: dynamicCornerHandleStyle, onMouseDown: (e) => {
                        var _a, _b;
                        e.preventDefault();
                        this.moveHandlerRef = this.handleMouseMove(direction);
                        document.addEventListener('mousemove', this.moveHandlerRef);
                        (_b = (_a = this.props).onChangeStarted) === null || _b === undefined ? undefined : _b.call(_a, width, height);
                    } }, direction.length > 1 && cornerResizeHandle ? (cornerResizeHandle) : (resizeHandle)));
            })));
    }
}
ResizableContainer.defaultProps = {
    minWidth: 0,
    minHeight: 0,
    initialWidth: 200,
    initialHeight: 200,
    lockAspectRatio: false,
    allowedDirections: ['n', 's', 'w', 'e', 'nw', 'ne', 'sw', 'se'],
    onChangeFinished: () => { },
    onChangeStarted: () => { },
    resizeHandle: React.createElement("div", { style: { width: 10, height: 10, backgroundColor: 'gray' } }),
    cornerResizeHandle: undefined,
};

export { ResizableContainer as default };
//# sourceMappingURL=index.js.map
