import ResizableContainer from '../../lib/ResizableContainer'
import "./App.css"

function App() {

  return (
    <div className='app-container'>
      <ResizableContainer className='resizable-container'>
        <img 
          src="/Camface.jpg" 
          alt="Description of image"
          style={{ width: '100%', height: '100%', objectFit: 'fill' }}
        />
      </ResizableContainer>
    </div>
  )
}

export default App
