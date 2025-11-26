"use client";

import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Zap } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { Combobox } from "@/components/ui/combobox";
import { useState } from "react";

export default function AIGeneratePage() {
  const [category, setCategory] = useState("");
  const categoryOptions = CATEGORIES.map((cat) => ({
    value: cat.slug,
    label: cat.name,
  }));

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold">AI Article Generator</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Let AI help you generate articles on any topic
        </p>
      </motion.div>

      <motion.form
        variants={itemVariants}
        className="space-y-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6"
      >
        <div>
          <Label htmlFor="topic">Topic or Event</Label>
          <Input
            id="topic"
            placeholder="e.g., Latest AI breakthrough, Climate summit, etc."
            className="mt-2"
            required
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Combobox
            options={categoryOptions}
            value={category}
            onValueChange={setCategory}
            placeholder="Select a category"
            searchPlaceholder="Search categories..."
            emptyMessage="No category found."
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="tone">Tone</Label>
          <Select>
            <SelectTrigger className="mt-2 w-full ">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="creative">Creative</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="keywords">Keywords (comma-separated)</Label>
          <Input
            id="keywords"
            placeholder="Include specific terms or people"
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="length">Article Length</Label>
          <Select>
            <SelectTrigger className="mt-2 w-full ">
              <SelectValue placeholder="Select length" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short (3-5 min)</SelectItem>
              <SelectItem value="medium">Medium (5-10 min)</SelectItem>
              <SelectItem value="long">Long (10+ min)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="context">Additional Context</Label>
          <Textarea
            id="context"
            placeholder="Any additional information or preferences..."
            className="mt-2"
            rows={4}
          />
        </div>

        <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
          <Button className="w-full">
            <Zap className="w-4 h-4 mr-2" />
            Generate Article
          </Button>
        </div>
      </motion.form>

      <motion.div
        variants={itemVariants}
        className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6"
      >
        <p className="text-sm text-blue-900 dark:text-blue-300">
          Our AI will search the internet, gather relevant sources, and write a
          comprehensive article based on your input. Generated articles are
          always marked as "AI-Generated" for transparency.
        </p>
      </motion.div>
    </motion.div>
  );
}
