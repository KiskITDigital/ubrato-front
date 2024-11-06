import { FC, Fragment, useState } from 'react';
import style from './OneTenderOffers.module.css';
import { Category } from '@/components/OneTenderComponentsWrappedVIew/OneTenderInfoViewExecutor/OneTenderInfoViewExecutor';

type TenderOffers = {
  categories: Category[];
};

const Services: FC<{ category: Category }> = ({ category }) => {
  const [serviceCount, setServiceCount] = useState(3);

  return (
    <div className="flex flex-wrap w-full gap-2">
      {category.services.map(
        (service, serviceIndex) =>
          serviceIndex < serviceCount && (
            <Fragment key={'service-' + serviceIndex}>
              <p className="bg-slate-100 rounded-md px-3 py-1">{service}</p>
            </Fragment>
          )
      )}
      {category.services.length > serviceCount && serviceCount === 3 && (
        <div
          className="flex items-center pl-3 cursor-pointer"
          onClick={() => {
            setServiceCount(category.services.length);
          }}
        >
          <p>+{category.services.length - serviceCount}</p>
        </div>
      )}
    </div>
  );
};

export const OneTenderOffers: FC<TenderOffers> = ({ categories }) => {
  return (
    <div className={style.block_main}>
      <p className="min-w-[160px]">Услуги:</p>
      <div className="flex gap-2 w-full">
        <div className="flex flex-col gap-3">
          {categories.map((category, categoryIndex) => (
            <div className="flex gap-3" key={'category-' + categoryIndex}>
              <div className="flex gap-3 text-[18px] text-nowrap">
                {/* <div className="flex items-center justify-center size-10 min-w-10 rounded-[10px] bg-accent/20">
                  <img
                    className="min-w-6 size-6"
                    src="/tenderpics/cleaning_bucket.svg"
                    alt=""
                  />
                </div> */}
                <p>{category.name}</p>
                <p>{'>'}</p>
              </div>
              <Services category={category} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
