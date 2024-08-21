import Link from 'next/link';
import { ThemeModeToggle} from '@/components/theme-toggle'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ThemeModeToggle/>
      <ul className={'list-none'}>
        <li>
          <Link href={'/bookmark'}>我的网站</Link>
        </li>
        <li>
          <Link href={'/toolkit'}>工具箱</Link>
        </li>
      </ul>
    </main>
  );
}
