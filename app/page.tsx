import Image from 'next/image';
import Hero from '@/components/Hero';
import CustomFilter from '@/components/CustomFilter';
import SearchBar from '@/components/SearchBar';
import { fetchCars } from '@/utils';
import CarCard from '@/components/CarCard';

export default async function Home() {
  const allCars = await fetchCars();

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  console.log(allCars);

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p className="">Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar />
        </div>
        <div className="home__filter-container">
          <CustomFilter title="fuel" />
          <CustomFilter title="year" />
        </div>
      </div>
      {!isDataEmpty ? (
        <section>
          <div className=" px-16 home__cars-wrapper">
            {allCars?.map((car) => (
              <CarCard car={car} />
            ))}
          </div>
        </section>
      ) : (
        <div className="home__error-container">
          <h1 className="text-black text-xl font-bold">Ops, no result</h1>
          {allCars?.message}
        </div>
      )}
    </main>
  );
}
