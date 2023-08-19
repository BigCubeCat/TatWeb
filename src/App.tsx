import Canvas from '@/components/Canvas/Canvas.tsx';
import AppBar from '@/components/AppBar/AppBar.tsx';
import SideBar from '@/components/SideBar/SideBar.tsx';

function App() {
  return (
    <>
      <AppBar />
      <SideBar />
      <Canvas />
    </>
  );
}

export default App;
