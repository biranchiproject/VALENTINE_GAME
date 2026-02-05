import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";

// Pages
import Home from "@/pages/Home";
import Catalog from "@/pages/Catalog";
import RoomOption from "@/pages/RoomOption";
import CreateRoom from "@/pages/CreateRoom";
import JoinRoom from "@/pages/JoinRoom";
import Lobby from "@/pages/Lobby";
import GameScreen from "@/pages/GameScreen";
import ReviewPartner from "@/pages/ReviewPartner";
import DayResult from "@/pages/DayResult";
import History from "@/pages/History"; // Import History
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/room-option" component={RoomOption} />
      <Route path="/create" component={CreateRoom} />
      <Route path="/join" component={JoinRoom} />
      <Route path="/lobby/:code" component={Lobby} />
      <Route path="/game/:code" component={GameScreen} />
      <Route path="/review-partner/:code" component={ReviewPartner} />
      <Route path="/day-result/:code" component={DayResult} />
      <Route path="/history" component={History} /> {/* Add History Route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Layout>
          <Router />
        </Layout>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
