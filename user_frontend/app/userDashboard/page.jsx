import {
  Heading,
  Card,
  BigCard,
  Darkbackground,
  AboutCard,
  CategorySwiper,
} from '@/features/dashboard/';

export default function Page() {
  return (
    <Darkbackground>
      <Heading title="Restauranter" className='pb-12' />
      <Heading title="Kategorier" className='text-xl' />
      <CategorySwiper />
      <Heading title="Favoritter" className='text-xl' />
      <BigCard />
      <Card />
      <AboutCard
        logoSrc="/resbook-logo-white.png"
        description="Reserver dit bord nemt & hurtigt."
        backgroundImageSrc="/res-image.jpg"
      />
    </Darkbackground>
  );
}