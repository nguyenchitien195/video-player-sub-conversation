// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
import Container from '~/components/Container';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
// import Pagination from '~/components/Pagination';
import { useQuery } from '@tanstack/react-query';
import { getTags } from '~/services/tag';
import { getVideos } from '~/services/video';
import { searchStore } from '~/zustand/searchStore';

export default function Home() {
  const { data: listTagRes } = useQuery(['tags'], () => getTags());
  const search = searchStore();
  const { data: listVideoRes } = useQuery(
    ['videos', search.tag, search.keyword],
    () =>
      getVideos({
        filter: { tag: search.tag, keyword: search.keyword },
      })
  );
  const tags = listTagRes?.data || [];
  const videos = listVideoRes?.data || [];

  console.log('--- search', search);

  return (
    <Container>
      <div className="flex flex-wrap gap-4 py-6 sticky top-0">
        {['All', ...tags].map(tag => {
          return (
            <div
              key={tag}
              className={clsx('rounded-md border px-4 py-1 cursor-pointer', {
                'bg-[#008FD5] text-white cursor-default': tag === search.tag,
              })}
              onClick={() => search.setTag(tag)}
            >
              {tag}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 mb-8">
        {videos.map(video => (
          <Link to={`videos/${video.id}`} key={video.id}>
            <div className="border">
              <img src={video.thumbUrl} />
              <div className="px-2 py-3">
                <p
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                  className="whitespace-normal text-ellipsis h-12 w-full overflow-hidden"
                >
                  {video.title}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* <div className="grid place-items-center mb-6">
        <Pagination
          currentPage={0}
          pageSize={10}
          total={50}
          setCurrentPage={() => {
            console.log('set current page');
          }}
        />
      </div> */}
    </Container>
  );
}
