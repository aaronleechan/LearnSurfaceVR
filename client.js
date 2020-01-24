// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance,Module,Surface} from 'react-360-web';

function init(bundle, parent, options = {}) {
  r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    nativeModules:[
      new MyModule(),
    ],
    ...options,
  });

  buttonSurface = new Surface(300,300,Surface.SurfaceShape.Flat);

  buttonSurface.setAngle(
    6,
    0
    )

    r360.renderToSurface(
      r360.createRoot('ButtonSurface', { /* initial props */ }),
      buttonSurface
    );


surface = r360.getDefaultSurface()

  // Render your app content to the default cylinder surface
  surfacePanel = r360.renderToSurface(
    r360.createRoot('AdvancedSurfacesVR', { /* initial props */ }),
    surface
  );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('360_world.jpg'));
}

class MyModule extends Module {
  constructor(){
    super('MyModule')
  }

  changeSurfaceType(Type){
    Type === "Flat" ? surface.setShape(Surface.SurfaceShape.Flat) : surface.setShape(Surface.SurfaceShape.Cylinder);
  }
  resizeSurface(width,height){
    surface.resize(width,height);
  }

  createPanel(){
    r360.renderToSurface(
      r360.createRoot('AdvancedSurfacesVR',{}),
      surface
    )
  }

  destroyPanel(){
    r360.detachRoot(surfacePanel);
  }
}

window.React360 = {init};
