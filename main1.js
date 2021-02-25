let scene, camera, renderer, earth, moon, sphere;
var axis = new THREE.Vector3(0, 1, 0).normalize();

var mouse = {
  x: 0,
  y: 0
};

function init(){
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, .01, 2000);
  scene.add(camera);
  camera.position.set(0,150,400);
  camera.lookAt(scene.position);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);


  var light = new THREE.AmbientLight( 0x404040 ); // soft white light
  scene.add( light );

  //Create a Sphere Geometry

  //Old static light
  //var light = new THREE.PointLight(0xffffff);
  //light.position.set(50,300,300);
  //scene.add(light);

  //Spere Geometry
	var sphereGeometryEarth = new THREE.SphereGeometry( 100, 32, 32 );
  var sphereGeometryMoon = new THREE.SphereGeometry( 10, 32, 32 );

	//Create Sphere Mesh
	var sphereMaterial = new THREE.MeshLambertMaterial( {color: 0x8888ff, wireframe: true} );

	//Create and Position Sphere Object
	earth = new THREE.Mesh(sphereGeometryEarth, sphereMaterial);
  earth.name = "earth";
	earth.position.set(0, 0, 0);
	scene.add(earth);

  moon = new THREE.Mesh(sphereGeometryMoon, sphereMaterial);
  moon.name = "moon";
  moon.position.set(170,0,0)
  scene.add(moon);

  //light movement Geometry
  light2 = new THREE.PointLight( 0xFFFF00, 5, 100 );
  light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0040ff } ) ) );
  scene.add( light2 );

  document.addEventListener('mousemove', onMouseMove, false);

}
//Capture and copy mouse position
function onMouseMove(event) {

  // Update the mouse variable
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Make the sphere follow the mouse
  var vector = new THREE.Vector3(mouse.x, mouse.y, 2);
  vector.unproject(camera);
  var dir = vector.sub(camera.position).normalize();
  var distance = -camera.position.z / dir.z;
  var pos = camera.position.clone().add(dir.multiplyScalar(distance));

  light2.position.copy(new THREE.Vector3(pos.x, pos.y, pos.z + 110));
}

function update(){
  requestAnimationFrame(update);

  //Testing rotation
  //earth.rotation.y += .001;
  //sphere.rotateY += .01;
  //renderer.render(scene, camera);
  render();
}
//Setting orbit rotation
var quaternion = new THREE.Quaternion();
 function render() {
   earth.rotation.y += 0.0003;

   quaternion.setFromAxisAngle(axis, 0.005);
   moon.position.applyQuaternion(quaternion);

   renderer.render(scene, camera);
 }

init();
update();
