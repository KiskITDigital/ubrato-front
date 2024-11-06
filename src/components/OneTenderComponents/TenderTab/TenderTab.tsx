import {
  Category,
  OneTenderInfoViewExecutor,
} from '@/components/OneTenderComponentsWrappedVIew/OneTenderInfoViewExecutor/OneTenderInfoViewExecutor';
import { FC } from 'react';
import styles from './tender.module.css';
import { useTenderInfoStore } from '@/store/tenderStore';

export interface dataObjectTypes {
  id: number;
  name: string;
  active: boolean;
  price: number;
  object_group: string;
  objects_types: string[];
  location: string;
  floor_space: number;
  categories: Category[];
  description: string;
  wishes: string;
  attachments: string[];
  reception_start: string;
  reception_end: string;
  work_start: string;
  work_end: string;
  created_at: string;
  is_nds_price: boolean;
  is_contract_price: boolean;
  user_id: string;
}

export const TenderTab: FC = () => {
  const tenderInfoState = useTenderInfoStore();

  if (tenderInfoState.loading) {
    return <div>Loading...</div>;
  }

  if (!tenderInfoState.tenderInfo) {
    return <div>Failed to load data</div>;
  }

  return (
    <div className={styles.switch_container}>
      <OneTenderInfoViewExecutor dataTender={tenderInfoState.tenderInfo} />
    </div>
  );
};
