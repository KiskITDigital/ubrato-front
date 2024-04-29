
import { OneTenderArea } from '@/components/OneTenderComponents/OneTenderArea/OneTenderArea';
import { OneTenderAttachments } from '@/components/OneTenderComponents/OneTenderAttachments/OneTenderAttachments';
import { OneTenderCity } from '@/components/OneTenderComponents/OneTenderCity/OneTenderCity';
import { OneTenderDescription } from '@/components/OneTenderComponents/OneTenderDescription/OneTenderDescription';
import { OneTenderExecutorNotification } from '@/components/OneTenderComponents/OneTenderExecutorNotice/OneTenderExecutorNoyification';
import { OneTenderInfoExecutor } from '@/components/OneTenderComponents/OneTenderInfoExecutor/OneTenderInfoExecutor';
// import { OneTenderInfoExecutor } from '@/components/OneTenderComponents/OneTenderInfoExecutor/OneTenderInfoExecutor';
import { OneTenderObject } from '@/components/OneTenderComponents/OneTenderObject/OneTenderObject';
import { OneTenderOffers } from '@/components/OneTenderComponents/OneTenderOffers/OneTenderOffers';
import { OneTenderWishes } from '@/components/OneTenderComponents/OneTenderWishes/OneTenderWishes';
// import { OneTenderMainBlock } from '@/components/OneTenderComponents/OneTenderWork/OneTenderWork';
import { FC } from 'react';


export const OneTenderInfoViewExecutor: FC = () => {
const testData = {
    "id": 0,
    "name": "string",
    "price": 0,
    "is_contract_price": true,
    "location": "string",
    "floor_space": 0,
    "description": "string А также диаграммы связей набирают популярность среди определенных слоев населения, а значит, должны быть объективно рассмотрены соответствующими инстанциями. Прежде всего, существующая теория, в своём классическом представлении, допускает внедрение укрепления моральных ценностей. Как уже неоднократно упомянуто, сделанные на базе интернет-аналитики выводы могут быть рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок.",
    "wishes": "string",
    "attachments": [
      "string"
    ],
    "services_groups": [
      "string", 
    ],
    "services_types": [
      "string"
    ],
    "reception_start": "2024-04-08T22:48:30.145Z",
    "reception_end": "2024-04-08T22:48:30.145Z",
    "work_start": "2024-04-08T22:48:30.145Z",
    "work_end": "2024-04-08T22:48:30.145Z",
    "object_group_id": "string",
    "object_type_id": "string",
    "user_id": "string",
    "created_at": "2024-04-08T22:48:30.145Z",
    "verified": true,
    "active": true
  }
  return (
    <div>
        <OneTenderInfoExecutor price={testData.price} timestamp_rc_start={testData.reception_start} timestamp_rc_end={testData.reception_end} timestamp_wrk_start={testData.work_start} timestamp_wrk_end={testData.work_end} timestamp_crtd={testData.created_at}></OneTenderInfoExecutor>
        {/* <OneTenderMainBlock gg = ''></OneTenderMainBlock> */}
        <OneTenderExecutorNotification></OneTenderExecutorNotification>
        <OneTenderCity city={testData.location}></OneTenderCity>
        <OneTenderObject building={testData.services_groups}></OneTenderObject>
        <OneTenderArea area={testData.floor_space}></OneTenderArea>
        <OneTenderOffers offers={testData.services_types}></OneTenderOffers>
        <OneTenderDescription description={testData.description}></OneTenderDescription>
        <OneTenderWishes wishes={testData.wishes}></OneTenderWishes>
        <OneTenderAttachments attachment={testData.attachments}></OneTenderAttachments>
    </div>
  );
};
