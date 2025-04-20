import { ProfileForm } from "./profile-form";
import { getCurrentUserProfile, updateUserProfile } from "@/src/user/apis";
import { cookies } from "next/headers";

export async function ProfileContainer() {
  const cookieStore = cookies();
  const accessToken = await cookieStore.get("accessToken")?.value;
  console.log("accessToken", accessToken);
  const profileData = await getCurrentUserProfile();

  const handleSave = async (data: {
    nickname: string;
    introduction: string;
  }) => {
    "use server";
    try {
      await updateUserProfile(data);
    } catch (error) {
      console.log(error);
    }
  };

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
