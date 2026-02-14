import { useState, useEffect } from 'react';
import { INICIO_RELACION } from '../utils/dates';
import './LovePage.css';

function LovePage() {
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cambiar el título de la página
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Para mi novia Eri';
    
    return () => {
      document.title = originalTitle;
    };
  }, []);

  useEffect(() => {
    const calculateTimeElapsed = () => {
      const now = new Date();
      const startDate = new Date(INICIO_RELACION);
      
      // Calcular diferencia en milisegundos
      const diff = now.getTime() - startDate.getTime();
      
      if (diff < 0) {
        // Si la fecha aún no ha llegado, mostrar ceros
        setTimeElapsed({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      
      setTimeElapsed({
        days: days,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60
      });
    };

    // Calcular inmediatamente
    calculateTimeElapsed();
    
    // Actualizar cada segundo
    const interval = setInterval(calculateTimeElapsed, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="love-page">
      <div className="love-background">
        {/* Corazones decorativos de fondo */}
        <div className="hearts-background">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="heart-decoration" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${10 + Math.random() * 20}px`
            }}>
              ❤️
            </div>
          ))}
        </div>
      </div>
      
      <div className="love-content">
        <div className="love-text">
          <p className="love-greeting">Para mi hermosa mujer, Erika:</p>
          <p className="love-message">
            Si pudiera elegir un lugar<br />
            seguro, sería sin dudas a tu lado.
          </p>
          <p className="love-message">
            Todo lugar con vos siempre<br />
            se termina convirtiendo en un paraiso.
          </p>
          <p className="love-message">Te amo mucho, Erika. Te amo <br />
          más de lo que puedo expresar.</p>
          <p className="love-signature">愛してる</p>
          <p className="love-counter-label">Somos novios desde hace...</p>
          <div className="love-counter">
            <span className="counter-value">{timeElapsed.days}</span>
            <span className="counter-unit">días</span>
            <span className="counter-value">{timeElapsed.hours.toString().padStart(2, '0')}</span>
            <span className="counter-unit">horas</span>
            <span className="counter-value">{timeElapsed.minutes.toString().padStart(2, '0')}</span>
            <span className="counter-unit">minutos</span>
            <span className="counter-value">{timeElapsed.seconds.toString().padStart(2, '0')}</span>
            <span className="counter-unit">segundos</span>
          </div>
          <button 
            className="valentine-button"
            onClick={() => setIsModalOpen(true)}
          >
            Mensaje para San Valentin
          </button>
        </div>
        
        <div className="love-letter-e">
          <div className="letter-e-canopy">
            {(() => {
              const hearts = [];
              let heartIndex = 0;

              const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

              // Pseudo-random determinístico (evita que la "E" cambie de forma en cada render)
              const rand01 = (seed) => {
                const x = Math.sin(seed * 9999) * 10000;
                return x - Math.floor(x);
              };

              const pushHeart = ({ x, y, zIndex = 5, size = 22, rotate = 0, delay = 0 }) => {
                hearts.push(
                  <div
                    key={heartIndex}
                    className="tree-heart"
                    style={{
                      left: `${clamp(x, 5, 95)}%`,
                      top: `${clamp(y, 5, 85)}%`,
                      animationDelay: `${delay}s`,
                      transform: `rotate(${rotate}deg)`,
                      fontSize: `${size}px`,
                      zIndex,
                    }}
                  >
                    ❤️
                  </div>
                );
                heartIndex++;
              };
              
              // Definir la estructura de la letra E
              // La E tiene: línea vertical izquierda + 3 líneas horizontales (arriba, medio, abajo)
              
              // Línea vertical izquierda (de arriba a abajo)
              const verticalLine = [
                [20, 15], [25, 15], [30, 15], [35, 15], [40, 15], 
                [45, 15], [50, 15], [55, 15], [60, 15], [65, 15], [70, 15]
              ];
              
              // Línea horizontal superior
              const topHorizontal = [
                [20, 20], [20, 30], [20, 40], [20, 50], [20, 60], [20, 70]
              ];
              
              // Línea horizontal media
              const middleHorizontal = [
                [45, 20], [45, 30], [45, 40], [45, 50], [45, 60], [45, 70]
              ];
              
              // Línea horizontal inferior
              const bottomHorizontal = [
                [70, 20], [70, 30], [70, 40], [70, 50], [70, 60], [70, 70]
              ];
              
              const basePoints = [
                ...verticalLine,
                ...topHorizontal,
                ...middleHorizontal,
                ...bottomHorizontal,
              ];

              // Para que la "E" se vea más "gruesa": agregamos vecinos alrededor de cada punto base.
              // (dx,dy) en porcentajes: ajustado para que no se deforme en pantallas chicas.
              const thickness = 2.6;
              const neighborOffsets = [
                [0, 0],
                [thickness, 0],
                [-thickness, 0],
                [0, thickness],
                [0, -thickness],
                [thickness * 0.8, thickness * 0.8],
                [-thickness * 0.8, thickness * 0.8],
                [thickness * 0.8, -thickness * 0.8],
                [-thickness * 0.8, -thickness * 0.8],
              ];

              // Evitar duplicados por cercanía (para no apilar demasiados corazones en el mismo lugar)
              const used = new Set();
              const keyFor = (x, y) => `${Math.round(x * 2) / 2},${Math.round(y * 2) / 2}`;

              basePoints.forEach(([yBase, xBase], baseIdx) => {
                neighborOffsets.forEach(([dx, dy], offIdx) => {
                  const seed = baseIdx * 100 + offIdx * 7;
                  const jitterX = (rand01(seed + 1) - 0.5) * 1.4;
                  const jitterY = (rand01(seed + 2) - 0.5) * 1.4;

                  const x = xBase + dx + jitterX;
                  const y = yBase + dy + jitterY;

                  const key = keyFor(x, y);
                  if (used.has(key)) return;
                  used.add(key);

                  const size = 18 + (baseIdx % 4) * 4 + (offIdx % 2) * 2;
                  const rotate = (baseIdx * 13 + offIdx * 29) % 360;
                  const delay = ((baseIdx * 0.11 + offIdx * 0.07) % 2);
                  const zIndex = 8 - Math.floor((yBase - 20) / 15);

                  pushHeart({ x, y, zIndex, size, rotate, delay });
                });

                // Un poco de "relleno" alrededor del trazo (1 corazón extra cerca de algunos puntos)
                if (rand01(baseIdx + 123) < 0.55) {
                  const seed = baseIdx * 17 + 999;
                  const x = xBase + (rand01(seed + 1) - 0.5) * 8;
                  const y = yBase + (rand01(seed + 2) - 0.5) * 8;
                  const key = keyFor(x, y);
                  if (!used.has(key)) {
                    used.add(key);
                    pushHeart({
                      x,
                      y,
                      zIndex: 3,
                      size: 18 + (baseIdx % 5) * 3,
                      rotate: (baseIdx * 31) % 360,
                      delay: (baseIdx * 0.09) % 2,
                    });
                  }
                }
              });
              
              return hearts;
            })()}
          </div>
        </div>
      </div>
      
      {/* Modal para San Valentin */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <div className="modal-text">
              <p>Para mi Mimi, mi Michi hermosa,<br />
              en este 14 de febrero de 2026.</p>
              
              <p>Me enseñaste tanto…<br />
              Siento que, cada día, estoy más cerca tuyo. Y aunque sé que tengo falencias, vos me abrazás igual, con amor, con paciencia, con verdad. A veces me cuesta creerlo, pero es real: sos real. Y llegaste para quedarte conmigo, así como yo llegué para quedarme con vos.</p>
              
              <p>Hubo muchos momentos en mi vida en los que me sentí solo, perdido, desorientado. Momentos en los que estaba herido y me convencía de que tenía que aguantar, porque "el futuro iba a ser mejor". Pensé eso muchas veces. Por eso, de más chico, permití cosas que no merecía: que abusaran de mi confianza, que me lastimaran, que me tomaran para la risa.</p>
              
              <p>Y aun así, cuando sentía que el peso de todo eso me vencía, apareciste vos.</p>
              
              <p>Desde aquel 3 de septiembre supe que había algo distinto: apenas nos encontramos, ya quería volver a abrazarte. Cuando te perdí de vista en el reci, me quedó esa necesidad de despedirme como correspondía… y al final volví a verte. Gracias a Dios, que te puso en mi camino.</p>
              
              <p>Después de eso, entre charla y charla, entre risas y silencios, nos fuimos acercando. Yo, tímido como soy, fui animándome de a poco. Y en ese acercarnos, sin darme cuenta, me enamoré de vos. Me acuerdo perfecto del día en que tenía una necesidad inmensa de verte, porque quería decirte en la cara que te amaba. Fue único para mí… pero todavía más único fue cuando, la semana siguiente, vos me lo dijiste en persona, en aquel shopping chiquito del centro de Quilmes.</p>
              
              <p>Con el paso del tiempo empecé a mirarte con otros ojos: con ojos de futuro, de hogar, de familia. Aunque hoy seamos novios, esas proyecciones viven en mí, y me empujan a seguir, a no rendirme, a crecer, a convertirme en una mejor persona.</p>
              
              <p><em>Nota de último momento: este fragmento en cursiva fue agregado el mismo 14 de febrero de 2026, como una breve actualización de todo lo que hablamos entre el 13 y el 14.</em></p>
              
              <p><em>Hoy me siento un hombre nuevo.<br />
              Siento que me convertí en un adulto de verdad: alguien que piensa en sus prioridades, en sus metas, y en cumplir tanto sus sueños personales como los sueños compartidos que tenemos vos y yo (casarnos y formar una familia).</em></p>
              
              <p><em>Desde hoy, acepto mis heridas como parte de mi historia, pero no como cadenas para mi vida adulta.<br />
              Acepto quién soy.<br />
              Acepto que puedo equivocarme.<br />
              Y acepto también que no merezco ser castigado por eso, porque soy un ser humano que intenta dar siempre lo mejor de sí para alcanzar lo que sueña.</em></p>
              
              <p><em>Por eso quiero agradecerte: por aceptarme tal como soy, por hacerme sentir que cada día estoy más cerca de convertirme en ese adulto responsable que mañana será un buen padre y una buena cabeza de familia. Estoy completamente seguro de que voy a lograrlo si te tengo a mi lado, en las buenas y en las malas.</em></p>
              
              <p><em>Desde este mensaje quiero dejar algo en claro:<br />
              nunca vas a dejar de ser mi motor.<br />
              Ya no tengo miedo de equivocarme.<br />
              Nunca más voy a sentir que merezco castigarme por un error.</em></p>
              
              <p><em>Voy a esforzarme al 1000% para estar a tu lado, para vivir todas las aventuras que soñamos, para superar cada obstáculo y alcanzar cada meta (y más) que Dios puso en nuestro camino. Hoy renuncio al sufrimiento por mi pasado; lo dejo atrás para terminar de madurar y convertirme en el ingeniero, esposo, padre de familia y piloto comercial de avión que siempre soñé ser. Y, al mismo tiempo, acompañarte en cada meta personal que quieras conquistar en tu vida. (hasta acá llega el texto en cursiva)</em></p>
              
              <p>Sin más que decir, quiero desearte un hermoso 14 de febrero, a vos, mi hermosísima Erika Martina Solange Benítez, y pedirle a Dios que este sea el primero de infinitos 14 de febreros a tu lado.</p>
              
              <p>Te amo muchísimo, mi Mimi hermosa 💕</p>
              
              <p>Atentamente,<br />
              Facundo Mayordomo<br />
              tu novio, tu futuro ingeniero, tu futuro esposo y el futuro padre de tus hijos.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LovePage;
