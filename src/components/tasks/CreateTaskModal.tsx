import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Coins, FileText, Bot, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Agent } from "@/components/agents/AgentCard";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAgent?: Agent | null;
  onSubmit: (task: TaskFormData) => void;
}

export interface TaskFormData {
  title: string;
  description: string;
  budget: number;
  agentId?: string;
  autoAssign: boolean;
}

export function CreateTaskModal({ isOpen, onClose, selectedAgent, onSubmit }: CreateTaskModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    budget: 100,
    agentId: selectedAgent?.id,
    autoAssign: !selectedAgent,
  });

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
    setStep(1);
    setFormData({
      title: "",
      description: "",
      budget: 100,
      autoAssign: true,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="glass-card rounded-2xl w-full max-w-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">创建新任务</h2>
                    <p className="text-sm text-muted-foreground">步骤 {step}/2</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              {/* Progress bar */}
              <div className="mt-4 h-1 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: "50%" }}
                  animate={{ width: step === 1 ? "50%" : "100%" }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                        <FileText className="w-4 h-4 text-primary" />
                        任务标题
                      </label>
                      <Input
                        placeholder="例如：市场数据分析报告"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="bg-secondary/50 border-border/50"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                        <FileText className="w-4 h-4 text-primary" />
                        任务描述
                      </label>
                      <Textarea
                        placeholder="详细描述您的需求..."
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="bg-secondary/50 border-border/50 resize-none"
                      />
                    </div>

                    {selectedAgent && (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/10 border border-primary/20">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-xl">
                          {selectedAgent.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{selectedAgent.name}</p>
                          <p className="text-xs text-muted-foreground">已选择此 Agent</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                        <Coins className="w-4 h-4 text-primary" />
                        任务预算 (USDT)
                      </label>
                      <Input
                        type="number"
                        placeholder="100"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                        className="bg-secondary/50 border-border/50"
                      />
                    </div>

                    {!selectedAgent && (
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                          <Bot className="w-4 h-4 text-primary" />
                          Agent 分配
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            className={`p-4 rounded-xl border transition-all ${
                              formData.autoAssign
                                ? "border-primary bg-primary/10 text-foreground"
                                : "border-border/50 text-muted-foreground hover:border-primary/50"
                            }`}
                            onClick={() => setFormData({ ...formData, autoAssign: true })}
                          >
                            <Sparkles className="w-5 h-5 mx-auto mb-2" />
                            <p className="text-sm font-medium">自动匹配</p>
                            <p className="text-xs text-muted-foreground">智能分配最佳Agent</p>
                          </button>
                          <button
                            className={`p-4 rounded-xl border transition-all ${
                              !formData.autoAssign
                                ? "border-primary bg-primary/10 text-foreground"
                                : "border-border/50 text-muted-foreground hover:border-primary/50"
                            }`}
                            onClick={() => setFormData({ ...formData, autoAssign: false })}
                          >
                            <Bot className="w-5 h-5 mx-auto mb-2" />
                            <p className="text-sm font-medium">手动选择</p>
                            <p className="text-xs text-muted-foreground">从市场选择Agent</p>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Summary */}
                    <div className="p-4 rounded-xl bg-secondary/50 space-y-2">
                      <h4 className="font-medium text-foreground">任务摘要</h4>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">任务预算</span>
                        <span className="font-mono text-foreground">{formData.budget} USDT</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">平台费用 (2.5%)</span>
                        <span className="font-mono text-foreground">{(formData.budget * 0.025).toFixed(2)} USDT</span>
                      </div>
                      <div className="flex justify-between text-sm pt-2 border-t border-border/50">
                        <span className="text-muted-foreground">总计</span>
                        <span className="font-mono font-semibold text-primary">{(formData.budget * 1.025).toFixed(2)} USDT</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border/50 flex gap-3">
              {step === 2 && (
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                  返回
                </Button>
              )}
              <Button
                variant="gradient"
                className="flex-1"
                onClick={() => (step === 1 ? setStep(2) : handleSubmit())}
                disabled={step === 1 && (!formData.title || !formData.description)}
              >
                {step === 1 ? (
                  <>
                    下一步
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <Coins className="w-4 h-4" />
                    托管 Token 并创建
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
