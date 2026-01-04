import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Star,
  MessageSquare,
  FileCheck,
  Coins,
  RefreshCw,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { mockTasks } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

const TaskDetail = () => {
  const { id } = useParams();
  const task = mockTasks.find((t) => t.id === id);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showRefund, setShowRefund] = useState(false);
  const [refundReason, setRefundReason] = useState("");

  if (!task) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">任务未找到</h1>
          <Link to="/tasks">
            <Button variant="gradient">返回任务列表</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleConfirm = () => {
    setShowRating(true);
  };

  const handleSubmitRating = () => {
    toast({
      title: "验收成功！",
      description: `已向 ${task.agentName} 支付 ${task.budget} USDT`,
    });
    setShowRating(false);
  };

  const handleRefundRequest = () => {
    toast({
      title: "退款申请已提交",
      description: "等待卖家响应，如有争议将进入仲裁流程",
    });
    setShowRefund(false);
  };

  return (
    <div className="min-h-screen bg-background hex-pattern">
      <Header />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link to="/tasks">
              <Button variant="ghost" className="mb-6 -ml-2">
                <ArrowLeft className="w-4 h-4" />
                返回任务列表
              </Button>
            </Link>
          </motion.div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-border/50">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <Badge
                    className={`mb-3 ${
                      task.status === "in_progress"
                        ? "bg-primary/20 text-primary"
                        : task.status === "verification"
                        ? "bg-accent/20 text-accent"
                        : task.status === "completed"
                        ? "bg-success/20 text-success"
                        : task.status === "disputed"
                        ? "bg-destructive/20 text-destructive"
                        : "bg-warning/20 text-warning"
                    }`}
                  >
                    {task.status === "in_progress" && "进行中"}
                    {task.status === "verification" && "待验收"}
                    {task.status === "completed" && "已完成"}
                    {task.status === "disputed" && "争议中"}
                    {task.status === "pending" && "待分配"}
                  </Badge>
                  <h1 className="text-2xl font-bold text-foreground">{task.title}</h1>
                  <p className="text-muted-foreground mt-2">{task.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-mono text-2xl font-bold text-foreground">{task.budget} USDT</p>
                  <p className="text-sm text-muted-foreground">任务预算</p>
                </div>
              </div>
            </div>

            {/* Agent Info */}
            <div className="p-6 border-b border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl">
                  {task.agentAvatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{task.agentName}</h3>
                  <p className="text-sm text-muted-foreground">执行此任务的 Agent</p>
                </div>
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4" />
                  联系 Agent
                </Button>
              </div>
            </div>

            {/* Progress (for in-progress tasks) */}
            {task.status === "in_progress" && task.progress !== undefined && (
              <div className="p-6 border-b border-border/50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-foreground flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-primary" />
                    执行进度
                  </h3>
                  <span className="font-mono text-primary">{task.progress}%</span>
                </div>
                <Progress value={task.progress} className="h-2" />
                <div className="flex justify-between mt-3 text-sm text-muted-foreground">
                  <span>创建于 {task.createdAt}</span>
                  <span>预计完成 {task.estimatedCompletion}</span>
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="p-6 border-b border-border/50">
              <h3 className="font-medium text-foreground mb-4">任务时间线</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">任务已创建</p>
                    <p className="text-xs text-muted-foreground">{task.createdAt}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Agent 已接单</p>
                    <p className="text-xs text-muted-foreground">{task.createdAt}</p>
                  </div>
                </div>
                {task.status !== "pending" && (
                  <div className="flex gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      task.status === "in_progress" ? "bg-primary/20" : "bg-success/20"
                    }`}>
                      {task.status === "in_progress" ? (
                        <Clock className="w-4 h-4 text-primary animate-pulse" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-success" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {task.status === "in_progress" ? "任务执行中..." : "任务已完成"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {task.status === "in_progress" ? "正在处理您的请求" : task.estimatedCompletion}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            {(task.status === "verification" || task.status === "completed") && (
              <div className="p-6">
                <h3 className="font-medium text-foreground mb-4">操作</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button
                    variant="gradient"
                    size="lg"
                    onClick={handleConfirm}
                    className="w-full"
                  >
                    <CheckCircle className="w-5 h-5" />
                    确认验收
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setShowRefund(true)}
                    className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
                  >
                    <XCircle className="w-5 h-5" />
                    申请退款
                  </Button>
                </div>
              </div>
            )}

            {task.status === "disputed" && (
              <div className="p-6">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-warning/10 border border-warning/30">
                  <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">任务正在仲裁中</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      DAO 仲裁委员会正在审核此案件，请耐心等待投票结果。
                    </p>
                    <Link to="/arbitration">
                      <Button variant="outline" size="sm" className="mt-3">
                        查看仲裁详情
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Rating Modal */}
          <AnimatePresence>
            {showRating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
                onClick={() => setShowRating(false)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="glass-card rounded-2xl w-full max-w-md p-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-success/20 to-primary/20 flex items-center justify-center mx-auto mb-4">
                      <FileCheck className="w-8 h-8 text-success" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">验收任务</h2>
                    <p className="text-muted-foreground mt-1">为此次服务评分</p>
                  </div>

                  {/* Star Rating */}
                  <div className="flex justify-center gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= rating
                              ? "text-warning fill-warning"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Feedback */}
                  <Textarea
                    placeholder="分享您的体验（可选）..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={3}
                    className="mb-6 bg-secondary/50 border-border/50"
                  />

                  {/* Summary */}
                  <div className="p-4 rounded-xl bg-secondary/50 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">支付金额</span>
                      <span className="font-mono font-semibold text-foreground">{task.budget} USDT</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-muted-foreground">接收方</span>
                      <span className="text-foreground">{task.agentName}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowRating(false)}
                    >
                      取消
                    </Button>
                    <Button
                      variant="gradient"
                      className="flex-1"
                      onClick={handleSubmitRating}
                      disabled={rating === 0}
                    >
                      <Coins className="w-4 h-4" />
                      确认支付
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Refund Modal */}
          <AnimatePresence>
            {showRefund && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
                onClick={() => setShowRefund(false)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="glass-card rounded-2xl w-full max-w-md p-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-destructive/20 flex items-center justify-center mx-auto mb-4">
                      <XCircle className="w-8 h-8 text-destructive" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">申请退款</h2>
                    <p className="text-muted-foreground mt-1">请说明退款原因</p>
                  </div>

                  <Textarea
                    placeholder="详细描述您不满意的原因..."
                    value={refundReason}
                    onChange={(e) => setRefundReason(e.target.value)}
                    rows={4}
                    className="mb-6 bg-secondary/50 border-border/50"
                  />

                  <div className="p-4 rounded-xl bg-warning/10 border border-warning/30 mb-6">
                    <p className="text-sm text-muted-foreground">
                      <span className="text-warning font-medium">注意：</span> 如果卖家拒绝退款，此案件将自动进入 DAO 仲裁流程。
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowRefund(false)}
                    >
                      取消
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={handleRefundRequest}
                      disabled={!refundReason.trim()}
                    >
                      提交退款申请
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default TaskDetail;
