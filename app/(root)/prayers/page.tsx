"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import PrayerCard from "@/components/cards/PrayerCard";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { Search, Plus } from "lucide-react";
import { toast } from "sonner";

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'healing', label: 'Healing' },
  { value: 'guidance', label: 'Guidance' },
  { value: 'protection', label: 'Protection' },
  { value: 'provision', label: 'Provision' },
  { value: 'salvation', label: 'Salvation' },
  { value: 'family', label: 'Family' },
  { value: 'work', label: 'Work' },
  { value: 'ministry', label: 'Ministry' },
  { value: 'other', label: 'Other' },
];

const statuses = [
  { value: 'all', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'answered', label: 'Answered' },
];

// Mock data for demonstration
const mockPrayers: PrayerRequest[] = [
  {
    _id: "1",
    title: "Healing for my mother's health condition",
    description: "My mother has been struggling with chronic pain for months. We're asking for God's healing touch and wisdom for the doctors treating her.",
    category: "healing",
    isAnonymous: false,
    isPrivate: false,
    status: "pending",
    author: {
      _id: "1",
      name: "Sarah Johnson",
      image: "/images/default-avatar.png",
      value: "sarah-johnson"
    },
    prayedBy: [
      { _id: "2", name: "John Doe", image: "/images/default-avatar.png", value: "john-doe" },
      { _id: "3", name: "Mary Smith", image: "/images/default-avatar.png", value: "mary-smith" },
    ],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    _id: "2",
    title: "Guidance for career decisions",
    description: "I'm at a crossroads in my career and seeking God's direction. Please pray for clarity and wisdom as I make this important decision.",
    category: "guidance",
    isAnonymous: true,
    isPrivate: false,
    status: "in_progress",
    author: {
      _id: "2",
      name: "Anonymous",
      image: "/images/default-avatar.png",
      value: "anonymous"
    },
    prayedBy: [
      { _id: "1", name: "Sarah Johnson", image: "/images/default-avatar.png", value: "sarah-johnson" },
    ],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    _id: "3",
    title: "Safe travels for mission trip",
    description: "Our youth group is traveling to Honduras for a mission trip. Please pray for safe travels, open hearts, and that God would use us mightily.",
    category: "protection",
    isAnonymous: false,
    isPrivate: false,
    status: "answered",
    author: {
      _id: "3",
      name: "Pastor Mike",
      image: "/images/default-avatar.png",
      value: "pastor-mike"
    },
    prayedBy: [
      { _id: "1", name: "Sarah Johnson", image: "/images/default-avatar.png", value: "sarah-johnson" },
      { _id: "2", name: "John Doe", image: "/images/default-avatar.png", value: "john-doe" },
      { _id: "4", name: "Lisa Wilson", image: "/images/default-avatar.png", value: "lisa-wilson" },
    ],
    answeredAt: new Date("2024-01-08"),
    answeredDescription: "Praise God! The team returned safely and shared many testimonies of God's goodness. Over 50 people accepted Christ!",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-08"),
  }
];

const PrayersPage = () => {
  const [prayers, setPrayers] = useState<PrayerRequest[]>(mockPrayers);
  const [filteredPrayers, setFilteredPrayers] = useState<PrayerRequest[]>(mockPrayers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isLoading] = useState(false);

  useEffect(() => {
    filterPrayers();
  }, [searchTerm, selectedCategory, selectedStatus, prayers]);

  const filterPrayers = () => {
    let filtered = prayers;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(prayer =>
        prayer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prayer.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(prayer => prayer.category === selectedCategory);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(prayer => prayer.status === selectedStatus);
    }

    setFilteredPrayers(filtered);
  };

  const handlePray = async (prayerId: string) => {
    try {
      // Mock adding user to prayer list
      const updatedPrayers = prayers.map(prayer => {
        if (prayer._id === prayerId) {
          const isAlreadyPraying = prayer.prayedBy.some(user => user._id === "current-user");
          if (!isAlreadyPraying) {
            return {
              ...prayer,
              prayedBy: [...prayer.prayedBy, {
                _id: "current-user",
                name: "Current User",
                image: "/images/default-avatar.png",
                value: "current-user"
              }]
            };
          }
        }
        return prayer;
      });
      
      setPrayers(updatedPrayers);
      toast.success("Thank you for praying! 🙏");
    } catch {
      toast.error("Failed to record prayer. Please try again.");
    }
  };

  const handleMarkAnswered = async (prayerId: string, description: string) => {
    try {
      const updatedPrayers = prayers.map(prayer => {
        if (prayer._id === prayerId) {
          return {
            ...prayer,
            status: "answered" as const,
            answeredAt: new Date(),
            answeredDescription: description,
            updatedAt: new Date()
          };
        }
        return prayer;
      });
      
      setPrayers(updatedPrayers);
      toast.success("Prayer marked as answered! Praise God! 🎉");
    } catch {
      toast.error("Failed to update prayer status. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Prayer Requests</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Share your prayer needs and pray for others in our community
          </p>
        </div>
        
        <Button asChild className="dark:bg-amber-500 dark:hover:bg-amber-600">
          <Link href={ROUTES.SUBMIT_PRAYER}>
            <Plus className="h-4 w-4 mr-2" />
            Submit Prayer Request
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search prayer requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map(status => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Prayer Cards */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading prayers...</p>
          </div>
        ) : filteredPrayers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No prayer requests found.</p>
            <Button asChild className="mt-4" variant="outline">
              <Link href={ROUTES.SUBMIT_PRAYER}>
                Submit the first prayer request
              </Link>
            </Button>
          </div>
        ) : (
          filteredPrayers.map(prayer => (
            <PrayerCard
              key={prayer._id}
              prayer={prayer}
              onPray={handlePray}
              onMarkAnswered={handleMarkAnswered}
            />
          ))
        )}
      </div>

      {/* Load More Button */}
      {filteredPrayers.length > 0 && (
        <div className="text-center">
          <Button variant="outline">
            Load More Prayers
          </Button>
        </div>
      )}
    </div>
  );
};

export default PrayersPage;