// Configuración para la primera escena 3D (d3a)
const escena1 = new THREE.Scene();
const cámara1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderizador1 = new THREE.WebGLRenderer();

// Configuración para la segunda escena 3D (d6a)
const escena2 = new THREE.Scene();
const cámara2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderizador2 = new THREE.WebGLRenderer();

// Configuración para la tercera escena 3D (d6b)
const escena3 = new THREE.Scene();
const cámara3 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderizador3 = new THREE.WebGLRenderer();

// Configuración para la cuarta escena 3D (d6c)
const escena4 = new THREE.Scene();
const cámara4 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderizador4 = new THREE.WebGLRenderer();

// Ajustamos el color de fondo de las escenas 3D
escena2.background = new THREE.Color(0x808080); // Blanco para la escena d6a
escena3.background = new THREE.Color(0xaaaaaa); // Blanco para la escena d6b
escena4.background = new THREE.Color(0x858585); // Blanco para la escena d6c

// Función para ajustar el tamaño de los renderizadores y las cámaras
function ajustarTamaño() {
    const d3 = document.getElementById('d3a');
    const d4 = document.getElementById('d6a');
    const d5 = document.getElementById('d6b');
    const d6 = document.getElementById('d6c');
    
    const rect3 = d3.getBoundingClientRect();
    const rect4 = d4.getBoundingClientRect();
    const rect5 = d5.getBoundingClientRect();
    const rect6 = d6.getBoundingClientRect();

    // Ajustar tamaño para d3a (primera escena)
    renderizador1.setSize(rect3.width, rect3.height);
    cámara1.aspect = rect3.width / rect3.height;
    cámara1.updateProjectionMatrix();

    // Ajustar tamaño para d6a (segunda escena)
    renderizador2.setSize(rect4.width, rect4.height);
    cámara2.aspect = rect4.width / rect4.height;
    cámara2.updateProjectionMatrix();

    // Ajustar tamaño para d6b (tercera escena)
    renderizador3.setSize(rect5.width, rect5.height);
    cámara3.aspect = rect5.width / rect5.height;
    cámara3.updateProjectionMatrix();

    // Ajustar tamaño para d6c (cuarta escena)
    renderizador4.setSize(rect6.width, rect6.height);
    cámara4.aspect = rect6.width / rect6.height;
    cámara4.updateProjectionMatrix();
}

// Inicializar los renderizadores y agregar a los respectivos contenedores
ajustarTamaño();
//document.getElementById('d3a').appendChild(renderizador1.domElement);
document.getElementById('d6a').appendChild(renderizador2.domElement);
document.getElementById('d6b').appendChild(renderizador3.domElement);
document.getElementById('d6c').appendChild(renderizador4.domElement);

// Crear un cubo para la primera escena (d3a)
const geometría1 = new THREE.BoxGeometry(10, 1, 10); // Cubo
const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Material verde
const cubo1 = new THREE.Mesh(geometría1, material1);
escena1.add(cubo1);
cámara1.position.z = 5;
cámara2.position.z = 15;
cámara3.position.z = 2.5;
cámara4.position.z = 13;
cámara4.position.y = 3;

// Añadir luz ambiental y direccional a todas las escenas
const luzAmbiental = new THREE.AmbientLight(0xffffff, 0.5); // Luz ambiental
const luzDireccional = new THREE.DirectionalLight(0xffffff, 1); // Luz direccional
luzDireccional.position.set(1, 1, 1).normalize();

const luzAmbiental1 = new THREE.AmbientLight(0xffffff, 0.5); // Luz ambiental
const luzDireccional1 = new THREE.DirectionalLight(0xffffff, 1); // Luz direccional
luzDireccional1.position.set(1, 1, 1).normalize();

const luzAmbiental2 = new THREE.AmbientLight(0xffffff, 0.5); // Luz ambiental
const luzDireccional2 = new THREE.DirectionalLight(0xffffff, 1); // Luz direccional
luzDireccional2.position.set(1, 1, 1).normalize();

// Añadir la luz a todas las escenas
escena2.add(luzAmbiental, luzDireccional);
escena3.add(luzAmbiental1, luzDireccional1);
escena4.add(luzAmbiental2, luzDireccional2);

// Cargar el modelo GLB del "taco" para todas las escenas (d6a, d6b, d6c)
const loader = new THREE.GLTFLoader();
let tacoModel;

// Función para cargar el modelo en cualquier escena
function cargarModelo(scene,taco1,y=1) {
    loader.load(taco1, function (gltf) {
        const taco = gltf.scene;
        scene.add(taco);

        // Ajustar la escala y la posición del modelo
        taco.scale.set(y,y,y);
        taco.position.set(0, -1, 0);

        // Guardamos la referencia del modelo para animar
        scene.taco = taco;
    }, undefined, function (error) {
        console.error('Error al cargar el modelo:', error);
    });
}

// Cargar el modelo en todas las escenas
cargarModelo(escena2,'taco.glb');
cargarModelo(escena3,'nachos.glb');
cargarModelo(escena4,'skitle.glb');

// Función de animación para todas las escenas
function animar() {
    requestAnimationFrame(animar);

    // Rotar el cubo en la primera escena (d3a)
    cubo1.rotation.x += 0.01;
    cubo1.rotation.y += 0.01;

    // Rotar los modelos "taco" en las otras escenas
    if (escena2.taco) escena2.taco.rotation.y += 0.003;
    if (escena3.taco) escena3.taco.rotation.y += 0.001;
    if (escena4.taco) escena4.taco.rotation.y -= 0.00001;

    // Renderizar las escenas
    renderizador1.render(escena1, cámara1);
    renderizador2.render(escena2, cámara2);
    renderizador3.render(escena3, cámara3);
    renderizador4.render(escena4, cámara4);
}

// Iniciar la animación
animar();

// Asegurarse de que el tamaño se actualice si la ventana cambia de tamaño
window.addEventListener('resize', ajustarTamaño);









const contador = document.getElementById('p2');
let c4 = 0;
let c2 = 0;
let c1a = 0;
let c2a = 0;
let c3a = 0;
let panda = [];
let i = 0;

function cambiarV(b,ca,x=false) {
    let x1 = ca ==0? false : true;
    let m = b.id.replace(/\D/g, ''); 
    let m1 = parseInt(m); 
    console.log(m1);

    let c = m1 == 1 ? 2000 : m1 == 2 ? 2000 : m1 == 3 ? 1000 : 0;
    c4 = x == true && c4-c >= 0 && x1 == true ? (c4-=c) : x == false?(c4+=c): c4+0;
    contador.innerHTML = 'Cuenta: ' + c4 + '$';
}

const b1 = document.getElementById('b1');
const b2 = document.getElementById('b2');
const b3 = document.getElementById('b3');
const p1a = document.getElementById('p1a');
const p1b = document.getElementById('p1b');
const p1c = document.getElementById('p1c');
const b1b = document.getElementById('b1b');
const b2b = document.getElementById('b2b');
const b3b = document.getElementById('b3b');

b1.addEventListener('click', function() {
    cambiarV(b1,c1a)
    c1a += 3;
    p1a.innerHTML = 'Tacos: ' + c1a; 
});
b2.addEventListener('click', function() {
    cambiarV(b2,c2a)
    c2a += 1;
    p1c.innerHTML = 'Nachos: ' + c2a;
});
b3.addEventListener('click', function() {
    cambiarV(b3,c3a)
    c3a += 1;
    p1b.innerHTML = 'Skitles: ' + c3a;
});
b1b.addEventListener('click', function() {
    cambiarV(b1,c1a,true)
    c1a = c1a-3 >= 0 ? c1a-=3 : c1a+0;
    p1a.innerHTML = 'Tacos: ' + c1a; 
});
b2b.addEventListener('click', function() {
    cambiarV(b2,c2a,true)
    c2a = c2a-1>=0?c2a-=1:c2a+0;
    p1c.innerHTML = 'Nachos: ' + c2a;
});
b3b.addEventListener('click', function() {
    cambiarV(b3,c3a,true)
    c3a = c3a-1>=0?c3a-=1:c3a+0;
    p1b.innerHTML = 'Skitles: ' + c3a;
});

const b4 = document.getElementById('b4');
const p5 = document.getElementById('p5');
let ch1 = false;
let c1j = 0;
const ch2 = document.getElementById('check');
ch2.addEventListener('click',function(){
    if(c1j == 0){
        ch1 = true;
        c1j = 1;
    }else if(c1j == 1){
        ch1 = false;
        c1j = 0;
    }
});
b4.addEventListener('click', function() {
    const p3 = document.getElementById('p3');
    let c1 = parseInt(p3.value);
    c2 = c1 - c4;
    let c5 = c2 < 0 ? 'Paga insuficiente' : c2;
    p5.innerHTML = 'Vuelto: ' + c5;
    p3.value = 0;

    if (c5 === 'Paga insuficiente') {
        setTimeout(function() {
            p5.innerHTML = 'Vuelto: ';
        }, 2000);
    } else {
        const div1 = document.getElementById('d1');
        const div2 = document.createElement('div');
        div2.classList.add('d12', 'd13');
        div2.id = 'div2';
        div1.appendChild(div2);

        const div3 = document.createElement('div');
        div3.classList.add('d15');
        div3.id = 'div3';
        div2.appendChild(div3);
        const div4 = document.createElement('div');
        div4.classList.add('d16');
        div4.id = 'div4';
        div2.appendChild(div4);

        const div5 = document.createElement('div');
        div5.classList.add('d14');
        div5.id = 'div5';
        div3.appendChild(div5);

        const div6 = document.createElement('div');
        div6.classList.add('d14');
        div6.id = 'div6';
        div3.appendChild(div6);

        const div7 = document.createElement('div');
        div7.classList.add('d14');
        div7.id = 'div7';
        div3.appendChild(div7);

        const div8 = document.createElement('p');
        div8.classList.add('p6', 'p7');
        div8.id = 'div8';
        div8.innerHTML = 'Tacos';
        div5.appendChild(div8);
        const div9 = document.createElement('p');
        div9.classList.add('p8');
        div9.id = 'div9';
        div9.innerHTML = c1a;
        div5.appendChild(div9);

        const div10 = document.createElement('p');
        div10.classList.add('p6', 'p7');
        div10.id = 'div10';
        div10.innerHTML = 'nachos';
        div6.appendChild(div10);
        const div11 = document.createElement('p');
        div11.classList.add('p8');
        div11.id = 'div11';
        div11.innerHTML = c2a;
        div6.appendChild(div11);

        const div12 = document.createElement('p');
        div12.classList.add('p6', 'p7');
        div12.id = 'div12';
        div12.innerHTML = 'skitles';
        div7.appendChild(div12);
        const div13 = document.createElement('p');
        div13.classList.add('p8');
        div13.id = 'div13';
        div13.innerHTML = c3a;
        div7.appendChild(div13);

        const div14 = document.createElement('p');
        div14.classList.add('p9');
        div14.id = 'div14';
        div14.innerHTML = 'Cuenta: ' + c4;
        div4.appendChild(div14);

        // Guardar los datos en el array `panda`
        panda.push([c1a, c2a, c3a, c4,ch1]);
        console.log(panda);

        // Resetear los valores
        c1a = 0;
        c2a = 0;
        c3a = 0;
        c4 = 0;
        i += 1;
        contador.innerHTML = 'Cuenta: ' + c4 + '$';
        p1a.innerHTML = 'Tacos: ' + c1a; 
        p1c.innerHTML = 'nachos: ' + c2a;
        p1b.innerHTML = 'skitles: ' + c3a;
    }
});

const re = document.getElementById('re');
re.addEventListener('click', function() {
    c1a = 0;
    c2a = 0;
    c3a = 0;
    c4 = 0;
    p3.value = 0;
    p5.innerHTML = 'Vuelto:';
    contador.innerHTML = 'Cuenta: ' + c4 + '$';
});

function downloadExcel() {
    // Crear la hoja de cálculo a partir del array `panda`
    const ws = XLSX.utils.aoa_to_sheet(panda);

    // Crear un libro de trabajo
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Panda');

    // Generar el archivo Excel y descargarlo
    XLSX.writeFile(wb, 'panda.xlsx');
}
const be = document.getElementById("be");

be.addEventListener('click',function(){
    downloadExcel();
});