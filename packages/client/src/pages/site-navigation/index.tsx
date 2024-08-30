import { VerticalMenu } from '@/components/common/vertical-menu';
import { cn } from '@/lib/utils';

import styles from './index.module.scss';

export default function SiteNavigationPage() {
  return (
    <div className={styles.siteNavigationWrapper}>
      <div className={cn(styles.leftSidebar)}>
        <aside className={styles.menuWrapper}>
          <VerticalMenu />
        </aside>
      </div>
      <div className={styles.rightContainer}>右侧</div>
    </div>
  );
}
