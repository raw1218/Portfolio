import { useState, useEffect, createContext, useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import LandingPage from './landing_page/LandingPage';
import Navbar from './navbar/navbar';

// Create context
export const WindowDimensionsContext = createContext();
export const currentPageContext = createContext();



const useWindowDimensions = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 750);
  const [dimensions, setDimensions] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
      centerX: window.innerWidth / 2,
      centerY: window.innerHeight / 2,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      offsetX: window.screenX,
      offsetY: window.screenY,
  });

  useEffect(() => {
      const handleResize = () => {
          setDimensions({
              width: window.innerWidth,
              height: window.innerHeight,
              centerX: window.innerWidth / 2,
              centerY: window.innerHeight / 2,
              screenHeight: window.screen.height,
              screenWidth: window.screen.width,
              offsetX: window.screenX,
              offsetY: window.screenY,
          });

          setIsMobile(window.innerWidth <= 750);
      };

      
        window.addEventListener('resize', handleResize);
        window.addEventListener('fullscreenchange', handleResize);
        window.addEventListener('mozfullscreenchange', handleResize);  // For Firefox
        window.addEventListener('webkitfullscreenchange', handleResize);  // For older versions of Safari and Chrome
        window.addEventListener('msfullscreenchange', handleResize);  // For IE

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('fullscreenchange', handleResize);
            window.removeEventListener('mozfullscreenchange', handleResize);
            window.removeEventListener('webkitfullscreenchange', handleResize);
            window.removeEventListener('msfullscreenchange', handleResize);
        };
    

  }, []);

  return dimensions;
}



function App() {

  const [currentPage, setCurrentPage] = useState('home');
  const windowDimensions = useWindowDimensions();

  return (
    <currentPageContext.Provider value = {{currentPage, setCurrentPage}}>
    <WindowDimensionsContext.Provider value={windowDimensions}>
      <div className="App" style={{ width: '100%', height: '100%' }}>
        <Navbar setCurrentPage={setCurrentPage}/>
        <LandingPage/>
      </div>
    </WindowDimensionsContext.Provider>
    </currentPageContext.Provider>
  );
}

export default App;

// Now, whenever you need to access the window dimensions within a component:
// const { width, height } = useContext(WindowDimensionsContext);

