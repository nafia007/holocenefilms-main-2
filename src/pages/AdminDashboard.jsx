import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  BarChart,
  Users,
  Film,
  DollarSign,
  Activity,
  UserPlus,
  Trash2
} from "lucide-react";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', role: 'Filmmaker', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', role: 'User', email: 'jane@example.com' },
  ]);

  const [newUser, setNewUser] = useState({ name: '', role: '', email: '' });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.role || !newUser.email) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setNewUser({ name: '', role: '', email: '' });
    toast({
      title: "Success",
      description: `${newUser.role} added successfully`,
    });
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User Deleted",
      description: "User has been removed from the platform",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <Button variant="outline">Generate Report</Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <h3 className="text-2xl font-bold">$124,592</h3>
              <p className="text-sm text-green-500">+12.5% from last month</p>
            </div>
            <DollarSign className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Users</p>
              <h3 className="text-2xl font-bold">2,345</h3>
              <p className="text-sm text-green-500">+8.1% from last month</p>
            </div>
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Listed Films</p>
              <h3 className="text-2xl font-bold">342</h3>
              <p className="text-sm text-green-500">+23 new this month</p>
            </div>
            <Film className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Platform Activity</p>
              <h3 className="text-2xl font-bold">87%</h3>
              <p className="text-sm text-green-500">+5.4% from last week</p>
            </div>
            <Activity className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>
      </div>

      {/* User Management */}
      <Card className="p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">User Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <Input
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <Input
            placeholder="Role (Filmmaker/User)"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          />
          <Button onClick={handleAddUser} className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add User
          </Button>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Users & Filmmakers</h3>
          <div className="space-y-2">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email} - {user.role}</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteUser(user.id)}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: "New film listed", user: "John Doe", time: "2 minutes ago" },
            { action: "Token purchase", user: "Jane Smith", time: "15 minutes ago" },
            { action: "New user registration", user: "Mike Johnson", time: "1 hour ago" },
            { action: "Film rights transferred", user: "Sarah Wilson", time: "2 hours ago" },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-muted-foreground">by {activity.user}</p>
              </div>
              <span className="text-sm text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
