export function VerticalMenu() {
  return (
    <ul className="space-y-2 text-sm font-medium">
      <li>
        <a
          href="#"
          className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
        >
          <span className="ml-3 flex-1 whitespace-nowrap">Home</span>
        </a>
      </li>
      <li>
        <a
          href="#"
          className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
        >
          <span className="ml-3 flex-1 whitespace-nowrap">Customers</span>
        </a>
      </li>
      <li>
        <a
          href="#"
          className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
        >
          <span className="ml-3 flex-1 whitespace-nowrap">Products</span>
        </a>
      </li>
      <li>
        <a
          href="#"
          className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
        >
          <span className="ml-3 flex-1 whitespace-nowrap">Settings</span>
        </a>
      </li>
    </ul>
  );
}
