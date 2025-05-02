import { Badge } from "@/src/base/components/badge";

interface MatchedUserCardProps {
  userId: number;
  tags: string[];
  nickname: string;
  age?: number;
  gender?: "MALE" | "FEMALE" | "OTHER";
  introduction?: string;
  profileImageUrl?: string;
  openChatUrl?: string;
}

export function MatchedUserCard({
  tags,
  nickname,
  age,
  gender,
  introduction,
  profileImageUrl,
  openChatUrl,
}: MatchedUserCardProps) {
  return (
    <div className="relative h-screen w-full">
      {/* Profile Image */}
      <div className="absolute inset-0">
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt={`${nickname}'s profile`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gray-200" />
        )}
      </div>

      {/* User Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <div className="space-y-4 text-white">
          {/* Basic Info */}
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">{nickname}</h2>
            {(age || gender) && (
              <p className="text-sm text-gray-300">
                {age && `${age}세`}
                {age && gender && " • "}
                {gender &&
                  (gender === "MALE"
                    ? "남성"
                    : gender === "FEMALE"
                    ? "여성"
                    : "기타")}
              </p>
            )}
          </div>

          {/* Introduction */}
          {introduction && (
            <p className="text-sm leading-relaxed">{introduction}</p>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-white/10 text-white hover:bg-white/20"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Open Chat URL */}
          {openChatUrl && (
            <a
              href={openChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20"
            >
              오픈채팅 바로가기
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
