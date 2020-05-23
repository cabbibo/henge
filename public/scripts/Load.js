
function LoadItAll(){

  loadOBJ( 'https://cdn.glitch.com/795da756-4586-4b4b-82a3-eb1104560a1b%2Ftentacle1.obj?v=1586368291575', function(child){
    G.models.tentacle1 = child;
  })



  loadAudio("loop1","https://jarm.imfast.io/henge/loops8/1.mp3")
  loadAudio("loop2","https://jarm.imfast.io/henge/loops8/2.mp3")
  loadAudio("loop3","https://jarm.imfast.io/henge/loops8/3.mp3")
  loadAudio("loop4","https://jarm.imfast.io/henge/loops8/4.mp3")
  loadAudio("loop5","https://jarm.imfast.io/henge/loops8/5.mp3")
  loadAudio("loop6","https://jarm.imfast.io/henge/loops8/6.mp3")
  loadAudio("loop7","https://jarm.imfast.io/henge/loops8/7.mp3")
  loadAudio("loop8","https://jarm.imfast.io/henge/loops8/8.mp3")
  //loadAudio("loop3","https://jarm.imfast.io/henge/loops/3.mp3")
  //loadAudio("loop4","https://jarm.imfast.io/henge/loops/4.mp3")
  //loadAudio("loop5","https://jarm.imfast.io/henge/loops/5.mp3")
  //loadAudio("loop6","https://jarm.imfast.io/henge/loops/6.mp3")
  //loadAudio("loop7","https://jarm.imfast.io/henge/loops/7.mp3")
//
//
  //loadAudio("sample1","https://jarm.imfast.io/henge/samples/1.mp3")
  //loadAudio("sample2","https://jarm.imfast.io/henge/samples/2.mp3")
  //loadAudio("sample3","https://jarm.imfast.io/henge/samples/3.mp3")
  //loadAudio("sample4","https://jarm.imfast.io/henge/samples/4.mp3")
  //loadAudio("sample5","https://jarm.imfast.io/henge/samples/5.mp3")

  let ch2pc_total_samples = 77
  for (var i = 0; i < ch2pc_total_samples; i++) {
    if (i<9)
      loadAudio('ch2pc_'+i, "https://jarm.imfast.io/henge/samples/ch2pc/ch2_percussion_0"+(i+1)+".wav.mp3")
    else
      loadAudio('ch2pc_'+i, "https://jarm.imfast.io/henge/samples/ch2pc/ch2_percussion_"+(i+1)+".wav.mp3")
  }

  let k2tecroom_total_samples = 13
  for (var i = 0; i < k2tecroom_total_samples; i++) {
    if (i<9)
      loadAudio('ch2pc_'+i, "https://jarm.imfast.io/henge/samples/k2tecroom/k2_techno_room_0"+(i+1)+".mp3")
    else
      loadAudio('ch2pc_'+i, "https://jarm.imfast.io/henge/samples/k2tecroom/k2_techno_room_"+(i+1)+".mp3")
  }

  loadAudio("kick","resources/Kick 008 Vinyl.wav")
  loadAudio("clap","resources/Clap 005.wav")
  loadAudio("snare","resources/Snare 007.wav")
  loadAudio("hihat","resources/HiHat Closed 003 909x.wav")
  


  neededToLoad ++;
  G.shaders.load( 'vs-gold' , 'gold' , 'vertex' );
  G.shaders.load( 'fs-gold' , 'gold' , 'fragment');
 
  G.shaders.load( 'vs-pulseOrb' , 'pulseOrb' , 'vertex');
  G.shaders.load( 'fs-pulseOrb' , 'pulseOrb' , 'fragment');


  
  G.shaders.load( 'vs-tree' , 'tree' , 'vertex');
  G.shaders.load( 'fs-tree' , 'tree' , 'fragment');
  
  
  G.shaders.load( 'vs-face' , 'face' , 'vertex');
  G.shaders.load( 'fs-face' , 'face' , 'fragment');
  
  
    
  G.shaders.load( 'vs-eyes' , 'eyes' , 'vertex');
  G.shaders.load( 'fs-eyes' , 'eyes' , 'fragment');
  
  
  G.shaders.load( 'vs-rod' , 'rod' , 'vertex');
  G.shaders.load( 'fs-rod' , 'rod' , 'fragment');
  
  G.shaders.load( 'vs-handle' , 'handle' , 'vertex');
  G.shaders.load( 'fs-handle' , 'handle' , 'fragment');


  
  G.shaders.load( 'vs-particles' , 'particles' , 'vertex');
  G.shaders.load( 'fs-particles' , 'particles' , 'fragment');



  loadTexture('https://cdn.glitch.com/795da756-4586-4b4b-82a3-eb1104560a1b%2Frough-aluminium.jpg?v=1586368300634',function(texture){
    G.uniforms.t_matcap.value = texture
  });


  loadTexture('https://cdn.glitch.com/795da756-4586-4b4b-82a3-eb1104560a1b%2Frough-aluminium.jpg?v=1586368300634',function(texture){
    G.uniforms.t_normal.value = texture
  });

  loadTexture('https://cdn.glitch.com/795da756-4586-4b4b-82a3-eb1104560a1b%2Frough-aluminium.jpg?v=1586368300634',function(texture){
    G.uniforms.t_cubemap.value = texture
  });

  loadTexture('https://cdn.glitch.com/795da756-4586-4b4b-82a3-eb1104560a1b%2Frough-aluminium.jpg?v=1586368300634',function(texture){
    G.uniforms.t_matcap.value = texture
  });


  loadTexture("resources/vertabrae_Material_Normal.png", function( texture){
    G.textures.vertabraeNormal = texture;
  })

  loadTexture("resources/vertabrae_Material_MetallicSmoothness.png", function( texture){
    G.textures.vertabraeMetallic = texture;
  })

  loadTexture("resources/vertabrae_Material_AlbedoTransparency.png", function( texture){
  G.textures.vertabraeAlbedo = texture;
  })



  loadTexture("resources/Sand Normal Map.jpg", function( texture){
    
    texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
    G.uniforms.t_normal.value = texture;
    })

  loadCubeMap( "resources/mountainCubemap/" ,function(texture){
    G.textures.cubemap = texture;
    G.uniforms.t_cubemap.value = texture
  });



  loadOBJ( "vertBray.obj", function(model){
    console.log( model );
    G.models.vertabrae = model
  })


  loadOBJ( "resources/draggieFace.obj", function(model){
    console.log( model );
    G.models.face = model
  })

}



function loadAudio( name , file ){
  neededToLoad += 1;
  G.audio.buffers[name] = new AudioBuffer( G.audio , file );
  G.audio.buffers[name].addLoadEvent( function(){ onLoad(); });
}

function loadOBJ( file , callback ){

  neededToLoad += 1;

  loader.load( file, function ( object ) {

    object.traverse( function ( child ) {

      if ( child instanceof THREE.Mesh ) {
        callback(child);
      }else{
        //console.log("NOPE");
      }

    });

    onLoad();

  });

}


function loadCubeMap( folder , callback ){
  neededToLoad += 1;
  new THREE.CubeTextureLoader()
	.setPath( folder )
	.load( [
		'px.png',
		'nx.png',
		'py.png',
		'ny.png',
		'pz.png',
		'nz.png'
	] , function(t){ 
     callback(t)
    onLoad(); 
  });
}

function loadTexture( file , callback ){

  neededToLoad += 1;

  tLoader.load(file,function(texture){
    onLoad();
    callback(texture);
  });

}


loadDiv = document.getElementById("loadBar")
startButtonDiv = document.getElementById("startButton")
curtainDiv = document.getElementById("curtain")


    startButtonDiv.style.display ="none";

startButtonDiv.addEventListener("mouseup", event => {
startItAll()
});

function startItAll(){
  G.audio.ctx.resume()
  //document.body.requestFullscreen()
  //Tone.context.resume()
    init();
    afterInit();
  curtainDiv.style.display ="none";
}


function onLoad(){
  
  loaded ++;

  loadDiv.style.width = (( loaded / neededToLoad ) * window.innerWidth) + "px" 
  
  //loaderHolder.style.top = .5 * window.innerHeight - .5 * loaderHolder.offsetWidth + "px"

  //console.log("YUPPPPP")

  //document.getElementById("mydiv").offsetWidth

  //console.log( startButton.offsetWidth)
  //startButton.style.left =  .5 * window.innerWidth  - .5 * startButton.offsetWidth+ "px"
  
  if( neededToLoad == loaded ){
    startButtonDiv.style.display ="block";
    //startItAll();
    
  }
}


     