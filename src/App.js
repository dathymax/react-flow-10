import ReactFlow, { MiniMap, Controls } from 'react-flow-renderer';

function App({ nodes, edges, onNodesChange, onEdgesChange, onConnect }) {
  return (
      <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
  );
}

export default App