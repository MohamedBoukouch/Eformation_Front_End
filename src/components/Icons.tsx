import React from "react";
import  { Icon,  } from "@iconify/react";
import  type { IconifyIcon } from "@iconify/react";

interface IconsProps {
  icon: string | IconifyIcon;
  className?: string;
  width?: number | string;
  rotate?: number;
  hFlip?: boolean;
  vFlip?: boolean;
}

const Icons: React.FC<IconsProps> = ({
  icon,
  className,
  width,
  rotate,
  hFlip,
  vFlip,
}) => {
  return (
    <Icon
      icon={icon}
      className={className}
      width={width}
      rotate={rotate}
      hFlip={hFlip}
      vFlip={vFlip}
    />
  );
};

export default Icons;
