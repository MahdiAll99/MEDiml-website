type VideoItem = {
  title: string;
  description?: string;
  youtubeId?: string; // for single video embeds
  playlistId?: string; // for playlist embeds
  href?: string; // link to YouTube page
  duration?: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
};

export const videos: VideoItem[] = [
  {
    title: "MEDiml App - Complete Tutorial Playlist",
    description: "Full playlist with step-by-step tutorials for the MEDiml desktop application.",
    playlistId: "PLEPy2VhC4-D5Eg-UxRyTtmUZRh-D5m_Ru",
    href: "https://youtube.com/playlist?list=PLEPy2VhC4-D5Eg-UxRyTtmUZRh-D5m_Ru",
    level: "Beginner",
  },
  {
    title: "Getting Started with MEDiml",
    description: "Introduction to MEDiml: loading medical images, exploring data, and understanding the interface.",
    youtubeId: "gSRsqmDv8mE",
    href: "https://youtube.com/playlist?list=PLEPy2VhC4-D5Eg-UxRyTtmUZRh-D5m_Ru",
    duration: "10:00",
    level: "Beginner",
  },
  {
    title: "Radiomics Feature Extraction",
    description: "Learn how to configure and run IBSI-compliant radiomics feature extraction on your medical images.",
    youtubeId: "gSRsqmDv8mE",
    href: "https://youtube.com/playlist?list=PLEPy2VhC4-D5Eg-UxRyTtmUZRh-D5m_Ru",
    duration: "15:00",
    level: "Intermediate",
  },
];
