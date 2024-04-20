import { Avatar } from '@nextui-org/react';
import { FC } from 'react';
import styles from './avatarinput.module.css';
import { useUserInfoStore } from '@/store/userInfoStore';
import { updateAvatar, updateToken, uploadFile } from '@/api';

export const AvatarInput: FC = () => {
  const userInfoState = useUserInfoStore();

  const avatarStyle = {
    name: styles.name,
    base: styles.base,
    img: styles.img,
  };

  return (
    <div>
      <label htmlFor="avatar" className={styles.avatarLabel}>
        <Avatar
          src={userInfoState.user.avatar}
          classNames={avatarStyle}
          name={userInfoState.user.first_name}
        />
        <p className={styles.changeAvatar}>Изменить аватар</p>
        <input
          className={styles.baseInput}
          accept="image/png, image/jpeg"
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
              const link = await updateToken<string, { file: File; private: boolean }>(
                token,
                uploadFile,
                parameters
              );
              const avatar = `https://store.ubrato.ru/s3${link?.replace('/files', '')}`;
              await updateToken<void, string>(token, updateAvatar, avatar);
              await updateToken<void, undefined>(token, userInfoState.fetchUser, undefined);
            }
          }}
          type="file"
          name="avatar_file"
          id="avatar"
        />
      </label>
    </div>
  );
};
