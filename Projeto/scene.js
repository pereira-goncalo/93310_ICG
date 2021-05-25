let scene, camera, renderer, mesh;
let sphere;
let pos = new THREE.Vector2();

let TablePosx = 2
let TablePosz = 0
let TableAngle = 0
let keyboard = {};
let player = { height: 51.8, speed: 1, turnSpeed: Math.PI * 0.01 };

let office = new THREE.Object3D
let hinge = new THREE.Object3D
let vaultHinge = new THREE.Object3D
let wallBox1
let wallBox2
let WallBox3
let WallBox4
let cameraBox
let door
let x, y, z = 0

let objectsArray = []
let wallsArray = []
let windowsArray = []
let doorWallsArray = []


window.onload = function init() {
    alert("'WASD' para controlar o movimento do personagem! \n Setas para direcionar a câmara! \n 'SHIFT' para correr! \n 'E' para zoom!")
    createScene();
    animate();
}


function oldOilTank() {
    let loaderObject = new THREE.GLTFLoader().setPath('ObjectImport/OldOilTank1/');
    loaderObject.load('scene.gltf',
        // called when the resource is loaded
        function (gltf) {
            //console.log('model loaded: ' + gltf.scene.children.length + ' scene children meshes');
            OldOilTank1 = gltf.scene;
            OldOilTank1.scale.set(0.49, 0.49, 0.49);
            OldOilTank1.position.set(-400, -50, 800)
            OldOilTank1.rotation.y = THREE.Math.degToRad(180)
            objectsArray.push(OldOilTank1);
            scene.add(OldOilTank1);
            renderer.render(scene, camera);
        },
        undefined, // called while loading is progressing
        function (err) { // called when loading has errors
            console.log(err);
        });
}

function oldOilTank2() {
    let loaderObject = new THREE.GLTFLoader().setPath('ObjectImport/OldOilTank2/');
    loaderObject.load('scene.gltf',
        // called when the resource is loaded
        function (gltf) {
            //console.log('model loaded: ' + gltf.scene.children.length + ' scene children meshes');
            OldOilTank2 = gltf.scene;
            OldOilTank2.scale.set(0.69, 0.69, 0.69);
            OldOilTank2.position.set(-600, -50, 900)
            OldOilTank2.rotation.y = THREE.Math.degToRad(180)
            objectsArray.push(OldOilTank2);
            scene.add(OldOilTank2);
            renderer.render(scene, camera);
        },
        undefined, // called while loading is progressing
        function (err) { // called when loading has errors
            console.log(err);
        });
}


function SafeTable() {
    let loaderObject = new THREE.GLTFLoader().setPath('ObjectImport/SafeTable/');
    loaderObject.load('scene.gltf',
        // called when the resource is loaded
        function (gltf) {
            //console.log('model loaded: ' + gltf.scene.children.length + ' scene children meshes');
            SafeBoxTable = gltf.scene;
            SafeBoxTable.scale.set(2.5, 2.5, 2.5);
            SafeBoxTable.position.set(450, -48, 500)
            objectsArray.push(SafeBoxTable);
            scene.add(SafeBoxTable);
            renderer.render(scene, camera);
        },
        undefined, // called while loading is progressing
        function (err) { // called when loading has errors
            console.log(err);
        });
}





function OfficeTable(i) {
    let loaderObject = new THREE.GLTFLoader().setPath('ObjectImport/old_metal_table_low_poly/');
    loaderObject.load('scene.gltf',
        // called when the resource is loaded
        function (gltf) {
            TablePosz++
            TablePosx++
            TableAngle++
            Oldtable = gltf.scene;
            Oldtable.scale.set(59, 59, 59);
            Oldtable.position.set(2 * TablePosx, -20, 200 * TablePosz)
            Oldtable.rotation.y = THREE.Math.degToRad(-90 * (TableAngle + 90))
            objectsArray.push(Oldtable);
            scene.add(Oldtable)
            renderer.render(scene, camera);
        },
        undefined, // called while loading is progressing
        function (err) { // called when loading has errors
            console.log(err);
        });
}




function safeBox() {
    let geometry = new THREE.PlaneGeometry(50, 50, 100);

    let texture = new THREE.TextureLoader().load("./Texturas/cofreTexture.jpg");
    let textureSafeDoor = new THREE.TextureLoader().load("./Texturas/Vault Door.jpg");
    let material1 = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide });



    material1.map = texture;

    let materialDoor = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide });
    materialDoor.map = textureSafeDoor;

    let face = new THREE.Mesh(geometry, material1);
    face.position.set(445, 48, 525)
    scene.add(face);

    let vaultDoor = new THREE.Mesh(geometry, materialDoor);
    vaultDoor.position.set(0, 19, 25)
    vaultDoor.rotation.y = -Math.PI / 2;

    scene.add(vaultDoor)

    let face2 = new THREE.Mesh(geometry, material1);
    face2.position.set(470, 48, 500)
    face2.rotation.y = Math.PI / 2;
    face2.name = "safeDoor"
    scene.add(face2)

    let face3 = new THREE.Mesh(geometry, material1);
    face3.position.set(445, 23, 500)
    face3.rotation.x = Math.PI / 2;
    scene.add(face3)

    let face4 = new THREE.Mesh(geometry, material1);
    face4.position.set(445, 73, 500)
    face4.rotation.x = -Math.PI / 2;
    scene.add(face4)

    let face5 = new THREE.Mesh(geometry, material1);
    face5.position.set(445, 48, 475)
    face5.rotation.y = -Math.PI;
    scene.add(face5)

    vaultHinge.add(vaultDoor)
    vaultHinge.position.set(420, 29, 475)
    office.add(vaultHinge)

}


function walls() {
    const wallTexture = new THREE.TextureLoader().load('./Texturas/wallNew.jpg');
    wallTexture.wrapS = THREE.RepeatWrapping;
    wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(1000 / 500, 1);
    const Wallgeometry = new THREE.BoxGeometry(1000, 300, 19);
    const WallMaterial = new THREE.MeshPhongMaterial({ map: wallTexture, side: THREE.DoubleSide });
    const wall = new THREE.Mesh(Wallgeometry, WallMaterial);
    wallsArray.push(wall)
    office.add(wall)
}

function doorWalls() {
    //Create a new texture loader just for wallOne because it does´t repeat texture like the wallTwo
    const wallTexture = new THREE.TextureLoader().load('./Texturas/wallNew.jpg');
    //Door wall one
    wallTwoTexture = new THREE.TextureLoader().load('./Texturas/wallNew.jpg')
    wallTwoTexture.wrapS = THREE.RepeatWrapping;
    wallTwoTexture.wrapT = THREE.RepeatWrapping;
    wallTwoTexture.repeat.set(1000 / 500, 1);
    const WallOnegeometry = new THREE.BoxGeometry(150, 200, 19);
    const WallOneMaterial = new THREE.MeshPhongMaterial({ map: wallTexture, side: THREE.DoubleSide });
    const wallOne = new THREE.Mesh(WallOnegeometry, WallOneMaterial);
    wallOne.position.set(-428, 50, 999)
    office.add(wallOne)

    doorWallsArray.push(wallOne)
    //Door wall Two
    const WallTwogeometry = new THREE.BoxGeometry(770, 200, 19);
    const WallTwoMaterial = new THREE.MeshPhongMaterial({ map: wallTwoTexture, side: THREE.DoubleSide });
    const wallTwo = new THREE.Mesh(WallTwogeometry, WallTwoMaterial);
    wallTwo.position.set(125, 50, 999)
    office.add(wallTwo)

    doorWallsArray.push(wallTwo)
}


function doorRoom() {
    //Door
    const doorWallTexture = new THREE.TextureLoader().load('./Texturas/door.jpg');
    doorWallTexture.wrapS = THREE.MirroredRepeatWrapping;
    doorWallTexture.wrapT = THREE.MirroredRepeatWrapping;
    const doorGeometry = new THREE.BoxGeometry(95, 200, 5);
    let doorMaterial = new THREE.MeshPhongMaterial({ map: doorWallTexture, side: THREE.DoubleSide });
    door = new THREE.Mesh(doorGeometry, doorMaterial);
    hinge.add(door)
    hinge.position.set(-353, 50, 993)

    door.position.set(45, 0, 0)
    office.add(hinge)
    scene.add(office);

    geometry = new THREE.BoxGeometry(95, 200, 5);
    material = new THREE.MeshPhongMaterial({ visible: false });
    cube = new THREE.Mesh(geometry, material);
    cube.name = "door"
    objectsArray.push(cube)
    cube.position.set(-305, 50, 993) //47.5
    scene.add(cube);


}


function floor() {
    //Floor
    const floorTexture = new THREE.TextureLoader().load('./Texturas/woodFloor1.jpg');
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(1, 1);
    const floorGeometry = new THREE.PlaneGeometry(1000, 1000, 32);
    const floorMaterial = new THREE.MeshPhongMaterial({ map: floorTexture, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.set(0, -50, 500)
    floor.rotation.x = THREE.Math.degToRad(90)
    office.add(floor);
}

function roof() {
    //Roof
    const RoofTexture = new THREE.TextureLoader().load('./Texturas/RoofTexture.jpg');
    RoofTexture.wrapS = THREE.RepeatWrapping;
    RoofTexture.wrapT = THREE.RepeatWrapping;
    RoofTexture.repeat.set(1000 / 500, 1000 / 400);
    const RoofGeometry = new THREE.PlaneGeometry(1000, 1000, 32);
    const RoofMaterial = new THREE.MeshPhongMaterial({ map: RoofTexture, side: THREE.DoubleSide });
    const Roof = new THREE.Mesh(RoofGeometry, RoofMaterial);
    Roof.position.set(0, 250, 500)
    Roof.rotation.x = THREE.Math.degToRad(90)
    office.add(Roof);
}

function windows() {
    const WindowTexture = new THREE.TextureLoader().load('./Texturas/windows.jpg');
    const WindowGeometry = new THREE.PlaneGeometry(100, 100, 32);
    const WindowMaterial = new THREE.MeshPhongMaterial({ map: WindowTexture, side: THREE.DoubleSide });
    const Window = new THREE.Mesh(WindowGeometry, WindowMaterial);
    office.add(Window);
    windowsArray.push(Window)
}


function CameraBox() {
    geometry = new THREE.BoxGeometry(30, player.height * 2, 30);
    material = new THREE.MeshBasicMaterial({ color: 0x008800, transparent: true, opacity: 0.0000001, name: "CameraBox" });
    cameraBox = new THREE.Mesh(geometry, material);
    cameraBox.rotation.y = Math.PI;
    cameraBox.position.set(-300, 0, 900);
    scene.add(cameraBox);

    cameraBox.geometry.computeBoundingBox()
}


function createScene() {
    scene = new THREE.Scene();
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(90, 1280 / 720, 0.1, 2000);
    camera.rotation.order = "YXZ"
    camera.position.set(-300, player.height, 900);
    camera.rotation.order = "YXZ"
    camera.position.set(-300, player.height, 900);
    geometry = new THREE.SphereGeometry(0.0005, 32, 32);
    material = new THREE.MeshBasicMaterial({ color: 'white', side: THREE.DoubleSide, name: "Pointer" });
    sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0, 0, -0.1)
    camera.add(sphere)
    scene.add(camera)
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#e4e0ba");
    document.getElementById('Tag3DScene').appendChild(renderer.domElement);

    //Ceiling light
    const lampTexture = new THREE.TextureLoader().load('./Texturas/lampTexture.jpg');
    const Lampgeometry = new THREE.CylinderGeometry(3, 39, 69, 32, 1, true)
    const Lampmaterial = new THREE.MeshLambertMaterial({ map: lampTexture });
    const Lamp = new THREE.Mesh(Lampgeometry, Lampmaterial);
    Lamp.position.set(0, 239, 450)
    Lampmaterial.side = THREE.DoubleSide
    scene.add(Lamp);


    // Bulblight
    const sphereLight = new THREE.SphereBufferGeometry(12, 299, 299)
    light1 = new THREE.PointLight(0xffffff, 0.9);
    light1.add(new THREE.Mesh(sphereLight, new THREE.MeshBasicMaterial({ color: 0xFCFDA4 })));
    light1.position.set(0, 220, 450)
    scene.add(light1);

    light1.color.setHex(0xffffff);

    const Lamp2 = new THREE.Mesh(Lampgeometry, Lampmaterial);
    Lamp2.position.set(450, 239, 500)
    Lampmaterial.side = THREE.DoubleSide
    scene.add(Lamp2);

    light2 = new THREE.PointLight(0xffffff, 0.9);
    light2.add(new THREE.Mesh(sphereLight, new THREE.MeshBasicMaterial({ color: 0xFCFDA4 })));
    light2.position.set(450, 220, 500)
    scene.add(light2);

    light2.color.setHex(0xffffff);

    oldOilTank()
    oldOilTank2()
    SafeTable()
    safeBox()
    doorRoom()
    floor()
    roof()
    doorWalls()
    CameraBox()

    //Create 3 tables
    for (let i = 0; i < 3; i++) {
        OfficeTable()
    }

    //Create 4 walls
    for (let i = 0; i < 4; i++) {
        walls()
    }


    scene.add(office)


    //Set position of walls
    wallsArray[0].position.set(0, 100, 0)
    wallsArray[1].position.set(0, 100, 0)
    wallsArray[2].position.set(-500, 100, 490)
    wallsArray[2].rotation.y = -Math.PI / 2
    wallsArray[3].position.set(500, 100, 490)
    wallsArray[3].rotation.y = -Math.PI / 2

    //Create 20 windows
    for (let i = 0; i < 20; i++) {
        windows()
    }

    //Set windows positions
    windowsArray[0].position.set(0, 200, 992)
    windowsArray[1].position.set(100, 200, 992)
    windowsArray[2].position.set(200, 200, 992)
    windowsArray[3].position.set(300, 200, 992)
    windowsArray[4].position.set(400, 200, 992)
    windowsArray[9].position.set(500, 200, 992)
    windowsArray[8].position.set(-100, 200, 992)
    windowsArray[10].position.set(-200, 200, 992)
    windowsArray[11].position.set(-300, 200, 992)
    windowsArray[12].position.set(-400, 200, 992)
    windowsArray[13].position.set(-500, 200, 992)



}

function keyDown(event) {
    keyboard[event.keyCode] = true;
}

function keyUp(event) {
    keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

function animate() {

    let oldPos = cameraBox.position.clone()
    let lastKey = keyboard
    if (keyboard[87]) { // W key
        camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y) * player.speed;

        cameraBox.position.x -= Math.sin(camera.rotation.y) * player.speed;
        cameraBox.position.z += -Math.cos(camera.rotation.y) * player.speed;

        if (checkCollisions()) {
            cameraBox.position.x = oldPos.x
            cameraBox.position.z = oldPos.z

            camera.position.x = oldPos.x
            camera.position.z = oldPos.z
        }

        if (checkCollisionDoorWall()) {
            cameraBox.position.x = oldPos.x
            cameraBox.position.z = oldPos.z

            camera.position.x = oldPos.x
            camera.position.z = oldPos.z
        }

        if (checkCollisionsObjects()) {
            cameraBox.position.x = oldPos.x
            cameraBox.position.z = oldPos.z

            camera.position.x = oldPos.x
            camera.position.z = oldPos.z
        }
    }
    if (keyboard[83]) { // S key
        camera.position.x += Math.sin(camera.rotation.y) * player.speed;
        camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;

        cameraBox.position.x += Math.sin(camera.rotation.y) * player.speed;
        cameraBox.position.z -= -Math.cos(camera.rotation.y) * player.speed;

        if (checkCollisions()) {
            cameraBox.position.x = oldPos.x
            cameraBox.position.z = oldPos.z

            camera.position.x = oldPos.x
            camera.position.z = oldPos.z
        }

        if (checkCollisionDoorWall()) {
            cameraBox.position.x = oldPos.x
            cameraBox.position.z = oldPos.z

            camera.position.x = oldPos.x
            camera.position.z = oldPos.z
        }

        if (checkCollisionsObjects()) {
            cameraBox.position.x = oldPos.x
            cameraBox.position.z = oldPos.z

            camera.position.x = oldPos.x
            camera.position.z = oldPos.z
        }
    }
    if (keyboard[65]) { // A key
        camera.position.x -= Math.sin(camera.rotation.y + Math.PI / 2) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y + Math.PI / 2) * player.speed;

        cameraBox.position.x -= Math.sin(camera.rotation.y + Math.PI / 2) * player.speed;
        cameraBox.position.z += -Math.cos(camera.rotation.y + Math.PI / 2) * player.speed;

        if (checkCollisions()) {
            cameraBox.position.x = oldPos.x
            cameraBox.position.z = oldPos.z

            camera.position.x = oldPos.x
            camera.position.z = oldPos.z
        }

        if (checkCollisionDoorWall()) {
            cameraBox.position.x = oldPos.x
            cameraBox.position.z = oldPos.z

            camera.position.x = oldPos.x
            camera.position.z = oldPos.z
        }

        if (checkCollisionsObjects()) {
            cameraBox.position.x = oldPos.x
            cameraBox.position.z = oldPos.z

            camera.position.x = oldPos.x
            camera.position.z = oldPos.z
        }
    }
    if (keyboard[68]) { // D key
        camera.position.x -= Math.sin(camera.rotation.y - Math.PI / 2) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y - Math.PI / 2) * player.speed;

        cameraBox.position.x -= Math.sin(camera.rotation.y - Math.PI / 2) * player.speed;
        cameraBox.position.z += -Math.cos(camera.rotation.y - Math.PI / 2) * player.speed;

        if (checkCollisions()) {
            cameraBox.position.x = oldPos.x
            cameraBox.position.z = oldPos.z

            camera.position.x = oldPos.x
            camera.position.z = oldPos.z
        }

        if (checkCollisionDoorWall()) {
            cameraBox.position.x = oldPos.x
            cameraBox.position.z = oldPos.z

            camera.position.x = oldPos.x
            camera.position.z = oldPos.z
        }

        if (checkCollisionsObjects()) {
            cameraBox.position.x = oldPos.x
            cameraBox.position.z = oldPos.z

            camera.position.x = oldPos.x
            camera.position.z = oldPos.z
        }
    }

    if (keyboard[37]) { // left arrow key
        camera.rotation.y += player.turnSpeed;


    }
    if (keyboard[39]) {  // right arrow key
        camera.rotation.y -= player.turnSpeed;

    }
    if (keyboard[38] && camera.rotation.x < Math.PI / 3) { //up

        camera.rotation.x += player.turnSpeed
    }
    if (keyboard[40] && camera.rotation.x > -Math.PI / 3) { //down

        camera.rotation.x -= player.turnSpeed;
    }
    if (keyboard[16]) { // shift correr
        player.speed = 2
    }
    else { player.speed = 1 }

    if (keyboard[69]) { // E key Zoom
        camera.zoom = 1.6;
        camera.updateProjectionMatrix();
    }
    else {
        camera.zoom = 1;
        camera.updateProjectionMatrix();
    }


    function checkCollisions() {
        let checkBox = new THREE.Box3().setFromObject(cameraBox)
        for (let i = 0; i < wallsArray.length; i++) {
            let obstBox = new THREE.Box3().setFromObject(wallsArray[i])
            let colision = checkBox.intersectsBox(obstBox)
            if (colision) {
                console.log("HIT")
                return true
            }
        }
        return false
    }

    function checkCollisionDoorWall() {
        let checkBox = new THREE.Box3().setFromObject(cameraBox)
        for (let i = 0; i < doorWallsArray.length; i++) {
            let obstBox = new THREE.Box3().setFromObject(doorWallsArray[i])
            let colision = checkBox.intersectsBox(obstBox)
            if (colision) {
                console.log("Hit")
                return true
            }
        }
        return false
    }

    function checkCollisionsObjects() {
        let checkBox = new THREE.Box3().setFromObject(cameraBox)
        for (let i = 0; i < objectsArray.length; i++) {
            let obstBox = new THREE.Box3().setFromObject(objectsArray[i])
            let colision = checkBox.intersectsBox(obstBox)
            if (colision) {
                console.log("Hit")
                return true
            }
        }
        return false
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

let gray = 0.4117647058823529
let blue = { b: 1, r: 0.27058823529411763, g: 0.2823529411764706, isColor: true }
let red = { b: 0.1411764705882353, r: 1, g: 0.1411764705882353 }
let green = { b: 0.11764705882352941, r: 0, g: 0.7019607843137254 }
