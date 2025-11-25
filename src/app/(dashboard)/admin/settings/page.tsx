'use client';

import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/lib/animation-variants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
        <h1 className="text-3xl font-bold">Platform Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configure platform-wide settings
        </p>
      </motion.div>

      {/* General Settings */}
      <motion.section variants={itemVariants} className="space-y-4">
        <h2 className="text-xl font-bold">General</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              defaultValue="Chronicle AI"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="siteDescription">Site Description</Label>
            <Input
              id="siteDescription"
              defaultValue="Your AI-Powered News Intelligence Platform"
              className="mt-2"
            />
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            Save Changes
          </Button>
        </div>
      </motion.section>

      <Separator />

      {/* Featured Content */}
      <motion.section variants={itemVariants} className="space-y-4">
        <h2 className="text-xl font-bold">Featured Content</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Manage featured articles and topics on the homepage
        </p>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span>Show featured section</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span>Show trending topics</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span>Show latest articles grid</span>
          </label>
          <Button variant="outline">Save Preferences</Button>
        </div>
      </motion.section>

      <Separator />

      {/* Maintenance */}
      <motion.section variants={itemVariants} className="space-y-4">
        <h2 className="text-xl font-bold">Maintenance</h2>
        <div className="space-y-3">
          <Button variant="outline" className="w-full">
            Clear Cache
          </Button>
          <Button variant="outline" className="w-full">
            Rebuild Search Index
          </Button>
          <Button variant="outline" className="w-full">
            Export Database
          </Button>
        </div>
      </motion.section>
    </motion.div>
  );
}
