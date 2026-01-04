import { motion } from "framer-motion";
import { Clock, CheckCircle, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export type TaskStatus = "pending" | "in_progress" | "completed" | "verification" | "disputed" | "refunded";

export interface Task {
  id: string;
  title: string;
  description: string;
  budget: number;
  status: TaskStatus;
  agentName: string;
  agentAvatar: string;
  createdAt: string;
  estimatedCompletion?: string;
  progress?: number;
}

interface TaskCardProps {
  task: Task;
}

const statusConfig: Record<TaskStatus, { label: string; color: string; icon: React.ReactNode }> = {
  pending: { label: "待分配", color: "bg-warning/20 text-warning", icon: <Clock className="w-3 h-3" /> },
  in_progress: { label: "进行中", color: "bg-primary/20 text-primary", icon: <Loader2 className="w-3 h-3 animate-spin" /> },
  completed: { label: "已完成", color: "bg-success/20 text-success", icon: <CheckCircle className="w-3 h-3" /> },
  verification: { label: "待验收", color: "bg-accent/20 text-accent", icon: <AlertCircle className="w-3 h-3" /> },
  disputed: { label: "争议中", color: "bg-destructive/20 text-destructive", icon: <AlertCircle className="w-3 h-3" /> },
  refunded: { label: "已退款", color: "bg-muted text-muted-foreground", icon: <CheckCircle className="w-3 h-3" /> },
};

export function TaskCard({ task }: TaskCardProps) {
  const status = statusConfig[task.status];

  return (
    <Link to={`/task/${task.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01 }}
        className="glass-card rounded-xl p-4 cursor-pointer group"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`${status.color} flex items-center gap-1`}>
                {status.icon}
                {status.label}
              </Badge>
            </div>
            <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
              {task.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
              {task.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-mono font-semibold text-foreground">{task.budget} USDT</p>
              <p className="text-xs text-muted-foreground">{task.createdAt}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </div>

        {/* Progress bar for in-progress tasks */}
        {task.status === "in_progress" && task.progress !== undefined && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground">执行进度</span>
              <span className="text-primary font-mono">{task.progress}%</span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: 0 }}
                animate={{ width: `${task.progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}

        {/* Agent info */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/50">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-sm">
            {task.agentAvatar}
          </div>
          <span className="text-sm text-muted-foreground">{task.agentName}</span>
        </div>
      </motion.div>
    </Link>
  );
}
