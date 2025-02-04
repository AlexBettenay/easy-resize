import React, { CSSProperties, ReactNode, Component } from 'react';
import '../css/styles.css';

export type ResizeDirection = 'n' | 's' | 'w' | 'e' | 'nw' | 'ne' | 'sw' | 'se';

/**
 * Props for the ResizableContainer component
 * @interface ResizableContainerProps
 */
export interface ResizableContainerProps {
  /** React children to be rendered inside the container */
  children?: ReactNode;
  
  /** Array of directions where resize handles should appear
   * @default ['n','s','w','e','nw','ne','sw','se'] */
  allowedDirections?: ResizeDirection[];
  
  /** Minimum width in pixels the container can be resized to
   * @default 0 */
  minWidth?: number;
  
  /** Minimum height in pixels the container can be resized to
   * @default 0 */
  minHeight?: number;
  
  /** Initial width in pixels for the container
   * @default 200 */
  initialWidth?: number;
  
  /** Initial height in pixels for the container
   * @default 200 */
  initialHeight?: number;
  
  /** Callback fired when resize operation is complete
   * @param newWidth - The final width after resizing
   * @param newHeight - The final height after resizing
   * @default () => {} */
  onChangeFinished?: (newWidth: number, newHeight: number) => void;
  
  /** Custom React element to use as resize handle for edges
   * @default <div style={{width: 10, height: 10, backgroundColor: 'gray'}} /> */
  resizeHandle?: ReactNode;
  
  /** Custom React element to use as resize handle for corners */
  cornerResizeHandle: ReactNode;
  
  /** Additional CSS styles to apply to the container */
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
    minWidth: 0,
    minHeight: 0,
    initialWidth: 200,
    initialHeight: 200,
    allowedDirections: ['n', 's', 'w', 'e', 'nw', 'ne', 'sw', 'se'],
    onChangeFinished: () => {},
    resizeHandle: <div style={{width: 10, height: 10, backgroundColor: 'gray'}} />,
    cornerResizeHandle: undefined,
  };

  constructor(props: ResizableContainerProps) {
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