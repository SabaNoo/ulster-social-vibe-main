import { useEffect, useState } from "react";
import VideoCard from "@/components/VideoCard";

interface Video {
  id: string;
  title: string;
}

const VIDEOS = [
  {
    id: "Nqcp8KsnNNU",
    title: "Ulster University Video"
  },
  {
    id: "0ukvRO4XA2E",
    title: "Ulster University Video"
  },
  {
    id: "oIAH5bmA_HQ",
    title: "Ulster University Video"
  },
  {
    id: "vPynCeIDoT4",
    title: "Ulster University - Belfast Campus"
  },
  {
    id: "L5-BV2P4PHU",
    title: "Ulster University - Magee Campus"
  },
  {
    id: "iqkON2Thpdg",
    title: "Ulster University - Coleraine Campus"
  }
];

const Index = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for smoother transition
    setTimeout(() => {
      setVideos(VIDEOS);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ulster-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ulster-blue mb-2">
            Ulster University Social App
          </h1>
          <p className="text-ulster-gray">
            Watch and interact with Ulster University's latest videos
          </p>
        </header>

        <div className="space-y-6">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              videoId={video.id}
              title={video.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;