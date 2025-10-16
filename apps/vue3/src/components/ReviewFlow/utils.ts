import dagre from 'dagre'

export const dagreLayout = (graphData: any) => {
  return new Promise((resolve) => {
    const g = new dagre.graphlib.Graph()
    g.setDefaultEdgeLabel(() => ({}))
    g.setGraph({
      rankdir: 'LR', // 布局方向: TB从上到下, LR从左到右
      nodesep: 30,   // 节点间距
      ranksep: 40,   // 层级间距
      marginx: 0,
      marginy: 10
    })

    // 设置节点
    graphData.nodes.forEach(node => {
      g.setNode(node.id, {
        width: 100,
        height: 60
      })
    })

    // 设置边
    graphData.edges.forEach(edge => {
      g.setEdge(edge.sourceNodeId, edge.targetNodeId)
    })

    // 执行布局计算
    dagre.layout(g)

    // 转换布局结果
    const layoutNodes = graphData.nodes.map(node => {
      const nodeWithPos = g.node(node.id)
      return {
        ...node,
        x: nodeWithPos.x,
        y: nodeWithPos.y,
        properties: {
          ...node.properties
        }
      }
    })

    resolve({
      nodes: layoutNodes,
      edges: graphData.edges
    })
  })
}