<script>
import { Pie } from 'vue-chartjs'

export default ({
  extends: Pie,
  props: {
    graph: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      options: {
        responsive: true,
        legend: {
          display: false
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.graph, this.options)
  }
})
</script>
