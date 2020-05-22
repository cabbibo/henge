function Snake( id, note , reverb , color ){
  

  this.id = id;

  this.audio = new BufferedAudio( note , G.audio.ctx ,G.audio.reverbSmall, false );//, output , looping){
  this.sections = []
  

  this.oPos = new THREE.Vector3();
  
  

  
  var offMat = new THREE.MeshStandardMaterial({
    color:color,
    normalMap: G.textures.vertabraeNormal,
    //metalnessMap : G.textures.vertabraeMetallic,
    metalness:1,
    roughness:0,
    envMap: G.textures.cubemap,
    map: G.textures.vertabraeAlbedo,

  })  

  var onMat = new THREE.MeshStandardMaterial({
    color:color,
    //normalMap: G.textures.vertabraeNormal,
   // metalnessMap : G.textures.vertabraeMetallic,
    metalness:1,
    roughness:.1,
    envMap: G.textures.cubemap,
   // map: G.textures.vertabraeAlbedo,

  }) 

  var hoverOverMat = new THREE.MeshStandardMaterial({
    color:color,
    //normalMap: G.textures.vertabraeNormal,
    //metalnessMap : G.textures.vertabraeMetallic,
    metalness:0,
    roughness:1,
    envMap: G.textures.cubemap,
    map: G.textures.vertabraeAlbedo,

  }) 
  


    
  var m = new THREE.Mesh(
    
    G.models.face.geometry,
    onMat
  );

  this.head = new Moveable("snakeHead"+this.id, m); 

  scene.add(m);

  m.scale.set(.4 , .4 , .4)

  



  this.numSections = 16;

    for( var i = 0; i <this.numSections; i++ ){
    var m = new THREE.Mesh(
      new THREE.BoxGeometry(4,5,2),
      new THREE.MeshNormalMaterial()
    );
  
    
    m.position = new THREE.Vector3();
    //m.position.set(Math.random(),Math.random(),Math.random());

   m.visible = false;

    var vert = new THREE.Mesh( 
      G.models.vertabrae.geometry, offMat
    )

    var s = 1-(i / this.numSections)
   // m.scale.set(s,s,s);
    var s = .3;//-(i / this.numSections)
    vert.scale.set( s,s,s );
    vert.oScale = vert.scale.clone();
    vert.add(m);
    scene.add(vert);
    
    this.sections[i] = new Clickable("snake" +this.id+"Bod"+i, m  , onMat , offMat );
    this.sections[i].vert = vert;

    this.sections[i].onActivate = function(){
      this.vert.material = this.onMat
      this.vert.materialNeedsUpdate = true;
    }.bind( this.sections[i] );

    
    this.sections[i].onDeactivate = function(){
      this.vert.material = this.offMat
      this.vert.materialNeedsUpdate = true;
    }.bind( this.sections[i] );


    
    this.sections[i].onHoverOver = function(){
      this.vert.material = hoverOverMat
      this.vert.materialNeedsUpdate = true;
      this.vert.scale.set(.4,.4,.4);
    }.bind( this.sections[i] );

  this.sections[i].onHoverOut = function(){
    if( this.active == true ){
    this.vert.material = onMat
    }else{
      this.vert.material = offMat;
    }
    this.vert.materialNeedsUpdate = true;
    
    this.vert.scale.copy(this.vert.oScale);
  }.bind( this.sections[i] );

  }
  
  this.currentNote = 0;

  
}


Snake.prototype.nextNoteHighlight = function(){
  
  this.sections[this.currentNote].vert.scale.copy( this.sections[this.currentNote].vert.oScale );
  this.currentNote ++;
  this.currentNote %= this.sections.length;
  if( this.sections[this.currentNote].active){ this.audio.play(); }
  this.sections[this.currentNote].vert.scale.set(.4,.4,.4);
}

Snake.prototype.update = function(){
  


  
 
  if( this.head.selected ){
  
  
  }else{
    this.head.mesh.position.lerp( this.getHeadPosition() ,.03); 
 
  }


  if( this.oPos.distanceTo(this.head.mesh.position) > .0001 ){
  this.head.mesh.lookAt( this.oPos );
  this.head.mesh.rotateY( Math.PI / 2 );
  }
  this.sections[0].vert.position.lerp( this.head.mesh.position , .05);
  this.sections[0].vert.lookAt( this.head.mesh.position );
  this.sections[0].vert.rotateY( Math.PI);
  for( var i = 1; i < this.sections.length; i++ ){
    
    this.sections[i].vert.position.lerp( this.sections[i-1].vert.position , .05);
    this.sections[i].vert.lookAt( this.sections[i-1].vert.position );
    this.sections[i].vert.rotateY( Math.PI);
  }
  

  this.oPos.copy(this.head.mesh.position)
  
}


Snake.prototype.getHeadPosition = function(){
  var t = G.uniforms.time.value * .05;

  var v = this.id / 10 

  var x = 4*Math.sin( t * 2.6 * (v+3) + this.id ) + 2 * Math.sin( t * 2 * (v+1) + this.id + Math.sin( this.id + t));
  var y = 1*Math.sin( 10*t * 1.6 * (v*3+1) + 2*this.id ) + 1 * Math.sin( t * 1.7 * (v+1) + 3*this.id + Math.sin( this.id*t + 2*t));
  var z = 4*Math.sin( t * 1.8 * (v*1.4+2) + this.id ) + 2 * Math.sin( t * 2.8 * (v*1.31+2) + this.id + Math.sin( this.id + 3*t));
  return new THREE.Vector3( x , 5+y,z);
}


