import clsx from 'clsx';
import RcPagination from 'rc-pagination';

export interface PaginationProps {
  pageSize: number;
  total: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const renderPaginationItem = (
  page: number,
  type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
  currentPage: number,
  isEnablePrev: boolean,
  isEnableNext: boolean
) => {
  switch (type) {
    case 'page':
      return (
        <p
          className={clsx(
            'w-10 h-10 grid place-items-center',
            {
              'bg-[#F0C170] cursor-default': page === currentPage,
            },
            {
              'bg-white cursor-pointer': page !== currentPage,
            }
          )}
          aria-current="page"
        >
          {page}
        </p>
      );
    case 'prev':
      return (
        <button
          type="button"
          className={clsx(
            'w-10 h-10 grid place-items-center',
            {
              'bg-gray-200': !isEnablePrev,
            },
            {
              'bg-white cursor-pointer': isEnablePrev,
            }
          )}
        >
          <p className="pl-[2px]">
            <i className="bx bx-chevron-left text-xl" />
          </p>
        </button>
      );
    case 'next':
      return (
        <button
          type="button"
          className={clsx(
            'w-10 h-10 grid place-items-center',
            {
              'bg-gray-200': !isEnableNext,
            },
            {
              'bg-white cursor-pointer': isEnableNext,
            }
          )}
        >
          <p className="pr-[2px]">
            <i className="bx bx-chevron-right text-xl" />
          </p>
        </button>
      );
    case 'jump-prev':
    case 'jump-next':
      return (
        <p className="cursor-pointer text-gray-500 hover:text-gray-700  px-4 inline-flex items-center text-sm font-medium">
          ...
        </p>
      );
    default:
      return null;
  }
};

export default function Pagination(props: PaginationProps) {
  const { pageSize, total, currentPage, setCurrentPage } = props;

  const isEnablePrev = currentPage > 1;
  const isEnableNext = total / pageSize > currentPage;

  return (
    <RcPagination
      className="flex items-center font-roboto gap-[2px]"
      current={currentPage}
      onChange={page => {
        setCurrentPage(page);
      }}
      pageSize={pageSize}
      total={total}
      showTitle={false}
      itemRender={(page, type) =>
        renderPaginationItem(
          page,
          type,
          currentPage,
          isEnablePrev,
          isEnableNext
        )
      }
    />
  );
}
