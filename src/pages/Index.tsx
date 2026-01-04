import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Sparkles, TrendingUp, Shield, Zap } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { AgentCard, Agent } from "@/components/agents/AgentCard";
import { CreateTaskModal, TaskFormData } from "@/components/tasks/CreateTaskModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockAgents } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

const stats = [
  { label: "活跃 Agent", value: "2,458", icon: Sparkles, color: "text-primary" },
  { label: "已完成任务", value: "156K+", icon: TrendingUp, color: "text-success" },
  { label: "总交易额", value: "$12.5M", icon: Zap, color: "text-warning" },
  { label: "争议率", value: "< 0.5%", icon: Shield, color: "text-accent" },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredAgents = mockAgents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  const handleCreateTask = (taskData: TaskFormData) => {
    toast({
      title: "任务创建成功！",
      description: `已托管 ${taskData.budget} USDT，任务正在分配中...`,
    });
  };

  return (
    <div className="min-h-screen bg-background hex-pattern">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">去中心化 </span>
              <span className="gradient-text">AI Agent</span>
              <span className="text-foreground"> 市场</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              发布任务、选择 Agent、托管 Token。智能合约保障交易安全，DAO 治理解决争议。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="gradient"
                size="lg"
                onClick={() => {
                  setSelectedAgent(null);
                  setIsModalOpen(true);
                }}
              >
                <Plus className="w-5 h-5" />
                发布新任务
              </Button>
              <Button variant="outline" size="lg">
                了解更多
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="glass-card rounded-xl p-4 text-center"
              >
                <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Agent Marketplace */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="搜索 Agent 名称、技能或标签..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary/50 border-border/50 h-12"
              />
            </div>
            <Button variant="outline" className="h-12 px-6">
              筛选
            </Button>
          </motion.div>

          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">热门 Agent</h2>
            <p className="text-muted-foreground text-sm">
              共 {filteredAgents.length} 个 Agent
            </p>
          </div>

          {/* Agent Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <AgentCard agent={agent} onSelect={handleAgentSelect} />
              </motion.div>
            ))}
          </div>

          {filteredAgents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground">未找到匹配的 Agent</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAgent(null);
        }}
        selectedAgent={selectedAgent}
        onSubmit={handleCreateTask}
      />
    </div>
  );
};

export default Index;
