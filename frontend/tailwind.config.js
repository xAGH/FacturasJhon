module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
        gridTemplateRows: {
            'layout': 'auto 1fr auto',
        },
        backgroundColor: {
        'nav-color': '#DFDFDF',
        'card': '#EEEEEE'
        },
        colors: {
        'secondary': '#898989'
        }
    },
  },
  plugins: [
  ]
}
