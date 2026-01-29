export interface AIModel {
  id: string;
  name: string;
  provider: string;
  parameters: string;
  useCase: string[];
  performance: 'fast' | 'balanced' | 'powerful';
  description: string;
}

export const aiModels: AIModel[] = [
  {
    id: 'llama-3-70b',
    name: 'Llama 3 70B',
    provider: 'Meta',
    parameters: '70B',
    useCase: ['coding', 'chat', 'debugging'],
    performance: 'powerful',
    description: 'Meta\'s most capable open model. Excellent for complex coding tasks.',
  },
  {
    id: 'codellama-34b',
    name: 'CodeLlama 34B',
    provider: 'Meta',
    parameters: '34B',
    useCase: ['coding', 'completion'],
    performance: 'balanced',
    description: 'Specialized for code generation and completion.',
  },
  {
    id: 'mistral-7b',
    name: 'Mistral 7B',
    provider: 'Mistral AI',
    parameters: '7B',
    useCase: ['coding', 'chat'],
    performance: 'fast',
    description: 'Fast and efficient. Great for quick completions.',
  },
  {
    id: 'deepseek-coder-33b',
    name: 'DeepSeek Coder 33B',
    provider: 'DeepSeek',
    parameters: '33B',
    useCase: ['coding', 'completion'],
    performance: 'balanced',
    description: 'Trained specifically on code. Excellent for code understanding.',
  },
  {
    id: 'phi-3',
    name: 'Phi-3',
    provider: 'Microsoft',
    parameters: '3.8B',
    useCase: ['completion', 'chat'],
    performance: 'fast',
    description: 'Small but mighty. Perfect for low-resource environments.',
  },
  {
    id: 'starcoder2-15b',
    name: 'StarCoder2 15B',
    provider: 'BigCode',
    parameters: '15B',
    useCase: ['coding', 'completion'],
    performance: 'balanced',
    description: 'Open-source code model trained on 600+ languages.',
  },
];
