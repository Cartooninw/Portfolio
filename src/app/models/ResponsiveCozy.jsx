import Cozy_room from './Cozy_room.jsx';
import { useThree } from "@react-three/fiber";
import { useMemo } from "react";

export function ResponsiveCozy(props) {
      const { viewport } = useThree();

  const { scale, position } = useMemo(() => {
    const isNarrow = viewport.width < 1024;
    return {
      scale: isNarrow ? 0.75 : 1,
      position: (isNarrow ? [2.8, -1.2, 0] : [4, -1.5, 0])
    };
  }, [viewport.width]);
    return <Cozy_room {...props} scale={scale} position={position} />;
}