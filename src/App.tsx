import Canvas from '@/components/Canvas/Canvas.tsx';
import AppBar from '@/components/AppBar/AppBar.tsx';
import SideBar from '@/components/SideBar/SideBar.tsx';
import Footer from '@/components/footer/Footer.tsx';

function App() {
  return (
    <>
      <AppBar />
      <SideBar />
      <Canvas />
      <Footer />
    </>
  );
}

export default App;
