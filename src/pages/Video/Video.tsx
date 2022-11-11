import { useQuery } from '@tanstack/react-query';
import { useRef, useState, useEffect } from 'react';
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

export default function Video() {
  const videoRef = useRef<ReactPlayer>(null);
  const conversationRef = useRef<HTMLDivElement>(null);
  const { id = '1' } = useParams();
  const [sub, setSub] = useState<TypeSub>(defaultSub);
  const [playing, setPlaying] = useState(false);
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
    const current = Math.floor(state.playedSeconds);
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

  return (
    <Container className="py-8">
      <div className="aspect-video relative">
        <ReactPlayer
          ref={videoRef}
          url={video?.mediaUrl}
          width="100%"
          height="100%"
          // light={true}
          onReady={() => {
            console.log('on ready');
            setPlaying(true);
          }}
          onProgress={handleOnProgress}
          onBuffer={() => console.log('on buffer')}
          onError={() => console.log('on error')}
          onEnded={() => console.log('on ended')}
          stopOnUnmount
          onPause={() => console.log('on pause')}
          onPlay={() => console.log('on play')}
          onStart={() => console.log('on start')}
          onDuration={duration => console.log('duration - ', duration)}
          onSeek={second => console.log('on seek', second)}
          playing={playing}
          // muted
          controls
          config={{
            file: {
              attributes: {
                controlList: 'nofullscreen',
              },
            },
            youtube: {
              playerVars: {
                autoplay: 1,
                playsinline: 1,
                controls: 1,
                disablekb: 1,
                modestbranding: 0,
                rel: 0,
              },
              onUnstarted: () => {
                console.log('auto play fail');
                if (videoRef.current) {
                  setPlaying(true);
                  // videoRef.current.seekTo(0);
                }
              },
            },
          }}
        />
        {!!sub.text && (
          <div className="w-full grid place-items-center">
            <p className="bg-gray-500 text-white absolute bottom-0 mb-12 px-4 py-1 mx-auto z-10">
              {sub.text}
            </p>
          </div>
        )}
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
