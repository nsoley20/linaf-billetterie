import type { TicketMatchInfo } from "@/components/ticket-card";
import { TRIBUNES } from "@/data/players";
import { findMatch, getClub, getStadium, matchTitle } from "./data";
import { fmtDateShort, fmtTime } from "./format";

export function ticketInfo(matchId: string, tribuneId: string): TicketMatchInfo | null {
  const match = findMatch(matchId);
  if (!match) return null;
  return {
    title: matchTitle(match),
    home: getClub(match.home).name,
    away: getClub(match.away).name,
    date: fmtDateShort(match.kickoff),
    time: fmtTime(match.kickoff),
    stadium: getStadium(match.stadiumId)?.name ?? "À confirmer",
    tribune: TRIBUNES.find((t) => t.id === tribuneId)?.name ?? tribuneId,
  };
}
