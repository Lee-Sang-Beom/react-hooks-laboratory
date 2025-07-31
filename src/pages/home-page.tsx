import { useNavigate } from "react-router-dom";
import OptimisticCard from "@/pages/_component/optimistic-card.tsx";
import TransitionCard from "@/pages/_component/transition-card.tsx";
import UseCard from "@/pages/_component/use-card.tsx";
import FutureCard from "@/pages/_component/future-card.tsx";
import HomeFooter from "@/pages/_component/home-footer.tsx";
import HomeHeader from "@/pages/_component/home-header.tsx";

export default function HomePage() {
  const navigator = useNavigate();
  const handleCardClick = (path: string) => {
    navigator(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <HomeHeader />

        {/* Hook Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* useOptimistic Hook Card */}
          <OptimisticCard handleCardClick={handleCardClick} />

          {/* useTransition Hook Card */}
          <TransitionCard handleCardClick={handleCardClick} />

          {/* use Hook Card */}
          <UseCard handleCardClick={handleCardClick} />

          {/* Placeholder Card for Future Hook */}
          <FutureCard />
        </div>

        {/* Footer */}
        <HomeFooter />
      </div>
    </div>
  );
}
