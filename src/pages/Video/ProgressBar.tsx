import { MouseEvent, useState } from 'react';
import { formatDuration } from '~/utils/format';

interface ProgressBarProps {
  duration: number; // seconds
  playedPercentage: number;
  handleSeekVideo: (pointSeconds: number) => void;
}

export default function ProgressBar(props: ProgressBarProps) {
  const { playedPercentage, duration, handleSeekVideo } = props;
  const [point, setPoint] = useState(0);

  const getPointTime = (event: MouseEvent<HTMLDivElement>) => {
    if (duration) {
      const targetElementWidth = event.currentTarget.offsetWidth;
      const mouseOffsetX = event.nativeEvent.offsetX;
      const percentage = (mouseOffsetX * 100) / targetElementWidth;
      const newPointTime = (percentage * duration) / 100;
      return newPointTime;
    }
    return 0;
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    setPoint(getPointTime(event));
  };

  const handleMouseLeave = () => {
    setPoint(0);
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const newPointTime = getPointTime(event);
    setPoint(newPointTime);
    handleSeekVideo(newPointTime);
  };

  return (
    <div
      className="absolute -top-7 left-0 z-10 w-full h-10 pt-6"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {point !== 0 && (
        <div
          className="absolute top-0 text-sm text-white px-2"
          style={{ textShadow: '1px 1px 2px black' }}
        >
          {formatDuration(point)}
        </div>
      )}
      <div className="bg-gray-200 w-full h-1">
        <div
          className="bg-blue-600 h-1 transition-all"
          style={{ width: `${playedPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}
