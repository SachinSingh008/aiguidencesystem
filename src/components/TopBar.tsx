import { Bell, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { userProfile } from "@/lib/mockData";

export function TopBar() {
  return (
    <header className="h-16 border-b border-border/50 glass sticky top-0 z-30 px-4 md:px-6 flex items-center gap-3">
      <SidebarTrigger />
      <div className="flex-1 max-w-md hidden sm:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search courses, skills, careers..."
            className="pl-9 bg-secondary/50 border-border/50 h-10"
          />
        </div>
      </div>
      <div className="flex-1 sm:hidden" />
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="w-5 h-5" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
      </Button>
      <div className="flex items-center gap-3 pl-3 border-l border-border/50">
        <div className="text-right hidden md:block">
          <p className="text-sm font-medium leading-none">{userProfile.name}</p>
          <p className="text-xs text-muted-foreground mt-1">{userProfile.year}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold shadow-md">
          {userProfile.avatar}
        </div>
      </div>
    </header>
  );
}
