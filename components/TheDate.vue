<script>
import { formatDate } from '@/assets/js/date'

export default {
  name: 'TheDate',
  props: {
    value: {
      type: String,
      require: true
    },
    tag: {
      type: String,
      default: 'span'
    }
  },
  render(h) {
    return h(this.tag, formatDate(this.value))
  }
}
</script>
