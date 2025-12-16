import { User, Mail, Phone, MapPin, Building, Edit2, Save } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Sarah Anderson',
    email: 'sarah.anderson@company.com',
    phone: '+1-555-1234',
    title: 'Sales Director',
    company: 'TechVenture Inc',
    location: 'San Francisco, CA',
    bio: 'Passionate about building high-performing sales teams and driving revenue growth.',
    timezone: 'PST (UTC-8)',
    avatar: '👩‍💼'
  });

  const [tempProfile, setTempProfile] = useState(profile);

  const handleEdit = () => {
    setTempProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-[#E5E7EB] mb-1">Profile</h2>
          <p className="text-[#94a3b8] font-medium">Manage your account settings and preferences</p>
        </div>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-all font-medium focus:ring-2 focus:ring-[#2563EB]/50"
          >
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-8">
        {/* Avatar and Name */}
        <div className="mb-8 flex items-start gap-6">
          <div className="text-6xl">{profile.avatar}</div>
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={tempProfile.name}
                onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                className="w-full text-3xl font-bold bg-[#1e293b] text-[#E5E7EB] rounded px-3 py-2 mb-2"
              />
            ) : (
              <h3 className="text-3xl font-bold text-[#E5E7EB] mb-2">{profile.name}</h3>
            )}
            {isEditing ? (
              <input
                type="text"
                value={tempProfile.title}
                onChange={(e) => setTempProfile({ ...tempProfile, title: e.target.value })}
                className="w-full text-lg bg-[#1e293b] text-[#94a3b8] rounded px-3 py-2"
              />
            ) : (
              <p className="text-lg text-[#94a3b8]">{profile.title}</p>
            )}
          </div>
        </div>

        {/* Profile Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#94a3b8] mb-2">
              <Mail className="w-4 h-4" />
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                value={tempProfile.email}
                onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                className="w-full bg-[#1e293b] text-[#E5E7EB] rounded px-3 py-2 border border-[#334155]"
              />
            ) : (
              <p className="text-[#E5E7EB]">{profile.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#94a3b8] mb-2">
              <Phone className="w-4 h-4" />
              Phone
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={tempProfile.phone}
                onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                className="w-full bg-[#1e293b] text-[#E5E7EB] rounded px-3 py-2 border border-[#334155]"
              />
            ) : (
              <p className="text-[#E5E7EB]">{profile.phone}</p>
            )}
          </div>

          {/* Company */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#94a3b8] mb-2">
              <Building className="w-4 h-4" />
              Company
            </label>
            {isEditing ? (
              <input
                type="text"
                value={tempProfile.company}
                onChange={(e) => setTempProfile({ ...tempProfile, company: e.target.value })}
                className="w-full bg-[#1e293b] text-[#E5E7EB] rounded px-3 py-2 border border-[#334155]"
              />
            ) : (
              <p className="text-[#E5E7EB]">{profile.company}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#94a3b8] mb-2">
              <MapPin className="w-4 h-4" />
              Location
            </label>
            {isEditing ? (
              <input
                type="text"
                value={tempProfile.location}
                onChange={(e) => setTempProfile({ ...tempProfile, location: e.target.value })}
                className="w-full bg-[#1e293b] text-[#E5E7EB] rounded px-3 py-2 border border-[#334155]"
              />
            ) : (
              <p className="text-[#E5E7EB]">{profile.location}</p>
            )}
          </div>

          {/* Timezone */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#94a3b8] mb-2">
              🌍 Timezone
            </label>
            {isEditing ? (
              <select
                value={tempProfile.timezone}
                onChange={(e) => setTempProfile({ ...tempProfile, timezone: e.target.value })}
                className="w-full bg-[#1e293b] text-[#E5E7EB] rounded px-3 py-2 border border-[#334155]"
              >
                <option>PST (UTC-8)</option>
                <option>EST (UTC-5)</option>
                <option>CST (UTC-6)</option>
                <option>MST (UTC-7)</option>
              </select>
            ) : (
              <p className="text-[#E5E7EB]">{profile.timezone}</p>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="mb-8">
          <label className="flex items-center gap-2 text-sm font-semibold text-[#94a3b8] mb-2">
            <User className="w-4 h-4" />
            Bio
          </label>
          {isEditing ? (
            <textarea
              value={tempProfile.bio}
              onChange={(e) => setTempProfile({ ...tempProfile, bio: e.target.value })}
              className="w-full bg-[#1e293b] text-[#E5E7EB] rounded px-3 py-2 border border-[#334155] h-24"
            />
          ) : (
            <p className="text-[#E5E7EB]">{profile.bio}</p>
          )}
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-[#1e293b] text-[#E5E7EB] rounded-lg hover:bg-[#334155] transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition-all"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Additional Settings */}
      <div className="mt-8 bg-[#0f172a] border border-[#1e293b] rounded-xl p-8">
        <h3 className="text-xl font-bold text-[#E5E7EB] mb-6">Additional Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#1e293b] rounded-lg">
            <div>
              <p className="font-semibold text-[#E5E7EB]">Email Notifications</p>
              <p className="text-sm text-[#64748b]">Receive updates about campaigns and leads</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between p-4 bg-[#1e293b] rounded-lg">
            <div>
              <p className="font-semibold text-[#E5E7EB]">Two-Factor Authentication</p>
              <p className="text-sm text-[#64748b]">Add an extra layer of security</p>
            </div>
            <input type="checkbox" className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between p-4 bg-[#1e293b] rounded-lg">
            <div>
              <p className="font-semibold text-[#E5E7EB]">Marketing Communications</p>
              <p className="text-sm text-[#64748b]">Receive product updates and tips</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
