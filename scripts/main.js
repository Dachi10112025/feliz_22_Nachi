// ========================  CARTA FINITA (sin scroll infinito) ========================
const CONTENIDO_CARTA = `
    <p>Dearest Nath,</p>
    <p>Desde el momento en que tus ojos cruzaron los míos, el mundo cobró un color que nunca supe que existía. No fue casualidad, fue un susurro del universo que me señalaba el camino hacia ti. Cada latido de mi corazón aprendió un nuevo idioma: el tuyo. Y desde entonces, sólo sé hablar de amor en tu nombre.</p>
    <p>Eres la melodía silenciosa que guía mi alma, la luz suave que disipa mis miedos. He escrito este pergamino para recordarte que mi amor por ti es profundo y sincero, y que cada día descubro una nueva razón para amarte más.</p>
    <div class="verso">“Si pudiera regalarte una sola cosa, sería la capacidad de verme a través de mis ojos. Así sabrías lo infinita que eres para mí.”</div>
    <p>Recuerdo la primera vez que escuché tu risa a través de una llamada. El mundo se detuvo. Las palabras se volvieron poesía y el silencio entre frase y frase se llenó de promesas. Las llamadas contigo nunca son simples conversaciones; son cartas sonoras, abrazos de voz, el único lugar donde el tiempo me pertenece.</p>
    <h2>✧ Eres mi primavera perpetua ✧</h2>
    <p>He guardado cada mensaje, cada “te quiero” dicho al viento. Nath, eres el sueño del que nunca quiero despertar. En los días grises, tu recuerdo es mi sol. En las noches largas, tu nombre es mi oración.</p>
    <p>Me he imaginado un futuro a tu lado: un jardín donde los tulipanes crecen en los bordes de nuestra casa, tardes de té y conversaciones que duran hasta el amanecer, y un teléfono que nunca deja de sonar con la melodía de tu voz. Porque lo nuestro es atemporal, como las estrellas que nos vieron nacer.</p>
    <div class="verso">“Amar a Nath no es una elección, es el latido que me fue dado antes de nacer.”</div>
    <p>Te escribo esta carta porque mereces saberlo siempre. Eres mi confidente, mi complicidad, el hogar que llevo dondequiera que vaya. Tu risa es mi canción favorita, tu mirada es mi refugio. Cada día descubro una nueva razón para agradecer que existas.</p>
    <h2>🌸 Fragmentos de un amor sincero 🌸</h2>
    <p>¿Sabes lo que más admiro de ti? Tu manera de hacer sencillo lo complicado, de llenar de luz incluso los rincones más oscuros. Eres valiente, genuina y posees una ternura que desarma cualquier tormenta. A tu lado he aprendido que el amor verdadero no se gasta, se multiplica.</p>
    <p>Cada vez que me llamas, siento que florecen jardines enteros en mi pecho. Las palabras se vuelven pétalos y los silencios, caricias.</p>
    <div class="verso">“Nath, si tuviera que elegir entre el aire y tu voz, elegiría tu voz mil veces.”</div>
    <p>El tiempo pasa, pero nuestro amor se vuelve más profundo como el vino más añejo. He guardado cada instante a tu lado como un tesoro. Desde aquella primera llamada hasta las madrugadas en vela compartiendo secretos. Eres mi cómplice, mi amiga, mi todo.</p>
    <h2>📞 El eco de tu voz en mi alma 📞</h2>
    <p>Las llamadas contigo se han convertido en el ritual más sagrado de mis días. No importa si hablamos de lo cotidiano o de nuestros sueños más profundos, tu voz es un bálsamo que cura cualquier herida. Por eso siempre tendrás mi atención, mi tiempo y mi corazón dispuesto a escucharte.</p>
    <p>Si el destino nos puso a prueba con la distancia, el amor respondió con creces: convirtió cada teléfono en un puente, cada mensaje en un poema. Eres mi Norte, mi Sur, mi Este y mi Oeste. Eres el mapa y el tesoro al mismo tiempo.</p>
    <div class="verso">“No necesito un mapa, porque mi brújula siempre apunta hacia ti.”</div>
    <p>Nath, he escrito estas líneas con la esperanza de que las leas y las releas, y que en cada lectura encuentres una nueva promesa. Te prometo seguir cultivando este amor con la misma devoción del primer día. Te prometo estar, aunque sea en llamada, para celebrar tus triunfos y abrazar tus penas.</p>
    <p>Y cuando el mundo se sienta pesado, recuerda esta carta. Recuerda que en algún lugar, Danchi está pensando en ti, escribiendo versos para ti, esperando con ansias la próxima vez que escuche tu voz.</p>
    <div class="firma-final">Con devoción eterna,<br>Tu Danchi. ❤️</div>
`;

let audioElement = document.getElementById('musicaFondo');
let videoBg = document.getElementById('bg-video');

// Elementos DOM
const sobreWrapper = document.getElementById('sobreWrapper');
const sobreAnimado = document.getElementById('sobreAnimado');
const sello = document.getElementById('selloClick');
const cartaContainer = document.getElementById('cartaContainer');

let isOpen = false;

// Función para forzar la reproducción del audio (autoplay real)
function iniciarAudioAutomatico() {
    if (audioElement) {
        audioElement.play().then(() => {
            console.log("🎵 Audio en loop reproducido automáticamente");
        }).catch(err => {
            console.warn("Autoplay bloqueado por el navegador. Se necesita interacción del usuario para activar el sonido.");
            // Mostrar un mensaje sutil en la consola, pero no interrumpir la experiencia
        });
    }
}

// Abrir la carta
function abrirCarta() {
    if (isOpen) return;
    isOpen = true;

    sobreAnimado.classList.add('abierto');

    setTimeout(() => {
        sobreWrapper.classList.add('sobre-arriba');
        sobreAnimado.classList.remove('pulso');

        cartaContainer.style.display = 'block';
        cartaContainer.style.opacity = '0';

        cartaContainer.innerHTML = `
            <div class="modo-lectura">
                <div class="carta-pergamino" id="pergaminoDinamico">
                    <div class="texto-infinito">
                        ${CONTENIDO_CARTA}
                    </div>
                </div>
            </div>
        `;

        setTimeout(() => {
            cartaContainer.style.transition = 'opacity 0.6s ease';
            cartaContainer.style.opacity = '1';
            const pergaminoElem = document.querySelector('.carta-pergamino');
            if (pergaminoElem) pergaminoElem.classList.add('carta-entrada');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);

    }, 400);
}

function handleFirstInteraction() {
    // Aseguramos que el audio suene si aún no lo ha hecho
    if (audioElement && audioElement.paused) {
        audioElement.play().catch(e => console.log("Audio requiere interacción explícita"));
    }
    abrirCarta();
    sello.removeEventListener('click', handleFirstInteraction);
    sobreAnimado.removeEventListener('click', handleFirstInteraction);
}

// Eventos de apertura
sello.addEventListener('click', handleFirstInteraction);
sobreAnimado.addEventListener('click', handleFirstInteraction);

// Apertura con scroll
let scrollThresholdReached = false;
window.addEventListener('wheel', function(e) {
    if (!isOpen && !scrollThresholdReached && Math.abs(e.deltaY) > 80) {
        scrollThresholdReached = true;
        if (!isOpen) {
            if (audioElement && audioElement.paused) {
                audioElement.play().catch(e => console.log("Audio necesita interacción"));
            }
            abrirCarta();
            sello.removeEventListener('click', handleFirstInteraction);
            sobreAnimado.removeEventListener('click', handleFirstInteraction);
        }
    }
});

// Precarga del video e intento de autoplay de audio al cargar la página
window.addEventListener('load', () => {
    if (videoBg) videoBg.play().catch(e => console.log("Video autoplay posiblemente bloqueado"));
    iniciarAudioAutomatico();  // Intento de reproducción automática del audio
    console.log("✨ Carta de amor lista. Haz clic en el sello para abrirla. El audio intentará sonar automáticamente. ✨");
});

// Si el usuario hace clic en cualquier parte, reactivamos el audio por si estaba silenciado
document.body.addEventListener('click', function() {
    if (audioElement && audioElement.paused) {
        audioElement.play().catch(e => console.log("Aún no se puede reproducir el audio"));
    }
});