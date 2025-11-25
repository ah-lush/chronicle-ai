'use client';

import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/lib/animation-variants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-8 max-w-2xl"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </motion.div>

      {/* Profile Section */}
      <motion.section variants={itemVariants} className="space-y-4">
        <div>
          <h2 className="text-xl font-bold mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                defaultValue="Sarah Chen"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                defaultValue="sarah@example.com"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                defaultValue="Tech journalist and AI enthusiast"
                className="mt-2"
                rows={4}
              />
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              Save Changes
            </Button>
          </div>
        </div>
      </motion.section>

      <Separator />

      {/* Notification Preferences */}
      <motion.section variants={itemVariants} className="space-y-4">
        <h2 className="text-xl font-bold">Notification Preferences</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span>Email me when my articles get comments</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span>Email me about new followers</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4" />
            <span>Email me about platform updates</span>
          </label>
          <Button variant="outline">Save Preferences</Button>
        </div>
      </motion.section>

      <Separator />

      {/* Danger Zone */}
      <motion.section variants={itemVariants} className="space-y-4">
        <h2 className="text-xl font-bold text-red-600">Danger Zone</h2>
        <div className="p-4 border border-red-200 dark:border-red-900 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Deleting your account is permanent and cannot be undone.
          </p>
          <Button variant="destructive">Delete Account</Button>
        </div>
      </motion.section>
    </motion.div>
  );
}
