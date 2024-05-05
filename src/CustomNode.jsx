import { Handle, Position } from 'reactflow';

const CustomNode = ({ data }) => {
    return (
        <>
            {data.label}
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
        </>
    )
}

export default CustomNode;