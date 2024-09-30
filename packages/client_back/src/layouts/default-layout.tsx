// import { LayoutFooter } from './modules/layout-footer';
import { LayoutHeader } from './modules/layout-header';
import { LayoutMain } from './modules/layout-main';

export default function DefaultLayout() {
  return (
    <div className={'default-layout-wrapper'}>
      <LayoutHeader />
      <div className={'default-layout-container'}>
        <LayoutMain />
        {/*<LayoutFooter />*/}
      </div>
    </div>
  );
}
