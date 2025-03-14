"use client";

import type { Meta, StoryObj } from "@storybook/react";
import FeedContent from "@/pages/feed/components/feed-content";
import { useEffect, useState } from "react";

// 컴포넌트 상태를 제어하기 위한 래퍼 컴포넌트
const MockedFeedContent = ({
  initialStatus,
}: {
  initialStatus: "loading" | "error" | "success" | "empty";
}) => {
  // 상태 변경을 추적하기 위한 상태
  const [stateApplied, setStateApplied] = useState(false);

  // 컴포넌트가 마운트된 후 상태 변경 시도
  useEffect(() => {
    // 이미 상태가 적용되었다면 다시 시도하지 않음
    if (stateApplied) return;

    // 상태 변경을 위한 함수
    const applyState = () => {
      const feedContentElement = document.querySelector(
        '[data-testid="feed-content"]'
      );

      if (!feedContentElement) {
        // 요소가 없으면 다시 시도
        setTimeout(applyState, 100);
        return;
      }

      // React 내부 속성에 접근하기 위한 여러 방법 시도
      let instance = null;
      let fiber = null;

      // React 18 이상에서 사용하는 속성들
      const fiberKeys = [
        "__reactFiber$",
        "__reactInternalInstance$",
        "__reactContainer$",
        "_reactInternalFiber",
        "_internalRoot",
        "_reactRootContainer",
      ];

      // 여러 키를 시도하여 fiber 찾기
      for (const key of fiberKeys) {
        if ((feedContentElement as any)[key]) {
          fiber = (feedContentElement as any)[key];
          break;
        }
      }

      if (!fiber) {
        console.warn(
          "React fiber를 찾을 수 없습니다. 상태 변경이 작동하지 않을 수 있습니다."
        );
        return;
      }

      // fiber에서 인스턴스 찾기
      instance = fiber;

      // 상태 설정 함수 찾기
      let setFeedState = null;

      // 1. 직접 props에서 찾기
      if (
        instance.memoizedProps &&
        instance.memoizedProps.setFeedStateForStory
      ) {
        setFeedState = instance.memoizedProps.setFeedStateForStory;
      }
      // 2. 자식 컴포넌트에서 찾기
      else if (instance.child) {
        let currentChild = instance.child;
        while (currentChild) {
          if (
            currentChild.memoizedProps &&
            currentChild.memoizedProps.setFeedStateForStory
          ) {
            setFeedState = currentChild.memoizedProps.setFeedStateForStory;
            break;
          }
          currentChild = currentChild.sibling;
        }
      }
      // 3. stateNode에서 찾기
      else if (
        instance.stateNode &&
        typeof instance.stateNode.setState === "function"
      ) {
        // 컴포넌트의 상태 직접 수정 시도
        const newState = {
          feedState: getStateForStatus(initialStatus),
        };
        instance.stateNode.setState(newState);
        setStateApplied(true);
        return;
      }

      if (!setFeedState) {
        // 대안: window를 통해 전역 이벤트 발생
        window.dispatchEvent(
          new CustomEvent("FEED_STATE_CHANGE", {
            detail: { status: initialStatus },
          })
        );

        // 콘솔에 디버깅 정보 출력
        console.warn(
          "상태 설정 함수를 찾을 수 없습니다. FeedContent 컴포넌트에 setFeedStateForStory prop이 있는지 확인하세요.",
          '또는 컴포넌트에 window.addEventListener("FEED_STATE_CHANGE", handler)를 추가하세요.'
        );

        // 마지막 대안: 컴포넌트를 다시 렌더링하여 초기 상태 설정
        setStateApplied(true);
        return;
      }

      // 상태 설정 함수를 찾았다면 상태 변경
      setFeedState(getStateForStatus(initialStatus));
      setStateApplied(true);
    };

    // 상태 변경 시도
    applyState();

    // 컴포넌트가 언마운트될 때 정리
    return () => {
      setStateApplied(false);
    };
  }, [initialStatus, stateApplied]);

  // 상태에 따른 데이터 생성
  const getStateForStatus = (
    status: "loading" | "error" | "success" | "empty"
  ) => {
    if (status === "loading") {
      return {
        status: "loading",
        error: null,
        posts: [],
      };
    } else if (status === "error") {
      return {
        status: "error",
        error: "네트워크 오류: 게시물을 불러오지 못했습니다.",
        posts: [],
      };
    } else if (status === "empty") {
      return {
        status: "success",
        error: null,
        posts: [],
      };
    } else {
      return {
        status: "success",
        error: null,
        posts: [
          {
            id: "1",
            user: {
              name: "Emma Boisson",
              avatar: "/placeholder.svg?height=40&width=40",
              initials: "EB",
            },
            timeAgo: "10분 전",
            imageUrl: "/placeholder.svg?height=400&width=600",
            locked: true,
          },
          {
            id: "2",
            user: {
              name: "Amanda",
              avatar: "/placeholder.svg?height=40&width=40",
              initials: "A",
            },
            timeAgo: "15분 전",
            imageUrl: "/placeholder.svg?height=400&width=600",
            locked: true,
          },
        ],
      };
    }
  };

  // 상태 변경을 위한 속성 추가
  const FeedContentWithProps = () => {
    // 컴포넌트에 필요한 props 추가
    return (
      <div className="feed-content-wrapper">
        <FeedContent
          // 스토리북 테스트를 위한 prop 추가
          setFeedStateForStory={(state: any) => {
            console.log("setFeedStateForStory called with", state);
          }}
          // 초기 상태 설정
          initialState={initialStatus}
          // 스토리북 모드 활성화
          isStorybook={true}
        />
      </div>
    );
  };

  return <FeedContentWithProps />;
};

// 대체 방법: 컴포넌트 자체를 다시 구현
const DirectStateControl = ({
  initialStatus,
}: {
  initialStatus: "loading" | "error" | "success" | "empty";
}) => {
  // 상태에 따라 다른 컴포넌트 렌더링
  switch (initialStatus) {
    case "loading":
      return (
        <div
          data-testid="feed-content"
          className="feed-content-mock loading-state"
        >
          <div className="p-4 bg-[#fef2f2]">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="mt-4 overflow-hidden rounded-3xl bg-white p-0 shadow-sm"
              >
                <div className="flex items-center gap-3 p-4">
                  <div className="h-10 w-10 rounded-full bg-[#d9d9d9] animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 rounded bg-[#d9d9d9] animate-pulse"></div>
                    <div className="h-3 w-16 rounded bg-[#d9d9d9] animate-pulse"></div>
                  </div>
                </div>
                <div className="aspect-[4/3] w-full rounded-none bg-[#d9d9d9] animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      );

    case "error":
      return (
        <div
          data-testid="feed-content"
          className="feed-content-mock error-state"
        >
          <div className="p-4 bg-[#fef2f2]">
            <div className="mt-6">
              <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-6 text-center shadow-sm">
                <div className="mb-4 rounded-full bg-[#fef2f2] p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-[#ac243b]"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" x2="12" y1="8" y2="12" />
                    <line x1="12" x2="12.01" y1="16" y2="16" />
                  </svg>
                </div>
                <h2 className="mb-2 text-lg font-medium text-[#450c18]">
                  콘텐츠를 사용할 수 없음
                </h2>
                <p className="mb-4 text-[#888888]">
                  현재 피드를 불러오는 데 문제가 발생했습니다.
                </p>
                <button className="inline-flex h-10 items-center justify-center rounded-md bg-[#cc3249] px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-[#ac243b]">
                  피드 새로고침
                </button>
              </div>
            </div>
          </div>
        </div>
      );

    case "empty":
      return (
        <div
          data-testid="feed-content"
          className="feed-content-mock empty-state"
        >
          <div className="p-4 bg-[#fef2f2]">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 rounded-full bg-[#fef2f2] p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-[#cc3249]"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
              <h2 className="mb-2 text-xl font-semibold text-[#450c18]">
                아직 게시물이 없습니다
              </h2>
              <p className="mb-6 text-[#888888]">
                사진을 업로드하거나 다른 사용자를 팔로우하여 게시물을 확인하세요
              </p>
              <button className="inline-flex h-10 items-center justify-center rounded-md bg-[#cc3249] px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-[#ac243b]">
                사진 업로드하기
              </button>
            </div>
          </div>
        </div>
      );

    default: // success
      return (
        <div
          data-testid="feed-content"
          className="feed-content-mock success-state"
        >
          <div className="p-4 bg-[#fef2f2]">
            <ul className="space-y-4">
              {[
                {
                  id: "1",
                  user: {
                    name: "Emma Boisson",
                    avatar: "/placeholder.svg?height=40&width=40",
                    initials: "EB",
                  },
                  timeAgo: "10분 전",
                  imageUrl: "/placeholder.svg?height=400&width=600",
                },
                {
                  id: "2",
                  user: {
                    name: "Amanda",
                    avatar: "/placeholder.svg?height=40&width=40",
                    initials: "A",
                  },
                  timeAgo: "15분 전",
                  imageUrl: "/placeholder.svg?height=400&width=600",
                },
              ].map((post) => (
                <li key={post.id}>
                  <div className="overflow-hidden rounded-3xl bg-white p-0 shadow-sm">
                    <div className="flex items-center gap-3 p-4">
                      <div className="h-10 w-10 overflow-hidden rounded-full border border-[#d9d9d9]">
                        <img
                          src={post.user.avatar || "/placeholder.svg"}
                          alt={post.user.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="font-semibold text-[#450c18]">
                          {post.user.name}
                        </h2>
                        <p className="text-sm text-[#888888]">{post.timeAgo}</p>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="aspect-[4/3] w-full bg-gradient-to-br from-blue-200 to-purple-200 blur-sm">
                        <img
                          src={post.imageUrl || "/placeholder.svg"}
                          alt="게시물 내용"
                          className="h-full w-full object-cover opacity-0"
                        />
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 text-white">
                        <div className="mb-2 rounded-full bg-white/20 p-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                          >
                            <rect
                              width="18"
                              height="11"
                              x="3"
                              y="11"
                              rx="2"
                              ry="2"
                            />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        </div>
                        <p className="text-center text-lg font-medium">
                          사진을 업로드하고 확인해보세요.
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
  }
};

const meta = {
  title: "Feed/FeedContent",
  // 두 가지 방법 중 하나를 선택
  // 1. 기존 컴포넌트를 사용하는 방법
  // component: MockedFeedContent,
  // 2. 상태별 UI를 직접 구현하는 방법 (더 안정적)
  component: DirectStateControl,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    initialStatus: {
      control: { type: "radio" },
      options: ["loading", "error", "success", "empty"],
    },
  },
} satisfies Meta<typeof DirectStateControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 로딩_상태: Story = {
  args: {
    initialStatus: "loading",
  },
};

export const 에러_상태: Story = {
  args: {
    initialStatus: "error",
  },
};

export const 정상_상태: Story = {
  args: {
    initialStatus: "success",
  },
};

export const 빈_상태: Story = {
  args: {
    initialStatus: "empty",
  },
};
