"use client";

import {
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent
} from "react";

import { FadeUp } from "@/components/animations/fade-up";

interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
}

interface JourneyTimelineProps {
  milestones: JourneyMilestone[];
}

interface JourneyPoint {
  x: number;
  y: number;
  placement: "top" | "bottom";
}

const MILESTONE_SPACING = 240;
const CANVAS_PADDING = 130;

const CANVAS_HEIGHT = 600;
const CENTER_Y = 300;
const SINE_AMPLITUDE = 72;

const WAVE_LENGTH = MILESTONE_SPACING * 4;

const MIN_CANVAS_WIDTH = 1180;
const PATH_SAMPLE_DISTANCE = 10;

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="m5.25 10.25 3 3 6.5-7"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getSineY(x: number) {
  const relativeX = x - CANVAS_PADDING;

  const angle = (relativeX / WAVE_LENGTH) * Math.PI * 2 + Math.PI / 2;

  return CENTER_Y + SINE_AMPLITUDE * Math.sin(angle);
}

function createJourneyPoints(count: number): JourneyPoint[] {
  return Array.from({ length: count }, (_, index) => {
    const x = CANVAS_PADDING + index * MILESTONE_SPACING;

    return {
      x,
      y: getSineY(x),
      placement: index % 2 === 0 ? "bottom" : "top"
    };
  });
}

function createSinePath(startX: number, endX: number) {
  if (endX <= startX) {
    return `M ${startX} ${getSineY(startX)}`;
  }

  let path = `M ${startX} ${getSineY(startX)}`;

  for (let x = startX + PATH_SAMPLE_DISTANCE; x < endX; x += PATH_SAMPLE_DISTANCE) {
    path += ` L ${x} ${getSineY(x)}`;
  }

  path += ` L ${endX} ${getSineY(endX)}`;

  return path;
}

function getEndpointLabel(index: number, total: number) {
  if (index === 0) {
    return "Start";
  }

  if (index === total - 1) {
    return "Latest";
  }

  return null;
}

function MobileJourney({ milestones }: { milestones: JourneyMilestone[] }) {
  return (
    <ol className="relative ml-5 space-y-10 border-l border-foreground/10 pl-9 md:hidden">
      {milestones.map((milestone, index) => {
        const isLatest = index === milestones.length - 1;

        const endpointLabel = getEndpointLabel(index, milestones.length);

        return (
          <li
            key={`${milestone.year}-${milestone.title}`}
            className="relative"
            aria-current={isLatest ? "step" : undefined}
          >
            {/* Marker */}
            <div
              className={`
                absolute -left-[3.8rem] top-0 z-10
                flex h-11 w-11 items-center justify-center
                rounded-full
                border-[5px] border-background
                text-white
                shadow-md
                ${isLatest ? "bg-primary shadow-primary/20" : "bg-foreground shadow-black/10"}
              `}
              aria-hidden="true"
            >
              <CheckIcon />
            </div>

            <FadeUp delay={index * 0.06}>
              <article
                className="
                  rounded-xl
                  border border-border
                  bg-card
                  p-5
                  shadow-[0_8px_30px_rgba(0,0,0,0.035)]
                "
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`
                      font-mono
                      text-[0.65rem]
                      font-medium
                      uppercase
                      tracking-[0.14em]
                      ${isLatest ? "text-primary" : "text-muted-foreground"}
                    `}
                  >
                    {milestone.year}
                  </span>

                  {endpointLabel && (
                    <>
                      <span
                        className={`
                          h-1 w-1 rounded-full
                          ${isLatest ? "bg-accent" : "bg-foreground/20"}
                        `}
                        aria-hidden="true"
                      />

                      <span
                        className={`
                          font-mono
                          text-[0.6rem]
                          uppercase
                          tracking-[0.14em]
                          ${isLatest ? "text-primary" : "text-muted-foreground"}
                        `}
                      >
                        {endpointLabel}
                      </span>
                    </>
                  )}
                </div>

                <h3 className="mt-3 font-heading text-lg font-semibold tracking-tight text-foreground">
                  {milestone.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{milestone.description}</p>
              </article>
            </FadeUp>
          </li>
        );
      })}
    </ol>
  );
}

function DesktopJourney({ milestones }: { milestones: JourneyMilestone[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const dragState = useRef({
    pointerId: -1,
    startX: 0,
    scrollLeft: 0
  });

  const [isDragging, setIsDragging] = useState(false);

  const points = createJourneyPoints(milestones.length);

  const requiredWidth = CANVAS_PADDING * 2 + Math.max(0, milestones.length - 1) * MILESTONE_SPACING;

  const canvasWidth = Math.max(MIN_CANVAS_WIDTH, requiredWidth);

  const firstX = points[0]?.x ?? CANVAS_PADDING;

  const lastX = points[points.length - 1]?.x ?? CANVAS_PADDING;

  const journeyPath = createSinePath(firstX, lastX);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || event.button !== 0) {
      return;
    }

    const container = scrollRef.current;

    if (!container) {
      return;
    }

    dragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: container.scrollLeft
    };

    container.setPointerCapture(event.pointerId);

    setIsDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging || event.pointerId !== dragState.current.pointerId) {
      return;
    }

    const container = scrollRef.current;

    if (!container) {
      return;
    }

    const distance = event.clientX - dragState.current.startX;

    container.scrollLeft = dragState.current.scrollLeft - distance;
  };

  const stopDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerId !== dragState.current.pointerId) {
      return;
    }

    const container = scrollRef.current;

    if (container?.hasPointerCapture(event.pointerId)) {
      container.releasePointerCapture(event.pointerId);
    }

    dragState.current.pointerId = -1;

    setIsDragging(false);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();

        container.scrollBy({
          left: MILESTONE_SPACING,
          behavior: "smooth"
        });
        break;

      case "ArrowLeft":
        event.preventDefault();

        container.scrollBy({
          left: -MILESTONE_SPACING,
          behavior: "smooth"
        });
        break;

      case "Home":
        event.preventDefault();

        container.scrollTo({
          left: 0,
          behavior: "smooth"
        });
        break;

      case "End":
        event.preventDefault();

        container.scrollTo({
          left: container.scrollWidth,
          behavior: "smooth"
        });
        break;
    }
  };

  return (
    <div className="relative hidden md:block">
      {/* Draggable viewport */}
      <div
        ref={scrollRef}
        className={`
          journey-drag-scroll
          w-full
          overflow-x-auto
          overflow-y-hidden
          overscroll-x-contain
          pb-4
          outline-none
          focus-visible:ring-2
          focus-visible:ring-ring/30
          ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"}
        `}
        tabIndex={0}
        role="region"
        aria-label="SLIIT FOSS journey timeline. Drag horizontally or use the arrow keys to explore."
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onKeyDown={handleKeyDown}
      >
        <ol
          className="relative"
          style={{
            width: `${canvasWidth}px`,
            height: `${CANVAS_HEIGHT}px`
          }}
        >
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox={`0 0 ${canvasWidth} ${CANVAS_HEIGHT}`}
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            {/* Soft neutral shadow */}
            <path
              d={journeyPath}
              stroke="var(--foreground)"
              strokeOpacity="0.04"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(5 7)"
            />

            {/* Main sine curve */}
            <path
              d={journeyPath}
              stroke="var(--foreground)"
              strokeOpacity="0.2"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {milestones.map((milestone, index) => {
            const point = points[index];

            const isLatest = index === milestones.length - 1;

            const endpointLabel = getEndpointLabel(index, milestones.length);

            return (
              <li
                key={`${milestone.year}-${milestone.title}`}
                className="absolute"
                style={{
                  left: `${point.x}px`,
                  top: `${point.y}px`
                }}
                aria-current={isLatest ? "step" : undefined}
              >
                {/* Connector */}
                <div
                  className={`
                    absolute left-1/2
                    w-px -translate-x-1/2
                    bg-foreground/10
                    ${point.placement === "top" ? "bottom-7 h-11" : "top-7 h-11"}
                  `}
                  aria-hidden="true"
                />

                {/* Marker shadow */}
                <div
                  className={`
                    absolute left-1/2 top-1/2
                    h-12 w-12
                    -translate-x-[calc(50%-6px)]
                    -translate-y-[calc(50%-7px)]
                    rounded-full
                    ${isLatest ? "bg-primary/15" : "bg-foreground/[0.06]"}
                  `}
                  aria-hidden="true"
                />

                {/* Marker */}
                <div
                  className={`
                    absolute left-1/2 top-1/2 z-20
                    flex h-11 w-11
                    -translate-x-1/2 -translate-y-1/2
                    items-center justify-center
                    rounded-full
                    border-[5px] border-background
                    text-white
                    shadow-md
                    transition-colors duration-300
                    ${isLatest ? "bg-primary shadow-primary/20" : "bg-foreground shadow-black/10"}
                  `}
                  aria-hidden="true"
                >
                  <CheckIcon />
                </div>

                {/* Milestone content */}
                <div
                  className={`
                    absolute left-1/2
                    w-[210px]
                    -translate-x-1/2
                    ${point.placement === "top" ? "bottom-[4.75rem]" : "top-[4.75rem]"}
                  `}
                >
                  <FadeUp delay={index * 0.06}>
                    <article
                      className="
                        rounded-xl
                        border border-border
                        bg-card/95
                        p-4
                        text-center
                        shadow-[0_8px_30px_rgba(0,0,0,0.035)]
                        backdrop-blur-sm
                      "
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span
                          className={`
                            font-mono
                            text-[0.65rem]
                            font-medium
                            uppercase
                            tracking-[0.14em]
                            ${isLatest ? "text-primary" : "text-muted-foreground"}
                          `}
                        >
                          {milestone.year}
                        </span>

                        {endpointLabel && (
                          <>
                            <span
                              className={`
                                h-1 w-1 rounded-full
                                ${isLatest ? "bg-accent" : "bg-foreground/20"}
                              `}
                              aria-hidden="true"
                            />

                            <span
                              className={`
                                font-mono
                                text-[0.6rem]
                                uppercase
                                tracking-[0.14em]
                                ${isLatest ? "text-primary" : "text-muted-foreground"}
                              `}
                            >
                              {endpointLabel}
                            </span>
                          </>
                        )}
                      </div>

                      <h3 className="mt-2.5 font-heading text-base font-semibold tracking-tight text-foreground">
                        {milestone.title}
                      </h3>

                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{milestone.description}</p>
                    </article>
                  </FadeUp>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Left fade */}
      <div
        className="
          pointer-events-none
          absolute inset-y-0 left-0 z-30
          w-12
          bg-gradient-to-r
          from-background
          via-background/75
          to-transparent
          lg:w-20
        "
        aria-hidden="true"
      />

      {/* Right fade */}
      <div
        className="
          pointer-events-none
          absolute inset-y-0 right-0 z-30
          w-12
          bg-gradient-to-l
          from-background
          via-background/75
          to-transparent
          lg:w-20
        "
        aria-hidden="true"
      />
    </div>
  );
}

export function JourneyTimeline({ milestones }: JourneyTimelineProps) {
  if (milestones.length === 0) {
    return null;
  }

  return (
    <div className="mt-10">
      <MobileJourney milestones={milestones} />
      <DesktopJourney milestones={milestones} />
    </div>
  );
}
