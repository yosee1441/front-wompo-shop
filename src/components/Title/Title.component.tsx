import { Stack, Typography } from '@mui/material'

interface TitleProps {
  title: string
  subtitle?: string
}

function Title({ title, subtitle }: TitleProps) {
  return (
    <Stack paddingTop={2}>
      <Typography variant="h4" component={'h4'}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="h5" component={'h5'}>
          {subtitle}
        </Typography>
      )}
    </Stack>
  )
}

export default Title
