import { FC, useEffect, useState } from 'react';
import s from './style.module.css'
import { fetchDrafts } from '@/api/getTender';

export const DraftTenderComponent: FC = () => {
    const [drafts, setDrafts] = useState([])
    useEffect(()=>{
        (async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            fetchDrafts(token)
            .then((response) => {
              setDrafts(response.data);
            })
            .catch((error) => {
              console.log((error.message))
            });   
            console.log(drafts);
            setDrafts(drafts)


          })()
        
    }, [])

  return (
    <div className={s.draft_tender_container}>
        {/* {drafts.map((tender)=>(
            <div>
                {tender.name}
            </div>
        ))} */}
        {/* {drafts.map((tender) => (
        <div key={tender.id}>
          {tender.name}
        </div>
      ))} */}
    </div>
  );
};
