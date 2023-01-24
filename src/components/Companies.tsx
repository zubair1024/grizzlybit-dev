import { companies } from 'data/companies';
import Image from 'next/image';
const Companies = () => {
  return (
    <div className="py-10 bg-gray-900">
      <h2 className="font-mono text-2xl tracking-wider text-center capitalize">
        Some entities I have had the pleasure of working with
      </h2>
      <div className="grid content-center justify-center grid-cols-2 gap-4 p-16 md:grid-cols-4">
        {companies.map((i) => {
          return (
            <div key={i.name} className="flex items-center justify-center">
              <Image src={i.img} height={200} width={200} alt={i.name}></Image>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Companies;
