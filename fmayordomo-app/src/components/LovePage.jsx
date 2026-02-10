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
    </div>
  );
}

export default LovePage;
