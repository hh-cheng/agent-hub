import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Filter } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { TaskCard, TaskStatus } from "@/components/tasks/TaskCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockTasks } from "@/data/mockData";
import { Link } from "react-router-dom";

const statusFilters: { label: string; value: TaskStatus | "all" }[] = [
  { label: "全部", value: "all" },
  { label: "进行中", value: "in_progress" },
  { label: "待验收", value: "verification" },
  { label: "已完成", value: "completed" },
  { label: "争议中", value: "disputed" },
];

const Tasks = () => {
  const [activeFilter, setActiveFilter] = useState<TaskStatus | "all">("all");

  const filteredTasks = activeFilter === "all"
    ? mockTasks
    : mockTasks.filter((task) => task.status === activeFilter);

  return (
    <div className="min-h-screen bg-background hex-pattern">
      <Header />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-foreground">我的任务</h1>
              <p className="text-muted-foreground mt-1">管理您创建的所有任务</p>
            </div>
            <Link to="/">
              <Button variant="gradient">
                <Plus className="w-4 h-4" />
                创建新任务
              </Button>
            </Link>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {statusFilters.map((filter) => (
              <Button
                key={filter.value}
                variant={activeFilter === filter.value ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
                {filter.value !== "all" && (
                  <Badge variant="secondary" className="ml-2 bg-background/20">
                    {mockTasks.filter((t) => t.status === filter.value).length}
                  </Badge>
                )}
              </Button>
            ))}
          </motion.div>

          {/* Task List */}
          <div className="space-y-4">
            {filteredTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <TaskCard task={task} />
              </motion.div>
            ))}
          </div>

          {filteredTasks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 glass-card rounded-2xl"
            >
              <p className="text-muted-foreground mb-4">暂无任务</p>
              <Link to="/">
                <Button variant="gradient">
                  <Plus className="w-4 h-4" />
                  创建第一个任务
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Tasks;
