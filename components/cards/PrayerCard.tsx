"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTimeStamp } from "@/lib/utils";
import { Heart, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ROUTES from "@/constants/routes";

interface PrayerCardProps {
  prayer: PrayerRequest;
  onPray?: (prayerId: string) => void;
  onMarkAnswered?: (prayerId: string, description: string) => void;
}

const PrayerCard = ({ prayer, onPray, onMarkAnswered }: PrayerCardProps) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      healing: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      guidance: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      protection: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      provision: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      salvation: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      family: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      work: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
      ministry: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      other: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      in_progress: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      answered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Link href={ROUTES.PRAYER(prayer._id)}>
              <CardTitle className="hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer">
                {prayer.title}
              </CardTitle>
            </Link>
            <div className="flex gap-2">
              <Badge className={getCategoryColor(prayer.category)}>
                {prayer.category}
              </Badge>
              <Badge className={getStatusColor(prayer.status)}>
                {prayer.status === 'in_progress' ? 'In Progress' : prayer.status}
              </Badge>
              {prayer.isAnonymous && (
                <Badge variant="secondary">Anonymous</Badge>
              )}
            </div>
          </div>
          {prayer.status === 'answered' && (
            <CheckCircle className="h-6 w-6 text-green-600" />
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
          {prayer.description}
        </p>
        
        {prayer.status === 'answered' && prayer.answeredDescription && (
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-200">
              <strong>Answered:</strong> {prayer.answeredDescription}
            </p>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {!prayer.isAnonymous && (
              <Link 
                href={ROUTES.PROFILE(prayer.author._id)}
                className="flex items-center space-x-2 hover:text-amber-600"
              >
                <Image
                  src={prayer.author.image || "/images/default-avatar.png"}
                  alt={prayer.author.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="text-sm font-medium">{prayer.author.name}</span>
              </Link>
            )}
            {prayer.isAnonymous && (
              <span className="text-sm text-gray-500">Anonymous</span>
            )}
            <span className="text-xs text-gray-500">
              {getTimeStamp(prayer.createdAt)}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Heart className="h-4 w-4" />
              <span>{prayer.prayedBy.length}</span>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onPray?.(prayer._id)}
              className="text-xs"
            >
              🙏 Pray
            </Button>
            
            {prayer.status === 'pending' && onMarkAnswered && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const description = prompt("How was this prayer answered?");
                  if (description) {
                    onMarkAnswered(prayer._id, description);
                  }
                }}
                className="text-xs"
              >
                Mark Answered
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrayerCard;