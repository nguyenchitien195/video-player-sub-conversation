import { useQuery } from '@tanstack/react-query';
import { useRef, useState, useEffect, MouseEvent } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import Container from '~/components/Container';
import { getVideoById } from '~/services/video';
import { HighlightSentence } from '~/services/video/type';
import { formatDuration } from '~/utils/format';
import { searchStore } from '~/zustand/searchStore';
import Popup from 'reactjs-popup';
import clsx from 'clsx';
import scrollIntoView from 'scroll-into-view-if-needed';
import ProgressBar from './ProgressBar';

interface TypeSub {
  index: number;
  time: number;
  text: string;
}

const defaultSub: TypeSub = {
  index: -1,
  time: 0,
  text: '',
};

const appearTime = 5;

let isEventFullscreenChange = false;

const AUTO_PLAY = true;

export default function Video() {
  const videoRef = useRef<ReactPlayer>(null);
  const conversationRef = useRef<HTMLDivElement>(null);
  const { id = '1' } = useParams();
  const [sub, setSub] = useState<TypeSub>(defaultSub);
  const [playing, setPlaying] = useState(AUTO_PLAY);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [playedPercentage, setPlayedPercentage] = useState(0);
  const [duration, setDuration] = useState(0);
  const { data: video } = useQuery(
    [`video-${id}`, id],
    () => getVideoById(parseInt(id)),
    {
      enabled: !!id,
    }
  );
  const conversationSorting =
    video?.conversations.sort((a, b) => a.time - b.time) || [];
  const search = searchStore();
  const [fullscreen, setFullscreen] = useState(false);
  const overlayClickRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    search.setTag('All');
  }, []);

  const handleSub = (currentSecond: number) => {
    const newConversations = Array.from(conversationSorting).reverse();
    const subFindIndex = newConversations.findIndex(
      c => currentSecond >= c.time
    );
    const subFind = newConversations[subFindIndex];
    // console.log({
    //   currentSecond,
    //   subFind,
    //   sub,
    // });
    if (subFind && currentSecond < subFind.time + appearTime) {
      const text = subFind.text;
      if (typeof text === 'string') {
        if (sub.index !== subFindIndex) {
          setSub({
            index: subFindIndex,
            time: subFind.time,
            text,
          });
          if (conversationRef.current) {
            const conversationItem = conversationRef.current.childNodes[
              conversationSorting.length - subFindIndex - 1
            ] as HTMLElement;
            scrollIntoView(conversationItem, {
              behavior: 'smooth',
              // scrollMode: 'if-needed',
              block: 'center',
              boundary: conversationRef.current,
            });
          }
        }
      } else {
        const subText = text.map(t => {
          if (typeof t === 'string') {
            return t;
          }
          return t.value;
        });
        if (sub.index !== subFindIndex) {
          setSub({
            index: subFindIndex,
            time: subFind.time,
            text: subText.join(' '),
          });
          if (conversationRef.current) {
            const conversationItem = conversationRef.current.childNodes[
              conversationSorting.length - subFindIndex - 1
            ] as HTMLElement;
            scrollIntoView(conversationItem, {
              behavior: 'smooth',
              // scrollMode: 'if-needed',
              block: 'center',
              boundary: conversationRef.current,
            });
          }
        }
      }
    } else if (currentSecond > sub.time + appearTime && sub.text) {
      setSub({
        ...sub,
        text: '',
      });
    }
  };

  const handleOnProgress = (state: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => {
    console.log('----- on progress');
    setPlayedPercentage(state.played * 100);
    const current = Math.floor(state.playedSeconds);
    setPlayedSeconds(current);
    handleSub(current);
  };

  const renderConversationItem = (text: string | HighlightSentence[]) => {
    if (typeof text === 'string') {
      return text;
    }
    return (
      <>
        {text.map((t, i) => {
          if (typeof t === 'string') {
            return <span key={i}>{t}</span>;
          }
          return (
            <Popup
              key={i}
              on="hover"
              position={'top left'}
              trigger={<span className="text-yellow-500">{t.value}</span>}
            >
              <span className="bg-white shadow-md p-2">{t.description}</span>
            </Popup>
          );
        })}
      </>
    );
  };

  const playVideoAtTime = (second: number) => () => {
    if (videoRef.current) {
      // console.log('videoRef.current', videoRef.current);
      // videoRef.current.setState({played: 0.5})
      handleSub(second);
      videoRef.current.seekTo(second, 'seconds');
    }
  };

  const handleFullscreenChanged = () => {
    const fullscreenElement = document.fullscreenElement;
    if (fullscreenElement) {
      screen.orientation.lock('landscape');
    } else {
      screen.orientation.unlock();
    }
    setFullscreen(!!fullscreenElement);
  };

  useEffect(() => {
    if (isEventFullscreenChange === false) {
      isEventFullscreenChange = true;
      addEventListener('fullscreenchange', handleFullscreenChanged);
    }
  }, [document]);

  const handleFullScreen = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const documentElement = document.documentElement;
    const fullscreenElement = document.fullscreenElement;
    if (fullscreenElement) {
      document.exitFullscreen();
      // screen.orientation.lock('landscape');
    } else {
      documentElement.requestFullscreen();
      // screen.orientation.lock('landscape');
      // window.screen.orientation.lock('landscape-primary');
      // window.screen.orientation.lock('landscape-secondary');
      // .catch(err => alert('This device not support landscape'));
    }
  };

  const handlePlaying = (event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    setPlaying(old => !old);
  };

  const handleClickOverlay = (event: MouseEvent<HTMLDivElement>) => {
    switch (event.detail) {
      case 1: {
        overlayClickRef.current = setTimeout(() => {
          setPlaying(old => !old);
        }, 250);
        break;
      }
      case 2: {
        clearTimeout(overlayClickRef.current);
        const fullscreenElement = document.fullscreenElement;
        if (fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
        break;
      }
    }
  };

  const handleSeekVideo = (pointSeconds: number) => {
    if (videoRef.current) {
      if (duration) {
        setPlayedPercentage((pointSeconds * 100) / duration);
      }
      videoRef.current.seekTo(pointSeconds);
    }
  };

  return (
    <Container className="py-8">
      <div
        className={clsx('group cursor-pointer', {
          'fixed top-0 left-0 w-full h-full z-50 bg-black grid place-items-center':
            fullscreen,
        })}
        onClick={handleClickOverlay}
      >
        <div className={clsx('aspect-video relative w-full')}>
          <ReactPlayer
            ref={videoRef}
            url={video?.mediaUrl}
            width="100%"
            height="100%"
            // light={true}
            onReady={(player: ReactPlayer) => {
              setDuration(player.getDuration());
              console.log('on ready', player.getDuration());
              if (AUTO_PLAY) {
                setPlaying(() => true);
              }
            }}
            onProgress={handleOnProgress}
            onBuffer={() => console.log('on buffer')}
            onError={error => console.log('on error', error)}
            onEnded={() => setPlaying(false)}
            stopOnUnmount
            onPause={() => {
              console.log('on pause');
              setPlaying(() => false);
            }}
            onPlay={() => {
              setPlaying(() => true);
            }}
            onStart={() => console.log('on start')}
            onDuration={duration => console.log('duration - ', duration)}
            onSeek={second => console.log('on seek', second)}
            playing={playing}
            // controls
            // muted
            config={{
              file: {
                attributes: {
                  controlsList: 'nofullscreen',
                },
              },
              youtube: {
                playerVars: {
                  autoplay: AUTO_PLAY ? 1 : 0,
                  rel: 0,
                  playsinline: 1,
                  controls: 0,
                  showinfo: 0,
                  ecver: 2,
                  iv_load_policy: 3,
                  modestbranding: 1,
                  origin: '',
                },
                embedOptions: {},
                onUnstarted: () => {
                  console.log('auto play fail');
                  if (videoRef.current) {
                    // setPlaying(true);
                    // videoRef.current.seekTo(0);
                  }
                },
              },
            }}
          />
          {/* Overlay */}
          <div className="w-full h-full absolute top-0 left-0 cursor-pointer"></div>
          <div
            className={clsx(
              'bottom-0 w-full',
              { fixed: fullscreen },
              { absolute: !fullscreen }
            )}
          >
            {!!sub.text && (
              <div className="w-full grid place-items-center">
                <p className="bg-gray-500/50 rounded-[4px] text-white mb-4 px-4 py-1 mx-auto z-10">
                  {sub.text}
                </p>
              </div>
            )}
            <div
              className={clsx(
                'h-12 hidden relative group-hover:block w-full transition-all bg-black/70',
                { '!block': playing === false }
              )}
            >
              <ProgressBar
                playedPercentage={playedPercentage}
                duration={duration}
                handleSeekVideo={handleSeekVideo}
              />
              <div className="flex justify-between cursor-auto select-none items-center w-full h-full text-white">
                <div className="flex h-full items-center">
                  <div
                    className="text-2xl h-full px-2 cursor-pointer flex items-center"
                    onClick={handlePlaying}
                  >
                    {playing ? (
                      <i className="bx bx-pause"></i>
                    ) : (
                      <i className="bx bx-play"></i>
                    )}
                  </div>
                  <p className="text-sm">
                    {`${formatDuration(playedSeconds)} / ${formatDuration(
                      duration
                    )}`}
                  </p>
                </div>
                <div className="h-full flex items-center px-2" onClick={handleFullScreen}>
                  {fullscreen ? (
                    <i className="bx bx-exit-fullscreen text-2xl cursor-pointer"></i>
                  ) : (
                    <i className="bx bx-fullscreen text-2xl cursor-pointer"></i>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-2xl py-4">{video?.title}</p>

      <div
        id="conversation"
        ref={conversationRef}
        className="max-h-96 flex flex-col gap-2 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-gray-400 px-2 py-3 bg-gray-200"
      >
        {conversationSorting.map((c, i) => (
          <div
            key={i}
            className={clsx(
              'flex gap-4 cursor-pointer betterhover:hover:text-blue-500 select-none',
              {
                'text-blue-500':
                  i === conversationSorting.length - sub.index - 1,
              }
            )}
            onClick={playVideoAtTime(c.time)}
          >
            <p>{formatDuration(c.time)}</p>
            <div className="">
              <p className="font-semibold">{c.speaker}:</p>
              <p>{renderConversationItem(c.text)}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
