"use client";

import { cn } from "@/lib/utils";
import { Pause, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

type VideoSource = {
  src: string;
  poster: string;
  width: number;
  height: number;
  /** Optional AV1 encode, offered first: about a third smaller at the same sharpness. */
  av1Src?: string;
};

export type VideoAsset = VideoSource & {
  /** A portrait cut for phones, where the full-width film would be unreadable. */
  mobile?: VideoSource;
};

/**
 * A silent product film that loops. The <video> only mounts once it is near
 * the viewport (`autoPlay` buffers immediately whatever `preload` says, and
 * shipping a film with the initial load once pushed p75 LCP to ~9.3s), and it
 * pauses off-screen. It plays even with reduced motion — the film is the
 * product, not decoration — so a pause button is always there (WCAG 2.2.2).
 * When the film has a mobile cut, each cut is shown at its own breakpoint; the
 * hidden one never intersects, so it is never downloaded.
 */
export function LoopingVideo({
  video,
  label,
  className,
  priority = false,
}: {
  video: VideoAsset;
  label: string;
  className?: string;
  priority?: boolean;
}) {
  if (!video.mobile) {
    return <LazyFilm source={video} label={label} className={className} priority={priority} />;
  }

  return (
    <>
      <LazyFilm source={video.mobile} label={label} className={cn("md:hidden", className)} priority={priority} />
      <LazyFilm source={video} label={label} className={cn("hidden md:block", className)} priority={priority} />
    </>
  );
}

function LazyFilm({
  source,
  label,
  className,
  priority,
}: {
  source: VideoSource;
  label: string;
  className?: string;
  priority: boolean;
}) {
  const t = useTranslations("common");
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        if (visible) {setShouldLoad(true);}
        setInView(visible);
      },
      { rootMargin: "200px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // React doesn't reliably reflect `muted` as an attribute, and browsers only
  // autoplay muted video, so mute and start it by hand once it exists.
  useEffect(() => {
    const player = videoRef.current;
    if (!player) {return;}
    player.muted = true;
    if (inView && !paused) {void player.play().catch(() => {});}
    else {player.pause();}
  }, [shouldLoad, inView, paused]);

  return (
    <div
      ref={containerRef}
      className={cn("group relative overflow-hidden bg-stone-soft", className)}
      style={{ aspectRatio: `${source.width} / ${source.height}` }}
    >
      {shouldLoad ? (
        <video
          ref={videoRef}
          className="absolute inset-0 size-full object-cover"
          poster={source.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          aria-label={label}
        >
          {source.av1Src && <source src={source.av1Src} type='video/mp4; codecs="av01.0.08M.08"' />}
          <source src={source.src} type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- static poster, swapped for the video on mount
        <img
          src={source.poster}
          alt={label}
          className="absolute inset-0 size-full object-cover"
          fetchPriority={priority ? "high" : "low"}
          loading={priority ? "eager" : "lazy"}
        />
      )}
      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-label={paused ? t("playVideo") : t("pauseVideo")}
        className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-ink/55 text-white opacity-70 backdrop-blur-sm transition-opacity hover:opacity-100 focus-visible:opacity-100 group-hover:opacity-100"
      >
        {paused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
      </button>
    </div>
  );
}
