import './App.css';
import Toolbar from './Toolbar.jsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend'

function App() {
  return (
    <div className="p-[20px] h-[100%]">
      <DndProvider backend={/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? TouchBackend : HTML5Backend}>
        <Toolbar />
      </DndProvider>
    </div>
  );
}

export default App;
