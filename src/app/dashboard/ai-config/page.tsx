"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Brain,
  Key,
  Sliders,
  Database,
  Zap,
  CheckCircle2,
  Info,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

export default function AIConfigPage() {
  const [temperature, setTemperature] = useState([0.7]);
  const [saved, setSaved] = useState<string | null>(null);

  const handleSave = (section: string) => {
    setSaved(section);
    setTimeout(() => setSaved(null), 2000);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-6 max-w-5xl mx-auto"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              AI Configuration
            </h1>
            <p className="text-muted-foreground">
              Configure your AI agent behavior and model settings
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-500/10 rounded-md">
                <Zap className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <CardTitle>LLM Provider</CardTitle>
                <CardDescription>
                  Configure your language model provider and API credentials
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="provider" className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-muted-foreground" />
                  Provider
                </Label>
                <Select defaultValue="openai">
                  <SelectTrigger id="provider">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai">OpenAI (GPT-4)</SelectItem>
                    <SelectItem value="anthropic">
                      Anthropic (Claude)
                    </SelectItem>
                    <SelectItem value="google">Google (Gemini)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model" className="flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-muted-foreground" />
                  Model
                </Label>
                <Select defaultValue="gpt-4">
                  <SelectTrigger id="model">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                    <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                    <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiKey" className="flex items-center gap-2">
                <Key className="h-4 w-4 text-muted-foreground" />
                API Key
              </Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="sk-••••••••••••••••"
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Info className="h-3 w-3" />
                Your API key is encrypted and stored securely
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => handleSave("provider")}
              className="w-full sm:w-auto"
            >
              {saved === "provider" ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Saved!
                </>
              ) : (
                "Save Provider Settings"
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-500/10 rounded-md">
                <Sliders className="h-4 w-4 text-purple-500" />
              </div>
              <div>
                <CardTitle>Generation Settings</CardTitle>
                <CardDescription>
                  Fine-tune AI output quality and behavior
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="temperature">Temperature</Label>
                  <span className="text-sm font-medium text-muted-foreground">
                    {temperature[0].toFixed(1)}
                  </span>
                </div>
                <Slider
                  id="temperature"
                  min={0}
                  max={1}
                  step={0.1}
                  value={temperature}
                  onValueChange={setTemperature}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>More Precise</span>
                  <span>More Creative</span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="maxTokens">Max Tokens</Label>
                  <Input
                    id="maxTokens"
                    type="number"
                    defaultValue="2000"
                    min="100"
                    max="8000"
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum response length
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sources">Minimum Sources</Label>
                  <Input
                    id="sources"
                    type="number"
                    defaultValue="3"
                    min="1"
                    max="10"
                  />
                  <p className="text-xs text-muted-foreground">
                    Sources to cite per article
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => handleSave("generation")}
              variant="outline"
              className="w-full sm:w-auto"
            >
              {saved === "generation" ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Saved!
                </>
              ) : (
                "Save Generation Settings"
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-500/10 rounded-md">
                <Database className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <CardTitle>Caching & Storage</CardTitle>
                <CardDescription>
                  Optimize performance with caching and vector storage
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cacheTTL">Cache TTL (hours)</Label>
                <Input
                  id="cacheTTL"
                  type="number"
                  defaultValue="24"
                  min="1"
                  max="168"
                />
                <p className="text-xs text-muted-foreground">
                  How long to cache responses
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vectorDb">Vector Database</Label>
                <Select defaultValue="pinecone">
                  <SelectTrigger id="vectorDb">
                    <SelectValue placeholder="Select database" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pinecone">Pinecone</SelectItem>
                    <SelectItem value="weaviate">Weaviate</SelectItem>
                    <SelectItem value="qdrant">Qdrant</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  For semantic search
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => handleSave("caching")}
              variant="outline"
              className="w-full sm:w-auto"
            >
              {saved === "caching" ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Saved!
                </>
              ) : (
                "Save Caching Settings"
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}
