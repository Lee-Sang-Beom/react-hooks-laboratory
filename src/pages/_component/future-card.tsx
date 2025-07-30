import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge.tsx";

export default function FutureCard() {
  return (
    <Card className="opacity-60 cursor-not-allowed border-dashed">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gray-100 rounded-lg">
              <BookOpen className="w-5 h-5 text-gray-400" />
            </div>
            <Badge variant="secondary" className="text-xs bg-gray-200">
              Coming Soon
            </Badge>
          </div>
        </div>
        <CardTitle className="text-xl font-semibold text-gray-400">
          useDeferredValue
        </CardTitle>
        <CardDescription className="text-sm text-gray-400">
          준비 중인 컨텐츠입니다.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
