'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useRole } from '@/components/admin/AdminGuard';

interface TeamMember {
  id: string;
  email: string;
  role: 'admin' | 'content_manager' | 'viewer';
  created_at: string;
}

export default function SettingsPage() {
  const role = useRole();
  const router = useRouter();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwStatus, setPwStatus] = useState<string | null>(null);
  const [pwSaving, setPwSaving] = useState(false);

  const [team, setTeam] = useState<TeamMember[] | null>(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'content_manager' | 'viewer'>('content_manager');
  const [inviting, setInviting] = useState(false);
  const [inviteStatus, setInviteStatus] = useState<string | null>(null);

  useEffect(() => {
    if (role && role !== 'admin') router.replace('/admin');
  }, [role, router]);

  useEffect(() => {
    if (role !== 'admin' || !supabase) return;
    loadTeam();
  }, [role]);

  function loadTeam() {
    supabase!
      .from('admin_users')
      .select('id, email, role, created_at')
      .order('created_at', { ascending: true })
      .then(({ data }) => setTeam(data ?? []));
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPwStatus(null);
    if (newPassword.length < 8) {
      setPwStatus('Password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwStatus('Passwords do not match.');
      return;
    }
    setPwSaving(true);
    const { error } = await supabase!.auth.updateUser({ password: newPassword });
    setPwSaving(false);
    if (error) {
      setPwStatus(error.message);
      return;
    }
    setPwStatus('Password updated.');
    setNewPassword('');
    setConfirmPassword('');
  }

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setInviteStatus(null);
    if (!inviteEmail.trim()) return;
    setInviting(true);
    const { data, error } = await supabase!.functions.invoke('invite-team-member', {
      body: { email: inviteEmail.trim(), role: inviteRole },
    });
    setInviting(false);
    if (error || data?.error) {
      setInviteStatus(data?.error || error?.message || 'Invite failed.');
      return;
    }
    setInviteStatus(`Invited ${inviteEmail}.`);
    setInviteEmail('');
    loadTeam();
  }

  async function changeRole(id: string, newRole: TeamMember['role']) {
    const { error } = await supabase!.from('admin_users').update({ role: newRole }).eq('id', id);
    if (error) alert(error.message);
    else loadTeam();
  }

  async function removeMember(id: string, email: string) {
    if (!window.confirm(`Remove ${email} from the team? Their login will stop working for this dashboard.`)) return;
    const { error } = await supabase!.from('admin_users').delete().eq('id', id);
    if (error) alert(error.message);
    else loadTeam();
  }

  if (role && role !== 'admin') return null;

  return (
    <main style={{ padding: '48px 24px', maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)', color: 'var(--white)', lineHeight: 1, marginBottom: '40px' }}>
        SETTINGS
      </h1>

      {/* Change password */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={sectionTitle}>Change Password</h2>
        <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '360px' }}>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
            style={input}
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            style={input}
          />
          {pwStatus && (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: pwStatus === 'Password updated.' ? '#4a9e7a' : '#c94a4a' }}>
              {pwStatus}
            </p>
          )}
          <button type="submit" disabled={pwSaving} className="btn btn-orange" style={{ alignSelf: 'flex-start' }}>
            {pwSaving ? 'Saving…' : 'Update Password'}
          </button>
        </form>
      </section>

      {/* Team — admin only */}
      {role === 'admin' && (
        <section>
          <h2 style={sectionTitle}>Team</h2>

          {team === null && <p style={{ color: 'rgba(245,240,232,0.4)', fontFamily: 'var(--font-body)', fontSize: '13px' }}>Loading…</p>}

          {team && team.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '24px' }}>
              {team.map((m) => (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 0',
                    borderBottom: '1px solid var(--grey)',
                    flexWrap: 'wrap',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--white)' }}>{m.email}</span>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <select
                      value={m.role}
                      onChange={(e) => changeRole(m.id, e.target.value as TeamMember['role'])}
                      style={{ ...input, width: 'auto', padding: '6px 8px', fontSize: '11px' }}
                    >
                      <option value="admin">Admin</option>
                      <option value="content_manager">Content Manager</option>
                      <option value="viewer">Viewer</option>
                    </select>
                    <button
                      onClick={() => removeMember(m.id, m.email)}
                      className="btn btn-outline"
                      style={{ fontSize: '9px', padding: '8px 10px', background: 'transparent', cursor: 'pointer', borderColor: '#c94a4a', color: '#c94a4a' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleInvite} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="Email to invite"
              style={{ ...input, flex: 1, minWidth: '200px' }}
            />
            <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value as typeof inviteRole)} style={{ ...input, width: 'auto' }}>
              <option value="admin">Admin</option>
              <option value="content_manager">Content Manager</option>
              <option value="viewer">Viewer</option>
            </select>
            <button type="submit" disabled={inviting} className="btn btn-orange">
              {inviting ? 'Inviting…' : 'Invite'}
            </button>
          </form>
          {inviteStatus && (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(245,240,232,0.5)', marginTop: '10px' }}>
              {inviteStatus}
            </p>
          )}
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(245,240,232,0.3)', marginTop: '16px', lineHeight: 1.6 }}>
            Invited members get an email to set their own password — nobody has to create or share one for them.
            Content Managers can create and edit posts but can&apos;t delete them. Viewers can see everything
            (including drafts and private links) but can&apos;t change anything.
          </p>
        </section>
      )}
    </main>
  );
}

const sectionTitle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '10px',
  letterSpacing: '2.5px',
  textTransform: 'uppercase',
  color: 'var(--orange)',
  marginBottom: '16px',
};

const input: React.CSSProperties = {
  width: '100%',
  background: '#0d0d0d',
  border: '1px solid var(--grey)',
  color: 'var(--white)',
  fontFamily: 'var(--font-body)',
  fontSize: '13px',
  padding: '10px 12px',
  outline: 'none',
};
