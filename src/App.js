import { useState, useEffect, createContext, useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import LandingPage from './landing_page/LandingPage/LandingPage';
import Navbar from './navbar/navbar';


import im1 from './images/SVGS/brain.svg'
import im2 from './images/SVGS/cSharp.svg'
import im3 from './images/SVGS/c.svg'
import im4 from './images/SVGS/c++.svg'
import im5 from './images/SVGS/circuit.svg'
import im6 from './images/SVGS/cpu.svg'
import im7 from './images/SVGS/css.svg'
import im8 from './images/SVGS/d3.svg'
import im9 from './images/SVGS/docker.svg'
import im10 from './images/SVGS/git.svg'
import im11 from './images/SVGS/github.svg'
import im12 from './images/SVGS/google_cloud.svg'
import im13 from './images/SVGS/html.svg'
import im14 from './images/SVGS/js.svg'
import im15 from './images/SVGS/java.svg'
import im16 from './images/SVGS/lightbulb.svg'
import im17 from './images/SVGS/python.svg'
import im18 from './images/SVGS/react.svg'
import im19 from './images/SVGS/website.svg'


// Create context
export const WindowDimensionsContext = createContext();
export const currentPageContext = createContext();






const imagesToPreload = [
  im1, im2, im3, im4, im5, im6, im7, im8, im9, im10, im11,
  im12, im13, im14, im15, im16, im17, im18, im19, 
]

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

function preloadImage(src) {
  return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;

  });
}


function App() {

  useEffect(() => {
    imagesToPreload.forEach(image => {
        preloadImage(image);
    });
}, []); 

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

