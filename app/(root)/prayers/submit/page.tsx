"use client";
import { useRouter } from "next/navigation";
import PrayerSubmissionForm from "@/components/forms/PrayerSubmissionForm";
import ROUTES from "@/constants/routes";

const SubmitPrayerPage = () => {
  const router = useRouter();

  const handleSuccess = () => {
    // Redirect to prayers page after successful submission
    router.push(ROUTES.PRAYERS);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <PrayerSubmissionForm 
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default SubmitPrayerPage;