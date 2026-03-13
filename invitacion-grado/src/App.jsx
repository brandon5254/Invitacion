import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Gift,
  GraduationCap,
  MapPin,
  MessageCircle,
  Shirt,
  Wine,
} from "lucide-react";

const LOGO_SRC = "/logo.png";

const MONTH_NAMES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const WEEK_DAYS = ["DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB"];

function getTimeLeft(targetDate) {
  const now = new Date();
  const diff = Math.max(0, targetDate.getTime() - now.getTime());

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function buildCalendarMatrix(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];

  for (let i = 0; i < firstDayOfMonth; i += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day);
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
}

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-4 text-[#d4af37]">
      <span className="h-px w-16 bg-[#d4af37] md:w-28" />
      <span className="text-xl">✦</span>
      <span className="h-px w-16 bg-[#d4af37] md:w-28" />
    </div>
  );
}

function TimeCard({ label, value }) {
  return (
    <div className="rounded-[1.6rem] border border-[#d4af37]/24 bg-[#23252b]/78 p-4 text-center shadow-xl backdrop-blur">
      <div className="text-3xl font-semibold text-[#f7f0e3] md:text-4xl">
        {String(value).padStart(2, "0")}
      </div>
      <div className="mt-1 text-xs uppercase tracking-[0.32em] text-[#d4af37]">
        {label}
      </div>
    </div>
  );
}

function SectionHeading({ title, text }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="font-serif text-4xl text-[#f3e2a0] md:text-6xl">
        {title}
      </h2>
      {text ? (
        <p className="mt-5 text-lg leading-8 text-[#f7f0e3]/90">{text}</p>
      ) : null}
    </div>
  );
}

function EventCalendar({ targetDate }) {
  const monthName = MONTH_NAMES[targetDate.getMonth()];
  const year = targetDate.getFullYear();
  const eventDay = targetDate.getDate();
  const calendarCells = buildCalendarMatrix(targetDate);

  return (
    <section className="texture-bg px-6 py-10">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#d4af37]/28 bg-[#23252b]/70 p-6 text-center shadow-2xl md:p-10">
        <p className="mb-2 text-sm uppercase tracking-[0.35em] text-[#d4af37]">
          Fecha del evento
        </p>

        <h2 className="script-title text-5xl text-[#f3e2a0] md:text-7xl">
          {monthName} {year}
        </h2>

        <p className="body-serif mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#f7f0e3]/90 md:text-xl">
          Un detalle pensado para que puedas identificar con claridad la fecha
          de esta celebración tan especial.
        </p>

        <div className="mt-8 rounded-[1.8rem] border border-[#d4af37]/18 bg-[#1f2126]/85 p-4 shadow-[inset_0_1px_0_rgba(243,226,160,0.04)] md:p-6">
          <div className="grid grid-cols-7 gap-y-4 text-center">
            {WEEK_DAYS.map((day) => (
              <div
                key={day}
                className="body-serif text-sm font-semibold tracking-[0.18em] text-[#f7f0e3] md:text-xl"
              >
                {day}
              </div>
            ))}

            {calendarCells.map((day, index) => {
              const isEventDay = day === eventDay;

              return (
                <div
                  key={`${day ?? "empty"}-${index}`}
                  className="flex min-h-[3.2rem] items-center justify-center md:min-h-[4.2rem]"
                >
                  {day ? (
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-full body-serif text-xl md:h-14 md:w-14 md:text-3xl ${
                        isEventDay
                          ? "calendar-highlight border-2 border-[#f3e2a0] bg-[#2a2d33] text-[#f7f0e3] shadow-[0_0_18px_rgba(243,226,160,0.16)]"
                          : "text-[#f7f0e3]"
                      }`}
                    >
                      {day}
                    </span>
                  ) : (
                    <span className="h-11 w-11 md:h-14 md:w-14" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function GoldButton({ href, children, icon: Icon, target = undefined }) {
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noreferrer" : undefined}
      className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#d4af37] bg-gradient-to-b from-[#f3e2a0] to-[#c89b3c] px-7 py-3 text-base font-medium text-[#1e1f23] shadow-[0_10px_30px_rgba(0,0,0,0.22)] transition hover:scale-105"
    >
      {Icon ? <Icon className="h-4 w-4 animate-button-icon" /> : null}
      {children}
    </a>
  );
}

export default function InvitacionWebGrado() {
  const targetDate = useMemo(() => new Date("2026-04-18T19:00:00"), []);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  const galleryImages = [
    "/grado/imagen 1.jpeg",
    "/grado/imagen 2.jpeg",
    "/grado/imagen 3.jpeg",
    "/grado/imagen 4.jpeg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#1e1f23] text-white">
      <style>{`
        .texture-bg {
          background:
            radial-gradient(circle at 50% 20%, rgba(243,226,160,0.12), transparent 18%),
            radial-gradient(circle at 50% 38%, rgba(200,155,60,0.10), transparent 24%),
            radial-gradient(circle at 18% 12%, rgba(255,255,255,0.05), transparent 18%),
            radial-gradient(circle at 85% 78%, rgba(212,175,55,0.09), transparent 20%),
            linear-gradient(180deg, #4a4c52 0%, #2f3136 16%, #1e1f23 48%, #25272c 78%, #1e1f23 100%);
          position: relative;
        }
        .texture-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 26%, rgba(212,175,55,0.10), transparent 20%),
            radial-gradient(circle at 50% 50%, rgba(0,0,0,0.22), transparent 40%);
          pointer-events: none;
        }
        .texture-bg::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.02), rgba(255,255,255,0.02));
          mix-blend-mode: soft-light;
          opacity: 0.18;
          pointer-events: none;
        }
        .script-title {
          font-family: Georgia, "Times New Roman", serif;
          font-style: italic;
          letter-spacing: 0.01em;
        }
        .body-serif {
          font-family: Georgia, "Times New Roman", serif;
        }
        .gold-corner {
          position: absolute;
          width: 190px;
          height: 190px;
          pointer-events: none;
          opacity: 0.94;
          z-index: 0;
        }
        .gold-corner::before,
        .gold-corner::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 0 0 100% 0;
          background: linear-gradient(135deg, #f3e2a0 0%, #d4af37 30%, #c89b3c 58%, rgba(30,31,35,0.0) 59%);
          filter: drop-shadow(0 10px 20px rgba(0,0,0,0.25));
        }
        .gold-corner::after {
          inset: 18px;
          background: linear-gradient(135deg, #dcb96a 0%, #9a6425 42%, rgba(30,31,35,0.0) 58%);
          opacity: 0.88;
        }
        .gold-corner.tl { top: 0; left: 0; }
        .gold-corner.br {
          right: 0;
          bottom: 0;
          transform: rotate(180deg);
        }
        .thin-corner-line {
          position: absolute;
          width: 220px;
          height: 220px;
          border-top: 2px solid rgba(212,175,55,0.75);
          border-right: 2px solid rgba(212,175,55,0.75);
          top: 42px;
          right: 42px;
          pointer-events: none;
          z-index: 0;
        }
        .thin-corner-line.bottom-left {
          top: auto;
          right: auto;
          bottom: 42px;
          left: 42px;
          border-top: none;
          border-right: none;
          border-bottom: 2px solid rgba(212,175,55,0.75);
          border-left: 2px solid rgba(212,175,55,0.75);
        }
        .logo-glow {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .logo-glow::before {
          content: "";
          position: absolute;
          width: 390px;
          height: 390px;
          background: radial-gradient(circle, rgba(212,175,55,0.22) 0%, rgba(212,175,55,0.10) 34%, rgba(212,175,55,0.0) 68%);
          filter: blur(10px);
          pointer-events: none;
        }
        .logo-image {
          position: relative;
          z-index: 1;
          width: min(72vw, 380px);
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 8px 18px rgba(0,0,0,0.32));
        }

        @keyframes leftToast {
          0%, 100% { transform: rotate(-14deg) translateY(0); }
          25% { transform: rotate(-8deg) translateY(-4px); }
          50% { transform: rotate(-2deg) translateY(-10px); }
          75% { transform: rotate(-10deg) translateY(-4px); }
        }
        @keyframes rightToast {
          0%, 100% { transform: rotate(14deg) translateY(0); }
          25% { transform: rotate(8deg) translateY(-4px); }
          50% { transform: rotate(2deg) translateY(-10px); }
          75% { transform: rotate(10deg) translateY(-4px); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0.25; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .toast-left { animation: leftToast 2.2s ease-in-out infinite; }
        .toast-right { animation: rightToast 2.2s ease-in-out infinite; }
        .toast-sparkle { animation: sparkle 1.3s ease-in-out infinite; }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes iconClockTick {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(6deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(-6deg); }
        }
        @keyframes iconCapTilt {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          25% { transform: rotate(-4deg) translateY(-3px); }
          50% { transform: rotate(0deg) translateY(-6px); }
          75% { transform: rotate(4deg) translateY(-3px); }
        }
        @keyframes iconGiftPop {
          0%, 100% { transform: scale(1); }
          30% { transform: scale(1.08); }
          60% { transform: scale(0.96); }
        }
        @keyframes iconChatWave {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-4px) rotate(-4deg); }
          50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(-4px) rotate(4deg); }
        }
        @keyframes iconButtonBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes iconDressSway {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-3px) rotate(-3deg); }
          50% { transform: translateY(-6px) rotate(0deg); }
          75% { transform: translateY(-3px) rotate(3deg); }
        }
        @keyframes calendarPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 rgba(243,226,160,0.0);
          }
          50% {
            transform: scale(1.06);
            box-shadow: 0 0 18px rgba(243,226,160,0.20);
          }
        }

        .animate-calendar {
          animation: iconFloat 2.6s ease-in-out infinite;
          transform-origin: center;
        }
        .animate-clock {
          animation: iconClockTick 2.2s ease-in-out infinite;
          transform-origin: center;
        }
        .animate-cap {
          animation: iconCapTilt 2.8s ease-in-out infinite;
          transform-origin: center;
        }
        .animate-gift {
          animation: iconGiftPop 2.4s ease-in-out infinite;
          transform-origin: center;
        }
        .animate-chat {
          animation: iconChatWave 2.6s ease-in-out infinite;
          transform-origin: center;
        }
        .animate-button-icon {
          animation: iconButtonBounce 1.8s ease-in-out infinite;
          transform-origin: center;
        }
        .animate-dress {
          animation: iconDressSway 2.7s ease-in-out infinite;
          transform-origin: center;
        }
        .calendar-highlight {
          animation: calendarPulse 2s ease-in-out infinite;
        }
      `}</style>

      <section className="texture-bg relative flex min-h-screen items-center justify-center px-6 py-20 text-center">
        <div className="gold-corner tl" />
        <div className="gold-corner br" />
        <div className="thin-corner-line" />
        <div className="thin-corner-line bottom-left" />

        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="logo-glow mx-auto mb-8">
            <img
              src={LOGO_SRC}
              alt="Logo Ingeniería de Sistemas"
              className="logo-image"
            />
          </div>
          <p className="mb-4 text-sm uppercase tracking-[0.45em] text-[#d4af37]">
            Invitación de grado
          </p>
          <h1 className="script-title text-5xl leading-tight text-[#f3e2a0] md:text-7xl">
            Ing. Brandon Sanchez
          </h1>
          <div className="mt-6">
            <Ornament />
          </div>
          <p className="body-serif mx-auto mt-8 max-w-3xl text-2xl text-[#f7f0e3] md:text-4xl">
            Ingeniero de Sistemas
          </p>
          <p className="body-serif mx-auto mt-4 max-w-3xl text-xl text-[#f7f0e3] md:text-3xl">
            Universidad de San Buenaventura
          </p>

          <div className="body-serif mx-auto mt-12 max-w-3xl space-y-8 text-xl leading-10 text-[#f7f0e3] md:text-2xl md:leading-[3.1rem]">
            <p>
              Después de un camino lleno de aprendizajes y mucha dedicación, ha
              llegado el momento de celebrar un sueño hecho realidad:
            </p>

            <div>
              <h2 className="script-title text-5xl text-[#f3e2a0] md:text-7xl">
                Mi Graduación
              </h2>
              <p className="mt-5 italic">
                Con la ayuda de Dios, la Virgencita, mi familia, amigos y
                conocidos; este día marca el inicio de una nueva etapa en mi
                vida, llena de pasión por crear, innovar y transformar.
              </p>
            </div>

            <p>
              Es un momento de inmensa alegría que quiero compartir contigo,
              para que seas parte de este logro tan importante para mí.
              Acompáñame a celebrar este día tan especial.
            </p>
          </div>

          <div className="mt-10">
            <GoldButton href="#detalles" icon={GraduationCap}>
              Ver invitación
            </GoldButton>
          </div>
        </div>
      </section>

      <section id="detalles" className="texture-bg px-6 py-16">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#d4af37]/28 bg-[#23252b]/70 p-8 shadow-2xl backdrop-blur md:p-12">
          <SectionHeading
            title="Cuenta regresiva"
            text="Cada segundo nos acerca a una noche inolvidable."
          />

          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            <TimeCard label="Días" value={timeLeft.days} />
            <TimeCard label="Horas" value={timeLeft.hours} />
            <TimeCard label="Minutos" value={timeLeft.minutes} />
            <TimeCard label="Segundos" value={timeLeft.seconds} />
          </div>
        </div>
      </section>

      <EventCalendar targetDate={targetDate} />

      <section className="texture-bg px-6 py-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[2rem] border border-[#d4af37]/24 bg-[#23252b]/70 p-8 text-center shadow-2xl">
            <CalendarDays className="mx-auto h-9 w-9 text-[#d4af37] animate-calendar" />
            <p className="mt-5 text-xs uppercase tracking-[0.35em] text-[#d4af37]">
              Fecha
            </p>
            <h3 className="body-serif mt-3 text-3xl text-[#f7f0e3]">Sábado</h3>
            <p className="body-serif mt-2 text-xl leading-8 text-[#f7f0e3]/90">
              18 de abril de 2026
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#d4af37]/24 bg-[#23252b]/70 p-8 text-center shadow-2xl">
            <Clock3 className="mx-auto h-9 w-9 text-[#d4af37] animate-clock" />
            <p className="mt-5 text-xs uppercase tracking-[0.35em] text-[#d4af37]">
              Hora
            </p>
            <h3 className="body-serif mt-3 text-3xl text-[#f7f0e3]">
              7:00 p. m.
            </h3>
            <p className="body-serif mt-2 text-xl leading-8 text-[#f7f0e3]/90">
              Puntuales
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#d4af37]/24 bg-[#23252b]/70 p-8 text-center shadow-2xl">
            <GraduationCap className="mx-auto h-9 w-9 text-[#d4af37] animate-cap" />
            <p className="mt-5 text-xs uppercase tracking-[0.35em] text-[#d4af37]">
              Programa
            </p>
            <h3 className="body-serif mt-3 text-3xl text-[#f7f0e3]">
              Ingeniería de Sistemas
            </h3>
            <p className="body-serif mt-2 text-xl leading-8 text-[#f7f0e3]/90">
              Un logro para celebrar
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#d4af37]/24 bg-[#23252b]/70 p-8 text-center shadow-2xl">
            <Shirt className="mx-auto h-9 w-9 text-[#d4af37] animate-dress" />
            <p className="mt-5 text-xs uppercase tracking-[0.35em] text-[#d4af37]">
              Vestimenta
            </p>
            <h3 className="body-serif mt-3 text-3xl text-[#f7f0e3]">Formal</h3>
            <p className="body-serif mt-2 text-xl leading-8 text-[#f7f0e3]/90">
              Código de vestimenta
            </p>
          </div>
        </div>
      </section>

      <section className="texture-bg px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#d4af37]/28 bg-[#23252b]/70 p-8 text-center shadow-2xl md:p-12">
          <h2 className="script-title text-4xl text-[#f3e2a0] md:text-6xl">
            Lugar
          </h2>
          <p className="body-serif mx-auto mt-6 max-w-3xl text-xl leading-9 text-[#f7f0e3] md:text-2xl">
            Calle 15b#107-190 avenida piedra grande casa 40, barrio Ciudad
            Jardín
          </p>

          <div className="relative mx-auto mt-10 flex w-fit items-center justify-center gap-3 text-[#f3e2a0]">
            <Wine className="toast-left h-14 w-14" strokeWidth={1.8} />
            <span className="toast-sparkle absolute top-0 text-2xl">✦</span>
            <Wine className="toast-right h-14 w-14" strokeWidth={1.8} />
          </div>

          <div className="mt-8">
            <GoldButton
              href="https://www.google.com/maps/search/?api=1&query=Calle%2015b%23107-190%20avenida%20piedra%20grande%20casa%2040%20barrio%20Ciudad%20Jardin"
              target="_blank"
              icon={MapPin}
            >
              Ver ubicación
            </GoldButton>
          </div>
        </div>
      </section>

      <section className="texture-bg px-6 py-10">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-[#d4af37]/28 bg-[#23252b]/70 p-6 shadow-2xl md:p-10">
          <div className="mb-8 text-center">
            <h2 className="script-title text-4xl text-[#f3e2a0] md:text-6xl">
              Mi camino profesional
            </h2>
            <p className="body-serif mx-auto mt-4 max-w-3xl text-lg leading-8 text-[#f7f0e3]/90 md:text-xl">
              Aquí comparto algunos momentos que reflejan mi crecimiento,
              esfuerzo y preparación en esta etapa.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={image}
                className="flex h-[480px] w-full items-center justify-center overflow-hidden rounded-[1.1rem] border border-[#d4af37]/20 p-4"
              >
                <img
                  src={image}
                  alt={`Foto de grado ${index + 1}`}
                  className="h-full w-full object-contain object-center transition duration-500 hover:scale-[1.02]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="texture-bg px-6 py-8">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#d4af37]/28 bg-[#23252b]/70 p-8 text-center shadow-2xl md:p-12">
          <Gift className="mx-auto h-10 w-10 text-[#d4af37] animate-gift" />
          <h2 className="script-title mt-5 text-4xl text-[#f3e2a0] md:text-6xl">
            Obsequio
          </h2>
          <p className="body-serif mx-auto mt-6 max-w-3xl text-xl leading-9 text-[#f7f0e3] md:text-2xl">
            Con gratitud y cariño, comparto con ustedes esta forma especial de
            acompañarme en la celebración de este logro.
          </p>
          <h3 className="script-title mt-6 text-4xl text-[#f3e2a0] md:text-6xl">
            Lluvia de sobres
          </h3>
          <div className="mt-8">
            <Ornament />
          </div>
        </div>
      </section>

      <section id="confirmar" className="texture-bg px-6 pb-24 pt-8">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#d4af37]/28 bg-[#23252b]/70 p-8 text-center shadow-2xl md:p-12">
          <MessageCircle className="mx-auto h-10 w-10 text-[#d4af37] animate-chat" />
          <h2 className="script-title mt-5 text-4xl text-[#f3e2a0] md:text-6xl">
            Asistencia
          </h2>
          <p className="body-serif mx-auto mt-6 max-w-3xl text-xl leading-9 text-[#f7f0e3] md:text-2xl">
            Queremos preparar todos los detalles, déjanos saber si contaremos
            con tu asistencia.
          </p>
          <p className="body-serif mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#f7f0e3]/90 md:text-xl">
            En caso de no asistir al evento, por favor avisa con una semana de
            anticipación.
          </p>
          <div className="mt-8">
            <GoldButton
              href="https://wa.me/573045874931?text=Hola%20Brandon%2C%20confirmo%20mi%20asistencia%20a%20tu%20grado"
              target="_blank"
              icon={MessageCircle}
            >
              Clic aquí para confirmar
            </GoldButton>
          </div>
          <p className="mt-6 text-sm tracking-[0.18em] text-[#d4af37]">
            +57 304 587 4931
          </p>
        </div>
      </section>
    </div>
  );
}