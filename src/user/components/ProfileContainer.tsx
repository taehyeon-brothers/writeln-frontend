import { useEffect, useState } from "react";
import { ProfileForm } from "./ProfileForm";
import { getCurrentUserProfile, updateUserProfile } from "@/src/user/apis";
import type { UserResponse } from "@/src/user/apis/types";
import { toast } from "sonner";

export function ProfileContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<UserResponse | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const data = await getCurrentUserProfile();
      setProfileData(data);
    } catch (error) {
      toast.error("프로필을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (data: {
    nickname: string;
    introduction: string;
  }) => {
    try {
      setIsLoading(true);
      await updateUserProfile(data);
      toast.success("프로필이 저장되었습니다.");
    } catch (error) {
      toast.error("프로필 저장 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !profileData) {
    return <div>로딩 중...</div>;
  }

  return (
    <ProfileForm
      initialData={{
        nickname: profileData?.nickname || "",
        introduction: profileData?.introduction || "",
        profileImageUrl: profileData?.profileImageUrl || "",
      }}
      onSave={handleSave}
    />
  );
}
