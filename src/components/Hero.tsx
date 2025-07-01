import Image from "next/image";

export function Hero() {
  return (
    <section className="text-center mb-20 md:mb-32">
      <div className="max-w-4xl mx-auto">
        <Image
          src="/logo-icon-blue.png"
          alt="Scooli icon"
          className="mx-auto mb-6 h-16"
          width={50}
          height={50}
        />
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
          Transforme a sua
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {" "}
            experiência{" "}
          </span>
          de ensino
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
          A plataforma educativa que conecta professores portugueses com
          ferramentas inovadoras para todos os níveis de ensino.
        </p>
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-slate-600 border border-slate-200">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Disponível brevemente
        </div>
      </div>
    </section>
  );
}
