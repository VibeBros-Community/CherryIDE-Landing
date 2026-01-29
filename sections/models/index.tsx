'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { aiModels, type AIModel } from '@/data/models';
import { Zap, Gauge, Rocket } from 'lucide-react';

const performanceIcons = {
  fast: Zap,
  balanced: Gauge,
  powerful: Rocket,
};

const performanceColors = {
  fast: 'text-green-500 bg-green-500/10',
  balanced: 'text-blue-500 bg-blue-500/10',
  powerful: 'text-purple-500 bg-purple-500/10',
};

export default function Models() {
  const [filter, setFilter] = useState<string>('all');

  const filteredModels = filter === 'all'
    ? aiModels
    : aiModels.filter(model => model.useCase.includes(filter));

  const filters = [
    { label: 'All Models', value: 'all' },
    { label: 'Coding', value: 'coding' },
    { label: 'Completion', value: 'completion' },
    { label: 'Chat', value: 'chat' },
  ];

  return (
    <section id="models" className="py-24 bg-dark-surface relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your AI Model
          </h2>
          <p className="text-xl text-gray-400">
            Run the best open-source AI models locally. Switch on-the-fly based on your needs.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((f) => (
            <Button
              key={f.value}
              variant={filter === f.value ? 'default' : 'secondary'}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </Button>
          ))}
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredModels.map((model) => {
            const PerformanceIcon = performanceIcons[model.performance];
            const performanceColor = performanceColors[model.performance];

            return (
              <Card key={model.id} className="group hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <CardTitle className="text-xl mb-1">{model.name}</CardTitle>
                      <p className="text-sm text-gray-500">{model.provider}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${performanceColor}`}>
                      <PerformanceIcon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-dark-border rounded text-xs text-gray-400">
                      {model.parameters}
                    </span>
                    <span className="px-2 py-1 bg-cherry-500/10 text-cherry-500 rounded text-xs capitalize">
                      {model.performance}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {model.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {model.useCase.map((useCase) => (
                      <span
                        key={useCase}
                        className="px-2 py-1 bg-dark-bg rounded-full text-xs text-gray-400"
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
