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
declare class ResizableContainer extends Component<ResizableContainerProps, ResizableContainerState> {
    containerRef: React.RefObject<HTMLDivElement | null>;
    moveHandlerRef: ((e: MouseEvent | TouchEvent) => void) | null;
    static defaultProps: {
        minWidth: number;
        minHeight: number;
        initialWidth: number;
        initialHeight: number;
        lockAspectRatio: boolean;
        allowedDirections: string[];
        onChangeFinished: () => void;
        onChangeStarted: () => void;
        resizeHandle: React.JSX.Element;
        cornerResizeHandle: undefined;
    };
    constructor(props: ResizableContainerProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    handlePointerUp: () => void;
    handlePointerMove(direction: ResizeDirection): (e: MouseEvent | TouchEvent) => void;
    render(): React.JSX.Element;
}
export default ResizableContainer;
