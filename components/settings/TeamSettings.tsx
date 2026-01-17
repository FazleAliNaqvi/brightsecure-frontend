'use client';

import { useState, useEffect } from 'react';
import { Users, Plus, Mail, Phone, Shield, Trash2, Check, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Badge } from '@/components/ui';
import { Spinner } from '@/components/ui/Spinner';
import api from '@/lib/api';

interface TeamMember {
  id: string;
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
  };
  role: 'owner' | 'admin' | 'member';
  receives_notifications: boolean;
  created_at: string;
}

interface TeamSettingsProps {
  organizationId: string;
}

const ROLES = [
  { value: 'admin', label: 'Admin', description: 'Full access to settings' },
  { value: 'member', label: 'Member', description: 'View and manage appointments' },
];

export function TeamSettings({ organizationId }: TeamSettingsProps) {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'member'>('member');
  const [inviting, setInviting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMembers();
  }, [organizationId]);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/organizations/${organizationId}/members/`);
      if (response.data.success) {
        setMembers(response.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch members:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async () => {
    if (!inviteEmail) return;

    setInviting(true);
    setError(null);

    try {
      const response = await api.post(`/organizations/${organizationId}/members/invite/`, {
        email: inviteEmail,
        role: inviteRole,
      });

      if (response.data.success) {
        setInviteEmail('');
        setShowInvite(false);
        fetchMembers();
      } else {
        setError(response.data.error?.message || 'Failed to invite member');
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to send invite');
    } finally {
      setInviting(false);
    }
  };

  const handleUpdateRole = async (memberId: string, newRole: string) => {
    try {
      const response = await api.patch(`/organizations/${organizationId}/members/${memberId}/`, {
        role: newRole,
      });
      if (response.data.success) {
        setMembers(members.map((m) => (m.id === memberId ? { ...m, role: newRole as any } : m)));
      }
    } catch (err) {
      console.error('Failed to update role:', err);
    }
  };

  const handleToggleNotifications = async (memberId: string, currentValue: boolean) => {
    try {
      const response = await api.patch(`/organizations/${organizationId}/members/${memberId}/`, {
        receives_notifications: !currentValue,
      });
      if (response.data.success) {
        setMembers(
          members.map((m) =>
            m.id === memberId ? { ...m, receives_notifications: !currentValue } : m
          )
        );
      }
    } catch (err) {
      console.error('Failed to update notifications:', err);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!confirm('Are you sure you want to remove this team member?')) return;

    try {
      await api.delete(`/organizations/${organizationId}/members/${memberId}/`);
      setMembers(members.filter((m) => m.id !== memberId));
    } catch (err) {
      console.error('Failed to remove member:', err);
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'owner':
        return 'default';
      case 'admin':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary-500" />
              Team Members
            </CardTitle>
            <Button variant="outline" size="sm" onClick={() => setShowInvite(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Invite Member
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Invite Form */}
          {showInvite && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
              <h4 className="font-medium text-gray-900">Invite New Member</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="colleague@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as 'admin' | 'member')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {ROLES.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label} - {role.description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowInvite(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleInvite} disabled={inviting || !inviteEmail}>
                  {inviting ? 'Sending...' : 'Send Invite'}
                </Button>
              </div>
            </div>
          )}

          {/* Members List */}
          {members.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No team members yet</p>
              <p className="text-sm">Invite colleagues to help manage your organization</p>
            </div>
          ) : (
            <div className="space-y-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-medium">
                        {member.user.first_name?.[0] || member.user.email[0].toUpperCase()}
                      </span>
                    </div>

                    {/* Info */}
                    <div>
                      <div className="font-medium text-gray-900">
                        {member.user.first_name
                          ? `${member.user.first_name} ${member.user.last_name}`
                          : member.user.email}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {member.user.email}
                        </span>
                        {member.user.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {member.user.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Role Badge */}
                    <Badge variant={getRoleBadgeVariant(member.role)} size="sm">
                      <Shield className="h-3 w-3 mr-1" />
                      {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                    </Badge>

                    {/* Notifications Toggle */}
                    <button
                      onClick={() => handleToggleNotifications(member.id, member.receives_notifications)}
                      className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${
                        member.receives_notifications
                          ? 'bg-green-50 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                      title={member.receives_notifications ? 'Receiving notifications' : 'Not receiving notifications'}
                    >
                      {member.receives_notifications ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                      Notify
                    </button>

                    {/* Role Change (not for owner) */}
                    {member.role !== 'owner' && (
                      <select
                        value={member.role}
                        onChange={(e) => handleUpdateRole(member.id, e.target.value)}
                        className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                      >
                        {ROLES.map((role) => (
                          <option key={role.value} value={role.value}>
                            {role.label}
                          </option>
                        ))}
                      </select>
                    )}

                    {/* Remove (not for owner) */}
                    {member.role !== 'owner' && (
                      <button
                        onClick={() => handleRemoveMember(member.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove member"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Permissions Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Role Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Badge variant="default" size="sm">Owner</Badge>
              <p className="text-sm text-gray-600">
                Full control including billing, team management, and organization deletion.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="secondary" size="sm">Admin</Badge>
              <p className="text-sm text-gray-600">
                Manage settings, calendar, team members. Cannot access billing or delete organization.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="outline" size="sm">Member</Badge>
              <p className="text-sm text-gray-600">
                View calls, manage appointments, receive notifications. No access to settings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
