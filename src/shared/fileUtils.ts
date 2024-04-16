const getSummarizedPath = (path: string): string => {
  const nodes: string[] = path.split('/')
  const newNodes: string[] = []
  for (const node of nodes) {
    if (node === '.') continue
    else if (node === '..') {
      newNodes.pop()
    } else {
      newNodes.push(node)
    }
  }
  return newNodes.join('/')
}

export const summarizePath = (...paths: string[]): string => {
  return paths
    .map((path: string) => {
      getSummarizedPath(path)
    })
    .join('/')
}

export const lastNodeOf = (path: string): string => {
  return getSummarizedPath(path).split('/').pop() ?? ''
}
