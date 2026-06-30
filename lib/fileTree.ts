export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  extension?: string;
  children?: FileNode[];
  content?: string;
}

export const fileTree: FileNode = {
  name: 'ARSLAN',
  type: 'folder',
  children: [
    {
      name: 'about',
      type: 'folder',
      children: [
        { name: 'README.md', type: 'file', extension: 'md', content: 'readme' },
      ],
    },
    {
      name: 'skills',
      type: 'folder',
      children: [
        { name: 'python.json', type: 'file', extension: 'json', content: 'skills' },
        { name: 'ml.ts', type: 'file', extension: 'ts', content: 'skills' },
        { name: 'sql.sql', type: 'file', extension: 'sql', content: 'skills' },
        { name: 'aws.yml', type: 'file', extension: 'yml', content: 'skills' },
      ],
    },
    {
      name: 'projects',
      type: 'folder',
      children: [
        { name: 'ai_chatbot.py', type: 'file', extension: 'py', content: 'projects' },
        { name: 'portfolio.tsx', type: 'file', extension: 'tsx', content: 'projects' },
        { name: 'recommender.ipynb', type: 'file', extension: 'ipynb', content: 'projects' },
        { name: 'fraud_detection.ipynb', type: 'file', extension: 'ipynb', content: 'projects' },
      ],
    },
    {
      name: 'experience',
      type: 'folder',
      children: [
        { name: 'internships.md', type: 'file', extension: 'md', content: 'experience' },
      ],
    },
    {
      name: 'education',
      type: 'folder',
      children: [
        { name: 'iitm.md', type: 'file', extension: 'md', content: 'education' },
      ],
    },
    {
      name: 'contact',
      type: 'folder',
      children: [
        { name: 'social.ts', type: 'file', extension: 'ts', content: 'contact' },
      ],
    },
  ],
};

export function getFileIcon(extension?: string): { icon: string; color: string } {
  switch (extension) {
    case 'md':
      return { icon: 'markdown', color: '#519ABA' };
    case 'py':
      return { icon: 'python', color: '#3572A5' };
    case 'ts':
    case 'tsx':
      return { icon: 'typescript', color: '#3178C6' };
    case 'js':
    case 'jsx':
      return { icon: 'javascript', color: '#F7DF1E' };
    case 'json':
      return { icon: 'json', color: '#CBB148' };
    case 'sql':
      return { icon: 'database', color: '#E38C00' };
    case 'yml':
    case 'yaml':
      return { icon: 'yaml', color: '#CB171E' };
    case 'ipynb':
      return { icon: 'notebook', color: '#F37626' };
    case 'css':
      return { icon: 'css', color: '#563D7C' };
    case 'html':
      return { icon: 'html', color: '#E34C26' };
    default:
      return { icon: 'file', color: '#858585' };
  }
}

export function getLanguageName(extension?: string): string {
  switch (extension) {
    case 'md': return 'Markdown';
    case 'py': return 'Python';
    case 'ts': return 'TypeScript';
    case 'tsx': return 'TypeScript React';
    case 'js': return 'JavaScript';
    case 'jsx': return 'JavaScript React';
    case 'json': return 'JSON';
    case 'sql': return 'SQL';
    case 'yml':
    case 'yaml': return 'YAML';
    case 'ipynb': return 'Jupyter Notebook';
    case 'css': return 'CSS';
    case 'html': return 'HTML';
    default: return 'Plain Text';
  }
}

export function flattenFiles(node: FileNode, path: string = ''): { name: string; path: string; extension?: string; content?: string }[] {
  const currentPath = path ? `${path}/${node.name}` : node.name;
  if (node.type === 'file') {
    return [{ name: node.name, path: currentPath, extension: node.extension, content: node.content }];
  }
  return (node.children || []).flatMap(child => flattenFiles(child, currentPath));
}
