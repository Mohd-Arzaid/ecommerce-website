import AdminLayout from '@/components/layouts/admin-layout';
import { requireAdmin } from '@/server-actions/auth/require-admin';

export default async function AdminLayoutWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAdmin();
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}
