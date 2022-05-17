import React, {useCallback, useRef, useState} from 'react';
import ReactFlow, {
    addEdge,
    Controls,
    MiniMap,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
} from 'react-flow-renderer';

import Sidebar from './Sidebar';

import './index.css';
import {nodeTypes} from "./components/Nodes";

const initialNodes = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [name, setName] = useState("");

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: {label: `${type} node`},
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );

    const addRectangleHandler = () => {
        const newNode = {
            id: `${Date.now()}`,
            data: { label: `${name}` },
            type: "rectangle",
            position: {
                x: 0,
                y: 0
            }
        };
        newNode.data = { ...newNode.data, id: `${newNode.id}` };

        setNodes((prev) => {
            return [...prev, newNode];
        });
        setName("");
    };

    const addCircleHandler = () => {
        const newNode = {
            id: `${Date.now()}`,
            data: { label: `${name}` },
            type: "circle",
            position: {
                x: 0,
                y: 0
            }
        };
        newNode.data = { ...newNode.data, id: `${newNode.id}` };

        setNodes((prev) => {
            return [...prev, newNode];
        });
        setName("");
    };

    const addTriangleHandler = () => {
        const newNode = {
            id: `${Date.now()}`,
            data: { label: `${name}` },
            type: "triangle",
            position: {
                x: 0,
                y: 0
            }
        };
        newNode.data = { ...newNode.data, id: `${newNode.id}` };

        setNodes((prev) => {
            return [...prev, newNode];
        });
        setName("");
    };

    const addTextHandler = () => {
        const newNode = {
            id: `${Date.now()}`,
            data: { label: `${name}` },
            type: "text",
            position: {
                x: 0,
                y: 0
            }
        };
        newNode.data = { ...newNode.data, id: `${newNode.id}` };

        setNodes((prev) => {
            return [...prev, newNode];
        });
        setName("");
    };

    return (
        <div className="dndflow">
            <ReactFlowProvider>
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        nodeTypes={nodeTypes}
                        onDragOver={onDragOver}
                        fitView
                        style={{width: "100%", height: "100vh"}}
                    >
                        <Controls/>
                    </ReactFlow>
                </div>
                <Sidebar nodes={nodes} setNodes={setNodes}/>
                <MiniMap/>
                <div>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Enter new node name"
                    />

                    <button type="button" onClick={addRectangleHandler}>
                        Create Rectangle
                    </button>

                    <button type="button" onClick={addCircleHandler}>
                        Create Circle
                    </button>

                    <button type="button" onClick={addTriangleHandler}>
                        Create Triangle
                    </button>

                    <button type="button" onClick={addTextHandler}>
                        Plain text
                    </button>
                </div>

                {/*<div>*/}
                {/*    <input*/}
                {/*        value={newName}*/}
                {/*        onChange={(e) => setNewName(e.target.value)}*/}
                {/*        type="text"*/}
                {/*    />*/}

                {/*    <button type="button" onClick={updateNodeHandler}>*/}
                {/*        Update*/}
                {/*    </button>*/}
                {/*</div>*/}

                {/*<button type="button" onClick={saveChangesHandler}>*/}
                {/*    Save changes*/}
                {/*</button>*/}
            </ReactFlowProvider>
        </div>
    );
};

export default DnDFlow;
