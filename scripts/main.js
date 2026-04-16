// ========================  CARTA FINITA (sin scroll infinito) ========================
const CONTENIDO_CARTA = `
    <p>Querida nath,</p>
    <p>Feliz cumpleaños mi amor, cumpliste 20 años nath ... ¡20! Quiero que sientas mi abrazo más fuerte, mi beso más profundo y que mis manos estén tomando las tuyas, porque mi corazón está tan feliz de poder estar a tu lado en uno de los muchos momentos que quiero pasar en tu vida ❤️.</p>
    
    <div class="verso">“SABES PERFECTAMENTE que desde el primer momento en donde nos vimos a los ojos, no fue solamente amor, fue conexión... Algo que es inusual encontrar en la vida, pero encontré algo mucho más difícil en esta que eso.”</div>
    
    <p><strong>TE ENCONTRÉ A TI</strong><br>
    Llegaste cuando mi corazón se estaba rindiendo ante la corrupción de la desdicha, recibiéndolo con tus manos tan gentiles y delicadas, incluso antes de ser algo más que amigos.</p>
    
    <p>Nunca pensé amar tanto a alguien como lo estoy haciendo contigo, de una forma tan fuerte y extensamente.</p>
    
    <div class="verso">“ERES LA MUJER QUE NUNCA PENSÉ, PERO SÍ LA QUE MÁS DESEABA 💜”</div>
    
    <p>Nunca llegué a pensar que una chica que comenzó siendo mi amiga terminaría siendo aquella en la que pensaría todos los días sin perder ni un solo día la intensidad de mis sentimientos.</p>
    
    <p><strong>MI CORAZÓN ES TUYO</strong> desde que me incluiste en tu futuro, en tus metas, en tu vida ✨<br>
    Desde que compartimos nuestros anhelos de estar juntos, casarme contigo, tener una familia, tener hijos, envejecer tomados de la mano.<br>
    Desde que comencé a soñar contigo cada noche y todo me hace tan feliz que mi corazón salta de alegría y nervios cada vez que te veo.</p>
    
    <p>Me sorprende que incluso viviendo tan lejos el uno del otro, lo que sentimos es tan fuerte que pudimos con todo.</p>
    
    <div class="verso">“TE AMO por todo lo que me has dado incondicionalmente, por la mujer que eres, por la mujer en la que te estás convirtiendo, de forma tan orgullosa quiero decirte que tu forma de amar es lo más hermoso que seré capaz de sentir en toda mi vida.”</div>
    
    <p>Gracias por escogerme tal y como soy.<br>
    Gracias por existir y entrar a mi vida.<br>
    Gracias por amarme con todo tu corazón.</p>
    
    <p><strong>ERES LA MUJER QUE AMARÉ TODA LA VIDA</strong><br>
    eres única, increíble e inigualable, eres hermosa, espléndida, bella, coqueta, especial, bonita, inteligente, valiente, bondadosa, amable, cariñosa...</p>
    
    <p>Quiero hacer realidad cada plan que hacemos para el futuro.<br>
    Valoro cada "te amo" que nos decimos y nos escribimos.<br>
    Aprecio cada desvelo en los que estuvimos juntos.<br>
    Amo todos nuestros planes de películas, llamadas.<br>
    Cada día es bueno con solo recordarte.</p>
    
    <div class="firma-final">
        SIEMPRE ESTARÉ PARA TI<br>
        EN LAS BUENAS Y EN LAS MALAS<br>
        SOY TUYO JUNTO A MI CORAZÓN<br>
        TE AMO<br>
        EN ESTE Y EN 100 IDIOMAS DIFERENTES
    </div>
    
    <!-- Contenedor donde se insertará dinámicamente la lista de idiomas -->
    <div id="loveRotatorContainer" class="love-rotator-inside"></div>
`;

let audioElement = document.getElementById('musicaFondo');
let videoBg = document.getElementById('bg-video');

const sobreWrapper = document.getElementById('sobreWrapper');
const sobreAnimado = document.getElementById('sobreAnimado');
const sello = document.getElementById('selloClick');
const cartaContainer = document.getElementById('cartaContainer');

let isOpen = false;

function iniciarAudioAutomatico() {
    if (audioElement) {
        audioElement.play().then(() => {
            console.log("🎵 Audio en loop reproducido automáticamente");
        }).catch(err => {
            console.warn("Autoplay bloqueado. Se necesita interacción.");
        });
    }
}

function abrirCarta() {
    if (isOpen) return;
    isOpen = true;

    sobreAnimado.classList.remove('pulso');
    sobreAnimado.classList.add('abierto');

    setTimeout(() => {
        sobreWrapper.classList.add('sobre-arriba');

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
            
            // === INICIAR EL ROTADOR DE 100 IDIOMAS (lista dinámica) ===
            if (typeof window.iniciarRotadorEnContenedor === 'function') {
                window.iniciarRotadorEnContenedor('loveRotatorContainer', 24);
            }
        }, 100);
    }, 4500);
}

function handleFirstInteraction() {
    if (audioElement && audioElement.paused) {
        audioElement.play().catch(e => console.log("Audio requiere interacción"));
    }
    abrirCarta();
    sello.removeEventListener('click', handleFirstInteraction);
    sobreAnimado.removeEventListener('click', handleFirstInteraction);
}

sello.addEventListener('click', handleFirstInteraction);
sobreAnimado.addEventListener('click', handleFirstInteraction);

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

window.addEventListener('load', () => {
    if (videoBg) videoBg.play().catch(e => console.log("Video autoplay bloqueado"));
    iniciarAudioAutomatico();
    console.log("✨ Carta de amor lista. Haz clic en el sello para abrirla lentamente (4.5 segundos). ✨");
});

document.body.addEventListener('click', function() {
    if (audioElement && audioElement.paused) {
        audioElement.play().catch(e => console.log("Aún no se puede reproducir el audio"));
    }
});