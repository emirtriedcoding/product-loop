import Profile from '@/components/user/profile/Profile';

import { authUser } from '@/lib/helpers'

export const metadata = {
  title : "حساب کاربری - پروفایل"
}

const ProfilePage = async () => {
  const user = await authUser();

  return <Profile user={JSON.parse(JSON.stringify(user))} />
};

export default ProfilePage;
