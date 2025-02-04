# Easy Resize

[![npm](https://img.shields.io/npm/v/easy-resize.svg)](https://www.npmjs.com/package/easy-resize)

A React component that allows you to have an easily resizable container.

## Installation

With npm

```
npm i easy-resize
```

With yarn

```
yarn add easy-resize
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `allowedDirections` | `Array<'n'\|'s'\|'w'\|'e'\|'nw'\|'ne'\|'sw'\|'se'>` | `['n','s','w','e','nw','ne','sw','se']` | Directions where resize handles should appear |
| `minWidth` | `number` | `0` | Minimum width the container can be resized to |
| `minHeight` | `number` | `0` | Minimum height the container can be resized to |
| `initialWidth` | `number` | `200` | Initial width of the container |
| `initialHeight` | `number` | `200` | Initial height of the container |
| `onChangeFinished` | `(width: number, height: number) => void` | `() => {}` | Callback fired when resizing is complete |
| `resizeHandle` | `ReactNode` | `<div className="easy-resize-handle" />` | Custom resize handle for edges |
| `cornerResizeHandle` | `ReactNode` | `undefined` | Custom resize handle for corners |
| `sx` | `CSSProperties` | `{}` | Additional CSS styles for the container |

## Examples

### Basic Usage with Custom Initial Size

```jsx
import ResizableContainer from 'easy-resize'

<ResizableContainer
  initialWidth={400}
  initialHeight={300}
  minWidth={200}
  minHeight={200}
>
  <div>
    Content goes here
  </div>
</ResizableContainer>
```

### Limiting Resize Directions

```jsx
import ResizableContainer from 'easy-resize'

<ResizableContainer
  allowedDirections={['e', 'se', 's']} // Only allow resizing from right side, bottom, and bottom-right corner
>
  <div>
    Content goes here
  </div>
</ResizableContainer>
```

### Using Custome Resize Handles

- You can specify custom resize handles.
- There is a basic resize handle option, and a corner resize handle option, if only the basic resize handle is defined then this will also be used for the corners.
- Corner resize handles will automatically be rotated to be facing towards the corner.

```jsx
import ResizableContainer from 'easy-resize'

<ResizableContainer
  resizeHandle={<div style={{ width: 8, height: 8, backgroundColor: 'blue' }} />}
  cornerResizeHandle={<div style={{ width: 10, height: 10, backgroundColor: 'red' }} />}
>
  <div>
    Content goes here
  </div>
</ResizableContainer>
```
````