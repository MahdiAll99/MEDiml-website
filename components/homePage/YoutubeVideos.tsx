"use client";

import React from "react";
import Link from "next/link";
import { Youtube, PlayCircle } from "lucide-react";
import { videos } from "@/data/youtubeVideos";

function YouTubeEmbed({ playlistId }: { playlistId: string }) {
  if (!playlistId) return null;
  const src = `https://www.youtube.com/embed/videoseries?list=${playlistId}&rel=0&modestbranding=1`;

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
      <div className="relative aspect-video w-full">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title="MEDiml YouTube Playlist"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default function VideoTutorialsSection() {
  // Find the playlist video object from videos data
  const playlistVideo =
    videos.find((v) => v.playlistId) ||
    // fallback to first
    videos[0];

  return (
    <section className="relative w-full bg-background text-text">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        {/* Header */}
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.04] px-3 py-1 text-sm">
            <Youtube className="h-4 w-4 text-red-500" />
            Video Tutorials
          </div>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Learn MEDiml-app with Guided Videos
          </h2>
          <p className="mx-auto mt-3 text-pretty opacity-80">
            Watch the full MEDiml Desktop App playlist for a step-by-step introduction, from loading medical images and radiomics feature extraction to model training and results analysis.
          </p>
        </div>

        {/* Playlist embed */}
        <div className="mt-12">
          <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.04] p-4 backdrop-blur-sm">
            <div className="absolute left-5 top-3 h-3 w-3 rounded-full bg-red-400" />
            <div className="absolute left-9 top-3 h-3 w-3 rounded-full bg-green-400" />
            <div className="absolute left-[3.25rem] top-3 h-3 w-3 rounded-full bg-yellow-400" />

            <div className="pt-5">
              {playlistVideo && playlistVideo.playlistId && (
                <YouTubeEmbed playlistId={playlistVideo.playlistId} />
              )}

              <h3 className="mt-5 text-lg font-bold">
                {playlistVideo?.title || "MEDiml App - Complete Tutorial Playlist"}
              </h3>
              {playlistVideo?.description && (
                <p className="mt-1 text-sm opacity-80">{playlistVideo.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-10 flex justify-center">
          <Link
            href={
              playlistVideo?.href ||
              "https://youtube.com/playlist?list=PLEPy2VhC4-D5Eg-UxRyTtmUZRh-D5m_Ru"
            }
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary px-5 py-2 text-sm font-medium text-black transition hover:brightness-95"
            aria-label="Watch on YouTube"
            target="_blank"
            rel="noopener noreferrer"
          >
            <PlayCircle className="h-4 w-4" />
            Watch Full Playlist on YouTube
          </Link>
        </div>
      </div>
    </section>
  );
}
