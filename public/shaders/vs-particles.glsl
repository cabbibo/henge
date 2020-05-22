
attribute float id;
			varying vec3 vColor;
			varying float vID;
			void main() {

				vColor = color;
				vID = id;

				vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

				gl_PointSize = 60.1 / length( mvPosition.xyz );

				gl_Position = projectionMatrix * mvPosition;

			}
