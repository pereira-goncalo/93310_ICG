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


//////////////////////////////////////////////////////////////////

// NEW - MESH MODELING - Creating geometries
//
// Adapted from threejsfundamentals.org

function createCubeMesh_V1() {

    // Repeated Vertices --- No indices !!
    // 6 vertices per cube face
    // 2 triangles per cube face

    // For each vertex: coordinates and normal vector

    const vertices = [
        // front
        { pos: [-1, -1, 1], norm: [0, 0, 1] },
        { pos: [1, -1, 1], norm: [0, 0, 1] },
        { pos: [-1, 1, 1], norm: [0, 0, 1] },

        { pos: [-1, 1, 1], norm: [0, 0, 1] },
        { pos: [1, -1, 1], norm: [0, 0, 1] },
        { pos: [1, 1, 1], norm: [0, 0, 1] },
        // right
        { pos: [1, -1, 1], norm: [1, 0, 0] },
        { pos: [1, -1, -1], norm: [1, 0, 0] },
        { pos: [1, 1, 1], norm: [1, 0, 0] },

        { pos: [1, 1, 1], norm: [1, 0, 0] },
        { pos: [1, -1, -1], norm: [1, 0, 0] },
        { pos: [1, 1, -1], norm: [1, 0, 0] },
        // back
        { pos: [1, -1, -1], norm: [0, 0, -1] },
        { pos: [-1, -1, -1], norm: [0, 0, -1] },
        { pos: [1, 1, -1], norm: [0, 0, -1] },

        { pos: [1, 1, -1], norm: [0, 0, -1] },
        { pos: [-1, -1, -1], norm: [0, 0, -1] },
        { pos: [-1, 1, -1], norm: [0, 0, -1] },
        // left
        { pos: [-1, -1, -1], norm: [-1, 0, 0] },
        { pos: [-1, -1, 1], norm: [-1, 0, 0] },
        { pos: [-1, 1, -1], norm: [-1, 0, 0] },

        { pos: [-1, 1, -1], norm: [-1, 0, 0] },
        { pos: [-1, -1, 1], norm: [-1, 0, 0] },
        { pos: [-1, 1, 1], norm: [-1, 0, 0] },
        // top
        { pos: [1, 1, -1], norm: [0, 1, 0] },
        { pos: [-1, 1, -1], norm: [0, 1, 0] },
        { pos: [1, 1, 1], norm: [0, 1, 0] },

        { pos: [1, 1, 1], norm: [0, 1, 0] },
        { pos: [-1, 1, -1], norm: [0, 1, 0] },
        { pos: [-1, 1, 1], norm: [0, 1, 0] },
        // bottom
        { pos: [1, -1, 1], norm: [0, -1, 0] },
        { pos: [-1, -1, 1], norm: [0, -1, 0] },
        { pos: [1, -1, -1], norm: [0, -1, 0] },

        { pos: [1, -1, -1], norm: [0, -1, 0] },
        { pos: [-1, -1, 1], norm: [0, -1, 0] },
        { pos: [-1, -1, -1], norm: [0, -1, 0] },
    ];

    const positions = [];
    const normals = [];

    for (const vertex of vertices) {
        positions.push(...vertex.pos);
        normals.push(...vertex.norm);
    }

    // BufferGeometry
    const geometry = new THREE.BufferGeometry();
    const positionNumComponents = 3;
    const normalNumComponents = 3;
    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents));
    geometry.setAttribute(
        'normal',
        new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents));

    const material = new THREE.MeshPhongMaterial({ color: 'rgb(200, 0, 0)' });

    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

function createCubeMesh_V2() {

    // Repeated Vertices --- No indices !!
    // 6 vertices per cube face
    // 2 triangles per cube face

    // For each vertex: coordinates and normal vector

    const vertices = [
        // front
        { pos: [-1, -1, 1], norm: [0, 0, 1] },
        { pos: [1, -1, 1], norm: [0, 0, 1] },
        { pos: [-1, 1, 1], norm: [0, 0, 1] },
        { pos: [1, 1, 1], norm: [0, 0, 1] },

        // right
        { pos: [1, -1, 1], norm: [1, 0, 0] },
        { pos: [1, -1, -1], norm: [1, 0, 0] },
        { pos: [1, -1, -1], norm: [1, 0, 0] },
        { pos: [1, 1, -1], norm: [1, 0, 0] },

        // back
        { pos: [1, -1, -1], norm: [0, 0, -1] },
        { pos: [-1, -1, -1], norm: [0, 0, -1] },
        { pos: [1, 1, -1], norm: [0, 0, -1] },
        { pos: [-1, 1, -1], norm: [0, 0, -1] },

        // left
        { pos: [-1, -1, -1], norm: [-1, 0, 0] },
        { pos: [-1, -1, 1], norm: [-1, 0, 0] },
        { pos: [-1, 1, -1], norm: [-1, 0, 0] },
        { pos: [-1, 1, 1], norm: [-1, 0, 0] },

        // top
        { pos: [1, 1, -1], norm: [0, 1, 0] },
        { pos: [-1, 1, -1], norm: [0, 1, 0] },
        { pos: [1, 1, 1], norm: [0, 1, 0] },
        { pos: [-1, 1, 1], norm: [0, 1, 0] },

        // bottom
        { pos: [1, -1, 1], norm: [0, -1, 0] },
        { pos: [-1, -1, 1], norm: [0, -1, 0] },
        { pos: [1, -1, -1], norm: [0, -1, 0] },
        { pos: [-1, -1, -1], norm: [0, -1, 0] },
    ];

    const positions = [];
    const normals = [];

    for (const vertex of vertices) {
        positions.push(...vertex.pos);
        normals.push(...vertex.norm);
    }

    // BufferGeometry
    const geometry = new THREE.BufferGeometry();
    const positionNumComponents = 3;
    const normalNumComponents = 3;
    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents));
    geometry.setAttribute(
        'normal',
        new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents));

    geometry.setIndex([
        0, 1, 2, 2, 1, 3,  // front
        4, 5, 6, 6, 5, 7,  // right
        8, 9, 10, 10, 9, 11,  // back
        12, 13, 14, 14, 13, 15,  // left
        16, 17, 18, 18, 17, 19,  // top
        20, 21, 22, 22, 21, 23,  // bottom
    ]);

    const material = new THREE.MeshPhongMaterial({ color: 'rgb(200, 0, 0)' });

    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

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

    // NEW
    // Create simple mesh models

    const cube_1 = createCubeMesh_V1();
    cube_1.name = "Cube_1";
    sceneGraph.add(cube_1);
    cube_1.translateX(-3).translateY(3);

    const cube_2 = createCubeMesh_V2();
    cube_2.name = "Cube_2";
    sceneGraph.add(cube_2);
    cube_2.translateX(3).translateY(3);
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

    // Rotating the cube

    const cube_1 = sceneElements.sceneGraph.getObjectByName("Cube_1");

    cube_1.rotateX(0.01);
    cube_1.rotateY(0.01);
    cube_1.rotateZ(0.01);

    // Rendering
    helper.render(sceneElements);

    // Call for the next frame
    requestAnimationFrame(computeFrame);
}