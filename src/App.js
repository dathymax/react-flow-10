import React, {useCallback, useRef, useState} from 'react';
import ReactFlow, {
    addEdge,
    Controls, MarkerType,
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

    const onConnect = (params) =>
        setEdges((eds) =>
            addEdge({ ...params, type: 'floating', markerEnd: { type: MarkerType.Arrow } }, eds)
        );

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

    const addCircleStartHandler = () => {
        const newNode = {
            id: `${Date.now()}`,
            data: { label: `${name}` },
            type: "circleStart",
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

    const addCircleEndHandler = () => {
        const newNode = {
            id: `${Date.now()}`,
            data: { label: `${name}` },
            type: "circleEnd",
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

    const addSquareHandler = () => {
        const newNode = {
            id: `${Date.now()}`,
            data: { label: `${name}` },
            type: "square",
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
                <Sidebar
                    nodes={nodes}
                    setNodes={setNodes}
                    name={name}
                    setName={setName}
                    addRectangleHandler={addRectangleHandler}
                    addCircleStartHandler={addCircleStartHandler}
                    addCircleEndHandler={addCircleEndHandler}
                    addSquareHandler={addSquareHandler}
                    addTextHandler={addTextHandler}
                />
                <MiniMap nodeColor={(node) => {
                    switch (node.type) {
                        case "rectangle":
                            return "red";
                        case "circle":
                            return "#00ff00";
                        case "triangle":
                            return "rgb(0,0,255)";
                        default:
                            return "#eee";
                    }
                }}/>
            </ReactFlowProvider>
        </div>
    );
};

export default DnDFlow;
