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
declare class ResizableContainer extends Component<ResizableContainerProps, ResizableContainerState> {
    containerRef: React.RefObject<HTMLDivElement | null>;
    moveHandlerRef: ((e: MouseEvent) => void) | null;
    static defaultProps: {
        minWidth: number;
        minHeight: number;
        initialWidth: number;
        initialHeight: number;
        allowedDirections: string[];
        onChangeFinished: () => void;
        resizeHandle: React.JSX.Element;
        cornerResizeHandle: undefined;
    };
    constructor(props: ResizableContainerProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleMouseUp(): void;
    handleMouseMove(direction: ResizeDirection): (e: MouseEvent) => void;
    render(): React.JSX.Element;
}
export default ResizableContainer;
