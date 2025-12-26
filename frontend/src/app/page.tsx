import { getApplicationsServer } from '@/services/applications.server';
import HomeClient from './HomeClient';

export default async function HomePage() {
  const applications = await getApplicationsServer();
  return <HomeClient applications={applications} />;
}













