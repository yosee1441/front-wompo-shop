import { FC, forwardRef, ReactNode } from 'react'

import Dialog from '@mui/material/Dialog'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface DialogFullScreenProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

const DialogFullScreen: FC<DialogFullScreenProps> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      {children}
    </Dialog>
  )
}

export default DialogFullScreen
