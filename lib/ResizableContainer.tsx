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

  /** Custom className to be applied to the container */
  className?: string;
  
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

  /** Locks the aspect ratio of the container when resizing
   * @default false */
  lockAspectRatio?: boolean;

  /** Callback fired when resize operation is started
   * @param initWidth - TThe width when resizing starts
   * @param initHeight - The height when resizing starts
   * @default () => {} */
  onChangeStarted?: (initWidth: number, initHeight: number) => void;
  
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
    lockAspectRatio: false,
    allowedDirections: ['n', 's', 'w', 'e', 'nw', 'ne', 'sw', 'se'],
    onChangeFinished: () => {},
    onChangeStarted: () => {},
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

      let width = this.state.width;
      let height = this.state.height;
      const aspectRatio = width / height;

      switch (direction) {
        case 'w':
          width = Math.max(this.props.minWidth || 200, containerRect.right - e.clientX)
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
          width = Math.max(this.props.minWidth || 200, containerRect.right - e.clientX)
          this.props.lockAspectRatio ? (height = width / aspectRatio):(height = Math.max(this.props.minHeight || 200, containerRect.bottom - e.clientY));
          break;
        case 'ne':
          width = Math.max(this.props.minWidth || 200, e.clientX - containerRect.left);
          this.props.lockAspectRatio ? (height = width / aspectRatio):(height = Math.max(this.props.minHeight || 200, containerRect.bottom - e.clientY));
          break;
        case 'sw':
          width = Math.max(this.props.minWidth || 200, containerRect.right - e.clientX);
          this.props.lockAspectRatio ? (height = width / aspectRatio):(height= Math.max(this.props.minHeight || 200, e.clientY - containerRect.top));
          break;
        case 'se':
          width = Math.max(this.props.minWidth || 200, e.clientX - containerRect.left);
          this.props.lockAspectRatio ? (height = width / aspectRatio):(height = Math.max(this.props.minHeight || 200, e.clientY - containerRect.top));
          break;
        default:
          break;
        }
        
      this.setState({ width, height });
    };
  }

  render() {
    const { children, resizeHandle, cornerResizeHandle, sx, allowedDirections, className, minWidth, minHeight, initialWidth, initialHeight, lockAspectRatio, onChangeStarted, onChangeFinished, ...other } = this.props;
    const { width, height } = this.state;

    return (
      <div
        ref={this.containerRef}
        className={`parent-container ${className || ''}`}
        style={{ ...sx, width, height }}
        {...other}
      >
        <div className='parent-inner'>
          {children}
        </div>
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
                this.props.onChangeStarted?.(width, height)
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