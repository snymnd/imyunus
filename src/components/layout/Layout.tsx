import * as React from 'react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function Layout({
  children,
  ...rest
}: React.PropsWithChildren<React.ComponentProps<'main'>>) {
  return (
    <>
      <Header />
      <main {...rest}>{children}</main>
      <Footer />
    </>
  );
}
