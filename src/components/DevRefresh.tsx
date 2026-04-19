import { useRemoteRefresh } from 'next-remote-refresh/hook';

export default function DevRefresh() {
  useRemoteRefresh();
  return null;
}
