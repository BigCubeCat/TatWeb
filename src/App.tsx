import Canvas from '@/components/Canvas/Canvas.tsx';
import AppBar from '@/components/AppBar/AppBar.tsx';
import SideBar from '@/components/SideBar/SideBar.tsx';
import Engine from '@/engine/engine.ts';

function App() {
  const eng = new Engine([], [], []);
  eng.Update();
  return (
    <>
      <AppBar />
      <SideBar />
      <Canvas />
    </>
  );
}

export default App;
