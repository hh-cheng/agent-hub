import { useState } from "react";
import { motion } from "framer-motion";
import {
  Wallet as WalletIcon,
  ArrowUpRight,
  ArrowDownLeft,
  Copy,
  ExternalLink,
  TrendingUp,
  RefreshCw,
  Coins,
  Plus,
  Minus,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockTransactions, Transaction } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

const transactionTypeConfig = {
  deposit: { label: "充值", icon: ArrowDownLeft, color: "text-success" },
  withdraw: { label: "提现", icon: ArrowUpRight, color: "text-destructive" },
  payment: { label: "支付", icon: Minus, color: "text-destructive" },
  refund: { label: "退款", icon: Plus, color: "text-success" },
  reward: { label: "奖励", icon: TrendingUp, color: "text-warning" },
};

const Wallet = () => {
  const [balance] = useState(1250.75);
  const [lockedBalance] = useState(350);
  const walletAddress = "0x1234567890abcdef1234567890abcdef12345678";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "已复制",
      description: "钱包地址已复制到剪贴板",
    });
  };

  return (
    <div className="min-h-screen bg-background hex-pattern">
      <Header />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-foreground">钱包</h1>
            <p className="text-muted-foreground mt-1">管理您的资产与交易</p>
          </motion.div>

          {/* Balance Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6 mb-6 relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Wallet Address */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <WalletIcon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">钱包地址</p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-sm text-foreground truncate">
                      {walletAddress.slice(0, 10)}...{walletAddress.slice(-8)}
                    </p>
                    <button onClick={handleCopyAddress} className="text-muted-foreground hover:text-primary transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Balances */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">可用余额</p>
                  <p className="text-4xl font-bold text-foreground font-mono">
                    {balance.toLocaleString()}
                    <span className="text-lg text-muted-foreground ml-2">USDT</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">托管中</p>
                  <p className="text-2xl font-semibold text-warning font-mono">
                    {lockedBalance.toLocaleString()}
                    <span className="text-sm text-muted-foreground ml-2">USDT</span>
                  </p>
                  <p className="text-xs text-muted-foreground">用于进行中的任务</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button variant="gradient">
                  <ArrowDownLeft className="w-4 h-4" />
                  充值
                </Button>
                <Button variant="outline">
                  <ArrowUpRight className="w-4 h-4" />
                  提现
                </Button>
                <Button variant="ghost">
                  <RefreshCw className="w-4 h-4" />
                  刷新
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="glass-card rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-foreground font-mono">12</p>
              <p className="text-sm text-muted-foreground">已完成任务</p>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-success font-mono">+$850</p>
              <p className="text-sm text-muted-foreground">本月收入</p>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-primary font-mono">3</p>
              <p className="text-sm text-muted-foreground">进行中</p>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-warning font-mono">$125</p>
              <p className="text-sm text-muted-foreground">投票奖励</p>
            </div>
          </motion.div>

          {/* Transaction History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-border/50">
              <h2 className="text-xl font-bold text-foreground">交易记录</h2>
            </div>

            <div className="divide-y divide-border/50">
              {mockTransactions.map((tx, index) => {
                const config = transactionTypeConfig[tx.type];
                const Icon = config.icon;

                return (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="p-4 hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-secondary flex items-center justify-center ${config.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{config.label}</p>
                          <Badge
                            variant="secondary"
                            className={`text-xs ${
                              tx.status === "completed"
                                ? "bg-success/20 text-success"
                                : tx.status === "pending"
                                ? "bg-warning/20 text-warning"
                                : "bg-destructive/20 text-destructive"
                            }`}
                          >
                            {tx.status === "completed" ? "已完成" : tx.status === "pending" ? "待处理" : "失败"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{tx.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`font-mono font-semibold ${tx.amount > 0 ? "text-success" : "text-foreground"}`}>
                          {tx.amount > 0 ? "+" : ""}{tx.amount} USDT
                        </p>
                        <p className="text-xs text-muted-foreground">{tx.timestamp}</p>
                      </div>
                    </div>
                    <div className="mt-2 pl-14">
                      <p className="text-xs text-muted-foreground font-mono">
                        TX: {tx.txHash}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="p-4 border-t border-border/50 text-center">
              <Button variant="ghost" size="sm">
                查看全部交易
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Wallet;
