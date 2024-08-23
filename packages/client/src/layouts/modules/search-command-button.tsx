import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { Button } from '@/components/ui/button.tsx';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

type CommandMenuHandle = {
  open: () => void;
  close: () => void;
};

const CommandMenu = forwardRef<CommandMenuHandle>((_, ref: any) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
});

export default function SearchCommandButton() {
  const commandMenuRef = useRef<CommandMenuHandle>(null);

  function handleClick() {
    commandMenuRef.current?.open();
  }

  return (
    <div className={'w-full flex-1 md:w-auto md:flex-none'}>
      <Button
        variant={'outline'}
        size={'sm'}
        className={
          'border border-input rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none md:w-40 lg:w-64 justify-between'
        }
        onClick={handleClick}
      >
        <span className={'hidden lg:inline-flex'}>Search Anything...</span>
        <span className={'inline-flex lg:hidden'}>Search...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandMenu ref={commandMenuRef} />
    </div>
  );
}
