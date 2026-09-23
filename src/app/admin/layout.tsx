import AdminLayout from '@/components/layouts/admin-layout';

export default function AdminLayoutWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}
