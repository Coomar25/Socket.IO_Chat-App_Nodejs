import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const V0Chat = () => {
  return (
    <div className="grid h-screen grid-cols-[300px_1fr]">
      <div className="border-r bg-gray-100/40 dark:bg-gray-800/40">
        <div className="flex flex-col h-full max-h-screen">
          <div className="flex h-[60px] items-center border-b px-6">
            <h2 className="font-semibold">Chat</h2>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                John Doe
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                href="#"
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                Jane Smith
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                Bob Johnson
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <h2 className="font-semibold">Jane Smith</h2>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-6 w-6">
              <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p className="font-medium">Jane Smith</p>
              <p>Hello, how are you?</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                10:30 AM
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 ml-auto">
            <div className="flex flex-col gap-1 items-end">
              <p className="font-medium">You</p>
              <p>I'm good, thanks! How about you?</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                10:32 AM
              </p>
            </div>
            <Avatar className="h-6 w-6">
              <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
          </div>
        </main>
        <footer className="flex h-14 items-center gap-4 border-t bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Input className="flex-1" placeholder="Type a message..." />
          <Button>Send</Button>
        </footer>
      </div>
    </div>
  );
};
export default V0Chat;
