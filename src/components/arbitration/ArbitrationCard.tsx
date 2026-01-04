import { motion } from "framer-motion";
import { Users, Clock, CheckCircle, XCircle, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export interface ArbitrationCase {
  id: string;
  taskTitle: string;
  buyerAddress: string;
  sellerAddress: string;
  amount: number;
  reason: string;
  status: "voting" | "resolved_buyer" | "resolved_seller";
  votesForBuyer: number;
  votesForSeller: number;
  totalVoters: number;
  deadline: string;
  evidence: string[];
}

interface ArbitrationCardProps {
  case_: ArbitrationCase;
  onVote?: (caseId: string, vote: "buyer" | "seller") => void;
  hasVoted?: boolean;
}

export function ArbitrationCard({ case_, onVote, hasVoted = false }: ArbitrationCardProps) {
  const totalVotes = case_.votesForBuyer + case_.votesForSeller;
  const buyerPercentage = totalVotes > 0 ? (case_.votesForBuyer / totalVotes) * 100 : 50;
  const isActive = case_.status === "voting";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-5 border-b border-border/50">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge
              className={`mb-2 ${
                isActive
                  ? "bg-warning/20 text-warning"
                  : case_.status === "resolved_buyer"
                  ? "bg-success/20 text-success"
                  : "bg-primary/20 text-primary"
              }`}
            >
              {isActive ? "投票中" : case_.status === "resolved_buyer" ? "买家胜诉" : "卖家胜诉"}
            </Badge>
            <h3 className="font-semibold text-foreground">{case_.taskTitle}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{case_.reason}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-mono font-semibold text-foreground">{case_.amount} USDT</p>
            {isActive && (
              <div className="flex items-center gap-1 text-xs text-warning mt-1">
                <Clock className="w-3 h-3" />
                {case_.deadline}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Parties */}
      <div className="p-5 grid grid-cols-2 gap-4 border-b border-border/50">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">买家</p>
          <p className="font-mono text-sm text-foreground">{case_.buyerAddress}</p>
        </div>
        <div className="space-y-1 text-right">
          <p className="text-xs text-muted-foreground">卖家</p>
          <p className="font-mono text-sm text-foreground">{case_.sellerAddress}</p>
        </div>
      </div>

      {/* Voting Progress */}
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">投票进度</span>
          </div>
          <span className="font-mono text-foreground">
            {totalVotes}/{case_.totalVoters} 票
          </span>
        </div>

        {/* Visual vote bar */}
        <div className="space-y-2">
          <div className="h-3 rounded-full bg-secondary overflow-hidden flex">
            <motion.div
              className="h-full bg-gradient-to-r from-success to-success/70"
              initial={{ width: 0 }}
              animate={{ width: `${buyerPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="h-full bg-gradient-to-r from-primary/70 to-primary"
              initial={{ width: 0 }}
              animate={{ width: `${100 - buyerPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between text-xs">
            <div className="flex items-center gap-1 text-success">
              <CheckCircle className="w-3 h-3" />
              <span>买家 {case_.votesForBuyer}票</span>
            </div>
            <div className="flex items-center gap-1 text-primary">
              <span>卖家 {case_.votesForSeller}票</span>
              <XCircle className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Vote buttons */}
        {isActive && onVote && !hasVoted && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button
              variant="outline"
              className="border-success/50 text-success hover:bg-success/10"
              onClick={() => onVote(case_.id, "buyer")}
            >
              <CheckCircle className="w-4 h-4" />
              支持买家
            </Button>
            <Button
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10"
              onClick={() => onVote(case_.id, "seller")}
            >
              <Vote className="w-4 h-4" />
              支持卖家
            </Button>
          </div>
        )}

        {hasVoted && (
          <div className="text-center py-2 text-sm text-muted-foreground">
            ✓ 您已投票
          </div>
        )}
      </div>
    </motion.div>
  );
}
