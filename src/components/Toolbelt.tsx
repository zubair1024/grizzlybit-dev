import toolBelt from 'data/toolbelt';
import Image from 'next/image';

const Toolbelt = () => {
  return (
    <div className="bg-fixed bg-toolBelt">
      <div className="pt-10 overflow-hidden text-white bg-black bg-opacity-50 shadow-lg toolBelt-content backdrop-filter backdrop-blur-lg">
        <h2 className="font-mono text-2xl tracking-wider text-center capitalize">
          My tool-belt
        </h2>
        <div className="grid content-center justify-center grid-cols-2 gap-4 p-16 md:grid-cols-4">
          {toolBelt.map((i) => {
            return (
              <div key={i.name} className="flex items-center justify-center">
                <Image
                  src={i.img}
                  height={100}
                  width={100}
                  alt={i.name}
                ></Image>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Toolbelt;
