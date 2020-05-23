


function init(){
  
  scene = new THREE.Scene();
  //scene.background = G.textures.cubemap;
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  camera.offsetX = 0;
  camera.offsetY = 0;
  
  camera.update = function(){
    
    if( SERVER ){
      if(SERVER.myUser){
        this.offsetX = THREE.Math.lerp( this.offsetX , SERVER.myUser.normalizedScreenPos.x * .6, .1);// -SERVER.myUser.oScreenPosition.x
        this.offsetY = THREE.Math.lerp( this.offsetY , SERVER.myUser.normalizedScreenPos.y * .6, .1);// -SERVER.myUser.oScreenPosition.x

      }
    }
  }
  
  objectControls = new ObjectControls( camera );
  
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
 
  document.body.appendChild( renderer.domElement );
  
  
  controls = new OrbitControls( camera , renderer.domElement );
  controls.panSpeed = 0;

				//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

				controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
				controls.dampingFactor = 0.03;
        controls.zoomSpeed = 3;
				controls.screenSpacePanning = false;

				controls.minDistance = 3;
				controls.maxDistance = 15;

				controls.maxPolarAngle = Math.PI / 2 -.1;				
  controls.minPolarAngle =  Math.PI / 2 - .8;
  
  camera.position.z = 10

  


  
}