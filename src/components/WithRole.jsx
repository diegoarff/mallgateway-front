import { useAuthStore } from "../stores/auth";

const WithRole = ({ roles, children }) => {
  const user = useAuthStore((state) => state.user);

  if (!roles.includes(user?.role)) return null;

  return children;
};

export default WithRole;
