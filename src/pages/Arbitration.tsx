import { useState } from "react";
import { motion } from "framer-motion";
import { Scale, Users, Clock, CheckCircle, Award } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { ArbitrationCard } from "@/components/arbitration/ArbitrationCard";
import { Badge } from "@/components/ui/badge";
import { mockArbitrationCases } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

const daoMembers = [
  { address: "0xABC1...1234", votingPower: 1500, avatar: "👨‍⚖️" },
  { address: "0xDEF2...5678", votingPower: 1200, avatar: "👩‍⚖️" },
  { address: "0xGHI3...9ABC", votingPower: 980, avatar: "🧑‍⚖️" },
  { address: "0xJKL4...DEFG", votingPower: 850, avatar: "👨‍💼" },
  { address: "0xMNO5...HIJK", votingPower: 720, avatar: "👩‍💼" },
];

const Arbitration = () => {
  const [votedCases, setVotedCases] = useState<Set<string>>(new Set());

  const handleVote = (caseId: string, vote: "buyer" | "seller") => {
    setVotedCases((prev) => new Set([...prev, caseId]));
    toast({
      title: "投票成功！",
      description: `您已投票支持${vote === "buyer" ? "买家" : "卖家"}`,
    });
  };

  const activeCases = mockArbitrationCases.filter((c) => c.status === "voting");
  const resolvedCases = mockArbitrationCases.filter((c) => c.status !== "voting");

  return (
    <div className="min-h-screen bg-background hex-pattern">
      <Header />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <Scale className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">DAO 仲裁</h1>
            </div>
            <p className="text-muted-foreground">
              参与社区治理，为争议案件投票并获得奖励
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="glass-card rounded-xl p-4 text-center">
              <Scale className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold text-foreground">{activeCases.length}</p>
              <p className="text-sm text-muted-foreground">进行中</p>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <CheckCircle className="w-6 h-6 mx-auto mb-2 text-success" />
              <p className="text-2xl font-bold text-foreground">{resolvedCases.length}</p>
              <p className="text-sm text-muted-foreground">已解决</p>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-accent" />
              <p className="text-2xl font-bold text-foreground">{daoMembers.length}</p>
              <p className="text-sm text-muted-foreground">委员会成员</p>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <Award className="w-6 h-6 mx-auto mb-2 text-warning" />
              <p className="text-2xl font-bold text-foreground">25 USDT</p>
              <p className="text-sm text-muted-foreground">投票奖励</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cases */}
            <div className="lg:col-span-2 space-y-6">
              {/* Active Cases */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-bold text-foreground">进行中的仲裁</h2>
                  <Badge className="bg-warning/20 text-warning">
                    <Clock className="w-3 h-3 mr-1" />
                    {activeCases.length}
                  </Badge>
                </div>
                <div className="space-y-4">
                  {activeCases.map((case_, index) => (
                    <motion.div
                      key={case_.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <ArbitrationCard
                        case_={case_}
                        onVote={handleVote}
                        hasVoted={votedCases.has(case_.id)}
                      />
                    </motion.div>
                  ))}
                  {activeCases.length === 0 && (
                    <div className="glass-card rounded-xl p-8 text-center">
                      <p className="text-muted-foreground">暂无进行中的仲裁案件</p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Resolved Cases */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-xl font-bold text-foreground mb-4">已解决的仲裁</h2>
                <div className="space-y-4">
                  {resolvedCases.map((case_, index) => (
                    <motion.div
                      key={case_.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <ArbitrationCard case_={case_} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* DAO Members Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div className="glass-card rounded-2xl p-6 sticky top-24">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  仲裁委员会
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  持有治理代币的用户可参与仲裁投票，投票权重与持有量相关。
                </p>
                <div className="space-y-3">
                  {daoMembers.map((member, index) => (
                    <motion.div
                      key={member.address}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-lg">
                        {member.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-sm text-foreground truncate">
                          {member.address}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {member.votingPower.toLocaleString()} 票权
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <p className="text-sm text-foreground font-medium mb-1">
                    参与仲裁奖励
                  </p>
                  <p className="text-xs text-muted-foreground">
                    正确投票可获得案件金额 1% 的奖励，错误投票将扣除质押代币。
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Arbitration;
