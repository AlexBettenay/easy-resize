import React from "react";
import ResizableContainer from "../lib/ResizableContainer";

const ExamplePage = () => {
    return (
        <ResizableContainer
        allowedDirections={['n','s','w','e','nw','ne','sw','se']}
        initialWidth={400}
        initialHeight={400}
        sx={{border: '1px solid black'}}
        >
        <div style={{padding: 10}}>
            <h1>Resizable Container Example</h1>
            <p>Drag the edges or corners of the container to resize it.</p>
        </div>
        </ResizableContainer>
    );
};

export default ExamplePage;