import { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '~/assets/logo.png';
import Button from '~/components/Button';
import Container from '~/components/Container';
import Input from '~/components/Input';
import RHFFormProvider from '~/components/RHF/RHFFormProvider';
import { searchStore } from '~/zustand/searchStore';

type TForm = Record<'keyword', string>;

export default function Header() {
  const search = searchStore();
  const handleOnChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    search.setKeyword(event.target.value);
  };
  const methods = useForm<TForm>();
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/');
  };

  return (
    <header className="font-roboto shadow-md fixed top-0 w-full z-20 bg-white">
      <Container>
        <RHFFormProvider methods={methods} onSubmit={handleSubmit}>
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
                value={search.keyword}
                rightIcon={
                  search.keyword ? (
                    <i
                      className="bx bx-x text-xl cursor-pointer"
                      onClick={() => search.setKeyword('')}
                    />
                  ) : (
                    <i className="bx bx-search text-xl" />
                  )
                }
              />
              <Button type="submit" className="flex-none h-10">
                Tìm kiếm
              </Button>
            </div>
          </div>
        </RHFFormProvider>
      </Container>
    </header>
  );
}
