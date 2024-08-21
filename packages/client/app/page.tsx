import Link from 'next/link';
import { ThemeModeToggle} from '@/components/theme-toggle'

export default function SitesNavigation() {
  return (
    <section>
      <ThemeModeToggle/>
      <ul className={'list-none'}>
        <li>
          <Link href={'/bookmark'}>收藏夹</Link>
        </li>
        <li>
          <Link href={'/toolkit'}>工具箱</Link>
        </li>
      </ul>
    </section>

  );
}
