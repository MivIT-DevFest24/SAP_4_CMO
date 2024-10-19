import { useUserInfoQuery } from "@/hooks/react-query/useUser.js";

import UserFormInfo from "@/components/profile/UserFormInfo.jsx";
import loading_gif from "@/assets/images/Loading-icon-unscreen.gif";

export default function Profile() {
  const { data: userInfo, isLoading } = useUserInfoQuery();

  if (isLoading) {
    return <div><img src={loading_gif} alt="loading gif" /></div>;
  }

  return <UserFormInfo userInfo={userInfo} />;
}
