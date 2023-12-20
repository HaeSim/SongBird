import { Box, ClickAwayListener, Tooltip } from '@mui/material';
import type { ReactNode } from 'react';
import { useState } from 'react';

interface ITooltipWithClickProps {
  title: string;
  placement?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'bottom-end'
    | 'bottom-start'
    | 'left-end'
    | 'left-start'
    | 'right-end'
    | 'right-start'
    | 'top-end'
    | 'top-start'
    | undefined;
  arrow?: boolean;
  children: ReactNode;
}

const TooltipWithClick = ({
  title,
  placement = 'top',
  arrow = true,
  children,
}: ITooltipWithClickProps) => {
  // tooltip이 열려있는지 상태 관리
  const [open, setOpen] = useState(false);

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };

  return (
    <Box onClick={handleTooltipOpen}>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={title}
            placement={placement}
            arrow={arrow}
          >
            <span>{children}</span>
          </Tooltip>
        </div>
      </ClickAwayListener>
    </Box>
  );
};

export default TooltipWithClick;
