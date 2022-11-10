import { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import Logo from '~/assets/logo.png';
import Button from '~/components/Button';
import Container from '~/components/Container';
import Input from '~/components/Input';
import { searchStore } from '~/zustand/searchStore';

export default function Header() {
  const handleOnChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    search.setKeyword(event.target.value);
  };

  const search = searchStore();

  return (
    <header className="font-roboto shadow-md fixed top-0 w-full z-20 bg-white">
      <Container>
        <div className="flex flex-col sm:flex-row flex-wrap justify-between py-4 gap-x-14 gap-y-4">
          <Link to="/">
            <img className="h-16" src={Logo} alt="logo" />
          </Link>
          <div className="flex flex-1 gap-4 items-center">
            <Input
              onChange={handleOnChangeSearch}
              className="pr-[105px] border"
              customClassName={{ wrap: 'flex-1' }}
              placeholder="Tìm kiếm video"
              rightIcon={<i className="bx bx-search text-xl" />}
            />
            <Button className="flex-none h-10">Tìm kiếm</Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
