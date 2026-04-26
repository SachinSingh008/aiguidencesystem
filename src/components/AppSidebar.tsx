import { LayoutDashboard, Compass, Target, BookOpen, FileText, ClipboardCheck, TrendingUp, Settings, Sparkles, Library } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar, SidebarHeader } from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Career Paths", url: "/career-paths", icon: Compass },
  { title: "Skill Gap", url: "/skill-gap", icon: Target },
  { title: "Courses", url: "/courses", icon: BookOpen },
  { title: "Study Material", url: "/study-material", icon: Library },
  { title: "Resume Builder", url: "/resume", icon: FileText },
  { title: "Mock Tests", url: "/mock-tests", icon: ClipboardCheck },
  { title: "Progress", url: "/progress", icon: TrendingUp },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg flex-shrink-0">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <h1 className="font-bold text-base leading-none gradient-text">CareerPilot</h1>
              <p className="text-[10px] text-muted-foreground mt-1">AI Career Mentor</p>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-11">
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className="flex items-center gap-3 rounded-lg transition-all hover:bg-sidebar-accent text-sidebar-foreground"
                      activeClassName="bg-gradient-primary text-primary-foreground shadow-md hover:bg-gradient-primary"
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
