import { Avatar } from '@nextui-org/react';
import { FC } from 'react';
import styles from './avatarinput.module.css';
import { useUserInfoStore } from '@/store/userInfoStore';
import { updateAvatar, uploadAvatar } from '@/api';

export const AvatarInput: FC = () => {
  const userInfoState = useUserInfoStore();

  const avatarStyle = {
    name: styles.name,
    base: styles.base,
  };

  return (
    <div>
      <label htmlFor="avatar">
        <Avatar classNames={avatarStyle} name={userInfoState.user.first_name} />
        <input
          onChange={async (e) => {
            // const data = new FormData();
            // console.log(await e.target.files![0].text());
            const rawData = e.target.files![0];
            // data.append('avatar', e.target.files![0]);
            // console.log(data);
            const token = localStorage.getItem('token');
            const parameters = {
              file: rawData,
              private: false,
            };
            if (token) {
              const link = await uploadAvatar(token, parameters);
              const avatar = `https://store.ubrato.ru/s3${link?.replace('/files', '')}`;
              await updateAvatar(token, avatar);
              await userInfoState.fetchUser(token)
            }
          }}
          type="file"
          name="avatar_file"
          id="avatar"
        />
      </label>
      <img src={userInfoState.user.avatar} alt="xzlol" />
    </div>
  );
};
