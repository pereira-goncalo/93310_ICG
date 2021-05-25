"use strict";

//
// 		J. Madeira - April 2021
//

// To store the scene graph, and elements usefull to rendering the scene
const sceneElements = {
    sceneGraph: null,
    camera: null,
    renderer: null,
};


// Functions are called
//  1. Initialize the empty scene
//  2. Add elements within the scene
//  3. Animate
helper.initEmptyScene(sceneElements);
load3DObjects(sceneElements.sceneGraph);
requestAnimationFrame(computeFrame);

// HANDLING EVENTS

// Event Listeners

window.addEventListener('resize', resizeWindow);

//To keep track of the keyboard - WASD
var keyD = false, keyA = false, keyS = false, keyW = false;
document.addEventListener('keydown', onDocumentKeyDown, false);
document.addEventListener('keyup', onDocumentKeyUp, false);

// Update render image size and camera aspect when the window is resized
function resizeWindow(eventParam) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    sceneElements.camera.aspect = width / height;
    sceneElements.camera.updateProjectionMatrix();

    sceneElements.renderer.setSize(width, height);
}

function onDocumentKeyDown(event) {
    switch (event.keyCode) {
        case 68: //d
            keyD = true;
            break;
        case 83: //s
            keyS = true;
            break;
        case 65: //a
            keyA = true;
            break;
        case 87: //w
            keyW = true;
            break;
    }
}
function onDocumentKeyUp(event) {
    switch (event.keyCode) {
        case 68: //d
            keyD = false;
            break;
        case 83: //s
            keyS = false;
            break;
        case 65: //a
            keyA = false;
            break;
        case 87: //w
            keyW = false;
            break;
    }
}

//////////////////////////////////////////////////////////////////


// Create and insert in the scene graph the models of the 3D scene
function load3DObjects(sceneGraph) {

    // ************************** //
    // Create a ground plane
    // ************************** //
    const planeGeometry = new THREE.PlaneGeometry(25, 15);
    const planeMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(200, 200, 200)', side: THREE.DoubleSide });
    const planeObject = new THREE.Mesh(planeGeometry, planeMaterial);
    sceneGraph.add(planeObject);
    planeObject.position.set(0,-0.5,0);
    // Change orientation of the plane using rotation
    planeObject.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    // Set shadow property
    planeObject.receiveShadow = true;

    // spheres

    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(53,33,13)', specular: 'rgb(181,110,46)',shininess: 25.6 });
    const sphereMaterial2 = new THREE.MeshLambertMaterial({ color: 'rgb(0,100,70)'});
    const sphereMaterial3 = new THREE.MeshPhongMaterial({ color: 'rgb(64,56,15)', specular: 'rgb(205,187,54)', shininess: 83.2 });
    const sphereMaterial4 = new THREE.MeshPhongMaterial({ color: 'rgb(84,56,8)', specular: 'rgb(253,240,207)', shininess: 83.2 });
    const sphereMaterial5 = new THREE.MeshPhongMaterial({ color: 'rgb(49,18,5)', specular: 'rgb(67,36,20)', shininess: 83.2 });
    
    const sphereObject = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereObject.name = "sphere_1";
    sphereObject.castShadow = true;
    sphereObject.receiveShadow = true;
    sceneGraph.add(sphereObject);

    const sphereObject2 = new THREE.Mesh(sphereGeometry, sphereMaterial2);
    sphereObject2.name = "sphere_2";
    sphereObject2.position.set(1.5, 0, 0);
    sphereObject2.castShadow = true;
    sphereObject2.receiveShadow = true;
    sceneGraph.add(sphereObject2);

    const sphereObject3 = new THREE.Mesh(sphereGeometry, sphereMaterial3);
    sphereObject3.name = "sphere_3";
    sphereObject3.position.set(-1.5, 0, 0);
    sphereObject3.castShadow = true;
    sphereObject3.receiveShadow = true;
    sceneGraph.add(sphereObject3);

    const sphereObject4 = new THREE.Mesh(sphereGeometry, sphereMaterial4);
    sphereObject4.name = "sphere_3";
    sphereObject4.position.set(0, 0, 1.5);
    sphereObject4.castShadow = true;
    sphereObject4.receiveShadow = true;
    sceneGraph.add(sphereObject4);

    const sphereObject5 = new THREE.Mesh(sphereGeometry, sphereMaterial5);
    sphereObject5.name = "sphere_3";
    sphereObject5.position.set(1.5, 0, 1.5);
    sphereObject5.castShadow = true;
    sphereObject5.receiveShadow = true;
    sceneGraph.add(sphereObject5);

    // cubes

    const cubeGeometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5)

    const cubeObject = new THREE.Mesh(cubeGeometry , sphereMaterial);
    cubeObject.name = "cube_1";
    cubeObject.castShadow = true;
    cubeObject.receiveShadow = true;
    cubeObject.position.set(0,1,0);
    sceneGraph.add(cubeObject);

    const cubeObject2 = new THREE.Mesh(cubeGeometry , sphereMaterial2);
    cubeObject2.name = "cube_2";
    cubeObject2.castShadow = true;
    cubeObject2.receiveShadow = true;
    cubeObject2.position.set(1.5,1,0);
    sceneGraph.add(cubeObject2);

    const cubeObject3 = new THREE.Mesh(cubeGeometry , sphereMaterial3);
    cubeObject3.name = "cube_3";
    cubeObject3.castShadow = true;
    cubeObject3.receiveShadow = true;
    cubeObject3.position.set(-1.5,1,0);
    sceneGraph.add(cubeObject3);

    const cubeObject4 = new THREE.Mesh(cubeGeometry , sphereMaterial4);
    cubeObject4.name = "cube_4";
    cubeObject4.castShadow = true;
    cubeObject4.receiveShadow = true;
    cubeObject4.position.set(0,1,1.5);
    sceneGraph.add(cubeObject4);

    const cubeObject5 = new THREE.Mesh(cubeGeometry , sphereMaterial5);
    cubeObject5.name = "cube_5";
    cubeObject5.castShadow = true;
    cubeObject5.receiveShadow = true;
    cubeObject5.position.set(1.5,1,1.5);
    sceneGraph.add(cubeObject5);

    var sceneCenter1 = new THREE.Object3D();

    sceneCenter1.position.set(0, 0, 0);

    sceneCenter1.name = "sceneCenter1";

    sceneGraph.add(sceneCenter1);

    // Adding models to the scene, as children of the sceneCenter1
    sceneCenter1.add(sceneElements.sceneGraph.getObjectByName("light_1"));

    var sceneCenter2 = new THREE.Object3D();

    sceneCenter2.position.set(0, 0, 0);

    sceneCenter2.name = "sceneCenter2";

    sceneGraph.add(sceneCenter2);

    // Adding models to the scene, as children of the sceneCenter2
    sceneCenter2.add(sceneElements.sceneGraph.getObjectByName("light_2"));
    
}

// Displacement value

var delta = 0.1;

function computeFrame(time) {

    // COMPLETE THE CODE

    // ROTATION around the center of the scene
    const center1 = sceneElements.sceneGraph.getObjectByName("sceneCenter1");
    center1.rotateY(0.03);
    const center2 = sceneElements.sceneGraph.getObjectByName("sceneCenter2");
    center2.rotateY(-0.01);

    // cube rotation
    const cube1 = sceneElements.sceneGraph.getObjectByName("cube_1");
    cube1.rotateY(0.15)
    const cube2 = sceneElements.sceneGraph.getObjectByName("cube_2");
    cube2.rotateY(-0.02)
    const cube3 = sceneElements.sceneGraph.getObjectByName("cube_3");
    cube3.rotateY(-0.08)
    const cube4 = sceneElements.sceneGraph.getObjectByName("cube_4");
    cube4.rotateY(-0.1)
    const cube5 = sceneElements.sceneGraph.getObjectByName("cube_5");
    cube5.rotateY(0.05)

    // Rendering
    helper.render(sceneElements);

    // Call for the next frame
    requestAnimationFrame(computeFrame);
}