// theme.ts
import { MantineThemeOverride, MantineTheme, rem } from '@mantine/core'

const theme: MantineThemeOverride = {
  colors: {
    brandBlue: [
      '#EBF5FB', // 50
      '#D6EAF8', // 100
      '#AED6F1', // 200
      '#85C1E9', // 300
      '#5DADE2', // 400
      '#3498DB', // 500 (Primary shade)
      '#2E86C1', // 600
      '#2874A6', // 700
      '#21618C', // 800
      '#1B4F72', // 900
    ],

    brandGreen: [
      '#E9F7EF',
      '#D4EFDF',
      '#A9DFBF',
      '#7DCEA0',
      '#52BE80',
      '#27AE60',
      '#229954',
      '#1E8449',
      '#196F3D',
      '#145A32',
    ],

    positive: [
      '#E8F5E9',
      '#C8E6C9',
      '#A5D6A7',
      '#81C784',
      '#66BB6A',
      '#4CAF50',
      '#43A047',
      '#388E3C',
      '#2E7D32',
      '#1B5E20',
    ],

    negative: [
      '#FFEBEE',
      '#FFCDD2',
      '#EF9A9A',
      '#E57373',
      '#EF5350',
      '#F44336',
      '#E53935',
      '#D32F2F',
      '#C62828',
      '#B71C1C',
    ],

    gray: [
      '#FAFAFA',
      '#F5F5F5',
      '#EEEEEE',
      '#E0E0E0',
      '#BDBDBD',
      '#9E9E9E',
      '#757575',
      '#616161',
      '#424242',
      '#212121',
    ],

    dark: [
      '#d5d7e0',
      '#acaebf',
      '#8c8fa3',
      '#666980',
      '#4d4f66',
      '#34354a',
      '#2b2c3d',
      '#1d1e30',
      '#0c0d21',
      '#01010a',
    ],
  },

  primaryColor: 'brandBlue',

  fontFamily: 'Inter, sans-serif',
  fontFamilyMonospace: 'Courier, monospace',
  headings: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: '700',
    sizes: {
      h1: { fontSize: rem(32) },
      h2: { fontSize: rem(28) },
      h3: { fontSize: rem(24) },
      h4: { fontSize: rem(20) },
      h5: { fontSize: rem(18) },
      h6: { fontSize: rem(16) },
    },
  },

  //   /** Global styles */
  //   globalStyles: (theme: MantineTheme) => ({
  //     body: {
  //       backgroundColor:
  //         theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  //       color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.black,
  //       lineHeight: theme.lineHeight,
  //       fontFamily: theme.fontFamily,
  //     },
  //   }),

  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
      styles: (theme: MantineTheme) => ({
        root: {
          borderRadius: theme.radius.md,
          '&:focus': {
            outline: `2px solid ${theme.colors.brandBlue[5]}`,
            outlineOffset: '2px',
          },
        },
      }),
    },

    Card: {
      styles: (theme: MantineTheme, u: any) => ({
        root: {
          [u.dark]: { backgroundColor: theme.colors.dark[6] },
          [u.light]: { backgroundColor: theme.white },
          boxShadow: theme.shadows.md,
          borderRadius: theme.radius.md,
        },
      }),
    },

    Text: {
      styles: (theme: MantineTheme, u: any) => ({
        root: {
          [u.dark]: { color: theme.colors.gray[0] },
          [u.light]: { color: theme.black },
        },
      }),
    },
  },

  defaultRadius: 'md',
  spacing: {
    xs: rem(8),
    sm: rem(12),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
  },

  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  },
}

export default theme
