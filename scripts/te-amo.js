// ======================== LISTA DE "TE AMO" EN 100 IDIOMAS ========================
const frasesAmor = [
    "I love you", "Je t’aime", "Ti amo", "Eu te amo", "Ich liebe dich",
    "Ik hou van jou", "Jag älskar dig", "Jeg elsker deg", "Jeg elsker dig", "Minä rakastan sinua",
    "Ya tebya lyublyu", "Ya tebe kokhayu", "Kocham cię", "Miluji tě", "Milujem ťa",
    "Szeretlek", "Te iubesc", "Obicham te", "Volim te", "Volim te",
    "Ljubim te", "Të dua", "S’agapo", "Seni seviyorum", "Uhibbuka",
    "Ani ohev otach", "Dooset daram", "Main tumse pyaar karta hoon", "Main tum se mohabbat karta hoon", "Ami tomake bhalobashi",
    "Naan unnai kaadhalikkiren", "Nenu ninnu premistunnanu", "Naanu ninnannu preetisuttene", "Njan ninne snehikkunnu", "Wǒ ài nǐ",
    "Aishiteru", "Saranghae", "Chan rak khun", "Anh yêu em", "Aku cinta kamu",
    "Saya cinta kamu", "Mahal kita", "Nakupenda", "Ngiyakuthanda", "Ndiyakuthanda",
    "Ek het jou lief", "Waan ku jeclahay", "Ewedishalehu", "Mo nifẹ rẹ", "A hụrụ m gị n’anya",
    "Tá grá agam duit", "Tha gaol agam ort", "Rwy’n dy garu di", "Me az kar", "T’estimo",
    "T’estime", "Quérote", "Maite zaitut", "Te amo", "Mi amas vin",
    "Ma armastan sind", "Es tevi mīlu", "Aš tave myliu", "Me shen miqvarxar", "Yes kez sirum em",
    "Men seni süyemin", "Men seni sevaman", "Bi chamd khairtai", "Ma timilai maya garchu", "Mama oyata adarei",
    "Khoi hak chao", "Nga min ko chit tal", "Khnhom sralanh anak", "Nga khyed la ga po yo", "Aloha wau iā ʻoe",
    "Aroha ahau ki a koe", "Ou te alofa ia te oe", "‘Ofa atu", "Au domoni iko", "Mwen renmen ou",
    "Mi ta stimabo", "Ech hunn dech gär", "Ég elska þig", "Inħobbok", "Ez te hez dikim",
    "Za ta sara meena laram", "Man turo dust medoram", "Men seni süyöm", "Men seni söýýärin", "Min sine yaratam",
    "Men sizni söyimen", "Gihigugma tika", "Kuv hlub koj", "Tiako ianao", "Ndimakukonda",
    "Kea u rata", "Ndinokuda", "Melɔ wo", "Sin jaalladha", "Ndagukunda"
];

console.log(`✅ Cargadas ${frasesAmor.length} frases de "Te amo".`);

let listaIntervalos = [];
let rotatorInitialized = false;

// Colores disponibles (clases CSS)
const colores = ['color-rosa', 'color-purpura', 'color-rojo', 'color-marron', 'color-rosa-suave'];
// Alineaciones (se asignan cíclicamente)
const alineaciones = ['left', 'center', 'right'];

function obtenerFraseAleatoria() {
    return frasesAmor[Math.floor(Math.random() * frasesAmor.length)];
}

function obtenerColorAleatorio() {
    return colores[Math.floor(Math.random() * colores.length)];
}

function actualizarItem(item) {
    const nuevaFrase = obtenerFraseAleatoria();
    const nuevoColor = obtenerColorAleatorio();
    
    if (item.innerText !== nuevaFrase) {
        item.classList.add('changing');
        item.innerText = nuevaFrase;
        colores.forEach(c => item.classList.remove(c));
        item.classList.add(nuevoColor);
        setTimeout(() => {
            item.classList.remove('changing');
        }, 500);
    }
}

function crearListaEnContenedor(containerId, cantidadItems = 24) {
    const container = document.getElementById(containerId);
    if (!container) return null;
    if (container.querySelector('.love-list')) return null;
    
    container.innerHTML = ''; // limpiar por si acaso
    
    const listContainer = document.createElement('div');
    listContainer.className = 'love-list-container';
    const ul = document.createElement('ul');
    ul.className = 'love-list';
    
    for (let i = 0; i < cantidadItems; i++) {
        const li = document.createElement('li');
        li.className = `love-item ${alineaciones[i % alineaciones.length]}`;
        li.innerText = obtenerFraseAleatoria();
        li.classList.add(obtenerColorAleatorio());
        ul.appendChild(li);
    }
    
    listContainer.appendChild(ul);
    container.appendChild(listContainer);
    return ul;
}

function iniciarRotadoresIndividuales() {
    const items = document.querySelectorAll('.love-item');
    if (!items.length) return;
    
    listaIntervalos.forEach(clearInterval);
    listaIntervalos = [];
    
    items.forEach((item) => {
        // Intervalo aleatorio entre 2 y 5 segundos para cada ítem
        const intervalo = setInterval(() => {
            actualizarItem(item);
        }, Math.random() * 3000 + 2000);
        listaIntervalos.push(intervalo);
    });
}

function iniciarRotadorEnContenedor(containerId, cantidadItems = 24) {
    if (rotatorInitialized) return;
    rotatorInitialized = true;
    
    const ul = crearListaEnContenedor(containerId, cantidadItems);
    if (!ul) return;
    iniciarRotadoresIndividuales();
}

window.iniciarRotadorEnContenedor = iniciarRotadorEnContenedor;