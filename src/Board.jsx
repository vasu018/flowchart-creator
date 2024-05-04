import { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    MarkerType
} from 'reactflow';
import { useSelector } from 'react-redux';
import 'reactflow/dist/style.css';
import { useDrop } from 'react-dnd';
import { useMemo } from 'react';
import CustomNode from './CustomNode';

const nodeTypes = { custom: CustomNode };

const Board = ({ allowedDropEffect }) => {
    const [id, setId] = useState("1");
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [status, setStatus] = useState('');

    const currentTool = useSelector((state) => state.tool.toolProperty);

    const handlePublish = () => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                nodes: nodes,
                edges: edges
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setStatus("Task published successfully...")
            });
    }

    useEffect(() => {
        if (nodes.length) {
            setStatus("Creating flowChart...")
        } else {
            setStatus("Start creating flowchart")
        }
    }, [nodes]);

    const [{ canDrop, isOver }, drop] = useDrop(
        () => ({
            accept: 'tool',
            drop: (monitor, dropPos) => {
                console.log(dropPos)
                setId((prev) => (Number(prev) + 1).toString());
                setNodes([...nodes, {
                    id: id,
                    data: { label: currentTool.name },
                    position: dropPos.getClientOffset(),
                    style: {
                        backgroundColor: currentTool.color,
                        color: "#fff",
                        borderRadius: 0,
                        border: "1px solid black",
                        padding: "5px 30px 5px 30px",
                    },
                    type: 'custom'
                }])
                return {
                    name: `${allowedDropEffect} Board`,
                    allowedDropEffect,
                };
            },
            collect: (monitor) => {
                return {
                    isOver: monitor.isOver(),
                    canDrop: monitor.canDrop(),
                };
            },
        }),
        [allowedDropEffect, currentTool, id],
    );
    const isActive = canDrop && isOver;

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes) =>

            setEdges((eds) => applyEdgeChanges(changes, eds))
        ,
        [],
    );
    const onConnect = useCallback(
        (params) => {
            setEdges((eds) => addEdge({
                ...params, type: "step", markerEnd: {
                    type: MarkerType.Arrow,
                }
            }, eds))
        },
        [],
    );
    return (
        <>
            <div className='border-2 border-[#4f71be] h-[100%]' ref={drop} style={{ position: "relative" }}>
                <div className="flex justify-center bg-[#4f71be] text-[#fff] border-b-2 border-black mb-[5px]">Workflow Automation</div>
                <div className="customHeight"
                // style={{ height: "calc(100% - 75px)" }}
                >
                    <ReactFlow
                        style={{ backgroundColor: 'white', }}
                        nodes={nodes}
                        onNodesChange={onNodesChange}
                        edges={edges}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}
                    // nodeOrigin={[0, 0]}
                    >
                        <Background />
                        <Controls />
                    </ReactFlow>
                </div>
                <div className='flex space-between'>
                    <div className='border-2 border-[#4f71be] w-[100%] p-[5px]'><b> Workflow Status:</b> {status} </div>
                    <button onClick={handlePublish} disabled={nodes.length ? false : true} className='disabled:opacity-75 disabled:cursor-not-allowed bg-[#3f1b80] text-[#fff] px-[30px] py-[5px] m-[5px] '>Publish</button>
                </div>
            </div>
        </>
    )
}

export default Board;