"use strict";

//  
// 		J. Madeira - April 2021
//

const helper = {

    initEmptyScene: function (sceneElements) {

        // ************************** //
        // Create the 3D scene
        // ************************** //
        sceneElements.sceneGraph = new THREE.Scene();


        // ************************** //
        // Add camera
        // ************************** //
        const width = window.innerWidth;
        const height = window.innerHeight;
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10);
        sceneElements.camera = camera;
        camera.position.set(0, 5, 5);
        camera.lookAt(0, 0, 0);


        // ************************** //
        // Illumination
        // ************************** //

        // ************************** //
        // Add ambient light
        // ************************** //
        const ambientLight = new THREE.AmbientLight('rgb(255,255,255)', 0.2);
        sceneElements.sceneGraph.add(ambientLight);

        // ***************************** //
        // Add point light source (without shadows)
        // ***************************** //

        const light_1 = new THREE.PointLight('rgb(255, 0, 0)');
        light_1.position.set(10, 10, 2);
        sceneElements.sceneGraph.add(light_1);

        // Setup shadow properties
        light_1.castShadow = true;
        light_1.shadow.mapSize.width = 2048;
        light_1.shadow.mapSize.height = 2048;

        // Give a name to the light
        light_1.name = "light_1";

        const light_2 = new THREE.PointLight('rgb(0, 255, 0)');
        light_2.position.set(-7.5, 7.5, 2);
        sceneElements.sceneGraph.add(light_2);

        // Setup shadow properties
        light_2.castShadow = true;
        light_2.shadow.mapSize.width = 2048;
        light_2.shadow.mapSize.height = 2048;

        // Give a name to the light
        light_2.name = "light_2"; 

        const light_3 = new THREE.PointLight('rgb(0, 0, 255)');
        light_3.position.set(0, 3, 10);
        sceneElements.sceneGraph.add(light_3);

        // Setup shadow properties
        light_3.castShadow = true;
        light_3.shadow.mapSize.width = 2048;
        light_3.shadow.mapSize.height = 2048;

        // Give a name to the light
        light_3.name = "light_3"; 

        const light_4 = new THREE.PointLight('rgb(255, 255, 255)');
        light_4.position.set(0, -10, 0);
        sceneElements.sceneGraph.add(light_4);

        // Setup shadow properties
        light_4.castShadow = true;
        light_4.shadow.mapSize.width = 2048;
        light_4.shadow.mapSize.height = 2048;

        // Give a name to the light
        light_4.name = "light_4";

        // *********************************** //
        // Create renderer (with shadow map)
        // *********************************** //
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        sceneElements.renderer = renderer;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor('rgb(255, 255, 150)', 1.0);
        renderer.setSize(width, height);

        // Setup shadowMap property
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;


        // **************************************** //
        // Add the rendered image in the HTML DOM
        // **************************************** //
        const htmlElement = document.querySelector("#Tag3DScene");
        htmlElement.appendChild(renderer.domElement);
    },

    render: function render(sceneElements) {
        sceneElements.renderer.render(sceneElements.sceneGraph, sceneElements.camera);
    },
};