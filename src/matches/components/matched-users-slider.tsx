"use client";

import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { MatchedUserCard } from "./matched-user-card";

interface MatchedUser {
  userId: number;
  tags: string[];
  nickname: string;
  age?: number;
  gender?: "MALE" | "FEMALE" | "OTHER";
  introduction?: string;
  profileImageUrl?: string;
  openChatUrl?: string;
}

interface MatchedUsersSliderProps {
  users: MatchedUser[];
}

export function MatchedUsersSlider({ users }: MatchedUsersSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left" && currentIndex < users.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    } else if (direction === "right" && currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (users.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-lg text-gray-500">매칭된 사용자가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ x: direction > 0 ? 1000 : -1000 }}
          animate={{ x: 0 }}
          exit={{ x: direction > 0 ? -1000 : 1000 }}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          dragMomentum
          onDragEnd={(
            _: MouseEvent | TouchEvent | PointerEvent,
            info: PanInfo
          ) => {
            const threshold = 50;
            const velocity = info.velocity.x;

            if (info.offset.x > threshold || velocity > 500) {
              handleSwipe("right");
            } else if (info.offset.x < -threshold || velocity < -500) {
              handleSwipe("left");
            }
          }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <div
            className="h-full w-full"
            onMouseDown={(e) => e.preventDefault()}
          >
            <MatchedUserCard {...users[currentIndex]} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
