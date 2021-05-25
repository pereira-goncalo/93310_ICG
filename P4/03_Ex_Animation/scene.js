"use strict";

//  Adapted from Daniel Rohmer tutorial
//
// 		https://imagecomputing.net/damien.rohmer/teaching/2019_2020/semester_1/MPRI_2-39/practice/threejs/content/000_threejs_tutorial/index.html
//
// 		J. Madeira - April 2021


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


// Create and insert in the scene graph the models of the 3D scene
function load3DObjects(sceneGraph) {

    // ************************** //
    // Create a ground plane
    // ************************** //
    const planeGeometry = new THREE.PlaneGeometry(15, 15);
    const planeMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(200, 200, 200)', side: THREE.DoubleSide });
    const planeObject = new THREE.Mesh(planeGeometry, planeMaterial);
    sceneGraph.add(planeObject);

    // Change orientation of the plane using rotation
    planeObject.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    // Set shadow property
    planeObject.receiveShadow = true;

    // IDEA : a "dummy" object at (0,0,0) so that we can rotate around coordinate axes

    var sceneCenter = new THREE.Object3D();

    sceneCenter.position.set(0, 0, 0);

    sceneCenter.name = "sceneCenter";

    sceneGraph.add(sceneCenter);

    // Adding models to the scene, as children of the sceneCenter

    // Create a TREE

    const treeObject = createTree(5, 0, -5);

    sceneCenter.add(treeObject);
}


function createTree(x, y, z) {

    // Creating a model by grouping basic geometries

    // Cylinder centered at the origin

    const cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 32);

    const redMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });

    const cylinder = new THREE.Mesh(cylinderGeometry, redMaterial);

    // Set shadow property
    cylinder.castShadow = true;

    cylinder.receiveShadow = true;

    // Move base of the cylinder to y = 0

    cylinder.position.y = 0.5;

    // Cone

    const coneGeometry = new THREE.ConeGeometry(0.3, 1.5, 32);

    const greenMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

    const cone = new THREE.Mesh(coneGeometry, greenMaterial);

    // Set shadow property

    cone.castShadow = true;

    cone.receiveShadow = true;

    // Move base of the cone to y = 20

    cone.position.y = 1.75;

    // Tree

    var tree = new THREE.Group();

    tree.add(cylinder);

    tree.add(cone);

    // Set the given position

    tree.position.set(x, y, z);

    return tree;
}

var delta = 0.1;

function computeFrame(time) {

    // LIGHT moves from left to right and right to left

    // Can extract an object from the scene Graph from its name
    const light = sceneElements.sceneGraph.getObjectByName("light");

    // Apply a small displacement
    if (light.position.x >= 10) {
        delta *= -1;
    } else if (light.position.x <= -10) {
        delta *= -1;
    }
    light.translateX(delta);

    // ROTATION around the center of the scene

    const center = sceneElements.sceneGraph.getObjectByName("sceneCenter");
    center.rotateY(0.01);

    // Rendering
    helper.render(sceneElements);

    // Call for the next frame
    requestAnimationFrame(computeFrame);
}