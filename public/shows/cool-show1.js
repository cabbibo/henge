function MakeCoolShow1() {
  var stage = new Object3D();
  
  stage.uniforms = {
    dT:   G.uniforms.dT,
    time: G.uniforms.time,
    t_audio: G.uniforms.t_audio,
    t_matcap: G.uniforms.t_matcap,
    t_normal: G.uniforms.t_normal,
  }



  var goldMaterial = new THREE.ShaderMaterial({
    vertexShader: G.shaders.vs.gold,
    fragmentShader: G.shaders.fs.gold,
    uniforms: G.uniforms
  });
  var treeMat = new THREE.MeshStandardMaterial({
    color:0xffffff,
    normalMap: G.uniforms.t_normal.value,
   // metalnessMap : G.textures.vertabraeMetallic,
    metalness:1,
    roughness:.1,
    envMap: G.textures.cubemap,
   // map: G.textures.vertabraeAlbedo,
  
  }) 

  
  


  
  var centerMaterial = new THREE.ShaderMaterial({
    vertexShader: G.shaders.vs.pulseOrb,
    fragmentShader: G.shaders.fs.pulseOrb,
    uniforms: stage.uniforms
  });
  
  
  var centerGeo = new THREE.IcosahedronGeometry(0.5, 5); 
  var centerGeo = new THREE.ConeGeometry(0.5 ,1 , 20, 100);






  var globeRad = .6;
  var globePos = new THREE.Vector3( 0.1 , 1.6, .1);




  var params  = {
    material:              treeMat,
    radius:                 .2,
    height:                 2.5,
    sides:                  10,
    numOf:                  10, 
    randomness:             .3,
    slices:                 100,
    lightPosition:          new THREE.Vector3().copy( globePos ) ,
    lightSize:              globeRad,
    startingChance:          20.,
    chanceReducer:           .99,
    randomnessReducer:       .99,
    sliceReducer:            .4,
    numOfReducer:            .9,
    progressionPower:        2.2,
    lengthReduction:         .6,
    maxIterations:           3,
    flattening:              1.7,
    maxVerts:      100000
  }
  


  tree = new Tree( params );

  tree.position.x = 0;
  tree.position.z = 0;
  tree.position.y = -3;
  tree.scale.multiplyScalar( 2 );
  

  scene.add( tree );

  var sphere;

  var numCenter = 10;
  for( var i = 0; i < numCenter; i++ ){
  sphere = new THREE.Mesh( new THREE.IcosahedronGeometry( globeRad , 5 ),centerMaterial);
  sphere.position.copy(globePos);
  sphere.scale.multiplyScalar(.3);
  sphere.rotation.x = 2*Math.PI * i / numCenter
  tree.add(sphere);
  }

  /*
  var numOf = 20;
  for( var i = 0; i < 20; i++){
    var centerPiece = new THREE.Mesh(
      centerGeo,
      centerMaterial
    );
    centerPiece.rotation.z = (.25+(i/numOf )) * 2 * Math.PI;
    centerPiece.rotation.x = (.25+(i/numOf )) * 2 * Math.PI;
    centerPiece.position.x = 3*i/numOf-1.5;
    centerPiece.position.y = Math.random() - .5;///3*i/numOf-1.5;

    centerPiece.scale.x = i/numOf + .5;    
    centerPiece.scale.y = i/numOf + .5;
    centerPiece.scale.z = i/numOf + .5;

    stage.add(centerPiece);

  }  
  
  */
  
  
  
  var geo = new THREE.PlaneGeometry(35, 35, 100,100);

  var floor = new THREE.Mesh(geo, goldMaterial);
  floor.position.set(0, -2, 0);
  floor.rotation.x = -Math.PI/2;
  
  



  

  stage.add(floor);



  
  stage.looper = new Looper(G.audio, G.uniforms.time );

  
  var sliderHolder = new THREE.Object3D();
  
  sliderHolder.rotation.x = Math.PI/2;
  floor.add(sliderHolder);
  


  /*


 ___      _______  _______  _______  _______ 
|   |    |       ||       ||       ||       |
|   |    |   _   ||   _   ||    _  ||  _____|
|   |    |  | |  ||  | |  ||   |_| || |_____ 
|   |___ |  |_|  ||  |_|  ||    ___||_____  |
|       ||       ||       ||   |     _____| |
|_______||_______||_______||___|    |_______|


  */
  var loops = [

    G.audio.buffers.loop1.buffer,
    G.audio.buffers.loop2.buffer,
    G.audio.buffers.loop3.buffer,
    G.audio.buffers.loop4.buffer,
    G.audio.buffers.loop5.buffer,
    G.audio.buffers.loop3.buffer,
    G.audio.buffers.loop1.buffer,

  ]

  stage.numSliders = loops.length;
  stage.loopedAudio = {};
  stage.loopedGains = {};
  for( var i = 0; i < stage.numSliders; i++ ){
    var name = "slider" + (i+1);
    var a = (i / stage.numSliders) * 2 * Math.PI;
    var r = 5;
    var pos = new Vector3(Math.sin(a),0,-Math.cos(a));
    
    pos.multiplyScalar(r);
    G[name] = MakeBasicVerticalSlider(i, name , sliderHolder, 1,2.5, pos, .061)  
    G[name].Add();
    
    G[name].mesh.rotation.y = -a;

    G.uniforms[name] = { type:"f",value:0}

    stage.uniforms[name] = G.uniforms[name];

    stage.loopedGains[name] = G.audio.ctx.createGain();
    stage.loopedGains[name].connect(G.audio.reverbSmall)
   
    stage.loopedAudio[name] = new BufferedAudio( loops[i] , G.audio.ctx ,stage.loopedGains[name], false);
    stage.looper.everyLoop( function(){
      console.log("MESS " );
      this.play();
    }.bind( stage.loopedAudio[name] ))
  }
  
  
  

  /*


 _______  __    _  _______  ___   _  _______  _______ 
|       ||  |  | ||   _   ||   | | ||       ||       |
|  _____||   |_| ||  |_|  ||   |_| ||    ___||  _____|
| |_____ |       ||       ||      _||   |___ | |_____ 
|_____  ||  _    ||       ||     |_ |    ___||_____  |
 _____| || | |   ||   _   ||    _  ||   |___  _____| |
|_______||_|  |__||__| |__||___| |_||_______||_______|

  */


  var buffers = [
    G.audio.buffers.kick.buffer,
    G.audio.buffers.clap.buffer,
    G.audio.buffers.hihat.buffer,
    G.audio.buffers.snare.buffer
  ]

  let buffers_ch2pc = Object.values(G.audio.buffers).filter(i => i.file.substring(37,42) === 'ch2pc')
  let buffers_k2tecroom = Object.values(G.audio.buffers).filter(i => i.file.substring(37,42) === 'k2tec')
  randInt = (max) => {return Math.floor(Math.random() * Math.floor(max));}

  // window.buffers_ch2pc = buffers_ch2pc
  // console.log('buffers_ch2pc', buffers_ch2pc, buffers_ch2pc[randInt(buffers_ch2pc.length-1)])


  var colors = [
    0xffeeaa,
    0xffbbdd,
    0xaaffee,
    0xaaddff,
    0xccbbee
  ]

  stage.snakes = [];
  for( var i = 0; i < buffers.length; i++ ){
    // stage.snakes[i] = new Snake( i , buffers[i] , G.audio.reverbSmall , colors[i] );
    if (i<3)
      stage.snakes[i] = new Snake( i , buffers_ch2pc[randInt(buffers_ch2pc.length-1)].buffer , G.audio.reverbSmall , colors[i] );
    else
      stage.snakes[i] = new Snake( i , buffers_k2tecroom[randInt(buffers_k2tecroom.length-1)].buffer , G.audio.reverbSmall , colors[i] );

    stage.looper.addEveryNote( function(){
      this.nextNoteHighlight();
    }.bind( stage.snakes[i] ))
  
  }

  // https://jarm.imfast.io/henge/samples/ch2pc

/*
  stage.granSynth = new GranSynth( G.audio.buffers.lonely.buffer , G.audio.ctx , G.audio.gain , false );

  stage.granSynth.LinkSlider("playbackRate", G.slider1 , .5,2)
  stage.granSynth.LinkSlider("playbackRateRandomness", G.slider2 , 0,.2)
  stage.granSynth.LinkSlider("playbackSpeed", G.slider3 , .01,1)
  stage.granSynth.LinkSlider("playbackSpeedRandomness", G.slider4 , .0,1)
  stage.granSynth.LinkSlider("playbackLocation", G.slider5 , 0,4)
  stage.granSynth.LinkSlider("playbackLocationRandomness", G.slider6 , 0,3)
  stage.granSynth.LinkSlider("playbackLength", G.slider7 , .3,2)
  stage.granSynth.LinkSlider("playbackLengthRandomness", G.slider8 , 0,3)
  stage.granSynth.LinkSlider("playbackVolume", G.slider9 , 0,1)
  stage.granSynth.LinkSlider("playbackVolumeRandomness", G.slider10 , 0,1)*/

  
 light = new THREE.PointLight(0xffffff);
 light.intensity = 4;
 stage.add(light);


 light = new THREE.DirectionalLight(0xffffff);
 light.intensity = 2;
 stage.add(light);




 var particlesMaterial = new THREE.ShaderMaterial({
  vertexShader: G.shaders.vs.particles,
  fragmentShader: G.shaders.fs.particles,
  uniforms: stage.uniforms,
  
  vertexColors: true
});

 var mat = new THREE.PointsMaterial( { size:.1 , vertexColors: true } );
 var particleSystem = new ParticleSystem(particlesMaterial);
 stage.add(particleSystem);



  stage.update = function() {
    
    for(var i = 0; i < this.numSliders; i++){
      var name = "slider" + (i+1);
      G.uniforms[name].value = G[name].value
     this.loopedGains[name].gain.value = G[name].value
    }



    for( var i = 0; i < this.snakes.length; i++ ){
    this.snakes[i].update();
    }

    //this.granSynth.update();

    this.looper.update();
    
  };


  



  stage.start = function(){

   //// this.granSynth.start();
  }



  stage.start();







  return stage;
  
}
