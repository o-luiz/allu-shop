import { Card, CardContent } from './card';

export function ProductCardSkeleton() {
  return (
    <Card className="border-gray-300 shadow-sm rounded-sm flex flex-col h-full">
      <CardContent className="p-4 flex-1">
        <div className="w-full h-[312px] bg-gray-200 rounded-lg mb-4 animate-pulse"></div>

        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>

        <div className="space-y-2 mb-3">
          <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
        </div>

        <div className="h-5 bg-gray-200 rounded animate-pulse w-24 mb-3"></div>
      </CardContent>
    </Card>
  );
}
