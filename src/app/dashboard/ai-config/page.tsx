'use client';

import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/lib/animation-variants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AIConfigPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-8 max-w-2xl"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold">AI Configuration</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configure AI agent behavior and settings
        </p>
      </motion.div>

      {/* AI Provider */}
      <motion.section variants={itemVariants} className="space-y-4">
        <div>
          <h2 className="text-xl font-bold mb-4">LLM Provider</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="provider">Select Provider</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="OpenAI" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai">OpenAI (GPT-4)</SelectItem>
                  <SelectItem value="anthropic">Anthropic (Claude)</SelectItem>
                  <SelectItem value="google">Google (Gemini)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter API key"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="model">Model</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="gpt-4" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>Save Provider Settings</Button>
          </div>
        </div>
      </motion.section>

      <Separator />

      {/* Generation Settings */}
      <motion.section variants={itemVariants} className="space-y-4">
        <h2 className="text-xl font-bold">Generation Settings</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="temperature">Temperature (Creativity)</Label>
            <Input
              id="temperature"
              type="range"
              min="0"
              max="1"
              step="0.1"
              defaultValue="0.7"
              className="mt-2"
            />
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Higher values = more creative, lower values = more factual
            </p>
          </div>
          <div>
            <Label htmlFor="maxTokens">Max Tokens</Label>
            <Input
              id="maxTokens"
              type="number"
              defaultValue="2000"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="sources">Minimum Sources</Label>
            <Input
              id="sources"
              type="number"
              defaultValue="3"
              className="mt-2"
            />
          </div>
          <Button variant="outline">Save Settings</Button>
        </div>
      </motion.section>

      <Separator />

      {/* Caching Settings */}
      <motion.section variants={itemVariants} className="space-y-4">
        <h2 className="text-xl font-bold">Caching & Storage</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="cacheTTL">Cache TTL (hours)</Label>
            <Input
              id="cacheTTL"
              type="number"
              defaultValue="24"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="vectorDb">Vector Database</Label>
            <Select>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Pinecone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pinecone">Pinecone</SelectItem>
                <SelectItem value="weaviate">Weaviate</SelectItem>
                <SelectItem value="qdrant">Qdrant</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline">Save Caching Settings</Button>
        </div>
      </motion.section>
    </motion.div>
  );
}
