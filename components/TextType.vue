<template>
  <span>
    {{ textBlink }}
  </span>
</template>

<script>
export default {
  name: 'TextType',
  data: () => ({
    text: 'I\'m a Web Developer',
    displayText: [],
    intervalBlink: undefined,
    textDirection: true
  }),
  computed: {
    textBlink() {
      return this.displayText.join('')
    }
  },
  mounted() {
    this.blinkTextFwd()
  },
  methods: {
    blinkTextFwd() {
      this.intervalBlink = setInterval(() => {
        if (this.text.length) {
          const letter = this.text
            .slice(-1)

          this.text = this.text
            .slice(0, this.text.length - 1)

          this.displayText.unshift(letter)
        } else {
          clearInterval(this.intervalBlink)
          this.blinkTextRev()
        }
      }, 200)
    },
    blinkTextRev() {
      this.intervalBlink = setInterval(() => {
        if (this.displayText.length) {
          const letter = this.displayText
            .pop()

          this.text = this.text.concat(letter)
        } else {
          this.text = this.text
            .split('')
            .reverse()
            .join('')

          clearInterval(this.intervalBlink)
          this.blinkTextFwd()
        }
      }, 50)
    }
  }
}
</script>
