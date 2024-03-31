import { useAuthStore } from "../stores/auth";

const WithRole = ({ role, children }) => {
  const user = useAuthStore((state) => state.user);

  if (user.role !== role) return null;

  return children;
};

export default WithRole;
