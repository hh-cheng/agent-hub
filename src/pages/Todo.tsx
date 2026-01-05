import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, LogOut, Plus, Trash2, User } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

const AUTH_STORAGE_KEY = "todo-auth-user";
const TODO_STORAGE_PREFIX = "todo-items-";

type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
};

const Todo = () => {
  const [user, setUser] = useState<string | null>(null);
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedUser) {
      setUser(storedUser);
      const storedTodos = localStorage.getItem(`${TODO_STORAGE_PREFIX}${storedUser}`);
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    }
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    localStorage.setItem(`${TODO_STORAGE_PREFIX}${user}`, JSON.stringify(todos));
  }, [todos, user]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((item) => item.completed).length;
    return { total, completed };
  }, [todos]);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!loginName.trim() || !password.trim()) {
      toast({
        title: "请输入账号信息",
        description: "用户名与密码不能为空。",
      });
      return;
    }
    const trimmedName = loginName.trim();
    setUser(trimmedName);
    localStorage.setItem(AUTH_STORAGE_KEY, trimmedName);
    const storedTodos = localStorage.getItem(`${TODO_STORAGE_PREFIX}${trimmedName}`);
    setTodos(storedTodos ? JSON.parse(storedTodos) : []);
    setPassword("");
    setNewTodo("");
    toast({
      title: `欢迎回来，${trimmedName}`,
      description: "已成功登录 TODO 清单。",
    });
  };

  const handleLogout = () => {
    setUser(null);
    setLoginName("");
    setPassword("");
    setNewTodo("");
    setTodos([]);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newTodo.trim()) {
      toast({
        title: "请输入待办事项",
        description: "待办内容不能为空。",
      });
      return;
    }
    const todo: TodoItem = {
      id: crypto.randomUUID(),
      text: newTodo.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [todo, ...prev]);
    setNewTodo("");
  };

  const handleToggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((item) => !item.completed));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        {user ? (
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="border-border/60">
              <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="text-2xl">TODO 清单</CardTitle>
                  <CardDescription>欢迎回来，{user}。今天也要保持高效！</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="gap-1">
                    <User className="w-3.5 h-3.5" />
                    {user}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="w-4 h-4" />
                    退出登录
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleAddTodo} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    placeholder="添加新的待办事项..."
                    value={newTodo}
                    onChange={(event) => setNewTodo(event.target.value)}
                  />
                  <Button type="submit" className="sm:w-40">
                    <Plus className="w-4 h-4" />
                    新增待办
                  </Button>
                </form>

                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    已完成 {stats.completed}/{stats.total}
                  </div>
                  {stats.completed > 0 && (
                    <Button variant="ghost" size="sm" onClick={handleClearCompleted}>
                      清除已完成
                    </Button>
                  )}
                </div>

                <Separator />

                <div className="space-y-3">
                  {todos.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      还没有待办事项，添加第一条吧！
                    </div>
                  ) : (
                    todos.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 rounded-lg border border-border/60 p-4 bg-background/60"
                      >
                        <Checkbox
                          checked={item.completed}
                          onCheckedChange={() => handleToggleTodo(item.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <p
                            className={`text-base font-medium ${
                              item.completed
                                ? "text-muted-foreground line-through"
                                : "text-foreground"
                            }`}
                          >
                            {item.text}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            创建时间：{new Date(item.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteTodo(item.id)}
                          aria-label="删除待办"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-xl mx-auto">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-2xl">登录 TODO 清单</CardTitle>
                <CardDescription>
                  使用任意用户名密码登录，即可保存你的待办事项。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">用户名</label>
                    <Input
                      placeholder="请输入用户名"
                      value={loginName}
                      onChange={(event) => setLoginName(event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">密码</label>
                    <Input
                      type="password"
                      placeholder="请输入密码"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    登录并进入 TODO
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Todo;
