import React, { CSSProperties, ReactNode, Component } from 'react';
import '../css/styles.css';

type ResizeDirection = 'n' | 's' | 'w' | 'e' | 'nw' | 'ne' | 'sw' | 'se';

interface ResizableContainerProps {
  children?: ReactNode;
  allowedDirections?: ResizeDirection[];
  minWidth?: number;
  minHeight?: number;
  initialWidth?: number;
  initialHeight?: number;
  onChangeFinished?: (newWidth: number, newHeight: number) => void;
  resizeHandle?: ReactNode;
  cornerResizeHandle: ReactNode;
  sx?: CSSProperties;
}

interface ResizableContainerState {
  width: number;
  height: number;
}

class ResizableContainer extends Component<ResizableContainerProps, ResizableContainerState> {
  containerRef: React.RefObject<HTMLDivElement|null>;
  moveHandlerRef: ((e: MouseEvent) => void) | null;

  static defaultProps = {
    minWidth: 200,
    minHeight: 200,
    initialWidth: 200,
    initialHeight: 200,
    allowedDirections: ['n', 's', 'w', 'e', 'nw', 'ne', 'sw', 'se'],
    onChangeFinished: () => {},
    resizeHandle: <div className='easy-resize-handle' />,
    cornerResizeHandle: undefined,
  };

  constructor(props: ResizableContainerProps) {
    super(props);
    this.state = {
        width: Math.max((props.initialWidth || 200), (props.minWidth || 200)),
        height: Math.max((props.initialHeight || 200), (props.minHeight || 200)),
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
    if (this.moveHandlerRef) {
      document.removeEventListener('mousemove', this.moveHandlerRef);
      this.moveHandlerRef = null;
      this.props.onChangeFinished?.(this.state.width, this.state.height);
    }
  }

  handleMouseMove(direction: ResizeDirection) {
    return (e: MouseEvent) => {
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
    const { children, resizeHandle, cornerResizeHandle, sx, allowedDirections, minWidth, minHeight, initialWidth, initialHeight, onChangeFinished, ...other } = this.props;
    const { width, height } = this.state;

    return (
      <div
        ref={this.containerRef}
        className='parent-container'
        style={{ ...sx, width, height }}
        {...other}
      >
        {children}
        {allowedDirections?.map((direction) => {
          let dynamicCornerHandleStyle: CSSProperties = {};
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

          return (
            <div
              key={direction}
              className={`easy-resize-handle-container easy-resize-handle-container-${direction}`}
              style={dynamicCornerHandleStyle}
              onMouseDown={(e) => {
                e.preventDefault();
                this.moveHandlerRef = this.handleMouseMove(direction);
                document.addEventListener('mousemove', this.moveHandlerRef);
              }}
            >
              {direction.length > 1 && cornerResizeHandle ? (
                cornerResizeHandle
              ) : (
                resizeHandle
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default ResizableContainer;