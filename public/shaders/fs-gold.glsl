uniform sampler2D t_audio;
uniform sampler2D t_matcap;
uniform sampler2D t_normal;
uniform samplerCube t_cubemap;


varying vec3 vNorm;
varying vec2 vUv;
varying vec3 vMPos;
varying vec3 vEye;
varying vec3 vPos;


$uvNormalMap
$semLookup


void main(){

	vec3 fNorm =uvNormalMap( t_normal , vPos , vUv  , vNorm , 1.6 , .2 );


vec3 refl = reflect(vEye , fNorm); 

  vec2 semLU = semLookup( normalize( vEye ) , fNorm );
  vec4 sem = texture2D( t_matcap , semLU );  


  vec4 cube = textureCube(t_cubemap, refl );

  

  float cutoff = .06*length(vMPos.xz);

  cutoff = smoothstep( 0.6 , 1.,cutoff);

  vec3 fCol = cube.xyz;


float match = -dot(normalize(vEye), fNorm );

  vec4 aCol = texture2D( t_audio , vec2(match * .6,0.) );
  fCol.xyz *= 1.+dot(normalize(vEye), fNorm );
  fCol.xyz *=2.* aCol.xyz ;
  vec3 col =  mix(fCol,vec3(0.,0.,0.), cutoff);
 //col = aCol.xyz;
  // vec4 audio = texture2D( t_audio , vec2( lamb , 0. ));
  gl_FragColor = vec4( col , 1. );


}
