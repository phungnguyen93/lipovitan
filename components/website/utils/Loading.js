import { Spin } from "antd";

const Loading = () => {

    const style = {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#ccc',
        opacity: '.5',
        position: 'absolute',
        zIndex: '1000',
        borderRadius: '10%'
    }
    return (
        <div style={ style }>
            <Spin  />
        </div>
    );
}

export default Loading;
