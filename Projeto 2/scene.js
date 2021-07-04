// THREEJS RELATED VARIABLES
let scene, camera, renderer, mesh;
let sphere;
let raycaster = new THREE.Raycaster();
let pos = new THREE.Vector2();

let photoFrame = new THREE.Object3D
let pipeLight = new THREE.Object3D

let TablePosx = 2
let TablePosz = 0
let TableAngle = 0
let keyAnimation = false
let keyboard = {};
let player = { height: 51.8, speed: 1, turnSpeed: Math.PI * 0.01 };
let test;

let ObjectTables = new THREE.Object3D

let office = new THREE.Object3D
let hinge = new THREE.Object3D
let vaultHinge = new THREE.Object3D
let wallBox1
let wallBox2
let WallBox3
let WallBox4
let cameraBox
let door
let vaultDoorState = false
let vaultdoorAlert = false
let DoorState = true
let val = 0
let x, y, z = 0

//Array of various objects
let objectsArray = []
let wallsArray = []
let windowsArray = []
let tableArray = []
let tableArrayArray = []
let lampWireArray = []
let floorPapersArray = []
let randomBoxArray = []
let neonBtnArray = []
let doorWallsArray = []
let doorOpen = false
//Flags for game control
let haveKey = false
let openDoor = false
let isCorrectColors = false
let codePlane


let LightPosition = new THREE.Object3D

// let lightParams

let controls;

window.onload = function init() {
    alert("Controlos:\n 'WASD' para controlar o movimento do personagem. \n Setas para direcionar com a câmara. \n 'E' para dar zoom. \n 'Space' para agachar. \n 'SHIFT' para correr. \n 'R' para interagir com objetos. \n ------------------ \n Caso pretenda relembrar os controlos pressione a tecla '0' \n Bom jogo!!");
    createScene();
    animate();
    document.onkeydown = handleKeyDown
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

function chair() {
    let loaderObject = new THREE.GLTFLoader().setPath('ObjectImport/OldChair/');
    loaderObject.load('scene.gltf',
        // called when the resource is loaded
        function (gltf) {
            //console.log('model loaded: ' + gltf.scene.children.length + ' scene children meshes');
            OldChair = gltf.scene;
            OldChair.scale.set(0.7, 0.7, 0.7);
            OldChair.position.set(200, -51, 500)
            OldChair.rotation.y = THREE.Math.degToRad(-119)
            objectsArray.push(OldChair);
            scene.add(OldChair);
            renderer.render(scene, camera);
        },
        undefined, // called while loading is progressing
        function (err) { // called when loading has errors
            console.log(err);
        });
}



function OfficeTable(i) {
    let loaderObject = new THREE.GLTFLoader().setPath('ObjectImport/OldOfficeTable/');
    loaderObject.load('scene.gltf',
        // called when the resource is loaded
        function (gltf) {
            TablePosz++
            TablePosx++
            TableAngle++
            //console.log('model loaded: ' + gltf.scene.children.length + ' scene children meshes');
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

function doorKey() {
    let loaderObject = new THREE.GLTFLoader().setPath('ObjectImport/Key/');
    loaderObject.load('scene.gltf',
        // called when the resource is loaded
        function (gltf) {
            key = gltf.scene;
            key.scale.set(3, 3, 3);
            key.position.set(460, 25, 500)
            key.rotation.y = -90
            objectsArray.push(key);
            key.name = "key"
            scene.add(key)
            renderer.render(scene, camera);
        },
        undefined, // called while loading is progressing
        function (err) { // called when loading has errors
            console.log(err);
        });
}


function officeCrew() {
    const photoTexture = new THREE.TextureLoader().load('./Texturas/OfficeCrew.png');
    const geometry = new THREE.PlaneGeometry(100, 70, 32);
    const material = new THREE.MeshPhongMaterial({ map: photoTexture, side: THREE.DoubleSide });
    const crewOffice = new THREE.Mesh(geometry, material);
    crewOffice.position.set(0, 100, 12)
    crewOffice.rotation.z = THREE.Math.degToRad(-20)
    scene.add(crewOffice);
}


function informationNeonLight() {
    const document = new THREE.TextureLoader().load('./Texturas/CofidentialNeoLightProject.png');
    const geometry = new THREE.PlaneGeometry(50, 30, 32);
    const material = new THREE.MeshPhongMaterial({ map: document, side: THREE.DoubleSide });
    const documentGround = new THREE.Mesh(geometry, material);
    documentGround.position.set(1, 9, 210)
    documentGround.rotation.x = THREE.Math.degToRad(270)
    scene.add(documentGround);
}


function circuitSolution() {
    const documentSolution = new THREE.TextureLoader().load('./Texturas/circuitSolution.png');
    const geometry = new THREE.PlaneGeometry(50, 30, 32);
    const material = new THREE.MeshPhongMaterial({ map: documentSolution, side: THREE.DoubleSide });
    const SolutionDocument = new THREE.Mesh(geometry, material);
    SolutionDocument.position.set(4, 9, 400)
    SolutionDocument.rotation.x = THREE.Math.degToRad(270)
    scene.add(SolutionDocument);
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
    interactableNames.push("safeDoor")
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
    const wallTexture = new THREE.TextureLoader().load('./Texturas/paredeOffice2.jpg');
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
    const wallTexture = new THREE.TextureLoader().load('./Texturas/paredeOffice2.jpg');
    //Door wall one
    wallTwoTexture = new THREE.TextureLoader().load('./Texturas/paredeOffice2.jpg')
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


function doorOffice() {
    //Door
    const doorWallTexture = new THREE.TextureLoader().load('./Texturas/doorOfficeWood.jpg');
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
    interactableNames.push("door")
    objectsArray.push(cube)
    cube.position.set(-305, 50, 993) //47.5
    scene.add(cube);

}

function safeBoxCode() {
    const codeNumber = new THREE.TextureLoader().load('./Texturas/safeBoxCode.png');
    const Codegeometry = new THREE.PlaneGeometry(300, 150, 32);
    const Codematerial = new THREE.MeshPhongMaterial({ map: codeNumber, side: THREE.DoubleSide, visible: false });
    codePlane = new THREE.Mesh(Codegeometry, Codematerial);
    codePlane.position.set(489, 139, 500)
    codePlane.rotation.y = THREE.Math.degToRad(270)
    scene.add(codePlane);
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
function floorPapers(i) {
    const papers = new THREE.TextureLoader().load('./Texturas/floorPapers' + i + '.jpg');
    const geometry = new THREE.PlaneGeometry(50, 60, 32);
    const material = new THREE.MeshPhongMaterial({ map: papers, side: THREE.DoubleSide });
    const randomPapers = new THREE.Mesh(geometry, material);
    randomPapers.rotation.x = THREE.Math.degToRad(270)
    randomPapers.rotation.z = THREE.Math.degToRad(20)
    floorPapersArray.push(randomPapers)
    office.add(randomPapers)
}

function randomBoxes() {
    const boxTexture = new THREE.TextureLoader().load('./Texturas/boxTexture.jpg');
    const geometry = new THREE.BoxGeometry(49, 49, 49);
    const material = new THREE.MeshPhongMaterial({ map: boxTexture });
    const rBox = new THREE.Mesh(geometry, material);
    randomBoxArray.push(rBox)
    objectsArray.push(rBox);
    scene.add(rBox);
}

function neonButtons(i) {
    const geometry = new THREE.BoxGeometry(9, 9, 9);
    const material = new THREE.MeshPhongMaterial({ color: 0x696969 });
    const cube = new THREE.Mesh(geometry, material);
    cube.name = "btn" + i
    interactableNames.push("btn" + i)
    neonBtnArray.push(cube)
    scene.add(cube);
}

function CameraBox() {
    geometry = new THREE.BoxGeometry(30, player.height * 2, 30);
    material = new THREE.MeshBasicMaterial({ color: 0x008800, transparent: true, opacity: 0.0000001, name: "CameraBox" });
    cameraBox = new THREE.Mesh(geometry, material);
    cameraBox.rotation.y = Math.PI;
    cameraBox.position.set(0, 0, 100);
    scene.add(cameraBox);

    cameraBox.geometry.computeBoundingBox()
}

function doorSceneBackground() {
    const doorSceneTexture = new THREE.TextureLoader().load('./Texturas/doorBackgroundScene.png');
    const doorScenegeometry = new THREE.PlaneGeometry(200, 250, 32);
    const doorScenematerial = new THREE.MeshBasicMaterial({ map: doorSceneTexture, side: THREE.DoubleSide });
    const doorScene = new THREE.Mesh(doorScenegeometry, doorScenematerial);
    doorScene.position.set(-308, 39, 999)
    scene.add(doorScene);
}

function playSound() {
    const listener = new THREE.AudioListener();
    camera.add(listener);
    const sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('../Texturas/SuspenseForest.mp3', function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
        sound.play();
    });

}


function createScene() {
    scene = new THREE.Scene();
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(90, 1280 / 720, 0.1, 2000);
    camera.rotation.order = "YXZ"
    camera.position.set(0, player.height, 100);
    camera.lookAt(new THREE.Vector3(0, player.height, 0));
    geometry = new THREE.SphereGeometry(0.0005, 32, 32);
    material = new THREE.MeshBasicMaterial({ color: 'white', side: THREE.DoubleSide, name: "Pointer" });
    sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0, 0, -0.1)
    camera.add(sphere)
    scene.add(camera)
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#e4e0ba");
    document.getElementById('world').appendChild(renderer.domElement);

    //Ceiling light
    const lampTexture = new THREE.TextureLoader().load('./Texturas/lampTexture.jpg');
    const Lampgeometry = new THREE.CylinderGeometry(3, 39, 69, 32, 1, true)
    const Lampmaterial = new THREE.MeshLambertMaterial({ map: lampTexture });
    const Lamp = new THREE.Mesh(Lampgeometry, Lampmaterial);
    Lamp.position.set(0, 239, 450)
    Lampmaterial.side = THREE.DoubleSide
    scene.add(Lamp);

    //LampWire
    const wireTexture = new THREE.TextureLoader().load('./Texturas/wireTexture.jpg');
    const Wiregeometry = new THREE.CylinderGeometry(3, 3, 30, 32);
    const Wirematerial = new THREE.MeshBasicMaterial({ map: wireTexture });
    const wire = new THREE.Mesh(Wiregeometry, Wirematerial);
    wire.position.set(0, 230, 450)
    scene.add(wire);

    //Simulation of bulblight
    const sphereLight = new THREE.SphereBufferGeometry(12, 299, 299)
    light1 = new THREE.PointLight(0xffffff, 0.9);
    light1.add(new THREE.Mesh(sphereLight, new THREE.MeshBasicMaterial({ color: 0xFCFDA4 })));
    light1.position.set(0, 220, 450)
    scene.add(light1);
    if (isCorrectColors) {
        light1.color.setHex(0xAB28FE);
    } else {
        light1.color.setHex(0xffffff);
    }


    //Neon Light trough cealing
    const pipeTexture = new THREE.TextureLoader().load('./Texturas/pipeTextureNeon.jpg');
    const Troughgeometry = new THREE.CylinderGeometry(5, 5, 500, 32);
    const Troughmaterial = new THREE.MeshPhongMaterial({ map: pipeTexture });
    const Trough = new THREE.Mesh(Troughgeometry, Troughmaterial);
    Trough.rotation.z = THREE.Math.degToRad(90)
    Trough.position.set(250, 0, 0)
    pipeLight.add(Trough);
    pipeLight.position.set(-250, 250, 450)
    scene.add(pipeLight)

    //Neon light pipe wall
    const TroughWallgeometry = new THREE.CylinderGeometry(5, 5, 500, 32);
    const TroughWallmaterial = new THREE.MeshPhongMaterial({ map: pipeTexture });
    const TroughWall = new THREE.Mesh(TroughWallgeometry, TroughWallmaterial);
    TroughWall.position.set(10, -50, 0)
    pipeLight.add(TroughWall);
    pipeLight.position.set(-490, 250, 450)
    scene.add(pipeLight)

    //Light Helper
    const pointLightHelper = new THREE.PointLightHelper(light1, 10);
    scene.add(pointLightHelper);


    //Call scene objects functions
    oldOilTank()
    oldOilTank2()
    SafeTable()
    chair()
    officeCrew()
    informationNeonLight()
    circuitSolution()
    safeBox()
    doorOffice()
    floor()
    roof()
    doorWalls()
    CameraBox()
    safeBoxCode()
    doorSceneBackground()
    playSound()
    doorKey()


    //Create random boxes
    for (let i = 0; i < 3; i++) {
        randomBoxes()
    }


    //Create papers
    for (let i = 0; i < 3; i++) {
        floorPapers(i)
    }


    //Create 3 tables
    for (let i = 0; i < 3; i++) {
        OfficeTable()
    }

    //Create 4 walls
    for (let i = 0; i < 4; i++) {
        walls()
    }

    //Create neo btn 
    for (let i = 0; i < 5; i++) {
        neonButtons(i)
    }

    //Set the positions of buttons
    neonBtnArray[0].position.set(-490, 39, 943)
    neonBtnArray[1].position.set(-490, 39, 923)
    neonBtnArray[2].position.set(-490, 39, 903)
    neonBtnArray[3].position.set(-490, 19, 903)
    neonBtnArray[4].position.set(-490, 0, 903)

    //Create switch board neon lights
    const switchTexture = new THREE.TextureLoader().load('./Texturas/switchBoardPlane.jpg');
    const Switchgeometry = new THREE.PlaneGeometry(59, 59, 32);
    const Switchmaterial = new THREE.MeshPhongMaterial({ map: switchTexture, side: THREE.DoubleSide });
    const Switch = new THREE.Mesh(Switchgeometry, Switchmaterial);
    Switch.position.set(-490, 19, 923)
    Switch.rotation.y = THREE.Math.degToRad(90)
    scene.add(Switch);


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

    //Set floor papers positions
    floorPapersArray[0].position.set(-200, -49, 500)
    floorPapersArray[1].position.set(-99, -49, 300)
    floorPapersArray[2].rotation.z = THREE.Math.degToRad(-20)
    floorPapersArray[2].position.set(-300, -49, 200)

    //Set random boxes positions
    randomBoxArray[0].position.set(200, -19, 100)
    randomBoxArray[1].position.set(259, -19, 120)
    randomBoxArray[2].position.set(229, 30, 110)


}


function handleWindowResize() {
    // update height and width of the renderer and the camera
    const HEIGHT = window.innerHeight;
    const WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}


function handleKeyDown(e) {
    var char = e.key;
    if (char == "o") {
        if (haveKey == false) {
            console.log("Não possuis a chave")
        } else {
            if (DoorState == false) {
                hinge.rotation.y = THREE.Math.degToRad(90)
                DoorState = true
            } else {
                hinge.rotation.y = THREE.Math.degToRad(0)
                DoorState = false
            }
        }
    }

    if (char == "0") {
        alert("Controlos:\n 'WASD' para controlar o movimento do personagem. \n Setas para direcionar com a câmara. \n 'E' para dar zoom. \n 'Space' para agachar. \n 'SHIFT' para correr. \n 'R' para interagir com objetos. \n ------------------ \n Caso pretenda relembrar os controlos pressione a tecla '0' \n Bom jogo!!")
    }
    if (char == "k") {
        // if (vaultDoorState == false) {
        //     vaultHinge.rotation.y = THREE.Math.degToRad(-90)
        //     vaultDoorState = true
        // } else {
        //     vaultHinge.rotation.y = THREE.Math.degToRad(0)
        //     vaultDoorState = false
        // }
    }
}

function keyDown(event) {
    keyboard[event.keyCode] = true;
}

function keyUp(event) {
    keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
let interactableNames = []

let alertflag = false
function animate() {
    if (keyAnimation && scene.children.filter(item => item.name == "key")[0].position != camera.position && !haveKey) {
        scene.children.filter(item => item.name == "key")[0].position.x--

    }
    if (keyAnimation && scene.children.filter(item => item.name == "key")[0].position.x < camera.position.x && !haveKey) {
        scene.children.filter(item => item.name == "key")[0].visible = false
        alert("Parabéns no cofre contém uma chave")
        haveKey = true

    }

    if (openDoor == true && THREE.Math.radToDeg(hinge.rotation.y) < 90) {
        hinge.rotation.y += THREE.Math.degToRad(1)
        if (!alertflag && THREE.Math.radToDeg(hinge.rotation.y) > 85) {
            alert("Parabéns conseguiste fugir! Fim do jogo.")
            window.cancelAnimationFrame(animate)
            window.location.reload();
            alertflag = true
        }



    } else {
        openDoor = false


    }

    if (isCorrectColors) {
        light1.color.setHex(0xAB28FE);
    } else {
        light1.color.setHex(0x8F8F8F);
    }

    if (vaultDoorState && THREE.Math.radToDeg(vaultHinge.rotation.y) > -90) {
        vaultHinge.rotation.y -= THREE.Math.degToRad(1)
        if (THREE.Math.radToDeg(vaultHinge.rotation.y) <= -90) {

            doorOpen = true
            vaultdoorAlert = true
        }

    } else {

        vaultDoorState = false

    }


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

    if (keyboard[37]) { // left 
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
    //console.log(camera.zoom)

    if (keyboard[32]) { //baixar Space key
        if (player.height > 19) {
            player.height -= 1

        }
        player.speed = 0.5

    }
    else {
        if (player.height < 51.8) {
            player.height += 1
            player.speed = 1
        }

    }
    camera.position.y = player.height
    if (keyboard[69]) { // E key Zoom
        camera.zoom = 1.6;
        camera.updateProjectionMatrix();
    }
    else {
        camera.zoom = 1;
        camera.updateProjectionMatrix();
    }
    raycaster.setFromCamera(pos, camera);
    if (keyboard[82]) { // R interagir
        console.log("interagir")
        pos.x = 0
        pos.y = 0

        const intersects = raycaster.intersectObjects(scene.children);

        try {
            console.log(intersects)
            for (let i = 0; i < intersects.length; i++) {
                const item = intersects[i];
                if (interactableNames.filter(int => int === item.object.name).length != 0) {
                    if (item.distance <= 150) {
                        if (item.object.name.startsWith("btn")) {
                            item.object.material.color.set(changeColor(item))
                            checkBtnColors()



                        }
                        if (item.object.name == "safeDoor" && !vaultdoorAlert) {
                            let code = prompt("introduza o código :")
                            if (code == 93469) {
                                vaultDoorState = true
                            }


                        }
                        if (item.object.name == "safeDoor" && doorOpen && !haveKey) {
                            console.log(doorOpen)
                            // scene.children.filter(item => item.name == "key")[0].visible = false

                            keyAnimation = true


                        }

                        if (item.object.name == "door") {

                            if (haveKey) {
                                openDoor = true
                            }
                            else {
                                alert("Não tens a chave!")
                            }

                        }


                    }
                }


            }


        } catch (error) {
            console.log("nada na vista")
        }
        keyboard[82] = false

    }
    else {
        raycaster = new THREE.Raycaster();
        //largar
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

function checkBtnColors() {
    console.log(scene.children.filter(child => child.name.startsWith("btn")))
    if (scene.children.filter(child => child.name.startsWith("btn"))[0].material.color.r == blue.r && scene.children.filter(child => child.name.startsWith("btn"))[0].material.color.g == blue.g && scene.children.filter(child => child.name.startsWith("btn"))[0].material.color.b == blue.b &&
        scene.children.filter(child => child.name.startsWith("btn"))[3].material.color.r == blue.r && scene.children.filter(child => child.name.startsWith("btn"))[3].material.color.g == blue.g && scene.children.filter(child => child.name.startsWith("btn"))[3].material.color.b == blue.b &&
        scene.children.filter(child => child.name.startsWith("btn"))[4].material.color.r == blue.r && scene.children.filter(child => child.name.startsWith("btn"))[4].material.color.g == blue.g && scene.children.filter(child => child.name.startsWith("btn"))[4].material.color.b == blue.b &&
        scene.children.filter(child => child.name.startsWith("btn"))[1].material.color.r == red.r && scene.children.filter(child => child.name.startsWith("btn"))[1].material.color.g == red.g && scene.children.filter(child => child.name.startsWith("btn"))[1].material.color.b == red.b &&
        scene.children.filter(child => child.name.startsWith("btn"))[2].material.color.r == green.r && scene.children.filter(child => child.name.startsWith("btn"))[2].material.color.g == green.g && scene.children.filter(child => child.name.startsWith("btn"))[2].material.color.b == green.b) {
        isCorrectColors = true
        codePlane.material.visible = true

    }
    else {
        isCorrectColors = false
        codePlane.material.visible = false
    }
}
function changeColor(item) {

    if (item.object.material.color.r == gray && item.object.material.color.g == gray && item.object.material.color.b == gray) {
        //blue

        return 0x4548ff
    }
    if (item.object.material.color.b == blue.b && item.object.material.color.r == blue.r && item.object.material.color.g == blue.g) {
        //red
        return 0xff2424
    }
    if (item.object.material.color.r == red.r && item.object.material.color.g == red.g && item.object.material.color.b == red.b) {
        //green
        return 0x00b31e

    }
    if (item.object.material.color.r == green.r && item.object.material.color.g == green.g && item.object.material.color.b == green.b) {
        //green
        return 0x696969

    }
}



