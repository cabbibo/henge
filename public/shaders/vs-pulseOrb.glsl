uniform sampler2D t_audio;
uniform float time;
uniform float slider1;
uniform float slider2;
uniform float slider3;

varying vec3 vNorm;
varying vec2 vUv;
varying vec3 vPos;
varying vec3 vMPos;
varying vec3 vEye;
varying float vNoise;
varying float vOffset;


$simplex


void main(){

  vNorm = normal;//( modelMatrix * vec4( normal , 0. )).xyz;
  vUv   = uv;
  vPos  = position;
  vMPos  = ( modelMatrix * vec4( vPos , 1.  )).xyz;

  vEye = vMPos - cameraPosition;
  
  vNoise = (1.+snoise( vPos * (.4 + 5. * slider1) + vec3(0.,0.,0.) ))/2.;
  vNoise *= 1.;//*slider2;
  
  vec4 color = texture2D(t_audio,vec2(vNoise,0.));
  
  vOffset = ((length(color)/3.) -.3);
  vPos += (( color.x * color.x * color.x) -.5) * (vNorm + vec3(0.,1.,0.)) ;// *slider3;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( vPos, 1. );

}