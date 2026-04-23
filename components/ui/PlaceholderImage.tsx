const GRADIENTS: Record<string, string> = {
  hero:        'linear-gradient(160deg, #E8D5B0 0%, #D4B87A 20%, #C9A84C 40%, #B8973E 55%, #7A5C20 85%, #5C3F10 100%)',
  'warm-1':    'linear-gradient(175deg, #F0E6D0 0%, #D4C5A9 30%, #B8A882 60%, #8B7355 100%)',
  'warm-2':    'linear-gradient(175deg, #EAE0CC 0%, #CFC0A0 30%, #B5A07A 60%, #8A7550 100%)',
  'warm-3':    'linear-gradient(175deg, #E5D8C0 0%, #C8B890 30%, #A89870 60%, #7A6840 100%)',
  'warm-4':    'linear-gradient(175deg, #EDE4D4 0%, #D8C8A8 30%, #BEA880 60%, #906C48 100%)',
  'warm-5':    'linear-gradient(170deg, #F2EAD8 0%, #DDD0B8 40%, #C4B490 70%, #A09070 100%)',
  'warm-6':    'linear-gradient(170deg, #EDE5D0 0%, #D8CCAA 40%, #BEAC88 70%, #988070 100%)',
  'warm-7':    'linear-gradient(170deg, #EFE8D4 0%, #DDD4B4 40%, #C8C098 70%, #A09888 100%)',
  'warm-8':    'linear-gradient(170deg, #EBE2CC 0%, #D4C8A8 40%, #BAA880 70%, #968060 100%)',
  'cool-1':    'linear-gradient(175deg, #D8DDE8 0%, #B8C0CC 30%, #8890A0 60%, #586070 100%)',
  'cool-2':    'linear-gradient(175deg, #D0D8E0 0%, #A8B8C8 30%, #7890A8 60%, #485878 100%)',
  'cool-3':    'linear-gradient(175deg, #DCD8E8 0%, #B8B0D0 30%, #8878A8 60%, #584870 100%)',
  'cool-4':    'linear-gradient(175deg, #D8E0D8 0%, #A8C0A8 30%, #789060 60%, #485848 100%)',
  'dark-1':    'linear-gradient(185deg, #C8A86A 0%, #A88845 30%, #7A6030 60%, #4A3820 100%)',
  'dark-2':    'linear-gradient(185deg, #D4B87C 0%, #B89855 30%, #8C7035 60%, #584518 100%)',
  'dark-3':    'linear-gradient(185deg, #C0A060 0%, #A07840 30%, #785820 60%, #4A3412 100%)',
  'dark-4':    'linear-gradient(185deg, #CCB070 0%, #AC8C48 30%, #846428 60%, #503C14 100%)',
  'editorial-1': 'linear-gradient(135deg, #3D2B1F 0%, #5C3F2E 35%, #7A5C47 60%, #C9A84C 100%)',
  'editorial-2': 'linear-gradient(135deg, #1A1210 0%, #3D2B1F 40%, #C9A84C 100%)',
  blush:       'linear-gradient(175deg, #F0E0D8 0%, #E0C0B0 30%, #C89880 60%, #A07060 100%)',
}

interface Props {
  variant?: string
  className?: string
}

export function PlaceholderImage({ variant = 'warm-1', className = '' }: Props) {
  return (
    <div
      className={`w-full h-full ${className}`}
      style={{ background: GRADIENTS[variant] ?? GRADIENTS['warm-1'] }}
      aria-hidden="true"
    />
  )
}
