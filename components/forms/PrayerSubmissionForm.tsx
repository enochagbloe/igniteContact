"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";

const prayerSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description must be less than 1000 characters"),
  category: z.enum(['healing', 'guidance', 'protection', 'provision', 'salvation', 'family', 'work', 'ministry', 'other']),
  isAnonymous: z.boolean(),
  isPrivate: z.boolean(),
});

type PrayerFormData = z.infer<typeof prayerSchema>;

interface PrayerSubmissionFormProps {
  onSuccess?: (prayer: PrayerRequest) => void;
  onCancel?: () => void;
}

const categories = [
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

const PrayerSubmissionForm = ({ onSuccess, onCancel }: PrayerSubmissionFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<PrayerFormData>({
    resolver: zodResolver(prayerSchema),
    defaultValues: {
      isAnonymous: false,
      isPrivate: false,
      category: 'other'
    }
  });

  const watchedCategory = watch('category');
  const watchedIsAnonymous = watch('isAnonymous');
  const watchedIsPrivate = watch('isPrivate');

  const onSubmit = async (data: PrayerFormData) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, get the author from session/auth
      const mockAuthor = "507f1f77bcf86cd799439011"; // Mock author ID
      
      const response = await fetch('/api/prayers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          author: mockAuthor
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit prayer request');
      }
      
      const prayer = await response.json();
      
      toast.success('Prayer request submitted successfully! 🙏');
      reset();
      onSuccess?.(prayer);
      
    } catch (error) {
      console.error('Error submitting prayer:', error);
      toast.error('Failed to submit prayer request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Submit a Prayer Request
        </CardTitle>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Share your prayer need with our community
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Prayer Request Title *</Label>
            <Input
              id="title"
              placeholder="Brief title for your prayer request..."
              {...register('title')}
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select 
              value={watchedCategory} 
              onValueChange={(value) => setValue('category', value as PrayerFormData['category'])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Prayer Request Details *</Label>
            <Textarea
              id="description"
              placeholder="Please share the details of your prayer request..."
              rows={6}
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isAnonymous"
                checked={watchedIsAnonymous}
                onCheckedChange={(checked) => setValue('isAnonymous', checked as boolean)}
              />
              <Label htmlFor="isAnonymous">
                Submit anonymously (your name won&apos;t be shown)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPrivate"
                checked={watchedIsPrivate}
                onCheckedChange={(checked) => setValue('isPrivate', checked as boolean)}
              />
              <Label htmlFor="isPrivate">
                Keep this prayer private (only visible to prayer team)
              </Label>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Prayer Request 🙏'}
            </Button>
            
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PrayerSubmissionForm;